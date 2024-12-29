"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import type { Tables } from "@/lib/supabase/types";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import type { GameMode } from "@/lib/constants/game-modes";

type Player = Tables["players"]["Row"];

type PlayersListProps = {
  sessionId: string;
};

export function PlayersList({ sessionId }: PlayersListProps) {
  const router = useRouter();
  const [players, setPlayers] = useState<Player[]>([]);
  const [userId, setUserId] = useState<string>();

  useEffect(() => {
    // Get userId from cookie
    const cookieUserId = document.cookie.match(/userId=([^;]+)/)?.[1];
    setUserId(cookieUserId);
  }, []);

  useEffect(() => {
    const fetchPlayers = async () => {
      const { data } = await supabase
        .from("players")
        .select()
        .eq("session_id", sessionId)
        .order("created_at", { ascending: true });

      if (data) setPlayers(data);
    };

    fetchPlayers();

    const channel = supabase
      .channel(`players:${sessionId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "players",
          filter: `session_id=eq.${sessionId}`,
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setPlayers((current) => [...current, payload.new as Player]);
          } else if (payload.eventType === "DELETE") {
            setPlayers((current) =>
              current.filter((player) => player.id !== payload.old.id)
            );
          } else if (payload.eventType === "UPDATE") {
            setPlayers((current) =>
              current.map((player) =>
                player.id === payload.new.id
                  ? { ...player, ...payload.new }
                  : player
              )
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [sessionId]);

  // Check if all players are ready
  useEffect(() => {
    if (players.length > 0 && players.every((player) => player.ready)) {
      const checkGameStart = async () => {
        const { data, error } = await supabase.functions.invoke('check-game-start', {
          body: { sessionId }
        })
        
        if (error) {
          console.error('Error checking game start:', error)
          return
        }

        if (data.status === 'started') {
          router.push(`/${sessionId}/${data.game_mode}`)
        }
      }

      checkGameStart()
    }
  }, [players, sessionId, router])

  const toggleReady = async () => {
    const currentPlayer = players.find((p) => p.id === userId);

    if (!currentPlayer) return;
    try {
      const { error } = await supabase
        .from("players")
        .update({ ready: !currentPlayer.ready })
        .eq("id", userId)
        .select()
        .single();

      if (error) {
        console.error("Error updating player ready status:", error);
      }
    } catch (err) {
      console.error("Failed to update ready status:", err);
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Players in Lobby</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {players.map((player) => (
            <div
              key={player.id}
              className={`flex flex-col items-center p-4 rounded-lg border bg-card transition-colors ${
                player.ready ? "bg-accent" : "hover:bg-accent"
              }`}
            >
              <div className="relative">
                <Avatar className="h-20 w-20 mb-3">
                  <AvatarImage
                    src={player.avatar_url || undefined}
                    alt={player.name}
                  />
                  <AvatarFallback>
                    {player.name
                      .split(" ")
                      .map((word) => word[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                {player.ready && (
                  <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1">
                    <Check className="h-4 w-4" />
                  </div>
                )}
              </div>
              <span className="font-medium text-center">{player.name}</span>
              {player.id === userId && (
                <Button
                  variant={player.ready ? "secondary" : "default"}
                  size="sm"
                  onClick={toggleReady}
                  className="mt-2"
                >
                  {player.ready ? "Not Ready" : "Ready"}
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
