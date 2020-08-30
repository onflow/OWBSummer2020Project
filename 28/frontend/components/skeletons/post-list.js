import React from "react";
import { Container } from "../post-list/old-index";
import SkeletonPost from "./post";

const NUM_POSTS = 3;

const SkeletonPostList = () => {
  const posts = [];
  for (let i = 0; i < NUM_POSTS; i += 1) {
    posts.push(<SkeletonPost />);
  }
  return <Container>{posts}</Container>;
};

export default SkeletonPostList;
