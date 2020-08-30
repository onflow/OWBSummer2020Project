import React, { Fragment } from "react";
import { useQuery } from "@apollo/react-hooks";
import { SECTIONS_QUERY } from "../../data/queries";
import Section from "../section";
import SkeletonSection from "../../components/skeletons/section";
import useInfiniteScroll from "../../shared/hooks/infinite-scroll";

const Sections = () => {
  const { loading, error, data, fetchMore } = useQuery(SECTIONS_QUERY, {
    variables: { first: 8, skip: 0 }
  });

  const onLoadMore = cb => {
    fetchMore({
      variables: {
        skip: data.sections ? data.sections.length : 0
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        cb();
        return Object.assign({}, prev, {
          sections: [...prev.sections, ...fetchMoreResult.sections]
        });
      }
    });
  };

  const [isLoading, setIsLoading] = useInfiniteScroll(() => {
    setTimeout(() => {
      onLoadMore(() => setIsLoading(false));
    }, 2000);
  });

  const sections = data.sections || [];

  return (
    <Fragment>
      {sections.map(({ id, date, posts }) => (
        <Section key={id} date={date} posts={posts} />
      ))}
      {isLoading && <SkeletonSection />}
    </Fragment>
  );
};

export default Sections;
