import React from 'react';
import SearchFilterBar from './SearchFilterBar';

interface Props {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  openFilter: () => void;
}
/**
 *
 * @param props - {@link Props}
 * @param props.searchInput - externally managed search input state
 * @param props.setSearchInput - ( input: string ) => void; function to set externally managed input state
 * @param props.openFilter - ( ) => void; function to open the filter modal/drawer
 * @param props.children - rendered on the right of the search bar. The intended purpose is to render a list of applied filters.
 * @returns JSX.Element
 *
 * @description A layout container surrounding the SearchFilterBar component, which adds spacing and a section showing applied filters, which should be rendered as children to this component. Intended to be used in a feed at the top of the view.
 */
const FeedSearchFilter: React.FC<Props> = ({
  searchInput,
  setSearchInput,
  openFilter,
  children,
}) => (
  <div className="feed-search-filter-container">
    <div className="spacer" />
    <div className="search-filter-bar-container">
      <SearchFilterBar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        openFilter={openFilter}
      />
    </div>
    <div className="applied-filters-container">
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div className="applied-filters" onClick={openFilter}>
        {children}
      </div>
    </div>
  </div>
);

export default FeedSearchFilter;
