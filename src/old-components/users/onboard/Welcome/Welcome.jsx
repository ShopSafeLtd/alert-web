import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';

import logo from '../../../../images/icon-512.png';

const Header = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 40px;
  @media (min-width: 1024px) {
    padding-bottom: 0;
  }
`;
const Logo = styled.img`
  width: 120px;
`;
const HightLight = styled.span`
  color: #f44336;
`;
const Welcome = styled.h1`
  color: #9e9e9e;
  font-size: 3rem;
  font-weight: 400;
  font-family: Chalet;
  margin: 10px 0 0;
  text-align: center;
`;
const SubHeader = styled.h2`
  font-family: Chalet;
  font-weight: 400;
  margin: 0 0 20px;
`;

class OnboardWelcome extends React.Component {
  render() {
    const { handleNext } = this.props;
    return (
      <MediaQuery minDeviceWidth={1024}>
        {matches => (
          <Header>
            <Logo src={logo} alt="ShopSafe Icon" />
            <Welcome>
              Welcome to{' '}
              <span>
                alert
                <HightLight>!</HightLight>
              </span>
            </Welcome>
            <SubHeader>
              Get connected
              <HightLight>!</HightLight> Cut crime
              <HightLight>!</HightLight>
            </SubHeader>
            {matches && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                component={Link}
                to="/onboard/password"
              >
                Get Started
              </Button>
            )}
          </Header>
        )}
      </MediaQuery>
    );
  }
}

export default OnboardWelcome;
