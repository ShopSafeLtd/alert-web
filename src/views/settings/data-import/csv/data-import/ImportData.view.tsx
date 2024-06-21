import type { Dispatch } from 'react';
import React from 'react';
import {
  Button,
  Card,
  Col,
  Input,
  Radio,
  Row,
  Select,
  Table,
  Typography,
} from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';
import type { IFileInfo } from 'react-csv-reader';

import type { Action, CSVData, DataType, State } from './useImport';
import CSVReader from '../../../../../components/CSVReader/CSVReader';
import { Role } from 'graphql/types';

interface Props {
  onItemsLoaded: (
    data: CSVData,
    _: IFileInfo,
    originalFile: File | undefined
  ) => void;
  dispatch: Dispatch<Action>;
  state: State;
  saving: boolean;
  onSubmit: () => void;
}

const ImportStockItems = ({
  onItemsLoaded,
  dispatch,
  state,
  saving,
  onSubmit,
}: Props) => {
  const intl = useIntl();
  // eslint-disable-next-line react/no-unstable-nested-components
  const AdditionInfo = () => {
    if (state.dataTypes === 'stockItems') {
      return (
        <Select
          placeholder={intl.formatMessage({
            defaultMessage: 'Goods Type',
          })}
          style={{
            width: '80%',
          }}
          defaultValue={state.additionalInfo.goodsType}
          options={state.goods}
          onChange={(value: string) =>
            dispatch({
              type: 'SET_ADDITIONAL_INFO',
              payload: {
                ...state.additionalInfo,
                goodsType: value,
              },
            })
          }
        />
      );
    }
    if (state.dataTypes === 'users') {
      return (
        <Row gutter={[8, 8]}>
          <Col>
            <Select
              placeholder={intl.formatMessage({
                defaultMessage: 'Role',
              })}
              defaultValue={state.additionalInfo.role}
              options={[
                {
                  label: intl.formatMessage({
                    defaultMessage: 'Admin',
                  }),
                  value: Role.GroupAdmin,
                },
                {
                  label: intl.formatMessage({
                    defaultMessage: 'User',
                  }),
                  value: Role.User,
                },
              ]}
              onChange={(value: string) =>
                dispatch({
                  type: 'SET_ADDITIONAL_INFO',
                  payload: {
                    ...state.additionalInfo,
                    role: value,
                  },
                })
              }
            />
          </Col>
          <Col>
            <Input
              defaultValue={state.additionalInfo.password || undefined}
              placeholder={intl.formatMessage({
                defaultMessage: 'Default Password',
              })}
              onChange={(e) =>
                dispatch({
                  type: 'SET_ADDITIONAL_INFO',
                  payload: {
                    ...state.additionalInfo,
                    password: e.target.value,
                  },
                })
              }
            />
          </Col>
          <Col>
            <Input
              defaultValue={state.additionalInfo.password || undefined}
              placeholder={intl.formatMessage({
                defaultMessage: 'Organisation',
              })}
              onChange={(e) =>
                dispatch({
                  type: 'SET_ADDITIONAL_INFO',
                  payload: {
                    ...state.additionalInfo,
                    organisation: e.target.value,
                  },
                })
              }
            />
          </Col>
        </Row>
      );
    }
    return <div />;
  };
  const getColumns = (type: DataType) => {
    switch (type) {
      case 'stockItems': {
        return [
          {
            title: intl.formatMessage({
              defaultMessage: 'Name',
            }),
            key: 'name',
            dataIndex: 0,
          },
          {
            title: intl.formatMessage({
              defaultMessage: 'Brand',
            }),
            key: 'brand',
            dataIndex: 1,
          },
          {
            key: 'sku',
            title: intl.formatMessage({
              defaultMessage: 'SKU',
            }),
            dataIndex: 2,
          },
          {
            key: 'barcode',
            title: intl.formatMessage({
              defaultMessage: 'Barcode',
            }),
            dataIndex: 3,
          },
          {
            key: 'costPrice',
            title: intl.formatMessage({
              defaultMessage: 'Cost Price',
            }),
            dataIndex: 4,
          },
          {
            key: 'salePrice',
            title: intl.formatMessage({
              defaultMessage: 'Sale Price',
            }),
            dataIndex: 5,
          },
          {
            key: 'division',
            title: intl.formatMessage({
              defaultMessage: 'Division',
            }),
            dataIndex: 6,
          },
        ];
      }
      case 'users': {
        return [
          {
            title: intl.formatMessage({
              defaultMessage: 'Name',
            }),
            key: 'name',
            dataIndex: 0,
          },
          {
            title: intl.formatMessage({
              defaultMessage: 'Email',
            }),
            key: 'email',
            dataIndex: 1,
          },
          {
            title: intl.formatMessage({
              defaultMessage: 'Groups',
            }),
            key: 'groups',
            dataIndex: 2,
          },
          {
            title: intl.formatMessage({
              defaultMessage: 'Businesses',
            }),
            key: 'businesses',
            dataIndex: 3,
          },
        ];
      }
      // case 'offenders': {
      //   return [{}];
      // }
      // case 'vehicles': {
      //   return [{}];
      // }
      case 'groups': {
        return [
          {
            title: intl.formatMessage({
              defaultMessage: 'Name',
            }),
            key: 'name',
            dataIndex: 0,
          },
          {
            title: intl.formatMessage({
              defaultMessage: 'Description',
            }),
            key: 'description',
            dataIndex: 1,
          },
        ];
      }
      case 'businesses': {
        return [
          {
            title: intl.formatMessage({
              defaultMessage: 'Name',
            }),
            key: 'name',
            dataIndex: 0,
          },
          {
            title: intl.formatMessage({
              defaultMessage: 'Division',
            }),
            key: 'division',
            dataIndex: 1,
          },
          {
            title: intl.formatMessage({
              defaultMessage: 'Address',
            }),
            key: 'address',
            dataIndex: 2,
          },
          {
            title: intl.formatMessage({
              defaultMessage: 'Postcode',
            }),
            key: 'postcode',
            dataIndex: 3,
          },
          {
            title: intl.formatMessage({
              defaultMessage: 'Country',
            }),
            key: 'country',
            dataIndex: 4,
          },
          {
            title: intl.formatMessage({
              defaultMessage: 'Coordinates',
            }),
            key: 'coordinates',
            dataIndex: 5,
          },
        ];
      }
      default: {
        return [];
      }
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography.Title level={3}>
        <FormattedMessage defaultMessage="Import Data" />
      </Typography.Title>
      <Typography.Paragraph>
        <FormattedMessage defaultMessage="Import data from a CSV file. Please use a provided template to ensure the data is imported correctly. If importing multiple types of data, please import them in the following order: " />
        <ul>
          <li>
            <FormattedMessage defaultMessage="Stock Items" />
          </li>

          <li>
            <FormattedMessage defaultMessage="Groups" />
          </li>
          <li>
            <FormattedMessage defaultMessage="Businesses" />
          </li>
          <li>
            <FormattedMessage defaultMessage="Users" />
          </li>
        </ul>

        <FormattedMessage defaultMessage="An email will be sent to you once the data has finished processing." />
      </Typography.Paragraph>

      <Typography.Title level={4}>
        {intl.formatMessage({
          defaultMessage: 'Templates',
        })}
      </Typography.Title>
      {intl.formatMessage({
        defaultMessage: 'Stock Items: ',
      })}
      <a
        href="https://shopsafealert.blob.core.windows.net/csv/Stock_Item_Template.csv?sp=r&st=2023-09-29T17:48:01Z&se=2030-09-30T01:48:01Z&spr=https&sv=2022-11-02&sr=b&sig=kQqHQCpmrFAut53Wu%2Frme3%2B1VNRh%2BBaA68SDKAolYis%3D"
        download
      >
        {intl.formatMessage({
          defaultMessage: 'Download',
        })}
      </a>
      <br />
      {intl.formatMessage({
        defaultMessage: 'Groups: ',
      })}
      <a
        href="https://shopsafealert.blob.core.windows.net/csv/Group_Template.csv?sp=r&st=2023-09-29T17:52:22Z&se=2030-09-30T01:52:22Z&spr=https&sv=2022-11-02&sr=b&sig=i3%2BLGJm7EuwenYcdkcBp2SWc8lHxC47IpEQZgPL22QQ%3D"
        download
      >
        {intl.formatMessage({
          defaultMessage: 'Download',
        })}
      </a>
      <br />
      {intl.formatMessage({
        defaultMessage: 'Businesses: ',
      })}
      <a
        href="https://shopsafealert.blob.core.windows.net/csv/Business_Template.csv?sp=r&st=2023-09-29T17:52:46Z&se=2030-09-30T01:52:46Z&spr=https&sv=2022-11-02&sr=b&sig=AbqBLI0RWVmgjFpHyk1O44gsAmcvVvBLD6oiJBM0zBI%3D"
        download
      >
        {intl.formatMessage({
          defaultMessage: 'Download',
        })}
      </a>
      <br />
      {intl.formatMessage({
        defaultMessage: 'Users: ',
      })}
      <a
        href="https://shopsafealert.blob.core.windows.net/csv/User_Template.csv?sp=r&st=2023-09-29T17:51:59Z&se=2030-09-30T01:51:59Z&spr=https&sv=2022-11-02&sr=b&sig=toX26Crlo1bol%2Fg7x1UxtKe8VkdLMRA0SMesivzxG8k%3D"
        download
      >
        {intl.formatMessage({
          defaultMessage: 'Download',
        })}
      </a>

      <Row gutter={[10, 10]} style={{ marginTop: 20 }}>
        <Col span={5}>
          <Card style={{ height: 150 }}>
            <Typography.Title level={5}>
              <FormattedMessage defaultMessage="CSV to import" />
            </Typography.Title>
            <CSVReader onFileLoaded={onItemsLoaded} />
          </Card>
        </Col>
        <Col span={8}>
          <Card style={{ height: 150 }}>
            <Typography.Title level={5}>
              <FormattedMessage defaultMessage="Data type" />
            </Typography.Title>
            <Radio.Group
              onChange={(e) =>
                dispatch({
                  type: 'SET_DATA_TYPE',
                  payload: e.target.value as DataType,
                })
              }
            >
              <Radio.Button value="stockItems">
                <FormattedMessage defaultMessage="Stock Items" />
              </Radio.Button>
              <Radio.Button value="groups">
                <FormattedMessage defaultMessage="Groups" />
              </Radio.Button>
              <Radio.Button value="businesses">
                <FormattedMessage defaultMessage="Businesses" />
              </Radio.Button>
              <Radio.Button value="users">
                <FormattedMessage defaultMessage="Users" />
              </Radio.Button>
              {/* <Radio.Button value="offenders"> */}
              {/*   <FormattedMessage id="xb54TN" defaultMessage="Offenders" /> */}
              {/* </Radio.Button> */}
              {/* <Radio.Button value="vehicles"> */}
              {/*   <FormattedMessage id="r6wuJ3" defaultMessage="Vehicles" /> */}
              {/* </Radio.Button> */}
            </Radio.Group>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            style={{ height: 150 }}
            title={intl.formatMessage({
              defaultMessage: 'Additional Info',
            })}
          >
            {!state.dataTypes ||
            state.dataTypes === 'groups' ||
            state.dataTypes === 'businesses' ? (
              <div>
                {intl.formatMessage({
                  defaultMessage: 'No additional info required',
                })}
              </div>
            ) : (
              AdditionInfo()
            )}
          </Card>
        </Col>
      </Row>
      {state.dataTypes && (
        <>
          <Card
            title={intl.formatMessage({
              defaultMessage: 'Preview',
            })}
          >
            <Table
              dataSource={state.tableData}
              size="small"
              columns={getColumns(state.dataTypes)}
            />
          </Card>
          <Row justify="end">
            <Col>
              {(state.dataTypes === 'users' &&
                (!state.additionalInfo.role ||
                  !state.additionalInfo.password ||
                  !state.additionalInfo.organisation)) ||
              (state.dataTypes === 'stockItems' &&
                !state.additionalInfo.goodsType) ? (
                <FormattedMessage defaultMessage="Please complete the additional info" />
              ) : (
                <Button
                  loading={saving}
                  disabled={saving}
                  onClick={onSubmit}
                  type="primary"
                >
                  <FormattedMessage defaultMessage="Import Stock Items" />
                </Button>
              )}
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default ImportStockItems;
