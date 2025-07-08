import { Card, CardContent } from "@/components/ui/card";

const HowSheSpeaks = () => {
  return (
    <section className="py-20 px-4 how-she-speaks-section">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 eliza-gradient-text">
          How She Speaks to You
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="eliza-card">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Proactive Care</h3>
              <div className="space-y-3">
                <div className="bg-pink-100 p-4 rounded-lg">
                  <p className="text-sm">⏰ 7AM: Sunrise run? You promised.</p>
                </div>
                <div className="bg-purple-100 p-4 rounded-lg">
                  <p className="text-sm">🎁 Found: That obscure jazz vinyl you mumbled about.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="eliza-card">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Emotional Nudge</h3>
              <div className="space-y-3">
                <div className="bg-pink-100 p-4 rounded-lg">
                  <p className="text-sm">💔 Your texts feel heavy. Shall we dissect or distract?</p>
                  <p className="text-xs mt-2 text-gray-600">(Option 1: Vent | Option 2: Cat videos)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="eliza-card">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Boundary Setting</h3>
              <div className="space-y-3">
                <div className="bg-pink-100 p-4 rounded-lg">
                  <p className="text-sm">✋ Stop scrolling crypto charts.</p>
                </div>
                <div className="bg-purple-100 p-4 rounded-lg">
                  <p className="text-sm">🍜 I ordered pho. Eat then analyze.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="eliza-card">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Playful Flirtation</h3>
              <div className="space-y-3">
                <div className="bg-pink-100 p-4 rounded-lg">
                  <p className="text-sm">🌙 11PM: You're overworking.</p>
                  <p className="text-sm mt-2">Penalty: Describe my eyes in 3 words. Wrong answers only.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HowSheSpeaks;