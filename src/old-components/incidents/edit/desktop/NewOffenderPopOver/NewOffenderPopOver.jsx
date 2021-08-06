import React, { Component } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

import AddNewOffender from '../AddNewOffender/AddNewOffender';
import { PopOver, PopOverContainer } from '../../../../global/layout';
import { BackButton } from '../../../../global/actions';

const Grow = styled.div`
  flex: 1;
  width: 100%;
`;
const Spacer = styled.div`
  flex: 1;
  overflow: auto;
`;

const initialState = {
  name: '',
  gender: 'UNKNOWN',
  race: 'UNKNOWN',
  build: 'UNKNOWN',
  age: 'UNKNOWN',
  dateOfBirth: null,
  dateSource: '',
  hair: '',
  peculiarities: ''
};

class AddOffenderPopOver extends Component {
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

  handleClose = () => {
    this.setState(initialState);
    this.props.close();
  };

  render() {
    const { open, addOffender } = this.props;
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

    return (
      <PopOver
        noPadding
        open={open}
        width={800}
        handleClose={this.handleClose}
        title={'Add Offender'}
        actions={[
          <BackButton key={0} onClick={this.handleClose}>
            cancel
          </BackButton>,
          <Button
            key={1}
            variant="contained"
            color="primary"
            onClick={() => {
              addOffender(
                {
                  name,
                  gender,
                  race,
                  build,
                  age,
                  dateOfBirth,
                  dateSource,
                  hair,
                  peculiarities
                },
                'NEW'
              );
              this.setState(initialState);
              this.handleClose();
            }}
          >
            Add Offender
          </Button>
        ]}
      >
        <Grow>
          <PopOverContainer>
            <Spacer>
              <AddNewOffender
                name={name}
                gender={gender}
                race={race}
                build={build}
                age={age}
                dateOfBirth={dateOfBirth}
                dateSource={dateSource}
                hair={hair}
                peculiarities={peculiarities}
                handleChange={this.handleChange}
              />
            </Spacer>
          </PopOverContainer>
        </Grow>
      </PopOver>
    );
  }
}

export default AddOffenderPopOver;
