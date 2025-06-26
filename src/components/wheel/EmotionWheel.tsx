import React from "react";
import { EmotionPair } from "./types";

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
  onMouseLeave
}) => {
  return (
    <div className="flex justify-center mb-8">
      <div 
        ref={wheelRef}
        className="relative w-[750px] h-[750px] rounded-full cursor-grab active:cursor-grabbing select-none"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        style={{
          background: `conic-gradient(
            ${emotionPairs.map(emotion => `${emotion.color} ${emotion.angle}deg`).join(', ')}
          )`,
          filter: isLocked ? 'grayscale(50%)' : 'none'
        }}
      >
        {/* Emotion labels */}
        {emotionPairs.map((emotion) => {
          const radius = 350; // Increased radius for larger wheel
          const angleRad = (emotion.angle * Math.PI) / 180;
          const x = Math.cos(angleRad) * radius;
          const y = Math.sin(angleRad) * radius;
          const oppositeX = Math.cos(angleRad + Math.PI) * radius;
          const oppositeY = Math.sin(angleRad + Math.PI) * radius;
          
          return (
            <div key={emotion.id}>
              {/* Primary emotion */}
              <div
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 text-sm font-bold text-white bg-black bg-opacity-70 px-3 py-2 rounded-lg pointer-events-none ${
                  selectedEmotion === emotion.id && intensity > 50 ? 'ring-2 ring-white scale-110' : ''
                }`}
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transition: 'all 0.2s ease'
                }}
              >
                {emotion.primary}
              </div>
              
              {/* Opposite emotion */}
              <div
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 text-sm font-bold text-white bg-black bg-opacity-70 px-3 py-2 rounded-lg pointer-events-none ${
                  selectedEmotion === emotion.id && intensity <= 50 ? 'ring-2 ring-white scale-110' : ''
                }`}
                style={{
                  left: `calc(50% + ${oppositeX}px)`,
                  top: `calc(50% + ${oppositeY}px)`,
                  transition: 'all 0.2s ease'
                }}
              >
                {emotion.opposite}
              </div>
            </div>
          );
        })}
        
        {/* Current selection indicator */}
        {selectedEmotion && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div 
              className="w-8 h-8 bg-white rounded-full shadow-lg border-4 border-gray-800 pointer-events-none"
              style={{
                transform: `translate(${Math.cos((emotionPairs.find(e => e.id === selectedEmotion)?.angle || 0) * Math.PI / 180) * (intensity / 100) * 350}px, ${Math.sin((emotionPairs.find(e => e.id === selectedEmotion)?.angle || 0) * Math.PI / 180) * (intensity / 100) * 350}px)`
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default EmotionWheel;