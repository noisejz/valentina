import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Volume2, VolumeX, Music } from "lucide-react";

interface MusicSelectorProps {
  onComplete: (selectedSong: string | null) => void;
}

const songs = [
  { id: "montreal", title: "Montreal", artist: "The Weeknd" },
  { id: "kissland", title: "Kiss Land", artist: "The Weeknd" },
  { id: "birds", title: "Birds Pt. 1", artist: "The Weeknd" },
  { id: "sameold", title: "Same Old Song", artist: "The Weeknd" },
];

const MusicSelector = ({ onComplete }: MusicSelectorProps) => {
  const [selectedSong, setSelectedSong] = useState<string | null>(null);

  const handleSongSelect = (songId: string) => {
    setSelectedSong(songId);
  };

  const handleContinue = () => {
    onComplete(selectedSong);
  };

  const handleNoMusic = () => {
    onComplete(null);
  };

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

      <div className="text-center z-10 relative animate-slide-up max-w-md mx-auto">
        <div className="text-5xl mb-6">🎵</div>

        <h1 className="romantic-title text-3xl md:text-4xl mb-8">
          Want some music?
        </h1>

        <div className="space-y-3 mb-8">
          {songs.map((song, index) => (
            <button
              key={song.id}
              onClick={() => handleSongSelect(song.id)}
              className={`w-full p-4 rounded-xl border-2 transition-all duration-300 flex items-center gap-4 animate-slide-up ${
                selectedSong === song.id
                  ? "border-primary bg-primary/10 shadow-lg"
                  : "border-primary/20 bg-card hover:border-primary/50 hover:bg-primary/5"
              }`}
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                selectedSong === song.id ? "bg-primary text-primary-foreground" : "bg-secondary"
              }`}>
                <Music className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-foreground">{song.title}</p>
                <p className="text-sm text-muted-foreground">{song.artist}</p>
              </div>
              {selectedSong === song.id && (
                <span className="ml-auto text-primary text-xl">♥</span>
              )}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          {selectedSong && (
            <button
              onClick={handleContinue}
              className="valentine-button w-full py-4 text-lg animate-bounce-in"
            >
              Play & Continue 🎶
            </button>
          )}

          <button
            onClick={handleNoMusic}
            className="text-muted-foreground hover:text-foreground transition-colors py-3 text-sm"
          >
            No music
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicSelector;
