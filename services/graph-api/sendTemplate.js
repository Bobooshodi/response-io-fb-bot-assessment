const axios = require("axios").default;

exports.sendGenericTemplate = async (recipientId, respBody) => {
  try {
    console.log(respBody);
    const nutritionalValue = [];
    for (let i = 0; i < respBody.length; i++) {
      let obj = {
        title: respBody[i].food_name,
        image_url: respBody[i].thumbnail,
        subtitle:
          "Total Calories: " +
          respBody[i].total_calories +
          "\n" +
          "protein: " +
          respBody[i].protein +
          "\n" +
          "Carbohydrates: " +
          respBody[i].total_carbohydrate,
      };
      nutritionalValue.push(obj);
    }
    let messageData = {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: nutritionalValue,
        },
      },
    };
    await axios({
      url: "https://graph.facebook.com/v2.6/me/messages",
      params: { access_token: process.env.PAGE_ACCESS_TOKEN },
      method: "POST",
      data: {
        recipient: { id: recipientId },
        message: messageData,
      },
    });
  } catch (e) {
    console.log("Error sending message: " + response.error)
    // throw e;
  }
};
