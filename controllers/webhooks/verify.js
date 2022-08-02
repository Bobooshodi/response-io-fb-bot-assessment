const { logger } = require('../../services/logger');

exports.verifyWebhook = (req, res) => {
  if (req.query["hub.verify_token"] === process.env.VERIFY_TOKEN) {
    logger.info("webhook verified");
    res.status(200).send(req.query["hub.challenge"]);
  } else {
    console.error("verification failed. Token mismatch.");
    res.sendStatus(403);
  }
}
