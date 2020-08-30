import React, { useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_FOLLOWED_TOPIC } from "../../data/mutations";
import { CURRENT_USER_QUERY } from "../../data/queries";
import styled from "@emotion/styled";
import { CurrentUserContext } from "../../shared/enhancers/current-user";
import { LoginModalContext } from "../../shared/enhancers/login-modal";
import { BASE_TEXT } from "../../shared/style/typography";
import { ALABASTER, LILAC, GUNSMOKE } from "../../shared/style/colors";
const HEIGHT = 24;

const Action = styled("span")({
  display: "inline-flex",
  height: HEIGHT,
  width: 0,
  lineHeight: "21px",
  color: GUNSMOKE,
  borderLeft: `0 solid ${LILAC}`,
  justifyContent: "center",
  transition: "width .1s ease-out",
  "&:hover": {
    backgroundColor: LILAC,
    cursor: "pointer"
  }
});

const Container = styled("div")(
  {
    ...BASE_TEXT,
    border: `1px solid ${LILAC}`,
    backgroundColor: ALABASTER,
    borderRadius: 3,
    display: "inline-flex",
    alignItems: "center",
    height: HEIGHT
  },
  ({ following }) => ({
    "&:hover": {
      [Action]: {
        borderLeftWidth: 1,
        width: 24,
        "&::after": {
          content: following ? `'-'` : `'+'`
        }
      }
    }
  })
);

const Link = styled("div")({
  padding: "0 8px",
  color: GUNSMOKE,
  display: "inline-flex",
  lineHeight: "24px",
  fontSize: 11,
  textTransform: "uppercase",
  textDecoration: "none",
  "&:hover": {
    backgroundColor: LILAC,
    cursor: "pointer"
  }
});

const Tag = ({ id, name, slug }) => {
  const showLogin = useContext(LoginModalContext);
  const currentUser = useContext(CurrentUserContext);
  const [updateFollowedTopic, { data }] = useMutation(UPDATE_FOLLOWED_TOPIC, {
    update: (cache, { data: { updateFollowedTopic } }) => {
      const user = cache.readQuery({ query: CURRENT_USER_QUERY });
      const { followedTopics } = user.me;
      let updatedTopics;
      if (following) {
        updatedTopics = followedTopics.filter(topic => topic.id !== id);
      } else {
        followedTopics.push(updateFollowedTopic);
        updatedTopics = followedTopics;
      }
      user.me.followedTopics = updatedTopics;
      cache.writeQuery({ query: CURRENT_USER_QUERY, data: user });
    }
  });
  const following = currentUser
    ? currentUser.followedTopics.map(topic => topic.id).includes(id)
    : false;
  return (
    <Container following={following}>
      <Link href={slug}>{name}</Link>
      <Action
        onClick={e => {
          if (currentUser) {
            e.preventDefault();
            updateFollowedTopic({
              variables: {
                userId: currentUser.id,
                topicId: id,
                following: true
              }
            });
          } else {
            showLogin();
          }
        }}
      />
    </Container>
  );
};

export default Tag;
