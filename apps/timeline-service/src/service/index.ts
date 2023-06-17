// Description: Timeline Service Layer

import * as prisma from "../integration/index";

export async function GetTimelines() {
  const timelines = await prisma.GetTimelines();

  return timelines;
}

export async function CreateTimeline(data: any) {
  const timeline = await prisma.CreateTimeline(data);

  return timeline;
}

export async function handleFollow(data: any) {
  // Add the tweets to the user's timeline
  console.log("Handling follow event");
  console.log(data);
}

export async function handleUnfollow(data: any) {
  // Remove the tweets from the user's timeline
  console.log("Handling unfollow event");
  console.log(data);
}

export async function handleCreateTweet(data: any) {
  // Add the tweet to each follower's timeline
  console.log("Handling create tweet event");
  console.log(data);
}
