import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MediaQuery from 'react-responsive';

import {
  Row,
  PopOver,
  PopOverHeader,
  PopOverContainer,
  PopOverActions
} from '../../../../global/layout';
import { BackButton } from '../../../../global/actions';
import { DateField, Field, FieldHeader } from '../../../../global/forms';

const Spacer = styled.div`
  flex: 1;
  overflow: auto;
`;
const Grow = styled.div`
  flex: 1;
  overflow: auto;
`;

const initialState = {
  startDate: new Date(),
  endDate: new Date(),
  location: '',
  description: '',
  newExclusion: true,
  pristine: true
};

class AddExclusionPopover extends PureComponent {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidUpdate() {
    if (this.state.pristine && this.props.currentExclusion.id !== undefined) {
      this.setState({
        startDate: new Date(this.props.currentExclusion.startDate),
        endDate: new Date(this.props.currentExclusion.endDate),
        location: this.props.currentExclusion.location,
        description: this.props.currentExclusion.description,
        newExclusion: false,
        pristine: false
      });
    }
  }

  handleChange = (value, field) =>
    this.setState({
      [field]: value,
      pristine: false
    });

  render() {
    const { open, close, addExclusion, updateExclusion } = this.props;
    const {
      startDate,
      endDate,
      description,
      location,
      newExclusion
    } = this.state;

    return (
      <MediaQuery minDeviceWidth={1024}>
        {matches => (
          <PopOver
            noPadding
            open={open}
            width={!matches ? window.innerWidth - 15 : 500}
            handleClose={close}
            title={`${newExclusion ? 'Add' : 'Edit'} Ban`}
            actions={[
              <BackButton onClick={close}>cancel</BackButton>,
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  newExclusion
                    ? addExclusion({
                        startDate,
                        endDate,
                        location,
                        description
                      })
                    : updateExclusion({
                        id: this.props.currentExclusion.id,
                        startDate,
                        endDate,
                        location,
                        description
                      });
                  this.setState({
                    ...initialState
                  });
                  close();
                }}
              >
                {newExclusion ? 'Submit' : 'Save'}
              </Button>
            ]}
          >
            <Grow>
              <PopOverContainer>
                <Spacer>
                  <Row row>
                    <Field row>
                      <FieldHeader>Start Date</FieldHeader>
                      <DateField
                        id="start-date-input"
                        value={startDate}
                        onChange={value =>
                          this.handleChange(value, 'startDate')
                        }
                      />
                    </Field>
                    <Field row left>
                      <FieldHeader>End Date</FieldHeader>
                      <DateField
                        id="end-date-input"
                        value={endDate}
                        onChange={value => this.handleChange(value, 'endDate')}
                      />
                    </Field>
                  </Row>
                  <Field>
                    <FieldHeader>Location</FieldHeader>
                    <TextField
                      id="location-input"
                      value={location}
                      onChange={e =>
                        this.handleChange(e.target.value, 'location')
                      }
                      fullWidth
                    />
                  </Field>
                  <Field>
                    <FieldHeader>Description</FieldHeader>
                    <TextField
                      id="description-input"
                      value={description}
                      onChange={e =>
                        this.handleChange(e.target.value, 'description')
                      }
                      fullWidth
                      multiline
                      rows="4"
                    />
                  </Field>
                </Spacer>
              </PopOverContainer>
            </Grow>
          </PopOver>
        )}
      </MediaQuery>
    );
  }
}

export default AddExclusionPopover;
