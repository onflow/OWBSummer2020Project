import React from "react";
import styled from "@emotion/styled";
import Post, { TOP } from "../post";

import BaseModal from "../../shared/library/components/modals/base";
import { withPortal } from "../../shared/library/components/modals/base/portal";

const PostModal = ({ post, slug, onDismiss }) => {
  console.log("post", post);
  return (
    <BaseModal onDismiss={onDismiss}>
      <Post
        post={post}
        thumbs={post.galleryThumbs}
        slug={slug}
        isModal={true}
      />
    </BaseModal>
  );
};

export default withPortal(PostModal);
