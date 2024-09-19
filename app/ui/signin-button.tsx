"use client";
import { signIn } from "next-auth/react";

export function SignIn() {
  return (
    <form
      action={async () => {
        signIn("github", { redirectTo: "/repository" });
      }}
    >
      <button
        className="w-full bg-indigo-500 p-2 text-white rounded hover:bg-indigo-600"
        type="submit"
      >
        GitHub 로그인
      </button>
    </form>
  );
}
