const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const path = require("path");
const fs = require("fs");

const { logger } = require("./logger");

// async..await is not allowed in global scope, must use a wrapper
exports.sendMail = async (recipient, data) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.MAIL_SERVER_SMTP_HOST,
    port: process.env.MAIL_SERVER_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_SERVER_USER,
      pass: process.env.MAIL_SERVER_USER_PASS,
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: "info@bobooshodi.com", // sender address
    to: recipient,
    subject:
      "Hello Admin - There's an order Request for Product ID: " + data.sku,
    text: "Hello Admin - There's an order Request for Product ID: " + data.sku,
    html: makeEmailTemplate(data),
  });

  logger.info(info);
};

const makeEmailTemplate = (options) => {
  const filePath = path.join(
    __dirname,
    "../assets/mail-templates/new-order.html"
  );
  const source = fs.readFileSync(filePath, "utf-8").toString();
  const template = handlebars.compile(source);
  return template(options);
};
