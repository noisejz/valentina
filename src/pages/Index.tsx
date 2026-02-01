import { useState } from "react";
import WelcomePage from "@/components/WelcomePage";
import MusicSelector from "@/components/MusicSelector";
import MusicPlayer from "@/components/MusicPlayer";
import HeartFiller from "@/components/HeartFiller";
import ReasonsILoveYou from "@/components/ReasonsILoveYou";
import LoveLetter from "@/components/LoveLetter";
import ValentineQuestion from "@/components/ValentineQuestion";
import FlowersPage from "@/components/FlowersPage";

type Page = "welcome" | "music" | "heart" | "reasons" | "letter" | "question" | "flowers";

const Index = () => {
  const [currentPage, setCurrentPage] = useState<Page>("welcome");
  const [selectedSong, setSelectedSong] = useState<string | null>(null);

  const handleMusicSelect = (songId: string | null) => {
    setSelectedSong(songId);
    setCurrentPage("heart");
  };

  const handleSongChange = (songId: string | null) => {
    setSelectedSong(songId);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "welcome":
        return <WelcomePage onStart={() => setCurrentPage("music")} />;
      case "music":
        return <MusicSelector onComplete={handleMusicSelect} />;
      case "heart":
        return <HeartFiller onComplete={() => setCurrentPage("reasons")} />;
      case "reasons":
        return <ReasonsILoveYou onComplete={() => setCurrentPage("letter")} />;
      case "letter":
        return <LoveLetter onComplete={() => setCurrentPage("question")} />;
      case "question":
        return <ValentineQuestion onFlowersClick={() => setCurrentPage("flowers")} />;
      case "flowers":
        return <FlowersPage />;
      default:
        return <WelcomePage onStart={() => setCurrentPage("music")} />;
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {renderPage()}
      {/* Music player persists across all pages after music selection */}
      {currentPage !== "welcome" && currentPage !== "music" && (
        <MusicPlayer songId={selectedSong} onSongChange={handleSongChange} />
      )}
    </div>
  );
};

export default Index;
