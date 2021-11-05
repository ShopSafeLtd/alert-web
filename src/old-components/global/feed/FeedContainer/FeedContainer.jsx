import React from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import WifiIcon from '@material-ui/icons/WifiOff';

import { FAB } from '../../actions/';

const Container = styled.div`
  height: calc(100vh - 112px);
  width: 100%;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  @media (min-width: 1024px) {
    height: calc(100vh - 150px);
  }
`;
const Wrapper = styled.div`
  width: 100%;
`;
const FeedLoading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
`;
const NetworkError = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
`;
const ErrorIcon = styled(WifiIcon)`
  font-size: 32px;
  color: #bdbdbd;
`;
const ErrorText = styled(Typography)`
  font-size: 12px;
  color: #757575;
`;

class FeedContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.feed = React.createRef();
  }

  componentDidMount() {
    this.feed.addEventListener('scroll', this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll = () => {
    !this.props.networkError &&
      this.feed.scrollTop + this.feed.clientHeight + 1000 >=
        this.feed.scrollHeight &&
      this.props.loadMore !== undefined &&
      this.props.loadMore();
  };

  render() {
    const { children, to, text, loading, networkError, retryLoad } = this.props;
    return (
      <Wrapper>
        <Container ref={ref => (this.feed = ref)}>
          {children}
          {loading && (
            <FeedLoading>
              <CircularProgress />
            </FeedLoading>
          )}
          {networkError && (
            <NetworkError>
              <ErrorIcon />
              <ErrorText variant="caption">
                Cannot load more while you are offline
              </ErrorText>
              <Button color="primary" onClick={retryLoad}>
                Try Again
              </Button>
            </NetworkError>
          )}
        </Container>
        <FAB to={to} icon="add" extended text={`Add ${text}`} />
      </Wrapper>
    );
  }
}

export default FeedContainer;
