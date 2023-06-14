import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";
import { fetchTweets } from "../../api/tweets";
import { useRouter } from "next/router";
import { HeaderResponsive } from "../../components/Header";
import Timeline from "../../components/Timeline";

const Home = () => {
  const { user, error, isLoading } = useUser();
  // const [tweets, setTweets] = useState(null);
  // const router = useRouter();

  // useEffect(() => {
  //   if (!user && !isLoading && router.pathname !== "/") {
  //     router.push("/");
  //   } else if (user) {
  //     fetchTweets()
  //       .then((tweets) => {
  //         setTweets(tweets);
  //       })
  //       .catch(console.error);
  //   }
  // }, [user, isLoading, router]);

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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  return user ? (
    <div>
      <HeaderResponsive links={links} />
      <Timeline />
    </div>
  ) : null;
};

export default Home;
