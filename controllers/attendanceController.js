// import Attendance from "../models/Attendance.js";
// import dayjs from "dayjs";
// import utc from "dayjs/plugin/utc.js";
// import timezone from "dayjs/plugin/timezone.js";


// dayjs.extend(utc);
// dayjs.extend(timezone);

// const config = {
//   halfDayThresholdMinutes: 240,
//   minWorkHoursBeforeCheckout: 9,
// };

// const calculateAttendance = (record) => {
//   const { checkInTime, checkOutTime, breaks } = record;
//   if (!checkInTime) return { ...record, status: "Not Checked-in" };

//   const totalBreakMinutes = breaks.reduce((sum, b) => {
//     if (b.startTime && b.endTime) {
//       return sum + dayjs(b.endTime).diff(dayjs(b.startTime), "minute");
//     }
//     return sum;
//   }, 0);

//   let workedMinutes = 0;
//   let status = "Present";

//   if (checkOutTime) {
//     workedMinutes =
//       dayjs(checkOutTime).diff(dayjs(checkInTime), "minute") - totalBreakMinutes;

//     if (workedMinutes < config.halfDayThresholdMinutes) status = "Half Day";
//     else if (workedMinutes < config.minWorkHoursBeforeCheckout * 60)
//       status = "Incomplete Shift";
//   } else {
//     status = "Pending Checkout";
//   }

//   return { workedMinutes, totalBreakMinutes, status };
// };

// // Check-in
// export const checkIn = async (req, res) => {
//   try {
//     const { employeeId, timezone } = req.body;
//     const date = dayjs().tz(timezone).format("YYYY-MM-DD");

//     let record = await Attendance.findOne({ employeeId, date });
//     if (record) return res.status(400).json({ message: "Already checked in" });

//     const newRecord = new Attendance({
//       employeeId,
//       date,
//       checkInTime: dayjs().tz(timezone).toDate(),
//       status: "Pending Checkout",
//     });

//     await newRecord.save();
//     res.json(newRecord);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Check-out
// export const checkOut = async (req, res) => {
//   try {
//     const { employeeId, timezone } = req.body;
//     const date = dayjs().tz(timezone).format("YYYY-MM-DD");

//     const record = await Attendance.findOne({ employeeId, date });
//     if (!record) return res.status(404).json({ message: "No attendance found" });

//     const now = dayjs().tz(timezone);
//     const workedMinutes =
//       dayjs(now).diff(dayjs(record.checkInTime), "minute") -
//       record.breaks.reduce((sum, b) => {
//         if (b.startTime && b.endTime)
//           return sum + dayjs(b.endTime).diff(dayjs(b.startTime), "minute");
//         return sum;
//       }, 0);

//     if (workedMinutes < config.minWorkHoursBeforeCheckout * 60)
//       return res.status(400).json({
//         message: `Shift not completed! Must work at least ${config.minWorkHoursBeforeCheckout} hours.`,
//       });

//     record.checkOutTime = now.toDate();
//     const calculated = calculateAttendance(record);
//     record.workedMinutes = calculated.workedMinutes;
//     record.totalBreakMinutes = calculated.totalBreakMinutes;
//     record.status = calculated.status;

//     await record.save();
//     res.json(record);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Start / End Break
// export const toggleBreak = async (req, res) => {
//   try {
//     const { employeeId, timezone } = req.body;
//     const date = dayjs().tz(timezone).format("YYYY-MM-DD");

//     const record = await Attendance.findOne({ employeeId, date });
//     if (!record) return res.status(404).json({ message: "No attendance record found" });

//     const now = dayjs().tz(timezone).toDate();
//     const ongoingBreak = record.breaks.find((b) => !b.endTime);

//     if (ongoingBreak) ongoingBreak.endTime = now;
//     else record.breaks.push({ breakId: Date.now(), startTime: now });

//     const calculated = calculateAttendance(record);
//     record.workedMinutes = calculated.workedMinutes;
//     record.totalBreakMinutes = calculated.totalBreakMinutes;
//     record.status = calculated.status;

//     await record.save();
//     res.json(record);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Get Today's Attendance
// export const getToday = async (req, res) => {
//   try {
//     const { employeeId, timezone } = req.query;
//     const date = dayjs().tz(timezone).format("YYYY-MM-DD");
//     const record = await Attendance.findOne({ employeeId, date });
//     res.json(record || {});
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
    

import Attendance from "../models/Attendance.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";

dayjs.extend(utc);
dayjs.extend(timezone);

const config = {
  halfDayThresholdMinutes: 240,
  minWorkHoursBeforeCheckout: 9,
};

