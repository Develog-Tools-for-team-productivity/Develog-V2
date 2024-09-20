import LoginLayout from "./view/login/login-layout";
import { SignIn } from "./view/login/signin-button";
import Welcome from "./view/login/welcome";

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
