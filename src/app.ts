import { App, LogLevel } from "@slack/bolt";
import "./utils/env";
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  port: Number(process.env.PORT || 3000),
});

app.message("hello", async ({ message, say }) => {
  if (message.subtype === undefined || message.subtype === "bot_message") {
    await say({
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `Hey there <@${message.user}>!`,
          },
          accessory: {
            type: "button",
            text: {
              type: "plain_text",
              text: "Click Me",
            },
            action_id: "button_click",
          },
        },
      ],
      text: `Hey there <@${message.user}>!`,
    });
  }
});

app.action("button_click", async ({ body, ack, say }) => {
  // Acknowledge the action
  await ack();
  await say(`<@${body.user.id}> clicked the button`);
});

(async () => {
  // Start your app
  await app.start(Number(process.env.PORT) || 3000);

  console.log("⚡️ Bolt app is running!");
})();
