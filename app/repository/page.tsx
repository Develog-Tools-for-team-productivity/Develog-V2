import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();

  if (session?.user) {
    session.user = {
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
    };
  }

  return (
    <main>
      <p>repository page</p>
    </main>
  );
}
