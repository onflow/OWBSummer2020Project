import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import { WalletContext } from "@enhancers/wallet-provider";
import styled from "@emotion/styled";
import { BASE_TEXT, WEIGHT } from "@style/typography";
import CoralButton from "@library/components/buttons/coral";
import {
  BLACK,
  GUNSMOKE,
  WHITE,
  BLUSH,
  FOCUS_BLUSH,
  SCOPRION,
  PURPLE,
  ALABASTER,
  FOCUS_LAVENDER,
} from "@style/colors";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/react-hooks";
import { ARCHIVE_POST } from "@data/mutations";
import { UNARCHIVE_POST } from "@data/mutations";
import { USER_POSTS } from "@data/queries";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArchive, faThumbtack } from "@fortawesome/pro-light-svg-icons";

export const THUMBNAIL_DIMENSION = 60;

const Actions = styled("div")({
  display: "flex",
  transition: "opacity .1s",
  " > div:first-of-type": {
    marginLeft: 0,
  },
});

export const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  borderRadius: 3,
  marginBottom: 12,
  backgroundColor: WHITE,
  boxShadow: "0 1px 2px 0 rgba(0,0,0,.1)",
  padding: "1rem",
  [Actions]: {
    opacity: 0,
  },
  "&:hover": {
    [Actions]: {
      opacity: 1,
    },
  },
});

export const Body = styled("div")({
  display: "flex",
  justifyContent: "space-between",
});

const Footer = styled("div")({
  marginTop: ".5rem",
  display: "flex",
  flexDirection: "row",
});

const Thumbnail = styled("div")(
  {
    flexShrink: 0,
    borderRadius: 2,
    height: THUMBNAIL_DIMENSION,
    width: THUMBNAIL_DIMENSION,
    marginLeft: "1rem",
  },
  ({ src }) => ({
    backgroundImage: `url(${src})`,
    backgroundSize: "cover,auto",
    backgroundPosition: "50% 50%,50% 50%",
  })
);

export const Content = styled("div")({
  // marginLeft: "1rem",
});

const Title = styled("a")({
  ...BASE_TEXT,
  fontSize: "1rem",
  fontWeight: WEIGHT.BOLD,
  wordBreak: "break-word",
  textDecoration: "none",
  color: BLACK,
});

const MetaLine = styled("div")({
  display: "flex",
  alignItems: "center",
});

const PublisherLine = styled("div")({
  display: "flex",
  alignItems: "center",
  marginTop: ".25rem",
});

const MetaText = styled("div")({
  display: "flex",
  alignItems: "center",
});

const Author = styled("div")({
  ...BASE_TEXT,
  color: SCOPRION,
  fontWeight: WEIGHT.BOLD,
});

const SourceLogo = styled("div")(
  {
    width: "1rem",
    height: "1rem",
  },
  ({ src }) => ({
    backgroundImage: `url(${src})`,
    backgroundSize: "cover,auto",
    backgroundPosition: "50% 50%,50% 50%",
    border: `1px solid ${GUNSMOKE}`,
  })
);

const Publisher = styled("div")({
  ...BASE_TEXT,
  color: SCOPRION,
  //   fontWeight: WEIGHT.BOLD,
  marginLeft: ".5rem",
});

const Divider = styled("div")({
  height: 18,
  display: "flex",
  alignItems: "center",
  "&::after": {
    content: `'・'`,
    color: SCOPRION,
  },
});

const DateContainer = styled("div")({});

const Name = styled("div")({
  ...BASE_TEXT,
});

const Action = styled("div")(
  {
    marginLeft: ".5rem",
    cursor: "pointer",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 26,
    height: 26,
    borderRadius: "50%",

    transition: "box-shadow .18s",
  },
  ({
    active = false,
    boxShadowColor,
    gradientStartColor,
    gradientEndColor,
  }) => ({
    background: active
      ? `linear-gradient(111deg, ${gradientStartColor}, ${gradientEndColor})`
      : ALABASTER,
    boxShadow: `0px 0px 0px 2px ${active ? boxShadowColor : WHITE}`,
    "&:hover": {
      boxShadow: `0px 0px 0px 2px ${active ? boxShadowColor : FOCUS_LAVENDER}`,
    },
  })
);

const GiveAwardCta = styled("div")({
  ...BASE_TEXT,
  cursor: "pointer",
  "&:hover": {
    color: PURPLE,
  },
});

const ACTION_TIMEOUT = 1000;

const Icon = styled("div")({
  fontSize: ".875rem",
  marginTop: -2,
  letterSpacing: -5,
});

const StyledCoralButton = styled(CoralButton)({
  height: 24,
  fontSize: 11,
});

