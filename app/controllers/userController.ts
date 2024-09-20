import User from "../models/userModel";

export async function getUserRepository(email: string) {
  try {
    const user = await User.findOne({ email });
    return user ? user.repositories : null;
  } catch (error) {
    console.error("저장된 레포지토리를 가져오지 못했습니다:", error);
    throw error;
  }
}

export async function saveUser(
  session: { email: string; name: string; image: string },
  selectedRepos: string[]
) {
  try {
    const newUser = new User({
      email: session.email,
      name: session.name,
      image: session.image,
      repositories: selectedRepos,
    });

    const savedUser = await newUser.save();

    if (!savedUser) {
      throw new Error("사용자를 저장하지 못했습니다.");
    }

    return savedUser;
  } catch (error) {
    console.error("사용자를 저장하지 못했습니다:", error);
    throw error;
  }
}

export async function updateUser(
  session: { email: string; name: string; image: string },
  selectedRepos: string[]
) {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { email: session.email },
      {
        $set: {
          image: session.image,
          name: session.name,
          repositories: selectedRepos,
        },
      },
      { upsert: true, new: true }
    );

    if (!updatedUser) {
      throw new Error("사용자 데이터 업데이트를 실패했습니다.");
    }

    return updatedUser;
  } catch (error) {
    console.error("사용자 데이터 업데이트를 실패했습니다:", error);
    throw error;
  }
}
