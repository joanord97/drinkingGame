import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function WouldYouRatherGame({
  params,
}: {
  params: { sessionId: string };
}) {
  return (
    <main className="container max-w-2xl mx-auto p-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">Would You Rather</h1>
        <p className="text-muted-foreground">Choose wisely...</p>
      </div>

      <div className="grid gap-4">
        <Card>
          <CardContent className="p-6">
            <Button className="w-full h-auto py-8 text-lg" variant="secondary">
              Never be able to use a smartphone again
            </Button>
          </CardContent>
        </Card>

        <p className="text-center font-bold">OR</p>

        <Card>
          <CardContent className="p-6">
            <Button className="w-full h-auto py-8 text-lg" variant="secondary">
              Never be able to use a computer again
            </Button>
          </CardContent>
        </Card>

        <Button variant="outline" className="mt-4">
          Back to Lobby
        </Button>
      </div>
    </main>
  );
}
