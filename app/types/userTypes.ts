import { Document } from "mongoose";

export interface UserType {
  email: string;
  name: string;
  image: string;
  repositories: string[];
}

export interface UserDocument extends Document, UserType {
  createdAt: Date;
  updatedAt: Date;
}
