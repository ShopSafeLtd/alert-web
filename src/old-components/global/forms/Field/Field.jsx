import styled from 'styled-components';

const Field = styled.div`
  flex: 1;
  margin-top: 20px;
  margin-bottom: 20px;
  ${({ row, left, mobile }) =>
    row &&
    `
    ${!mobile && '@media (min-width: 1024px) {'}
      width: calc(100% - 10px);
      margin-${left ? 'left' : 'right'}: 10px;
    ${!mobile && '}'}
  `};
`;

export default Field;
