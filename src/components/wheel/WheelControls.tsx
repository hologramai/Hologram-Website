import React from "react";
import { Button } from "@/components/ui/button";
import { Lock, RotateCcw } from "lucide-react";

interface WheelControlsProps {
  selectedEmotion: string | null;
  intensity: number;
  emotionPairs: Array<{
    id: string;
    primary: string;
  }>;
  isLocked: boolean;
  onLockSettings: () => void;
  onReset: () => void;
}

const WheelControls: React.FC<WheelControlsProps> = ({
  selectedEmotion,
  intensity,
  emotionPairs,
  isLocked,
  onLockSettings,
  onReset
}) => {
  return (
    <>
      {/* Current Selection Display */}
      {selectedEmotion && (
        <div className="text-center mb-6">
          <div className="inline-block bg-white rounded-lg p-4 shadow-md">
            <p className="text-lg font-semibold text-gray-800">
              {emotionPairs.find(e => e.id === selectedEmotion)?.primary}
            </p>
            <p className="text-sm text-gray-600">Intensity: {intensity}%</p>
          </div>
        </div>
      )}

      {/* Control Buttons */}
      <div className="flex gap-4 justify-center">
        <Button 
          onClick={onLockSettings}
          variant={isLocked ? "default" : "outline"}
          className={isLocked ? "eliza-button text-white" : "border-pink-300 hover:bg-pink-50"}
        >
          <Lock className="mr-2 w-4 h-4" />
          {isLocked ? "Locked" : "Lock Settings"}
        </Button>
        <Button 
          onClick={onReset}
          variant="outline"
          className="border-pink-300 hover:bg-pink-50"
        >
          <RotateCcw className="mr-2 w-4 h-4" />
          Reset
        </Button>
      </div>
    </>
  );
};

export default WheelControls;