const axios = require("axios").default;

const action = require("./graph-api/actions");
const { sendMessage } = require("./graph-api/sendMessages");
const sendTemplate = require("./graph-api/sendTemplate");

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
      console.log("Received message from senderId: " + senderID);
      console.log("Message is: " + JSON.stringify(message));
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
      }
    }
  } catch (e) {
    throw e;
  }
};
