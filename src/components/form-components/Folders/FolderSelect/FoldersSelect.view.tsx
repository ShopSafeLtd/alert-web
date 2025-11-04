import { TreeSelect } from 'antd';
import React, { useState } from 'react';

import { useFoldersSelectQuery } from './graphql/__generated__/FolderSelectQuery.generated';

interface Props {
  allowClear?: boolean;
  className?: string;
  defaultOpen?: boolean;
  disabled?: boolean;
  maxTagCount?: 'responsive' | number;
  multiple?: boolean;
  onChange?: (value: string) => void;
  parentFolderId?: string;
  placeholder?: string;
  showSearch?: boolean;
  style?: React.CSSProperties;
  value?: string;
}
interface TreeData {
  children: {
    key: string;
    title: string;
    value: string;
  }[];

  key: string;
  title: string;
  value: string;
}

const FoldersSelect = ({
  allowClear,
  className,
  defaultOpen = false,
  disabled = false,
  maxTagCount,
  multiple = false,
  onChange,
  parentFolderId,
  placeholder,
  showSearch,
  style,
  value,
}: Props) => {
  const [options, setOptions] = useState<TreeData[]>([]);

  const { loading } = useFoldersSelectQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: ({ folders }) => {
      const dataFormatted = folders.edges.map(({ node: folder }) => ({
        children:
          folder.childFolders && folder.childFolders.length > 0
            ? folder.childFolders.map((el) => ({
                key: el.id,
                title: el.name,
                value: el.id,
              }))
            : [],
        key: folder.id,
        title: folder.name,
        value: folder.id,
      }));
      setOptions(dataFormatted);
    },
    variables: {
      where: {
        OR: parentFolderId
          ? [
              {
                parentFolderId: parentFolderId
                  ? { equals: parentFolderId }
                  : undefined,
              },
              { id: parentFolderId ? { equals: parentFolderId } : undefined },
            ]
          : undefined,
      },
    },
  });

  return (
    <TreeSelect
      allowClear={allowClear}
      className={className}
      defaultOpen={!!parentFolderId || defaultOpen}
      defaultValue={value}
      disabled={loading || disabled}
      loading={loading}
      maxTagCount={maxTagCount}
      multiple={multiple}
      onChange={onChange}
      placeholder={placeholder}
      showSearch={showSearch}
      style={style}
      treeData={options}
      value={value}
    />
  );
};

export default FoldersSelect;
