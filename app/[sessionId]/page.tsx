import { SessionContent } from "./_components/session-content";

export default async function SessionPage({
  params,
}: {
  params: { sessionId: string };
}) {
  const sessionId = (await params).sessionId;

  return (
    <main className="container max-w-2xl mx-auto p-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">Drinking Game!</h1>
        <p className="text-muted-foreground">Session ID: {sessionId}</p>
      </div>

      <SessionContent sessionId={sessionId} />
    </main>
  );
}
