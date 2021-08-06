import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { UnapprovedCardOverlay, UnapprovedCardOptions } from '../';

const Awaiting = styled(Typography)`
  color: #fff;
`;
const Text = styled(Typography)`
  color: #fff;
`;

class UnapprovedCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      approving: false
    };
  }

  toggleApproving = () => {
    this.setState({
      approving: !this.state.approving
    });
  };

  render() {
    const {
      decline,
      overlayButtonText,
      optionsTop,
      toggleApprove,
      admin
    } = this.props;
    const { approving } = this.state;

    let actions = [];
    !admin &&
      actions.push(
        <Button
          key={0}
          variant="contained"
          color="primary"
          onClick={() => this.toggleApproving()}
        >
          {overlayButtonText}
        </Button>
      );
    admin &&
      actions.push(<Awaiting variant="h6">Awaiting Approval...</Awaiting>);
    admin &&
      actions.push(
        <Text>Your administrator has not yet approved this alert.</Text>
      );

    return (
      <div>
        <UnapprovedCardOverlay visible={approving} actions={actions} />
        <UnapprovedCardOptions
          visible={approving}
          top={optionsTop}
          cancel={this.toggleApproving}
          approve={toggleApprove}
          decline={decline}
        />
      </div>
    );
  }
}

export default UnapprovedCard;
