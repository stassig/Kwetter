import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";
import { HeaderResponsive } from "../../components/Header";
import Timeline from "../../components/Timeline";
import { checkIfUserExists, createUser } from "../../api/users";
import { UserData } from "../../types/user_data";

const Home = () => {
  const { user, error, isLoading } = useUser();
  const [followers, setFollowers] = useState<any[]>([]);
  const [user_props, setUserProps] = useState<any>({});

  useEffect(() => {
    const setupUser = async () => {
      if (user && !isLoading && user.nickname) {
        const userExists = await checkIfUserExists(user.nickname);

        setFollowers(userExists.followers);
        setUserProps(userExists);

        if (userExists.message == "No user found" && user.sub) {
          console.log("userExists is null");
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

  return user_props._id ? (
    <div>
      <HeaderResponsive />
      <Timeline
        userId={user_props._id}
        username={user_props.username}
        profile_image_url={user_props.profile_image_url}
        followers={followers}
      />
    </div>
  ) : null;
};

export default Home;
