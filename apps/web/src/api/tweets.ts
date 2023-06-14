const URL = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
const GATEWAY_URL =
  process.env.NEXT_PUBLIC_GATEWAY_URL || "http://localhost:8080";

export const fetchTweets = async () => {
  const tokenResponse = await fetch(`${URL}/api/auth/token`);
  const tokenData = await tokenResponse.json();

  const response = await fetch(`${GATEWAY_URL}/tweet`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + tokenData,
    },
  });

  const tweets = await response.json();
  return tweets.collection;
};
