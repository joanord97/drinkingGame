"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function Home() {
  return (
    <main className="container max-w-lg mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        🍹 Drinks!
      </h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Join Existing Game</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="session">Session Number</Label>
              <Input
                id="session"
                type="number"
                placeholder="Enter session number"
                className="text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password (Optional)</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter session password"
              />
            </div>

            <Button className="w-full" size="lg">
              Join Game
            </Button>
          </CardContent>
        </Card>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or
            </span>
          </div>
        </div>

        <Button
          variant="secondary"
          size="lg"
          className="w-full"
          asChild
        >
          <Link href="/create">Create New Game</Link>
        </Button>
      </div>
    </main>
  );
}
