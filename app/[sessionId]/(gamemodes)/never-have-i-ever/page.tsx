import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function NeverHaveIEverGame({
  params,
}: {
  params: { sessionId: string };
}) {
  return (
    <main className="container max-w-2xl mx-auto p-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">Never Have I Ever</h1>
        <p className="text-muted-foreground">Take a drink if you have...</p>
      </div>

      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-2xl font-medium mb-8">
            Never have I ever been skydiving
          </p>
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
