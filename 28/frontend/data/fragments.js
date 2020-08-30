import gql from "graphql-tag";

export const topicFields = gql`
  fragment topicFields on Topic {
    id
    name
    slug
  }
`;

export const postFields = gql`
  fragment postFields on Post {
    id
    author
    date
    description
    image
    logo
    publisher
    title
    url
    archived
    pinned
  }
`;
