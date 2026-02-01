interface LoveLetterProps {
  onComplete: () => void;
}

const LoveLetter = ({ onComplete }: LoveLetterProps) => {
  const lineHeight = 36; // pixels per line

  return (
    <div className="page-container py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="romantic-title text-center mb-8 animate-slide-up">
          💌 A Letter For You
        </h1>

        {/* Letter Paper */}
        <div
          className="relative animate-slide-up bg-white rounded-lg shadow-xl overflow-hidden"
          style={{ animationDelay: "0.2s" }}
        >
          {/* Decorative corner hearts */}
          <div className="absolute -top-3 -left-3 text-2xl z-10">💕</div>
          <div className="absolute -top-3 -right-3 text-2xl z-10">💕</div>
          <div className="absolute -bottom-3 -left-3 text-2xl z-10">💕</div>
          <div className="absolute -bottom-3 -right-3 text-2xl z-10">💕</div>

          {/* Pink left margin line */}
          <div
            className="absolute left-12 top-0 bottom-0 w-px bg-pink-300"
            style={{ opacity: 0.6 }}
          />

          {/* Lined paper content */}
          <div
            className="px-16 py-8 relative"
            style={{
              backgroundImage: `linear-gradient(transparent ${lineHeight - 1}px, #f0d4d8 ${lineHeight - 1}px)`,
              backgroundSize: `100% ${lineHeight}px`,
            }}
          >
            {/* Dear Princess - italic style */}
            <p
              className="font-romantic text-primary text-2xl italic mb-0"
              style={{
                lineHeight: `${lineHeight}px`,
              }}
            >
              Dear Princess,
            </p>

            {/* Body paragraphs - readable font */}
            <p
              className="font-body text-foreground text-base mt-0"
              style={{
                lineHeight: `${lineHeight}px`,
              }}
            >
              From the moment we met, my life changed in ways I never thought were possible. Your kindness, your laughter, your love and your support have made every single day brighter and more meaningful.
            </p>

            <p
              className="font-body text-foreground text-base"
              style={{
                lineHeight: `${lineHeight}px`,
              }}
            >
              Being with you has opened my eyes in so many ways, and I feel so lucky to call you my girlfriend.
            </p>

            <p
              className="font-body text-foreground text-base"
              style={{
                lineHeight: `${lineHeight}px`,
              }}
            >
              I still remember the first day we met so clearly. From that moment, I knew there was something truly special about you. Since then, every moment we have shared has meant everything to me. Even through the tough times, I am grateful that we chose to push through together.
            </p>

            <p
              className="font-body text-foreground text-base"
              style={{
                lineHeight: `${lineHeight}px`,
              }}
            >
              You are the most perfect girl ever and I am so incredibly grateful for you, and I honestly do not know what I would do without you. I fall in love with you a little more each day, in ways I never knew were possible.
            </p>

            <p
              className="font-body text-foreground text-base"
              style={{
                lineHeight: `${lineHeight}px`,
              }}
            >
              I cannot wait to experience all the things we have talked about and dreamed of. I love you so much, beautiful. Thank you for being you. Thank you for loving me. Thank you for choosing me every day. You are my best friend, my partner, my home, and my greatest gift.
            </p>

            <p
              className="font-romantic text-foreground text-xl text-right mt-4"
              style={{
                lineHeight: `${lineHeight}px`,
              }}
            >
              Love Noah
            </p>
          </div>
        </div>

        {/* Continue Button */}
        <div className="mt-10 text-center animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <button
            onClick={onComplete}
            className="valentine-button text-xl px-10 py-5 group"
          >
            <span className="inline-flex items-center gap-2">
              Continue
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoveLetter;
