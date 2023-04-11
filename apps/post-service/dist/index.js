"use strict";
// Description: Declaration / Main File
exports.__esModule = true;
var server_1 = require("./server");
var routes_1 = require("./routes");
var port = process.env.NEXT_PUBLIC_POST_SERVICE_URL || 3002;
var server = (0, server_1.createServer)();
server.listen(port, function () {
    console.log("api running on ".concat(port));
});
server.use("/tweet", (0, routes_1.tweetRouter)());
