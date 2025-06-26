import React from "react";

interface ElizaAvatarProps {
  elizaReaction: string;
}

const ElizaAvatar: React.FC<ElizaAvatarProps> = ({ elizaReaction }) => {
  return (
    <div className="text-center mb-8">
      <div className="relative inline-block">
        <img 
          src="/lovable-uploads/508a3511-1425-40e4-9116-e5a7245cc185.png" 
          alt="Eliza Avatar" 
          className="w-32 h-32 object-cover rounded-full mx-auto shadow-lg animate-pulse-glow"
        />
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-400/20 to-purple-400/20"></div>
      </div>
      <div className="mt-4 mb-6 p-4 bg-pink-50 rounded-lg w-full max-w-2xl mx-auto min-h-[80px] flex items-center justify-center">
        <p className="text-sm italic text-gray-700 text-center">{elizaReaction}</p>
      </div>
    </div>
  );
};

export default ElizaAvatar;