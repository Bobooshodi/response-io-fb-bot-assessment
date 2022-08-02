const express = require("express");

const { processWebhook } = require('./controllers/webhooks/process');
const { verifyWebhook } = require('./controllers/webhooks/verify');

const router = express.Router();

router.get("/webhook", verifyWebhook);

router.post("/webhook", processWebhook);

module.exports = router;
