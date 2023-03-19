var nodemailer = require('nodemailer');

const contactmail = async(UseremailId, username) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'agroacers.team@gmail.com',
            pass: process.env.PASSWORD
        }
    });

    var mailOptions = {
        from: 'agroacers.team@gmail.com',
        to: UseremailId,
        subject: 'Your Request have been Created || AgroAcers Support',
        html: `<p>Hi ${username},</p>
              <p>Thankyou for writing to us.we are working Hard to help you with your query and provide you best response.</p>
              <p>Thank you <br>
                Regards, <br>
                AgroAcers Support Team`
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
module.exports = contactmail