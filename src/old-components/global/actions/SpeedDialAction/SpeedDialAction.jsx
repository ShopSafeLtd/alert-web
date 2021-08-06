import React from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

const Row = styled.div`
  position: relative;
`;

const Label = styled(Typography)`
  right: 55px;
  width: 200px;
  top: 11px;
  text-align: right;
  position: absolute;
  align-items: center;
`;

class SpeedDialAction extends React.Component {
  render() {
    const { children, label } = this.props;
    return (
      <Row>
        <Label>{label}</Label>
        {children}
      </Row>
    );
  }
}

export default SpeedDialAction;
