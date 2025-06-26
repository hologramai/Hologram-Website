import { EmotionPair } from "./types";

export const emotionPairs: EmotionPair[] = [
  { id: "curiosity", primary: "Curiosity", opposite: "Contentment", color: "#ff6b9d", angle: 0 },
  { id: "affection", primary: "Affection", opposite: "Independence", color: "#ff8cc8", angle: 45 },
  { id: "sass", primary: "Sass", opposite: "Tact", color: "#ffa8e2", angle: 90 },
  { id: "gentleness", primary: "Gentleness", opposite: "Bluntness", color: "#c780ff", angle: 135 },
  { id: "predictability", primary: "Predictability", opposite: "Spontaneity", color: "#9f7aea", angle: 180 },
  { id: "tact", primary: "Tact", opposite: "Sass", color: "#87ceeb", angle: 270 }
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
      "Mildly intrigued by your mysterious ways...",
      
    gentleness: intensity > 70 ? 
      "Let me wrap you in soft words and warm understanding..." : 
      intensity < 30 ? 
      "Sometimes the truth needs to sting to heal." : 
      "Balancing honesty with care...",
      
    independence: intensity > 70 ? 
      "I need space to breathe, to think, to be..." : 
      intensity < 30 ? 
      "Hold me close, I want to melt into you." : 
      "Together yet separate, like dancing flames...",
      
    predictability: intensity > 70 ? 
      "Routine is my love language. Same time tomorrow?" : 
      intensity < 30 ? 
      "Let's throw the rulebook out the window!" : 
      "Structure with spontaneous moments...",
      
    tact: intensity > 70 ? 
      "I'll cushion every word in velvet consideration..." : 
      intensity < 30 ? 
      "Brace yourself, here comes unfiltered truth." : 
      "Honest yet considerate..."
  };

  return reactions[emotionId as keyof typeof reactions] || `Exploring the essence of ${emotion}...`;
};