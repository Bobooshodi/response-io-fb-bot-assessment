const { processPostback } = require("../../services/postback");
const { processMessage } = require("../../services/messages");
const { logger } = require('../../services/logger');

exports.processWebhook = async (req, res) => {
  try {
    //checking for page subscription.
    if (req.body.object === "page") {
      /* Iterate over each entry, there can be multiple entries 
       if callbacks are batched. */
      req.body.entry.forEach(function (entry) {
        // Iterate over each messaging event
        entry.messaging.forEach(function (event) {
          logger.info(event);
          if (event.postback) {
            processPostback(event);
          } else if (event.message) {
            processMessage(event);
          }
        });
      });
      res.sendStatus(200);
    }
  } catch (e) {
    console.error(e);

    res.sendStatus(400);
  }
};
