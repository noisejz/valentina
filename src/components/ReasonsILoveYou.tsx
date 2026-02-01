import { useState } from "react";
import { Heart } from "lucide-react";
import catFlower from "@/assets/cat-flower.gif";

interface ReasonsILoveYouProps {
  onComplete: () => void;
}

const reasons = [
  {
    title: "Your Humor",
    content: "I really love how you can always lighten the mood just by being yourself. Even when I'm not feeling the best, you have this way of making me laugh and I'm so grateful for that."
  },
  {
    title: "Your Heart",
    content: "You are so kind, so compassionate, and so loving for everyone around you. The way you listen, the way you make people feel seen and valued is one of the most beautiful things about you."
  },
  {
    title: "Your Presence",
    content: "Being with you feels like home. Your energy, your warmth, and the way you make any moment feel so special, I feel so lucky every time we are together."
  },
  {
    title: "Your Beauty",
    content: "You're so beautiful inside and out. We both know how stunning you are, but your mind and soul are just as beautiful. I'm so grateful that I get to see all of it. You truly are a beautiful girl and I love you so much."
  },
  {
    title: "Our Future",
    content: "We've had our ups and downs, but I know we're meant to be. I can't wait to make all our dreams and plans come true."
  },
  {
    title: "Your Stims",
    content: "All the little things that make you uniquely you. The stims, the random bursts of energy, all the tiktok time and all the gestures only you do. They're part of what makes you so special, and I love every bit of you."
  }
];

const ReasonsILoveYou = ({ onComplete }: ReasonsILoveYouProps) => {
  const [revealedReasons, setRevealedReasons] = useState<number[]>([]);

  const handleCardClick = (index: number) => {
    if (!revealedReasons.includes(index)) {
      setRevealedReasons(prev => [...prev, index]);
    }
  };

  const allRevealed = revealedReasons.length === reasons.length;

  return (
    <div className="page-container py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Cat with flower in circular frame */}
        <div className="flex justify-center mb-6">
          <div className="w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-primary overflow-hidden animate-float">
            <img
              src={catFlower}
              alt="Cute cat with flower"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-romantic text-foreground text-center mb-10 animate-slide-up">
          Reasons I Love You
        </h1>

        {/* Reasons Grid - 3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((reason, index) => {
            const isRevealed = revealedReasons.includes(index);

            return (
              <div
                key={index}
                onClick={() => handleCardClick(index)}
                className={`
                  bg-card rounded-2xl p-6 cursor-pointer
                  shadow-sm hover:shadow-md transition-all duration-300
                  flex flex-col items-center text-center
                  min-h-[140px]
                  ${isRevealed ? 'min-h-[200px]' : ''}
                `}
              >
                {/* Heart icon */}
                <div className={`mb-3 transition-all duration-300 ${isRevealed ? 'text-primary' : 'text-primary/50'}`}>
                  <Heart
                    className={`w-8 h-8 transition-all duration-300 ${isRevealed ? 'fill-primary' : ''}`}
                    strokeWidth={1.5}
                  />
                </div>

                {/* Title */}
                <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                  {reason.title}
                </h3>

                {/* Content - revealed on click */}
                <div className={`overflow-hidden transition-all duration-500 ${
                  isRevealed
                    ? 'max-h-64 opacity-100 mt-2'
                    : 'max-h-0 opacity-0'
                }`}>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {reason.content}
                  </p>
                </div>

                {!isRevealed && (
                  <p className="text-muted-foreground/60 text-xs mt-2 italic">
                    Tap to reveal
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Progress & Button */}
        <div className="mt-10 text-center">
          {!allRevealed && (
            <p className="text-muted-foreground mb-4">
              {revealedReasons.length} of {reasons.length} revealed
            </p>
          )}

          {allRevealed && (
            <button
              onClick={onComplete}
              className="valentine-button text-xl px-10 py-5 animate-bounce-in"
            >
              💌 Open Your Letter
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReasonsILoveYou;
