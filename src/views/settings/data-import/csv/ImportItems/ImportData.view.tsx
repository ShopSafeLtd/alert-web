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
import type { IntlShape } from 'react-intl';
import { FormattedMessage, useIntl } from 'react-intl';
import type { IFileInfo } from 'react-csv-reader';
import CSVReader from 'react-csv-reader';
import { Role } from 'graphql/generated';
import type { Action, CSVData, DataType, State } from './useImport';

const AdditionInfo = ({
  state,
  dispatch,
  intl,
}: {
  state: State;
  dispatch: Dispatch<Action>;
  intl: IntlShape;
}) => {
  if (state.dataTypes === 'stockItems') {
    return (
      <Select
        placeholder={intl.formatMessage({
          defaultMessage: 'Goods Type',
          id: 'sesFK5',
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
              id: '1ZgrhW',
            })}
            defaultValue={state.additionalInfo.role}
            options={[
              {
                label: intl.formatMessage({
                  defaultMessage: 'Admin',
                  id: 'iHN12u',
                }),
                value: Role.GroupAdmin,
              },
              {
                label: intl.formatMessage({
                  defaultMessage: 'User',
                  id: 'EwRIOm',
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
              id: 'lrV/4+',
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
              id: 'ZA6cIU',
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
  return null;
};

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

  const getColumns = (type: DataType) => {
    switch (type) {
      case 'stockItems': {
        return [
          {
            title: intl.formatMessage({
              defaultMessage: 'Name',
              id: 'HAlOn1',
            }),
            key: 'name',
            dataIndex: 0,
          },
          {
            title: intl.formatMessage({
              defaultMessage: 'Brand',
              id: 'SOPEeg',
            }),
            key: 'brand',
            dataIndex: 1,
          },
          {
            key: 'sku',
            title: intl.formatMessage({
              defaultMessage: 'SKU',
              id: 'k4brJy',
            }),
            dataIndex: 2,
          },
          {
            key: 'barcode',
            title: intl.formatMessage({
              defaultMessage: 'Barcode',
              id: 'fM4JjM',
            }),
            dataIndex: 3,
          },
          {
            key: 'costPrice',
            title: intl.formatMessage({
              defaultMessage: 'Cost Price',
              id: 'k6HOPg',
            }),
            dataIndex: 4,
          },
          {
            key: 'salePrice',
            title: intl.formatMessage({
              defaultMessage: 'Sale Price',
              id: '49sNcx',
            }),
            dataIndex: 5,
          },
          {
            key: 'division',
            title: intl.formatMessage({
              defaultMessage: 'Division',
              id: 'dETzL9',
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
              id: 'HAlOn1',
            }),
            key: 'name',
            dataIndex: 0,
          },
          {
            title: intl.formatMessage({
              defaultMessage: 'Email',
              id: 'sy+pv5',
            }),
            key: 'email',
            dataIndex: 1,
          },
          {
            title: intl.formatMessage({
              defaultMessage: 'Groups',
              id: 'hzmswI',
            }),
            key: 'groups',
            dataIndex: 2,
          },
          {
            title: intl.formatMessage({
              defaultMessage: 'Businesses',
              id: 'D0tMhW',
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
              id: 'HAlOn1',
            }),
            key: 'name',
            dataIndex: 0,
          },
          {
            title: intl.formatMessage({
              defaultMessage: 'Description',
              id: 'Q8Qw5B',
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
              id: 'HAlOn1',
            }),
            key: 'name',
            dataIndex: 0,
          },
          {
            title: intl.formatMessage({
              defaultMessage: 'Division',
              id: 'dETzL9',
            }),
            key: 'division',
            dataIndex: 1,
          },
          {
            title: intl.formatMessage({
              defaultMessage: 'Address',
              id: 'e6Ph5+',
            }),
            key: 'address',
            dataIndex: 2,
          },
          {
            title: intl.formatMessage({
              defaultMessage: 'Postcode',
              id: 'FJhjgz',
            }),
            key: 'postcode',
            dataIndex: 3,
          },
          {
            title: intl.formatMessage({
              defaultMessage: 'Country',
              id: 'vONi+O',
            }),
            key: 'country',
            dataIndex: 4,
          },
          {
            title: intl.formatMessage({
              defaultMessage: 'Coordinates',
              id: 'LQ46NL',
            }),
            key: 'coordinates',
            dataIndex: 5,
          },
        ];
      }
      default: {
        return [{}];
      }
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography.Title level={3}>
        <FormattedMessage id="cTiCAi" defaultMessage="Import Data" />
      </Typography.Title>
      <Typography.Paragraph>
        <FormattedMessage
          defaultMessage="Import data from a CSV file. Please use a provided template to ensure the data is imported correctly. If importing multiple types of data, please import them in the following order: "
          id="fHyU7x"
        />
        <ul>
          <li>
            <FormattedMessage defaultMessage="Stock Items" id="GaP7rI" />
          </li>

          <li>
            <FormattedMessage defaultMessage="Groups" id="hzmswI" />
          </li>
          <li>
            <FormattedMessage defaultMessage="Businesses" id="D0tMhW" />
          </li>
          <li>
            <FormattedMessage defaultMessage="Users" id="YDMrKK" />
          </li>
        </ul>

        <FormattedMessage
          defaultMessage="An email will be sent to you once the data has finished processing."
          id="FW/98A"
        />
      </Typography.Paragraph>

      <Typography.Title level={4}>
        {intl.formatMessage({
          defaultMessage: 'Templates',
          id: 'A3ptul',
        })}
      </Typography.Title>
      {intl.formatMessage({
        defaultMessage: 'Stock Items: ',
        id: 'lskgs6',
      })}
      <a
        href="https://shopsafealert.blob.core.windows.net/csv/Stock_Item_Template.csv?sp=r&st=2023-09-29T17:48:01Z&se=2030-09-30T01:48:01Z&spr=https&sv=2022-11-02&sr=b&sig=kQqHQCpmrFAut53Wu%2Frme3%2B1VNRh%2BBaA68SDKAolYis%3D"
        download
      >
        {intl.formatMessage({
          defaultMessage: 'Download',
          id: '5q3qC0',
        })}
      </a>
      <br />
      {intl.formatMessage({
        defaultMessage: 'Groups: ',
        id: 'UC7B91',
      })}
      <a
        href="https://shopsafealert.blob.core.windows.net/csv/Group_Template.csv?sp=r&st=2023-09-29T17:52:22Z&se=2030-09-30T01:52:22Z&spr=https&sv=2022-11-02&sr=b&sig=i3%2BLGJm7EuwenYcdkcBp2SWc8lHxC47IpEQZgPL22QQ%3D"
        download
      >
        {intl.formatMessage({
          defaultMessage: 'Download',
          id: '5q3qC0',
        })}
      </a>
      <br />
      {intl.formatMessage({
        defaultMessage: 'Businesses: ',
        id: 'msBHeV',
      })}
      <a
        href="https://shopsafealert.blob.core.windows.net/csv/Business_Template.csv?sp=r&st=2023-09-29T17:52:46Z&se=2030-09-30T01:52:46Z&spr=https&sv=2022-11-02&sr=b&sig=AbqBLI0RWVmgjFpHyk1O44gsAmcvVvBLD6oiJBM0zBI%3D"
        download
      >
        {intl.formatMessage({
          defaultMessage: 'Download',
          id: '5q3qC0',
        })}
      </a>
      <br />
      {intl.formatMessage({
        defaultMessage: 'Users: ',
        id: 'HvjXdX',
      })}
      <a
        href="https://shopsafealert.blob.core.windows.net/csv/User_Template.csv?sp=r&st=2023-09-29T17:51:59Z&se=2030-09-30T01:51:59Z&spr=https&sv=2022-11-02&sr=b&sig=toX26Crlo1bol%2Fg7x1UxtKe8VkdLMRA0SMesivzxG8k%3D"
        download
      >
        {intl.formatMessage({
          defaultMessage: 'Download',
          id: '5q3qC0',
        })}
      </a>

      <Row gutter={[10, 10]} style={{ marginTop: 20 }}>
        <Col span={5}>
          <Card style={{ height: 150 }}>
            <Typography.Title level={5}>
              <FormattedMessage id="wCVGH+" defaultMessage="CSV to import" />
            </Typography.Title>
            <CSVReader onFileLoaded={onItemsLoaded} />
          </Card>
        </Col>
        <Col span={8}>
          <Card style={{ height: 150 }}>
            <Typography.Title level={5}>
              <FormattedMessage id="X6ruKu" defaultMessage="Data type" />
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
                <FormattedMessage id="GaP7rI" defaultMessage="Stock Items" />
              </Radio.Button>
              <Radio.Button value="groups">
                <FormattedMessage id="hzmswI" defaultMessage="Groups" />
              </Radio.Button>
              <Radio.Button value="businesses">
                <FormattedMessage id="D0tMhW" defaultMessage="Businesses" />
              </Radio.Button>
              <Radio.Button value="users">
                <FormattedMessage id="YDMrKK" defaultMessage="Users" />
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
              id: '3XOciw',
            })}
          >
            {!state.dataTypes ||
            state.dataTypes === 'groups' ||
            state.dataTypes === 'businesses' ? (
              <div>
                {intl.formatMessage({
                  defaultMessage: 'No additional info required',
                  id: 'GliOBt',
                })}
              </div>
            ) : (
              <AdditionInfo intl={intl} dispatch={dispatch} state={state} />
            )}
          </Card>
        </Col>
      </Row>
      {state.dataTypes && (
        <>
          <Card
            title={intl.formatMessage({
              defaultMessage: 'Preview',
              id: 'TJo5E6',
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
                <FormattedMessage
                  id="m0vlma"
                  defaultMessage="Please complete the additional info"
                />
              ) : (
                <Button
                  loading={saving}
                  disabled={saving}
                  onClick={onSubmit}
                  type="primary"
                >
                  <FormattedMessage
                    id="RCrrbc"
                    defaultMessage="Import Stock Items"
                  />
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
