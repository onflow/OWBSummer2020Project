import React, { Fragment } from "react";
import styled from "@emotion/styled";
import { Panel } from "../../shared/library/components/layout";
import UserCard from "../../shared/library/components/cards/user";
import { BASE_TEXT } from "../../shared/style/typography";
import { DETROIT } from "../../shared/style/colors";

const Row = styled("div")();

const Label = styled("div")(
  {
    ...BASE_TEXT,
    color: DETROIT,
    fontSize: 11,
    lineHeight: "16px",
    marginBottom: 10
  },
  ({ marginTop = 0 }) => ({
    marginTop
  })
);

const CreatorList = styled("div")({
  maxHeight: 142,
  overflowY: "scroll",
  " > a:first-of-type": {
    marginTop: 0
  },
  " > a": {
    marginTop: 20
  }
});

const Creators = ({ submitter, creators }) => {
  return (
    <Panel>
      <Label>DISCOVERER</Label>
      <Row>
        <UserCard user={submitter} />
      </Row>
      {creators.length > 0 && (
        <Fragment>
          <Label marginTop={10}>{`${creators.length} CREATOR${
            creators.length > 1 ? "S" : ""
          }`}</Label>
          <CreatorList>
            {creators.map(creator => (
              <UserCard user={creator} />
            ))}
          </CreatorList>
        </Fragment>
      )}
    </Panel>
  );
};

export default Creators;
