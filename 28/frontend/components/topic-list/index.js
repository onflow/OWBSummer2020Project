import React from "react";
import styled from "@emotion/styled";
import {
  SidebarSectionHeader,
  SidebarSection
} from "../../shared/library/components/layout";
import { useQuery } from "@apollo/react-hooks";
import TopicTag from "../topic-tag";

export const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  height: 440
});

const TopicList = ({ query, dataKey }) => {
  const { loading, error, data, fetchMore } = useQuery(query, {});
  return (
    <SidebarSection>
      <SidebarSectionHeader>Discover What's Trending! 🥳</SidebarSectionHeader>
      <Container>
        {!loading && data[dataKey].map(topic => <TopicTag {...topic} />)}
      </Container>
    </SidebarSection>
  );
};

export default TopicList;
