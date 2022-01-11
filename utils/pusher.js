const Pusher = require("pusher");

export const pusher = new Pusher({
  appId: process.env.NEXT_PUBLIC_PUSHERID,
  key: process.env.NEXT_PUBLIC_PUSHERKEY,
  secret: process.env.NEXT_PUBLIC_PUSHERSECRET,
  cluster: "us2",
  useTLS: true,
});
