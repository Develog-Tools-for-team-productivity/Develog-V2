import { auth } from "@/auth";
import { createGitHubService } from "@/services/githubService";
import { RepositoryView } from "./repository-view";
import { Repository } from "@/services/githubService";

export default async function Page() {
  const session = await auth();
  let repos: Repository[] = [];

  if (session?.accessToken) {
    const githubService = createGitHubService(session.accessToken);
    repos = await githubService.fetchRepositories();
  }

  return <RepositoryView repos={repos} />;
}
