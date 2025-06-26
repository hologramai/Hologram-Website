import { EmotionPair } from "./types";

export const calculateWheelPosition = (
  event: React.MouseEvent<HTMLDivElement>,
  wheelElement: HTMLDivElement | null,
  emotionPairs: EmotionPair[]
) => {
  if (!wheelElement) return null;

  const rect = wheelElement.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  const x = event.clientX - centerX;
  const y = event.clientY - centerY;
  
  // Calculate distance from center
  const distance = Math.sqrt(x * x + y * y);
  const maxRadius = Math.min(rect.width, rect.height) / 2;
  
  if (distance > maxRadius) return null;
  
  // Calculate angle
  let angle = Math.atan2(y, x) * (180 / Math.PI);
  if (angle < 0) angle += 360;
  
  // Calculate intensity based on distance from center (0% at center, 100% at edge)
  const intensity = Math.round((distance / maxRadius) * 100);
  
  // For free-form blending, calculate blend weights for all emotions
  const emotionBlends = emotionPairs.map(emotion => {
    const angleDiff = Math.min(
      Math.abs(angle - emotion.angle),
      360 - Math.abs(angle - emotion.angle)
    );
    
    // Use a smoother falloff for blending (max influence within 36 degrees)
    const maxInfluence = 36; // 360 / 10 for smooth blending
    const weight = Math.max(0, 1 - (angleDiff / maxInfluence));
    
    return {
      emotion,
      weight,
      angleDiff
    };
  });
  
  // Find the primary emotion (highest weight)
  const primaryEmotion = emotionBlends.reduce((max, current) => 
    current.weight > max.weight ? current : max
  );
  
  // Find secondary emotions for blending
  const activeBlends = emotionBlends.filter(blend => blend.weight > 0.1);
  
  return {
    emotion: primaryEmotion.emotion,
    intensity,
    distance,
    maxRadius,
    blends: activeBlends,
    angle
  };
};