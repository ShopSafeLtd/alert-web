import styled from 'styled-components';

const Svg = styled.svg`
  ${({ width, height }) => `
    width: ${width};
    height: ${height};
  `};
`;

export default Svg;
