import { useState, useEffect, useRef } from "react";
import { Slider } from "@/components/ui/slider";
import { Volume2, VolumeX, Music, ChevronDown } from "lucide-react";

interface MusicPlayerProps {
  songId: string | null;
  onSongChange?: (songId: string | null) => void;
}

const songs = [
  { id: "montreal", title: "Montreal", artist: "The Weeknd" },
  { id: "kissland", title: "Kiss Land", artist: "The Weeknd" },
  { id: "birds", title: "Birds Pt. 1", artist: "The Weeknd" },
  { id: "sameold", title: "Same Old Song", artist: "The Weeknd" },
];

const songUrls: Record<string, string> = {
  montreal: "/music/montreal.mp3",
  kissland: "/music/kissland.mp3",
  birds: "/music/birds.mp3",
  sameold: "/music/sameold.mp3",
};

const songTitles: Record<string, string> = {
  montreal: "Montreal",
  kissland: "Kiss Land",
  birds: "Birds Pt. 1",
  sameold: "Same Old Song",
};

const MusicPlayer = ({ songId, onSongChange }: MusicPlayerProps) => {
  const [currentSongId, setCurrentSongId] = useState(songId);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSongList, setShowSongList] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setCurrentSongId(songId);
  }, [songId]);

  useEffect(() => {
    if (currentSongId && songUrls[currentSongId]) {
      // Stop previous audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }

      const audio = new Audio(songUrls[currentSongId]);
      audio.loop = true;
      audio.volume = volume / 100;
      audioRef.current = audio;

      audio.play().catch(() => {
        console.log("Autoplay blocked - click anywhere to start music");
      });

      return () => {
        audio.pause();
        audio.src = "";
      };
    } else if (!currentSongId && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current = null;
    }
  }, [currentSongId]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    if (value[0] > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleSongSelect = (newSongId: string) => {
    setCurrentSongId(newSongId);
    onSongChange?.(newSongId);
    setShowSongList(false);
  };

  const handleNoMusic = () => {
    setCurrentSongId(null);
    onSongChange?.(null);
    setShowSongList(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div
        className={`bg-card/95 backdrop-blur-sm border border-primary/20 rounded-2xl shadow-xl transition-all duration-300 ${
          isExpanded ? "p-4 w-72" : "p-3"
        }`}
      >
        {isExpanded ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowSongList(!showSongList)}
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Music className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground truncate">
                  {currentSongId ? songTitles[currentSongId] : "No music"}
                </span>
                <ChevronDown className={`w-3 h-3 text-muted-foreground transition-transform ${showSongList ? 'rotate-180' : ''}`} />
              </button>
              <button
                onClick={() => {
                  setIsExpanded(false);
                  setShowSongList(false);
                }}
                className="text-muted-foreground hover:text-foreground text-xs"
              >
                ✕
              </button>
            </div>

            {/* Song selection dropdown */}
            {showSongList && (
              <div className="space-y-1 py-2 border-t border-primary/10">
                {songs.map((song) => (
                  <button
                    key={song.id}
                    onClick={() => handleSongSelect(song.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      currentSongId === song.id
                        ? "bg-primary/20 text-primary"
                        : "hover:bg-primary/10 text-foreground"
                    }`}
                  >
                    <p className="font-medium">{song.title}</p>
                    <p className="text-xs text-muted-foreground">{song.artist}</p>
                  </button>
                ))}
                <button
                  onClick={handleNoMusic}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    !currentSongId
                      ? "bg-primary/20 text-primary"
                      : "hover:bg-primary/10 text-muted-foreground"
                  }`}
                >
                  No music
                </button>
              </div>
            )}

            {currentSongId && (
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleMute}
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-5 h-5" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </button>

                <Slider
                  value={[isMuted ? 0 : volume]}
                  onValueChange={handleVolumeChange}
                  max={100}
                  step={1}
                  className="flex-1"
                />

                <span className="text-xs text-muted-foreground w-8 text-right">
                  {isMuted ? 0 : volume}%
                </span>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => setIsExpanded(true)}
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <Music className="w-5 h-5" />
            {currentSongId && !isMuted && volume > 0 && (
              <span className="animate-pulse text-xs">♪</span>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default MusicPlayer;
