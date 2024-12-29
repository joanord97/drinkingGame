"use client";

import { PlayersList } from "./players-list";
import { GameSettings } from "./game-settings";

type SessionContentProps = {
  sessionId: string;
};

export function SessionContent({ sessionId }: SessionContentProps) {
  return (
    <>
      <GameSettings
        sessionId={sessionId}
      />
      <PlayersList sessionId={sessionId} />
    </>
  );
}
