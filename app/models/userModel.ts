import mongoose, { Model } from "mongoose";
import { IUser } from "../types/userTypes";

export interface UserDocument extends Document, IUser {
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      unique: true,
    },
    repositories: [String],
  },
  {
    timestamps: true,
  }
);

const User: Model<UserDocument> =
  mongoose.models?.User || mongoose.model<UserDocument>("User", userSchema);

export default User;
