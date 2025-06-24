import { Col, Row, Switch, Tree, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { useFoldersSelectQuery } from './graphql/__generated__/FolderSelectQuery.generated';

interface Props {
  allowClear?: boolean;
  className?: string;
  disabled?: boolean;
  maxTagCount?: 'responsive' | number;
  multiple?: boolean;
  onChange: (value: string[]) => void;
  // selectAllFolders?: boolean;
  style?: React.CSSProperties;
  value?: string[];
}

export const useFoldersData = () => {
  const { data, loading } = useFoldersSelectQuery();

  return {
    data,
    foldersData:
      data?.folders.edges.map(({ node: folder }) => ({
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
      })) || [],
    loading,
    totalCount: data?.folders.totalCount || 0,
  };
};

const FoldersCheck = ({
  className,
  disabled = false,
  onChange,

  // selectAllFolders = undefined,
  style,
  value,
}: Props) => {
  const { data, foldersData, loading, totalCount } = useFoldersData();
  const [selectAllFolders, setSelectAllFolders] = useState<boolean | undefined>(
    undefined
  );
  useEffect(() => {
    if (selectAllFolders) {
      const allFolderIds =
        data?.folders?.edges?.flatMap((edge) => {
          const parentId = edge.node?.id ? [edge.node.id] : [];
          const childIds =
            edge.node?.childFolders?.map((child) => child.id) || [];
          return [...parentId, ...childIds];
        }) || [];
      onChange(allFolderIds);
    } else if (selectAllFolders === false) {
      onChange([]);
    }
  }, [selectAllFolders]);

  return (
    <div style={{ width: '100%' }}>
      <Row style={{ marginLeft: 10 }}>
        <Col>
          <Typography.Text
            // level={5}
            style={{
              marginRight: 8,
            }}
          >
            <FormattedMessage defaultMessage="Select All" />
          </Typography.Text>
        </Col>
        <Col>
          <Switch
            disabled={loading}
            loading={loading}
            onChange={() => setSelectAllFolders(!selectAllFolders)}
          />
        </Col>
      </Row>
      <Tree
        blockNode
        checkable
        checkedKeys={value}
        className={className}
        disabled={loading || totalCount === 0 || disabled}
        height={300}
        // loading={loading}
        onCheck={(checkedKeys) => {
          const keys = Array.isArray(checkedKeys)
            ? checkedKeys
            : checkedKeys.checked;
          console.log('checkedKeys', checkedKeys);
          console.log('keys', keys);

          onChange(keys as string[]);
        }}
        style={style}
        treeData={foldersData}
      />
    </div>
  );
};

export default FoldersCheck;
