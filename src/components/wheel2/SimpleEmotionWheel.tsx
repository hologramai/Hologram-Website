import React, { useState, useRef } from 'react';
import { emotionPairs, getEmotionReaction } from './EmotionWheel/constants';
import { calculateWheelPosition } from './EmotionWheel/utils';
import EmotionWheel from './EmotionWheel/EmotionWheel';
import { WheelState } from './EmotionWheel/types';

interface SimpleEmotionWheelProps {
  onEmotionChange?: (emotion: string | null, intensity: number) => void;
  initialEmotion?: string | null;
}

const SimpleEmotionWheel: React.FC<SimpleEmotionWheelProps> = ({ onEmotionChange, initialEmotion }) => {
  const [wheelState, setWheelState] = useState<WheelState>({
    selectedEmotion: initialEmotion || null,
    intensity: 50,
    elizaReaction: initialEmotion 
      ? getEmotionReaction(initialEmotion, 50, initialEmotion)
      : "Click and drag around the wheel to discover my essence...",
    isLocked: false,
    isDragging: false,
    cursorPosition: null
  });

  const wheelRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (wheelState.isLocked) return;
    
    event.preventDefault();
    setWheelState(prev => ({ ...prev, isDragging: true }));
    handleWheelInteraction(event);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!wheelState.isDragging || wheelState.isLocked) return;
    handleWheelInteraction(event);
  };

  const handleMouseUp = () => {
    setWheelState(prev => ({ ...prev, isDragging: false }));
  };

  const handleMouseLeave = () => {
    setWheelState(prev => ({ ...prev, isDragging: false }));
  };

  const handleWheelInteraction = (event: React.MouseEvent<HTMLDivElement>) => {
    const position = calculateWheelPosition(event, wheelRef.current, emotionPairs);
    
    if (!position) return;
    
    const { emotion, intensity, x, y } = position;
    
    // Update cursor position
    setWheelState(prev => ({
      ...prev,
      cursorPosition: { x, y }
    }));
    
    // Always use the primary emotion (no opposites)
    const currentEmotion = emotion.primary;
    const reactionText = getEmotionReaction(emotion.id, intensity, currentEmotion);
    
    setWheelState(prev => ({
      ...prev,
      selectedEmotion: emotion.id,
      intensity,
      elizaReaction: reactionText
    }));

    // Call the callback if provided
    if (onEmotionChange) {
      onEmotionChange(emotion.id, intensity);
    }
  };

  return (
    <div className="relative">
      {/* Sticky Text Window */}
      <div className="sticky z-40 w-full flex justify-center" style={{ top: '-14vh', paddingBottom: '5vh' }}>
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-xl shadow-lg text-center" style={{ width: '50vw', minHeight: '100px' }}>
          {wheelState.selectedEmotion && (
            <p className="text-lg font-semibold capitalize mb-1 text-center">
              Current: {wheelState.selectedEmotion} ({wheelState.intensity}%)
            </p>
          )}
          <p className="text-2xl font-medium italic leading-tight text-center">
            {wheelState.elizaReaction}
          </p>
        </div>
      </div>
      
      {/* Emotion Wheel with reduced bottom padding */}
      <div className="flex justify-center mt-4" style={{ paddingBottom: '0vh' }}>
        <EmotionWheel
          emotionPairs={emotionPairs}
          selectedEmotion={wheelState.selectedEmotion}
          intensity={wheelState.intensity}
          isLocked={wheelState.isLocked}
          wheelRef={wheelRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          cursorPosition={wheelState.cursorPosition}
        />
      </div>
    </div>
  );
};

export default SimpleEmotionWheel;