import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect } from "react";
import { HeaderResponsive } from "../../components/Header";
import Timeline from "../../components/Timeline";
import { checkIfUserExists, createUser } from "../../api/users";
import { auth0_user } from "../../types/auth0_user/auth0_user";

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

const Home = () => {
  const { user, error, isLoading } = useUser();

  console.log(user);

  useEffect(() => {
    const setupUser = async () => {
      if (user && !user.isLoading && user.nickname) {
        const userExists = await checkIfUserExists(user.nickname);
        if (!userExists) {
          const newUser = {
            user_id: user.sub,
            username: user.nickname,
            profile_image_url: user.picture,
          };
          await createUser(newUser);
        }
      }
    };

    setupUser();
  }, [user]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return user ? (
    <div>
      <HeaderResponsive links={links} />
      <Timeline user={user as auth0_user} />
    </div>
  ) : null;
};

export default Home;
