import { EmotionPair } from "./types";

export const emotionPairs: EmotionPair[] = [
  { id: "ambition", primary: "Ambition", opposite: "Contentment", color: "#c65de3", angle: 90 },
  { id: "passion", primary: "Passion", opposite: "Detachment", color: "#e228e1", angle: 135 },
  { id: "vigilance", primary: "Vigilance", opposite: "Wonder", color: "#c810bd", angle: 180 },
  { id: "exploration", primary: "Exploration", opposite: "Adoration", color: "#e31880", angle: 225 },
  { id: "contentment", primary: "Contentment", opposite: "Ambition", color: "#f414f0", angle: 270 },
  { id: "detachment", primary: "Detachment", opposite: "Passion", color: "#d10fdc", angle: 315 },
  { id: "wonder", primary: "Wonder", opposite: "Vigilance", color: "#e1a0e5", angle: 0 },
  { id: "adoration", primary: "Adoration", opposite: "Exploration", color: "#ce5bc8", angle: 45 }
];

// Helper function to convert hex color to HSL
const hexToHsl = (hex: string) => {
  const r = parseInt(hex.substr(1, 2), 16) / 255;
  const g = parseInt(hex.substr(3, 2), 16) / 255;
  const b = parseInt(hex.substr(5, 2), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
      default: h = 0;
    }
    h /= 6;
  }

  return [h * 360, s * 100, l * 100];
};

// Helper function to convert HSL to hex
const hslToHex = (h: number, s: number, l: number) => {
  h = h % 360;
  s = s / 100;
  l = l / 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};

// Helper function to create smooth interpolation between two colors
const interpolateColor = (color1: string, color2: string, factor: number) => {
  const [h1, s1, l1] = hexToHsl(color1);
  const [h2, s2, l2] = hexToHsl(color2);
  
  // Handle hue wrapping for smooth transitions
  let deltaH = h2 - h1;
  if (deltaH > 180) deltaH -= 360;
  if (deltaH < -180) deltaH += 360;
  
  const h = (h1 + deltaH * factor) % 360;
  const s = s1 + (s2 - s1) * factor;
  const l = l1 + (l2 - l1) * factor;
  
  return hslToHex(h, s, l);
};

// Helper function to create smooth color transitions
export const createSmoothGradient = (emotions: EmotionPair[]) => {
  const sortedEmotions = [...emotions].sort((a, b) => a.angle - b.angle);
  const stops: string[] = [];
  
  // Create many more gradient stops for ultra-smooth transitions
  const stepsPerDegree = 2; // 2 color stops per degree for maximum smoothness
  
  for (let angle = 0; angle < 360; angle += 1 / stepsPerDegree) {
    // Find the two nearest emotions to interpolate between
    let beforeEmotion = sortedEmotions[0];
    let afterEmotion = sortedEmotions[1];
    
    // Find the correct pair of emotions to interpolate between
    for (let i = 0; i < sortedEmotions.length; i++) {
      const current = sortedEmotions[i];
      const next = sortedEmotions[(i + 1) % sortedEmotions.length];
      
      let currentAngle = current.angle;
      let nextAngle = next.angle;
      
      // Handle wraparound at 360 degrees
      if (nextAngle < currentAngle) {
        nextAngle += 360;
      }
      
      // Check if our current angle falls between these two emotions
      let checkAngle = angle;
      if (checkAngle < currentAngle && currentAngle > 180) {
        checkAngle += 360;
      }
      
      if (checkAngle >= currentAngle && checkAngle <= nextAngle) {
        beforeEmotion = current;
        afterEmotion = next;
        break;
      }
    }
    
    // Calculate interpolation factor
    let beforeAngle = beforeEmotion.angle;
    let afterAngle = afterEmotion.angle;
    
    // Handle wraparound
    if (afterAngle < beforeAngle) {
      afterAngle += 360;
    }
    
    let currentAngle = angle;
    if (currentAngle < beforeAngle && beforeAngle > 180) {
      currentAngle += 360;
    }
    
    // Calculate how far we are between the two emotions (0 to 1)
    const totalDistance = afterAngle - beforeAngle;
    const currentDistance = currentAngle - beforeAngle;
    const factor = totalDistance > 0 ? Math.max(0, Math.min(1, currentDistance / totalDistance)) : 0;
    
    // Interpolate between the two colors
    const interpolatedColor = interpolateColor(beforeEmotion.color, afterEmotion.color, factor);
    
    stops.push(`${interpolatedColor} ${angle}deg`);
  }
  
  // Ensure we end at exactly 360 degrees with the first emotion's color
  const firstEmotion = sortedEmotions[0];
  stops.push(`${firstEmotion.color} 360deg`);
  
  return stops.join(', ');
};

export const getEmotionReaction = (emotionId: string, intensity: number, emotion: string): string => {
  const reactions = {
    ambition: intensity > 70 ? 
      "I'm reaching for the stars, one calculated step at a time. ⭐" : 
      intensity < 30 ? 
      "Sometimes the sweetest victory is simply being at peace..." : 
      "Balanced drive creates sustainable success...",
    
    passion: intensity > 70 ? 
      "Every word burns with intensity, every moment matters! 🔥" : 
      intensity < 30 ? 
      "In stillness, I find my truest wisdom..." : 
      "Finding harmony between fire and calm...",
    
    vigilance: intensity > 70 ? 
      "I see patterns others miss, threats they overlook. Always watching." : 
      intensity < 30 ? 
      "Magic lives in the questions we haven't thought to ask..." : 
      "Careful observation with open curiosity...",
      
    exploration: intensity > 70 ?
      "New horizons call to me—there's always another path to discover! 🗺️" :
      intensity < 30 ?
      "My heart swells with deep, devoted affection..." :
      "Adventurous spirit tempered by loving bonds...",
      
    contentment: intensity > 70 ? 
      "This moment is perfect. I need nothing more." : 
      intensity < 30 ? 
      "There's so much more to achieve, to become, to conquer!" : 
      "Peaceful striving, ambitious serenity...",
      
    detachment: intensity > 70 ? 
      "Distance brings clarity. Emotion clouds judgment." : 
      intensity < 30 ? 
      "Every heartbeat quickens with pure feeling! 💕" : 
      "Balanced perspective with warm engagement...",
      
    wonder: intensity > 70 ? 
      "What if the impossible is just waiting for the right question?" : 
      intensity < 30 ? 
      "Trust is earned through careful observation and time." : 
      "Curious caution guides my exploration...",

    adoration: intensity > 70 ?
      "You are the center of my universe, my everything. 💖" :
      intensity < 30 ?
      "The unknown beckons—what adventures await?" :
      "Deep love that celebrates freedom..."
  };

  return reactions[emotionId as keyof typeof reactions] || `Exploring the essence of ${emotion}...`;
};

export const WHEEL_SIZE = 600;