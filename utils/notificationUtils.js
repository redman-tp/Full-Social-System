// utils/notificationUtils.js
const Notification = require('../models/notification');
const User = require('../models/User');

const createNotification = async (recipientId, senderId, type, postId = null) => {
    try {
        // Create a new notification
        const notification = new Notification({
            recipient: recipientId,
            sender: senderId,
            type: type,
            post: postId
        });

        // Save the notification to the database
        const savedNotification = await notification.save();

        // Add the notification ID to the recipient's notifications array
        await User.findByIdAndUpdate(recipientId, {
            $push: { notifications: savedNotification._id }
        });

        return savedNotification;
    } catch (error) {
        console.error('Error creating notification:', error);
        throw error;
    }
};

module.exports = { createNotification };
