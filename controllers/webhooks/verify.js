exports.verifyWebhook = (req, res) => {
  if (req.query["hub.verify_token"] === process.env.VERIFY_TOKEN) {
    console.log("webhook verified");
    res.status(200).send(req.query["hub.challenge"]);
  } else {
    console.error("verification failed. Token mismatch.");
    res.sendStatus(403);
  }
}
