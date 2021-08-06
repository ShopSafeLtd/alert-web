import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';

import { ageValues, buildValues, genderValues, raceValues } from 'graphql-src/offenders/enums';
import OffenderImage from '../OffenderImage/OffenderImage';
import { FileButton } from '../../../global/actions';
import { ItemText } from '../../../global/typography';
import { Container } from '@material-ui/core';
import { useStoreActions } from '../../../../state';

const Preview = styled.div`
  flex: 1;
  padding: ${({ noPadding }) => (noPadding ? 0 : '0 40px 20px')};
  height: ${({ fullHeight }) => (fullHeight ? '100%' : 'calc(100% - 62px)')};
  overflow: auto;
  position: relative;
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
const AddButton = styled.label`
  width: 100px;
  height: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: transparent;
  border: none;
  padding: 8px;
  margin: 5px 5px 0px;
  border-radius: 2px;
  &:hover {
    background: ${({ disabled }) => !disabled && 'rgba(0,0,0,0.02)'};
  }
`;
const AddItemText = styled(Typography)`
  margin: 0;
  font-size: 14px;
  color: ${({ disabled }) => (disabled ? '#BDBDBD' : '#EF5350')};
`;
const AddImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ItemHeader = styled(Typography)``;

const OffenderPreview = ({
  offender: {
    id,
    name,
    images,
    build,
    gender,
    race,
    age,
    hair,
    peculiarities,
    dateOfBirth
  },
  actions,
  addImage,
  uploadingImage,
  noPadding,
  fullHeight
}) => {
  const toggleLightbox = useStoreActions(
    actions => actions.theme.toggleLightBox
  );

  let buildValue, genderValue, raceValue, ageValue, lightBoxImages;
  if (build !== undefined)
    buildValue = buildValues.find(({ value }) => value === build).label;
  if (gender !== undefined)
    genderValue = genderValues.find(({ value }) => value === gender).label;
  if (race !== undefined)
    raceValue = raceValues.find(({ value }) => value === race).label;
  if (age !== undefined && age !== '')
    ageValue = ageValues.find(({ value }) => value === age).label;

  if (images !== undefined) {
    lightBoxImages = images.map(({ url }) => url);
  } else {
    lightBoxImages = [];
  }

  return (
    <Preview noPadding={noPadding} fullHeight={fullHeight}>
      <Actions>{actions}</Actions>
      <Row>
        {images !== undefined &&
          images.length > 0 && (
            <OffenderImage
              url={images[0].url}
              onClick={() => toggleLightbox(lightBoxImages)}
            />
          )}
      </Row>
      {addImage !== undefined &&
        (images !== undefined &&
          images.length === 0 && (
            <AddImage
              onChange={value =>
                addImage(value.target.files, { id, images, name })
              }
            >
              <FileButton
                id="file"
                type="file"
                accept="image/*"
                multiple
                disabled={uploadingImage}
              />
              <AddButton
                component="label"
                disabled={uploadingImage}
                htmlFor="file"
              >
                <AddItemText disabled={uploadingImage}>Add Image</AddItemText>
              </AddButton>
            </AddImage>
          ))}
      <Container>
        <OffenderName variant="h6">
          {name === '' ? 'Unidentified Offender' : name}
        </OffenderName>
        <Row>
          <FieldContainer>
            <ItemHeader variant="subtitle2">Build</ItemHeader>
            <ItemText>{!!build ? buildValue : 'Unknown'}</ItemText>
          </FieldContainer>
          <FieldContainer>
            <ItemHeader variant="subtitle2">Gender</ItemHeader>
            <ItemText>{!!gender ? genderValue : 'Unknown'}</ItemText>
          </FieldContainer>
          <FieldContainer>
            <ItemHeader variant="subtitle2">Ethnicity</ItemHeader>
            <ItemText>{!!race ? raceValue : 'Unknown'}</ItemText>
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
              {!!age && !!dateOfBirth
                ? ageValue !== 'UNKNOWN'
                  ? ageValue
                  : dateOfBirth === null
                    ? 'Unknown'
                    : moment(dateOfBirth).format('DD/MM/YYYY')
                : 'Unknown'}
            </ItemText>
          </FieldContainer>
          <FieldContainer>
            <ItemHeader variant="subtitle2">Hair</ItemHeader>
            <ItemText>
              {!!hair ? (hair !== '' ? hair : 'Unknown') : 'Unknown'}
            </ItemText>
          </FieldContainer>
        </Row>
        <FieldContainer>
          <ItemHeader variant="subtitle2">peculiarities</ItemHeader>
          <ItemText>{!!peculiarities ? peculiarities : 'Unknown'}</ItemText>
        </FieldContainer>
      </Container>
    </Preview>
  );
};

export default OffenderPreview;
