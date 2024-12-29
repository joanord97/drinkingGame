"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { GAME_MODES, GameMode } from "@/lib/constants/game-modes";
import { supabase } from "@/lib/supabase/client";

type GameSettingsProps = {
  sessionId: string;
};

export function GameSettings({ sessionId }: GameSettingsProps) {
  const router = useRouter();
  const [sessionStatus, setSessionStatus] = useState<
    "waiting" | "in_progress" | "finished"
  >("waiting");
  const [gameMode, setGameMode] = useState<GameMode>();

  useEffect(() => {
    // Get initial session status and game mode
    const fetchSession = async () => {
      const { data } = await supabase
        .from("sessions")
        .select("status, game_mode")
        .eq("id", sessionId)
        .single();

      if (data) {
        setSessionStatus(data.status);
        setGameMode(data.game_mode);
      }
    };

    fetchSession();

    // Subscribe to session changes
    const channel = supabase
      .channel(`session:${sessionId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "sessions",
          filter: `id=eq.${sessionId}`,
        },
        (payload) => {
          if (payload.new.status === "in_progress") {
            router.push(`/${sessionId}/${gameMode}`);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [sessionId, router, gameMode]);

  const handleStartGame = () => {
    router.push(`/${sessionId}/${gameMode}`);
  };

  return (
    <Card className="mb-8">
      <CardContent className="p-6 space-y-6">
        <h2 className="text-xl font-semibold mb-4">Game Settings</h2>
        <div className="text-center">
          <p className="text-lg font-medium">
            {GAME_MODES.find((mode) => mode.id === gameMode)?.name}
          </p>
          <p className="text-sm text-muted-foreground">
            {GAME_MODES.find((mode) => mode.id === gameMode)?.description}
          </p>
        </div>

        {sessionStatus === "waiting" && (
          <Button className="w-full" size="lg" onClick={handleStartGame}>
            I'm ready!
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
