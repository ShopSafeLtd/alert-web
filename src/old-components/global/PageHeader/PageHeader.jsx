import React from 'react';
import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';

const Header = styled.div`
  padding: 2rem;
  background-color: #fff;
  display: flex;
  position: relative;
`;
const UserName = styled.h1`
  font-size: 1.5rem;
  line-height: 1.6rem;
  margin: 0;
  color: rgba(0, 0, 0, 0.87);
`;
const Organisation = styled.h2`
  font-size: 1.1rem;
  margin: 0;
  margin-left: 1px;
`;
const Initials = styled.span`
  width: 50px;
  height: 50px;
  margin-right: 1rem;
  border-radius: 100%;
  background-color: #f44336;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 500;
  font-size: 19px;
`;
const FAB = styled(Fab)`
  position: absolute;
  bottom: -20px;
  right: 65px;
`;

class PageHeader extends React.PureComponent {
  render() {
    const { fabIcon, fabAction, fullName, initials, organisation } = this.props;
    return (
      <Header>
        <Initials>{initials}</Initials>
        <div>
          <UserName>{fullName}</UserName>
          <Organisation>{organisation}</Organisation>
        </div>
        <FAB size="small" color="primary" onClick={fabAction}>
          {fabIcon}
        </FAB>
      </Header>
    );
  }
}

export default PageHeader;
