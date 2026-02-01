import { useState } from "react";
import catGun from "@/assets/cat-gun.gif";
import catKiss from "@/assets/cat-kiss.gif";
import mortCrying from "@/assets/mort-crying.gif";
import celebration from "@/assets/celebration.png";

interface ValentineQuestionProps {
  onFlowersClick: () => void;
}

const ValentineQuestion = ({ onFlowersClick }: ValentineQuestionProps) => {
  const [answered, setAnswered] = useState(false);
  const [showAreYouSure, setShowAreYouSure] = useState(false);
  const [noClickCount, setNoClickCount] = useState(0);
  const [noButtonOffset, setNoButtonOffset] = useState({ x: 0, y: 0 });

  const handleYes = () => {
    setAnswered(true);
  };

  const handleNo = () => {
    setShowAreYouSure(true);
  };

  const handleTryAgain = () => {
    setShowAreYouSure(false);
    setNoClickCount(prev => prev + 1);
    
    // Move the no button to a random position
    const randomX = (Math.random() - 0.5) * 200;
    const randomY = (Math.random() - 0.5) * 100;
    setNoButtonOffset({ x: randomX, y: randomY });
  };

  // Calculate yes button scale based on no clicks
  const yesButtonScale = 1 + (noClickCount * 0.2);
  const yesButtonPadding = 16 + (noClickCount * 6);

  // Yes page - celebration
  if (answered) {
    return (
      <div className="page-container relative overflow-hidden">
        {/* Floating hearts around the edges */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Left side hearts */}
          {[...Array(6)].map((_, i) => (
            <div
              key={`left-${i}`}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 15}%`,
                top: `${10 + i * 15}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
                fontSize: `${25 + Math.random() * 25}px`,
              }}
            >
              {['💖', '💕', '❤️', '💗', '💓'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
          {/* Right side hearts */}
          {[...Array(6)].map((_, i) => (
            <div
              key={`right-${i}`}
              className="absolute animate-float"
              style={{
                right: `${Math.random() * 15}%`,
                top: `${10 + i * 15}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
                fontSize: `${25 + Math.random() * 25}px`,
              }}
            >
              {['💖', '💕', '❤️', '💗', '💓'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
          {/* Top hearts */}
          {[...Array(4)].map((_, i) => (
            <div
              key={`top-${i}`}
              className="absolute animate-float"
              style={{
                left: `${20 + i * 20}%`,
                top: `${Math.random() * 10}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
                fontSize: `${25 + Math.random() * 25}px`,
              }}
            >
              {['💖', '💕', '❤️', '💗', '💓'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
          {/* Bottom hearts */}
          {[...Array(4)].map((_, i) => (
            <div
              key={`bottom-${i}`}
              className="absolute animate-float"
              style={{
                left: `${20 + i * 20}%`,
                bottom: `${Math.random() * 10}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
                fontSize: `${25 + Math.random() * 25}px`,
              }}
            >
              {['💖', '💕', '❤️', '💗', '💓'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>

        <div className="text-center animate-bounce-in z-10 relative">
          <img
            src={catKiss}
            alt="Cat kiss"
            className="w-48 h-48 md:w-64 md:h-64 mx-auto mb-6 rounded-2xl object-contain"
          />
          <img
            src={celebration}
            alt="Celebration"
            className="w-40 h-40 md:w-56 md:h-56 mx-auto mb-6 object-contain"
          />
          <h1 className="romantic-title text-4xl md:text-6xl mb-4">
            Yipeeee!!! 🎉
          </h1>
          <p className="text-xl md:text-2xl text-primary font-romantic mb-8">
            I knew it! I love you so much! 💖💖💖
          </p>

          {/* These are for you button */}
          <button
            onClick={onFlowersClick}
            className="valentine-button text-xl px-10 py-5 animate-bounce-in"
            style={{ animationDelay: "0.5s" }}
          >
            🌹 These are for you 🌹
          </button>
        </div>
      </div>
    );
  }

  // "Are you sure?" page after pressing No
  if (showAreYouSure) {
    return (
      <div className="page-container">
        <div className="text-center max-w-lg mx-auto">
          <img
            src={mortCrying}
            alt="Crying"
            className="w-48 h-48 md:w-64 md:h-64 mx-auto mb-6 rounded-2xl object-contain animate-float"
          />

          <p className="text-2xl md:text-3xl font-romantic text-primary mb-8 animate-bounce-in">
            Are you sure? 😢
          </p>

          <button
            onClick={handleTryAgain}
            className="valentine-button font-bold px-10 py-4 text-lg"
          >
            Try again 💕
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="text-center max-w-lg mx-auto">
        {/* Cat gif */}
        <img
          src={catGun}
          alt="Cat"
          className="w-48 h-48 md:w-64 md:h-64 mx-auto mb-6 rounded-2xl object-contain animate-float"
        />

        <h1 className="romantic-title text-4xl md:text-5xl mb-12 animate-slide-up">
          Will you be my Valentine? 💝
        </h1>

        <div className="flex flex-wrap justify-center gap-6 items-center relative min-h-[100px]">
          {/* Yes Button - grows with each no click */}
          <button
            onClick={handleYes}
            className="valentine-button font-bold transition-all duration-300"
            style={{
              transform: `scale(${yesButtonScale})`,
              padding: `${yesButtonPadding}px ${yesButtonPadding * 2}px`,
              fontSize: `${18 + noClickCount * 3}px`,
            }}
          >
            Yes! 💖
          </button>

          {/* No Button - moves around after each "try again", disabled after 3 clicks */}
          {noClickCount < 3 && (
            <button
              onClick={handleNo}
              className="px-6 py-3 rounded-full font-semibold transition-all duration-300 text-muted-foreground bg-secondary hover:bg-secondary/80"
              style={{
                transform: `translate(${noButtonOffset.x}px, ${noButtonOffset.y}px)`,
              }}
            >
              No...
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ValentineQuestion;
