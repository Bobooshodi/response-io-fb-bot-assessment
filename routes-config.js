const express = require("express");

const { playground } = require('./controllers/playground');
const { processWebhook } = require('./controllers/webhooks/process');
const { verifyWebhook } = require('./controllers/webhooks/verify');

const router = express.Router();

router.get("/webhook", verifyWebhook);

router.post("/webhook", processWebhook);

router.get("/playground", playground);

module.exports = router;
