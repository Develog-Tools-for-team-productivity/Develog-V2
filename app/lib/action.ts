"use server";

import { connectToMongoDB } from "@/app/lib/db";
import User from "../lib/definitions";
import { revalidatePath } from "next/cache";

export async function fetchUserRepository(email: string) {
  await connectToMongoDB();

  try {
    const user = await User.findOne({ email });
    return user ? user.repositories : null;
  } catch (error) {
    console.error("저장된 레포지토리를 가져오지 못했습니다:", error);
    throw error;
  }
}

export async function saveUserData(
  session: { email: string; name: string; image: string },
  selectedRepos: string[]
) {
  await connectToMongoDB();

  try {
    const user = await User.findOne({ email: session.email });

    if (!user) {
      const newUser = new User({
        email: session.email,
        name: session.name,
        image: session.image,
        repositories: selectedRepos,
      });
      await newUser.save();
    } else {
      user.repositories = selectedRepos;
      await user.save();
    }

    revalidatePath("/");
    return { message: "success" };
  } catch (error) {
    console.error("Error in saveUserData:", error);
    return { message: "Error saving repositories" };
  }
}
