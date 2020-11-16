const nodemailer =  require("nodemailer");
const hbs = require("nodemailer-express-handlebars");

class MailService {
  constructor(host, port, user, password) {
    const options = {
      viewEngine: {
        partialsDir: __dirname + "/views/partials",
        layoutsDir: __dirname + "/views/layouts",
        extname: ".hbs"
      },
      extName: ".hbs",
      viewPath: "views"
    };



    this._transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'malthe@toettrup.dk',
        pass: 'Gobious12'
      }
    });

    this._transporter.use("compile", hbs(options));
  }
  sendMail({to, subject, template, context, attachments}) {
    return this._transporter.sendMail({
        to,
        subject,
        template,
        context,
        attachments
    });
  }
}

module.exports = MailService;
