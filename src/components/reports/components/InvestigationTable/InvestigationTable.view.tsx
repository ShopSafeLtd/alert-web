import type { InvestigationTableReportQuery } from '#/views/reports/investigation-table/__generated__/investigation-table-report-query.generated';
import type { MetaData } from '#/views/reports/types';

import {
  InvestigationColumns,
  type InvestigationTableData,
} from '#/components/reports/tableColumns';
import { faEdit, faTrash } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Drawer, Form, Row, Switch, Table } from 'antd';
import React, { useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

interface Props {
  changeSize: (arg0: string, arg1: number) => void;
  data: InvestigationTableReportQuery | undefined;
  defaultPageSize?: number;
  editMode: boolean;
  investigationsTableData: [] | InvestigationTableData[];
  loading: boolean;
  metadata: MetaData[];
  removeItem: (arg0: string) => void;
  setMetadata: (arg0: MetaData[]) => void;
}

const InvestigationTable = ({
  changeSize,
  data,
  defaultPageSize = 10,
  editMode,
  investigationsTableData,
  loading,
  metadata,
  removeItem,
  setMetadata,
}: Props) => {
  const intl = useIntl();

  const [editColumnOpen, setEditColumnOpen] = useState(false);
  const tableMetaData = useMemo(
    () => metadata.find((item) => item.key === 'investigationsTable'),
    [metadata]
  );
  const toggleEditColumn = () => {
    setEditColumnOpen(!editColumnOpen);
  };
  const onSubmitColumns = (formData: { [i: string]: string }) => {
    setMetadata([
      ...metadata.filter((item) => item.key !== 'investigationsTable'),
      {
        key: 'investigationsTable',
        type: 'table',
        ...tableMetaData,
        columns: InvestigationColumns.filter(
          (column) => formData[column.key as string]
        ).map((column) => column.key as string),
      },
    ]);
    toggleEditColumn();
  };

  return (
    <>
      <div>
        <Button
          className="change-graph1 no-print"
          hidden={!editMode}
          icon={<FontAwesomeIcon icon={faEdit} size="lg" />}
          onClick={toggleEditColumn}
          shape="circle"
          size="small"
          type="text"
        />
        <Button
          className="card-remove no-print"
          hidden={!editMode}
          icon={<FontAwesomeIcon color="red" icon={faTrash} size="lg" />}
          onClick={() => removeItem('investigationsTable')}
          shape="circle"
          size="small"
          type="text"
        />
        <Table
          className="no-break"
          // eslint-disable-next-line
          columns={InvestigationColumns.filter((column) =>
            tableMetaData?.columns
              ? tableMetaData.columns.includes(column.key as string)
              : true
          )}
          dataSource={investigationsTableData}
          loading={loading}
          pagination={{
            defaultPageSize,
            hideOnSinglePage: true,
            onChange: (_, pageSize) => {
              changeSize('investigationsTable', pageSize);
            },
            showSizeChanger: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
            total: data?.investigationTableReport?.total || 0,
          }}
          size="small"
        />
      </div>
      <Drawer
        onClose={toggleEditColumn}
        open={editColumnOpen}
        title={intl.formatMessage({
          defaultMessage: 'Select Table Columns',
        })}
      >
        {editColumnOpen && (
          <Form
            initialValues={
              tableMetaData?.columns
                ? Object.fromEntries(
                    tableMetaData.columns.map((b) => [b, true])
                  )
                : Object.fromEntries(
                    InvestigationColumns.map((b) => [b.key as string, true])
                  )
            }
            onFinish={onSubmitColumns}
          >
            {InvestigationColumns.map((column) => (
              <Form.Item
                key={column.key}
                label={column.title}
                name={column.key}
                style={{ marginBottom: 0 }}
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            ))}
            <Row justify="end">
              <Col>
                <Form.Item>
                  <Button htmlType="submit" type="primary">
                    <FormattedMessage defaultMessage="Save Columns" />
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        )}
      </Drawer>
    </>
  );
};

export default InvestigationTable;
