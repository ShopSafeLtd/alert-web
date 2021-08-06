import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

import OffenderImage from '../../../offenders/feed/OffenderCardImage/OffenderCardImage';
import { CardPopover, CardPopoverActions } from '../../../global/cards';
import { ages, genders, races, builds } from '../../../../enums';

const OffenderName = styled.h2`
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
`;
const Container = styled.div`
  padding: 1rem 2rem;
`;
const Row = styled.div`
  display: flex;
`;
const Column = styled.div`
  flex: 1;
`;
const OffenderSubtitle = styled.h3`
  font-size: 1.1rem;
  color: #ef5350;
  font-weight: 400;
  margin-bottom: 2rem;
`;
const OffenderText = styled.p`
  font-size: 1rem;
`;
const CloseButton = styled(Button)`
  margin-right: 1rem;
`;

class AlertCardPopover extends React.Component {
  render() {
    const {
      visible,
      close,
      offender: { name, images }
    } = this.props;
    let {
      offender: { age, gender, race, build }
    } = this.props;

    age === undefined
      ? (age = { label: '' })
      : (age = ages.find(obj => obj.value === age));
    gender === undefined
      ? (gender = { label: '' })
      : (gender = genders.find(obj => obj.value === gender));
    race === undefined
      ? (race = { label: '' })
      : (race = races.find(obj => obj.value === race));
    build === undefined
      ? (build = { label: '' })
      : (build = builds.find(obj => obj.value === build));

    return (
      <CardPopover visible={visible} close={close}>
        <OffenderImage images={images} />
        <Container>
          <OffenderName>{name}</OffenderName>
          <Row>
            <Column>
              <OffenderSubtitle>Age</OffenderSubtitle>
              <OffenderText>{age.label}</OffenderText>
            </Column>
            <Column>
              <OffenderSubtitle>Gender</OffenderSubtitle>
              <OffenderText>{gender.label}</OffenderText>
            </Column>
          </Row>
          <Row>
            <Column>
              <OffenderSubtitle>Race</OffenderSubtitle>
              <OffenderText>{race.label}</OffenderText>
            </Column>
            <Column>
              <OffenderSubtitle>Build</OffenderSubtitle>
              <OffenderText>{build.label}</OffenderText>
            </Column>
          </Row>
        </Container>
        <CardPopoverActions
          actions={[
            <CloseButton key={0} onClick={close}>
              Close
            </CloseButton>
          ]}
          mobileText="Close"
          mobileOnClick={close}
        />
      </CardPopover>
    );
  }
}

export default AlertCardPopover;
