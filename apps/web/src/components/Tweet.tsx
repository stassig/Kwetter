import { useState } from "react";
import { Paper, Text, Avatar, Badge, Button } from "@mantine/core";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

interface TweetProps {
  userProfilePic: string;
  datePosted: string;
  message: string;
  numLikes: number;
  username: string;
  onUnfollow: () => void;
  liked: boolean;
  onLike: () => void;
}

const Tweet = ({ tweet }: { tweet: TweetProps }) => {
  const [likes, setLikes] = useState(tweet.numLikes);
  const [liked, setLiked] = useState(tweet.liked);

  const handleLike = () => {
    tweet.onLike();
    if (!liked) {
      setLikes(likes + 1);
    } else {
      setLikes(likes - 1);
    }
    setLiked(!liked);
  };

  return (
    <Paper style={{ marginBottom: "10px", padding: "10px" }} shadow="xs">
      <div style={{ display: "flex", marginBottom: "10px" }}>
        <Avatar
          src={tweet.userProfilePic}
          size={60}
          radius="xl"
          style={{ marginRight: "10px" }}
        />
        <div style={{ flex: 1 }}>
          <Text weight={500} size="md">
            {tweet.username}
          </Text>
          <Text size="sm" color="dimmed">
            {tweet.datePosted}
          </Text>
          <Text>{tweet.message}</Text>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button variant="link" onClick={handleLike}>
              {liked ? <AiFillHeart color="red" /> : <AiOutlineHeart />}
            </Button>
            <Badge color="pink">{likes}</Badge>
          </div>
        </div>
        <Button color="blue" onClick={tweet.onUnfollow}>
          Unfollow
        </Button>
      </div>
    </Paper>
  );
};

export default Tweet;
