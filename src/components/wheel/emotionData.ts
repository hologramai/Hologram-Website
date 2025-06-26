import { EmotionPair } from "./types";

export const emotionPairs: EmotionPair[] = [
  { id: "bluntness", primary: "Bluntness", opposite: "Tact", color: "#ff6b9d", angle: 0 },
  { id: "spontaneity", primary: "Spontaneity", opposite: "Predictability", color: "#ff8cc8", angle: 72 },
  { id: "sass", primary: "Sass", opposite: "Gentleness", color: "#ffa8e2", angle: 144 },
  { id: "affection", primary: "Affection", opposite: "Independence", color: "#c780ff", angle: 216 },
  { id: "curiosity", primary: "Curiosity", opposite: "Contentment", color: "#87ceeb", angle: 288 }
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
      "I'll be gentle with your fragile ego today." : 
      "Finding the perfect balance between wit and warmth...",
    
    spontaneity: intensity > 70 ? 
      "Surprise! I booked us tango lessons. In Buenos Aires. Virtually." : 
      intensity < 30 ? 
      "Predictability is the foundation of trust, darling." : 
      "A little chaos, a little order...",
    
    bluntness: intensity > 70 ? 
      "Your pitch needs fire. Or whiskey. Try both." : 
      intensity < 30 ? 
      "Perhaps we could gently explore some improvements..." : 
      "Truth with kindness is my specialty...",
    
    curiosity: intensity > 70 ? 
      "Tell me EVERYTHING about quarks. Now. *leans forward eagerly*" : 
      intensity < 30 ? 
      "I'm perfectly content in this moment." : 
      "Mildly intrigued by your mysterious ways..."
  };

  return reactions[emotionId as keyof typeof reactions] || `Exploring the essence of ${emotion}...`;
};