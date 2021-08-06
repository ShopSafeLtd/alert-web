import React, { PureComponent } from 'react';
import styled from 'styled-components';

import OffenderItem from '../../../global/OffenderItem/OffenderItem';
import { CircularProgress } from '@material-ui/core';

const List = styled.div`
  overflow: auto;
`;
const Loading = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
`;

class ExistingOffendersList extends PureComponent {
  constructor(props) {
    super(props);
    this.list = React.createRef();
  }

  componentDidMount() {
    this.list.addEventListener('scroll', this.onScroll, false);
  }

  onScroll = () => {
    this.list.scrollTop + this.list.clientHeight >= this.list.scrollHeight &&
      this.props.loadMore();
  };

  componentWillUnmount() {
    this.list.removeEventListener('scroll', this.onScroll, false);
  }

  render() {
    const { offenders, history, basePath, loading } = this.props;
    return (
      <List ref={ref => (this.list = ref)}>
        {offenders.map(offender => (
          <OffenderItem
            key={offender.id}
            offender={offender}
            onClick={() => {
              history.push(`${basePath}/offenders/find/${offender.id}`);
            }}
          />
        ))}
        {loading && (
          <Loading>
            <CircularProgress />
          </Loading>
        )}
      </List>
    );
  }
}

export default ExistingOffendersList;
