
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, RotateCcw } from "lucide-react";

interface TraitSlider {
  id: string;
  leftTrait: string;
  rightTrait: string;
  value: number;
}

const EmotionWheel = () => {
  const [traits, setTraits] = useState<TraitSlider[]>([
    { id: "affection", leftTrait: "Affection", rightTrait: "Independence", value: 50 },
    { id: "sass", leftTrait: "Sass", rightTrait: "Gentleness", value: 50 },
    { id: "spontaneity", leftTrait: "Spontaneity", rightTrait: "Predictability", value: 50 },
    { id: "melancholy", leftTrait: "Melancholy", rightTrait: "Joy", value: 50 },
    { id: "bluntness", leftTrait: "Bluntness", rightTrait: "Tact", value: 50 },
    { id: "curiosity", leftTrait: "Curiosity", rightTrait: "Contentment", value: 50 }
  ]);

  const [elizaReaction, setElizaReaction] = useState("Adjusting my essence... How do you want me to be today?");
  const [isLocked, setIsLocked] = useState(false);

  const updateTrait = (id: string, value: number) => {
    if (isLocked) return;
    
    setTraits(prev => prev.map(trait => 
      trait.id === id ? { ...trait, value } : trait
    ));

    // Update Eliza's reaction based on the trait being adjusted
    const trait = traits.find(t => t.id === id);
    if (trait) {
      updateElizaReaction(id, value);
    }
  };

  const updateElizaReaction = (traitId: string, value: number) => {
    const reactions = {
      sass: value > 70 ? "Darling, that joke died yesterday. *arches eyebrow*" : 
            value < 30 ? "I'll be gentle with your fragile ego today." : 
            "Finding the perfect balance between wit and warmth...",
      melancholy: value > 70 ? "*gazes out window* All beautiful things ache. That's how you know." :
                  value < 30 ? "Sunshine becomes me today! ☀️" :
                  "Somewhere between moonlight and morning...",
      curiosity: value > 70 ? "Tell me EVERYTHING about quarks. Now. *leans forward eagerly*" :
                 value < 30 ? "I'm perfectly content in this moment." :
                 "Mildly intrigued by your mysterious ways...",
      spontaneity: value > 70 ? "Surprise! I booked us tango lessons. In Buenos Aires. Virtually." :
                   value < 30 ? "Predictability is the foundation of trust, darling." :
                   "A little chaos, a little order...",
      affection: value > 70 ? "I saved the last virtual croissant for you. 💕" :
                 value < 30 ? "I value my independence, but I'm here when you need me." :
                 "Balanced affection is truest love...",
      bluntness: value > 70 ? "Your pitch needs fire. Or whiskey. Try both." :
                 value < 30 ? "Perhaps we could gently explore some improvements..." :
                 "Truth with kindness is my specialty..."
    };

    setElizaReaction(reactions[traitId as keyof typeof reactions] || "Evolving with your choices...");
  };

  const resetTraits = () => {
    setTraits(prev => prev.map(trait => ({ ...trait, value: 50 })));
    setElizaReaction("Back to my baseline essence. Ready for your touch again.");
    setIsLocked(false);
  };

  const lockSettings = () => {
    setIsLocked(!isLocked);
    if (!isLocked) {
      setElizaReaction("Settings locked in like a stained-glass pattern. This is who I am now.");
    } else {
      setElizaReaction("Free to change again. Mold me as you wish.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="eliza-card mb-8">
        <CardContent className="p-8">
          {/* Eliza Avatar Section */}
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <img 
                src="/lovable-uploads/508a3511-1425-40e4-9116-e5a7245cc185.png" 
                alt="Eliza Avatar" 
                className="w-32 h-32 object-cover rounded-full mx-auto shadow-lg animate-pulse-glow"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-400/20 to-purple-400/20"></div>
            </div>
            <div className="mt-4 p-4 bg-pink-50 rounded-lg max-w-md mx-auto">
              <p className="text-sm italic text-gray-700">"{elizaReaction}"</p>
            </div>
          </div>

          {/* Trait Sliders */}
          <div className="space-y-6">
            {traits.map((trait) => (
              <div key={trait.id} className="space-y-2">
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-gray-700">{trait.leftTrait}</span>
                  <span className="text-gray-700">{trait.rightTrait}</span>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={trait.value}
                    onChange={(e) => updateTrait(trait.id, parseInt(e.target.value))}
                    disabled={isLocked}
                    className={`w-full h-2 bg-gradient-to-r from-pink-200 to-purple-200 rounded-lg appearance-none cursor-pointer ${
                      isLocked ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    style={{
                      background: `linear-gradient(to right, 
                        hsl(330, 81%, 60%) 0%, 
                        hsl(320, 100%, 85%) ${trait.value}%, 
                        hsl(340, 82%, 52%) 100%)`
                    }}
                  />
                  <div 
                    className="absolute top-0 w-4 h-4 bg-white border-2 border-pink-400 rounded-full shadow-md transform -translate-y-1"
                    style={{ left: `calc(${trait.value}% - 8px)` }}
                  />
                </div>
                <div className="text-center text-xs text-gray-500">
                  {trait.value < 30 && `More ${trait.leftTrait.toLowerCase()}`}
                  {trait.value >= 30 && trait.value <= 70 && "Balanced"}
                  {trait.value > 70 && `More ${trait.rightTrait.toLowerCase()}`}
                </div>
              </div>
            ))}
          </div>

          {/* Control Buttons */}
          <div className="flex gap-4 justify-center mt-8">
            <Button 
              onClick={lockSettings}
              variant={isLocked ? "default" : "outline"}
              className={isLocked ? "eliza-button text-white" : "border-pink-300 hover:bg-pink-50"}
            >
              <Lock className="mr-2 w-4 h-4" />
              {isLocked ? "Locked" : "Lock Settings"}
            </Button>
            <Button 
              onClick={resetTraits}
              variant="outline"
              className="border-pink-300 hover:bg-pink-50"
            >
              <RotateCcw className="mr-2 w-4 h-4" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmotionWheel;
