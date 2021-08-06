import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 20px 0;
`;

const DateLine = styled.div`
  width: 60px;
  border-top: 1px solid #e0e0e0;
`;

const Date = styled(Typography)`
  margin: 0 10px;
`;

class MessageDate extends PureComponent {
  render() {
    const { children } = this.props;
    return (
      <Container>
        <DateLine />
        <Date variant="caption">{children}</Date>
        <DateLine />
      </Container>
    );
  }
}

export default MessageDate;
