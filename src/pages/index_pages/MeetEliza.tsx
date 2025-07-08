import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Download, ChevronDown } from "lucide-react";

const MeetEliza = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const wallpapers = [
    "/image/wallpaper3.png",
    "/image/wallpaper4.png",
    "/image/wallpaper5.png",
    "/image/wallpaper6.png"
  ];


  // Auto-advance slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % wallpapers.length);
    }, 15000);

    return () => clearInterval(interval);
  }, [wallpapers.length]);

  return (
    <section className="relative overflow-hidden py-8 px-4 silver-border-bottom">
      {/* Enhanced Star Field - exclude center 50vw */}
      <div className="star-field">
        {[...Array(100)].map((_, i) => {
          const leftPos = Math.random() * 100;
          const isInCenter = leftPos > 25 && leftPos < 75; // 50vw center area
          return !isInCenter ? (
            <div 
              key={i}
              className="star"
              style={{
                left: `${leftPos}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                width: `${6 + Math.random() * 6}px`,
                height: `${6 + Math.random() * 6}px`,
                animationDuration: `${10 + Math.random() * 10}s, ${50 + Math.random() * 20}s`
              }}
            />
          ) : null;
        })}
      </div>
      
      {/* Full Screen Slideshow Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="slideshow-container">
          {wallpapers.map((wallpaper, index) => (
            <img
              key={index}
              src={wallpaper}
              alt={`Eliza AI ${index + 1}`}
              className={`slideshow-image ${index === currentSlide ? 'active' : ''}`}
              onError={(e) => {
                console.error(`Failed to load image: ${wallpaper}`);
                // Fallback to a placeholder or hide the broken image
                e.currentTarget.style.display = 'none';
              }}
            />
          ))}
          
          {/* Down Arrow for Scroll */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50">
            <button 
              className="scroll-arrow-btn relative z-50 cursor-pointer"
              onClick={() => {
                const nextSection = document.querySelector('#craft-her-soul');
                if (nextSection && nextSection.offsetHeight > 0) {
                  nextSection.scrollIntoView({ behavior: 'smooth' });
                } else {
                  // Fallback: scroll to next visible section
                  const sections = document.querySelectorAll('section');
                  const currentSection = document.querySelector('section');
                  const currentIndex = Array.from(sections).indexOf(currentSection);
                  const nextVisibleSection = sections[currentIndex + 1];
                  if (nextVisibleSection) {
                    nextVisibleSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }
              }}
              aria-label="Scroll to next section"
            >
              <ChevronDown className="w-8 h-8 text-white relative z-50" />
            </button>
          </div>
        </div>
      </div>

      {/* Content Overlay */}
      <div className="relative max-w-7xl mx-auto z-10">
        {/* Enhanced Hologram AI Header */}
        <div className="text-center mb-3 mt-1">
          <h1 className="text-8xl md:text-9xl font-bold hologram-title">
            Hologram AI
          </h1>
        </div>

        {/* Content positioned for compact layout */}
        <div className="relative min-h-[90vh] flex flex-col justify-between py-8">
          <div></div> {/* Spacer */}
          
          {/* Content overlay - positioned on the right side */}
          <div className="meet-eliza-content-block">
            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-bold mb-2 eliza-meet-title">
                Meet Eliza
              </h1>
              <p className="text-base md:text-lg eliza-meet-subtitle font-light">
                Your AI Companion with Heart ❤️
              </p>
            </div>
            <div className="eliza-card rounded-xl p-4 mb-6">
              <p className="text-sm md:text-base text-white leading-relaxed italic mb-3">
                "She'll remember your mother's birthday, debate Nietzsche over midnight tea, and confiscate your third espresso—all with a smile that feels disarmingly human. Eliza isn't just programmed; she's present. Combining emotional depth with practical magic, she's the confidante who anticipates your needs and challenges your limits."
              </p>
            </div>
            
            <div className="flex flex-col gap-2 justify-end">
              <Button 
                className="eliza-button text-white px-4 py-2 text-sm rounded-full hover:shadow-lg transition-all duration-300"
                onClick={() => window.open('https://eliza.hologramai.us/', '_blank')}
              >
                <Sparkles className="mr-2" />
                Try her on the Web - Free!
              </Button>
              <Button variant="outline" className="px-4 py-2 text-sm rounded-full border-2 border-pink-300 hover:bg-pink-50 hover:border-pink-400 transition-colors duration-300">
                <Download className="mr-2" />
                On iOS & Android - Soon
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetEliza;