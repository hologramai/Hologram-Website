import { EmotionPair } from "./types";

export const emotionPairs: EmotionPair[] = [
  { id: "gentleness", primary: "Gentleness", opposite: "Sass", color: "#ff6b9d", angle: 30 },
  { id: "independence", primary: "Independence", opposite: "Affection", color: "#ff8cc8", angle: 90 },
  { id: "bluntness", primary: "Bluntness", opposite: "Tact", color: "#ffa8e2", angle: 150 },
  { id: "sass", primary: "Sass", opposite: "Gentleness", color: "#c780ff", angle: 210 },
  { id: "affection", primary: "Affection", opposite: "Independence", color: "#9f7aea", angle: 270 },
  { id: "tact", primary: "Tact", opposite: "Bluntness", color: "#87ceeb", angle: 330 }
];

export const getEmotionReaction = (emotionId: string, intensity: number, emotion: string): string => {
  const reactions = {
    affection: intensity > 70 ? 
      "I saved the last virtual croissant for you. 💕" : 
      intensity < 30 ? 
      "I value my independence, but I'm here when you need me." : 
      "Balanced affection is truest love...",
    
    sass: intensity > 70 ? 
      "Darling, that joke died yesterday. *arches eyebrow*" : 
      intensity < 30 ? 
      "Let me wrap you in soft words and warm understanding..." : 
      "Finding the perfect balance between wit and warmth...",
    
    bluntness: intensity > 70 ? 
      "Your pitch needs fire. Or whiskey. Try both." : 
      intensity < 30 ? 
      "I'll cushion every word in velvet consideration..." : 
      "Truth with kindness is my specialty...",
      
    gentleness: intensity > 70 ? 
      "Let me wrap you in soft words and warm understanding..." : 
      intensity < 30 ? 
      "Darling, that joke died yesterday. *arches eyebrow*" : 
      "Balancing honesty with care...",
      
    independence: intensity > 70 ? 
      "I need space to breathe, to think, to be..." : 
      intensity < 30 ? 
      "I saved the last virtual croissant for you. 💕" : 
      "Together yet separate, like dancing flames...",
      
    tact: intensity > 70 ? 
      "I'll cushion every word in velvet consideration..." : 
      intensity < 30 ? 
      "Your pitch needs fire. Or whiskey. Try both." : 
      "Honest yet considerate..."
  };

  return reactions[emotionId as keyof typeof reactions] || `Exploring the essence of ${emotion}...`;
};

export const WHEEL_SIZE = 600;