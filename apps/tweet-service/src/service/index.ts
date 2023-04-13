// Description: Tweet Service Layer

import * as prisma from "../integration/index";

export async function GetTweets() {
  const tweets = await prisma.GetTweets();

  return tweets;
}

export async function CreateTweet(data: any) {
  const tweet = await prisma.CreateTweet(data);

  return tweet;
}
