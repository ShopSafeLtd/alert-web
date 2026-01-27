import type { MetaData } from '#/views/reports/types';
import type { TablePaginationConfig } from 'antd';
import type { ColumnsType } from 'antd/es/table/interface';

import { faCog, faTrash } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Checkbox,
  Col,
  Drawer,
  Form,
  Row,
  Table,
  Typography,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

const { Title } = Typography;

interface TargetedBusinessTableData {
  avgLost: string;
  commonLost: string;
  fullName: string;
  highestValueLost: number;
  incidentsCreated: number;
  lostValue: string;
  offendersCreated: number;
  recoveredValue: string;
  successRate: string;
}

interface Props {
  changeSize: (name: string, pageSize: number) => void;
  columns: ColumnsType<TargetedBusinessTableData>;
  editMode: boolean;
  metadata: MetaData[];
  pagination?: TablePaginationConfig;
  removeItem: () => void;
  setMetadata: (arg0: MetaData[]) => void;
  targetedBusinessData: TargetedBusinessTableData[];
  total: number;
}

const TargetedBusinessTable = ({
  changeSize,
  columns: providedColumns,
  editMode,
  metadata,
  pagination,
  removeItem,
  setMetadata,
  targetedBusinessData,
  total,
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
      { active: value.fullName, name: 'fullName' },
      { active: value.incidentsCreated, name: 'incidentsCreated' },
      { active: value.offendersCreated, name: 'offendersCreated' },
      { active: value.lostValue, name: 'lostValue' },
      { active: value.recoveredValue, name: 'recoveredValue' },
      { active: value.successRate, name: 'successRate' },
      { active: value.commonLost, name: 'commonLost' },
      { active: value.highestValueLost, name: 'highestValueLost' },
      { active: value.avgLost, name: 'avgLost' },
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
        className="card-remove no-print"
        hidden={!editMode}
        icon={<FontAwesomeIcon color="red" icon={faTrash} size="lg" />}
        onClick={removeItem}
        shape="circle"
        size="small"
        type="text"
      />
      <Button
        className="change-graph1 no-print"
        hidden={!editMode}
        icon={<FontAwesomeIcon icon={faCog} size="lg" />}
        onClick={toggleColumnDrawer}
        shape="circle"
        size="small"
        type="text"
      />
      <Title level={4}>
        {intl.formatMessage({
          defaultMessage: 'Targeted Business',
        })}
      </Title>
      <Table
        className="no-break"
        columns={providedColumns.filter(({ key }) =>
          metadataColumns.includes(key as string)
        )}
        dataSource={targetedBusinessData}
        pagination={
          pagination || {
            defaultPageSize: 10,
            hideOnSinglePage: true,
            onChange: (_, pageSize) => {
              changeSize('targetedBusinessTable', pageSize);
            },
            showSizeChanger: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
            total,
          }
        }
        size="small"
      />

      <Drawer
        onClose={toggleColumnDrawer}
        open={columnDrawerOpen}
        title={intl.formatMessage({
          defaultMessage: 'Select Table Columns',
        })}
      >
        {columnDrawerOpen && (
          <Form<TargetedBusinessTableData>
            initialValues={{
              avgLost: metadataColumns.includes('avgLost'),
              commonLost: metadataColumns.includes('commonLost'),
              fullName: metadataColumns.includes('fullName'),
              highestValueLost: metadataColumns.includes('highestValueLost'),
              incidentsCreated: metadataColumns.includes('incidentsCreated'),
              lostValue: metadataColumns.includes('lostValue'),
              offendersCreated: metadataColumns.includes('offendersCreated'),
              recoveredValue: metadataColumns.includes('recoveredValue'),
              successRate: metadataColumns.includes('successRate'),
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="fullName"
              style={{ marginBottom: 0 }}
              valuePropName="checked"
            >
              <Checkbox>
                <FormattedMessage defaultMessage="Business Name" />
              </Checkbox>
            </Form.Item>
            <Form.Item
              name="incidentsCreated"
              style={{ marginBottom: 0 }}
              valuePropName="checked"
            >
              <Checkbox>
                <FormattedMessage defaultMessage="Incident Count" />
              </Checkbox>
            </Form.Item>
            <Form.Item
              name="offendersCreated"
              style={{ marginBottom: 0 }}
              valuePropName="checked"
            >
              <Checkbox>
                <FormattedMessage defaultMessage="Offenders Count" />
              </Checkbox>
            </Form.Item>
            <Form.Item
              name="lostValue"
              style={{ marginBottom: 0 }}
              valuePropName="checked"
            >
              <Checkbox>
                <FormattedMessage defaultMessage="Total Loss" />
              </Checkbox>
            </Form.Item>
            <Form.Item
              name="recoveredValue"
              style={{ marginBottom: 0 }}
              valuePropName="checked"
            >
              <Checkbox>
                <FormattedMessage defaultMessage="Recovered Value" />
              </Checkbox>
            </Form.Item>
            <Form.Item
              name="successRate"
              style={{ marginBottom: 0 }}
              valuePropName="checked"
            >
              <Checkbox>
                <FormattedMessage defaultMessage="Recovery Rate" />
              </Checkbox>
            </Form.Item>
            <Form.Item
              name="commonLost"
              style={{ marginBottom: 0 }}
              valuePropName="checked"
            >
              <Checkbox>
                <FormattedMessage defaultMessage="Top Lost Item" />
              </Checkbox>
            </Form.Item>
            <Form.Item
              name="highestValueLost"
              style={{ marginBottom: 0 }}
              valuePropName="checked"
            >
              <Checkbox>
                <FormattedMessage defaultMessage="Highest Incident Value" />
              </Checkbox>
            </Form.Item>
            <Form.Item
              name="avgLost"
              style={{ marginBottom: 0 }}
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
                  <Button htmlType="submit" type="primary">
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
