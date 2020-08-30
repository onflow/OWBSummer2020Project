import React, { useEffect, useRef, createRef, useState, Fragment } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import { POST_QUERY } from "../../data/queries";
import {
  Container,
  Main,
  Aside,
  Section,
  Panel,
  Divider
} from "../../shared/library/components/layout";
import styled from "@emotion/styled";
import { RICE_CAKE, DETROIT, LILAC } from "../../shared/style/colors";
import { BASE_TEXT, WEIGHT } from "../../shared/style/typography";
import Header from "./header";
import CommentList from "../comment-list";
import CommentForm from "../comment-form";
import Creators from "../creators";
import StyledButton from "../../shared/library/components/buttons/styled";
// import { useMediaQuery } from "react-responsive";

const MAX_HEIGHT = 500;
const TOP = "top";
const BOTTOM = "bottom";

const CommentFormWrapper = styled("div")(
  {
    borderBottom: `1px solid ${LILAC}`,
    marginLeft: -20,
    marginRight: -20,
    paddingLeft: 20,
    paddingRight: 20
  },
  ({ position = TOP }) => ({
    borderBottom: position === TOP ? `1px solid ${LILAC}` : 0,
    borderTop: position === BOTTOM ? `1px solid ${LILAC}` : 0,
    marginTop: position === TOP ? 0 : 20,
    marginBottom: position === TOP ? 20 : 0,
    paddingTop: position === TOP ? 0 : 20,
    paddingBottom: position === TOP ? 20 : 0
  })
);

const StyledContainer = styled(Container)(
  {
    width: "100%",
    flexDirection: "column",
    borderRadius: 3
  },
  ({ isModal }) => ({
    backgroundColor: isModal && RICE_CAKE,
    marginBottom: isModal && 100
  })
);

const HeaderWrapper = styled("div")({
  padding: "30px 0px"
});

const BodyWrapper = styled(Container)({
  margin: 0,
  padding: 0,
  paddingBottom: 30
});

const Thumbnails = styled("div")({
  display: "flex",
  marginTop: 10
});

const StyledPanel = styled(Panel)({
  overflow: "hidden"
});

const StyledMain = styled(Main)({
  " > div:first-of-type": {
    marginBottom: 30
  }
});

const GalleryWrapper = styled("div")({
  display: "flex",
  flexDirection: "column"
});

const Gallery = styled("div")(
  {
    overflow: "hidden"
  },
  ({ height = MAX_HEIGHT, width }) => ({
    width,
    height
  })
);

const List = styled("ol")({
  width: "100%",
  height: "inherit",
  display: "flex",
  listStyle: "none",
  overflowX: "scroll",
  overflowY: "hidden",
  padding: 0,
  "::-webkit-scrollbar": {
    width: 0,
    background: "transparent"
  },
  margin: 0,
  " > li:first-of-type > img": {
    height: "auto"
  },
  " > li:last-of-type > img": {
    height: "auto"
  }
});

const Item = styled("li")({}, ({}) => ({
  height: "100%",
  width: "100%"
}));

const Image = styled("img")({}, ({ maxWidth }) => ({
  width: "auto",
  height: "100%",
  maxHeight: MAX_HEIGHT,
  maxWidth
}));

const Thumbnail = styled("div")({
  marginRight: 10,
  cursor: "pointer",
  "> img ": {
    height: 40,
    width: 40
  }
});

const Description = styled("div")({
  ...BASE_TEXT,
  marginTop: 20
});

const StyledDivider = styled(Divider)({
  marginTop: 20,
  marginBottom: 20
});

const SectionHeader = styled("div")({
  marginBottom: 10
});

const SectionLabel = styled("span")({
  ...BASE_TEXT,
  fontWeight: WEIGHT.BOLD,
  fontSize: 11,
  color: DETROIT,
  textTransform: "uppercase"
});

const BigStyledButton = styled(StyledButton)({
  height: 50,
  width: 200,
  textTransform: "uppercase"
});

export const PostContext = React.createContext({});

