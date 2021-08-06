import React, { useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import { useQuery } from '@apollo/react-hooks';

import { OffenderQuery as query } from '../../../../../graphql/offenders/queries';
import OffenderImage from '../../../global/OffenderImage/OffenderImage';
import OffenderAvatar from '../../../global/OffenderAvatar/OffenderAvatar';
import { builds, races, genders, ages } from '../../../../../enums';
import { ItemText, ItemHeader } from '../../../../global/typography';
import { useStoreActions } from '../../../../../state';

const Page = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 30px;
  margin-bottom: 60px;
`;
const OffenderName = styled(Typography)`
  margin-bottom: 10px;
  text-align: center;
`;
const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const Container = styled.div`
  width: 100%;
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

const ViewOffender = ({ setBackLinkTo, basePath, match }) => {
  const toggleLightbox = useStoreActions(
    actions => actions.theme.toggleLightBox
  );

  // effects
  useEffect(() => {
    setBackLinkTo(`${basePath}/offenders`);
    return () => setBackLinkTo('');
  });

  // queries
  const { data, loading } = useQuery(query, {
    variables: { id: match.params.offenderId },
    fetchPolicy: 'cache-and-network'
  });

  let buildValue, genderValue, raceValue, ageValue, lightBoxImages;
  if (!loading) {
    if (!!data.offender.build)
      buildValue = builds.find(({ value }) => value === data.offender.build)
        .label;
    if (!!data.offender.gender)
      genderValue = genders.find(({ value }) => value === data.offender.gender)
        .label;
    if (!!data.offender.race)
      raceValue = races.find(({ value }) => value === data.offender.race).label;
    if (!!data.offender.age)
      ageValue = ages.find(({ value }) => value === data.offender.age).label;
    if (!!data.offender.images) {
      lightBoxImages = data.offender.images.map(({ url }) => url);
    } else {
      lightBoxImages = [];
    }
  }

  return loading ? (
    <div />
  ) : (
    <Page>
      {!!data.offender.images && data.offender.images.length > 0 ? (
        <OffenderImage
          url={data.offender.images[0].url}
          onClick={() => toggleLightbox(lightBoxImages)}
        />
      ) : (
        <OffenderAvatar id={data.offender.id} />
      )}
      <OffenderName variant="h6">{data.offender.name}</OffenderName>
      <Row>
        <FieldContainer>
          <ItemHeader center>Build</ItemHeader>
          <ItemText center>{buildValue}</ItemText>
        </FieldContainer>
        <FieldContainer>
          <ItemHeader center>Gender</ItemHeader>
          <ItemText center>{genderValue}</ItemText>
        </FieldContainer>
      </Row>
      <Row>
        <FieldContainer>
          <ItemHeader center>Ethnicity</ItemHeader>
          <ItemText center>{raceValue}</ItemText>
        </FieldContainer>
        <FieldContainer>
          <ItemHeader center>Age</ItemHeader>
          <ItemText center>
            {data.offender.dateOfBirth === ''
              ? ageValue
              : data.offender.dateOfBirth === null
                ? 'Unknown'
                : moment(data.offender.dateOfBirth).format('DD/MM/YYYY')}
          </ItemText>
        </FieldContainer>
      </Row>
      <Row>
        <FieldContainer>
          <ItemHeader center>Hair</ItemHeader>
          <ItemText center>
            {data.offender.hair !== null
              ? data.offender.hair !== ''
                ? data.offender.hair
                : 'Unknown'
              : 'Unknown'}
          </ItemText>
        </FieldContainer>
      </Row>
      {data.offender.peculiarities !== null &&
        (data.offender.peculiarities !== '' && (
          <Container>
            <ItemHeader>peculiarities</ItemHeader>
            <ItemText>{data.offender.peculiarities}</ItemText>
          </Container>
        ))}
    </Page>
  );
};

export default ViewOffender;
