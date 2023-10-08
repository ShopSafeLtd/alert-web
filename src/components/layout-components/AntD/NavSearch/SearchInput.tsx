/* eslint-disable */

import React, { useState, useRef } from 'react';
import {
  DashboardOutlined,
  AppstoreOutlined,
  AntDesignOutlined,
  FileTextOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { AutoComplete, Input } from 'antd';
import IntlMessage from 'components/util-components/AntD/IntlMessage';
import navigationConfig, {
  NavTree,
  SubMenuItem,
} from 'configs/NavigationConfig';

const getOptionListItem = (navItem: SubMenuItem[], optionTree: any[]) => {
  optionTree = optionTree ? optionTree : [];
  for (const item of navItem) {
    if (item.submenu.length === 0) {
      optionTree.push(navItem);
    }
  }
  return optionTree;
};

function getOptionList(navigationTree: NavTree) {
  let optionTree = [];
  for (const navItem of navigationTree) {
    if (navItem.submenu.length === 0) {
      // ???
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      optionTree.push(navItem);
    }
    if (navItem.submenu.length > 0) {
      getOptionListItem(navItem.submenu, optionTree);
    }
  }
  return optionTree;
}

const optionList = getOptionList(navigationConfig);

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'dashboards':
      return <DashboardOutlined className="text-success" />;
    case 'apps':
      return <AppstoreOutlined className="text-danger" />;
    case 'components':
      return <AntDesignOutlined className="text-primary" />;
    case 'extra':
      return <FileTextOutlined className="text-warning" />;
    default:
      return null;
  }
};

interface searchResultRes {
  value: string;
  label: JSX.Element;
}

const searchResult = () =>
  optionList.map((item) => {
    // ???
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const category = item.key.split('-')[0];
    return {
      // ???
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      value: item.path,
      label: (
        // ???
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <Link to={item.path}>
          <div className="search-list-item">
            <div className="icon">{getCategoryIcon(category)}</div>
            <div>
              <div className="font-weight-semibold">
                {/* // ???
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore */}
                <IntlMessage id={item.title} />
              </div>
              <div className="font-size-sm text-muted">{category} </div>
            </div>
          </div>
        </Link>
      ),
    };
  });

interface Props {
  active?: boolean;
  close?(): void;
  isMobile?: boolean;
  mode?: string;
}

const SearchInput = (props: Props) => {
  const { active, close, isMobile, mode } = props;
  const [value, setValue] = useState('');
  const [options, setOptions] = useState<searchResultRes[]>([]);
  // @ts-expect-error type error
  const inputRef = useRef<Input>(null);

  const onSelect = () => {
    setValue('');
    setOptions([]);
    if (close) {
      close();
    }
  };

  const onSearch = (searchText: string) => {
    setValue(searchText);
    setOptions(!searchText ? [] : searchResult());
  };

  const autofocus = () => {
    inputRef.current!.focus();
  };

  if (active) {
    autofocus();
  }

  return (
    <AutoComplete
      ref={inputRef}
      className={`nav-search-input ${isMobile ? 'is-mobile' : ''} ${
        mode === 'light' ? 'light' : ''
      }`}
      dropdownClassName="nav-search-dropdown"
      options={options}
      onSelect={onSelect}
      onSearch={onSearch}
      value={value}
      filterOption={(inputValue, option) =>
        option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
      }
    >
      <Input
        placeholder="Search..."
        prefix={<SearchOutlined className="mr-0" />}
      />
    </AutoComplete>
  );
};

export default SearchInput;
