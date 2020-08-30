import React, { Fragment, useContext, useState } from "react";
import moment from "moment";
import styled from "@emotion/styled";
import gql from "graphql-tag";
import { defaultDataIdFromObject } from "apollo-cache-inmemory";
import { useMutation } from "@apollo/react-hooks";
import { COMMENT_VOTE } from "../../data/mutations";
import { CurrentUserContext } from "../../shared/enhancers/current-user";
import { LoginModalContext } from "../../shared/enhancers/login-modal";
import { BASE_TEXT, WEIGHT } from "../../shared/style/typography";
import {
  BLACK,
  RICE_CAKE,
  SCOPRION,
  FOCUS_LAVENDER,
  PURPLE
} from "../../shared/style/colors";
import CommentForm from "../comment-form";
import { buildInitialCommentReply } from "../../shared/utils";
import ListPopover from "../../shared/library/components/popovers/list";
import Ellipsis from "../../shared/style/icons/ellipsis.svg";

const Container = styled("div")({
  width: "100%",
  marginBottom: 20
});

const UserDetails = styled("div")({});

const User = styled("div")({
  display: "flex",
  alignItems: "center"
});

const Avatar = styled("img")({
  height: 30,
  width: 30,
  borderRadius: "50%"
});

const AvatarLink = styled("a")({
  marginRight: 10
});

const DisplayName = styled("a")({
  ...BASE_TEXT,
  fontWeight: WEIGHT.BOLD,
  color: BLACK,
  textDecoration: "none"
});

const CommentContainer = styled("div")(
  {
    marginLeft: 13,
    paddingLeft: 24,

    marginTop: 10
  },
  ({ hasReplies = false }) => ({
    borderLeft: `3px solid ${hasReplies ? `${RICE_CAKE}` : "transparent"}`
  })
);

const CommentBody = styled("div")({
  ...BASE_TEXT,
  lineHeight: "20px",
  marginBottom: 10,
  " > a": {
    textDecoration: "none",
    color: FOCUS_LAVENDER,
    "&:hover": {
      textDecoration: "underline"
    }
  }
});

const CommentMeta = styled("div")({
  display: "flex",
  " > div": {
    marginRight: 20
  }
});

const ActionButton = styled("div")(
  {
    ...BASE_TEXT,
    fontSize: 11,
    fontWeight: WEIGHT.BOLD,
    cursor: "pointer"
  },
  ({ selected = false }) => ({
    color: selected ? PURPLE : SCOPRION
  })
);

const TimeAgo = styled(ActionButton)({});

const Comment = ({
  isReply = false,
  parentCommentId = null,
  comment: {
    id,
    text,
    votesCount,
    updatedAt,
    upvoted,
    replies = [],
    author,
    author: { avatar, username, name }
  }
}) => {
  const renderBody = body => {
    return {
      __html: body.replace(
        /@\[(.+?)\]\((.+?)\)/g,
        `<a href="/@$1" target="_blank" rel="nofollow noopener noreferrer">@$1</a>`
      )
    };
  };

  const currentUser = useContext(CurrentUserContext);
  const showLogin = useContext(LoginModalContext);

  const [commentVote, { data }] = useMutation(COMMENT_VOTE, {
    update: (cache, { data: { vote } }) => {
      const commentId = defaultDataIdFromObject({ id, __typename: "Comment" });
      console.log("commentId", commentId);
      cache.writeFragment({
        id: commentId,
        fragment: gql`
          fragment myComment on Comment {
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

  const handleVoteClick = () => {
    if (currentUser) {
      commentVote({
        variables: {
          userId: currentUser.id,
          commentId: id
        }
      });
    } else {
      showLogin();
    }
  };

  const handleShareClick = () => {};

  const isCommentOwner = currentUser && currentUser.id === author.id;
  const timeAgo = moment(updatedAt).fromNow();

  const [showReplyForm, setShowReplyForm] = useState(false);

  const SHARE_LINKS = [
    { label: "Facebook", onClick: () => console.log("Facebook share") },
    { label: "Twitter", onClick: () => console.log("Twitter share") },
    { label: "Embed", onClick: () => console.log("Embed share") }
  ];

  return (
    <Container>
      <UserDetails>
        <User>
          <AvatarLink href={`/@${username}`}>
            <Avatar src={avatar} />
          </AvatarLink>
          <DisplayName href={`/@${username}`}>{name}</DisplayName>
        </User>
      </UserDetails>
      <CommentContainer hasReplies={!isReply && replies.length > 0}>
        <CommentBody dangerouslySetInnerHTML={renderBody(text)} />
        <CommentMeta>
          <ActionButton selected={upvoted} onClick={handleVoteClick}>
            Upvote{votesCount > 0 && ` (${votesCount})`}
          </ActionButton>
          <ActionButton onClick={() => setShowReplyForm(!showReplyForm)}>
            {replies.length > 0
              ? `${replies.length} ${
                  replies.length === 1 ? "Reply" : "Replies"
                }`
              : "Reply"}
          </ActionButton>
          <ListPopover
            items={SHARE_LINKS}
            anchor={<ActionButton>Share</ActionButton>}
          />
          <TimeAgo>{timeAgo}</TimeAgo>
          <ListPopover
            items={SHARE_LINKS}
            anchor={
              <ActionButton>
                <Ellipsis />
              </ActionButton>
            }
          />
        </CommentMeta>
        {showReplyForm && (
          <CommentForm
            parentId={parentCommentId ? parentCommentId : id}
            isReply={true}
            initialValue={buildInitialCommentReply(text, author)}
          />
        )}
      </CommentContainer>
    </Container>
  );
};

export default Comment;
