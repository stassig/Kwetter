import Profile from "../../components/Profile";
import { HeaderResponsive } from "../../components/Header";
import userData from "./mockdata";

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

  return (
    <>
      <HeaderResponsive links={links} />
      <Profile user={userData} />
    </>
  );
};

export default ProfileI;
