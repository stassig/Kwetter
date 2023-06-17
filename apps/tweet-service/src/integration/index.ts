// Description: Tweet Data Access Layer
import { Tweet } from "../models/tweet";

export async function GetTweets() {
  const tweets = await Tweet.find();
  return tweets;
}

export async function GetTweetsByIds(tweetIds: string[]) {
  const tweets = await Tweet.find({
    _id: { $in: tweetIds },
  });
  return tweets;
}

export async function CreateTweet(data: any) {
  const tweet = await Tweet.create(data).catch((error) => {
    return null;
  });
  return tweet;
}

export async function GetTweetsByUserId(userId: string) {
  const tweets = await Tweet.find({ user_id: userId });
  // Tweet.findById(userId);
  return tweets;
}
