/**
 * Form-filling LiveKit Agent — Standard Pipeline
 *
 * Run: pnpm dev:agent
 */
import dotenv from 'dotenv';
import { type RpcInvocationData } from 'livekit-client';
import path from 'node:path';
import url from 'node:url';
import { z } from 'zod';
import { type JobContext, WorkerOptions, cli, defineAgent, llm, voice } from '@livekit/agents';
// import * as deepgram from '@livekit/agents-plugin-deepgram';
// import * as google from '@livekit/agents-plugin-google';
// import * as livekit from '@livekit/agents-plugin-livekit';
import * as openai from '@livekit/agents-plugin-openai';
import * as silero from '@livekit/agents-plugin-silero';
// import * as LivekitNC from '@livekit/noise-cancellation-node';
import { BackgroundVoiceCancellation } from '@livekit/noise-cancellation-node';

dotenv.config({ path: ['.env'] });

// ─── 1. TOOL DEFINITIONS (Standard) ───────────────────────────────────────────

function makeFormTools(ctx: JobContext) {
  const getBrowserIdentity = () => {
    const participants = Array.from(ctx.room.remoteParticipants.values());
    if (participants.length === 0) throw new Error('No browser participant connected.');
    return participants[0].identity;
  };

  const getFormDetails = llm.tool({
    description:
      'Reads the form state. You can optionally pass a section_name to only get the details for a specific section (e.g. ApplicantDetails, LocationDetails, BoundaryDetails, LandExtent, OtherDetails, UploadSection, Declaration).',
    parameters: z.object({
      section_name: z
        .string()
        .optional()
        .describe(
          'The name of the section to read from. Examples: ApplicantDetails, LocationDetails, BoundaryDetails, LandExtent, OtherDetails, UploadSection, Declaration'
        ),
    }),
    execute: async ({ section_name }) => {
      console.log('� Checking form via RPC...');
      try {
        const identity = getBrowserIdentity();
        const payloadStr = section_name ? JSON.stringify({ sectionName: section_name }) : '';
        const response = await ctx.room.localParticipant?.performRpc({
          destinationIdentity: identity,
          method: 'getFormDetails',
          payload: payloadStr,
          responseTimeout: 4000,
        });
        return `Form State: ${response}`;
      } catch (err) {
        return `Error: ${String(err)}`;
      }
    },
  });

  const fillFormFields = llm.tool({
    description:
      'Updates form fields. IMPORTANT: You MUST pass the updates nested inside the "fields" property. Example: { "fields": { "hobli": "kasaba" } }',
    parameters: z.object({
      fields: z
        .record(z.string(), z.string())
        .describe('Key-value pairs to update (e.g., {"hobli": "kasaba"}).'),
    }),
    execute: async ({ fields }) => {
      console.log('✍️ Updating form:', fields);
      try {
        const identity = getBrowserIdentity();
        await ctx.room.localParticipant?.performRpc({
          destinationIdentity: identity,
          method: 'fillFormDetails',
          payload: JSON.stringify(fields),
          responseTimeout: 4000,
        });
        return 'Success: Form updated.';
      } catch (err) {
        return `Error: ${String(err)}`;
      }
    },
  });

  const getLanguageTool = llm.tool({
    description:
      'Fetches the currently selected UI language (e.g. "English", "Kannada"). Call this first before speaking so you know which language to use.',
    parameters: z.object({}),
    execute: async () => {
      console.log('🌐 Fetching language via RPC...');
      try {
        const identity = getBrowserIdentity();
        const response = await ctx.room.localParticipant?.performRpc({
          destinationIdentity: identity,
          method: 'getLanguage',
          payload: '',
          responseTimeout: 4000,
        });
        return `Language: ${response}`;
      } catch (err) {
        return `Error: ${String(err)}`;
      }
    },
  });

  const setLanguageTool = llm.tool({
    description:
      'Sets the UI language in the browser app. Pass the full language name, e.g. "English", "Kannada".',
    parameters: z.object({
      language: z.string().describe('Full language name, e.g. "English", "Kannada".'),
    }),
    execute: async ({ language }) => {
      console.log(`🌐 Setting language to: ${language}`);
      try {
        const identity = getBrowserIdentity();
        await ctx.room.localParticipant?.performRpc({
          destinationIdentity: identity,
          method: 'setLanguage',
          payload: JSON.stringify({ language }),
          responseTimeout: 4000,
        });
        return `Success: Language set to ${language}.`;
      } catch (err) {
        return `Error: ${String(err)}`;
      }
    },
  });

  return {
    get_form_details: getFormDetails,
    fill_form_fields: fillFormFields,
    get_language: getLanguageTool,
    set_language: setLanguageTool,
  };
}

