import asyncio
import json
import logging
from typing import Annotated

from dotenv import load_dotenv
from livekit.agents import (
    AutoSubscribe,
    JobContext,
    WorkerOptions,
    cli,
    Agent,
    AgentSession,  # <--- New Orchestrator
    function_tool,
    room_io,
)
from livekit.plugins import (
    google,
    silero,
    noise_cancellation,
    deepgram,
    openai,
    sarvam,
    soniox,
)


load_dotenv(".env.local")

logger = logging.getLogger("google-form-agent")
logger.setLevel(logging.INFO)

# --- AGENT & TOOL DEFINITION ------------------------------------------------


class FormAssistant(Agent):
    def __init__(self, ctx: JobContext):
        # We pass the context to the agent so tools can access it
        self.ctx = ctx
        super().__init__(
            instructions=(
                "You are a helpful voice assistant. "
                "1. First, check the form state using 'get_form_details'. "
                "2. Greet the user and ask for missing details. "
                "3. Use 'fill_form_fields' to update the form."
                "4. keep it short and conversational"
                "5. just ask one - two  question at a time"
            )
        )

    def _get_browser_identity(self):
        participants = [p for p in self.ctx.room.remote_participants.values()]
        if not participants:
            raise Exception("No browser participant connected.")
        return participants[0].identity

    @function_tool(description="Reads the form state. Call this first.")
    async def get_form_details(self) -> str:
        logger.info("🔍 Checking form via RPC...")
        try:
            identity = self._get_browser_identity()
            response = await self.ctx.room.local_participant.perform_rpc(
                destination_identity=identity,
                method="getFormDetails",
                payload="",
                response_timeout=4.0,
            )
            return f"Form State: {response}"
        except Exception as e:
            return f"Error: {str(e)}"

    @function_tool(description="Updates form fields.")
    async def fill_form_fields(
        self,
        fields: Annotated[dict, "Key-value pairs to update"],
    ) -> str:
        logger.info(f"✍️ Updating form: {fields}")
        try:
            identity = self._get_browser_identity()
            await self.ctx.room.local_participant.perform_rpc(
                destination_identity=identity,
                method="fillFormDetails",
                payload=json.dumps(fields),
                response_timeout=4.0,
            )
            return "Success: Form updated."
        except Exception as e:
            return f"Error: {str(e)}"


# --- ENTRYPOINT -------------------------------------------------------------


async def entrypoint(ctx: JobContext):
    logger.info(f"Connecting to room {ctx.room.name}")
    await ctx.connect(auto_subscribe=AutoSubscribe.AUDIO_ONLY)

    #  min_speech_duration: float = 0.05,
    #     min_silence_duration: float = 0.55,
    #     prefix_padding_duration: float = 0.5,
    #     max_buffered_speech: float = 60.0,
    #     activation_threshold: float = 0.5,
    #     sample_rate: Literal[8000, 16000] = 16000,
    #     force_cpu: bool = True,
    #     onnx_file_path: NotGivenOr[Path | str] = NOT_GIVEN,
    #     deactivation_threshold: NotGivenOr[float] = NOT_GIVEN,
    #     # deprecated
    #     padding_duration: NotGivenOr[float] = NOT_GIVEN,
    vad = ctx.proc.userdata.get("vad") or silero.VAD.load(
        min_silence_duration=1.0,  # Wait 1 second of silence before ending
        min_speech_duration=0.1,  # Minimum speech duration
        padding_duration=0.3,  # Add padding around speech
    )

    # Wait for the user to join so we know who to talk to
    # participant = await ctx.wait_for_participant()

    # 1. Initialize the Session (Orchestrator)
    tts = deepgram.TTS(
        model="aura-2-asteria-en",
    )
    # tts=google.TTS(voice_name="en-US-Neural2-C"),

    llm = openai.LLM(
        base_url="http://localhost:11434/v1",
        api_key="ollama",  # Ollama doesn't check keys, but the plugin requires a string
        model="gpt-oss:120b-cloud",
        temperature=0.7,
    )
    # llm=google.LLM(
    #     model="gemini-2.5-flash-lite"
    # ),  # Ensure you have access to this model
    # stt = google.STT()
    # stt = soniox.STT(params=soniox.STTOptions(model="stt-rt-v3", language_hints=["en"]))
    # stt = sarvam.STT(
    #     language="en-IN",
    #     model="Saarika:2.5",
    #     mode="transcribe",  # default
    # )
    stt = deepgram.STTv2(
        model="flux-general-en",
        eager_eot_threshold=0.4,
    )
    # stt = google.STT(model="chirp-2", location="asia-northeast1")
    session = AgentSession(
        # turn_detection="stt",
        # vad=vad,
        # stt=stt,
        # llm=llm,
        # tts=tts,
        llm=google.realtime.RealtimeModel(
            voice="Puck",
            temperature=0.8,
            instructions="You are a helpful assistant",
            input_audio_transcription=None,
        ),
    )

    def on_user_input_transcribed(msg):
        if msg.is_final:
            logger.info("🗣️ User Said:", msg.transcript)

    def on_user_state_changed(msg):
        if msg.new_state == "speaking":
            logger.info("🗣️ User started speaking...")
        elif msg.new_state == "listening" and msg.old_state == "speaking":
            logger.info("🗣️ User stopped speaking...")

    session.on("user_input_transcribed", on_user_input_transcribed)
    session.on("user_state_changed", on_user_state_changed)

    # 2. Initialize your Agent Logic
    agent = FormAssistant(ctx)

    # 3. Start the session
    # This hooks up the agent's logic/tools to the session's audio pipeline
    await session.start(
        agent=agent,
        room=ctx.room,
        room_options=room_io.RoomOptions(
            audio_input=room_io.AudioInputOptions(
                noise_cancellation=noise_cancellation.BVC()
            )
        ),
    )

    # Optional: Initial greeting
    # await session.say("Hello! I can help you fill out this form.")


if __name__ == "__main__":
    cli.run_app(WorkerOptions(entrypoint_fnc=entrypoint))
