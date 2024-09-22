import { Octokit } from "octokit";
import { RepositoryTypes } from "./../app/types/repositoryTypes";

export function createGitHubService(accessToken: string) {
  const octokit = new Octokit({ auth: accessToken });

  return {
    async fetchRepositories(): Promise<RepositoryTypes[]> {
      try {
        const response = await octokit.request("GET /user/repos", {
          affiliation: "owner,collaborator,organization_member",
          sort: "updated",
          per_page: 100,
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        });

        return response.data.map((repo: any) => ({
          id: repo.id,
          name: repo.name,
          fullName: repo.full_name,
          owner: repo.owner.login,
        }));
      } catch (error) {
        console.error("레포지토리를 불러오지 못했습니다.", error);
        return [];
      }
    },
  };
}

export async function fetchPullRequests(
  accessToken: string | undefined,
  owner: string,
  repo: string
) {
  if (!owner || !repo) {
    throw new Error(`잘못된 레포지토리입니다: ${owner}/${repo}`);
  }

  const octokit = new Octokit({ auth: accessToken });

  try {
    const response = await octokit.request("GET /repos/{owner}/{repo}/pulls", {
      owner,
      repo,
      state: "all",
      per_page: 100,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    return response.data.map((pr) => ({
      prId: pr.id,
      title: pr.title,
      state: pr.state,
      createdAt: pr.created_at,
      updatedAt: pr.updated_at,
      closedAt: pr.closed_at,
      mergedAt: pr.merged_at,
    }));
  } catch (error) {
    console.error(
      `${owner}/${repo}의 PullRequest 불러오는 중 에러가 발생했습니다:`,
      error
    );
    throw error;
  }
}

export type GitHubService = ReturnType<typeof createGitHubService>;
