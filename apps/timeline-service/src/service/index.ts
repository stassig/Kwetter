// Description: Timeline Service Layer

import * as prisma from "../integration/index";

export async function GetTimeline(userId: string) {
  const timeline = await prisma.GetTimeline(userId);
  return timeline;
}

export async function handleFollow(data: any) {
  // Add the tweets to the user's timeline
  console.log("Handling follow event");
  await prisma.handleFollow(data);
}

export async function handleUnfollow(data: any) {
  // Remove the tweets from the user's timeline
  console.log("Handling unfollow event");
  await prisma.handleUnfollow(data);
}

export async function handleCreateTweet(data: any) {
  // Add the tweet to each follower's timeline
  console.log("Handling create tweet event");
  await prisma.handleCreateTweet(data);
}
