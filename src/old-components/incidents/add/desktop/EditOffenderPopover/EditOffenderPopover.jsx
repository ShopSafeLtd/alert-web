import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

import { PopOver, PopOverContainer } from '../../../../global/layout';
import { BackButton } from '../../../../global/actions';
import { isEqual } from 'lodash-es';
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
  id: '',
  name: '',
  gender: '',
  race: '',
  build: '',
  age: '',
  dateOfBirth: '',
  dateSource: '',
  hair: '',
  peculiarities: '',
  pristine: true,
  images: []
};

class EditOffenderPopover extends PureComponent {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    this.props.offender.id !== undefined &&
      this.setState({
        ...this.props.offender
      });
  }

  componentDidUpdate(prevProps) {
    !isEqual(this.props.offender, prevProps.offender) &&
      this.setState({
        ...this.props.offender,
        ageSection:
          this.props.offender.age === '' &&
          this.props.offender.dateOfBirth !== ''
            ? 1
            : this.props.offender.age === '' &&
              this.props.offender.dateOfBirth === ''
              ? 0
              : 2,
        pristine: false
      });
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

  clearState = () => this.setState(initialState);

  render() {
    const { close, open, editNewOffender } = this.props;
    const {
      id,
      name,
      gender,
      race,
      build,
      age,
      dateOfBirth,
      dateSource,
      hair,
      peculiarities,
      images
    } = this.state;

    return (
      <PopOver
        noPadding
        open={open}
        width={800}
        handleClose={close}
        title={'Edit New Offender'}
        actions={[
          <BackButton
            onClick={() => {
              close();
            }}
          >
            Close
          </BackButton>,
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              editNewOffender({
                id,
                name,
                gender,
                race,
                build,
                age,
                dateOfBirth,
                dateSource,
                hair,
                peculiarities,
                images
              });
              close();
            }}
          >
            Save Offender
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

export default EditOffenderPopover;
