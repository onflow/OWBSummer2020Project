import React, { useState, useEffect, useRef } from "react";
import Router, { useRouter } from "next/router";
import styled from "@emotion/styled";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_POST } from "@data/mutations";
import { USER_POSTS } from "@data/queries";

import {
  Input,
  InputWrapper,
  CharacterCounter,
  Label,
  LabelName,
  LabelQualifier,
  Field,
} from "@library/components/inputs";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/pro-light-svg-icons";

import { DESKTOP, TABLET } from "@style/breakpoints";

import SimpleButton from "@library/components/buttons/simple";
import StyledButton from "@library/components/buttons/styled";
import { WEIGHT } from "@style/typography";
import {
  CHARCOAL,
  FOCUS_LAVENDER,
  LAVENDER,
  PURPLE,
  RICE_CAKE,
} from "@style/colors";

const styles = {
  height: 36,
  fontWeight: WEIGHT.BOLD,
  lineHeight: "16px",
};

const StyledSimpleButton = styled(SimpleButton)({
  ...styles,
});

const StyledStyleButton = styled(StyledButton)({
  ...styles,
  backgroundColor: PURPLE,
  borderColor: PURPLE,
  "&:hover": {
    color: CHARCOAL,
    backgroundColor: FOCUS_LAVENDER,
    borderColor: FOCUS_LAVENDER,
  },
});

const Container = styled("div")({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
});

const Actions = styled("div")({
  // marginLeft: 16,
  display: "flex",
  flexDirection: "row",
  "> button:first-of-type": {
    marginRight: 10,
  },
  [TABLET]: {
    display: "none",
  },
});

const StyledInput = styled(Input)({
  fontSize: "1rem",
  backgroundColor: RICE_CAKE,
  height: "auto",
  marginRight: "1rem",
  [TABLET]: {
    marginRight: ".5rem",
  },
});

const Form = styled("form")({
  display: "flex",
  width: "100%",
  alignItems: "center",
  marginRight: ".5rem",
  [DESKTOP]: {
    marginRight: "1rem",
  },
  [TABLET]: {
    marginLeft: ".5rem",
  },
});

const MobileCancel = styled(FontAwesomeIcon)({
  display: "none",
  fontSize: "1.5rem",
  [TABLET]: {
    display: "flex",
  },
});

const LinkForm = ({ setFormVisible }) => {
  const router = useRouter();
  const [createPost, { data, loading, error }] = useMutation(CREATE_POST, {
    update: (cache, { data: { createPost: post } }) => {
      if (router.route !== "/readinglist") {
        router.push("/readinglist", "/readinglist", { shallow: true });
      }
      try {
        const { userPosts: posts } = cache.readQuery({
          query: USER_POSTS,
          variables: { archived: false },
        });
        if (posts) {
          cache.writeQuery({
            query: USER_POSTS,
            variables: { archived: false },
            data: { userPosts: [post, ...posts] },
          });
        }
      } catch {}
    },
    optimisticResponse: {
      createPost: {
        id: "optimisticResponse",
        author: null,
        date: null,
        description: "COOL",
        image: "",
        logo: "",
        archived: false,
        pinned: false,
        publisher: "COOOL",
        title:
          "Welcome to the era of the post-shopping mall — The New York Times",
        url: "https://apple.news/AZQPnnxJjTx6QQU8Jhhdg0A",
        __typename: "Post",
      },
    },
    onError: () => {
      toast.error("😳Please enter a valid URL", {
        position: "bottom-left",
      });
    },
  });

  const [givenUrl, setGivenUrl] = useState();

  const handleCancel = () => setFormVisible(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (givenUrl) {
      createPost({
        variables: {
          givenUrl,
        },
      });
      e.target.reset();
    }
    setFormVisible(false);
  };

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const inputEl = useRef();

  return (
    <Form onSubmit={handleSubmit}>
      <StyledInput
        onChange={(e) => setGivenUrl(e.target.value)}
        ref={inputEl}
        type="text"
        valid={true}
        placeholder={" Save a URL https://..."}
      />
      <MobileCancel icon={faTimes} onClick={handleCancel} />
      <Actions>
        <StyledSimpleButton type="button" onClick={handleCancel}>
          Cancel
        </StyledSimpleButton>
        <StyledStyleButton type="submit">Save</StyledStyleButton>
      </Actions>
    </Form>
  );
};

export default LinkForm;
