var nodemailer = require('nodemailer');

const Subscribermail = async(UseremailId, username, orderid, transid, amountpay) => {

    console.log(UseremailId)
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
        subject: 'Your Subscription with AgroAcers is Successsfull || AgroAcers Support',
        html: `<div style="display: flex; justify-content: flex-start; align-items: flex-end; flex-wrap: wrap;
        background-image: url(https://www.pngkey.com/png/detail/138-1383389_png-lines-image-arts-library-green-abstract-lines.png);
        border-radius: 4px; background-repeat: no-repeat;
        background-size: 100% auto; border: 0.5px solid #c0c0c0">
    
            <img src="https://cdn11.bigcommerce.com/s-4yo3xyp5/product_images/uploaded_images/adding-an-order-summary-to-the-order-confirmation-page.png" alt="Order Confirm" style="width: 40%;">
        </div>
        <div style="text-align: center; margin-bottom: 12px;">
            <p style="margin-bottom: 2px; color: #c0c0c0; font-size: 20px;">Hi <span style="color: #6fe211;">${username}</span>,</p>
            <h2 style="margin: 6px;">Thank you for Subscribe AgroAcers!</h2>
            <a href="#"><button style="padding: 6px 10px; background-color: #6fe211; color: #fff; border-radius: 4px; border: none; outline: none; font-size: 16px; cursor: pointer; font-weight: 500; margin: 10px">Go to Sell Purchase</button></a>
        </div>
    
        <div style="text-align: center; position: relative;">
            <div style=" border-bottom: 2px solid #c0c0c0; position: absolute; width: 100%; top: 1px;"></div>
        </div>
    
        <div style="margin: 35px 10px 15px">
            <div style="text-align: center;">
                <h2 style="margin: 5px">Your are Subscriber of AgroAcers Now you can bid your price and communicate with a large community of farmers</h2>
            </div>
        </div>
    
        <div style="margin: 25px">
            <div style="font-size: 15px;">
                <p style="margin: 2px"><b>Order ID : <span style="color: #c0c0c0;">${orderid}</span></b></p>
                <p style="margin: 2px"><b>Transaction ID : <span style="color: #c0c0c0;">${transid}</span></b></p>
                <p style="margin: 2px"><b>Amount Pay : <span style="color: #c0c0c0;">&#8377; ${amountpay} (inclusive of 18% GST)</span></b></p>
                <br>
                <h4 style="margin: 1px">Regards,</h4>
                <h4 style="margin: 1px">Team AgroAcers</h4>
            </div>
        </div>
        <div style="text-align: center; position: relative;">
            <div style=" border-bottom: 2px solid #c0c0c0; position: absolute; width: 100%; top: 1px;"></div>
        </div>
    
        <div style="text-align: center; margin: 40px 10px 15px">
            <p style="margin: 1px">If you need help with anything please don't hesitate to drop us on</p>
            <p style="margin: 1px">Email: agroacers.team@gmail.com </p>
        </div>`
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
module.exports = Subscribermail;