import TweetComponent from "./Tweet";
import CreateTweet from "./CreateTweet";

import toastr from "toastr";
import { Container } from "@mantine/core";
import { useState, useEffect } from "react";

import {
  createTweet,
  fetchTweets,
  likeTweet,
  dislikeTweet,
} from "../api/tweets";
import { getTimelineByUserId } from "../api/timeline";
import { TweetData } from "../types/tweet_data";
import { Timeline } from "../types/timeline";

const Timeline = ({
  userId,
  username,
  profile_image_url,
  followers,
}: {
  followers: Array<any>;
  userId: string;
  username: string;
  profile_image_url: string;
}) => {
  const [tweets, setTweets] = useState<TweetData[]>([]);
  const [timeline, setTimeline] = useState<Timeline>();

  useEffect(() => {
    const fetchTimeline = async () => {
      const fetchedTimeline = await getTimelineByUserId(userId);
      setTimeline(fetchedTimeline);
      const fetchedTweets = await fetchTweets(
        fetchedTimeline.tweet_ids,
        userId
      );
      setTweets(fetchedTweets);
    };

    fetchTimeline();
  }, [userId]);

  const handleCreate = async (content: string) => {
    const newTweet = {
      user_id: userId,
      username: username,
      profile_image_url: profile_image_url,
      content: content,
    };
    await createTweet(newTweet, followers);
    toastr.success("Tweet posted!");
  };
  const handleLike = async (tweetId: string, liked: boolean) => {
    if (liked) {
      await dislikeTweet(userId, tweetId);
    } else {
      await likeTweet(userId, tweetId);
    }

    setTweets((prevTweets) =>
      prevTweets.map((tweet) => {
        if (tweet._id === tweetId) {
          return {
            ...tweet,
            liked: !liked,
            likes_count: liked ? tweet.likes_count - 1 : tweet.likes_count + 1,
          };
        } else {
          return tweet;
        }
      })
    );
  };

  return (
    <Container size="sm">
      <CreateTweet
        profileImage={profile_image_url}
        username={username}
        onCreate={handleCreate}
      />
      {tweets.map((tweet, index) => (
        <TweetComponent
          key={index}
          tweet={{
            ...tweet,
            onLike: () => handleLike(tweet._id, tweet.liked),
            disableLike: false,
          }}
        />
      ))}
    </Container>
  );
};

export default Timeline;
