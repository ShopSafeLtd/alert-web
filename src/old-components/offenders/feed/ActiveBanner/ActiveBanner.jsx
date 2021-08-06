import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

const Banner = styled.div`
  position: absolute;
  background-color: #66bb6a;
  width: auto;
  transform: rotate(-45deg);
  z-index: 5;
  ${({ large }) =>
    large
      ? `
    top: 45px;
    left: -75px;
    padding: 5px 110px;
  `
      : `
    top: 16px;
    left: -33px;
    padding: 5px 40px;
  `};
`;
const Text = styled(Typography)`
  margin: 0;
  display: flex;
  justify-content: center;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`;

class ActiveBanner extends PureComponent {
  render() {
    return this.props.active ? (
      <Banner>
        <Text>Active</Text>
      </Banner>
    ) : (
      <div />
    );
  }
}

export default ActiveBanner;
