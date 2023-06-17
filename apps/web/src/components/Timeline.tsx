import { Container } from "@mantine/core";
import { useState, useEffect } from "react";
import TweetComponent from "./Tweet";
import CreateTweet from "./CreateTweet";
import { createTweet } from "../api/tweets";
import { auth0_user } from "../types/auth0_user/auth0_user";
import { fetchTweets } from "../api/tweets";
import { TweetData } from "../types/tweet_data";

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

  useEffect(() => {
    const loadTweets = async () => {
      const fetchedTweets = await fetchTweets();
      setTweets(fetchedTweets);
    };

    loadTweets();
  }, []);

  const handleCreate = async (content: string) => {
    const newTweet = {
      user_id: userId,
      username: username,
      profile_image_url: profile_image_url,
      content: content,
    };
    const createdTweet = await createTweet(newTweet, followers);
    setTweets((prevTweets) => [createdTweet, ...prevTweets]);
  };

  const handleLike = async (tweetId: number) => {
    console.log("Liked!");
    // Handle the like action here

    setTweets((prevTweets) =>
      prevTweets.map((tweet, index) => {
        if (index === tweetId && tweet.likes_count) {
          return { ...tweet, liked: true, numLikes: tweet.likes_count + 1 };
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
            onLike: () => handleLike(index),
            liked: false,
          }}
        />
      ))}
    </Container>
  );
};

export default Timeline;
