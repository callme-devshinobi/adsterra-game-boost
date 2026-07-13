import { FlappyGame } from "@/components/FlappyGame";
import { AdsterraBanner } from "@/components/AdsterraBanner";

const FOOTER_AD_KEY = "a4e73aa7b810bddbfa148d0e8fc3cc78";

const Index = () => {
  return (
    <main className="min-h-screen w-full bg-gradient-night flex flex-col items-center justify-center p-0 sm:p-6 gap-3">
      <h1 className="sr-only">Sky Hopper — Flappy Arcade Game with Rewarded Ad Continue</h1>
      <div className="w-full h-[calc(100vh-70px)] sm:h-[720px] sm:max-w-[420px] sm:rounded-3xl overflow-hidden sm:shadow-arcade sm:border sm:border-border bg-gradient-sky relative">
        <FlappyGame />
      </div>

      {/* Adsterra 320x50 banner */}
      <div className="flex items-center justify-center py-2">
        <AdsterraBanner adKey={FOOTER_AD_KEY} width={320} height={50} />
      </div>
    </main>
  );
};

export default Index;
