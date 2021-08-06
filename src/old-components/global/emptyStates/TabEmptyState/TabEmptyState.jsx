import React from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

const EmptyState = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Text = styled(Typography)`
  margin-bottom: 0;
`;

class TabEmptyState extends React.Component {
  render() {
    const { text, image } = this.props;

    return (
      <EmptyState>
        {image}
        <Text variant="subtitle1">{text}</Text>
      </EmptyState>
    );
  }
}

export default TabEmptyState;
