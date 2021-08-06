import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

import { PopOver, PopOverContainer } from '../../../../global/layout';
import { BackButton } from '../../../../global/actions';
import { NewOffenderForm } from '../../../../forms';

const Form = styled.form`
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`;
const Grow = styled.div`
  flex: 1;
  width: 100%;
`;

const initialState = {
  name: '',
  gender: 'UNKNOWN',
  race: 'UNKNOWN',
  build: 'UNKNOWN',
  age: 'UNKNOWN',
  dateOfBirth: null,
  dateSource: '',
  dateSourceError: null,
  hair: '',
  peculiarities: ''
};

class NewOffenderPopover extends PureComponent {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  handleChange = (value, field) => {
    if (field === 'age') {
      this.setState({
        [field]: value,
        dateOfBirth: '',
        dateSource: ''
      });
    } else if (field === 'dateOfBirth') {
      this.setState({
        [field]: value,
        age: ''
      });
    } else {
      this.setState({
        [field]: value
      });
    }
  };

  onSubmit = () => {
    const {
      name,
      gender,
      race,
      build,
      age,
      dateOfBirth,
      dateSource,
      hair,
      peculiarities
    } = this.state;

    if (!!dateOfBirth && !!dateSource) {
      this.setState({
        dateSourceError: 'Please provide a source for the date of birth'
      });
    } else {
      this.props.addNewOffender({
        name,
        gender,
        race,
        build,
        age,
        dateOfBirth,
        dateSource,
        hair,
        peculiarities
      });
      this.clearState();
      this.props.close();
    }
  };

  clearState = () => this.setState(initialState);

  render() {
    const { close, open } = this.props;
    const {
      name,
      gender,
      race,
      build,
      age,
      dateOfBirth,
      dateSource,
      dateSourceError,
      hair,
      peculiarities
    } = this.state;

    return (
      <PopOver
        open={open}
        noPadding
        width={800}
        handleClose={close}
        title={'Add New Offender'}
        actions={[
          <BackButton key="0" onClick={close}>
            Close
          </BackButton>,
          <Button
            key="1"
            color="primary"
            variant="contained"
            onClick={this.onSubmit}
          >
            Add Offender
          </Button>
        ]}
      >
        <Grow>
          <PopOverContainer>
            <Form>
              <NewOffenderForm
                handleChange={this.handleChange}
                data={{
                  name,
                  gender,
                  race,
                  build,
                  age,
                  dateOfBirth,
                  dateSource,
                  dateSourceError,
                  hair,
                  peculiarities
                }}
              />
            </Form>
          </PopOverContainer>
        </Grow>
      </PopOver>
    );
  }
}

export default NewOffenderPopover;
