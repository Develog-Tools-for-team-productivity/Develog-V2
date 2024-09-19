import mongoose, { Document, Model } from "mongoose";

export interface IUser {
  image: string;
  name: string;
  repositories: Array<{ id: string; name: string }>;
}

export interface UserDocument extends Document, IUser {
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      unique: true,
    },
    repositories: [
      {
        id: String,
        name: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User: Model<UserDocument> =
  mongoose.models?.User || mongoose.model<UserDocument>("User", userSchema);

export default User;
