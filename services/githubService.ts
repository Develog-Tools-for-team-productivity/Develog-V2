import { Octokit } from "octokit";

export function createGitHubService(accessToken: string) {
  const octokit = new Octokit({ auth: accessToken });

  return {
    async fetchRepositories() {
      try {
        const response = await octokit.request("GET /user/repos", {
          sort: "updated",
          per_page: 100,
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        });

        return response.data.map((repo: Repository) => ({
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
