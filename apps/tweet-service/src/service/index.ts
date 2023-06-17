// Description: Tweet Service Layer

import * as prisma from "../integration/index";
import { sendData } from "../event-bus";

export async function GetTweets() {
  const tweets = await prisma.GetTweets();

  return tweets;
}

export async function CreateTweet(data: any) {
  const tweet = await prisma.CreateTweet(data.tweet);
  if (tweet) {
    // Extract follower IDs from the followers array
    const followerIds = data.followers.map((follower: any) => follower);

    // Create the message to send to the timeline service
    const message = {
      type: "CreateTweet",
      data: {
        tweetId: tweet._id,
        followerIds: followerIds,
      },
    };

    // Send the message
    await sendData(message);
  }

  return tweet;
}

// Add this to your Tweet Service Layer
export async function UpdateFollowing(follow_user_id: string, user_id: string) {
  const tweets = await prisma.GetTweetsByUserId(follow_user_id);
  const tweetIds = tweets.map((tweet) => tweet._id.toString());

  const message = {
    type: "Follow",
    data: {
      tweetIds: tweetIds,
      userId: user_id,
    },
  };

  // Send the message
  await sendData(message);

  return tweets;
}

export async function UpdateUnfollow(
  unfollow_user_id: string,
  user_id: string
) {
  const tweets = await prisma.GetTweetsByUserId(unfollow_user_id);
  const tweetIds = tweets.map((tweet) => tweet._id.toString());

  const message = {
    type: "Unfollow",
    data: {
      tweetIds: tweetIds,
      userId: user_id,
    },
  };

  // Send the message
  await sendData(message);

  return tweets;
}
