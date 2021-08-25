import React, { PureComponent } from "react";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";

const Banner = styled.div`
  position: absolute;
  background-color: #ef5350;
  width: auto;
  transform: rotate(-45deg);
  z-index: 5;
  ${({ large }) =>
    large
      ? `
      top: 25px;
      left: -95px;
      padding: 5px 110px;
  `
      : `
    top: 23px;
    left: -30px;
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

class BannedBanner extends PureComponent {
  render() {
    return this.props.banned ? (
      <Banner large={this.props.large}>
        <Text>Banned</Text>
      </Banner>
    ) : (
      <div />
    );
  }
}

export default BannedBanner;

// top: 37px;
// left: -51px;
// padding: 5px 76px;
