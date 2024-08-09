import type { CSVData } from '#/views/settings/data-import/csv/data-import/useImport';
import type { FormInstance } from 'antd';
import type { ColumnsType } from 'antd/es/table/interface';
import type { ListGoodsTypesQuery } from 'graphql/goods-types/queries/__generated__/list-goods-types.generated';

import CSVReader from '#/components/CSVReader/CSVReader';
import Loading from '#/components/shared-components/AntD/Loading';
import { faPlus, faTrash } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Card,
  Form,
  Popconfirm,
  Row,
  Select,
  Space,
  Statistic,
  Steps,
  Table,
  Tooltip,
  Typography,
} from 'antd';
import React, { type Dispatch, type SetStateAction } from 'react';
import { useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';

import type { IFormData as FormData, HeaderToFixed, Record } from './types';

import FixStockItemForm from './StockFixItem.modal';
import VirtualTable from './virtual-table';

const useStyles = createUseStyles(() => ({
  stepsAction: {
    marginTop: 24,
  },
  stepsContent: {
    borderRadius: 2,
    marginTop: 16,

    minHeight: 200,
    textAlign: 'start',
  },
}));

interface Props {
  badData: { [p: string]: string }[];
  columns: ColumnsType<Record>;
  current: number;

  data: { [p: string]: string }[];
  form: FormInstance<FormData>;
  formattedDataColumns: ColumnsType<Record>;
  goodsTypeData: ListGoodsTypesQuery | undefined;
  header: string[];
  headerToFixed: HeaderToFixed;
  itemToFix: Partial<FormData> | null;
  loading: boolean;
  onFileLoaded: (d: CSVData) => void;
  onFix: (values: FormData) => void;
  onNext: () => void;
  onPrev: () => void;
  onSubmit: () => void;
  setBadData: Dispatch<SetStateAction<Record[]>>;

  setItemToFix: (v: Partial<FormData> | null) => void;
  setLoading: (v: boolean) => void;
  setOriginalItemToFix: (v: Record | null) => void;
  uploading: boolean;
}
const StockImportView = ({
  badData,
  columns,
  current,
  data,
  form,
  formattedDataColumns,
  goodsTypeData,
  header,
  headerToFixed,
  itemToFix,
  loading,
  onFileLoaded,
  onFix,
  onNext,
  onPrev,
  onSubmit,
  setBadData,
  setItemToFix,
  setLoading,
  setOriginalItemToFix,
  uploading,
}: Props) => {
  const classes = useStyles();
  const intl = useIntl();

  const steps = [
    {
      content: (
        <>
          {loading && <Loading />}

          {data && !loading && data.length > 0 && (
            <>
              <Card
                style={{
                  width: '300px',
                }}
              >
                <Statistic
                  title={intl.formatMessage({
                    defaultMessage: 'Total Items',
                  })}
                  value={data.length}
                />
              </Card>
              <VirtualTable
                columns={columns}
                dataSource={data}
                scroll={{ x: '100%', y: 300 }}
                size="small"
              />
            </>
          )}
          {!loading && data.length === 0 && (
            <p>
              {intl.formatMessage({
                defaultMessage: 'No data to display',
              })}
            </p>
          )}
        </>
      ),
      title: intl.formatMessage({
        defaultMessage: 'Upload Data',
      }),
    },
    {
      content: (
        <>
          <Form<FormData> form={form} layout="vertical" name="import">
            <Space
              direction="horizontal"
              style={{
                marginBottom: 10,
              }}
            >
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Barcode',
                })}
                name="barcode"
                rules={[
                  {
                    message: intl.formatMessage({
                      defaultMessage: 'Please select the item barcode field',
                    }),
                    required: true,
                  },
                ]}
              >
                <Select
                  options={[
                    {
                      label: 'No Barcode',
                      value: 'no-barcode',
                    },
                    ...header.map((key) => ({
                      label: key,
                      value: key,
                    })),
                  ]}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Select Barcode',
                  })}
                  style={{
                    width: 150,
                  }}
                />
              </Form.Item>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Variant',
                })}
                name="variant"
                rules={[
                  {
                    message: intl.formatMessage({
                      defaultMessage: 'Please select the item variant field',
                    }),
                    required: true,
                  },
                ]}
              >
                <Select
                  options={[
                    {
                      label: 'No Variant',
                      value: 'no-variant',
                    },
                    ...header.map((key) => ({
                      label: key,
                      value: key,
                    })),
                  ]}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Select Variant',
                  })}
                  style={{
                    width: 150,
                  }}
                />
              </Form.Item>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Name',
                })}
                name="description"
                rules={[
                  {
                    message: intl.formatMessage({
                      defaultMessage: 'Please select the item name field',
                    }),
                    required: true,
                  },
                ]}
              >
                <Select
                  options={header.map((key) => ({
                    label: key,
                    value: key,
                  }))}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Select Description',
                  })}
                  style={{
                    width: 150,
                  }}
                />
              </Form.Item>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Size',
                })}
                name="size"
              >
                <Select
                  allowClear
                  options={header.map((key) => ({
                    label: key,
                    value: key,
                  }))}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Select Size',
                  })}
                  style={{
                    width: 150,
                  }}
                />
              </Form.Item>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Colour',
                })}
                name="colour"
              >
                <Select
                  allowClear
                  options={header.map((key) => ({
                    label: key,
                    value: key,
                  }))}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Select Colour',
                  })}
                  style={{
                    width: 150,
                  }}
                />
              </Form.Item>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Brand',
                })}
                name="brand"
              >
                <Select
                  allowClear
                  options={header.map((key) => ({
                    label: key,
                    value: key,
                  }))}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Select Brand',
                  })}
                  style={{
                    width: 150,
                  }}
                />
              </Form.Item>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Item Number',
                })}
                name="itemNumber"
                rules={[
                  {
                    message: intl.formatMessage({
                      defaultMessage: 'Please select the item number field',
                    }),
                    required: true,
                  },
                ]}
              >
                <Select
                  options={header.map((key) => ({
                    label: key,
                    value: key,
                  }))}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Select Item Number',
                  })}
                  style={{
                    width: 150,
                  }}
                />
              </Form.Item>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Stock Item',
                })}
                name="stockItem"
                rules={[
                  {
                    message: intl.formatMessage({
                      defaultMessage: 'Please select the stock item field',
                    }),
                    required: true,
                  },
                ]}
              >
                <Select
                  options={header.map((key) => ({
                    label: key,
                    value: key,
                  }))}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Select Stock Item',
                  })}
                  style={{
                    width: 150,
                  }}
                />
              </Form.Item>
            </Space>
            <VirtualTable
              columns={formattedDataColumns}
              dataSource={data}
              scroll={{ x: '100%', y: 300 }}
              size="small"
            />
          </Form>
        </>
      ),
      title: 'Match Headers',
    },
    {
      content:
        current === 2 ? (
          uploading ? (
            <>
              <Typography.Text>
                {intl.formatMessage({
                  defaultMessage: 'Uploading data, please wait...',
                })}
              </Typography.Text>
              <Loading />
            </>
          ) : (
            <>
              <FixStockItemForm
                onCancel={() => {
                  setItemToFix(null);
                  setOriginalItemToFix(null);
                }}
                onFix={onFix}
                open={!!itemToFix}
                stockItem={itemToFix || {}}
                stockItems={
                  goodsTypeData?.listGoodsTypes?.goodsTypes.map(
                    (item) => item.name
                  ) || []
                }
              />
              <Row>
                <Space direction="horizontal">
                  <Card
                    style={{
                      width: '300px',
                    }}
                  >
                    <Statistic
                      title={intl.formatMessage({
                        defaultMessage: 'Total Items',
                      })}
                      value={data.length}
                    />
                  </Card>
                  <Card
                    style={{
                      width: '300px',
                    }}
                  >
                    <Statistic
                      title={intl.formatMessage({
                        defaultMessage: 'Total Bad Items',
                      })}
                      value={badData.length || 0}
                    />
                  </Card>
                </Space>
              </Row>
              {badData.length > 0 ? (
                <>
                  <p style={{ width: '50%' }}>
                    {intl.formatMessage({
                      defaultMessage:
                        'Please review the following data before uploading. These rows have been removed due to potential errors. You may either correct them and restore or proceed with the upload. Any left in the table will not be imported',
                    })}
                  </p>
                  <Table
                    columns={[
                      ...formattedDataColumns,
                      {
                        dataIndex: 'actions',
                        key: 'actions',
                        render: (_, record) => (
                          <Space>
                            <Tooltip
                              title={intl.formatMessage({
                                defaultMessage: 'Fix and restore item',
                              })}
                            >
                              <Button
                                icon={
                                  <FontAwesomeIcon
                                    color="green"
                                    icon={faPlus}
                                  />
                                }
                                onClick={() => {
                                  setOriginalItemToFix(record);
                                  setItemToFix({
                                    barcode: record[headerToFixed.barcode],
                                    brand: record[headerToFixed.brand],
                                    colour: record[headerToFixed.colour || ''],
                                    description:
                                      record[headerToFixed.description],
                                    itemNumber: record[headerToFixed.sku],
                                    itemSize:
                                      record[headerToFixed.itemSize || ''],
                                    stockItem:
                                      record[headerToFixed.goodsTypeId],
                                    variant:
                                      record[headerToFixed.variant || ''],
                                  });
                                }}
                                size="small"
                              />
                            </Tooltip>
                            <Tooltip
                              title={intl.formatMessage({
                                defaultMessage: 'Delete Item',
                              })}
                            >
                              <Popconfirm
                                okText={intl.formatMessage({
                                  defaultMessage: 'Delete',
                                })}
                                onConfirm={() => {
                                  setBadData((prevBadData) =>
                                    prevBadData.filter((row) => row !== record)
                                  );
                                }}
                                overlayInnerStyle={{ padding: 10 }}
                                title={intl.formatMessage({
                                  defaultMessage: 'Are you sure?',
                                })}
                              >
                                <Button
                                  icon={
                                    <FontAwesomeIcon
                                      color="red"
                                      icon={faTrash}
                                    />
                                  }
                                />
                              </Popconfirm>
                            </Tooltip>
                          </Space>
                        ),
                        title: '',
                      },
                    ]}
                    dataSource={badData}
                    size="small"
                  />
                </>
              ) : null}
            </>
          )
        ) : (
          <div />
        ),
      title: 'Finalise and Upload',
    },
  ];
  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <div className="list-view">
      {current === 0 && (
        <CSVReader
          onError={(e) => console.error(e)}
          onFileLoaded={onFileLoaded}
          parserOptions={{
            skipEmptyLines: 'greedy',
          }}
          setLoading={setLoading}
        />
      )}
      <Steps
        current={current}
        items={items}
        style={{ marginTop: current === 0 ? 10 : 0 }}
      />
      <div className={classes.stepsContent}>{steps[current].content}</div>
      <div className={classes.stepsAction}>
        {current > 0 && !uploading && (
          <Button onClick={onPrev} style={{ margin: '0 8px' }}>
            {intl.formatMessage({
              defaultMessage: 'Previous',
            })}
          </Button>
        )}
        {current < steps.length - 1 && !uploading && (
          <Button
            disabled={!data || data.length === 0}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={onNext}
            type="primary"
          >
            {intl.formatMessage({
              defaultMessage: 'Next',
            })}
          </Button>
        )}
        {current === steps.length - 1 && !uploading && (
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          <Button onClick={onSubmit} type="primary">
            {intl.formatMessage({
              defaultMessage: 'Upload',
            })}
          </Button>
        )}
      </div>
    </div>
  );
};

export default StockImportView;
