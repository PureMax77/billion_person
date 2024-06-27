import Link from "next/link";

const Header = () => {
  return (
    <Link
      href={"/"}
      className="flex justify-center items-center text-5xl font-bold w-full py-10"
    >
      Billion People
    </Link>
  );
};

export default Header;
