
# Response.io FB Bot Technical Assessment

This project is my implementation of response.io [Technical Assessment](https://respond.notion.site/Task-1-Facebook-Messenger-Bot-fe0a128b17af417db55a3f455ccdc641#3d173d2b1a1d4967a727d2a53c3ce2fe "Technical Assessment")




## Run Locally

Clone the project

```bash
  git clone https://github.com/Bobooshodi/response-io-fb-bot-assessment.git
```

Go to the project directory

```bash
  cd response-io-fb-bot-assessment
```

Install dependencies

```bash
  npm install
```

Copy .env file and modify accordingly

```bash
  cp .env.sample .env
```

Start the server

```bash
  npm start
```


## Tech Stack

**Server:** Node, Express
**DB:** [nedb](https://github.com/louischatriot/nedb "nedb")
**Tunnel:** [ngrok](https://ngrok.com/ "ngrok")
**Mail Server:** [mailtrap](https://mailtrap.io "mailtrap")
**Mail Client:** [nodemailer](https://nodemailer.com/about/ "nodemailer")






## Appendix

I couldn't get around SendGris'a email authentication, so i implemented the notification part with nodemailer and mailtrap, you don't have to tho, just specify any valid SMTP credentials, and you should be good to go

You will need:
1. A free ngrok account
1. A Facebook Developer Account with webhooks setup to listen to messaging and messaging_postbacks events see [here](https://developers.facebook.com/docs/messenger-platform/webhook "here") for more details
1. SMTP Server credentials
