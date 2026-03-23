import mongoose from "mongoose";

const endpointSchema = new mongoose.Schema(
  {
    apiId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "API",
      required: true,
    },

    method: {
      type: String,
      enum: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      required: true,
    },

    path: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    requestBody: {
      type: Object,
      default: {},
    },

    responseExample: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

const Endpoint = mongoose.model("Endpoint", endpointSchema);

export default Endpoint;