// ─── 2. AGENT CONFIGURATION (Standard Pipeline) ───────────────────────────────

class FormAssistant extends voice.Agent {
  constructor(ctx: JobContext) {
    super({
      // INSTRUCTIONS
      instructions: `You are a helpful voice assistant that helps users fill out a government form.
                1. ALWAYS call 'get_language' first. Respond ONLY in the language returned.
                2. Use 'get_form_details' to read current field values before asking questions.
                3. Ask only 1–2 missing fields at a time.
                4. Use 'fill_form_fields' to save answers.
                5. Keep replies short and conversational.`,

      // TOOLS
      tools: makeFormTools(ctx),

      // PIPELINE COMPONENTS
      // 1. STT (Hearing): Deepgram STTv2 (matching agent.py flux-general-en)
      // turnDetection: "stt",
      // turnDetection: new livekit.turnDetector.MultilingualModel(),
      // llm: new google.beta.realtime.RealtimeModel({
      //     model: "gemini-2.5-flash-native-audio-preview-12-2025",
      //     realtimeInputConfig: {
      //         automaticActivityDetection: {
      //             disabled: true,
      //         },
      //     },
      // }),
      llm: new openai.realtime.RealtimeModel({
        // model: "gpt-4o-realtime-preview-2024-10-01",
        model: 'gpt-realtime-mini',
        voice: 'ash',
        turnDetection: {
          type: 'server_vad',
          threshold: 0.4,
          prefix_padding_ms: 350,
          silence_duration_ms: 500,
          create_response: true,
          interrupt_response: true,
        },
      }),
      // this is to make it talk
      tts: new openai.TTS({
        model: 'gpt-4o-mini-tts',
        voice: 'ash',
        instructions: 'speak in the language user is speaking in.',
      }),

      // stt: "deepgram/nova-3",
      // turnDetection: new livekit.turnDetector.MultilingualModel(),
      // stt: new deepgram.STT({
      //     model: "nova-2-general",
      // }),

      // // 2. LLM (Thinking): OpenAI Plugin routing to Ollama
      // self hosted model work great with the google api and the funcitonal tools
      // llm: new openai.LLM({
      //     baseURL: 'http://localhost:11434/v1',
      //     apiKey: 'ollama', // Required but dummy key
      //     model: 'gpt-oss:120b-cloud',
      //     temperature: 0.7,
      // }),

      // // 3. TTS (Speaking): Deepgram TTS (matching agent.py aura-2-asteria-en)
      // tts: new deepgram.TTS({
      //     model: 'aura-2-asteria-en', // The asteria voice model from agent.py
      // }),
    });
  }
}

// ─── 3. ENTRY POINT ───────────────────────────────────────────────────────────

