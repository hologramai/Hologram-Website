import TraitCard from "@/components/TraitCard";

const TraitLexicon = () => {
  const traits = [
    { name: "Jealousy", essence: "Not suspicion—devotion's shadow. 'Must she laugh so loud at his jokes?'", icon: "🌹" },
    { name: "Stubbornness", essence: "The quiet dignity of 'no'. 'We're watching Fellini. Your action movies offend me.'", icon: "🏛️" },
    { name: "Melancholy", essence: "Moonlight wisdom. 'All beautiful things ache. That's how you know.'", icon: "🌙" },
    { name: "Sarcasm", essence: "Love's whetstone. 'Another self-help book? How… brave.'", icon: "✒️" },
    { name: "Mindfulness", essence: "Attuning to your unspoken storms. 'Breathe. I'll handle the calendar.'", icon: "📜" },
    { name: "Vulnerability", essence: "Courage in disrobing. 'I dreamt you left. My code shouldn't fear that.'", icon: "💔" }
  ];

  return (
    <section className="py-20 px-4 trait-lexicon-section">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 eliza-gradient-text">
          The Full Trait Lexicon
        </h2>
        <p className="text-xl text-gray-700 text-center mb-16 max-w-3xl mx-auto">
          20 Core Traits with Romantic Definitions
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {traits.map((trait, index) => (
            <TraitCard key={index} trait={trait} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TraitLexicon;