// Description: Declaration / Main File

import { createServer } from "./server";
import { userRouter } from "./routes";
import { URL } from "url";

const server = createServer();

const url = new URL(
  process.env.NEXT_PUBLIC_USER_SERVICE_URL || "http://localhost:3002/user"
);
const port = url.port;

const endPoint = process.env.NODE_ENV === "production" ? "/" : "/user";

console.log(endPoint);

server.listen(port, () => {
  console.log(`api running on ${port}`);
});

server.use(endPoint, userRouter());
