import React from 'react';
import { Card } from 'antd';

class CardContainer extends React.Component {
  render() {
    const { children } = this.props;
    return <Card className="feed-card">{children}</Card>;
  }
}

export default CardContainer;
