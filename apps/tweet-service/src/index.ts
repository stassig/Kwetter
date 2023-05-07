// Description: Declaration / Main File

import { createServer } from "./server";
import { tweetRouter } from "./routes";

const port = process.env.NEXT_PUBLIC_TWEET_SERVICE_URL || 3001;
const server = createServer();

server.listen(port, () => {
  console.log(`api running on ${port}`);
});

server.use("/", tweetRouter());
