import gql from "graphql-tag";
import { topicFields, postFields } from "./fragments";

export const USER_POSTS = gql`
  query userPosts($username: String, $archived: Boolean, $pinned: Boolean) {
    userPosts(username: $username, archived: $archived, pinned: $pinned) {
      ...postFields
    }
  }
  ${postFields}
`;

export const FEED_POSTS = gql`
  query feedPosts {
    feedPosts {
      ...postFields
      submitter {
        walletIsSetup
        walletAddress
      }
    }
  }
  ${postFields}
`;

export const USER_POSTS_INBOX = gql`
  query userPostsInbox {
    userPostsInbox {
      ...postFields
    }
  }
  ${postFields}
`;

export const USER_POSTS_ARCHIVE = gql`
  query userPostsArchive {
    userPostsArchive {
      ...postFields
    }
  }
  ${postFields}
`;

export const USER_SEARCH = gql`
  query userSearch($keyword: String) {
    userSearch(keyword: $keyword) {
      id
      username
      name
      avatar
    }
  }
`;

export const CURATED_TOPICS_QUERY = gql`
  query curatedTopics {
    curatedTopics {
      ...topicFields
    }
  }
  ${topicFields}
`;

export const SECTIONS_QUERY = gql`
  query sections($first: Int!, $skip: Int!) {
    sections(first: $first, skip: $skip) {
      id
      date
      posts {
        id
        name
        slug
        description
        tagline
        thumbnail
        galleryThumbs
        votes {
          id
        }
        votesCount
        upvoted
        topics {
          ...topicFields
        }
      }
    }
  }
  ${topicFields}
`;

export const POSTS_QUERY = gql`
  query post {
    posts {
      id
    }
  }
`;

export const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
      avatar
      walletAddress
      walletIsSetup
      username
      name
      followedTopics {
        ...topicFields
      }
    }
  }
  ${topicFields}
`;

export const POST_QUERY = gql`
  query post($slug: String!) {
    post(slug: $slug) {
      id
      name
      slug
      description
      tagline
      thumbnail
      votesCount
      galleryThumbs
      upvoted
      link
      comments(orderBy: { createdAt: desc }) {
        id
        text
        votesCount
        upvoted
        updatedAt
        author {
          id
          avatar
          username
          name
        }
        replies {
          id
          text
          votesCount
          upvoted
          updatedAt
          author {
            id
            avatar
            username
            name
          }
        }
      }
      creators {
        avatar
        username
        headline
        name
      }
      submitter {
        avatar
        username
        headline
        name
      }
      votes {
        id
      }
      topics {
        ...topicFields
      }
    }
  }
  ${topicFields}
`;
