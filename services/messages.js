const axios = require("axios").default;

const { sendMessage } = require("./graph-api/sendMessages");
const { logger } = require("./logger");
const { findOneWithProjection, findOne } = require("./database");
const { sendMail } = require("./email");

exports.processMessage = async (event) => {
  try {
    const greetingResponses = [
      "Hi, How are You?",
      "Hi, I hope you're having a great day?",
      "Hi, I hope you're doing well?",
      "Hi, how is your day going?",
    ];
    if (!event.message.is_echo) {
      const message = event.message;
      const senderID = event.sender.id;
      logger.info("Received message from senderId: " + senderID);
      logger.info("Message is: " + JSON.stringify(message));
      const greetingKeywords = ["hi", "hello", "hey", "good"];
      let isGreeting = false;

      for (let i = 0; i < greetingKeywords.length; i++) {
        if (message.text.toLowerCase().startsWith(greetingKeywords[i])) {
          isGreeting = true;
          break;
        }
      }

      if (isGreeting) {
        await sendMessage(senderID, {
          text: greetingResponses[
            Math.floor(Math.random() * greetingResponses.length)
          ],
        });
      } else {
        const result = await processMessage(message.text);
        await sendMessage(senderID, { text: result });
      }
    }
  } catch (e) {
    throw e;
  }
};

const processMessage = async (enquiry) => {
  const enquiryParts = enquiry.split(" ");
  const enquiryType = enquiryParts[0];
  const productId = enquiryParts[1];

  let projection = {};
  let path;
  let result = "";

  if (enquiryType === "/desc") {
    path = "description";
  } else if (enquiryType === "/price") {
    path = "price";
  } else if (enquiryType === "/shipping") {
    path = "shipping";
  } else if (enquiryType === "/buy") {
    path = undefined;
  }

  if (!!path) {
    projection[path] = 1;

    const productDetail = await findOneWithProjection(
      { sku: parseInt(productId) },
      projection
    );

    result = productDetail[path];
  } else {
    const product = await findOne({ sku: parseInt(productId) });
    console.log(product);

    await sendMail(process.env.ADMIN_EMAIL, product);

    result =
      "Thank you for Your Order, It will be processed ASAP, you should receive an email shortly";
  }

  return result;
};
