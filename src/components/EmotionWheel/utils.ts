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
  
  // Increase intensity threshold for better cursor response (multiply by 15 for detection)
  const detectionIntensity = Math.round((finalDistance / maxRadius) * 1500);
  
  // Keep UI display intensity at normal 0-100 scale
  const displayIntensity = Math.round((finalDistance / maxRadius) * 100);
  
  // Calculate angle in degrees (0-360), starting from right (0°) going clockwise
  let angle = Math.atan2(clampedY, clampedX) * (180 / Math.PI);
  if (angle < 0) angle += 360;
  
  // Only detect emotions when cursor has sufficient intensity (> 150 out of 1500)
  let closestEmotion = null;
  
  if (detectionIntensity > 150) {
    for (const emotion of emotionPairs) {
      const sectorStart = emotion.angle - 22.5;
      const sectorEnd = emotion.angle + 22.5;
      
      // Handle wrap-around for sectors that cross 0°/360°
      if (sectorStart < 0) {
        // Sector wraps around (e.g., Wonder at 0° has sector from 337.5° to 22.5°)
        if (angle >= (sectorStart + 360) || angle <= sectorEnd) {
          closestEmotion = emotion;
          break;
        }
      } else if (sectorEnd > 360) {
        // Sector wraps around the other way
        if (angle >= sectorStart || angle <= (sectorEnd - 360)) {
          closestEmotion = emotion;
          break;
        }
      } else {
        // Normal sector (no wrap-around)
        if (angle >= sectorStart && angle <= sectorEnd) {
          closestEmotion = emotion;
          break;
        }
      }
    }
  }
  
  // Fallback to first emotion if none detected
  if (!closestEmotion) {
    closestEmotion = emotionPairs[0];
  }
  
  return {
    emotion: closestEmotion,
    intensity: displayIntensity, // Use display intensity for UI
    distance: finalDistance,
    maxRadius,
    angle,
    x: clampedX,
    y: clampedY
  };
};