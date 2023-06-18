// Description: Tweet Data Access Layer
import { Tweet } from "../models/tweet";

export async function GetTweets() {
  const tweets = await Tweet.find();
  return tweets;
}

export async function GetTweetsByIds(tweetIds: string[]) {
  const tweets = await Tweet.find({
    _id: { $in: tweetIds },
  }).sort({ created_at: -1 });
  return tweets;
}

export async function CreateTweet(data: any) {
  const tweet = await Tweet.create(data).catch((error) => {
    return null;
  });
  return tweet;
}

export async function GetTweetsByUserId(userId: string) {
  const tweets = await Tweet.find({ user_id: userId }).sort({ created_at: -1 });
  return tweets;
}

export async function LikeTweet(user_id: string, tweet_id: string) {
  const tweet = await Tweet.findByIdAndUpdate(
    tweet_id,
    { $addToSet: { liked_by: user_id }, $inc: { likes_count: 1 } },
    { new: true }
  );
  return tweet;
}

export async function DislikeTweet(user_id: string, tweet_id: string) {
  const tweet = await Tweet.findByIdAndUpdate(
    tweet_id,
    { $pull: { liked_by: user_id }, $inc: { likes_count: -1 } },
    { new: true }
  );
  return tweet;
}
