import React, { PureComponent } from 'react';
import Button from '@material-ui/core/Button';

import { PopOver } from '../../../../global/layout';
import { BackButton } from '../../../../global/actions';
import ExistingOffenderQuery from '../ExistingOffenders/ExistingOffenders';

class ExistingOffenderPopover extends PureComponent {
  handleClickOutside = evt => {
    if (this.props.open) {
      this.props.close();
    }
  };

  close = () => {
    this.setState({
      selected: []
    });
    this.props.close();
  };

  render() {
    const {
      open,
      close,
      addExistingOffenders,
      existingOffenders,
      userId
    } = this.props;
    const { selected, currentOffender } = this.state;

    let actions = [];
    actions.push(
      <BackButton key={0} onClick={close}>
        Cancel
      </BackButton>
    );
    actions.push(
      <BackButton
        key={1}
        variant={selected.length === 0 ? 'contained' : 'text'}
        color="primary"
        onClick={() => {
          addExistingOffenders([currentOffender]);
          this.close();
        }}
      >
        Add Offender
      </BackButton>
    );
    selected.length > 0 &&
      actions.push(
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            addExistingOffenders(selected);
            this.close();
          }}
        >
          Add Selected Offenders
        </Button>
      );

    return (
      <PopOver
        noPadding
        open={open}
        width={1000}
        handleClose={close}
        title={'Add Existing Offender'}
        actions={actions}
      >
        <ExistingOffenderQuery
          setCurrentOffender={this.setCurrentOffender}
          current={currentOffender}
          toggleSelected={this.toggleSelectedOffenders}
          existingOffenders={existingOffenders}
          selected={selected}
          userId={userId}
          close={close}
        />
      </PopOver>
    );
  }
}

export default ExistingOffenderPopover;
