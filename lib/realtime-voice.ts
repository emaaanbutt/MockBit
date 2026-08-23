import type { AudioSession, TranscriptTurn } from "@/types/interview";

export type VoiceProvider = "vapi" | "deepgram" | "openai-realtime" | "custom";

export type VoiceSessionHandlers = {
  onStatusChange?: (status: AudioSession["status"]) => void;
  onTranscriptTurn?: (turn: TranscriptTurn) => void;
  onAudioLevel?: (level: number) => void;
  onError?: (error: Error) => void;
};

export type VoiceSessionConfig = {
  provider: VoiceProvider;
  interviewId: string;
  accentModel: "indian-english" | "pakistani-english" | "neutral-global";
  jobDescription?: string;
  candidateProfile?: string;
  handlers?: VoiceSessionHandlers;
};

export type VoiceSessionClient = {
  connect: () => Promise<void>;
  mute: () => void;
  unmute: () => void;
  end: () => Promise<void>;
};

export function createRealtimeVoiceSession(config: VoiceSessionConfig): VoiceSessionClient {
  let socket: WebSocket | null = null;
  let peerConnection: RTCPeerConnection | null = null;
  let localStream: MediaStream | null = null;
  let muted = false;

  async function connect() {
    config.handlers?.onStatusChange?.("connecting");

    try {
      localStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });

      if (config.provider === "deepgram" || config.provider === "vapi") {
        socket = createProviderSocket(config);
      }

      if (config.provider === "openai-realtime" || config.provider === "custom") {
        peerConnection = await createWebRtcPeer(config, localStream);
      }

      config.handlers?.onStatusChange?.("listening");
    } catch (error) {
      config.handlers?.onError?.(error instanceof Error ? error : new Error("Voice session failed"));
      config.handlers?.onStatusChange?.("idle");
    }
  }

  function mute() {
    muted = true;
    localStream?.getAudioTracks().forEach((track) => {
      track.enabled = false;
    });
    config.handlers?.onStatusChange?.("muted");
  }

  function unmute() {
    muted = false;
    localStream?.getAudioTracks().forEach((track) => {
      track.enabled = true;
    });
    config.handlers?.onStatusChange?.("listening");
  }

  async function end() {
    socket?.close();
    peerConnection?.close();
    localStream?.getTracks().forEach((track) => track.stop());
    config.handlers?.onStatusChange?.("ended");
  }

  return { connect, mute, unmute, end };
}

function createProviderSocket(config: VoiceSessionConfig) {
  const endpoint = config.provider === "vapi" ? "/api/voice/vapi-token" : "/api/voice/deepgram-token";
  const socket = new WebSocket(`wss://voice-provider.example.com/session?tokenEndpoint=${endpoint}`);

  socket.onmessage = (event) => {
    const payload = JSON.parse(event.data);

    if (payload.type === "transcript") {
      config.handlers?.onTranscriptTurn?.({
        id: crypto.randomUUID(),
        speaker: payload.speaker ?? "candidate",
        text: payload.text,
        startedAt: new Date().toISOString(),
        confidence: payload.confidence,
        localContextTags: payload.localContextTags ?? []
      });
    }

    if (payload.type === "ai_speaking") {
      config.handlers?.onStatusChange?.("ai-speaking");
    }
  };

  return socket;
}

async function createWebRtcPeer(config: VoiceSessionConfig, stream: MediaStream) {
  const peer = new RTCPeerConnection();
  stream.getAudioTracks().forEach((track) => peer.addTrack(track, stream));

  peer.ontrack = () => {
    config.handlers?.onStatusChange?.("ai-speaking");
  };

  // Later: exchange offer/answer with a secure server route that injects provider keys.
  await peer.createOffer();

  return peer;
}
