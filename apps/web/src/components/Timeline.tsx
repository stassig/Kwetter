import { Container } from "@mantine/core";
import Tweet from "./Tweet";

const Timeline = () => {
  const tweets = [
    {
      userProfilePic: "/profile1.jpg",
      datePosted: "June 14, 2023",
      message: "This is a tweet!",
      numLikes: 27,
    },
    {
      userProfilePic: "/profile2.jpg",
      datePosted: "June 13, 2023",
      message: "Another tweet here.",
      numLikes: 14,
    },
    // more tweets...
  ];

  return (
    <Container>
      {tweets.map((tweet, index) => (
        <Tweet key={index} tweet={tweet} />
      ))}
    </Container>
  );
};

export default Timeline;