const calculateAttendance = (record) => {
  const { checkInTime, checkOutTime, breaks } = record;
  if (!checkInTime) return { ...record, status: "Not Checked-in" };

  const totalBreakMinutes = breaks.reduce((sum, b) => {
    if (b.startTime && b.endTime) return sum + dayjs(b.endTime).diff(dayjs(b.startTime), "minute");
    return sum;
  }, 0);

  let workedMinutes = 0;
  let status = "Present";

  if (checkOutTime) {
    workedMinutes = dayjs(checkOutTime).diff(dayjs(checkInTime), "minute") - totalBreakMinutes;

    if (workedMinutes < config.halfDayThresholdMinutes) status = "Half Day";
    else if (workedMinutes < config.minWorkHoursBeforeCheckout * 60) status = "Incomplete Shift";
  } else {
    status = "Pending Checkout";
  }

  return { workedMinutes, totalBreakMinutes, status };
};

// Check-in
export const checkIn = async (req, res) => {
  const { employeeId, timezone } = req.body;
  const date = dayjs().tz(timezone).format("YYYY-MM-DD");
  try {
    let record = await Attendance.findOne({ employeeId, date });
    if (record) return res.status(400).json({ message: "Already checked in" });

    const newRecord = new Attendance({
      employeeId,
      date,
      checkInTime: dayjs().tz(timezone).toDate(),
      status: "Pending Checkout",
    });

    await newRecord.save();
    res.json(newRecord);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Check-out
export const checkOut = async (req, res) => {
  const { employeeId, timezone } = req.body;
  const date = dayjs().tz(timezone).format("YYYY-MM-DD");

  try {
    const record = await Attendance.findOne({ employeeId, date });
    if (!record) return res.status(404).json({ message: "No attendance found" });

    const now = dayjs().tz(timezone);
    const workedMinutes =
      dayjs(now).diff(dayjs(record.checkInTime), "minute") -
      record.breaks.reduce((sum, b) => (b.startTime && b.endTime ? sum + dayjs(b.endTime).diff(dayjs(b.startTime), "minute") : sum), 0);

    if (workedMinutes < config.minWorkHoursBeforeCheckout * 60)
      return res.status(400).json({ message: `Shift not completed! Must work at least ${config.minWorkHoursBeforeCheckout} hours.` });

    record.checkOutTime = now.toDate();
    const calculated = calculateAttendance(record);
    record.workedMinutes = calculated.workedMinutes;
    record.totalBreakMinutes = calculated.totalBreakMinutes;
    record.status = calculated.status;

    await record.save();
    res.json(record);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Start / End Break
export const toggleBreak = async (req, res) => {
  const { employeeId, timezone } = req.body;
  const date = dayjs().tz(timezone).format("YYYY-MM-DD");

  try {
    const record = await Attendance.findOne({ employeeId, date });
    if (!record) return res.status(404).json({ message: "No attendance record found" });

    const now = dayjs().tz(timezone).toDate();
    const ongoingBreak = record.breaks.find((b) => !b.endTime);
    if (ongoingBreak) ongoingBreak.endTime = now;
    else record.breaks.push({ breakId: Date.now(), startTime: now });

    const calculated = calculateAttendance(record);
    record.workedMinutes = calculated.workedMinutes;
    record.totalBreakMinutes = calculated.totalBreakMinutes;
    record.status = calculated.status;

    await record.save();
    res.json(record);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Today's Attendance
export const getToday = async (req, res) => {
  const { employeeId, timezone } = req.query;
  const date = dayjs().tz(timezone).format("YYYY-MM-DD");

  try {
    const record = await Attendance.findOne({ employeeId, date });
    res.json(record || {});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Submit attendance to HR
export const submitForApproval = async (req, res) => {
  const { employeeId, timezone } = req.body;
  const date = dayjs().tz(timezone).format("YYYY-MM-DD");

  try {
    const record = await Attendance.findOne({ employeeId, date });
    if (!record) return res.status(404).json({ message: "No attendance found" });

    record.status = "Pending HR Approval";
    await record.save();
    res.json({ message: "Attendance submitted to HR" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// HR updates status
export const hrUpdateStatus = async (req, res) => {
  const { recordId, status, comment } = req.body;
  try {
    const record = await Attendance.findById(recordId);
    if (!record) return res.status(404).json({ message: "Attendance not found" });

    record.status = status;
    if (comment) record.comments.push({ role: "HR", comment, at: new Date() });

    await record.save();
    res.json({ message: `Attendance ${status.toLowerCase()}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get attendance records by date range
export const getRecords = async (req, res) => {
  const { startDate, endDate } = req.query;
  try {
    const records = await Attendance.find({
      date: { $gte: startDate, $lte: endDate },
    });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

