import EmotionColorWheel from "@/components/EmotionColorWheel";

const CraftHerSoul = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-pink-50 to-purple-50">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 eliza-gradient-text">
          Craft Her Soul
        </h2>
        <p className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto">
          Shape Eliza's personality with our Victorian-inspired Emotion Wheel. Watch her transform in real-time as you adjust her traits.
        </p>
        <EmotionColorWheel />
      </div>
    </section>
  );
};

export default CraftHerSoul;