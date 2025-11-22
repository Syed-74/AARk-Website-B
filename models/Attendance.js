// import mongoose from "mongoose";

// const breakSchema = new mongoose.Schema({
//   breakId: Number,
//   startTime: Date,
//   endTime: Date,
// });

// const attendanceSchema = new mongoose.Schema({
//   employeeId: { type: String, required: true },
//   date: { type: String, required: true }, // YYYY-MM-DD
//   checkInTime: Date,
//   checkOutTime: Date,
//   breaks: [breakSchema],
//   workedMinutes: { type: Number, default: 0 },
//   totalBreakMinutes: { type: Number, default: 0 },
//   status: {
//     type: String,
//     enum: ["Not Checked-in", "Present", "Half Day", "Incomplete Shift", "Pending Checkout"],
//     default: "Not Checked-in",
//   },
// });

// const Attendance = mongoose.model("Attendance", attendanceSchema);
// export default Attendance;



import mongoose from "mongoose";

const breakSchema = new mongoose.Schema({
  breakId: Number,
  startTime: Date,
  endTime: Date,
});

const commentSchema = new mongoose.Schema({
  role: String,
  comment: String,
  at: Date,
});

const attendanceSchema = new mongoose.Schema({
  employeeId: { type: String, required: true },
  date: { type: String, required: true },
  checkInTime: Date,
  checkOutTime: Date,
  breaks: [breakSchema],
  workedMinutes: { type: Number, default: 0 },
  totalBreakMinutes: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ["Not Checked-in", "Pending Checkout", "Present", "Half Day", "Incomplete Shift", "Pending HR Approval", "Approved", "Rejected"],
    default: "Not Checked-in",
  },
  comments: [commentSchema],
});

const Attendance = mongoose.model("Attendance", attendanceSchema);
export default Attendance;
