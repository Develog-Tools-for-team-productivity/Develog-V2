"use server";

import { connectToMongoDB } from "@/app/lib/db";
import User from "../models/userModel";
import {
  getUserRepository,
  saveUser,
  updateUser,
} from "../controllers/userController";
import { revalidatePath } from "next/cache";

export async function fetchUserRepositories(email: string) {
  await connectToMongoDB();
  return getUserRepository(email);
}

export async function saveUserData(
  session: { email: string; name: string; image: string },
  selectedRepos: string[]
) {
  await connectToMongoDB();

  try {
    const user = await User.findOne({ email: session.email });

    if (!user) {
      saveUser(session, selectedRepos);
    } else {
      updateUser(session, selectedRepos);
    }

    revalidatePath("/");
    return { message: "success" };
  } catch (error) {
    console.error("Error in saveUserData:", error);
    return { message: "Error saving repositories" };
  }
}
