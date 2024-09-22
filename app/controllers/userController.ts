import { connectToMongoDB } from "../lib/db";
import { revalidatePath } from "next/cache";
import { fetchPullRequests } from "@/services/githubService";
import User from "../models/userModel";
import Repository from "../models/repositoryModel";
import PullRequest from "../models/pullRequestModel";

export async function getUserRepository(email: string) {
  const user = await User.findOne({ email }).populate("repositories");
  return user ? user.repositories : null;
}

export async function saveUserGitHubInfo(
  session: { email: string; name: string; image: string },
  selectedRepos: string[],
  accessToken: string | undefined
) {
  await connectToMongoDB();

  try {
    let user = await User.findOne({ email: session.email });

    if (!user) {
      user = new User({
        email: session.email,
        name: session.name,
        image: session.image,
      });
    } else {
      user.name = session.name;
      user.image = session.image;
    }

    const updatedRepos = await Promise.all(
      selectedRepos.map(async (repoName) => {
        const [owner, repo] = repoName.split("/");
        let repository = await Repository.findOneAndUpdate(
          { name: repo, owner, userId: user._id },
          { name: repo, owner, userId: user._id },
          { upsert: true, new: true }
        );

        if (accessToken) {
          const pullRequests = await fetchPullRequests(
            accessToken,
            owner,
            repo
          );
          await Promise.all(
            pullRequests.map((pr) =>
              PullRequest.findOneAndUpdate(
                { repositoryId: repository._id, prId: pr.prId },
                { ...pr, repositoryId: repository._id },
                { upsert: true, new: true }
              )
            )
          );
        }

        return repository.name;
      })
    );

    user.repositories = updatedRepos;
    await user.save();

    revalidatePath("/");
    return { message: "success" };
  } catch (error) {
    console.error("user 데이터 저장 중 에러가 발생했습니다:", error);
    return { message: "데이터 저장 중 에러가 발생했습니다" };
  }
}

export async function fetchUserRepositories(email: string) {
  await connectToMongoDB();
  return getUserRepository(email);
}
