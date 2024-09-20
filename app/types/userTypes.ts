import { Document } from "mongoose";

export interface IUser {
  email: string;
  name: string;
  image: string;
  repositories: string[];
}

export interface UserDocument extends Document, IUser {
  createdAt: Date;
  updatedAt: Date;
}
