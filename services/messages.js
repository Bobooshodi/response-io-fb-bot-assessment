const axios = require("axios").default;

const action = require("./graph-api/actions");
const { sendMessage } = require("./graph-api/sendMessages");
const sendTemplate = require("./graph-api/sendTemplate");

exports.processMessage = async (event) => {
  try {
    if (!event.message.is_echo) {
      const message = event.message;
      const senderID = event.sender.id;
      console.log("Received message from senderId: " + senderID);
      console.log("Message is: " + JSON.stringify(message));
      await sendMessage(senderID, { text: 'Hi, Thanks for contacting us' });
    }
  } catch (e) {
    throw e;
  }
};
