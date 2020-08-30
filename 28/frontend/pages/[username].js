import { useRouter } from "next/router";

const User = () => {
  const router = useRouter();
  const { username } = router.query;

  return <div>{username}</div>;
};

export default User;
