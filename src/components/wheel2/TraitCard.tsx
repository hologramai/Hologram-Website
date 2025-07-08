
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

interface Trait {
  name: string;
  essence: string;
  icon: string;
}

interface TraitCardProps {
  trait: Trait;
}

const TraitCard = ({ trait }: TraitCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className="eliza-card h-full transition-all duration-300 hover:scale-105 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-6 h-full flex flex-col">
        <div className="text-center mb-4">
          <div className="text-4xl mb-3">{trait.icon}</div>
          <h3 className="text-xl font-bold text-gray-800 eliza-gradient-text">
            {trait.name}
          </h3>
        </div>
        
        <div className="flex-grow">
          <p className={`text-sm text-gray-700 italic leading-relaxed transition-all duration-300 ${
            isHovered ? 'text-gray-800' : ''
          }`}>
            {trait.essence}
          </p>
        </div>
        
        {isHovered && (
          <div className="mt-4 text-center">
            <div className="text-xs text-pink-600 font-medium">
              Hover to experience her essence
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TraitCard;
