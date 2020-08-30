import React, { Fragment } from "react";
import styled from "@emotion/styled";
import Comment from "../comment";
import { RICE_CAKE } from "../../shared/style/colors";

const ReplyContainer = styled("div")({
  marginTop: -20,
  marginLeft: 13,
  borderLeft: `3px solid ${RICE_CAKE}`,
  paddingTop: 20,
  paddingLeft: 20
});

const Thread = ({ comment }) => {
  return (
    <Fragment>
      <Comment comment={comment} />
      {comment.replies.map(reply => (
        <ReplyContainer>
          <Comment
            parentCommentId={comment.id}
            isReply={true}
            comment={reply}
          />
        </ReplyContainer>
      ))}
    </Fragment>
  );
};

export default Thread;
