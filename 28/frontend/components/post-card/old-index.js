import React, {
  Fragment,
  useContext,
  useState,
  useEffect,
  useRef
} from "react";
import gql from "graphql-tag";
import { defaultDataIdFromObject } from "apollo-cache-inmemory";
import Router, { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/react-hooks";
import { VOTE } from "../../data/mutations";
import { CurrentUserContext } from "../../shared/enhancers/current-user";
import styled from "@emotion/styled";
import TagList from "../tag-list";
import { MobileContext } from "../../shared/enhancers/mobile-enhancer";
import { LoginModalContext } from "../../shared/enhancers/login-modal";
import PostModal from "../post-modal";
import ChevronUp from "../../shared/style/icons/chevron-up.svg";
import { TOP } from "../../shared/library/components/modals/base/portal";
import { BASE_TEXT, WEIGHT } from "../../shared/style/typography";
import { PHONE } from "../../shared/style/breakpoints";
import {
  BLACK,
  LILAC,
  WHITE,
  RUBY,
  BLUSH,
  ALABASTER
} from "../../shared/style/colors";
import { Tagline } from "../../shared/library/components/typography";

const ACCENT = BLUSH;

export const Container = styled("li")(
  {
    position: "relative",
    listStyleType: "none"
  },
  ({ visible }) => ({
    display: visible ? "block" : "none"
  })
);

export const Body = styled("div")({
  "&:hover": {
    backgroundColor: ALABASTER
  },
  padding: 20,
  display: "flex",
  flexDirection: "row",
  borderTop: `1px solid ${LILAC}`,
  cursor: "pointer"
});

const Wrapper = styled("div")({});

const Link = styled("a")({
  textDecoration: "none"
});

export const Thumbnail = styled("img")({
  width: 80,
  height: 80,
  marginRight: 10
});

export const Content = styled("div")({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1
});

const Name = styled("div")({
  ...BASE_TEXT,
  fontSize: 16,
  lineHeight: "24px",
  fontWeight: WEIGHT.BOLD,
  color: BLACK
});

const Footer = styled("div")({
  display: "flex"
});

const VotesWrapper = styled("div")(
  {
    position: "absolute",
    top: "50%",
    right: 20,
    transform: "translateY(-50%)",
    backgroundColor: WHITE,
    "&:hover": {
      backgroundColor: ALABASTER
    },
    border: `1px solid ${LILAC}`,
    borderRadius: 3
  },
  ({ upvoted }) => ({
    borderColor: upvoted ? RUBY : LILAC
  })
);

const Votes = styled("div")(
  {
    ...BASE_TEXT,
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: 74,
    width: 64,
    fontWeight: WEIGHT.BOLD,
    [PHONE]: {
      height: 55,
      width: 48
    }
  },
  ({ upvoted }) => ({
    color: upvoted ? ACCENT : BLACK,
    " > svg": {
      width: 16,
      height: 11,
      marginBottom: 3,
      " > path": {
        fill: upvoted ? ACCENT : BLACK
      }
    }
  })
);

const PostCard = ({
  post: {
    id,
    slug,
    name,
    tagline,
    description,
    thumbnail,
    tags,
    votesCount,
    upvoted
  },
  post,
  visible
}) => {
  const currentUser = useContext(CurrentUserContext);
  const showLogin = useContext(LoginModalContext);
  const [vote, { data }] = useMutation(VOTE, {
    update: (cache, { data: { vote } }) => {
      const postId = defaultDataIdFromObject({ id, __typename: "Post" });
      cache.writeFragment({
        id: postId,
        fragment: gql`
          fragment myPost on Post {
            upvoted
            votesCount
          }
        `,
        data: {
          upvoted: !upvoted,
          votesCount: upvoted ? votesCount - 1 : votesCount + 1
        }
      });
    }
  });
  const isMobile = useContext(MobileContext);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const href = `/posts/${slug}`;

  const tagListRef = useRef();

  useEffect(() => {
    Router.beforePopState(({ url, as, options }) => {
      if (url === "/" && as === "/") {
        setIsOpen(false);
      } else {
        router.push(as, as, { shallow: true });
        return false;
      }
      return true;
    });
  }, [isOpen]);

  const handleClick = e => {
    e.preventDefault();
    const containsClick =
      tagListRef.current && tagListRef.current.contains(e.target);
    console.log("containsClick", containsClick);
    if (!containsClick) {
      router.push(Router.pathname, href, { shallow: true });
      setIsOpen(true);
    }
  };

  const handleDismiss = () => {
    router.push("/", "/", { shallow: true });
    setIsOpen(false);
  };

  const handleVoteClick = e => {
    if (currentUser) {
      e.preventDefault();
      vote({
        variables: {
          userId: currentUser.id,
          postId: id
        }
      });
    } else {
      showLogin();
    }
  };

  return (
    <Fragment>
      <Container visible={visible}>
        <Wrapper>
          <Link href={href} onClick={handleClick}>
            <Body>
              <Thumbnail src={thumbnail} />
              <Content>
                <Name>{name}</Name>
                <Tagline>{tagline}</Tagline>
                <Footer>
                  {tags.length > 0 && (
                    <TagList containerRef={tagListRef} tags={tags} />
                  )}
                </Footer>
              </Content>
            </Body>
          </Link>
        </Wrapper>
        <VotesWrapper upvoted={upvoted}>
          <Votes upvoted={upvoted} onClick={handleVoteClick}>
            <ChevronUp />
            {votesCount > 0 && votesCount}
          </Votes>
        </VotesWrapper>
      </Container>
      {isOpen && (
        <PostModal
          post={post}
          slug={slug}
          onDismiss={handleDismiss}
          position={TOP}
          width={"100%"}
        />
      )}
    </Fragment>
  );
};

PostCard.propTypes = {
  id: PropTypes.string,
  thumbnail: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  votesCount: PropTypes.number,
  commentsCount: PropTypes.number,
  tags: PropTypes.array,
  visible: PropTypes.bool,
  upvoted: PropTypes.bool
};

export default PostCard;
