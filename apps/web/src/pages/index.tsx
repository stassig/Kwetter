import Login from "../components/Login";
import { getSession } from "@auth0/nextjs-auth0";
import { GetServerSidePropsContext } from "next";

export default function LandingPage() {
  return (
    <>
      <Login />
    </>
  );
}

//  Get server side props
export async function getServerSideProps({
  req,
  res,
}: GetServerSidePropsContext) {
  const session = await getSession(req, res);
  if (session) {
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
