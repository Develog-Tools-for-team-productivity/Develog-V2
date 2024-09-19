"use server";

import { connectToMongoDB } from "@/app/lib/db";
import User from "../lib/definitions";
import { revalidatePath } from "next/cache";

export async function saveUserData(
  session: { email: string; name: string; image: string },
  selectedRepos: { id: string; name: string }[]
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
