import nodemailer from 'nodemailer';
import User from "@/models/usermodel";
import bcryptjs from 'bcryptjs';


export const sendEmail = async({email, emailType, userId}:any) => {
    try {
        // create a hased token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId,  
                {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000})
        } else if (emailType === "RESET"){
            await User.findByIdAndUpdate(userId, 
                {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000})
        }

        let transport = nodemailer.createTransport({
            host: process.env.HOST as string,
            port: Number(process.env.PORT),
            auth: {
              user: process.env.USEEM as string,
              pass: process.env.PASSEM as string
            }
          });
         console.log("ENV HOST:", process.env.HOST);
           console.log("ENV PORT:", process.env.PORT);
           console.log("ENV USER:", process.env.EMAIL_USER);
            console.log("ENV PASS:", process.env.EMAIL_PASSWORD);
            console.log("emailmyy",process.env.FROM)

        const mailOptions = {
            from: process.env.FROM as string,
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        }

        const mailresponse = await transport.sendMail
        (mailOptions);
        return mailresponse;

    } catch (error:any) {
        throw new Error(error.message);
    }
}