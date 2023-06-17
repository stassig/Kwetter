import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Image, Paper } from "@mantine/core";
import Link from "next/link";
import { Button } from "@mantine/core";

const Login = () => {
  const { user, isLoading, error } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/home");
    }
  }, [user, router]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div
      style={{
        backgroundImage: 'url("/Background.png")',
        backgroundPosition: "center",
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <Image
            src="/Original_Logo.png"
            alt="Description of the image"
            width={100}
            height={100}
          />
          <div
            style={{
              height: "70px", // adjust this to match text height
              borderLeft: "2px solid #000",
              marginLeft: "10px",
              marginRight: "10px",
            }}
          />
          <div style={{ fontSize: "30px", fontWeight: "bold" }}>Kwetter</div>
        </div>
        <Button
          component={Link}
          href="/api/auth/login"
          size="xl"
          radius="xl"
          style={{ fontSize: "30px", padding: "15px 40px", width: "100%" }}
        >
          LOGIN
        </Button>
      </div>
    </div>
  );
};

export default Login;
