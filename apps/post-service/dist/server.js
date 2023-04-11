"use strict";
// Description: Server Instance & Configuration
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.createServer = void 0;
var body_parser_1 = require("body-parser");
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
// Export the createServer function
var createServer = function () {
    // Create a new express app
    var app = (0, express_1["default"])();
    // Chain app configurations and middlewares
    app
        // Disable the 'x-powered-by' HTTP header
        .disable("x-powered-by")
        // Add the morgan middleware for logging HTTP requests in 'dev' format
        .use((0, morgan_1["default"])("dev"))
        // Add the urlencoded middleware for parsing URL-encoded request bodies
        .use((0, body_parser_1.urlencoded)({ extended: true }))
        // Add the json middleware for parsing JSON request bodies
        .use((0, body_parser_1.json)())
        // Add the CORS middleware to allow cross-origin requests
        .use((0, cors_1["default"])())
        // Define a GET route for health check purposes
        .get("/healthz", function (req, res) {
        return res.json({ ok: true });
    });
    // Return the configured express app
    return app;
};
exports.createServer = createServer;
