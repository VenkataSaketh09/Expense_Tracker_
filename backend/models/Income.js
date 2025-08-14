import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    icon: { type: String },
    source: { type: String, required: true }, //ex:salary,freealnce
    amount: { type: Number, required: true },
    date: { type: Date, required:true },
  },
  { timestamps: true }
);

export const Income = mongoose.model("Income", incomeSchema);
