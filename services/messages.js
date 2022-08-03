const axios = require("axios").default;

const { sendMessage } = require("./graph-api/sendMessages");
const { logger } = require('./logger');
const { findOneWithProjection } = require('./database');

exports.processMessage = async (event) => {
  try {
    const greetingResponses = [
      'Hi, How are You?',
      "Hi, I hope you're having a great day?",
      "Hi, I hope you're doing well?",
      'Hi, how is your day going?'
    ]
    if (!event.message.is_echo) {
      const message = event.message;
      const senderID = event.sender.id;
      logger.info("Received message from senderId: " + senderID);
      logger.info("Message is: " + JSON.stringify(message));
      const greetingKeywords = ['hi', 'hello', 'hey', 'good'];
      let isGreeting = false;

      for (let i = 0; i < greetingKeywords.length; i++) {
        if (message.text.toLowerCase().startsWith(greetingKeywords[i])) {
          isGreeting = true;
          break;
        }
      }

      if (isGreeting) {
        await sendMessage(senderID, { text: greetingResponses[Math.floor(Math.random()*greetingResponses.length)] });
      } else {
        const result = await processEnquiry(message.text);
        await sendMessage(senderID, { text: result });
      }
    }
  } catch (e) {
    throw e;
  }
};

const processEnquiry = async (enquiry) => {
  const enquiryParts = enquiry.split(' ');
  const enquiryType = enquiryParts[0];
  const productId = enquiryParts[1];

  let projection = {};
  let path = '';

  if(enquiryType === '/desc') {
    path = 'description';
  } else if (enquiryType === '/price') {
    path = 'price'
  } else if (enquiryType === '/shipping') {
    path = 'shipping'
  }

  projection[path] = 1;

  const productDetail = await findOneWithProjection({ sku: parseInt(productId) }, projection);

  return productDetail[path];
}
