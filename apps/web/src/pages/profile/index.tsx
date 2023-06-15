import Profile from "../../components/Profile";
import { HeaderResponsive } from "../../components/Header";

const ProfileI = () => {
  const userData = {
    username: "John Doe",
    userProfilePic: "https://randomuser.me/api/portraits/men/75.jpg",
    following: 50,
    followers: 200,
    tweets: 150,
    tweetData: [],
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
      <HeaderResponsive />
      <Profile user={userData} />
    </>
  );
};

export default ProfileI;
