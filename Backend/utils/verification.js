const sendEmail = require('../utils/sendEmail')





exports.sendCodeToEmail = (user, code) => {
    sendEmail({
        email: user.email,
        subject: 'Verification Code',
        message: `This is your verification code ${code}. This will be valid in 5 minutes`
    })
}

exports.verifyEmailCode = (user, req, res, next) => {

    const { code } = req.body;

    if (user.emailCodeVerification !== code) {
        res.status(406).json({
            success: false,
            message: `Email verification code doesn't match`
        })
        return false
    }

    if (user.emailCodeExpire < Date.now()) {
        res.status(406).json({
            success: false,
            message: 'Verfication code are expired, please resend code'
        })
        return false
    }

    return true
}

exports.verifyAccount = async user => {
    user.isEmailVerified = true
    user.emailCodeExpire = null
    user.emailCodeVerification = null
    user.save();
    return user;
}