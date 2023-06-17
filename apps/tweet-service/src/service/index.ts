// Description: Tweet Service Layer

import * as prisma from "../integration/index";
import { sendData } from "../event-bus";

export async function GetTweets() {
  const tweets = await prisma.GetTweets();

  return tweets;
}

export async function CreateTweet(data: any) {
  const tweet = await prisma.CreateTweet(data);
  if (tweet) {
    // Create the message to send to the timeline service
    const message = {
      type: "CreateTweet",
      data: {
        userId: tweet.user_id,
        tweetId: tweet._id,
      },
    };

    // Send the message
    await sendData(message);
  }

  return tweet;
}
