import { Container } from "@mantine/core";
import Tweet from "./Tweet";

const Timeline = () => {
  const tweets = [
    {
      userProfilePic: "/profile1.jpg",
      datePosted: "June 14, 2023",
      message: "This is a tweet!",
      numLikes: 27,
      username: "User1",
      liked: false,
    },
    {
      userProfilePic: "/profile2.jpg",
      datePosted: "June 13, 2023",
      message: "Another tweet here.",
      numLikes: 14,
      username: "User2",
      liked: false,
    },
    // more tweets...
  ];

  const handleUnfollow = (username: String) => {
    console.log(`Unfollowed ${username}`);
    // Handle the unfollow action here
  };

  const handleLike = async () => {
    console.log("Liked!");
    // Handle the like action here, e.g., make an API call to your backend
    return Promise.resolve();
  };

  return (
    <Container>
      {tweets.map((tweet, index) => (
        <Tweet
          key={index}
          tweet={{
            ...tweet,
            onUnfollow: () => handleUnfollow(tweet.username),
            onLike: handleLike,
          }}
        />
      ))}
    </Container>
  );
};

export default Timeline;
