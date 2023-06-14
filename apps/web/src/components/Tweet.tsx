import { useState } from "react";
import { Paper, Text, Avatar, Badge, Button } from "@mantine/core";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineUser,
  AiOutlineUserAdd,
} from "react-icons/ai";

interface TweetProps {
  userProfilePic: string;
  datePosted: string;
  message: string;
  numLikes: number;
  username: string;
  onUnfollow: () => void;
  liked: boolean;
  onLike: () => void;
  showUnfollow: boolean;
}

const Tweet = ({ tweet }: { tweet: TweetProps }) => {
  const [likes, setLikes] = useState(tweet.numLikes);
  const [liked, setLiked] = useState(tweet.liked);
  const [isFollowing, setFollowing] = useState<boolean>(false);

  const handleFollow = () => {
    setFollowing(!isFollowing);
    // API call to follow/unfollow the user
  };

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
          <div
            style={{
              overflowWrap: "break-word",
              wordWrap: "break-word",
              wordBreak: "break-word",
            }}
          >
            <Text>{tweet.message}</Text>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <Button variant="link" onClick={handleLike}>
              {liked ? <AiFillHeart color="red" /> : <AiOutlineHeart />}
            </Button>
            <Badge color="pink">{likes}</Badge>
          </div>
        </div>
        {tweet.showUnfollow && (
          <Button
            rightIcon={isFollowing ? <AiOutlineUser /> : <AiOutlineUserAdd />}
            color={isFollowing ? "blue" : "gray"}
            onClick={handleFollow}
            style={{ marginLeft: "auto" }}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
        )}
      </div>
    </Paper>
  );
};

export default Tweet;
