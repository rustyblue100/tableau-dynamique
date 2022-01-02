const Pusher = require("pusher");

export const pusher = new Pusher({
  appId: process.env.pusherId,
  key: process.env.pusherKey,
  secret: process.env.pusherSecret,
  cluster: "us2",
  useTLS: true,
});
