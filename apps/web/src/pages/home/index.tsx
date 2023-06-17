import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";
import { HeaderResponsive } from "../../components/Header";
import Timeline from "../../components/Timeline";
import { checkIfUserExists, createUser } from "../../api/users";
import { auth0_user } from "../../types/auth0_user/auth0_user";
import { UserData } from "../../types/user_data";

const Home = () => {
  const { user, error, isLoading } = useUser();
  const [followers, setFollowers] = useState<any[]>([]);

  useEffect(() => {
    const setupUser = async () => {
      if (user && !isLoading && user.nickname) {
        const userExists = await checkIfUserExists(user.nickname);
        console.log(userExists);
        setFollowers(userExists.followers);

        if (!userExists && user.sub) {
          const newUser = {
            user_id: user.sub.split("|")[1],
            username: user.nickname,
            profile_image_url: user.picture,
          };
          await createUser(newUser);
        }
      }
    };

    if (user) {
      setupUser().catch((error) => {});
    }
  }, [user, isLoading, setFollowers]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return user ? (
    <div>
      <HeaderResponsive />
      <Timeline user={user as auth0_user} followers={followers} />
    </div>
  ) : null;
};

export default Home;
