var nodemailer = require('nodemailer');

const sendmsgtofarmer = async(name, email, contact, company, body, Farmername, Farmeremail) => {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: 'agroacers.team@gmail.com',
            pass: process.env.PASSWORD
        }
    });

    var mailOptions = {
        from: 'agroacers.team@gmail.com',
        to: Farmeremail,
        subject: `Deal for Crop from ${company}`,
        html: `
        <p>Dear ${Farmername}</p>
        <p>I am writing this email to indicate my intent in purchasing your crop, I came to know from an online website AgroAcers.</p>
        <p>${body}</p>
        <p>Please let me know a convinient time when we can meet and discuss further details regarding price and others. I would also wish to have a look at the crop quality before finalizing any deal.You can please feel free to call me on ${contact} or email on ${email} to fix up a meeting as per your convenience.</p> 
        <p>Looking forward to your positive response in this regards.</p>
        <div style="margin-bottom: 2px">Regards,</div>
        <div style="margin-bottom: 2px">${name}</div>
        <div>${company}</div>
        `
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
module.exports = sendmsgtofarmer