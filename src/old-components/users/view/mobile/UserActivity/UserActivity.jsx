import React, { PureComponent } from 'react';
import styled from 'styled-components';

import moment from 'moment';
import Typography from '@material-ui/core/Typography';

const Page = styled.div`
  height: calc(100vh - 160px);
  overflow: auto;
  padding: 10px 20px;
  width: 100%;
`;
const Row = styled.div`
  display: flex;
  width: 100%;
  margin: 5px 0;
`;
const StatContainer = styled.div`
  flex: 1;
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StatTitle = styled(Typography)`
  text-align: center;
  margin: 0;
`;
const StatText = styled(Typography)`
  text-align: center;
  color: #ef5350;
  width: 100%;
  margin: 5px 0 0;
  font-size: 22px;
`;
const SkeletonText = styled.div`
  height: 29px;
  width: 70%;
  border-radius: 2px;
  background-color: #ef9a9a;
`;

class UserActivity extends PureComponent {
  constructor(props) {
    super(props);
    this.page = React.createRef();
  }

  componentDidMount() {
    this.page.addEventListener('scroll', this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll = () => {
    this.page.scrollTop + this.page.clientHeight >= this.page.scrollHeight &&
      this.props.loadMore !== undefined &&
      this.props.loadMore();
  };

  render() {
    const { auth0User, loading } = this.props;
    return (
      <Page ref={ref => (this.page = ref)}>
        <Row>
          <StatContainer>
            <StatTitle variant="body2">Total Logins</StatTitle>
            {loading ? (
              <SkeletonText />
            ) : (
              <StatText variant="h5">
                {!!auth0User.auth0User
                  ? !!auth0User.auth0User.loginCount
                    ? auth0User.auth0User.loginCount
                    : 0
                  : 0}
              </StatText>
            )}
          </StatContainer>
          <StatContainer>
            <StatTitle variant="body2">Last Login</StatTitle>
            {loading ? (
              <SkeletonText />
            ) : (
              <StatText variant="h5">
                {!!auth0User.auth0User
                  ? !!auth0User.auth0User.lastLogin
                    ? moment(auth0User.auth0User.lastLogin).format('DD/MM/YYYY')
                    : '--'
                  : '--'}
              </StatText>
            )}
          </StatContainer>
        </Row>
      </Page>
    );
  }
}

export default UserActivity;
