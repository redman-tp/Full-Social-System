const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    othername: {
        type: String
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: false
    },
    following:[{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    followers:[{
        type: Schema.Types.ObjectId,
        ref: 'User'        
    }],
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    notifications: [{ type: Schema.Types.ObjectId, ref: 'Notification' }]
}, { timestamps: true });

// Hash the password before saving the user
userSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Method to validate password
userSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
