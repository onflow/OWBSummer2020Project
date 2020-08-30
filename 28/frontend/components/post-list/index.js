import React, { Fragment, useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { useQuery } from "@apollo/react-hooks";
import { USER_POSTS } from "@data/queries";
import PostCard from "../post-card";
import SkeletonPostCard from "../post-card/skeleton";
import EmptyPlaceholder from "./empty-placeholder";

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  padding: 0,
  marginBottom: 30,
  borderRadius: 5,
});

const PostList = ({ archived = false }) => {
  const { loading, error, data, fetchMore } = useQuery(USER_POSTS, {
    variables: { archived },
  });
  return (
    <Container>
      {loading && (
        <>
          <SkeletonPostCard />
          <SkeletonPostCard />
          <SkeletonPostCard />
        </>
      )}
      {!loading && data && (
        <Fragment>
          {data.userPosts.map((post, i) =>
            post.id === "optimisticResponse" ? (
              <SkeletonPostCard key={i} />
            ) : (
              <PostCard key={i} post={post} />
            )
          )}
        </Fragment>
      )}
      {!loading && data.userPosts.length === 0 && <EmptyPlaceholder />}
    </Container>
  );
};

export default PostList;
