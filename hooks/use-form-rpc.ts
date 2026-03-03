import { useEffect } from 'react';
import { type RpcInvocationData } from 'livekit-client';
import { useRoomContext } from '@livekit/components-react';
import { fillFormDetails, getFormDetails, getLanguage, setLanguage } from '@/lib/tool';

/**
 * Registers two LiveKit RPC methods while the session is active.
 * The agent worker calls these to read and write the React form state.
 *
 *  - getFormDetails  → returns current form data as a JSON string
 *  - fillFormDetails → accepts a JSON object and merges it into form state
 */
export function useFormRpc() {
  const room = useRoomContext();

  useEffect(() => {
    if (!room) return;

    // ── Handler: getFormDetails ──────────────────────────────────────────────
    const handleGetFormDetails = async (data: RpcInvocationData): Promise<string> => {
      try {
        let parsedPayload: any = {};
        if (data.payload) {
          try {
            parsedPayload = JSON.parse(data.payload);
          } catch (e) {
            // ignore JSON parse error if invalid
          }
        }

        const detailsData = getFormDetails(parsedPayload.sectionName);
        return JSON.stringify(detailsData ?? {});
      } catch (err) {
        console.error('[useFormRpc] getFormDetails error:', err);
        return JSON.stringify({ error: String(err) });
      }
    };

    // ── Handler: fillFormDetails ─────────────────────────────────────────────
    const handleFillFormDetails = async (data: RpcInvocationData): Promise<string> => {
      try {
        const parsed: Record<string, any> = JSON.parse(data.payload || '{}');
        fillFormDetails(parsed);
        return JSON.stringify({ success: true });
      } catch (err) {
        console.error('[useFormRpc] fillFormDetails error:', err);
        return JSON.stringify({ error: String(err) });
      }
    };

    // ── Handler: getLanguage ──────────────────────────────────────────
    const handleGetLanguage = async (_data: RpcInvocationData): Promise<string> => {
      try {
        const lang = getLanguage();
        return JSON.stringify({ language: lang });
      } catch (err) {
        console.error('[useFormRpc] getLanguage error:', err);
        return JSON.stringify({ error: String(err) });
      }
    };

    // ── Handler: setLanguage ──────────────────────────────────────────
    const handleSetLanguage = async (data: RpcInvocationData): Promise<string> => {
      try {
        const { language } = JSON.parse(data.payload || '{}');
        if (!language) return JSON.stringify({ error: 'Missing "language" field in payload.' });
        setLanguage(language);
        return JSON.stringify({ success: true });
      } catch (err) {
        console.error('[useFormRpc] setLanguage error:', err);
        return JSON.stringify({ error: String(err) });
      }
    };

    room.localParticipant.registerRpcMethod('getFormDetails', handleGetFormDetails);
    room.localParticipant.registerRpcMethod('fillFormDetails', handleFillFormDetails);
    room.localParticipant.registerRpcMethod('getLanguage', handleGetLanguage);
    room.localParticipant.registerRpcMethod('setLanguage', handleSetLanguage);

    return () => {
      room.localParticipant.unregisterRpcMethod('getFormDetails');
      room.localParticipant.unregisterRpcMethod('fillFormDetails');
      room.localParticipant.unregisterRpcMethod('getLanguage');
      room.localParticipant.unregisterRpcMethod('setLanguage');
    };
  }, [room]);
}
