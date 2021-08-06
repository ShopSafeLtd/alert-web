import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
const Text = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #424242;
  margin: 0.5rem 0 2rem;
`;
const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;
const Action = styled.div`
  margin-right: 1rem;
`;

let key = 0;

class EmptyState extends React.PureComponent {
  render() {
    const { image, text, actions } = this.props;
    return (
      <Container>
        <div>{image}</div>
        <Text>{text}</Text>
        <Actions>
          {actions === undefined
            ? null
            : actions.map(action => {
                key = key + 1;
                return <Action key={key}>{action}</Action>;
              })}
        </Actions>
      </Container>
    );
  }
}

export default EmptyState;
