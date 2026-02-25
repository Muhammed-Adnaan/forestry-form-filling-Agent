import asyncio
from dotenv import load_dotenv
from livekit.plugins import deepgram
import os

load_dotenv(".env.local")


async def main():
    print("Testing Deepgram STT")
    stt = deepgram.STTv2(model="flux-general-en")
    print("STT initialized")
    stream = stt.stream()
    print("Stream created")

    # Try to push empty audio and see if it connects
    # Just creating the stream might trigger connection
    await asyncio.sleep(2)
    print("Done")


if __name__ == "__main__":
    asyncio.run(main())
