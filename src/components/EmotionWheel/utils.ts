import { EmotionPair } from "./types";

export const calculateWheelPosition = (
  event: React.MouseEvent<HTMLDivElement>,
  wheelElement: HTMLDivElement | null,
  emotionPairs: EmotionPair[]
) => {
  if (!wheelElement) return null;

  const rect = wheelElement.getBoundingClientRect();
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;
  const x = mouseX - centerX;
  const y = mouseY - centerY;
  
  const distance = Math.sqrt(x * x + y * y);
  const maxRadius = Math.min(rect.width, rect.height) / 2;
  
  let clampedX = x;
  let clampedY = y;
  
  if (distance > maxRadius) {
    const angle = Math.atan2(y, x);
    clampedX = Math.cos(angle) * maxRadius;
    clampedY = Math.sin(angle) * maxRadius;
  }
  
  const finalDistance = Math.sqrt(clampedX * clampedX + clampedY * clampedY);
  const intensity = Math.round((finalDistance / maxRadius) * 100);
  
  let angle = Math.atan2(clampedY, clampedX) * (180 / Math.PI);
  if (angle < 0) angle += 360;
  
  let closestEmotion = emotionPairs[0];
  let minAngleDiff = 360;
  
  emotionPairs.forEach(emotion => {
    let angleDiff = Math.abs(angle - emotion.angle);
    if (angleDiff > 180) angleDiff = 360 - angleDiff;
    
    if (angleDiff < minAngleDiff) {
      minAngleDiff = angleDiff;
      closestEmotion = emotion;
    }
  });
  
  return {
    emotion: closestEmotion,
    intensity,
    distance: finalDistance,
    maxRadius,
    angle,
    x: clampedX,
    y: clampedY
  };
};