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
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { AvatarUpload } from "./avatar-upload";

type CreateUserFormProps = {
  sessionId: string;
};

export function CreateUserForm({ sessionId }: CreateUserFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const handleCreateUser = async () => {
    if (!name.trim()) return;

    try {
      setIsLoading(true);

      const { data: player, error } = await supabase
        .from("players")
        .insert({
          session_id: sessionId,
          name: name.trim(),
          avatar_url:
            avatarUrl ||
            `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
        })
        .select()
        .single();

      if (error) throw error;

      document.cookie = `userId=${player.id}; path=/; max-age=${
        60 * 60 * 24 * 30
      }`; // 30 days

      router.push(`/${sessionId}`);
      router.refresh();
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Your Profile</CardTitle>
        <CardDescription>Enter your name to join the game</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {name && <AvatarUpload name={name} onImageUploaded={setAvatarUrl} />}

        <div className="space-y-2">
          <Label htmlFor="name">Your Name</Label>
          <Input
            id="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="pt-4">
          <Button
            className="w-full"
            size="lg"
            onClick={handleCreateUser}
            disabled={isLoading || !name.trim()}
          >
            {isLoading ? "Joining..." : "Join Game"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
