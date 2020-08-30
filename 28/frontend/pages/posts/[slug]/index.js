import { useRouter } from "next/router";
import Page from "../../../components/page";
import Post from "../../../components/post";
import { withCurrentUser } from "../../../shared/enhancers/current-user";
import { withLoginModal } from "../../../shared/enhancers/login-modal";
import { flowRight as compose } from "lodash";

const PostPage = ({ user }) => {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <Page>
      <Post />
    </Page>
  );
};

const enhance = compose(withCurrentUser, withLoginModal);
export default enhance(PostPage);
