import React, { useEffect, useState } from "react";
import { EmotionPair } from "./types";
import { WHEEL_SIZE, createSmoothGradient } from "./constants";
import EmotionLabels from "./EmotionLabels";
import ShimmerEffect from "./ShimmerEffect";
import CursorIndicator from "./CursorIndicator";

interface EmotionWheelProps {
  emotionPairs: EmotionPair[];
  selectedEmotion: string | null;
  intensity: number;
  isLocked: boolean;
  wheelRef: React.RefObject<HTMLDivElement>;
  onMouseDown: (event: React.MouseEvent<HTMLDivElement>) => void;
  onMouseMove: (event: React.MouseEvent<HTMLDivElement>) => void;
  onMouseUp: () => void;
  onMouseLeave: () => void;
  cursorPosition: { x: number; y: number } | null;
}

const EmotionWheel: React.FC<EmotionWheelProps> = ({
  emotionPairs,
  selectedEmotion,
  intensity,
  isLocked,
  wheelRef,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onMouseLeave,
  cursorPosition
}) => {
  const [showShimmer, setShowShimmer] = useState(false);

  useEffect(() => {
    setShowShimmer(true);
    const interval = setInterval(() => {
      setShowShimmer(true);
      setTimeout(() => setShowShimmer(false), 20000);
    }, 60000);

    setTimeout(() => setShowShimmer(false), 20000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center mb-[10%]">
      <div className="relative" style={{ width: WHEEL_SIZE, height: WHEEL_SIZE }}>
        <div 
          ref={wheelRef}
          className="absolute inset-0 rounded-full cursor-crosshair select-none overflow-hidden"
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
          style={{
            background: `conic-gradient(from 0deg, ${createSmoothGradient(emotionPairs)})`,
            filter: isLocked ? 'grayscale(30%)' : 'none',
            transition: 'filter 0.3s ease'
          }}
        >
          <ShimmerEffect show={showShimmer} />
          
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-inner" />
        </div>

        <EmotionLabels
          emotionPairs={emotionPairs}
          selectedEmotion={selectedEmotion}
          intensity={intensity}
        />
        
        <CursorIndicator position={cursorPosition} />
      </div>
    </div>
  );
};

export default EmotionWheel;