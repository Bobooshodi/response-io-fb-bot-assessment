const axios = require("axios").default;
exports.sendMessage = async (recipientId, message) => {
  try {
    return axios({
      url: `${process.env.GRAPH_API_ENDPOINT}/me/messages`,
      qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
      method: "POST",
      data: {
        recipient: { id: recipientId },
        message: message,
      },
    });
  } catch (e) {
    throw e;
  }
};
