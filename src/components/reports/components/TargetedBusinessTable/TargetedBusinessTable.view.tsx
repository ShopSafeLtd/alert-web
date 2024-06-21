import React, { useState, useEffect } from 'react';
import {
  Button,
  Table,
  Typography,
  Tooltip,
  Drawer,
  Form,
  Checkbox,
  Row,
  Col,
} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faTrash } from '@fortawesome/pro-light-svg-icons';
import { FormattedMessage, useIntl } from 'react-intl';
import type { ColumnsType, SortOrder } from 'antd/es/table/interface';
import type { MetaData } from '#/views/reports/types';

const { Title, Paragraph } = Typography;

interface TargetedBusinessTableData {
  fullName: string;
  incidentsCreated: number;
  offendersCreated: number;
  lostValue: string;
  recoveredValue: string;
  successRate: string;
  commonLost: string;
  highestValueLost: number;
  avgLost: string;
}

const TargetedBusinessColumns: ColumnsType<TargetedBusinessTableData> = [
  {
    key: 'fullName',
    dataIndex: 'fullName',
    title: <FormattedMessage defaultMessage="Name" />,
    render: (text: string) => (
      <Tooltip title={text}>
        <Paragraph
          style={{ maxWidth: 300, marginBottom: 0 }}
          ellipsis={{
            rows: 1,
          }}
        >
          {text}
        </Paragraph>
      </Tooltip>
    ),
  },
  {
    key: 'incidentsCreated',
    dataIndex: 'incidentsCreated',
    title: <FormattedMessage defaultMessage="Incidents" />,
    defaultSortOrder: 'descend' as SortOrder,
    sorter: (a: TargetedBusinessTableData, b: TargetedBusinessTableData) =>
      a.incidentsCreated - b.incidentsCreated,
  },
  {
    key: 'offendersCreated',
    dataIndex: 'offendersCreated',
    title: <FormattedMessage defaultMessage="Offenders" />,
    sorter: (a: TargetedBusinessTableData, b: TargetedBusinessTableData) =>
      a.offendersCreated - b.offendersCreated,
  },
  {
    key: 'lostValue',
    dataIndex: 'lostValue',
    title: <FormattedMessage defaultMessage="Total Loss" />,
    sorter: (a: TargetedBusinessTableData, b: TargetedBusinessTableData) =>
      Number.parseInt(a.lostValue || '0', 10) -
      Number.parseInt(b.lostValue || '0', 10),
    render: (text: string) => (
      // eslint-disable-next-line formatjs/no-literal-string-in-jsx
      <Typography.Text>{`£${Number.parseInt(text || '0', 10).toFixed(
        0
      )}`}</Typography.Text>
    ),
  },
  {
    key: 'recoveredValue',
    dataIndex: 'recoveredValue',
    title: <FormattedMessage defaultMessage="Recovered value" />,
    sorter: (a: TargetedBusinessTableData, b: TargetedBusinessTableData) =>
      Number.parseInt(a.recoveredValue || '0', 10) -
      Number.parseInt(b.recoveredValue || '0', 10),
    render: (text: string) => (
      // eslint-disable-next-line formatjs/no-literal-string-in-jsx
      <Typography.Text>{`£${Number.parseInt(text || '0', 10).toFixed(
        0
      )}`}</Typography.Text>
    ),
  },
  {
    key: 'successRate',
    dataIndex: 'successRate',
    title: <FormattedMessage defaultMessage="Recovery Rate" />,
    sorter: (a: TargetedBusinessTableData, b: TargetedBusinessTableData) =>
      Number.parseInt(a.successRate || '0', 10) -
      Number.parseInt(b.successRate || '0', 10),
    // eslint-disable-next-line formatjs/no-literal-string-in-jsx
    render: (text: string) => <Typography.Text>{text}%</Typography.Text>,
  },
  {
    key: 'commonLost',
    dataIndex: 'commonLost',
    title: <FormattedMessage defaultMessage="Top Item" />,
    sorter: (a: TargetedBusinessTableData, b: TargetedBusinessTableData) =>
      a.commonLost.localeCompare(b.commonLost),
  },
  {
    key: 'highestValueLost',
    dataIndex: 'highestValueLost',
    title: <FormattedMessage defaultMessage="Highest Value" />,
    sorter: (a: TargetedBusinessTableData, b: TargetedBusinessTableData) =>
      a.highestValueLost - b.highestValueLost,
    // eslint-disable-next-line formatjs/no-literal-string-in-jsx
    render: (text: number) => <Typography.Text>{`£${text}`}</Typography.Text>,
  },
  {
    key: 'avgLost',
    dataIndex: 'avgLost',
    title: <FormattedMessage defaultMessage="Average Loss" />,
    sorter: (a: TargetedBusinessTableData, b: TargetedBusinessTableData) =>
      Number.parseInt(a.avgLost || '0', 10) -
      Number.parseInt(b.avgLost || '0', 10),
    render: (text: string) => (
      // eslint-disable-next-line formatjs/no-literal-string-in-jsx
      <Typography.Text>{`£${Number.parseInt(text || '0', 10).toFixed(
        0
      )}`}</Typography.Text>
    ),
  },
];

