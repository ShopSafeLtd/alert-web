import styled from 'styled-components';

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  ${({ row }) => !row && 'flex-direction: column;'}
  ${({ right }) => right && 'justify-content: flex-end;'}
  ${({ vertCenter }) => vertCenter && 'align-items: center;'}
  @media (min-width: 1024px) {
    flex-direction: row;
    ${({ vertCenter, row }) => vertCenter && !row && 'justify-content: center;'}
  }
`;

export default Row;
