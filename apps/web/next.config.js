const path = require("path");
require("dotenv").config({ path: "../../.env.local" });

module.exports = {
  reactStrictMode: false,
  output: "standalone",
  experimental: {
    outputFileTracingRoot: path.join(__dirname, "../../"),
  },
  images: {
    domains: ["fastly.picsum.photos", "lh3.googleusercontent.com"],
  },
};
