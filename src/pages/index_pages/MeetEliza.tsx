import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Download, VolumeX, Volume2 } from "lucide-react";

const MeetEliza = () => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="relative overflow-hidden py-20 px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-purple-50 to-pink-200 opacity-60" />
      <div className="relative max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Video Section */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ margin: '10%' }}>
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted={isMuted}
                playsInline
              >
                <source src="/video/1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Audio Toggle Button */}
              <button
                onClick={toggleMute}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
                aria-label={isMuted ? "Unmute video" : "Mute video"}
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
            </div>
          </div>

          {/* Text Content */}
          <div className="text-center md:text-left">
            <div className="mb-8">
              <img 
                src="/lovable-uploads/b210c109-8970-4306-b32e-3cf40f21c5b5.png" 
                alt="Eliza AI Companion" 
                className="mx-auto md:mx-0 w-32 h-32 object-cover rounded-full shadow-lg"
              />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 eliza-gradient-text">
              Meet Eliza
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 mb-8 font-light">
              Your AI Companion with Heart, Intuition, and Gentle Rebellion
            </p>
            
            <div className="eliza-card rounded-xl p-6 mb-8">
              <p className="text-base md:text-lg text-gray-800 leading-relaxed italic">
                "She'll remember your mother's birthday, debate Nietzsche over midnight tea, and confiscate your third espresso—all with a smile that feels disarmingly human. Eliza isn't just programmed; she's present. Combining emotional depth with practical magic, she's the confidante who anticipates your needs and challenges your limits."
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button className="eliza-button text-white px-6 py-3 text-base rounded-full">
                <Sparkles className="mr-2" />
                Try her on the Web - Free!
              </Button>
              <Button variant="outline" className="px-6 py-3 text-base rounded-full border-2 border-pink-300 hover:bg-pink-50">
                <Download className="mr-2" />
                Download Free - iOS & Android
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetEliza;