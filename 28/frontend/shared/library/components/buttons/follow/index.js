import React, { useContext } from "react";
import styled from "@emotion/styled";
import { useMutation } from "@apollo/react-hooks";
import { CurrentUserContext } from "@enhancers/current-user";
import { LoginModalContext } from "@enhancers/login-modal";

import { UPDATE_FOLLOWED_TOPIC } from "@data/mutations";
import { CURRENT_USER_QUERY } from "@data/queries";

import { WHITE, FOCUS_LAVENDER, PURPLE } from "@style/colors";
import { BASE_TEXT, WEIGHT } from "@style/typography";

const Container = styled("div")({
  ...BASE_TEXT,
  fontWeight: WEIGHT.BOLD,
  textTransform: "uppercase",
  backgroundColor: PURPLE,
  color: WHITE,
  borderRadius: 3,
  padding: "2px 8px",
  "&:hover": {
    backgroundColor: FOCUS_LAVENDER
  }
});

const FollowButton = ({ topicId }) => {
  const showLogin = useContext(LoginModalContext);
  const currentUser = useContext(CurrentUserContext);
  const [updateFollowedTopic, { data }] = useMutation(UPDATE_FOLLOWED_TOPIC, {
    update: (cache, { data: { updateFollowedTopic } }) => {
      const user = cache.readQuery({ query: CURRENT_USER_QUERY });
      const { followedTopics } = user.me;
      let updatedTopics;
      if (following) {
        updatedTopics = followedTopics.filter(topic => topic.id !== topicId);
      } else {
        followedTopics.push(updateFollowedTopic);
        updatedTopics = followedTopics;
      }
      user.me.followedTopics = updatedTopics;
      cache.writeQuery({ query: CURRENT_USER_QUERY, data: user });
    }
  });
  const following = currentUser
    ? currentUser.followedTopics.map(topic => topic.id).includes(topicId)
    : false;
  const text = following ? "✓ FOLLOWING" : "+ FOLLOW";

  const handleClick = e => {
    if (currentUser) {
      e.preventDefault();
      updateFollowedTopic({
        variables: {
          userId: currentUser.id,
          topicId,
          following: true
        }
      });
    } else {
      showLogin();
    }
  };

  return <Container onClick={handleClick}>{text}</Container>;
};

export default FollowButton;
