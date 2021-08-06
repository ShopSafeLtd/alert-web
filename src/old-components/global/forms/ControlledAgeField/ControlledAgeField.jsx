//
import React from 'react';
import Button from '@material-ui/core/Button';
import BackSvg from '@material-ui/icons/ArrowBack';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

import { FieldHeader } from '..';
import { Row } from '../../layout';

const Field = styled.div`
  position: relative;
  transition: height 1s ease;
  width: 100%;
`;

const ReactiveButton = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  position: relative;
`;

const BackButton = styled(Typography)`
  position: absolute;
  top: -18px;
  right: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 0;
  color: #ef5350;
`;

const BackIcon = styled(BackSvg)`
  margin-right: 10px;
  font-size: 16px;
  color: #ef5350 !important;
`;

const Section = styled.div`
  position: absolute;
  width: 100%;
  top: 30px;
  transition: opacity 0.5s ease;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  z-index: ${({ visible }) => (visible ? 1 : -1)};
`;

class ControlledAgeField extends React.Component {
  render() {
    const { dateSection, rangeSection, section, setSection } = this.props;

    let heightStyle;
    if (section === 0) {
      heightStyle = {
        minHeight: '110px',
        overflow: 'hidden'
      };
    } else if (section === 1) {
      heightStyle = {
        minHeight: '200px'
      };
    } else if (section === 2) {
      heightStyle = {
        minHeight: '135px'
      };
    }

    return (
      <Field style={heightStyle}>
        <Row row>
          <FieldHeader>Age</FieldHeader>
        </Row>

        <Section visible={section === 0}>
          <Typography>Do you know the offender's date of birth?</Typography>
          <Row row center>
            <ReactiveButton>
              <Button onClick={() => setSection(1)}>Yes</Button>
            </ReactiveButton>
            <ReactiveButton>
              <Button onClick={() => setSection(2)}>No</Button>
            </ReactiveButton>
          </Row>
        </Section>

        <Section visible={section === 1}>
          <BackButton onClick={() => setSection(0)}>
            <BackIcon /> Back
          </BackButton>
          {dateSection}
        </Section>

        <Section visible={section === 2}>
          <BackButton onClick={() => setSection(0)}>
            <BackIcon /> Back
          </BackButton>
          {rangeSection}
        </Section>
      </Field>
    );
  }
}

export default ControlledAgeField;
