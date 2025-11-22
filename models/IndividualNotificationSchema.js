import mongoose from "mongoose";

const IndividualNotificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CreateAccount",
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Sent", "Failed"],
      default: "Pending",
    },
    subject: { type: String, trim: true },
    template: { type: String, trim: true },
    priority: {
      type: String,
      enum: ["High", "Medium", "Low"],
      default: "Medium",
    },
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CreateAccount",
        default: null,
        required: false,
      },
      {
        createdAt: { type: Date, default: Date.now },
        reply_message: { type: String, default: null, required: false },
      },
    ],
  },
  { timestamps: true }
);

const IndividualNotification = mongoose.model(
  "IndividualNotification",
  IndividualNotificationSchema
);


export default IndividualNotification;
