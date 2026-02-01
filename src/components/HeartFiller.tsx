import { useState, useCallback } from "react";

interface HeartFillerProps {
  onComplete: () => void;
}

const HeartFiller = ({ onComplete }: HeartFillerProps) => {
  const [fillPercent, setFillPercent] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const [showCodePopup, setShowCodePopup] = useState(false);
  const [secretCode, setSecretCode] = useState("");
  const [codeError, setCodeError] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleHeartClick = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (showCodePopup) return;

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    let clientX: number, clientY: number;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // Add floating heart effect
    const heartId = Date.now() + Math.random();
    setFloatingHearts(prev => [...prev, { id: heartId, x, y }]);
    setTimeout(() => {
      setFloatingHearts(prev => prev.filter(h => h.id !== heartId));
    }, 1000);

    setClicks(prev => prev + 1);
    setFillPercent(prev => {
      const newPercent = Math.min(prev + 2, 100);
      if (newPercent >= 100) {
        setTimeout(() => setShowCodePopup(true), 500);
      }
      return newPercent;
    });
  }, [showCodePopup]);

  const handleCodeSubmit = () => {
    if (secretCode.toLowerCase().trim() === "i love you") {
      // Go directly to next page without success message
      onComplete();
    } else {
      setCodeError(true);
      setTimeout(() => setCodeError(false), 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCodeSubmit();
    }
  };

  const heartEmojis = ['💕', '💗', '💖', '❤️', '💓'];

  return (
    <div className="page-container relative overflow-hidden">
      {/* Floating background hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float text-primary opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              fontSize: `${20 + Math.random() * 30}px`,
            }}
          >
            ♥
          </div>
        ))}
      </div>

      <h1 className="romantic-title mb-4 text-center animate-slide-up">
        Tap to fill
      </h1>
      <p className="text-muted-foreground mb-4 text-center animate-slide-up" style={{ animationDelay: "0.1s" }}>
        Keep tapping! 💕
      </p>

      {/* Hint text for the secret code */}
      <p className="text-sm text-primary/70 mb-6 text-center animate-slide-up italic" style={{ animationDelay: "0.2s" }}>
        remember this: i love you
      </p>

      {/* Main Heart Container */}
      <div
        className="relative cursor-pointer select-none"
        onClick={handleHeartClick}
        onTouchStart={handleHeartClick}
      >
        {/* Empty Heart (Background) */}
        <svg
          viewBox="0 0 100 100"
          className="w-64 h-64 md:w-80 md:h-80 transition-transform duration-150 active:scale-95"
          style={{ filter: "drop-shadow(0 10px 30px rgba(236, 72, 153, 0.3))" }}
        >
          <defs>
            <linearGradient id="emptyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(350, 30%, 90%)" />
              <stop offset="100%" stopColor="hsl(350, 30%, 85%)" />
            </linearGradient>
            <linearGradient id="fillGradient" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="hsl(350, 90%, 55%)" />
              <stop offset="50%" stopColor="hsl(350, 85%, 65%)" />
              <stop offset="100%" stopColor="hsl(340, 90%, 70%)" />
            </linearGradient>
            <clipPath id="heartClip">
              <path d="M50 88 C20 60, 5 40, 15 25 C25 10, 40 10, 50 25 C60 10, 75 10, 85 25 C95 40, 80 60, 50 88 Z" />
            </clipPath>
          </defs>

          {/* Empty heart outline */}
          <path
            d="M50 88 C20 60, 5 40, 15 25 C25 10, 40 10, 50 25 C60 10, 75 10, 85 25 C95 40, 80 60, 50 88 Z"
            fill="url(#emptyGradient)"
            stroke="hsl(350, 50%, 75%)"
            strokeWidth="2"
          />

          {/* Filled portion */}
          <g clipPath="url(#heartClip)">
            <rect
              x="0"
              y={100 - fillPercent}
              width="100"
              height={fillPercent}
              fill="url(#fillGradient)"
              className="transition-all duration-100"
            />
          </g>

          {/* Heart outline on top */}
          <path
            d="M50 88 C20 60, 5 40, 15 25 C25 10, 40 10, 50 25 C60 10, 75 10, 85 25 C95 40, 80 60, 50 88 Z"
            fill="none"
            stroke="hsl(350, 60%, 65%)"
            strokeWidth="3"
          />
        </svg>

        {/* Floating heart effects on click */}
        {floatingHearts.map(heart => (
          <div
            key={heart.id}
            className="absolute pointer-events-none animate-float-up"
            style={{
              left: heart.x - 12,
              top: heart.y - 12,
            }}
          >
            <span className="text-2xl">
              {heartEmojis[Math.floor(Math.random() * heartEmojis.length)]}
            </span>
          </div>
        ))}
      </div>

      {/* Progress indicator */}
      <div className="mt-8 flex flex-col items-center gap-2">
        <div className="w-48 h-3 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full heart-gradient transition-all duration-150 rounded-full"
            style={{ width: `${fillPercent}%` }}
          />
        </div>
        <span className="text-sm text-muted-foreground font-medium">
          {fillPercent}% filled • {clicks} taps
        </span>
      </div>

      {/* Secret Code Popup */}
      {showCodePopup && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/90 backdrop-blur-sm animate-bounce-in z-20">
          <div className="text-center bg-card p-8 rounded-2xl shadow-xl max-w-sm mx-4">
            {showSuccessMessage ? (
              <>
                <span className="text-6xl mb-4 block animate-bounce-in">💖</span>
                <h2 className="romantic-title text-3xl mb-4 animate-bounce-in" style={{ animationDelay: "0.2s" }}>
                  i love you
                </h2>
                <p className="text-muted-foreground animate-bounce-in" style={{ animationDelay: "0.4s" }}>
                  Moving on...
                </p>
              </>
            ) : (
              <>
                <span className="text-5xl mb-4 block">💖</span>
                <h2 className="romantic-title text-2xl mb-2">Good job beautiful</h2>
                <p className="text-muted-foreground mb-6">Enter the secret code to continue</p>

                <input
                  type="text"
                  value={secretCode}
                  onChange={(e) => setSecretCode(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Secret code..."
                  className="w-full px-4 py-3 rounded-xl border-2 border-primary/30 focus:border-primary focus:outline-none text-center text-lg mb-4 bg-background"
                  autoFocus
                />

                {codeError && (
                  <p className="text-destructive text-sm mb-4 animate-bounce-in">
                    Incorrect! Try again 💔
                  </p>
                )}

                <button
                  onClick={handleCodeSubmit}
                  className="valentine-button w-full py-3 text-lg"
                >
                  Enter
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes float-up {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-60px) scale(1.5);
          }
        }
        .animate-float-up {
          animation: float-up 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default HeartFiller;
