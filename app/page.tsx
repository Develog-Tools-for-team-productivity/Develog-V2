import LoginLayout from "./ui/login-layout";
import { SignIn } from "./ui/signin-button";
import Welcome from "./ui/welcome";

export default function Home() {
  return (
    <main className="flex w-full h-screen flex-row bg-indigo-50">
      <div className="basis-1/3">
        <LoginLayout />
      </div>
      <div className="flex justify-center basis-2/3">
        <div className="w-2/6 flex flex-col justify-center">
          <Welcome />
          <SignIn />
        </div>
      </div>
    </main>
  );
}
