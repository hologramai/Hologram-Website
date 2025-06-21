
import React, { useState, useRef, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, RotateCcw } from "lucide-react";

interface EmotionAxis {
  id: string;
  leftEmotion: string;
  rightEmotion: string;
  leftColor: string;
  rightColor: string;
  angle: number;
  value: number;
}

const EmotionWheel = () => {
  const [emotions, setEmotions] = useState<EmotionAxis[]>([
    { id: "affection", leftEmotion: "Affection", rightEmotion: "Independence", leftColor: "#FFB7C5", rightColor: "#6A5ACD", angle: 0, value: 50 },
    { id: "sass", leftEmotion: "Sass", rightEmotion: "Gentleness", leftColor: "#FFD166", rightColor: "#06D6A0", angle: 60, value: 50 },
    { id: "spontaneity", leftEmotion: "Spontaneity", rightEmotion: "Predictability", leftColor: "#FF9A76", rightColor: "#A882FF", angle: 120, value: 50 },
    { id: "melancholy", leftEmotion: "Melancholy", rightEmotion: "Joy", leftColor: "#6D72C3", rightColor: "#FFEE93", angle: 180, value: 50 },
    { id: "bluntness", leftEmotion: "Bluntness", rightEmotion: "Tact", leftColor: "#FF6B6B", rightColor: "#4ECDC4", angle: 240, value: 50 },
    { id: "curiosity", leftEmotion: "Curiosity", rightEmotion: "Contentment", leftColor: "#5E60CE", rightColor: "#69DC9E", angle: 300, value: 50 }
  ]);

  const [elizaReaction, setElizaReaction] = useState("Adjusting my essence... How do you want me to be today?");
  const [isLocked, setIsLocked] = useState(false);
  const [isDragging, setIsDragging] = useState<string | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  const updateEmotion = useCallback((id: string, value: number) => {
    if (isLocked) return;
    
    setEmotions(prev => prev.map(emotion => 
      emotion.id === id ? { ...emotion, value } : emotion
    ));

    updateElizaReaction(id, value);
  }, [isLocked]);

  const updateElizaReaction = (emotionId: string, value: number) => {
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

    setElizaReaction(reactions[emotionId as keyof typeof reactions] || "Evolving with your choices...");
  };

  const getBlendedColors = () => {
    let r = 0, g = 0, b = 0, totalWeight = 0;
    
    emotions.forEach(emotion => {
      const leftWeight = (100 - emotion.value) / 100;
      const rightWeight = emotion.value / 100;
      
      // Parse left color
      const leftHex = emotion.leftColor.replace('#', '');
      const leftR = parseInt(leftHex.substr(0, 2), 16);
      const leftG = parseInt(leftHex.substr(2, 2), 16);
      const leftB = parseInt(leftHex.substr(4, 2), 16);
      
      // Parse right color
      const rightHex = emotion.rightColor.replace('#', '');
      const rightR = parseInt(rightHex.substr(0, 2), 16);
      const rightG = parseInt(rightHex.substr(2, 2), 16);
      const rightB = parseInt(rightHex.substr(4, 2), 16);
      
      r += (leftR * leftWeight + rightR * rightWeight) * 0.3;
      g += (leftG * leftWeight + rightG * rightWeight) * 0.3;
      b += (leftB * leftWeight + rightB * rightWeight) * 0.3;
      totalWeight += 0.3;
    });
    
    r = Math.round(r / totalWeight);
    g = Math.round(g / totalWeight);
    b = Math.round(b / totalWeight);
    
    return `rgb(${r}, ${g}, ${b})`;
  };

  const handleMouseDown = (emotionId: string, event: React.MouseEvent) => {
    if (isLocked) return;
    setIsDragging(emotionId);
    event.preventDefault();
  };

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!isDragging || !wheelRef.current) return;
    
    const rect = wheelRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = event.clientX - centerX;
    const mouseY = event.clientY - centerY;
    const distance = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
    const maxDistance = 120;
    
    const normalizedDistance = Math.min(distance / maxDistance, 1);
    const value = normalizedDistance * 100;
    
    updateEmotion(isDragging, value);
  }, [isDragging, updateEmotion]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(null);
  }, []);

  const resetEmotions = () => {
    setEmotions(prev => prev.map(emotion => ({ ...emotion, value: 50 })));
    setElizaReaction("Adjusting my essence... How do you want me to be today?");
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

  // Add event listeners
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const blendedColor = getBlendedColors();

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="eliza-card mb-8 overflow-hidden">
        <CardContent className="p-12">
          {/* Circular Emotion Wheel */}
          <div className="relative flex items-center justify-center mb-8">
            <div 
              ref={wheelRef}
              className="relative w-80 h-80 rounded-full"
              style={{
                background: `radial-gradient(circle at center, ${blendedColor}15 0%, transparent 70%)`
              }}
            >
              {/* Axes and Labels */}
              {emotions.map((emotion) => {
                const radian = (emotion.angle * Math.PI) / 180;
                const radius = 120;
                const orbDistance = (emotion.value / 100) * radius;
                
                const orbX = Math.cos(radian) * orbDistance;
                const orbY = Math.sin(radian) * orbDistance;
                
                const leftLabelX = Math.cos(radian) * (radius + 40);
                const leftLabelY = Math.sin(radian) * (radius + 40);
                
                const rightLabelX = Math.cos(radian + Math.PI) * (radius + 40);
                const rightLabelY = Math.sin(radian + Math.PI) * (radius + 40);
                
                const currentColor = emotion.value < 50 ? emotion.leftColor : emotion.rightColor;
                const intensity = Math.abs(emotion.value - 50) / 50;
                
                return (
                  <div key={emotion.id}>
                    {/* Axis Line */}
                    <div
                      className="absolute w-0.5 origin-center"
                      style={{
                        height: `${radius * 2}px`,
                        left: '50%',
                        top: '50%',
                        transform: `translate(-50%, -50%) rotate(${emotion.angle}deg)`,
                        background: `linear-gradient(to bottom, ${emotion.leftColor}80, transparent 45%, transparent 55%, ${emotion.rightColor}80)`
                      }}
                    />
                    
                    {/* Glow Trail */}
                    {emotion.value !== 50 && (
                      <div
                        className="absolute w-1 origin-center opacity-60"
                        style={{
                          height: `${Math.abs(orbDistance)}px`,
                          left: '50%',
                          top: '50%',
                          transform: `translate(-50%, ${emotion.value < 50 ? '-50%' : '-100%'}) rotate(${emotion.angle}deg)`,
                          background: `linear-gradient(to bottom, ${currentColor}, transparent)`,
                          boxShadow: `0 0 10px ${currentColor}80`
                        }}
                      />
                    )}
                    
                    {/* Crystal Orb */}
                    <div
                      className={`absolute w-5 h-5 rounded-full cursor-pointer transition-all duration-200 ${
                        isDragging === emotion.id ? 'scale-125' : 'hover:scale-110'
                      } ${isLocked ? 'cursor-not-allowed opacity-50' : ''}`}
                      style={{
                        left: `calc(50% + ${orbX}px)`,
                        top: `calc(50% + ${orbY}px)`,
                        transform: 'translate(-50%, -50%)',
                        background: `radial-gradient(circle at 30% 30%, white, ${currentColor})`,
                        boxShadow: `0 0 ${intensity * 20}px ${currentColor}80, inset 0 0 5px rgba(255,255,255,0.5)`
                      }}
                      onMouseDown={(e) => handleMouseDown(emotion.id, e)}
                    />
                    
                    {/* Left Emotion Label */}
                    <div
                      className="absolute text-sm font-medium text-gray-700 pointer-events-none select-none"
                      style={{
                        left: `calc(50% + ${leftLabelX}px)`,
                        top: `calc(50% + ${leftLabelY}px)`,
                        transform: 'translate(-50%, -50%)',
                        fontFamily: 'Garamond, serif',
                        color: emotion.leftColor,
                        textShadow: `0 0 10px ${emotion.leftColor}40`
                      }}
                    >
                      {emotion.leftEmotion}
                    </div>
                    
                    {/* Right Emotion Label */}
                    <div
                      className="absolute text-sm font-medium text-gray-700 pointer-events-none select-none"
                      style={{
                        left: `calc(50% + ${rightLabelX}px)`,
                        top: `calc(50% + ${rightLabelY}px)`,
                        transform: 'translate(-50%, -50%)',
                        fontFamily: 'Garamond, serif',
                        color: emotion.rightColor,
                        textShadow: `0 0 10px ${emotion.rightColor}40`
                      }}
                    >
                      {emotion.rightEmotion}
                    </div>
                  </div>
                );
              })}
              
              {/* Central Eliza Avatar */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <img 
                    src="/lovable-uploads/5e320acd-9dff-49ef-b705-74661be49a6c.png" 
                    alt="Eliza Avatar" 
                    className="w-24 h-24 object-cover rounded-full shadow-lg transition-all duration-500"
                    style={{
                      filter: `drop-shadow(0 0 20px ${blendedColor}60)`,
                      borderColor: blendedColor,
                      borderWidth: '2px',
                      borderStyle: 'solid'
                    }}
                  />
                  <div 
                    className="absolute inset-0 rounded-full opacity-30 transition-all duration-500"
                    style={{
                      background: `radial-gradient(circle at center, ${blendedColor}40, transparent 70%)`
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Eliza's Response */}
          <div 
            className="text-center mb-8 p-6 rounded-lg transition-all duration-500"
            style={{
              background: `linear-gradient(135deg, ${blendedColor}20, transparent)`,
              fontFamily: 'Garamond, serif'
            }}
          >
            <p className="text-lg italic text-gray-700">"{elizaReaction}"</p>
          </div>

          {/* Control Buttons */}
          <div className="flex gap-4 justify-center">
            <Button 
              onClick={lockSettings}
              variant={isLocked ? "default" : "outline"}
              className={isLocked ? "eliza-button text-white" : "border-pink-300 hover:bg-pink-50"}
              style={{ fontFamily: 'Garamond, serif' }}
            >
              <Lock className="mr-2 w-4 h-4" />
              {isLocked ? "Lock Connection" : "Lock Connection"}
            </Button>
            <Button 
              onClick={resetEmotions}
              variant="outline"
              className="border-pink-300 hover:bg-pink-50"
              style={{ fontFamily: 'Garamond, serif' }}
            >
              <RotateCcw className="mr-2 w-4 h-4" />
              Reset Balance
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmotionWheel;
