import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function KingsCupGame({
  params,
}: {
  params: { sessionId: string };
}) {
  return (
    <main className="container max-w-2xl mx-auto p-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">King's Cup</h1>
        <p className="text-muted-foreground">
          Draw a card and follow the rule!
        </p>
      </div>

      <Card>
        <CardContent className="p-6 text-center">
          <div className="aspect-[3/4] mb-8 bg-muted rounded-lg flex items-center justify-center">
            <p className="text-4xl">🎴</p>
          </div>
          <div className="space-y-4">
            <Button className="w-full" size="lg">
              Draw Card
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
