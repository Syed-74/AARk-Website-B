// import express from "express";
// import {
//   checkIn,
//   checkOut,
//   toggleBreak,
//   getToday,
// } from "../controllers/attendanceController.js";

// const router = express.Router();

// router.post("/checkin", checkIn);
// router.post("/checkout", checkOut);
// router.post("/break", toggleBreak);
// router.get("/today", getToday);

// export default router;


import express from "express";
import {
  checkIn,
  checkOut,
  toggleBreak,
  getToday,
  submitForApproval,
  hrUpdateStatus,
  getRecords,
} from "../controllers/attendanceController.js";

const router = express.Router();

router.post("/checkin", checkIn);
router.post("/checkout", checkOut);
router.post("/break", toggleBreak);
router.get("/today", getToday);
router.post("/submitForApproval", submitForApproval);
router.post("/hrUpdateStatus", hrUpdateStatus);
router.get("/records", getRecords);

export default router;
