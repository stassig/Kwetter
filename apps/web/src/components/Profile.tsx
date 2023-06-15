import { use, useEffect, useState } from "react";
import { Paper, Text, Avatar, Button, Col, Grid } from "@mantine/core";
import { AiOutlineUser, AiOutlineUserAdd } from "react-icons/ai";
import TweetComponent from "./Tweet";
import { auth0_user } from "../types/auth0_user/auth0_user";
import { User } from "../types/user";
import {
  getUserById,
  fetchUsers,
  followUser,
  unfollowUser,
} from "../api/users";
import { fetchTweets } from "../api/tweets";
import { TweetData } from "../types/tweet_data";

interface UserData {
  user_id: string;
  username: string;
  profile_image_url: string;
  following: Array<any>;
  followers: Array<any>;
}

const Profile = ({ user }: { user: UserData }) => {
  const [followingStatus, setFollowingStatus] = useState<{
    [key: string]: boolean;
  }>({});
  const [tweets, setTweets] = useState<TweetData[]>([]);
  const [followingCount, setFollowingCount] = useState(user.following.length);
  const [users, setUsers] = useState<User[]>([]);
  const [user_props, setUserProps] = useState<auth0_user>({
    sub: user.user_id,
    nickname: user.username,
    picture: user.profile_image_url,
  });

  const handleFollow = async (userId: string) => {
    const isCurrentlyFollowing = followingStatus[userId];
    if (isCurrentlyFollowing) {
      await unfollowUser(user.user_id, userId);
      setFollowingCount(followingCount - 1);
    } else {
      await followUser(user.user_id, userId);
      setFollowingCount(followingCount + 1);
    }
    setFollowingStatus({ ...followingStatus, [userId]: !isCurrentlyFollowing });
  };

  useEffect(() => {
    const getTweets = async () => {
      const tweets = await fetchTweets();
      // console.log(tweets);
      setTweets(tweets);
    };
    getTweets();
  }, []);

  useEffect(() => {
    const fetchUsersData = async () => {
      let fetchedUsers = await fetchUsers();
      const newFollowingStatus: { [key: string]: boolean } = {};

      fetchedUsers = fetchedUsers.filter(
        (fetchedUser) => fetchedUser.user_id !== user.user_id
      );

      fetchedUsers.forEach((fetchedUser) => {
        newFollowingStatus[fetchedUser.user_id] = user.following.includes(
          fetchedUser._id
        );
      });

      setUsers(fetchedUsers);
      setFollowingStatus(newFollowingStatus);
    };

    fetchUsersData();
  }, [user]);

  const tweetList = tweets.map((tweet, index) => (
    <Col span={12} key={index}>
      <TweetComponent
        tweet={{
          ...tweet,
          showUnfollow: false,
          liked: true,
        }}
        user={user_props}
      />
    </Col>
  ));

  const usersList = users.map((user, index) => {
    const isFollowing = followingStatus[user.user_id] || false;
    return (
      <Col span={12} style={{ marginBottom: 10 }} key={index}>
        <Paper
          style={{ padding: "10px", display: "flex", alignItems: "center" }}
          shadow="xs"
        >
          <Avatar
            src={user.profile_image_url}
            size={40}
            style={{ marginRight: 10 }}
          />
          <Text>{user.username}</Text>
          <Button
            rightIcon={isFollowing ? <AiOutlineUser /> : <AiOutlineUserAdd />}
            color={isFollowing ? "gray" : "blue"}
            onClick={() => handleFollow(user.user_id)}
            style={{ marginLeft: "auto" }}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
        </Paper>
      </Col>
    );
  });

  return (
    <Grid gutter="md">
      <Col span={12} md={8}>
        <Paper
          style={{
            padding: "10px",
            marginBottom: "15px",
            display: "flex",
            background: "#f5f5f5",
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
            <Text size="sm">Following: {followingCount}</Text>
            <Text size="sm">Followers: {user.followers.length}</Text>
            <Text size="sm">Tweets: {tweets.length}</Text>
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
