import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';

import OffenderImage from '../../../global/OffenderImage/OffenderImage';
import OffenderAvatar from '../../../global/OffenderAvatar/OffenderAvatar';
import { builds, races, genders, ages } from '../../../../../enums';
import { FullWidthButton } from '../../../../global/actions';
import { FileButton } from '../../../../global/actions';
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
  color: ${({ disabled }) => (disabled ? '#BDBDBD' : '#EF5350')};
`;
const AddImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Actions = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;
const MenuIcon = styled.svg`
  width: 24px;
  height: 24px;
  margin-right: 5px;
`;

const ViewOffender = ({
  offender,
  history,
  addImage,
  uploadingImage,
  removeOffender,
  addExistingOffenders,
  loading
}) => {
  const setNavbarAction = useStoreActions(
    actions => actions.theme.setNavbarAction
  );
  const setBackLinkTo = useStoreActions(actions => actions.theme.setBackLinkTo);
  const toggleLightbox = useStoreActions(
    actions => actions.theme.toggleLightBox
  );
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    setBackLinkTo('/incidents/add/offenders');
    setNavbarAction('backLink');
    return () => {
      setNavbarAction('default');
      setBackLinkTo('');
    };
    // eslint-disable-next-line
  }, []);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let buildValue, genderValue, raceValue, ageValue, lightBoxImages;
  if (offender.build !== undefined)
    buildValue = builds.find(({ value }) => value === offender.build).label;
  if (offender.gender !== undefined)
    genderValue = genders.find(({ value }) => value === offender.gender).label;
  if (offender.race !== undefined)
    raceValue = races.find(({ value }) => value === offender.race).label;
  if (offender.age !== undefined && offender.age !== '')
    ageValue = ages.find(({ value }) => value === offender.age).label;
  if (offender.images !== undefined) {
    lightBoxImages = offender.images.map(({ url }) => url);
  } else {
    lightBoxImages = [];
  }

  let menuItems = [];
  Number.isInteger(offender.id) &&
    menuItems.push({
      key: 0,
      onClick: () => history.push('/incidents/add/offenders/edit'),
      icon: (
        <MenuIcon>
          <path
            fill="#9E9E9E"
            d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"
          />
        </MenuIcon>
      ),
      text: 'Edit Offender'
    });
  menuItems.push({
    key: 1,
    onClick: () => {
      history.push('/incidents/add/offenders');
      removeOffender(offender.id);
    },
    icon: (
      <MenuIcon>
        <path
          fill="#EF5350"
          d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
        />
      </MenuIcon>
    ),
    text: 'Remove Offender'
  });

  return (
    <Page>
      <Actions>
        <div>
          <Button
            variant="contained"
            color="primary"
            aria-owns={anchorEl ? 'options-menu' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            Options
          </Button>
          <Menu
            id="options-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {menuItems.map(({ key, onClick, icon, text }) => (
              <MenuItem
                key={key}
                onClick={() => {
                  onClick();
                  handleClose();
                }}
              >
                {icon}
                {text}
              </MenuItem>
            ))}
          </Menu>
        </div>
      </Actions>
      {offender.images !== undefined && offender.images.length > 0 ? (
        <OffenderImage
          url={offender.images[0].url}
          onClick={() => toggleLightbox(lightBoxImages)}
        />
      ) : (
        <div>
          <OffenderAvatar id={offender.id} />
          <AddImage
            onChange={value =>
              addImage(value.target.files, {
                id: offender.id,
                images: offender.images,
                name: offender.name
              })
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
        </div>
      )}
      <OffenderName variant="h6">{offender.name}</OffenderName>
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
            {offender.dateOfBirth === ''
              ? ageValue
              : offender.dateOfBirth === null
                ? 'Unknown'
                : moment(offender.dateOfBirth).format('DD/MM/YYYY')}
          </ItemText>
        </FieldContainer>
      </Row>
      <Row>
        <FieldContainer>
          <ItemHeader center>Hair</ItemHeader>
          <ItemText center>
            {offender.hair !== null
              ? offender.hair !== ''
                ? offender.hair
                : 'Unknown'
              : 'Unknown'}
          </ItemText>
        </FieldContainer>
      </Row>
      {offender.peculiarities !== null &&
        (offender.peculiarities !== '' && (
          <Container>
            <ItemHeader>peculiarities</ItemHeader>
            <ItemText>{offender.peculiarities}</ItemText>
          </Container>
        ))}
      <FullWidthButton
        left
        text="Back To Offenders"
        onClick={() => history.push('/incidents/add/offenders')}
        disabled={uploadingImage}
      />
    </Page>
  );
};

export default ViewOffender;
