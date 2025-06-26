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
  // Calculate gradient stops for smooth color blending
  const createGradientStops = () => {
    const stops: string[] = [];
    const sortedEmotions = [...emotionPairs].sort((a, b) => a.angle - b.angle);
    
    sortedEmotions.forEach((emotion, index) => {
      const nextEmotion = sortedEmotions[(index + 1) % sortedEmotions.length];
      const currentAngle = emotion.angle;
      const nextAngle = index === sortedEmotions.length - 1 ? 360 : nextEmotion.angle;
      
      stops.push(`${emotion.color} ${currentAngle}deg`);
      const midAngle = (currentAngle + nextAngle) / 2;
      const blendedColor = emotion.color;
      stops.push(`${blendedColor} ${midAngle}deg`);
    });
    
    return stops.join(', ');
  };

  const wheelSize = 600;
  const centerOffset = wheelSize / 2;

  return (
    <div className="flex justify-center mb-8">
      <div className="relative" style={{ width: wheelSize, height: wheelSize }}>
        {/* Main wheel */}
        <div 
          ref={wheelRef}
          className="absolute inset-0 rounded-full cursor-crosshair select-none"
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
          style={{
            background: `conic-gradient(from 0deg, ${createGradientStops()})`,
            filter: isLocked ? 'grayscale(50%)' : 'none',
            transition: 'filter 0.3s ease'
          }}
        >
          {/* Center circle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-inner" />
        </div>

        {/* Emotion labels - positioned outside the wheel */}
        {emotionPairs.map((emotion) => {
          const angleRad = (emotion.angle * Math.PI) / 180;
          const labelRadius = centerOffset + 50; // Outside the wheel
          const x = Math.cos(angleRad) * labelRadius + centerOffset;
          const y = Math.sin(angleRad) * labelRadius + centerOffset;
          
          // Calculate opposite position
          const oppositeAngleRad = angleRad + Math.PI;
          const oppositeX = Math.cos(oppositeAngleRad) * labelRadius + centerOffset;
          const oppositeY = Math.sin(oppositeAngleRad) * labelRadius + centerOffset;
          
          return (
            <React.Fragment key={emotion.id}>
              {/* Primary emotion label */}
              <div
                className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{
                  left: `${x}px`,
                  top: `${y}px`,
                }}
              >
                <div
                  className={`text-sm font-bold text-white bg-gray-700 px-3 py-1.5 rounded-lg whitespace-nowrap ${
                    selectedEmotion === emotion.id && intensity > 50 ? 'ring-2 ring-white scale-110 bg-gray-900' : ''
                  }`}
                  style={{ transition: 'all 0.2s ease' }}
                >
                  {emotion.primary}
                </div>
              </div>
              
              {/* Opposite emotion label */}
              <div
                className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{
                  left: `${oppositeX}px`,
                  top: `${oppositeY}px`,
                }}
              >
                <div
                  className={`text-sm font-bold text-white bg-gray-700 px-3 py-1.5 rounded-lg whitespace-nowrap ${
                    selectedEmotion === emotion.id && intensity <= 50 ? 'ring-2 ring-white scale-110 bg-gray-900' : ''
                  }`}
                  style={{ transition: 'all 0.2s ease' }}
                >
                  {emotion.opposite}
                </div>
              </div>
            </React.Fragment>
          );
        })}
        
        {/* Cursor indicator */}
        {cursorPosition && (
          <div 
            className="absolute w-6 h-6 bg-white rounded-full shadow-lg border-2 border-gray-800 pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${cursorPosition.x + centerOffset}px`,
              top: `${cursorPosition.y + centerOffset}px`,
              transition: 'none'
            }}
          />
        )}
      </div>
    </div>
  );
};

export default EmotionWheel;