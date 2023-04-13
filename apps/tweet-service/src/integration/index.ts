// Description: Tweet Data Access Layer

import { PrismaClient } from "database";
const prisma = new PrismaClient();

export async function GetTweets() {
  const tweets = await prisma.tweet.findMany();
  return tweets;
}

export async function CreateTweet(data: any) {
  const tweet = await prisma.tweet
    .create({
      data: data,
    })
    .catch(() => {
      return null;
    });
  return tweet;
}
