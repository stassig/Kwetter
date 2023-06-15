import { use, useEffect, useState } from "react";
import { Paper, Text, Avatar, Button, Col, Grid } from "@mantine/core";
import { AiOutlineUser, AiOutlineUserAdd } from "react-icons/ai";
import Tweet from "./Tweet";
import { auth0_user } from "../types/auth0_user/auth0_user";
import { set } from "date-fns";

interface UserData {
  user_id: string;
  username: string;
  profile_image_url: string;
  following: number;
  followers: number;
  tweets: number;
  tweetData: Array<any>;
  followingData: Array<any>;
}

const Profile = ({ user }: { user: UserData }) => {
  const [isFollowing, setFollowing] = useState<boolean>(false);
  const [user_props, setUserProps] = useState<auth0_user>({
    sub: user.user_id,
    nickname: user.username,
    picture: user.profile_image_url,
  });

  const handleFollow = () => {
    setFollowing(!isFollowing);
    // API call to follow/unfollow the user
  };

  const tweetList = user.tweetData.map((tweet, index) => (
    <Col span={12} key={index}>
      <Tweet tweet={{ ...tweet, showUnfollow: false }} user={user_props} />
    </Col>
  ));

  const usersList = user.followingData.map((user, index) => (
    <Col span={12} style={{ marginBottom: 10 }} key={index}>
      <Paper
        style={{ padding: "10px", display: "flex", alignItems: "center" }}
        shadow="xs"
      >
        <Avatar
          src={user.userProfilePic}
          size={40}
          style={{ marginRight: 10 }}
        />
        <Text>{user.username}</Text>
        <Button
          rightIcon={isFollowing ? <AiOutlineUser /> : <AiOutlineUserAdd />}
          color={isFollowing ? "blue" : "gray"}
          onClick={handleFollow}
          style={{ marginLeft: "auto" }}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
      </Paper>
    </Col>
  ));

  return (
    <Grid gutter="md">
      <Col span={12} md={8}>
        <Paper
          style={{
            padding: "10px",
            marginBottom: "15px",
            display: "flex",
            background: "#f5f5f5", // Set light grey background color
          }}
        >
          <Avatar
            src={user.profile_image_url}
            size={120}
            style={{ flexShrink: 0, marginRight: 20 }}
          />
          <div>
            <Text size="lg" weight={700}>
              {user.username}
            </Text>
            <Text size="sm">Following: {user.following}</Text>
            <Text size="sm">Followers: {user.followers}</Text>
            <Text size="sm">Tweets: {user.tweets}</Text>
          </div>
        </Paper>
        <Paper style={{ padding: "10px" }}>
          <Text size="lg" weight={700} style={{ marginBottom: 10 }}>
            Kwetter History
          </Text>
          {tweetList}
        </Paper>
      </Col>
      <Col span={12} md={4}>
        <Paper style={{ padding: "10px" }}>
          <Text size="lg" weight={700} style={{ marginBottom: 10 }}>
            Users
          </Text>
          {usersList}
        </Paper>
      </Col>
    </Grid>
  );
};

export default Profile;
