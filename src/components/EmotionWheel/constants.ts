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

// Helper function to create smooth color transitions
export const createSmoothGradient = (emotions: EmotionPair[]) => {
  const sortedEmotions = [...emotions].sort((a, b) => a.angle - b.angle);
  const stops: string[] = [];
  
  sortedEmotions.forEach((emotion, index) => {
    const nextEmotion = sortedEmotions[(index + 1) % sortedEmotions.length];
    const currentAngle = emotion.angle;
    
    // Each emotion gets 45 degrees total (22.5 degrees on each side)
    const sectorStart = currentAngle - 22.5;
    const sectorEnd = currentAngle + 22.5;
    
    // Pure color in the center (30 degrees of pure color)
    stops.push(`${emotion.color} ${currentAngle - 15}deg`);
    stops.push(`${emotion.color} ${currentAngle}deg`);
    stops.push(`${emotion.color} ${currentAngle + 15}deg`);
    
    // Start fading to next color (15 degrees of fade on each side)
    const fadeStart = currentAngle + 15;
    const fadeEnd = currentAngle + 22.5;
    
    // Calculate next emotion's sector start
    let nextSectorStart = nextEmotion.angle - 22.5;
    if (nextSectorStart < 0) nextSectorStart += 360;
    if (nextSectorStart < currentAngle) nextSectorStart += 360;
    
    // Fade transition zone
    stops.push(`${emotion.color} ${fadeStart}deg`);
    stops.push(`${nextEmotion.color} ${nextSectorStart}deg`);
  });
  
  // Complete the circle by adding the first emotion's color at 360deg
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