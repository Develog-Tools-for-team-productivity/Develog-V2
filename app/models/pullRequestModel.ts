import mongoose from "mongoose";

const pullRequestSchema = new mongoose.Schema({
  repositoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Repository" },
  prId: Number,
  title: String,
  state: String,
  createdAt: Date,
  updatedAt: Date,
  closedAt: Date,
  mergedAt: Date,
});

const PullRequest =
  mongoose.models.PullRequest ||
  mongoose.model("PullRequest", pullRequestSchema);

export default PullRequest;
