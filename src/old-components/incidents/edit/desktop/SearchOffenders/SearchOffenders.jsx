import React, { PureComponent } from 'react';
import styled from 'styled-components';

const SearchField = styled.input`
  border: none;
  outline: 0;
  background: #fff;
  font-size: 14px;
  &:placeholder {
    font-size: 14px;
  }
`;

const Container = styled.div`
  padding: 10px 0;
  border-right: 1px solid #eeeeee;
  display: flex;
`;

const Svg = styled.svg`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;

class SearchOffenders extends PureComponent {
  render() {
    const { handleSearch, search } = this.props;
    return (
      <Container>
        <Svg viewBox="0 0 24 24">
          <path
            fill="#757575"
            d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
          />
        </Svg>
        <SearchField
          placeholder="Search Offenders..."
          onChange={e => handleSearch(e.target.value)}
          value={search}
        />
      </Container>
    );
  }
}

export default SearchOffenders;
