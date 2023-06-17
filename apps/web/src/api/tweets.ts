import { Tweet } from "../types/tweet";
import { TweetData } from "../types/tweet_data";

const URL = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
const GATEWAY_URL =
  process.env.NEXT_PUBLIC_GATEWAY_URL || "http://localhost:8080";

export const fetchTweets = async (): Promise<TweetData[]> => {
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

export const createTweet = async (tweet: Tweet): Promise<TweetData> => {
  const tokenResponse = await fetch(`${URL}/api/auth/token`);
  const tokenData = await tokenResponse.json();

  const response = await fetch(`${GATEWAY_URL}/tweet`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + tokenData,
    },
    body: JSON.stringify(tweet),
  });
  const newTweet = await response.json();
  return newTweet;
};
