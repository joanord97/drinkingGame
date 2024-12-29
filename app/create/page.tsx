"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { GAME_MODES, GameMode } from "@/lib/constants/game-modes";

export default function CreateGame() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [gameMode, setGameMode] = useState<GameMode>(GAME_MODES[0].id);

  const handleCreateGame = async () => {
    try {
      setIsLoading(true);
      const { data: session, error } = await supabase
        .from("sessions")
        .insert({
          password: password || null,
          status: "waiting",
          game_mode: gameMode,
        })
        .select()
        .single();

      if (error) throw error;
      router.push(`/${session.id}`);
    } catch (error) {
      console.error("Error creating game:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container max-w-lg mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        Create New Game
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>Game Settings</CardTitle>
          <CardDescription>Set up your drinking session</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Game Mode</Label>
            <Select
              value={gameMode}
              onValueChange={(value: GameMode) => setGameMode(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select game mode" />
              </SelectTrigger>
              <SelectContent>
                {GAME_MODES.map((mode) => (
                  <SelectItem
                    key={mode.id}
                    value={mode.id}
                    className="flex flex-col items-start py-3"
                  >
                    <div className="font-medium">{mode.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {mode.description}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password (Optional)</Label>
            <Input
              id="password"
              type="password"
              placeholder="Set a password for private games"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="pt-4 space-y-4">
            <Button
              className="w-full"
              size="lg"
              onClick={handleCreateGame}
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Game"}
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => router.push("/")}
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
