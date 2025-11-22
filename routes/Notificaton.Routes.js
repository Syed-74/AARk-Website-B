import express from "express";
import {
  addNotification,
  getNotifications,
  deleteNotification,
  searchCreateAccount
} from "../controllers/Notification.Controllers.js";

import {
  getNotificationById,
  updateNotification,
  deleteNotification as deleteIndividualNotification,
  fetchEmployeesFromDepartment
} from "../controllers/IndividualNotification.Controllers.js";

import { protect } from "../Middleware/middleware.js";

const router = express.Router();

router.post("/notification/add", protect, addNotification);
router.get("/notification", getNotifications);
router.delete("/notification/delete/:id", protect, deleteNotification);
router.get("/user/search", searchCreateAccount);
router.get("/employees/department/:department", fetchEmployeesFromDepartment);
router.get("/notification/:id", protect, getNotificationById);
// router.put("/notification/update/:id", protect, updateNotification);
router.delete("/notification/delete-individual/:id", protect, deleteIndividualNotification);

export default router;
