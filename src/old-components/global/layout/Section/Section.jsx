import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';

const Section = styled(Paper)`
  ${({ noPadding }) => !noPadding && 'padding: 10px 20px;'};
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  ${({ grow }) => grow && 'flex: 1;'};
  @media (max-width: 1024px) {
    border-radius: 0;
    box-shadow: none;
  }
  @media (min-width: 1024px) {
    width: calc(${({ width }) => width} - 20px);
    margin: 20px 10px 0;
    padding: 10px 20px;
  }
`;

export default Section;
