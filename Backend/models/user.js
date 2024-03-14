const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        maxLength: [100, "Your name cannot exceed 100 characters"],
    },

    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        validate: [validator.isEmail, "Please enter valid email address"],
    },

    password: {
        type: String,
        required: [true, "Please enter your password"],
        minlength: [6, "Your password must be longer than 6 characters"],
        select: false,
    },

    avatar: {
        public_id: {
            type: String,
            required: true,
        },

        url: {
            type: String,
            required: true,
            default: "https://res.cloudinary.com/dkamtzeky/image/upload/v1709386198/user/avatar-default.png",
        },
    },

    role: {
        type: String,
        default: "user",
        required: true,
    },

    googleId: {
        type: String,
        required: false
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    emailCodeVerification: {
        type: String,
    },
    emailCodeExpire: Date,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

// uncomment to test bcrypt

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id, name: this.name }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME,
    });
};

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getResetPasswordToken = function () {
    // Generate token

    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hash and set to resetPasswordToken

    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    // Set token expire time

    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

    return resetToken;
};

userSchema.methods.getEmailCodeVerification = async function () {
    const code = codeGenerator(6);
    this.emailCodeVerification = code.trim();
    this.emailCodeExpire = Date.now() + 5 * 60 * 1000;
    return code;
}

const characters = '0123456789';

const codeGenerator = (length) => {
    let result = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

// Return JWT token

module.exports = mongoose.model("User", userSchema);