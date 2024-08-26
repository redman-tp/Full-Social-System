const mongoose = require("mongoose")
const Schema = mongoose.Schema

const notificationSchema = new Schema({
  recipient: { 
    type: Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
}, // The user who will receive the notification
  sender: { 
    type: Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
}, // The user who triggered the notification
  type: { 
    type: String, 
    enum: ["like", "follow", "comment"], 
    required: true 
}, // Type of notification
  post: { 
    type: Schema.Types.ObjectId, 
    ref: "Post" 
}, // Associated post (for likes and comments)
  isRead: { 
    type: Boolean, 
    default: false 
}, // Whether the notification has been read
  createdAt: { type: Date, default: Date.now },
})

const Notification = mongoose.model("Notification", notificationSchema)
module.exports = Notification