interface Props {
  editMode: boolean;
  removeItem: () => void;
  changeSize: (name: string, pageSize: number) => void;
  total: number;
  targetedBusinessData: TargetedBusinessTableData[];
  metadata: MetaData[];
  setMetadata: (arg0: MetaData[]) => void;
}

const TargetedBusinessTable = ({
  removeItem,
  editMode,
  changeSize,
  total,
  targetedBusinessData,
  metadata,
  setMetadata,
}: Props) => {
  const intl = useIntl();
  const [columnDrawerOpen, setColumnDrawerOpen] = useState(false);
  const [metadataColumns, setMetadataColumns] = useState<string[]>([
    'fullName',
    'incidentsCreated',
    'offendersCreated',
    'lostValue',
    'recoveredValue',
    'successRate',
    'commonLost',
    'highestValueLost',
    'avgLost',
  ]);

  useEffect(() => {
    const currentMetadata = metadata.find(
      ({ key }) => key === 'targetedBusinessTable'
    );

    if (currentMetadata?.columns) {
      setMetadataColumns(currentMetadata.columns);
    } else {
      setMetadataColumns([
        'fullName',
        'incidentsCreated',
        'offendersCreated',
        'lostValue',
        'recoveredValue',
        'successRate',
        'commonLost',
        'highestValueLost',
        'avgLost',
      ]);
    }
  }, [metadata]);

  const toggleColumnDrawer = () => setColumnDrawerOpen(!columnDrawerOpen);

  const onFinish = (value: TargetedBusinessTableData) => {
    const columns = [
      { name: 'fullName', active: value.fullName },
      { name: 'incidentsCreated', active: value.incidentsCreated },
      { name: 'offendersCreated', active: value.offendersCreated },
      { name: 'lostValue', active: value.lostValue },
      { name: 'recoveredValue', active: value.recoveredValue },
      { name: 'successRate', active: value.successRate },
      { name: 'commonLost', active: value.commonLost },
      { name: 'highestValueLost', active: value.highestValueLost },
      { name: 'avgLost', active: value.avgLost },
    ]
      .filter(({ active }) => active)
      .map(({ name }) => name);

    const updatedMetadata = metadata.map((item) => {
      if (item.key === 'targetedBusinessTable') {
        return { ...item, columns };
      }
      return item;
    }) satisfies MetaData[];

    setMetadata(updatedMetadata);
  };

  return (
    <>
      <Button
        type="text"
        shape="circle"
        className="card-remove no-print"
        hidden={!editMode}
        icon={<FontAwesomeIcon icon={faTrash} color="red" size="lg" />}
        size="small"
        onClick={removeItem}
      />
      <Button
        type="text"
        shape="circle"
        className="change-graph1 no-print"
        hidden={!editMode}
        icon={<FontAwesomeIcon icon={faCog} size="lg" />}
        size="small"
        onClick={toggleColumnDrawer}
      />
      <Title level={4}>
        {intl.formatMessage({
          defaultMessage: 'Targeted Business',
        })}
      </Title>
      <Table
        size="small"
        className="no-break"
        pagination={{
          hideOnSinglePage: true,
          onChange: (_, pageSize) => {
            changeSize('targetedBusinessTable', pageSize);
          },
          total,
          defaultPageSize: 10,
          showSizeChanger: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
        }}
        columns={TargetedBusinessColumns.filter(({ key }) =>
          metadataColumns.includes(key as string)
        )}
        dataSource={targetedBusinessData}
      />

      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Select Table Columns',
        })}
        open={columnDrawerOpen}
        onClose={toggleColumnDrawer}
      >
        {columnDrawerOpen && (
          <Form<TargetedBusinessTableData>
            onFinish={onFinish}
            initialValues={{
              fullName: metadataColumns.includes('fullName'),
              incidentsCreated: metadataColumns.includes('incidentsCreated'),
              offendersCreated: metadataColumns.includes('offendersCreated'),
              lostValue: metadataColumns.includes('lostValue'),
              recoveredValue: metadataColumns.includes('recoveredValue'),
              successRate: metadataColumns.includes('successRate'),
              commonLost: metadataColumns.includes('commonLost'),
              highestValueLost: metadataColumns.includes('highestValueLost'),
              avgLost: metadataColumns.includes('avgLost'),
            }}
          >
            <Form.Item
              style={{ marginBottom: 0 }}
              name="fullName"
              valuePropName="checked"
            >
              <Checkbox>
                <FormattedMessage defaultMessage="Business Name" />
              </Checkbox>
            </Form.Item>
            <Form.Item
              style={{ marginBottom: 0 }}
              name="incidentsCreated"
              valuePropName="checked"
            >
              <Checkbox>
                <FormattedMessage defaultMessage="Incident Count" />
              </Checkbox>
            </Form.Item>
            <Form.Item
              style={{ marginBottom: 0 }}
              name="offendersCreated"
              valuePropName="checked"
            >
              <Checkbox>
                <FormattedMessage defaultMessage="Offenders Count" />
              </Checkbox>
            </Form.Item>
            <Form.Item
              style={{ marginBottom: 0 }}
              name="lostValue"
              valuePropName="checked"
            >
              <Checkbox>
                <FormattedMessage defaultMessage="Total Loss" />
              </Checkbox>
            </Form.Item>
            <Form.Item
              style={{ marginBottom: 0 }}
              name="recoveredValue"
              valuePropName="checked"
            >
              <Checkbox>
                <FormattedMessage defaultMessage="Recovered Value" />
              </Checkbox>
            </Form.Item>
            <Form.Item
              style={{ marginBottom: 0 }}
              name="successRate"
              valuePropName="checked"
            >
              <Checkbox>
                <FormattedMessage defaultMessage="Recovery Rate" />
              </Checkbox>
            </Form.Item>
            <Form.Item
              style={{ marginBottom: 0 }}
              name="commonLost"
              valuePropName="checked"
            >
              <Checkbox>
                <FormattedMessage defaultMessage="Top Lost Item" />
              </Checkbox>
            </Form.Item>
            <Form.Item
              style={{ marginBottom: 0 }}
              name="highestValueLost"
              valuePropName="checked"
            >
              <Checkbox>
                <FormattedMessage defaultMessage="Highest Incident Value" />
              </Checkbox>
            </Form.Item>
            <Form.Item
              style={{ marginBottom: 0 }}
              name="avgLost"
              valuePropName="checked"
            >
              <Checkbox>
                <FormattedMessage defaultMessage="Average Loss" />
              </Checkbox>
            </Form.Item>
            <Form.Item style={{ marginTop: 30 }}>
              <Row gutter={8} justify="end">
                <Col>
                  <Button>
                    <FormattedMessage defaultMessage="Close" />
                  </Button>
                </Col>
                <Col>
                  <Button type="primary" htmlType="submit">
                    <FormattedMessage defaultMessage="Submit" />
                  </Button>
                </Col>
                <Col />
              </Row>
            </Form.Item>
          </Form>
        )}
      </Drawer>
    </>
  );
};

export default TargetedBusinessTable;
