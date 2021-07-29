import { Schema, model } from "mongoose";

const PitchDeckSchema = new Schema(
  {
    fileUrl: String,
    title: String,
    description: String,
    company: String,
    highlight: [{ type: String }],
    imageUrl: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

export default model("PitchDeck", PitchDeckSchema);
