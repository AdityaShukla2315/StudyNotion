const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
    try {
        // Create test account
        const testAccount = await nodemailer.createTestAccount();

        // Create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass,
            },
        });

        // Send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"StudyNotion" <StudyNotion@example.com>',
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
        });

        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        return info;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

module.exports = mailSender;