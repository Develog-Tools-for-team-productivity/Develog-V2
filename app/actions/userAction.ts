"use server";

import { connectToMongoDB } from "@/app/lib/db";
import {
  getUserRepository,
  saveUserGitHubInfo,
} from "../controllers/userController";
import { revalidatePath } from "next/cache";

export async function fetchUserRepositories(email: string) {
  await connectToMongoDB();
  return getUserRepository(email);
}

export async function saveUserData(
  session: { email: string; name: string; image: string },
  selectedRepos: string[],
  accessToken: string | undefined
) {
  await connectToMongoDB();

  try {
    const result = await saveUserGitHubInfo(
      session,
      selectedRepos,
      accessToken
    );
    revalidatePath("/");
    return result;
  } catch (error) {
    console.error("user 데이터 저장 중 에러가 발생했습니다:", error);
    return { message: "데이터 저장 중 에러가 발생했습니다" };
  }
}
