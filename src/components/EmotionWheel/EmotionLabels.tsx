import React from "react";
import { EmotionPair } from "./types";
import { WHEEL_SIZE } from "./constants";
import AffectionLabel from "./Labels/AffectionLabel";
import IndependenceLabel from "./Labels/IndependenceLabel";
import SassLabel from "./Labels/SassLabel";
import TactLabel from "./Labels/TactLabel";
import BluntnessLabel from "./Labels/BluntnessLabel";
import GentlenessLabel from "./Labels/GentlenessLabel";

interface EmotionLabelsProps {
  emotionPairs: EmotionPair[];
  selectedEmotion: string | null;
  intensity: number;
}

const EmotionLabels: React.FC<EmotionLabelsProps> = ({
  emotionPairs,
  selectedEmotion,
  intensity
}) => {
  const centerOffset = WHEEL_SIZE / 2;
  const circleRadius = WHEEL_SIZE / 2;

  const getBasePosition = (angle: number) => {
    const angleRad = (angle * Math.PI) / 180;
    const labelPadding = 35;
    const radius = circleRadius + labelPadding;
    
    const x = Math.cos(angleRad) * radius + centerOffset;
    const y = Math.sin(angleRad) * radius + centerOffset;
    
    return { x, y };
  };

  return (
    <>
      {emotionPairs.map((emotion) => {
        const position = getBasePosition(emotion.angle);
        const isSelected = selectedEmotion === emotion.id;
        
        switch(emotion.primary) {
          case "Affection":
            return <AffectionLabel key={emotion.id} x={position.x} y={position.y} isSelected={isSelected} intensity={intensity} />;
          case "Independence":
            return <IndependenceLabel key={emotion.id} x={position.x} y={position.y} isSelected={isSelected} intensity={intensity} />;
          case "Sass":
            return <SassLabel key={emotion.id} x={position.x} y={position.y} isSelected={isSelected} intensity={intensity} />;
          case "Tact":
            return <TactLabel key={emotion.id} x={position.x} y={position.y} isSelected={isSelected} intensity={intensity} />;
          case "Bluntness":
            return <BluntnessLabel key={emotion.id} x={position.x} y={position.y} isSelected={isSelected} intensity={intensity} />;
          case "Gentleness":
            return <GentlenessLabel key={emotion.id} x={position.x} y={position.y} isSelected={isSelected} intensity={intensity} />;
          default:
            return null;
        }
      })}
    </>
  );
};

export default EmotionLabels;