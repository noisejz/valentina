interface WelcomePageProps {
  onStart: () => void;
}

const WelcomePage = ({ onStart }: WelcomePageProps) => {
  return (
    <div className="page-container relative overflow-hidden">
      {/* Floating background hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float text-primary opacity-30"
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

      <div className="text-center z-10 relative animate-slide-up">
        <div className="text-6xl mb-8">💕</div>

        <h1 className="romantic-title text-4xl md:text-5xl mb-4">
          Hi my love
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-4 font-romantic">
          I made this just for you
        </p>

        <div className="mb-12" />

        <button
          onClick={onStart}
          className="valentine-button text-xl px-12 py-5 animate-bounce-in"
          style={{ animationDelay: "0.3s" }}
        >
          Start 💖
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
