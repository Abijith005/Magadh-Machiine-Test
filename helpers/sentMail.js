import nodemailer from "nodemailer";

let count=0;
async function sentMail(email,subject,html) {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", 
      port: 465, 
      secure: true,
      tls: {
        rejectUnauthorized: false,
      }, 
      auth: {
        user: process.env.EMAIL, 
        pass: process.env.EMAIL_PASSWORD, 
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: subject,
      html:html,
    };


    // transporter.sendMail(mailOptions, function (error, info) {
    //   console.log(++count);
    //   if (error) {
    //     console.log("email sent error ", error);
    //     reject(error);
    //   } else {
    //     console.log("email sent successfull");
    //     resolve();
    //   }
    // });
  } catch (error) {
    console.log("Error", error);
  }
}

export default sentMail