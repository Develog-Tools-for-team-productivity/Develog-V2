"use server";

import { connectToMongoDB } from "@/app/lib/db";
import User from "../lib/definitions";
import { revalidatePath } from "next/cache";

export async function saveUserData(
  session: { image: string; name: string },
  selectedRepos: { id: string; name: string }[]
) {
  await connectToMongoDB();

  try {
    const user = await User.findOne({ image: session.image });

    if (!user) {
      const newUser = new User({
        image: session.image,
        name: session.name,
        repositories: selectedRepos,
      });
      await newUser.save();
      revalidatePath("/");
      return { message: "success" };
    }
    user.repositories = selectedRepos;
    await user.save();
    revalidatePath("/");
    return { message: "success" };
  } catch (error) {
    console.error("Error in saveUserData:", error);
    return { message: "Error saving repositories" };
  }
}
