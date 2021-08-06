import React from 'react';
import styled from 'styled-components';
import SortSvg from '@material-ui/icons/Sort';
import FilterSvg from '@material-ui/icons/FilterList';

import { MenuButton } from '../../actions';

const SortIcon = styled(SortSvg)`
  margin-right: 5px;
`;
const FilterIcon = styled(FilterSvg)`
  margin-right: 5px;
`;
const Actions = styled.div`
  position: relative;
  display: flex;
  padding: 10px 10px 0 10px;
`;

class FeedActions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchOpen: false
    };
  }

  toggleSearch = () => {
    this.setState({
      searchOpen: !this.state.searchOpen
    });
  };

  render() {
    const { sortItems, filterItems, disabled } = this.props;
    return (
      <Actions>
        <MenuButton id="sort-menu" menuItems={sortItems} disabled={disabled}>
          <SortIcon />
          sort
        </MenuButton>
        <MenuButton
          id="filter-menu"
          menuItems={filterItems}
          disabled={disabled}
        >
          <FilterIcon />
          filter
        </MenuButton>
      </Actions>
    );
  }
}

export default FeedActions;
