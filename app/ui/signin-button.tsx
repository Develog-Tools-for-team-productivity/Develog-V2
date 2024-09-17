import { signIn } from "@/auth";

export function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github", { redirectTo: "/repository" });
      }}
    >
      <button type="submit">Sign in</button>
    </form>
  );
}
