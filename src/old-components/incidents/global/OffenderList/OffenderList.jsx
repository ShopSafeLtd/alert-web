import React, { PureComponent } from 'react';
import styled from 'styled-components';

const List = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid #eeeeee;
  height: 100%;
  min-width: 250px;
  max-width: 250px;
  overflow: auto;
  height: calc(100vh - 200px);
`;

class OffenderList extends PureComponent {
  constructor(props) {
    super(props);
    this.list = React.createRef();
  }

  componentDidMount() {
    this.list.addEventListener('scroll', this.onScroll, false);
  }

  componentWillUnmount() {
    this.list.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll = () => {
    this.list.scrollTop + this.list.clientHeight >= this.list.scrollHeight &&
      this.props.loadMore();
  };

  render() {
    const { children } = this.props;
    return <List ref={ref => (this.list = ref)}>{children}</List>;
  }
}

export default OffenderList;
