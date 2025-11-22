// import IndividualNotification from "../models/IndividualNotificationSchema.js";

// //  Create a new individual notification
// // exports.createNotification = async (req, res) => {
// //   try {
// //     const notification = new IndividualNotification(req.body);
// //     const savedNotification = await notification.save();
// //     res.status(201).json({
// //       success: true,
// //       message: "Notification created successfully",
// //       data: savedNotification,
// //     });
// //   } catch (error) {
// //     res.status(400).json({ success: false, message: error.message });
// //   }
// // };

// // 🟢 Get all notifications
// exports.getAllNotifications = async (req, res) => {
//   try {
//     const notifications = await IndividualNotification.find()
//       .populate("recipient", "firstName lastName email")
//       .sort({ createdAt: -1 });

//     res.status(200).json({ success: true, data: notifications });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // 🟢 Get single notification by ID
// exports.getNotificationById = async (req, res) => {
//   try {
//     const notification = await IndividualNotification.findById(req.params.id)
//       .populate("recipient", "firstName lastName email");

//     if (!notification) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Notification not found" });
//     }

//     res.status(200).json({ success: true, data: notification });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // 🟢 Update notification (status, subject, etc.)
// exports.updateNotification = async (req, res) => {
//   try {
//     const updatedNotification = await IndividualNotification.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true, runValidators: true }
//     );

//     if (!updatedNotification) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Notification not found" });
//     }

//     res
//       .status(200)
//       .json({ success: true, message: "Notification updated", data: updatedNotification });
//   } catch (error) {
//     res.status(400).json({ success: false, message: error.message });
//   }
// };

// // 🟢 Delete notification
// exports.deleteNotification = async (req, res) => {
//   try {
//     const deletedNotification = await IndividualNotification.findByIdAndDelete(
//       req.params.id
//     );

//     if (!deletedNotification) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Notification not found" });
//     }

//     res
//       .status(200)
//       .json({ success: true, message: "Notification deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // 🟢 Mark as Sent
// exports.markAsSent = async (req, res) => {
//   try {
//     const notification = await IndividualNotification.findById(req.params.id);

//     if (!notification) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Notification not found" });
//     }

//     notification.status = "Sent";
//     notification.sentAt = new Date();
//     await notification.save();

//     res.status(200).json({
//       success: true,
//       message: "Notification marked as sent",
//       data: notification,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // 🟢 Get notifications by recipient
// exports.getNotificationsByRecipient = async (req, res) => {
//   try {
//     const { recipientId } = req.params;
//     const notifications = await IndividualNotification.find({
//       recipient: recipientId,
//     }).sort({ createdAt: -1 });

//     res.status(200).json({ success: true, data: notifications });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
// // 🟢 Get notifications by status
// exports.getNotificationsByStatus = async (req, res) => {
//   try {
//     const { status } = req.params;
//     const notifications = await IndividualNotification.find({ status }).sort({
//       createdAt: -1,
//     }); 
//     res.status(200).json({ success: true, data: notifications });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   } 
// };

// // reply 
// exports.replyToNotification = async (req, res) => {
//     try {
//     const { id } = req.params;
//     const { reply_message, replierId } = req.body;
//     const notification = await IndividualNotification.findById(id);
//     if (!notification) {
//       return res    .status(404)
//         .json({ success: false, message: "Notification not found" });
//     }
//     notification.replies.push({
//       replier: replierId,
//       reply_message,
//         createdAt: new Date(),
//     });
//     await notification.save();
//     res.status(200).json({
//       success: true,
//       message: "Reply added successfully",
//       data: notification,
//     });
//   }
//     catch (error) { 
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export {
//   getAllNotifications,
//   getNotificationById,
//   updateNotification,
//   deleteNotification,
//   markAsSent,
//   getNotificationsByRecipient,
//   getNotificationsByStatus,
//   replyToNotification
// };


import IndividualNotification from "../models/IndividualNotificationSchema.js";
import CreateAccount from "../models/CreateAccount.js";
// 🟢 Get all notifications
const getAllNotifications = async (req, res) => {
  try {
    const notifications = await IndividualNotification.find()
      .populate("recipient", "firstName lastName email")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🟢 Get single notification by ID
const getNotificationById = async (req, res) => {
  try {
    const notification = await IndividualNotification.findById(req.params.id)
      .populate("recipient", "firstName lastName email");

    if (!notification) {
      return res
        .status(404)
        .json({ success: false, message: "Notification not found" });
    }

    res.status(200).json({ success: true, data: notification });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🟢 Update notification
const updateNotification = async (req, res) => {
  try {
    const updatedNotification = await IndividualNotification.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedNotification) {
      return res
        .status(404)
        .json({ success: false, message: "Notification not found" });
    }

    res.status(200).json({
      success: true,
      message: "Notification updated",
      data: updatedNotification,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 🟢 Delete notification
const deleteNotification = async (req, res) => {
  try {
    const deletedNotification = await IndividualNotification.findByIdAndDelete(
      req.params.id
    );

    if (!deletedNotification) {
      return res
        .status(404)
        .json({ success: false, message: "Notification not found" });
    }

    res.status(200).json({
      success: true,
      message: "Notification deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🟢 Mark as Sent
const markAsSent = async (req, res) => {
  try {
    const notification = await IndividualNotification.findById(req.params.id);

    if (!notification) {
      return res
        .status(404)
        .json({ success: false, message: "Notification not found" });
    }

    notification.status = "Sent";
    notification.sentAt = new Date();
    await notification.save();

    res.status(200).json({
      success: true,
      message: "Notification marked as sent",
      data: notification,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🟢 Get notifications by recipient
const getNotificationsByRecipient = async (req, res) => {
  try {
    const { recipientId } = req.params;
    const notifications = await IndividualNotification.find({
      recipient: recipientId,
    }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🟢 Get notifications by status
const getNotificationsByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const notifications = await IndividualNotification.find({ status }).sort({
      createdAt: -1,
    });
    res.status(200).json({ success: true, data: notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🟢 Reply to notification
const replyToNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const { reply_message, replierId } = req.body;

    const notification = await IndividualNotification.findById(id);
    if (!notification) {
      return res
        .status(404)
        .json({ success: false, message: "Notification not found" });
    }

    notification.replies.push({
      replier: replierId,
      reply_message,
      createdAt: new Date(),
    });
    await notification.save();

    res.status(200).json({
      success: true,
      message: "Reply added successfully",
      data: notification,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const fetchEmployeesFromDepartment = async (req, res) => {
  try {
    const  department  = req.params.department||req.params;
    console.log(department)
    const existingDepartment = await CreateAccount.find({
      department: department,
    });
    if (existingDepartment.length === 0) {
      return res
        .status(400)
        .json({ message: "One or more recipients not found" });
    }
    res
      .status(200)
      .json({ message: "All recipients are valid", data: existingDepartment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ✅ Correct ES Module export
export {
  getAllNotifications,
  getNotificationById,
  updateNotification,
  deleteNotification,
  markAsSent,
  getNotificationsByRecipient,
  getNotificationsByStatus,
  replyToNotification,
  fetchEmployeesFromDepartment,
};
