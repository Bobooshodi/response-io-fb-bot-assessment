const axios = require("axios").default;

const action = require("./graph-api/actions");
const sendMessage = require("./graph-api/sendMessages");

exports.processPostback = async (event) => {
  try {
    const senderID = event.sender.id;
    const payload = event.postback.payload;
    if (payload === "WELCOME") {
      const response = await axios({
        url: process.env.GRAPH_API_ENDPOINT + senderID,
        qs: {
          access_token: process.env.PAGE_ACCESS_TOKEN,
          fields: "first_name",
        },
        method: "GET",
      });

      let greeting = "";
      const { body } = response;
      console.log(body);
      greeting = "Hello " + body.first_name + ". ";
      let message =
        greeting + "Welcome to Healthbot. Hope you are       doing good today";
      let message2 = "I am your nutrition tracker :-)";
      let message3 =
        "please type in what you ate like: I ate chicken birayani and 2 chapatis with dal.";
      action(senderID);
      sendMessage(senderID, { text: message }).then(() => {
        sendMessage(senderID, { text: message2 }).then(() => {
          sendMessage(senderID, { text: message3 }).then(() => {
            sendMessage(senderID, { text: "🎈" });
          });
        });
      });
    }
  } catch (e) {
    console.error("Error getting user name: " + error);
  }
};
