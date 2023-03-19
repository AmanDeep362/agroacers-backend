var nodemailer = require('nodemailer');

const sendbidmsg = async(nameOfOrg, emailoforg, contactoforg, intrestoforg, cropname, farmername, bidprice, farmeremail) => {
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
        to: farmeremail,
        subject: 'Hurray! New price for your crop || AgroAcers Support',
        html: `
        <p>Hello ${farmername}</p>
        <p>Regarding the crop of, ${cropname} which you post on AgroAcers.
        We have a good news for you that one organization / company have show 
        interest on your crop and they are ready to deal with you.</p>
              
        <h4>Details of orgainization/company :</h4>
                
        <table style="border:1px solid #c0c0c0; border-spacing: 0px;">
                
            <tr>
                <th style="border:1px solid #c0c0c0; padding: 8px 12px">Name of Orgainization</th>
                <td style="border:1px solid #c0c0c0; padding: 8px 12px">${nameOfOrg}</td>      
            </tr>
                    
            <tr>
                <th style="border:1px solid #c0c0c0; padding: 8px 12px">Email of Organization</th>
                <td style="border:1px solid #c0c0c0; padding: 8px 12px">${emailoforg}</td>   
            </tr>
                    
            <tr>
                <th style="border:1px solid #c0c0c0; padding: 8px 12px">Contact Details</th>
                <td style="border:1px solid #c0c0c0; padding: 8px 12px">${contactoforg}</td>
            </tr>
                    
            <tr>
                <th style="border:1px solid #c0c0c0; padding: 8px 12px">Bid Amount</th>
                <td style="border:1px solid #c0c0c0; padding: 8px 12px">${bidprice}</td>
            </tr>
        </table>
                
        <h3>Why company want to buy your Crops? </h3>   
        <p>${intrestoforg}</p>
                
        <br/>

        <div style="text-align: center; margin: 40px 10px 15px">
              <p style="margin: 1px">You can contact directly with organization/company and set your deal if you face any problem so you </p>
              <p style="margin: 1px">can feel free to contact with us at Email: agroacers.team@gmail.com </p>
        </div>
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
module.exports = sendbidmsg