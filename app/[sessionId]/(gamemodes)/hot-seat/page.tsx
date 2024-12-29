import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function HotSeatGame({
  params,
}: {
  params: { sessionId: string };
}) {
  return (
    <main className="container max-w-2xl mx-auto p-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">Hot Seat</h1>
        <p className="text-muted-foreground">Current Player: Player 1</p>
      </div>

      <Card className="mb-4">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Current Question:</h2>
          <p className="text-lg mb-6">
            What's the craziest thing you've done while drunk?
          </p>
          <div className="space-y-4">
            <Button className="w-full" size="lg">
              Answer
            </Button>
            <Button variant="secondary" className="w-full">
              Take a Drink Instead
            </Button>
          </div>
        </CardContent>
      </Card>

      <Button variant="outline" className="w-full">
        Back to Lobby
      </Button>
    </main>
  );
}
