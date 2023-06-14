import { Paper, Text, Avatar, Badge } from "@mantine/core";
import { AiOutlineHeart } from "react-icons/ai";

interface TweetProps {
  userProfilePic: string;
  datePosted: string;
  message: string;
  numLikes: number;
}

const Tweet = ({ tweet }: { tweet: TweetProps }) => {
  return (
    <Paper style={{ marginBottom: "10px", padding: "10px" }} shadow="xs">
      <div style={{ display: "flex", marginBottom: "10px" }}>
        <Avatar
          src={tweet.userProfilePic}
          size={60}
          radius="xl"
          style={{ marginRight: "10px" }}
        />
        <div>
          <Text size="sm" color="dimmed">
            {tweet.datePosted}
          </Text>
          <Text>{tweet.message}</Text>
          <div style={{ display: "flex", alignItems: "center" }}>
            <AiOutlineHeart style={{ marginRight: "5px" }} />
            <Badge color="pink">{tweet.numLikes}</Badge>
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default Tweet;
