import styled from 'styled-components';

const TransitionContainer = styled.div`
  transition: left 0.5s ease-in;
  left: ${({ position }) => position};
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
`;

export default TransitionContainer;
