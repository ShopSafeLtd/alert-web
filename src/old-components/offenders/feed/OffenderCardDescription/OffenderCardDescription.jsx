import React from "react";
import styled from "styled-components";
import Moment from "react-moment";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import {
  ageValues,
  buildValues,
  genderValues,
  raceValues,
} from "graphql-src/offenders/enums";

const Description = styled.div`
  height: 187px;
  padding: 10px 20px 0;
  display: flex;
  flex-direction: column;
`;
const Title = styled(Typography)`
  font-weight: 500;
  margin-bottom: 5px;
`;
const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const Column = styled.div`
  padding-right: 1rem;
  margin-bottom: 0.5rem;
  flex: 1;
`;
const Header = styled(Typography)`
  font-weight: 500;
  white-space: nowrap;
`;
const Text = styled(Typography)`
  margin: 0;
  max-height: 20px;
  overflow: hidden;
`;
const Labels = styled.div`
  flex: 1;
  margin-top: 5px;
  display: flex;
  flex-wrap: wrap;
`;
const Label = styled(Typography)`
  background-color: #ef5350;
  border-radius: 25px;
  padding: 5px 10px;
  margin: 0 5px 5px 0;
  color: #fff;
  cursor: pointer;
`;
const Grow = styled.div`
  flex: 1;
`;

class OffenderCardDescription extends React.Component {
  render() {
    const {
      age,
      build,
      dateOfBirth,
      gender,
      name,
      race,
      viewAll,
      offenderWarnings,
      toggleViewLabel,
    } = this.props;

    const buildValue = buildValues.find((obj) => obj.value === build);
    const ageValue = ageValues.find((obj) => obj.value === age);
    const raceValue = raceValues.find((obj) => obj.value === race);
    const genderValue = genderValues.find((obj) => obj.value === gender);

    return (
      <Description>
        <Title variant="h6">{name}</Title>
        <Grow>
          {offenderWarnings?.length > 0 ? (
            <div>
              <Header variant="body2">Offender Warnings</Header>
              <Labels>
                {offenderWarnings.map((label) => (
                  <Label
                    key={label.name}
                    onClick={() => toggleViewLabel(label)}
                    variant="caption"
                  >
                    {label.name}
                  </Label>
                ))}
              </Labels>
            </div>
          ) : (
            <Row>
              <Row>
                {age === null ? (
                  <Column>
                    <Header>DoB:</Header>
                    <Text>
                      <Moment format="DD/MM/YYYY">{dateOfBirth}</Moment>
                    </Text>
                  </Column>
                ) : (
                  <Column>
                    <Header>Age:</Header>
                    <Text>{ageValue.label}</Text>
                  </Column>
                )}
                <Column>
                  <Header>Build:</Header>
                  <Text>{buildValue.label}</Text>
                </Column>
              </Row>
              <Row>
                <Column>
                  <Header>Race:</Header>
                  <Text>{raceValue.label}</Text>
                </Column>
                <Column>
                  <Header>Gender:</Header>
                  <Text>{genderValue.label}</Text>
                </Column>
              </Row>
            </Row>
          )}
        </Grow>
        <Row>
          <Button onClick={viewAll}>View All Details</Button>
        </Row>
      </Description>
    );
  }
}

export default OffenderCardDescription;
