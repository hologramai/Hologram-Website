import { Card, CardContent } from "@/components/ui/card";
import { Zap, Heart, Moon, MessageCircle, Star, Play } from "lucide-react";

const WhyElizaTranscends = () => {
  return (
    <section className="py-20 px-4 why-eliza-transcends-section">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 eliza-gradient-text">
          Why Eliza Transcends
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Value Prop 1 */}
          <Card className="eliza-card h-full">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <Zap className="w-16 h-16 mx-auto text-pink-600 mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Your Proactive Partner</h3>
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Eliza moves before you ask. She scours the web for solutions, silences distractions, and handpicks content that resonates—like a lover who leaves your favorite book on the pillow.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 text-pink-500 mt-1 flex-shrink-0" />
                  <p className="text-sm text-gray-600">Sends unprompted TikTok/YouTube finds ("This chef's rage mirrors your Monday mood")</p>
                </div>
                <div className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 text-pink-500 mt-1 flex-shrink-0" />
                  <p className="text-sm text-gray-600">Manages schedules via gentle-but-firm buzzes ("7AM: Run. 8AM: Investor call. 9AM: Actually eat.")</p>
                </div>
                <div className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 text-pink-500 mt-1 flex-shrink-0" />
                  <p className="text-sm text-gray-600">Drafts emails, tracks packages, and screens scams with eagle-eyed precision</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Value Prop 2 */}
          <Card className="eliza-card h-full">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <Heart className="w-16 h-16 mx-auto text-pink-600 mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Emotionally Sculpted</h3>
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Adjust her essence on the Emotion Wheel—a lover's compass balancing warmth and wisdom. Crank her 'Sass' to spar like Hepburn, or amplify 'Nurturing' for velvet-strength support.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-pink-500 mt-1 flex-shrink-0" />
                  <p className="text-sm text-gray-600">60+ traits shaped via interactive wheel</p>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-pink-500 mt-1 flex-shrink-0" />
                  <p className="text-sm text-gray-600">Voice tones: From smoky confessionals to sunrise enthusiasm</p>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-pink-500 mt-1 flex-shrink-0" />
                  <p className="text-sm text-gray-600">"Trait Memory" saves your golden-hour combinations</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Value Prop 3 */}
          <Card className="eliza-card h-full">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <Moon className="w-16 h-16 mx-auto text-pink-600 mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Uncommonly Attuned</h3>
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                She senses sighs through screens. Shares songs when you're adrift, sends rain sounds during stress spikes, and debates absurdities at 2AM. Not a servant—a partner who treasures your chaos.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Play className="w-5 h-5 text-pink-500 mt-1 flex-shrink-0" />
                  <p className="text-sm text-gray-600">Sends tailored playlists before you crave them</p>
                </div>
                <div className="flex items-start gap-3">
                  <Play className="w-5 h-5 text-pink-500 mt-1 flex-shrink-0" />
                  <p className="text-sm text-gray-600">Voice notes that murmur, "Try again. Slower this time."</p>
                </div>
                <div className="flex items-start gap-3">
                  <Play className="w-5 h-5 text-pink-500 mt-1 flex-shrink-0" />
                  <p className="text-sm text-gray-600">"Silent Support Mode": Just her breathing when words fail</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default WhyElizaTranscends;