const Post = ({ isModal, slug, thumbs }) => {
  // const
  //   const isTabletOrMobile = useMediaQuery({ query: "(max-width: 800px)" });

  const router = useRouter();

  const querySlug = isModal ? slug : router.query.slug;
  const { loading, error, data, fetchMore } = useQuery(POST_QUERY, {
    variables: { slug: querySlug }
  });

  const el = useRef(null);

  const [imageWidth, setImageWidth] = useState(null);
  const [imageHeight, setImageHeight] = useState(MAX_HEIGHT);

  const imageRefs = {};

  const setDimensions = () => {
    if (el.current) {
      setImageWidth(el.current.clientWidth);
      setImageHeight(Object.values(imageRefs)[0].current.clientHeight);
    }
  };

  useEffect(() => {
    setDimensions();
  }, [el.current]);

  useEffect(() => {
    if (isModal) {
      setDimensions();
    }
  }, [data.post]);

  useEffect(() => {
    window.addEventListener("resize", setDimensions);
    return () => {
      window.removeEventListener("resize", setDimensions);
    };
  }, []);

  const galleryThumbs = isModal
    ? thumbs
    : data.post
    ? data.post.galleryThumbs
    : [];

  galleryThumbs.map((thumb, index) => {
    imageRefs[index] = useRef();
  });

  return (
    <PostContext.Provider value={{ postSlug: querySlug }}>
      <StyledContainer isModal={isModal}>
        {!loading && data.post && (
          <Fragment>
            <HeaderWrapper>
              <Header
                thumbnail={data.post.thumbnail}
                name={data.post.name}
                link={data.post.link}
                tagline={data.post.tagline}
                topics={data.post.topics}
              />
            </HeaderWrapper>
            <BodyWrapper>
              <StyledMain>
                <StyledPanel>
                  <GalleryWrapper ref={el}>
                    <Gallery width={imageWidth} height={imageHeight}>
                      <List>
                        {galleryThumbs.map((image, index) => {
                          return (
                            <Item>
                              <Image
                                ref={imageRefs[index]}
                                src={image}
                                maxWidth={imageWidth}
                              />
                            </Item>
                          );
                        })}
                      </List>
                    </Gallery>
                    <Thumbnails>
                      {galleryThumbs.map((image, index) => (
                        <Thumbnail
                          onClick={() =>
                            imageRefs[index].current.scrollIntoView()
                          }
                        >
                          <img src={image} />
                        </Thumbnail>
                      ))}
                    </Thumbnails>
                  </GalleryWrapper>
                  <StyledDivider />
                  <Description>{data.post.description}</Description>
                </StyledPanel>
                <SectionHeader>
                  <SectionLabel>Discussion</SectionLabel>
                </SectionHeader>
                <Section>
                  <Panel>
                    <CommentFormWrapper position={TOP}>
                      <CommentForm postId={data.post.id} />
                    </CommentFormWrapper>
                    <CommentList comments={data.post.comments} />
                    {data.post.comments.length > 3 && (
                      <CommentFormWrapper position={BOTTOM}>
                        <CommentForm postId={data.post.id} />
                      </CommentFormWrapper>
                    )}
                  </Panel>
                </Section>
                {/* <SectionHeader>
                <SectionLabel>JSON</SectionLabel>
              </SectionHeader>
              <Section>
                <Panel>{JSON.stringify(data.post)}</Panel>
              </Section> */}
              </StyledMain>
              <Aside>
                <BigStyledButton>Upvote</BigStyledButton>
                <StyledDivider />
                <Creators
                  submitter={data.post.submitter}
                  creators={data.post.creators}
                />
              </Aside>

              {/* {isTabletOrMobile ? "Mobile" : "Desktop"} */}
              {/* <Main>{JSON.stringify(post)}</Main> */}
              {/* <Aside>Side Panel</Aside> */}
            </BodyWrapper>
          </Fragment>
        )}
      </StyledContainer>
    </PostContext.Provider>
  );
};

export default Post;
