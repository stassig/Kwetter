import { useEffect, useState } from "react";
import { Paper, Text, Avatar, Button, Col, Grid } from "@mantine/core";
import { AiOutlineUser, AiOutlineUserAdd } from "react-icons/ai";
import { User } from "../types/user";
import { fetchUsers, followUser, unfollowUser } from "../api/users";
import { getTweetsByUserId } from "../api/tweets";
import { TweetData } from "../types/tweet_data";
import TweetComponent from "./Tweet";
import toastr from "toastr";

interface UserData {
  _id: string;
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

  const handleFollow = async (userId: string) => {
    const isCurrentlyFollowing = followingStatus[userId];
    if (isCurrentlyFollowing) {
      await unfollowUser(user._id, userId);
      setFollowingCount(followingCount - 1);
      toastr.success("Unfollowed!");
    } else {
      await followUser(user._id, userId);
      setFollowingCount(followingCount + 1);
      toastr.success("Followed!");
    }
    setFollowingStatus({ ...followingStatus, [userId]: !isCurrentlyFollowing });
  };

  useEffect(() => {
    const getTweets = async () => {
      const tweets = await getTweetsByUserId(user._id);
      setTweets(tweets);
    };
    getTweets();
  }, [user._id]);

  useEffect(() => {
    const fetchUsersData = async () => {
      let fetchedUsers = await fetchUsers();
      const newFollowingStatus: { [key: string]: boolean } = {};

      fetchedUsers = fetchedUsers.filter(
        (fetchedUser) => fetchedUser._id !== user._id
      );

      fetchedUsers.forEach((fetchedUser) => {
        newFollowingStatus[fetchedUser._id] = user.following.includes(
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
          liked: true,
          disableLike: true,
        }}
      />
    </Col>
  ));

  const usersList = users.map((user, index) => {
    const isFollowing = followingStatus[user._id] || false;
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
            onClick={() => handleFollow(user._id)}
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
