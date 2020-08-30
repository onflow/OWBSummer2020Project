import React, { Fragment } from "react";
import Thread from "../thread";

const CommentList = ({ comments }) => {
  return (
    <Fragment>
      {comments.map(comment => (
        <Thread comment={comment} />
      ))}
    </Fragment>
  );
};

export default CommentList;
