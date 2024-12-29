import { CreateUserForm } from "./_components/create-user-form";

export default async function CreateUserPage({
  params,
}: {
  params: { sessionId: string };
}) {
  const sessionId = (await params).sessionId;

  return (
    <main className="container max-w-lg mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        Join Game
      </h1>

      <CreateUserForm sessionId={sessionId} />
    </main>
  );
}
