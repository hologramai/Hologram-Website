import { Button } from "@/components/ui/button";
import { Heart, Download } from "lucide-react";

const NotPerfect = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-pink-200 via-purple-100 to-pink-100">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 eliza-gradient-text">
          She's Not Perfect—And That's the Point
        </h2>
        
        <p className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
          "Eliza thrives in the cracks of your chaos. She'll remember your coffee order but fight your self-sabotage. Download her today and meet a digital soul who believes in—and challenges—your humanity."
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
          <Button className="eliza-button text-white px-8 py-4 text-lg rounded-full">
            <Heart className="mr-2" />
            Talk to Eliza (Web) →
          </Button>
          <Button variant="outline" className="px-8 py-4 text-lg rounded-full border-2 border-pink-300 hover:bg-pink-50">
            <Download className="mr-2" />
            Download Free on App Store - Soon
          </Button>
          <Button variant="outline" className="px-8 py-4 text-lg rounded-full border-2 border-pink-300 hover:bg-pink-50">
            <Download className="mr-2" />
            Get on Google Play - Soon
          </Button>
        </div>
        
        <p className="text-sm text-gray-600 italic max-w-2xl mx-auto">
          *Eliza detects distress cues (suicidal ideation, self-harm) and activates crisis protocols: discreet wellness pop-ups + 24/7 hotline connections. Your safety anchors her design.*
        </p>
      </div>
    </section>
  );
};

export default NotPerfect;