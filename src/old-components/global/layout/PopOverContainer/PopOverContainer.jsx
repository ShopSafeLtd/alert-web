import styled from 'styled-components';

const PopOverContainer = styled.div`
  ${({ noPadding }) => !noPadding && 'padding: 0 30px;'};
`;

export default PopOverContainer;
