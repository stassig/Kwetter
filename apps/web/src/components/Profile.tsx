import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";
import { fetchTweets } from "../api/tweets";
import { useRouter } from "next/router";
import { Button } from "@mantine/core";
import { HeaderResponsive } from "../components/Header";

const Profile = () => {
  const { user, error, isLoading } = useUser();
  const [tweets, setTweets] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!user && !isLoading && router.pathname !== "/") {
      router.push("/");
    } else if (user) {
      fetchTweets()
        .then((tweets) => {
          setTweets(tweets);
        })
        .catch(console.error);
    }
  }, [user, isLoading, router]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

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

  return user ? (
    <div>
      <HeaderResponsive links={links} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  ) : null;
};

export default Profile;
