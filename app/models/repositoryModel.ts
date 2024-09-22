import mongoose from "mongoose";

const repositorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
  owner: String,
});

const Repository =
  mongoose.models.Repository || mongoose.model("Repository", repositorySchema);

export default Repository;
