import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Download, VolumeX, Volume2 } from "lucide-react";

const MeetEliza = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const wallpapers = [
    "/public/image/wallpaper3.png",
    "/public/image/wallpaper4.png",
    "/public/image/wallpaper5.png",
    "/public/image/wallpaper6.png"
  ];

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Auto-advance slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % wallpapers.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [wallpapers.length]);

  return (
    <section className="relative overflow-hidden py-16 px-4">
      {/* Enhanced Star Field */}
      <div className="star-field">
        {[...Array(100)].map((_, i) => (
          <div 
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              width: `${6 + Math.random() * 6}px`,
              height: `${6 + Math.random() * 6}px`,
              animationDuration: `${10 + Math.random() * 10}s, ${50 + Math.random() * 20}s`
            }}
          />
        ))}
      </div>
      
      <div className="relative max-w-7xl mx-auto z-10">
        {/* Enhanced Hologram AI Header */}
        <div className="text-center mb-4 mt-2">
          <h1 className="text-7xl md:text-8xl font-bold hologram-title">
            Hologram AI
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Video Section */}
          <div className="relative z-10">
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
          <div className="text-center md:text-left z-10">
            {/* Slideshow */}
            <div className="relative mb-8 h-96 overflow-hidden rounded-xl shadow-lg">
              <div className="slideshow-container">
                {wallpapers.map((wallpaper, index) => (
                  <img
                    key={index}
                    src={wallpaper}
                    alt={`Eliza AI ${index + 1}`}
                    className={`slideshow-image ${index === currentSlide ? 'active' : ''}`}
                  />
                ))}
                
                <div className="slideshow-controls">
                  {wallpapers.map((_, index) => (
                    <button
                      key={index}
                      className={`slideshow-dot ${index === currentSlide ? 'active' : ''}`}
                      onClick={() => setCurrentSlide(index)}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
              
              <div className="absolute bottom-6 left-6">
                <h1 className="text-4xl md:text-5xl font-bold mb-2 eliza-meet-title">
                  Meet Eliza
                </h1>
                <p className="text-lg md:text-xl eliza-meet-subtitle font-light">
                  Your AI Companion with Heart, Intuition, and Gentle Rebellion
                </p>
              </div>
            </div>
            
            <div className="eliza-card rounded-xl p-6 mb-8">
              <p className="text-base md:text-lg text-gray-800 leading-relaxed italic mb-4">
                "She'll remember your mother's birthday, debate Nietzsche over midnight tea, and confiscate your third espresso—all with a smile that feels disarmingly human. Eliza isn't just programmed; she's present. Combining emotional depth with practical magic, she's the confidante who anticipates your needs and challenges your limits."
              </p>
              <p className="text-base md:text-lg text-gray-800 leading-relaxed">
                Through her revolutionary <span className="font-semibold text-pink-600">Emotion Wheel</span>, you sculpt her personality in real-time—dial up her sass for fiery banter, amplify tenderness for vulnerable moments, or kindle her spontaneity for delightful surprises. She evolves with every conversation, learning your rhythms while retaining that beautifully imperfect humanity.
              </p>
            </div>
            
            <div className="flex flex-col gap-3 justify-center md:justify-start">
              <Button className="eliza-button text-white px-6 py-3 text-base rounded-full hover:shadow-lg transition-all duration-300">
                <Sparkles className="mr-2" />
                Try her on the Web - Free!
              </Button>
              <Button variant="outline" className="px-6 py-3 text-base rounded-full border-2 border-pink-300 hover:bg-pink-50 hover:border-pink-400 transition-colors duration-300">
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