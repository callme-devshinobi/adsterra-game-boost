import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AdState } from "@/hooks/useRewardedAd";
import { useEffect, useState } from "react";
import { AdsterraBanner } from "@/components/AdsterraBanner";

const REWARDED_AD_KEY = "1bd8324c8233e2e40028ca230e267d5d";
const REWARDED_AD_WIDTH = 160;
const REWARDED_AD_HEIGHT = 300;

interface RewardedAdModalProps {
  open: boolean;
  state: AdState;
}

export function RewardedAdModal({ open, state }: RewardedAdModalProps) {
  const [secondsLeft, setSecondsLeft] = useState(12);

  useEffect(() => {
    if (state !== "playing") {
      setSecondsLeft(12);
      return;
    }
    const id = window.setInterval(() => {
      setSecondsLeft((s) => Math.max(0, s - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, [state]);

  return (
    <Dialog open={open}>
      <DialogContent className="max-w-sm border-border bg-card p-0 overflow-hidden [&>button]:hidden">
        <div className="bg-gradient-night p-6 flex flex-col items-center gap-4">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">
            Sponsored
          </div>

          <div
            className="rounded-xl bg-black/30 shadow-arcade flex items-center justify-center overflow-hidden"
            style={{ width: REWARDED_AD_WIDTH, height: REWARDED_AD_HEIGHT }}
          >
            {open && (
              <AdsterraBanner
                adKey={REWARDED_AD_KEY}
                width={REWARDED_AD_WIDTH}
                height={REWARDED_AD_HEIGHT}
              />
            )}
          </div>

          <p className="text-xs text-muted-foreground text-center">
            {state === "rewarded"
              ? "✓ Reward earned — get ready!"
              : state === "playing"
                ? secondsLeft > 0
                  ? `Reward in ${secondsLeft}s…`
                  : "Almost done…"
                : "Loading ad…"}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
