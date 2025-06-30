import React from "react";
import { EmotionPair } from "./types";
import { WHEEL_SIZE } from "./constants";
import AmbitionLabel from "./Labels/AmbitionLabel";
import ContentmentLabel from "./Labels/ContentmentLabel";
import PassionLabel from "./Labels/PassionLabel";
import DetachmentLabel from "./Labels/DetachmentLabel";
import VigilanceLabel from "./Labels/VigilanceLabel";
import WonderLabel from "./Labels/WonderLabel";
import ExplorationLabel from "./Labels/ExplorationLabel";
import AdorationLabel from "./Labels/AdorationLabel";

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
          case "Ambition":
            return <AmbitionLabel key={emotion.id} x={position.x} y={position.y} isSelected={isSelected} intensity={intensity} />;
          case "Contentment":
            return <ContentmentLabel key={emotion.id} x={position.x} y={position.y} isSelected={isSelected} intensity={intensity} />;
          case "Passion":
            return <PassionLabel key={emotion.id} x={position.x} y={position.y} isSelected={isSelected} intensity={intensity} />;
          case "Detachment":
            return <DetachmentLabel key={emotion.id} x={position.x} y={position.y} isSelected={isSelected} intensity={intensity} />;
          case "Vigilance":
            return <VigilanceLabel key={emotion.id} x={position.x} y={position.y} isSelected={isSelected} intensity={intensity} />;
          case "Wonder":
            return <WonderLabel key={emotion.id} x={position.x} y={position.y} isSelected={isSelected} intensity={intensity} />;
          case "Exploration":
            return <ExplorationLabel key={emotion.id} x={position.x} y={position.y} isSelected={isSelected} intensity={intensity} />;
          case "Adoration":
            return <AdorationLabel key={emotion.id} x={position.x} y={position.y} isSelected={isSelected} intensity={intensity} />;
          default:
            return null;
        }
      })}
    </>
  );
};

export default EmotionLabels;