const PostCard = ({
  currentUser = null,
  post: {
    id,
    image,
    title,
    archived,
    pinned,
    author,
    url,
    logo,
    publisher,
    date,
  },
  post,
}) => {
  const { giveAward } = useContext(WalletContext);
  const router = useRouter();
  const route = router.route;
  const showActions = route !== "/";

  const [archivePost] = useMutation(ARCHIVE_POST, {
    update: (cache, { data: { archivePost: post } }) => {
      console.log("DONE", cache);
      // Remove post from reading list query
      const { userPosts: posts } = cache.readQuery({
        query: USER_POSTS,
        variables: { archived: false },
      });
      const index = posts.findIndex((post) => post.id === id);
      cache.writeQuery({
        query: USER_POSTS,
        variables: { archived: false },
        data: {
          userPosts: [
            ...posts.slice(0, index),
            ...posts.slice(index + 1, posts.length),
          ],
        },
      });
      // Add post to archive
      const queryInCache =
        cache.data.data.ROOT_QUERY['userPosts({"archived":true})'];
      if (queryInCache) {
        const { userPosts: archivedPosts } = cache.readQuery({
          query: USER_POSTS,
          variables: { archived: true },
        });
        cache.writeQuery({
          query: USER_POSTS,
          variables: { archived: true },
          data: {
            userPosts: [post, ...archivedPosts],
          },
        });
      }
    },

    onError: () => {
      toast.error("😳Unable to archive post at this time.", {
        position: "bottom-left",
      });
    },
  });

  const [unarchivePost] = useMutation(UNARCHIVE_POST, {
    update: (cache, { data: { unarchivePost: post } }) => {
      // Remove post from archive query
      const { userPosts: archivedPosts } = cache.readQuery({
        query: USER_POSTS,
        variables: { archived: true },
      });
      const index = archivedPosts.findIndex(
        (archivedPost) => archivedPost.id === id
      );
      cache.writeQuery({
        query: USER_POSTS,
        variables: { archived: true },
        data: {
          userPosts: [
            ...archivedPosts.slice(0, index),
            ...archivedPosts.slice(index + 1, archivedPosts.length),
          ],
        },
      });
      // Add post to archive
      const queryInCache =
        cache.data.data.ROOT_QUERY['userPosts({"archived":false})'];
      if (queryInCache) {
        const { userPosts: posts } = cache.readQuery({
          query: USER_POSTS,
          variables: { archived: false },
        });
        cache.writeQuery({
          query: USER_POSTS,
          variables: { archived: false },
          data: {
            userPosts: [post, ...posts],
          },
        });
      }
    },

    onError: () => {
      toast.error("😳Unable to unarchive post at this time.", {
        position: "bottom-left",
      });
    },
  });

  const ACTIONS = [
    // {
    //   icon: "📌",
    //   boxShadowColor: "#d0e3ff",
    //   gradientStartColor: "#c5d9f8",
    //   gradientEndColor: "#90bbff",
    //   activeKey: "pinned",
    //   name: "Pin",
    //   onClick: () => {
    //     console.log("clicked pin");
    //   },
    // },
    {
      icon: "💾",
      boxShadowColor: "#cfc9f3",
      gradientStartColor: "#cac3f3",
      gradientEndColor: "#958aee",
      activeKey: "archived",
      name: "Archive",
      onClick: () => {
        const func = archived ? unarchivePost : archivePost;
        func({
          variables: {
            postId: id,
          },
        });
      },
    },
  ];

  const showGiveAward = currentUser && post.submitter.walletIsSetup;

  const handleGiveAward = () => {
    giveAward({ recipientAddress: post.submitter.walletAddress });
  };

  return (
    <Container>
      <Body>
        <Content>
          <Title target="_blank" href={url}>
            {title}
          </Title>
          <PublisherLine>
            <SourceLogo src={logo} />
            <Publisher>{publisher}</Publisher>
          </PublisherLine>
        </Content>
        {image && <Thumbnail src={image} />}
      </Body>
      <Footer>
        <Actions>
          {showGiveAward && (
            <StyledCoralButton onClick={handleGiveAward}>
              🏅 Give Award
            </StyledCoralButton>
          )}
          {showActions && (
            <>
              {ACTIONS.map(
                (
                  {
                    icon,
                    name,
                    onClick,
                    boxShadowColor,
                    gradientStartColor,
                    gradientEndColor,
                    activeKey,
                  },
                  i
                ) => (
                  <StyledCoralButton key={name} onClick={() => onClick(id)}>
                    {icon} {`${post[activeKey] ? " Unarchive" : " Archive"}`}
                  </StyledCoralButton>
                )
              )}
            </>
          )}
        </Actions>
      </Footer>
    </Container>
  );
};

export default PostCard;
