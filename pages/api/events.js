import { pusher } from "../../utils/pusher";

export default async function handler(req, res) {
  const body = req.body;

  await pusher.trigger("dbpp-board", "airtable-push", {
    message: body,
  });

  res.status(200).json({ message: body });
}
