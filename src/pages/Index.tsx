import { Analytics } from "@vercel/analytics/react";
import MeetEliza from "./index_pages/MeetEliza";
import CraftHerSoul from "./index_pages/CraftHerSoul";
import WhyElizaTranscends from "./index_pages/WhyElizaTranscends";
import TraitLexicon from "./index_pages/TraitLexicon";
import HowSheSpeaks from "./index_pages/HowSheSpeaks";
import NotPerfect from "./index_pages/NotPerfect";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <div className="section-container">
        <MeetEliza />
      </div>
      
      <div className="section-container">
        <CraftHerSoul />
      </div>
      
      <div className="section-container">
        <WhyElizaTranscends />
      </div>
      
      <div className="section-container">
        <TraitLexicon />
      </div>
      
      <div className="section-container">
        <HowSheSpeaks />
      </div>
      
      <div className="section-container">
        <NotPerfect />
      </div>
      
      {/* Vercel Analytics */}
      <Analytics />
    </div>
  );
};

export default Index;