import Profile from "../../components/Profile";
import { HeaderResponsive } from "../../components/Header";
import { getUserById, fetchUsers } from "../../api/users";
import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { User } from "../../types/user";
import { UserData } from "../../types/user_data";

const ProfileI = () => {
  const { user, error, isLoading } = useUser();

  const [userData, setUser] = useState<UserData>();

  useEffect(() => {
    const fetchUser = async () => {
      if (user && user.sub) {
        const userData = await getUserById(user.sub.split("|")[1]);
        setUser(userData);
        console.log(userData);
      }
    };

    fetchUser();
  }, [user]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <HeaderResponsive />
      {userData && <Profile user={userData} />}
    </>
  );
};

export default ProfileI;
