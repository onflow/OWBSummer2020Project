import React, { useEffect, useState, useRef, useContext } from "react";
import styled from "@emotion/styled";
import { CurrentUserContext } from "../../shared/enhancers/current-user";
import { LoginModalContext } from "../../shared/enhancers/login-modal";
import { useMutation } from "@apollo/react-hooks";
import { withApollo } from "react-apollo";
import UserAvatar from "../../shared/library/components/avatars/user";
import { USER_SEARCH, POST_QUERY } from "../../data/queries";
import { CREATE_COMMENT } from "../../data/mutations";
import { MentionsInput, Mention } from "react-mentions";
import StyledButton from "../../shared/library/components/buttons/styled";
import { PostContext } from "../post";
import { BASE_TEXT, WEIGHT } from "../../shared/style/typography";
import {
  POWDER_BLUE,
  LAVENDER_RGBA,
  LILAC,
  BLUSH,
  WHITE,
  DETROIT
} from "../../shared/style/colors";

const AvatarWrapper = styled("div")({
  height: 34,
  display: "flex",
  alignItems: "center"
});

const Container = styled("div")(
  {
    display: "flex"
  },
  ({ isReply = false }) => ({
    marginTop: isReply ? 20 : 0,
    marginBottom: isReply ? 20 : 0
  })
);

const Help = styled("div")({
  ...BASE_TEXT,
  display: "flex",
  marginTop: 10,
  color: DETROIT
});

const style = {
  control: {
    backgroundColor: "#fff",
    fontSize: 14,
    fontWeight: "normal"
  },

  highlighter: {
    overflow: "hidden"
  },

  input: {
    margin: 0
  },

  "&multiLine": {
    control: {
      fontFamily: "monospace"
    },

    highlighter: {
      padding: 9
    },

    input: {
      ...BASE_TEXT,

      padding: "5px 10px",
      minHeight: 34,
      outline: 0,
      border: 0
    }
  },

  suggestions: {
    list: {
      backgroundColor: WHITE,
      width: 190,
      borderRadius: 5,
      boxShadow: "0 1px 10px 1px rgba(0,0,0,.15)"
    },

    item: {
      ...BASE_TEXT,
      borderBottom: `1px solid ${LILAC}`,
      "&focused": {
        backgroundColor: LAVENDER_RGBA,
        color: BLUSH
      }
    }
  }
};

const StyledMentionsInput = styled(MentionsInput)({
  " textarea": {
    border: "1px solid #e8e8e8 !important",
    borderRadius: 3,
    lineHeight: "24px !important",
    "&:focus": {
      border: `1px solid ${POWDER_BLUE} !important`
    }
  }
});

const SubmitButton = styled(StyledButton)({
  marginTop: 0,
  height: 36
});

const InputWrapper = styled("div")(
  {
    flexGrow: 1,
    marginRight: 10
  },
  ({ isReply = false }) => ({
    marginLeft: isReply ? 0 : 10
  })
);

const Suggestion = styled("div")({
  padding: 10,
  display: "flex",
  alignItems: "center"
});

const Avatar = styled("img")({
  borderRadius: "50%",
  height: 30,
  width: 30
});

const Meta = styled("div")({
  ...BASE_TEXT,
  marginLeft: 10,
  lineHeight: "20px"
});

const Name = styled("div")({
  fontWeight: WEIGHT.BOLD
});

const Username = styled("div")({});

const CommentForm = ({
  client,
  postId = null,
  parentId = null,
  isReply = false,
  initialValue = ""
}) => {
  const currentUser = useContext(CurrentUserContext);
  const showLogin = useContext(LoginModalContext);
  const fetchUsers = (keyword, callback) => {
    if (keyword && keyword.length > 0) {
      client
        .query({
          query: USER_SEARCH,
          variables: { keyword }
        })
        .then(result => {
          if (result.data && result.data.userSearch) {
            callback(
              result.data.userSearch.map(user => ({
                ...user,
                display: user.username
              }))
            );
          }
        });
    }
  };

  const [value, setValue] = useState(initialValue);

  const inputEl = useRef();

  const { postSlug } = useContext(PostContext);

  const [createComment] = useMutation(CREATE_COMMENT, {
    update(cache, { data: { createComment } }) {
      const { post } = cache.readQuery({
        query: POST_QUERY,
        variables: {
          slug: postSlug
        }
      });
      let updatedComments;
      if (isReply) {
        const comments = post.comments;
        const parentCommentIndex = comments.findIndex(c => c.id === parentId);
        const parentComment = comments[parentCommentIndex];
        const updatedParentComment = {
          ...parentComment,
          replies: [createComment, ...parentComment.replies]
        };

        updatedComments = [
          ...comments.slice(0, parentCommentIndex),
          updatedParentComment,
          ...comments.slice(parentCommentIndex + 1, comments.length)
        ];
      } else {
        updatedComments = [createComment, ...post.comments];
      }
      const updatedPost = {
        ...post,
        comments: updatedComments
      };
      cache.writeQuery({
        query: POST_QUERY,
        variables: {
          slug: postSlug
        },
        data: { post: updatedPost }
      });
    }
  });

  const handleSubmit = () => {
    const relation = isReply ? { parentId } : { postId };
    const variables = { body: value, ...relation };
    createComment({ variables });
  };

  return (
    <Container isReply={isReply}>
      {!isReply && (
        <AvatarWrapper>
          <UserAvatar user={currentUser} />
        </AvatarWrapper>
      )}
      <InputWrapper isReply={isReply} ref={inputEl}>
        <StyledMentionsInput
          value={value}
          style={style}
          onChange={event => {
            setValue(event.target.value);
          }}
        >
          <Mention
            trigger="@"
            appendSpaceOnAdd={true}
            data={fetchUsers}
            displayTransform={(id, display) => `@${display}`}
            renderSuggestion={({ id, username, name, avatar }) => {
              return (
                <Suggestion>
                  <Avatar src={avatar} />
                  <Meta>
                    <Name>{name}</Name>
                    <Username>{username}</Username>
                  </Meta>
                </Suggestion>
              );
            }}
          />
        </StyledMentionsInput>
        {value.length > 0 && <Help>@user, :emoji</Help>}
      </InputWrapper>
      <SubmitButton
        onClick={currentUser ? () => handleSubmit() : () => showLogin()}
      >
        {isReply ? "Reply" : "Send"}
      </SubmitButton>
    </Container>
  );
};

export default withApollo(CommentForm);
