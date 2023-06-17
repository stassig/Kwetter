// Description: Timeline Data Access Layer
import { Timeline } from "../models/timeline";

export async function GetTimeline(userId: string) {
  const timeline = await Timeline.findOne({ user_id: userId });
  return timeline;
}

export async function handleFollow(data: any) {
  try {
    const { userId, tweetIds } = data;

    // Find the user's timeline
    const userTimeline = await Timeline.findOne({ user_id: userId });

    // If the timeline does not exist, create a new one with the given tweet ids
    if (!userTimeline) {
      await Timeline.create({ user_id: userId, tweet_ids: tweetIds });
    } else {
      // Otherwise, add the new tweet ids to the existing timeline
      userTimeline.tweet_ids.push(...tweetIds);
      await userTimeline.save();
    }

    console.log("Follow event handled successfully");
  } catch (error) {
    console.error("Error while handling follow event:", error);
  }
}

export async function handleUnfollow(data: any) {
  try {
    const { userId, tweetIds } = data;

    // Find the user's timeline
    const userTimeline = await Timeline.findOne({ user_id: userId });

    if (userTimeline) {
      // Filter out the tweet ids that the user has unfollowed
      userTimeline.tweet_ids = userTimeline.tweet_ids.filter(
        (id) => !tweetIds.includes(id)
      );

      await userTimeline.save();

      console.log("Unfollow event handled successfully");
    }
  } catch (error) {
    console.error("Error while handling unfollow event:", error);
  }
}

export async function handleCreateTweet(data: any) {
  try {
    const { tweetId, followerIds } = data;
    console.log(followerIds);

    // For each follower, add the new tweet id to their timeline
    for (const userId of followerIds) {
      const userTimeline = await Timeline.findOne({ user_id: userId });

      if (userTimeline) {
        userTimeline.tweet_ids.push(tweetId);
        await userTimeline.save();
      } else {
        // If the user does not have a timeline yet, create one
        await Timeline.create({ user_id: userId, tweet_ids: [tweetId] });
      }
    }

    console.log("Create tweet event handled successfully");
  } catch (error) {
    console.error("Error while handling create tweet event:", error);
  }
}
