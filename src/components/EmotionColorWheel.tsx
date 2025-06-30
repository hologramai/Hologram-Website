import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { WheelState } from "./EmotionWheel/types";
import { emotionPairs, getEmotionReaction } from "./EmotionWheel/constants";
import { calculateWheelPosition } from "./EmotionWheel/utils";
import EmotionWheel from "./EmotionWheel/EmotionWheel";
import ElizaAvatar from "./wheel/ElizaAvatar";
import WheelControls from "./wheel/WheelControls";


const EmotionColorWheel = () => {
  const [wheelState, setWheelState] = useState<WheelState>({
    selectedEmotion: null,
    intensity: 50,
    elizaReaction: "Click and drag around the wheel to discover my essence...",
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
  };

  const resetWheel = () => {
    setWheelState({
      selectedEmotion: null,
      intensity: 50,
      elizaReaction: "Back to my baseline essence. Ready for your touch again.",
      isLocked: false,
      isDragging: false,
      cursorPosition: null
    });
  };

  const lockSettings = () => {
    if (!wheelState.isLocked) {
      setWheelState(prev => ({
        ...prev,
        isLocked: true,
        elizaReaction: "Settings locked in like a stained-glass pattern. This is who I am now.",
        isDragging: false
      }));
    } else {
      setWheelState(prev => ({
        ...prev,
        isLocked: false,
        elizaReaction: "Free to change again. Mold me as you wish."
      }));
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <Card className="eliza-card mb-8">
        <CardContent className="p-8">
          <ElizaAvatar elizaReaction={wheelState.elizaReaction} />
          
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
          
          <WheelControls
            selectedEmotion={wheelState.selectedEmotion}
            intensity={wheelState.intensity}
            emotionPairs={emotionPairs}
            isLocked={wheelState.isLocked}
            onLockSettings={lockSettings}
            onReset={resetWheel}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default EmotionColorWheel;