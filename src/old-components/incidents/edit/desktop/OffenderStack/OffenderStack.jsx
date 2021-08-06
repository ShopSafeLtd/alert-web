import styled from 'styled-components';

const OffenderStack = styled.div`
  overflow: auto;
  margin: 20px 0;
  cursor: pointer;
  height: calc(100% - 50px);
  width: 100%;
  @media (min-width: 1024px) {
    height: calc(100% - 100px);
  }
`;

export default OffenderStack;
