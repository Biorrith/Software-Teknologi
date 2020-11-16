require("dotenv").config();
const MailService = require("./MailService");
const express = require("express");
const mailService = new MailService();
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.get('/', function(req, res){
  res.render('inbox');
});

app.get("/send", async (req, res) => {
  try {
    const order = {
      orderId: 948584,
      name: "Lukas",
      price: 50
    };

    const mailInfo = {
      to: "test943933@hotmail.com",require("dotenv").config();
const MailService = require("./MailService");
const express = require("express");
const mailService = new MailService();
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.get('/', function(req, res){
  res.render('inbox');
});

app.get("/send", async (req, res) => {
  try {
    const order = {
      orderId: 948584,
      name: "Lukas",
      price: 50
    };

    const mailOptions = {
      to: 'emil.hu@hotmail.com',
      subject: "Order Confirmation",
      template: "orderConfirmation",
      context: order,
       attachments: [
        {
          filename: "img.jpg",
          path: "./img.jpg"
        }
      ]
    };

    await mailService.sendMail(mailOptions);

    res.send("email sent");

  } catch (e) {
    res.status(500).send("Something broke!");
  }
});

app.listen(port, () => console.log(`app listening on port ${port}!`));

      subject: "Order Confirmation",
      template: "orderConfirmation",
      context: order,
       attachments: [
        {
          filename: "img.jpg",
          path: "./img.jpg"
        }
      ]
    };

    await mailService.sendMail(mailInfo);

    res.send("email sent");

  } catch (e) {
    res.status(500).send("Something broke!");
  }
});

app.listen(port, () => console.log(`app listening on port ${port}!`));
