import Notification from "../models/Notification.js";
import CreateAccount from "../models/CreateAccount.js";
import IndividualNotification from "../models/IndividualNotificationSchema.js";

// Add Notification
const addNotification = async (req, res) => {
  const {
    notificationId,
    type,
    recipient,
    department,
    subject,
    template,
    priority,
  } = req.body;

  const sender_Id = req.user.id || req.user; // Assuming req.user is set by auth middleware
  try {
    const verifySenderExists = await CreateAccount.findById(sender_Id);
    if (!verifySenderExists)
      return res.status(404).json({ message: "Sender not found" });
    const newNotification = new Notification({
      notificationId,
      type,
      sender_Id,
      recipient,
      department,
      subject,
      template,
      priority,
    });
    await newNotification.save();
    const existingRecipients = await CreateAccount.find({
      _id: { $in: recipient },
    });
    if (existingRecipients.length !== recipient.length) {
      return res
        .status(400)
        .json({ message: "One or more recipients not found" });
    }

    for (let rec of recipient) {
      const individualNotification = await IndividualNotification.create({
        recipient: rec,
        status: "Sent",
        subject,
        template,
        priority,
      });
      await individualNotification.save();
    }
    res.status(201).json({
      message: "Notification created successfully",
      notification: newNotification,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Get All Notifications
const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Delete Notification
const deleteNotification = async (req, res) => {
  try {
    const deleted = await Notification.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Notification not found" });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Search CreateAccount by Email
const searchCreateAccount = async (req, res) => {
  const { email } = req.query;
  try {
    const user = await CreateAccount.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "CreateAccount not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export {
  addNotification,
  getNotifications,
  deleteNotification,
  searchCreateAccount,
};
