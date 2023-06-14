import { Container } from "@mantine/core";
import { useState } from "react";
import Tweet from "./Tweet";
import CreateTweet from "./CreateTweet";
import { format } from "date-fns";

// Define the structure of a tweet
interface TweetData {
  userProfilePic: string;
  datePosted: string;
  message: string;
  numLikes: number;
  username: string;
  liked: boolean;
}

const initialTweets: TweetData[] = [
  {
    userProfilePic: "/profile1.jpg",
    datePosted: format(
      new Date("2023-06-12T12:00:00"),
      "MMMM dd, yyyy, h:mm a"
    ),
    message: "Hello world! This is my first tweet!",
    numLikes: 10,
    username: "User1",
    liked: false,
  },
  {
    userProfilePic: "/profile2.jpg",
    datePosted: format(
      new Date("2023-06-11T08:30:00"),
      "MMMM dd, yyyy, h:mm a"
    ),
    message: "Just having my morning coffee... ☕",
    numLikes: 20,
    username: "User2",
    liked: false,
  },
  {
    userProfilePic: "/profile3.jpg",
    datePosted: format(
      new Date("2023-06-10T17:45:00"),
      "MMMM dd, yyyy, h:mm a"
    ),
    message: "Can't wait for the weekend! 🎉",
    numLikes: 30,
    username: "User3",
    liked: false,
  },
];

const Timeline = () => {
  // Define the initial state for tweets
  const [tweets, setTweets] = useState<TweetData[]>(initialTweets);

  const handleUnfollow = (username: string) => {
    console.log(`Unfollowed ${username}`);
    // Handle the unfollow action here
  };

  const handleLike = async (tweetId: number) => {
    console.log("Liked!");
    // Handle the like action here, e.g., make an API call to your backend
    setTweets((prevTweets) =>
      prevTweets.map((tweet, index) => {
        if (index === tweetId) {
          return { ...tweet, liked: true, numLikes: tweet.numLikes + 1 };
        } else {
          return tweet;
        }
      })
    );
  };

  const handleCreate = (content: string) => {
    const newTweet = {
      userProfilePic: "/profile1.jpg",
      datePosted: format(new Date(), "MMMM dd, yyyy, h:mm a"), // Using current date and time
      message: content,
      numLikes: 0,
      username: "User1",
      liked: false,
    };
    setTweets([newTweet, ...tweets]);
  };

  return (
    <Container size="sm">
      <CreateTweet
        profileImage="/profile1.jpg"
        username="User1"
        onCreate={handleCreate}
      />
      {tweets.map((tweet, index) => (
        <Tweet
          key={index}
          tweet={{
            ...tweet,
            onUnfollow: () => handleUnfollow(tweet.username),
            onLike: () => handleLike(index),
          }}
        />
      ))}
    </Container>
  );
};

export default Timeline;
