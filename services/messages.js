const axios = require("axios").default;

const action = require("./graph-api/actions");
const sendMessage = require("./graph-api/sendMessages");
const sendTemplate = require("./graph-api/sendTemplate");

exports.processMessage = async (event) => {
  if (!event.message.is_echo) {
    const message = event.message;
    const senderID = event.sender.id;
    console.log("Received message from senderId: " + senderID);
    console.log("Message is: " + JSON.stringify(message));
    if (message.text) {
      // now we will take the text received and send it to an food tracking API.
      let text = message.text;
      let options = {
        method: "POST",
        url: "https://mefit-preprod.herokuapp.com/api/getnutritionvalue",
        headers: {
          "cache-control": "no-cache",
          "content-type": "application/json",
        },
        data: { userID: process.env.USERID, searchTerm: text },
      };
      axios(options)
        .then((response) => {
          action(senderID);
          // after the response is recieved we will send the details in a Generic template

          sendTemplate(senderID, body);
        })
        .catch((e) => {
            console.error(e);
          throw new Error(error);
        });
    }
  }
};
