import type { SizeType } from 'antd/lib/config-provider/SizeContext';
import type { SelectProps } from 'antd/lib/select';

import { useSchemeGroupsSelectQuery } from '#/components/form-components/GroupsSelect/graphql/queries/__generated__/groups.generated';
import { useStoreState } from '#/state';
import {
  faRectangle,
  faRectangleHistoryCircleUser,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Row, Select, Tooltip, TreeSelect } from 'antd';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';

interface Props {
  allowClear?: boolean;
  allowTree?: boolean;
  className?: string;
  maxTagCount?: 'responsive' | number;
  mode?: 'multiple' | 'tags';
  onChange?: (value: string[]) => void;
  onSchemeChange?: (value: string[]) => void;
  placeholder?: string;
  reportMode?: boolean;
  size?: SizeType;
  style?: React.CSSProperties;
  value?: string[];
}

interface UseUserGroupsProps {
  reportMode?: boolean;
}

export const useUserGroups = ({ reportMode }: UseUserGroupsProps) => {
  const currentScheme = useStoreState((state) => state.scheme.id);

  const { data, loading } = useSchemeGroupsSelectQuery({
    fetchPolicy: 'cache-first',
    variables: {
      where: {
        reportGroupsOnly: reportMode,
        schemeIds: reportMode ? undefined : [currentScheme],
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
  allowTree = false,
  className,
  maxTagCount,
  mode,
  onChange,
  onSchemeChange,
  placeholder,
  reportMode = false,
  size,
  style,
  value,
  ...props
}) => {
  const intl = useIntl();
  const userSchemes = useStoreState((state) => state.user.schemes);
  const { loading, selectOptions, treeData } = useUserGroups({
    reportMode,
  });
  const [treeMode, setTreeMode] = useState(false);

  const toggleTreeMode = () => {
    if (treeMode && onChange) onChange([]);
    setTreeMode(!treeMode);
  };

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

  return allowTree && userSchemes.length > 0 ? (
    <Row wrap={false}>
      {treeMode && (
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
      )}
      {!treeMode && (
        <Col flex={1}>
          <Select
            allowClear={allowClear}
            className="connected-select"
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
      )}
      <Col>
        <Tooltip
          title={
            treeMode
              ? intl.formatMessage({
                  defaultMessage: 'Switch to single scheme reports',
                })
              : intl.formatMessage({
                  defaultMessage: 'Switch to multi scheme reports',
                })
          }
        >
          <Button
            onClick={toggleTreeMode}
            style={{
              borderBottomLeftRadius: 0,
              borderLeft: 0,
              borderTopLeftRadius: 0,
              paddingLeft: 14,
              paddingRight: 14,
            }}
          >
            <FontAwesomeIcon
              icon={treeMode ? faRectangle : faRectangleHistoryCircleUser}
              size="lg"
            />
          </Button>
        </Tooltip>
      </Col>
    </Row>
  ) : (
    <Select
      allowClear={allowClear}
      className={className}
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
  );
};

export default GroupsSelect;
