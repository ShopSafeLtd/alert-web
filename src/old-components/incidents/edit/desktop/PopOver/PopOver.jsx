import styled from 'styled-components';

const PopOver = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  background: #fff;
  box-shadow: rgba(0, 0, 0, 0.26) 0px 2px 5px;
  padding: 40px;
  z-index: 106;
  display: flex;
  flex-direction: column;
  transition: all 0.5s ease;
  ${({ width, open }) => `
    width: ${width}px;
    right: ${open ? 0 : `-${width + 5}px;`}
  `};
`;

export default PopOver;
