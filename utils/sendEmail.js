var nodemailer = require('nodemailer');

const sendEmail = async(UseremailId, username) => {
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
        to: UseremailId,
        subject: 'Successful Registration in AgroAcers',
        html: `<p>Hello ${username},</p>
        <p> Welcome to AgroAcers!</p>
        <p>
            AgroAcers is a non-profit online working platform for the welfare of farmers. <br> The Platform provides services like:
        </p>
        <ul style="padding-left: 20px;">
    
            <li>Buy and Sell goods and crops.</li>
            <li>Check Mandi Price all over India.</li>
            <li>Government policies for farmers welfare.</li>
            <li>Information about top Agriculture Institutes and carrier in Farming.</li>
            <li>A better way of farming to get a good quality and quantity of crop</li>
        </ul>
        <div style="margin-left: 20px;">
            <a href="#"><button style="padding: 8px; background-color: #33A0FF;border-radius: 4px; border: 0.05rem solid #f0f0f0; outline:none; cursor: pointer;">Explore Now</button></a>
        </div>
    
        <p>
            Regards,<br> Team AgroAcers
        </p>`
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
module.exports = sendEmail