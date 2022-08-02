const xios = require("axios").default;

exports.action = async (recipientId) => {
  try {
    return axios({
      url: `${process.env.GRAPH_API_ENDPOINT}/me/messages`,
      qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
      method: "POST",
      json: {
        recipient: { id: recipientId },
        sender_action: "typing_on",
      },
    });
  } catch (e) {
    throw e;
  }
};
