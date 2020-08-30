import moment from "moment";
import uuidv4 from "uuid/v4";
import axios from "axios";
import { SIGN_UPLOAD } from "../data/mutations";

const TODAY = "Today";
const YESTERDAY = "Yesterday";

const isToday = date => moment(date).isSame(moment(), "day");

const isYesterday = date =>
  moment(date).isSame(moment().subtract(1, "days"), "day");

export const formatDate = date => {
  if (isToday(date)) {
    return TODAY;
  }
  if (isYesterday(date)) {
    return YESTERDAY;
  }
  return moment(date).format("MMMM Do");
};

export const uploadUrl = filename => {
  return `https://s3.amazonaws.com/lyra-labs-development/${filename}`;
};

export const uploadImage = (client, file, cb) => {
  const fileName = uuidv4();
  client
    .mutate({
      mutation: SIGN_UPLOAD,
      variables: { fileName, fileType: file.type }
    })
    .then(({ data: { signUpload } }) => {
      const options = {
        headers: {
          "Content-Type": file.type,
          "x-amz-acl": "public-read"
        }
      };
      axios
        .put(signUpload.signedRequest, file, options)
        .then(result => {
          cb(result, fileName);
        })
        .catch(error => {
          alert("ERROR " + JSON.stringify(error));
        });
    })
    // eslint-disable-next-line no-unused-vars
    .catch(err => {
      console.log("ERR", err);
    });
};

export const normalizeTopics = topics => {
  return topics.map(({ name, slug }) => ({
    value: slug,
    label: name
  }));
};

export const isValidUrl = url => {
  const pattern = new RegExp(
    "^((ft|htt)ps?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name and extension
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?" + // port
    "(\\/[-a-z\\d%@_.~+&:]*)*" + // path
    "(\\?[;&a-z\\d%@_.,~+&:=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return pattern.test(url);
};

export const extractMentionedUsers = text => {
  const regex = /@\[(.+?)\]\((.+?)\)/g;
  const usernames = (text.match(regex) || []).map(e => e.replace(regex, "$1"));
  const userIds = (text.match(regex) || []).map(e => e.replace(regex, "$2"));
  return usernames.map((username, index) => ({ username, id: userIds[index] }));
};

export const buildInitialCommentReply = (text, parentAuthor) => {
  console.log("buildInitialCommentReply parentUsername", parentAuthor);
  const users = [...extractMentionedUsers(text), parentAuthor];
  console.log("users", users);
  return users.length > 0
    ? `${users.map(({ username, id }) => `@[${username}](${id})`).join(" ")} `
    : "";
};
