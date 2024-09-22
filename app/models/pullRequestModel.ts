import mongoose from "mongoose";

const pullRequestSchema = new mongoose.Schema({
  repositoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Repository" },
  prId: Number,
  title: String,
  author: String,
  firstCommitTime: Date,
  commitCount: Number,
  mergedAt: Date,
  createdAt: Date,
  labels: { name: String },
  hasBugLabel: Boolean,
  isMergedToMain: Boolean,
});

const PullRequest =
  mongoose.models.PullRequest ||
  mongoose.model("PullRequest", pullRequestSchema);

export default PullRequest;
