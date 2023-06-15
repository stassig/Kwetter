import Profile from "../../components/Profile";
import { HeaderResponsive } from "../../components/Header";

const ProfileI = () => {
  const userData = {
    username: "John Doe",
    profile_image_url: "https://randomuser.me/api/portraits/men/75.jpg",
    following: 50,
    followers: 200,
    tweets: 150,
    tweetData: [],
    user_id: "123",
    followingData: [
      {
        username: "Richard Roe",
        userProfilePic: "https://randomuser.me/api/portraits/men/80.jpg",
        following: 70,
        followers: 250,
        tweets: 180,
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
