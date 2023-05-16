// Description: Tweet Data Access Layer
import { Tweet } from "../models/tweet";

export async function GetTweets() {
  const tweets = await Tweet.find();
  return tweets;
}

export async function CreateTweet(data: any) {
  const tweet = await Tweet.create(data).catch((error) => {
    return null;
  });
  return tweet;
}
