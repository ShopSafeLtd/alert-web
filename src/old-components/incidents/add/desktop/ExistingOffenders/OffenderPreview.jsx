import React from "react";
import styled from "styled-components";
import moment from "moment";
import Typography from "@material-ui/core/Typography";
import { Container, CircularProgress } from "@material-ui/core";

import {
  ageValues,
  buildValues,
  genderValues,
  raceValues,
} from "graphql-src/offenders/enums";
import OffenderImage from "../../../global/OffenderImage/OffenderImage";
import { ItemText } from "../../../../global/typography";
import { useStoreActions } from "../../../../../state";

const Preview = styled.div`
  flex: 1;
  padding: ${({ noPadding }) => (noPadding ? 0 : "0 40px 20px")};
  height: ${({ fullHeight }) => (fullHeight ? "100%" : "calc(100% - 62px)")};
  overflow: auto;
  position: relative;
`;
const Loading = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Actions = styled.div`
  position: absolute;
  top: 0;
  right: 5px;
`;
const OffenderName = styled(Typography)`
  margin: 10px 0 5px;
`;
const Row = styled.div`
  display: flex;
  justify-content: center;
`;
const FieldContainer = styled.div`
  margin: 0 0 20px;
  flex: 1;
  ${({ center }) =>
    center &&
    `
    display: flex;
    flex-direction: column;
    align-items: center;
  `};
`;
const ItemHeader = styled(Typography)``;

const OffenderPreview = ({ offender, actions, noPadding, fullHeight }) => {
  const toggleLightbox = useStoreActions(
    (actions) => actions.theme.toggleLightBox
  );

  let buildValue, genderValue, raceValue, ageValue, lightBoxImages;
  if (!!offender) {
    buildValue = buildValues.find(
      ({ value }) => value === offender?.build
    )?.label;
    genderValue = genderValues.find(
      ({ value }) => value === offender?.gender
    )?.label;
    raceValue = raceValues.find(({ value }) => value === offender?.race)?.label;
    ageValue = ageValues.find(({ value }) => value === offender?.age)?.label;
  }

  if (!!offender && offender.images) {
    lightBoxImages = offender?.images?.map(({ url }) => url);
  } else {
    lightBoxImages = [];
  }

  return !!offender ? (
    <Preview noPadding={noPadding} fullHeight={fullHeight}>
      <Actions>{actions}</Actions>
      <Row>
        {offender.images !== undefined && offender.images.length > 0 && (
          <OffenderImage
            url={offender.images[0].url}
            onClick={() => toggleLightbox(lightBoxImages)}
          />
        )}
      </Row>
      <Container>
        <OffenderName variant="h6">
          {offender.name === "" ? "Unidentified Offender" : offender.name}
        </OffenderName>
        <Row>
          <FieldContainer>
            <ItemHeader variant="subtitle2">Build</ItemHeader>
            <ItemText>{!!offender.build ? buildValue : "Unknown"}</ItemText>
          </FieldContainer>
          <FieldContainer>
            <ItemHeader variant="subtitle2">Gender</ItemHeader>
            <ItemText>{!!offender.gender ? genderValue : "Unknown"}</ItemText>
          </FieldContainer>
          <FieldContainer>
            <ItemHeader variant="subtitle2">Ethnicity</ItemHeader>
            <ItemText>{!!offender.race ? raceValue : "Unknown"}</ItemText>
          </FieldContainer>
        </Row>
        <Row>
          <FieldContainer>
            <ItemHeader variant="subtitle2">Height</ItemHeader>
            <ItemText>Unknown</ItemText>
          </FieldContainer>
          <FieldContainer>
            <ItemHeader variant="subtitle2">Age</ItemHeader>
            <ItemText>
              {!!offender.age || !!offender.dateOfBirth
                ? ageValue !== "UNKNOWN"
                  ? ageValue
                  : offender.dateOfBirth === null
                  ? "Unknown"
                  : moment(offender.dateOfBirth).format("DD/MM/YYYY")
                : "Unknown"}
            </ItemText>
          </FieldContainer>
          <FieldContainer>
            <ItemHeader variant="subtitle2">Hair</ItemHeader>
            <ItemText>
              {!!offender.hair
                ? offender.hair !== ""
                  ? offender.hair
                  : "Unknown"
                : "Unknown"}
            </ItemText>
          </FieldContainer>
        </Row>
        <FieldContainer>
          <ItemHeader variant="subtitle2">peculiarities</ItemHeader>
          <ItemText>
            {!!offender.peculiarities ? offender.peculiarities : "Unknown"}
          </ItemText>
        </FieldContainer>
      </Container>
    </Preview>
  ) : (
    <Loading>
      <CircularProgress />
    </Loading>
  );
};

export default OffenderPreview;
