import { Container } from "@mantine/core";
import { useState, useEffect } from "react";
import TweetComponent from "./Tweet";
import CreateTweet from "./CreateTweet";
import { createTweet } from "../api/tweets";
import { auth0_user } from "../types/auth0_user/auth0_user";
import { fetchTweets } from "../api/tweets";
import { TweetData } from "../types/tweet_data";

const Timeline = ({
  user,
  followers,
}: {
  user: auth0_user;
  followers: Array<any>;
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
      user_id: user.sub.split("|")[1],
      username: user.nickname,
      profile_image_url: user.picture,
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
        profileImage={user.picture}
        username={user.nickname}
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
          user={user}
        />
      ))}
    </Container>
  );
};

export default Timeline;
