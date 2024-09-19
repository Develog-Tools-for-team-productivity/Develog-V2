import { auth } from "@/auth";
import { createGitHubService } from "@/services/githubService";
import { RepositoryView } from "./repository-view";
import { Repository } from "@/services/githubService";
import LoginLayout from "../ui/login-layout";

export default async function Page() {
  const session = await auth();
  let repos: Repository[] = [];

  if (session?.accessToken) {
    const githubService = createGitHubService(session.accessToken);
    repos = await githubService.fetchRepositories();
  }

  return (
    <main className="flex w-full h-screen flex-row bg-indigo-50">
      <div className="basis-1/3">
        <LoginLayout />
      </div>
      <div className="flex justify-center basis-2/3">
        <div className="w-2/6 flex flex-col justify-center">
          <RepositoryView repos={repos} />
        </div>
      </div>
    </main>
  );
}
