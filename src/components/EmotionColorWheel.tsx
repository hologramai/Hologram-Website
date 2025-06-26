import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { WheelState } from "./wheel/types";
import { emotionPairs, getEmotionReaction } from "./wheel/emotionData";
import { calculateWheelPosition } from "./wheel/wheelUtils";
import EmotionWheel from "./wheel/EmotionWheel";
import ElizaAvatar from "./wheel/ElizaAvatar";
import WheelControls from "./wheel/WheelControls";

const EmotionColorWheel = () => {
  const [wheelState, setWheelState] = useState<WheelState>({
    selectedEmotion: null,
    intensity: 50,
    elizaReaction: "Click and drag around the wheel to discover my essence...",
    isLocked: false,
    isDragging: false
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
    
    const { emotion, intensity, blends } = position;
    
    // Only update if there's a significant change
    if (
      wheelState.selectedEmotion !== emotion.id || 
      Math.abs(wheelState.intensity - intensity) > 3
    ) {
      // Create blended emotion description if multiple emotions are active
      let emotionDescription = "";
      let reactionText = "";
      
      if (blends && blends.length > 1) {
        const activeEmotions = blends
          .filter(blend => blend.weight > 0.2)
          .sort((a, b) => b.weight - a.weight)
          .slice(0, 2);
        
        if (activeEmotions.length > 1) {
          const primary = activeEmotions[0];
          const secondary = activeEmotions[1];
          
          const primaryTrait = intensity > 50 ? primary.emotion.primary : primary.emotion.opposite;
          const secondaryTrait = intensity > 50 ? secondary.emotion.primary : secondary.emotion.opposite;
          
          emotionDescription = `${primaryTrait} + ${secondaryTrait}`;
          reactionText = `I'm feeling a blend of ${primaryTrait.toLowerCase()} and ${secondaryTrait.toLowerCase()}... *adjusts to this unique combination*`;
        } else {
          const currentEmotion = intensity > 50 ? emotion.primary : emotion.opposite;
          emotionDescription = currentEmotion;
          reactionText = getEmotionReaction(emotion.id, intensity, currentEmotion);
        }
      } else {
        const currentEmotion = intensity > 50 ? emotion.primary : emotion.opposite;
        emotionDescription = currentEmotion;
        reactionText = getEmotionReaction(emotion.id, intensity, currentEmotion);
      }
      
      setWheelState(prev => ({
        ...prev,
        selectedEmotion: emotion.id,
        intensity,
        elizaReaction: reactionText
      }));
    }
  };

  const resetWheel = () => {
    setWheelState({
      selectedEmotion: null,
      intensity: 50,
      elizaReaction: "Back to my baseline essence. Ready for your touch again.",
      isLocked: false,
      isDragging: false
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