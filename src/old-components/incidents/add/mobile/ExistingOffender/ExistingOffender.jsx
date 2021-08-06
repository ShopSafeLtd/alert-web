import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';

import { OffenderQuery as query } from '../../../../../graphql/offenders/queries';
import OffenderImage from '../../../global/OffenderImage/OffenderImage';
import OffenderAvatar from '../../../global/OffenderAvatar/OffenderAvatar';
import { builds, races, genders, ages } from '../../../../../enums';
import { FullWidthButton } from '../../../../global/actions';
import { ItemHeader, ItemText } from '../../../../global/typography';
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
  margin-top: 10px;
  text-align: center;
  font-size: 20px;
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
const Loading = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const LoadingImage = styled.div`
  height: 200px;
  width: 200px;
  margin: 20px 20px 0;
  background: #f5f5f5;
  border: 1px solid #eeeeee;
`;
const LoadingName = styled.div`
  width: 150px;
  height: 28px;
  margin: 10px 0 14px;
  background: #f5f5f5;
  border-radius: 5px;
`;
const LoadingField = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 0 20px;
`;
const LoadingValue = styled.div`
  margin-bottom: 10px;
  height: 20px;
  width: 80px;
  border-radius: 5px;
  background: #f5f5f5;
`;

const ExistingOffender = ({
  setNavbarAction,
  setBackLinkTo,
  match,
  history,
  addExistingOffenders
}) => {
  const toggleLightbox = useStoreActions(
    actions => actions.theme.toggleLightbox
  );

  // effects
  useEffect(() => {
    setNavbarAction('backLink');
    setBackLinkTo('/incidents/add/offenders/existing-offenders');
    return () => {
      setNavbarAction('default');
      setBackLinkTo('');
    };
  });

  // queries
  const { data, loading } = useQuery(query, {
    variables: {
      id: match.params.id
    },
    fetchPolicy: 'cache-and-network'
  });

  // functions
  const handleNext = offender => {
    if (!loading) {
      addExistingOffenders([offender]);
      history.push('/incidents/add/offenders');
    }
  };

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
    <Loading>
      <LoadingImage />
      <LoadingName />
      <Row>
        <LoadingField>
          <ItemHeader center>Build</ItemHeader>
          <LoadingValue />
        </LoadingField>
        <LoadingField>
          <ItemHeader center>Gender</ItemHeader>
          <LoadingValue />
        </LoadingField>
      </Row>
      <Row>
        <LoadingField>
          <ItemHeader center>Ethnicity</ItemHeader>
          <LoadingValue />
        </LoadingField>
        <LoadingField>
          <ItemHeader center>Age</ItemHeader>
          <LoadingValue />
        </LoadingField>
      </Row>
      <Row>
        <LoadingField>
          <ItemHeader center>Hair</ItemHeader>
          <LoadingValue />
        </LoadingField>
      </Row>
    </Loading>
  ) : (
    <Page>
      {data.offender.images !== undefined && data.offender.images.length > 0 ? (
        <OffenderImage
          url={data.offender.images[0].url}
          onClick={() => toggleLightbox(lightBoxImages)}
        />
      ) : (
        <OffenderAvatar id={match.params.id} />
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
            <ItemHeader center>peculiarities</ItemHeader>
            <ItemText center>{data.offender.peculiarities}</ItemText>
          </Container>
        ))}
      <FullWidthButton
        text="Add To Incident"
        onClick={() => handleNext(data.offender)}
      />
    </Page>
  );
};

export default ExistingOffender;
