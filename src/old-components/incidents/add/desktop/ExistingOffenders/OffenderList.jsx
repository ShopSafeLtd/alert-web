import React, { PureComponent } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: calc(100% - 44px);
  width: 350px;
  border-right: 1px solid #eeeeee;
  overflow: auto;
`;

class OffenderList extends PureComponent {
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

  render() {
    return (
      <Container ref={ref => (this.list = ref)}>
        {this.props.children}
      </Container>
    );
  }
}

export default OffenderList;
