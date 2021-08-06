import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

import { PopOver, PopOverContainer } from '../../../../global/layout';
import { BackButton } from '../../../../global/actions';
import AddExistingOffender from '../AddExistingOffenders/AddExistingOffenders';

const Grow = styled.div`
  flex: 1;
  width: 100%;
`;
const Spacer = styled.div`
  flex: 1;
  overflow: auto;
`;

const initialState = {
  currentOffender: ''
};

class ExistingOffenderPopOver extends PureComponent {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  setCurrentOffender = offender =>
    this.setState({
      currentOffender: offender
    });

  handleClose = () => {
    this.setState(initialState);
    this.props.close();
  };

  render() {
    const { open, addOffender, offendersIds } = this.props;
    const { currentOffender } = this.state;

    return (
      <PopOver
        noPadding
        open={open}
        width={1000}
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
              addOffender(currentOffender, 'EXISTING');
              this.setState(initialState);
              this.handleClose();
            }}
          >
            Add Offender
          </Button>
        ]}
      >
        <Grow>
          <PopOverContainer noPadding>
            <Spacer>
              <AddExistingOffender
                setCurrentOffender={this.setCurrentOffender}
                current={currentOffender}
                offendersIds={offendersIds}
              />
            </Spacer>
          </PopOverContainer>
        </Grow>
      </PopOver>
    );
  }
}

export default ExistingOffenderPopOver;
