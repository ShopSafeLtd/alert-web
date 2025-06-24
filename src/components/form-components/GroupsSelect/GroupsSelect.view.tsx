import type { SizeType } from 'antd/lib/config-provider/SizeContext';
import type { SelectProps } from 'antd/lib/select';
import type { PermissionMethod, PermissionModel } from 'graphql/types';

import { useSchemeGroupsSelectQuery } from '#/components/form-components/GroupsSelect/graphql/queries/__generated__/groups.generated';
import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { userSchemesAtom } from '#/providers/UserProvider/UserProvider';
import { faSquareCheck } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Row, Select, Tooltip, TreeSelect } from 'antd';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import { useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  button: {
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    paddingLeft: 16,
    paddingRight: 16,
  },
  select: {
    '& .ant-select-selector': {
      borderBottomRightRadius: '0px !important',
      borderTopRightRadius: '0px !important',
    },
  },
});

interface Props {
  allowClear?: boolean;
  allowSelectAll?: boolean;
  allowTree?: boolean;
  className?: string;
  maxTagCount?: 'responsive' | number;
  mode?: 'multiple' | 'tags';
  onChange?: (value: string[]) => void;
  onSchemeChange?: (value: string[]) => void;
  permissionsFilter?: {
    allowedMethods: PermissionMethod[];
    model: PermissionModel;
  }[];
  placeholder?: string;
  size?: SizeType;
  style?: React.CSSProperties;
  value?: string[];
}

interface UseUserGroupsProps {
  permissionsFilter?: {
    allowedMethods: PermissionMethod[];
    model: PermissionModel;
  }[];
}

export const useUserGroups = ({ permissionsFilter }: UseUserGroupsProps) => {
  const currentScheme = useAtomValue(currentSchemeIdAtom);

  const { data, loading } = useSchemeGroupsSelectQuery({
    fetchPolicy: 'cache-first',
    variables: {
      where: {
        schemeIds: permissionsFilter ? undefined : [currentScheme],
        schemePermissionFilter: permissionsFilter,
      },
    },
  });

  const schemes =
    data?.userGroupRelay.edges
      .map(({ node }) => node.scheme)
      .filter(
        (value, i, self) =>
          self.findIndex((value2) => value2.id === value.id) === i
      ) ?? [];

  const treeData = schemes
    .map((scheme) => ({
      children:
        data?.userGroupRelay.edges
          .filter((group) => group.node.scheme.id === scheme.id)
          .map((group) => ({
            label: group.node.name,
            value: group.node.id,
          })) ?? [],
      key: `scheme:${scheme.id}`,
      title: scheme.name,
      value: `scheme:${scheme.id}`,
    }))
    .sort((a, b) => a.title.localeCompare(b.title));

  return {
    data,
    loading,
    selectOptions:
      data?.userGroupRelay.edges.map(({ node: group }) => ({
        label: group.name,
        value: group.id,
      })) || [],
    treeData,
  };
};

const GroupsSelect: React.FC<Omit<SelectProps, keyof Props> & Props> = ({
  allowClear,
  allowSelectAll,
  allowTree = false,
  className,
  maxTagCount,
  mode,
  onChange,
  onSchemeChange,
  permissionsFilter,
  placeholder,
  size,
  style,
  value,
  ...props
}) => {
  const intl = useIntl();
  const styles = useStyles();
  const userSchemes = useAtomValue(userSchemesAtom);
  const { loading, selectOptions, treeData } = useUserGroups({
    permissionsFilter,
  });
  const onTreeChange = (items: string[]) => {
    // get schemes
    const schemes = items.filter((item) => item.includes('scheme:'));
    // removed text from IDs
    const schemeIds = schemes.map((scheme) => scheme.split('scheme:')[1]);
    // get all groups for selected schemes
    const schemeGroups = treeData
      .filter((item) => schemes.includes(item.key))
      .flatMap((item) => item.children.map((group) => group.value));
    // get all selected groups
    const groups = items.filter((item) => !item.includes('scheme:'));
    const groupSchemes = treeData
      .filter((item) =>
        groups
          .map((group) =>
            item.children.map((child) => child.value).includes(group)
          )
          .includes(true)
      )
      .map((scheme) => scheme.value.split('scheme:')[1]);
    // merge scheme groups and selected groups
    const mergedGroups = [...schemeGroups, ...groups];
    // merge group schemes and selected schemes
    const mergedSchemes = [...groupSchemes, ...schemeIds];
    if (onChange) onChange(mergedGroups);
    if (onSchemeChange) onSchemeChange(mergedSchemes);
  };

  const selectAll = () => {
    if (onChange) {
      onChange(selectOptions.map((item) => item.value));
    }
  };

  return allowTree && userSchemes.length > 0 ? (
    <Row wrap={false}>
      <Col flex={1}>
        <TreeSelect
          allowClear={allowClear}
          className="connected-select"
          disabled={loading}
          loading={loading}
          maxTagCount={maxTagCount}
          multiple
          onChange={onTreeChange}
          placeholder={placeholder}
          showCheckedStrategy="SHOW_PARENT"
          showSearch
          size={size}
          style={style}
          treeCheckable
          treeData={treeData}
          treeNodeFilterProp="label"
          value={value}
        />
      </Col>
      <Col>
        {allowSelectAll && (
          <Tooltip
            placement="bottom"
            title={intl.formatMessage({
              defaultMessage: 'Select all groups',
            })}
          >
            <Button className={styles.button} onClick={selectAll}>
              <FontAwesomeIcon icon={faSquareCheck} />
            </Button>
          </Tooltip>
        )}
      </Col>
    </Row>
  ) : (
    <Row>
      <Col flex={1}>
        <Select
          allowClear={allowClear}
          className={className ?? allowSelectAll ? styles.select : undefined}
          disabled={loading}
          loading={loading}
          maxTagCount={maxTagCount}
          mode={mode}
          onChange={onChange}
          optionFilterProp="label"
          options={selectOptions}
          placeholder={placeholder}
          size={size}
          style={style}
          value={value}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...props}
        />
      </Col>
      <Col>
        {allowSelectAll && (
          <Tooltip
            placement="bottom"
            title={intl.formatMessage({
              defaultMessage: 'Select all groups',
            })}
          >
            <Button className={styles.button} onClick={selectAll}>
              <FontAwesomeIcon icon={faSquareCheck} />
            </Button>
          </Tooltip>
        )}
      </Col>
    </Row>
  );
};

export default GroupsSelect;
