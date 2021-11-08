import React, { useState, SetStateAction, useEffect } from 'react';

import {
  Radio,
  Typography,
  Select,
  Checkbox,
  Button,
  Row,
  RadioChangeEvent,
  Drawer,
  Space,
  Col,
} from 'antd';

import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { LocalStorageKeys } from 'types';

const { Option } = Select;

type OrderType = Record<string, 'asc' | 'desc' | undefined>;

interface QueryVariablesType {
  order: OrderType;
  crimeTypes: string[] | undefined | null;
  groups: string[] | undefined | null;
  approved: boolean | undefined | null;
}
interface CrimeTypeType {
  id: string;
  name: string;
  description: string;
}
interface GroupType {
  id: string;
  name: string;
  description: string;
}

interface Props {
  handleClose: () => void;
  open: boolean;
  setQueryVariables: React.Dispatch<SetStateAction<QueryVariablesType>>;
  crimeTypes: CrimeTypeType[] | undefined;
  groups: GroupType[] | undefined;
}

const AlertFilter: React.FC<Props> = ({
  handleClose,
  open,
  setQueryVariables,
  crimeTypes,
  groups,
}) => {
  const [selectedOrder, setSelectedOrder] = useState<OrderType>({
    createdAt: 'desc',
  });
  const [selectedGroups, setSelectedGroups] = useState<string[] | undefined>();
  const [selectedCrimeTypes, setSelectedCrimeTypes] = useState<
    string[] | undefined
  >();
  const [selectedApproval, setSelectedApproval] = useState<
    CheckboxValueType[] | undefined
  >();

  const convertApprovalToBooleanOrUndefined = (
    value: CheckboxValueType[] | undefined
  ) => {
    let booleanOrUndefined;
    if (value?.includes('Approved')) booleanOrUndefined = true;
    if (value?.includes('Awaiting Approval')) booleanOrUndefined = false;
    if (value?.length === 2) booleanOrUndefined = undefined;
    return booleanOrUndefined;
  };

  const arrayOrNull = (
    value: string[] | CheckboxValueType[] | undefined | null
  ) => {
    if (value && value.length > 0) return value as string[];
    return null;
  };

  const actions = {
    onOrderChange: (event: RadioChangeEvent) =>
      setSelectedOrder({ createdAt: event.target.value }),
    onGroupsChange: (value: string[]) => setSelectedGroups(value),
    clearGroups: () => setSelectedGroups(undefined),
    onCrimeTypesChange: (value: string[]) => setSelectedCrimeTypes(value),
    clearCrimeTypes: () => setSelectedCrimeTypes(undefined),
    onApprovedChange: (value: CheckboxValueType[]) =>
      setSelectedApproval(value),
    clearApproval: () => setSelectedApproval(undefined),
    onSubmit: () => {
      const variables = {
        order: selectedOrder,
        crimeTypes: arrayOrNull(selectedCrimeTypes),
        groups: arrayOrNull(selectedGroups),
        approved: convertApprovalToBooleanOrUndefined(selectedApproval),
      };

      setQueryVariables(variables);
      window.localStorage.setItem(
        LocalStorageKeys.INCIDENT_FILTER,
        JSON.stringify(variables)
      );
      handleClose();
    },
    onClose: () => {
      setSelectedOrder({
        createdAt: 'desc',
      });
      setSelectedGroups(undefined);
      setSelectedCrimeTypes(undefined);
      setSelectedApproval(undefined);
      handleClose();
    },
  };

  useEffect(() => {
    const json = window.localStorage.getItem(LocalStorageKeys.INCIDENT_FILTER);
    const filters = json && (JSON.parse(json) as QueryVariablesType | null);
    if (!filters) return;

    setSelectedOrder(filters.order);
    setSelectedGroups(arrayOrNull(filters.groups) || undefined);
    setSelectedCrimeTypes(arrayOrNull(filters.crimeTypes) || undefined);

    let approval: string[] | undefined;
    approval = undefined;
    if (filters.approved === true) approval = ['Approved'];
    if (filters.approved === false) approval = ['Awaiting Approval'];
    setSelectedApproval(approval);
  }, []);

  return (
    <Drawer
      title={<h2 style={{ margin: '0', padding: '0' }}>Sort & Filter</h2>}
      placement="right"
      onClose={actions.onClose}
      visible={open}
      width={480}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          padding: '0 12px',
        }}
      >
        <Typography.Text>
          Select options from below to sort and filter the feed. The filters
          will not be applied until you confirm your selection by pressing the
          'Submit' button at the bottom of the page.
        </Typography.Text>
        <div style={{ margin: '24px 0 16px 0' }}>
          <Row>
            <Typography.Title level={4}>Order</Typography.Title>
          </Row>

          <Radio.Group
            onChange={actions.onOrderChange}
            value={selectedOrder?.createdAt}
          >
            <Space direction="vertical">
              <Radio value={'desc'}>Latest First</Radio>
              <Radio value={'asc'}>Oldest First</Radio>
            </Space>
          </Radio.Group>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <Row>
            <Space align="end">
              <Typography.Title level={4}>Groups</Typography.Title>
            </Space>
            <div style={{ flex: 1 }} />
            <Button type="text" onClick={actions.clearGroups}>
              Clear
            </Button>
          </Row>
          <Select
            mode="multiple"
            placeholder="Select groups..."
            onChange={actions.onGroupsChange}
            style={{ width: '100%' }}
            defaultValue={undefined}
            value={selectedGroups}
            showSearch
            filterOption={(input, option) =>
              option?.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {groups?.map(({ id, name }) => (
              <Option value={id} key={id} title={name}>
                {name}
              </Option>
            ))}
          </Select>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <Row>
            <Space align="end">
              <Typography.Title level={4}>Crime Types</Typography.Title>
            </Space>
            <div style={{ flex: 1 }} />
            <Button type="text" onClick={actions.clearCrimeTypes}>
              Clear
            </Button>
          </Row>
          <Select
            mode="multiple"
            placeholder="Select crime types..."
            onChange={actions.onCrimeTypesChange}
            style={{ width: '100%' }}
            defaultValue={undefined}
            value={selectedCrimeTypes}
            showSearch
            filterOption={(input, option) =>
              option?.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {crimeTypes?.map(({ id, name }) => (
              <Option value={id} key={id} title={name}>
                {name}
              </Option>
            ))}
          </Select>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <Row style={{ marginBottom: '4px' }}>
            <Space align="end">
              <Typography.Title level={4}>Approved</Typography.Title>
            </Space>
            <div style={{ flex: 1 }} />
            <Button type="text" onClick={actions.clearApproval}>
              Clear
            </Button>
          </Row>
          <Checkbox.Group
            value={selectedApproval}
            onChange={actions.onApprovedChange}
          >
            <Space direction="vertical">
              <Checkbox value="Approved">Approved</Checkbox>
              <Checkbox value="Awaiting Approval">Awaiting Approval</Checkbox>
            </Space>
          </Checkbox.Group>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ marginBottom: '16px' }}>
          <Row>
            <Col flex="auto" />
            <Col>
              <Space>
                <Button type="ghost" onClick={actions.onClose}>
                  Cancel
                </Button>
                <Button type="primary" onClick={actions.onSubmit}>
                  Submit
                </Button>
              </Space>
            </Col>
          </Row>
        </div>
      </div>
    </Drawer>
  );
};

export default AlertFilter;
