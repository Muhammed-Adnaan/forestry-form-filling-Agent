'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { LocalAudioTrack, Room, RoomEvent, Track } from 'livekit-client';
import { motion } from 'motion/react';
import { RoomAudioRenderer, RoomContext, StartAudio } from '@livekit/components-react';
import { ErrorMessage } from '@/components/embed-popup/error-message';
import { PopupView } from '@/components/embed-popup/popup-view';
import { Trigger } from '@/components/embed-popup/trigger';
import useConnectionDetails from '@/hooks/use-connection-details';
import { useFormRpc } from '@/hooks/use-form-rpc';
import { type AppConfig, EmbedErrorDetails } from '@/lib/types';

const PopupViewMotion = motion.create(PopupView);

export type EmbedFixedAgentClientProps = {
  appConfig: AppConfig;
  onPopupStateChange?: (isOpen: boolean) => void;
};

/**
 * Rendered inside <RoomContext.Provider> so useFormRpc can access the correct
 * room via useRoomContext(). Registers getFormDetails / fillFormDetails RPC
 * methods that the LiveKit agent calls to read and write the form.
 */
function FormRpcBridge() {
  useFormRpc();
  return null;
}

function AgentClient({ appConfig, onPopupStateChange }: EmbedFixedAgentClientProps) {
  const isAnimating = useRef(false);
  const room = useMemo(() => new Room(), []);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onLocalTrackPublished = async (trackPublication: any) => {
      if (
        trackPublication.source === Track.Source.Microphone &&
        trackPublication.track instanceof LocalAudioTrack
      ) {
        const { KrispNoiseFilter, isKrispNoiseFilterSupported } = await import(
          '@livekit/krisp-noise-filter'
        );
        if (!isKrispNoiseFilterSupported()) {
          console.warn('Krisp noise filter is currently not supported on this browser');
          return;
        }
        const krispProcessor = KrispNoiseFilter();
        console.log('Enabling LiveKit Krisp noise filter');
        await trackPublication.track.setProcessor(krispProcessor);
        await krispProcessor.setEnabled(true);
      }
    };
    room.on(RoomEvent.LocalTrackPublished, onLocalTrackPublished);
    return () => {
      room.off(RoomEvent.LocalTrackPublished, onLocalTrackPublished);
    };
  }, [room]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [error, setError] = useState<EmbedErrorDetails | null>(null);

  useEffect(() => {
    if (onPopupStateChange) {
      onPopupStateChange(popupOpen);
    }
  }, [popupOpen, onPopupStateChange]);
  const { connectionDetails, refreshConnectionDetails, existingOrRefreshConnectionDetails } =
    useConnectionDetails(appConfig);

  const handleTogglePopup = () => {
    if (isAnimating.current) {
      // prevent re-opening before room has disconnected
      return;
    }

    setError(null);
    setPopupOpen((open) => !open);
  };

  const handlePanelAnimationStart = () => {
    isAnimating.current = true;
  };

  const handlePanelAnimationComplete = () => {
    isAnimating.current = false;
    if (!popupOpen && room.state !== 'disconnected') {
      room.disconnect();
    }
  };

  useEffect(() => {
    const onDisconnected = () => {
      setPopupOpen(false);
      refreshConnectionDetails();
    };
    const onMediaDevicesError = (error: Error) => {
      setError({
        title: 'Encountered an error with your media devices',
        description: `${error.name}: ${error.message}`,
      });
    };
    room.on(RoomEvent.MediaDevicesError, onMediaDevicesError);
    room.on(RoomEvent.Disconnected, onDisconnected);
    return () => {
      room.off(RoomEvent.Disconnected, onDisconnected);
      room.off(RoomEvent.MediaDevicesError, onMediaDevicesError);
    };
  }, [room, refreshConnectionDetails]);

  useEffect(() => {
    if (!popupOpen) {
      return;
    }
    if (!connectionDetails) {
      setError({
        title: 'Error fetching connection details',
        description: 'Please try again later',
      });
      return;
    }
    if (room.state !== 'disconnected') {
      return;
    }

    const connect = async () => {
      Promise.all([
        room.localParticipant.setMicrophoneEnabled(true, undefined, {
          preConnectBuffer: appConfig.isPreConnectBufferEnabled,
        }),
        existingOrRefreshConnectionDetails().then((connectionDetails) =>
          room.connect(connectionDetails.serverUrl, connectionDetails.participantToken)
        ),
      ]).catch((error) => {
        if (error instanceof Error) {
          console.error('Error connecting to agent:', error);
          setError({
            title: 'There was an error connecting to the agent',
            description: `${error.name}: ${error.message}`,
          });
        }
      });
    };

    connect();
  }, [
    room,
    popupOpen,
    connectionDetails,
    existingOrRefreshConnectionDetails,
    appConfig.isPreConnectBufferEnabled,
  ]);

  return (
    <RoomContext.Provider value={room}>
      {/* FormRpcBridge sits inside the provider so it uses the correct room */}
      <FormRpcBridge />

      <RoomAudioRenderer />
      <StartAudio label="Start Audio" />

      <Trigger error={error} popupOpen={popupOpen} onToggle={handleTogglePopup} />

      <motion.div
        inert={!popupOpen}
        initial={{
          opacity: 0,
          translateY: 8,
        }}
        animate={{
          opacity: popupOpen ? 1 : 0,
          translateY: popupOpen ? 0 : 8,
        }}
        transition={{
          type: 'spring',
          bounce: 0,
          duration: popupOpen ? 1 : 0.2,
        }}
        onAnimationStart={handlePanelAnimationStart}
        onAnimationComplete={handlePanelAnimationComplete}
        className="fixed right-4 bottom-20 left-4 z-50 md:left-auto"
      >
        <div className="bg-bg1 dark:bg-bg2 border-separator1 dark:border-separator2 ml-auto flex h-[520px] w-full flex-col overflow-hidden rounded-[28px] border border-solid drop-shadow-md md:w-[360px]">
          {/* Karnataka Govt Header */}
          <div
            style={{
              background: '#3d3d3d',
              borderBottom: '4px solid #E18728',
              borderRadius: '28px 28px 0 0',
            }}
            className="flex shrink-0 items-center gap-3 px-4 py-2"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/kar-gov-logo.png"
              alt="Karnataka Emblem"
              className="h-9 w-9 object-contain"
            />
            <div className="flex flex-col leading-tight">
              <span
                style={{
                  color: '#E18728',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  fontFamily: 'Arial, sans-serif',
                }}
              >
                ಇ-ಕಟಾವಣೆ ಮತ್ತು ಸಾಗಾಣಿಕೆ
              </span>
              <span style={{ color: '#fff', fontSize: '11px', fontFamily: 'Arial, sans-serif' }}>
                e-Felling &amp; Transit Assistant
              </span>
            </div>
          </div>
          {/* Popup Content */}
          <div className="relative min-h-0 flex-1">
            <ErrorMessage error={error} />
            {!error && (
              <PopupViewMotion
                appConfig={appConfig}
                initial={{ opacity: 1 }}
                animate={{ opacity: error === null ? 1 : 0 }}
                transition={{
                  type: 'linear',
                  duration: 0.2,
                }}
                disabled={!popupOpen}
                sessionStarted={popupOpen}
                onEmbedError={setError}
                className="absolute inset-0"
              />
            )}
          </div>
        </div>
      </motion.div>
    </RoomContext.Provider>
  );
}

export default AgentClient;
