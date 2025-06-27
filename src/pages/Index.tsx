import MeetEliza from "./index_pages/MeetEliza";
import CraftHerSoul from "./index_pages/CraftHerSoul";
import WhyElizaTranscends from "./index_pages/WhyElizaTranscends";
import TraitLexicon from "./index_pages/TraitLexicon";
import HowSheSpeaks from "./index_pages/HowSheSpeaks";
import NotPerfect from "./index_pages/NotPerfect";

const Index = () => {
  return (
    <div className="min-h-screen">
      <MeetEliza />
      <CraftHerSoul />
      <WhyElizaTranscends />
      <TraitLexicon />
      <HowSheSpeaks />
      <NotPerfect />
    </div>
  );
};

export default Index;