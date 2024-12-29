import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function MostLikelyToGame({
  params,
}: {
  params: { sessionId: string };
}) {
  return (
    <main className="container max-w-2xl mx-auto p-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">Most Likely To</h1>
        <p className="text-muted-foreground">Vote for who's most likely...</p>
      </div>

      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-2xl font-medium mb-8">
            Most likely to become a millionaire
          </p>
          <div className="grid grid-cols-2 gap-4 mb-8">
            {/* Player voting grid will go here */}
          </div>
          <div className="space-y-4">
            <Button className="w-full" size="lg">
              Next Question
            </Button>
            <Button variant="outline" className="w-full">
              Back to Lobby
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
