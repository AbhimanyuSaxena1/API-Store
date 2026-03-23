import mongoose from "mongoose";

const subcriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    apiId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "API",
      required: true,
    },

    apiKey: {
      type: String,
      required: true,
      unique: true,
    },

    usageLimit: {
      type: Number,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Subcription = mongoose.model("ApiKey", subcriptionSchema);

export default Subcription;