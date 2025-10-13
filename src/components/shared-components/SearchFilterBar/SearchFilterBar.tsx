import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  FilterOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Input } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

interface Props {
  openFilter: () => void;
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}
/**
 *
 * @param props - {@link Props}
 * @param props.searchInput - externally managed search input state
 * @param props.setSearchInput - ( input: string ) => void; function to set externally managed input state
 * @param props.openFilter - ( ) => void; function to open the filter modal/drawer
 * @returns JSX.Element
 *
 * @description Provides a search bar (AntD Input) which fires the provided setSearchInput function onChange. The provided openFilter function is fired when the filter icons are clicked.
 */
const SearchFilterBar: React.FC<Props> = ({
  openFilter,
  searchInput,
  setSearchInput,
}: Props) => {
  const intl = useIntl();
  return (
    <div className="search-filter-bar">
      <div className="input-container">
        <Input
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder={intl.formatMessage({
            defaultMessage: 'Search...',
          })}
          prefix={<SearchOutlined className="search-icon" />}
          size="large"
          value={searchInput}
        />
      </div>
      <div className="icons-container" onClick={openFilter}>
        <FilterOutlined className="icon filter" />
        <ArrowUpOutlined className="icon arrow up" />
        <ArrowDownOutlined className="icon arrow down" />
      </div>
    </div>
  );
};

export default SearchFilterBar;
