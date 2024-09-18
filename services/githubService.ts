import { Octokit } from "@octokit/rest";

export function createGitHubService(accessToken: string) {
  const octokit = new Octokit({ auth: accessToken });

  return {
    async fetchRepositories() {
      try {
        const { data: repos } = await octokit.repos.listForAuthenticatedUser({
          sort: "updated",
          per_page: 100,
        });

        return repos.map((repo) => ({
          id: repo.id,
          name: repo.name,
        }));
      } catch (error) {
        console.error("레포지토리를 불러오지 못했습니다.", error);
        return [];
      }
    },
  };
}

export type GitHubService = ReturnType<typeof createGitHubService>;

export interface Repository {
  id: number;
  name: string;
}
