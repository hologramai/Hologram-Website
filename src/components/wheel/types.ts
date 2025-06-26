export interface EmotionPair {
  id: string;
  primary: string;
  opposite: string;
  color: string;
  angle: number;
}

export interface WheelState {
  selectedEmotion: string | null;
  intensity: number;
  elizaReaction: string;
  isLocked: boolean;
  isDragging: boolean;
}