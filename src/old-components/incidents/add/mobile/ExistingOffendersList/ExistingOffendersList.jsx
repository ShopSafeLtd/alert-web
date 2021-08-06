import React, { PureComponent } from 'react';
import styled from 'styled-components';

import OffenderItem from '../../../global/OffenderItem/OffenderItem';

const List = styled.div`
  height: calc(100vh - 115px);
  overflow: auto;
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
    this.list.scrollTop + this.list.clientHeight + 1 >=
      this.list.scrollHeight && this.props.loadMore();
  };

  componentWillUnmount() {
    this.list.removeEventListener('scroll', this.onScroll, false);
  }

  render() {
    const { offenders, history } = this.props;
    return (
      <List ref={ref => (this.list = ref)}>
        {offenders.map(offender => (
          <OffenderItem
            key={offender.id}
            offender={offender}
            onClick={() => {
              history.push(
                `/incidents/add/offenders/existing-offenders/${offender.id}`
              );
            }}
          />
        ))}
      </List>
    );
  }
}

export default ExistingOffendersList;
