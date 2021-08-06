import styled from 'styled-components';
import { Link } from 'react-router-dom';

const MenuItem = styled(Link)`
  background-color: #fff;
  border-bottom: solid 1px #eeeeee;
  padding: 25px 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
`;

export default MenuItem;
