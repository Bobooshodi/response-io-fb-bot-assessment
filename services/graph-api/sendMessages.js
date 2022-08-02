const axios = require("axios").default;
exports.sendMessage = async (recipientId, message) => {
  console.log(recipientId, message);
  try {
    const res = await axios({
      url: `${process.env.GRAPH_API_ENDPOINT}/me/messages`,
      params: { access_token: process.env.PAGE_ACCESS_TOKEN },
      method: "post",
      data: {
        recipient: { id: recipientId },
        message: message,
      },
    });

    return res.data;
  } catch (e) {
    console.error(e);
  }
};
