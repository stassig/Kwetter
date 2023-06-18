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

  const checkUser = async () => {
    if (user && !isLoading && user.nickname) {
      const userExists = await checkIfUserExists(user.nickname);

      setFollowers(userExists.followers);

      if (userExists.message == "No user found" && user.sub) {
        const newUser = {
          user_id: user.sub.split("|")[1],
          username: user.nickname,
          profile_image_url: user.picture,
        };
        const response = await createUser(newUser);
        setUserProps(response);
      } else {
        setUserProps(userExists);
      }
    }
  };

  useEffect(() => {
    if (user && !isLoading && user.nickname && user.sub && !user_props._id) {
      checkUser();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setFollowers, user]);

  if (isLoading || !user_props._id) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div>
      <HeaderResponsive />
      <Timeline
        userId={user_props._id}
        username={user_props.username}
        profile_image_url={user_props.profile_image_url}
        followers={followers}
      />
    </div>
  );
};

export default Home;
