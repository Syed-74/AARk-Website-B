import mongoose from "mongoose";

const createAccountSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    dob: Date,
    gender: String,
    contact: String,
    email: { type: String, unique: true, required: true }, // company email
    altEmail: String,
    employeeId: {
      type: String,
      unique: true,
      required: function () {
        return this.role === "user";
      },
    }, // login option
    joiningDate: Date,
    designation: String,
    location: String,
    username: String,
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "user","HR"],
      required: true,
      default: "user",
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      // required: function(){
      //   return this.role === "user" || this.role === "HR";
      // },
    },
    designation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Designation",
      required: function (){
        return this.role === "user" || this.role === "HR";
      },
    },

    photo: String,
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  },
  { timestamps: true }
);
 

export default mongoose.model("CreateAccount", createAccountSchema);