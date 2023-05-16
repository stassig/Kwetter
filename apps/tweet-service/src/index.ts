// Description: Declaration / Main File

import { createServer } from "./server";
import { tweetRouter } from "./routes";

const port = 3001;
const endPoint = process.env.NEXT_PUBLIC_TWEET_SERVICE_URL || "/tweet";
const server = createServer();

server.listen(port, () => {
  console.log(`api running on ${port}`);
});

server.use(endPoint, tweetRouter());
