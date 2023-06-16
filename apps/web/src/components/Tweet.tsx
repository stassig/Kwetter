import { useState } from "react";
import { Paper, Text, Avatar, Badge, Button } from "@mantine/core";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { format } from "date-fns";
import { auth0_user } from "../types/auth0_user/auth0_user";
import toastr from "toastr";

interface TweetProps {
  profile_image_url: string;
  created_at: string;
  content: string;
  likes_count: number;
  username: string;
  user_id: string;
  liked: boolean;
  onLike?: () => void;
}

const TweetComponent = ({
  tweet,
  user,
}: {
  tweet: TweetProps;
  user: auth0_user;
}) => {
  const [likes, setLikes] = useState(tweet.likes_count);
  const [liked, setLiked] = useState(tweet.liked);

  const handleLike = () => {
    if (tweet.onLike) tweet.onLike();
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
          src={tweet.profile_image_url}
          size={60}
          radius="xl"
          style={{ marginRight: "10px" }}
        />
        <div style={{ flex: 1 }}>
          <Text weight={500} size="md">
            {tweet.username}
          </Text>
          <Text size="sm" color="dimmed">
            {format(new Date(tweet.created_at), "MMMM dd, yyyy, h:mm a")}
          </Text>
          <div
            style={{
              overflowWrap: "break-word",
              wordWrap: "break-word",
              wordBreak: "break-word",
            }}
          >
            <Text>{tweet.content}</Text>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <Button variant="link" onClick={handleLike}>
              {liked ? <AiFillHeart color="red" /> : <AiOutlineHeart />}
            </Button>
            <Badge color="pink">{likes}</Badge>
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default TweetComponent;
