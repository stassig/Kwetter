import Link from "next/link";

const Header = () => {
  return (
    <>
      <Link href="/api/auth/logout">Logout</Link>
    </>
  );
};

export default Header;
