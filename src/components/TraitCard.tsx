
import { Card, CardContent } from "@/components/ui/card";

interface Trait {
  name: string;
  essence: string;
  icon: string;
}

interface TraitCardProps {
  trait: Trait;
}

const TraitCard = ({ trait }: TraitCardProps) => {
  return (
    <Card className="eliza-card h-full">
      <CardContent className="p-6 h-full flex flex-col">
        <div className="text-center mb-4">
          <div className="text-4xl mb-3">{trait.icon}</div>
          <h3 className="text-xl font-bold text-gray-800 eliza-gradient-text">
            {trait.name}
          </h3>
        </div>
        
        <div className="flex-grow">
          <p className="text-sm text-gray-700 italic leading-relaxed">
            {trait.essence}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TraitCard;
