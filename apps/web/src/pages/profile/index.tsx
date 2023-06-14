import Profile from "../../components/Profile";
import { HeaderResponsive } from "../../components/Header";

const ProfileI = () => {
  const links = [
    {
      link: "/home",
      label: "Home",
    },
    {
      link: "/profile",
      label: "Profile",
    },
    {
      link: "/api/auth/logout",
      label: "Logout",
    },
  ];

  const userData = {
    username: "John Doe",
    userProfilePic: "https://randomuser.me/api/portraits/men/75.jpg",
    following: 50,
    followers: 200,
    tweets: 150,
    tweetData: [
      {
        userProfilePic: "https://randomuser.me/api/portraits/men/75.jpg",
        datePosted: "2023-06-14",
        message: "This is a kwetter message.",
        numLikes: 20,
        username: "John Doe",
        onUnfollow: () => {},
        liked: false,
        onLike: () => {},
      },
      {
        userProfilePic: "https://randomuser.me/api/portraits/men/75.jpg",
        datePosted: "2023-06-13",
        message: "Just had a great lunch!",
        numLikes: 15,
        username: "John Doe",
        onUnfollow: () => {},
        liked: false,
        onLike: () => {},
      },
      {
        userProfilePic: "https://randomuser.me/api/portraits/men/75.jpg",
        datePosted: "2023-06-12",
        message: "Hello world! This is my first kwetter message.",
        numLikes: 25,
        username: "John Doe",
        onUnfollow: () => {},
        liked: false,
        onLike: () => {},
      },
    ],
    followingData: [
      {
        username: "Richard Roe",
        userProfilePic: "https://randomuser.me/api/portraits/men/80.jpg",
        following: 70,
        followers: 250,
        tweets: 180,
      },
      {
        username: "Mike Minor",
        userProfilePic: "https://randomuser.me/api/portraits/men/81.jpg",
        following: 30,
        followers: 120,
        tweets: 110,
      },
      {
        username: "Samuel Sampson",
        userProfilePic: "https://randomuser.me/api/portraits/men/82.jpg",
        following: 50,
        followers: 220,
        tweets: 170,
      },
    ],
  };

  return (
    <>
      <HeaderResponsive links={links} />
      <Profile user={userData} />
    </>
  );
};

export default ProfileI;
