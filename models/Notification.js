import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    notificationId: { type: String, required: true, unique: true, trim: true },
    type: { type: String, enum: ["Email", "SMS"], required: true },
    sender_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CreateAccount",
      required: true,
    },
    recipient: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CreateAccount",
        required: true,
      },
    ],
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    subject: {
      type: String,
      trim: true,
      required: false,
    },
    template: {
      type: String,
      required: function () {
        return this.type === "Email";
      },
      trim: true,
    },
    status: {
      type: String,
      enum: ["In Progress", "Completed", "Failed"],
      default: "In Progress",
    },
    priority: {
      type: String,
      enum: ["High", "Medium", "Low"],
      default: "Medium",
    },
  },
  { timestamps: true }
);

notificationSchema.pre("save", function (next) {
  this.updatedDate = new Date();
  next();
});

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
