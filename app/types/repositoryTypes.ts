import mongoose from "mongoose";

export interface RepositoryTypes {
  _id?: mongoose.Types.ObjectId;
  id: number;
  name: string;
  fullName: string;
  owner: string;
}