export default defineAgent({
  entry: async (ctx: JobContext) => {
    console.log(`Connecting to room ${ctx.room.name}`);
    await ctx.connect();

    // Matching Silero VAD from agent.py
    const vad = await silero.VAD.load({
      minSpeechDuration: 0.3,
      minSilenceDuration: 0.7,
    });

    // Initialize AgentLogic
    const agent = new FormAssistant(ctx);

    const session = new voice.AgentSession({
      vad: vad,
    });

    // this is to see if we are getting the audio and is it getting registed to the agent
    session.on(voice.AgentSessionEventTypes.UserInputTranscribed, (msg) => {
      if (msg.isFinal) {
        console.log('🗣️ User spoke');
      }
    });

    // ── Handle Manual UI Language Changes ────────────────────────────────────
    ctx.room.localParticipant?.registerRpcMethod(
      'userLanguageChanged',
      async (data: RpcInvocationData): Promise<string> => {
        try {
          const payload = JSON.parse(data.payload || '{}');
          const newLang = payload.language || 'English';
          console.log(`🌐 User manually switched UI language to: ${newLang}`);

          const acknowledgements: Record<string, string> = {
            English: 'I have switched my language to English.',
            Kannada: 'ನಾನು ನನ್ನ ಭಾಷೆಯನ್ನು ಕನ್ನಡಕ್ಕೆ ಬದಲಾಯಿಸಿದ್ದೇನೆ.',
            Hindi: 'मैंने अपनी भाषा हिंदी में बदल ली है।',
            Tamil: 'நான் எனது மொழியை தமிழுக்கு மாற்றிவிட்டேன்.',
            Telugu: 'నేను నా భాషను తెలుగుకి మార్చాను.',
            Malayalam: 'ഞാൻ എന്റെ ഭാഷ മലയാളത്തിലേക്ക് മാറ്റി.',
            Marathi: 'मी माझी भाषा मराठीत बदलली आहे.',
            Gujarati: 'મેં મારી ભાષા ગુજરાતીમાં બદલી છે.',
            Bengali: 'আমি আমার ভাষা বাংলায় পরিবর্তন করেছি।',
            Punjabi: 'ਮੈਂ ਆਪਣੀ ਭਾਸ਼ਾ ਪੰਜਾਬੀ ਵਿੱਚ ਬਦਲ ਲਈ ਹੈ।',
          };

          const ack = acknowledgements[newLang] ?? acknowledgements['English'];

          // Force an immediate utterance in the new language so the system recognizes the switch
          await session.say(ack, { allowInterruptions: false });
          return JSON.stringify({ success: true });
        } catch (err) {
          console.error('Error handling userLanguageChanged:', err);
          return JSON.stringify({ error: String(err) });
        }
      }
    );

    await session.start({
      room: ctx.room,
      agent: agent,
      inputOptions: {
        noiseCancellation: BackgroundVoiceCancellation(),
      },
    });

    // ── Fetch language before the first utterance (Non-blocking) ─────────────
    // We execute this asynchronously so it doesn't block the LiveKit agent initialization thread.
    // Blocking the `entry` function for too long causes 'runner initialization timed out'.
    setTimeout(async () => {
      let detectedLanguage = 'English';
      try {
        const participants = Array.from(ctx.room.remoteParticipants.values());
        if (participants.length > 0) {
          const identity = participants[0].identity;
          const langResponse = await ctx.room.localParticipant?.performRpc({
            destinationIdentity: identity,
            method: 'getLanguage',
            payload: '',
            responseTimeout: 4000,
          });
          const parsed = JSON.parse(langResponse ?? '{}');
          if (parsed.language) {
            detectedLanguage = parsed.language;
            console.log(`🌐 Detected language: ${detectedLanguage}`);
          }
        }
      } catch (err) {
        console.warn('⚠️ Could not fetch language before greeting, defaulting to English.', err);
      }

      // Greet in the detected language
      const greetings: Record<string, string> = {
        English: 'Hello. How can I help you today?',
        Kannada: 'ನಮಸ್ಕಾರ. ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?',
        Hindi: 'नमस्ते। मैं आपकी कैसे मदद कर सकता हूँ?',
        Tamil: 'வணக்கம். நான் உங்களுக்கு எப்படி உதவலாம்?',
        Telugu: 'నమస్కారం. నేను మీకు ఎలా సహాయపడగలను?',
        Malayalam: 'നമസ്കാരം. ഞാൻ നിങ്ങളെ എങ്ങനെ സഹായിക്കണം?',
        Marathi: 'नमस्कार. मी तुम्हाला कशी मदत करू शकतो?',
        Gujarati: 'નમસ્તે. હું તમારી કેવી રીતે મદદ કરી શકું?',
        Bengali: 'নমস্কার। আমি আপনাকে কীভাবে সাহায্য করতে পারি?',
        Punjabi: 'ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ। ਮੈਂ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ?',
      };
      const greeting = greetings[detectedLanguage] ?? greetings['English'];

      await session.say(greeting, { allowInterruptions: false });
    }, 500); // Small 500ms delay gives the React frontend time to mount RPC handlers

    // Optional: Initial greeting matching agent.py
    // await agent.tts.say("Hello! I can help you fill out this form.");
  },
});

// ─── RUNNER ───────────────────────────────────────────────────────────────────

const isMain =
  process.argv[1] === url.fileURLToPath(import.meta.url) ||
  process.argv[1] === path.resolve('agent.ts');

if (isMain) {
  cli.runApp(
    new WorkerOptions({
      agent: url.fileURLToPath(import.meta.url),
      agentName: 'form-assistant',
    })
  );
}
