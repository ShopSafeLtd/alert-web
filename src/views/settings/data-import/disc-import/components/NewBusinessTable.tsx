import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Pagination,
  Popconfirm,
  Row,
  Select,
  Tooltip,
  Typography,
} from 'antd';
import { createUseStyles } from 'react-jss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClose,
  faMagnifyingGlass,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';

import { useStoreState } from 'state';
import { useIntl } from 'react-intl';
import type { NewBusiness } from '../DiscImport.types';
import { useListBusinessesLocationsQuery } from 'graphql/businesses/queries/list-businesses-locations.generated';

const { Text } = Typography;

const useStyles = createUseStyles(() => ({
  cell: {},
  row: {
    paddingLeft: 7,
  },
  headerRow: {
    marginLeft: '0px !important',
    marginRight: '0px !important',
    borderTopLeftRadius: 10,
  },
  headerCell: {},
}));

interface NewBusinessRowProps {
  business: NewBusiness;
  onDelete: (id: string) => void;
  onUpdateBusiness: (data: NewBusiness) => void;
}

const NewBusinessRow = React.memo(
  ({ business, onDelete, onUpdateBusiness }: NewBusinessRowProps) => {
    const [form] = Form.useForm<NewBusiness>();
    const [link, setLink] = useState(false);
    const currentSchemeId = useStoreState((state) => state.scheme.id);
    const intl = useIntl();
    const classes = useStyles();

    const { data } = useListBusinessesLocationsQuery({
      variables: {
        where: {
          schemes: {
            some: {
              id: {
                equals: currentSchemeId,
              },
            },
          },
        },
      },
    });

    useEffect(() => {
      form.setFieldsValue({
        ...business,
      });
      void form.validateFields();
    }, [business]);

    const onBlur = () => {
      const values = form.getFieldsValue();
      onUpdateBusiness({ ...business, ...values });
    };

    const onValuesChange = (changedValues: NewBusiness) => {
      if (changedValues.existing) {
        const existing = data?.listBusinesses.businesses.find(
          (item) => item.id === changedValues.existing
        );
        if (existing)
          form.setFieldsValue({
            building: existing.locations[0]?.building || '',
            county: existing.locations[0]?.county || '',
            name: existing.name || '',
            postcode: existing.locations[0]?.postcode || '',
            street: existing.locations[0]?.street || '',
            townCity: existing.locations[0]?.townCity || '',
          });
      }
    };

    const clearLink = () => {
      form.setFieldsValue({
        existing: undefined,
      });
      setLink(false);
    };

    return (
      <Form form={form} className={classes.row} onValuesChange={onValuesChange}>
        <Row gutter={8}>
          <Col span={4} className={classes.cell}>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    defaultMessage: 'Enter a name',
                  }),
                },
              ]}
            >
              <Input onBlur={onBlur} readOnly={link} />
            </Form.Item>
          </Col>
          <Col span={3} className={classes.cell}>
            <Form.Item name="building">
              <Input onBlur={onBlur} readOnly={link} />
            </Form.Item>
          </Col>
          <Col span={3} className={classes.cell} style={{ maxWidth: 200 }}>
            <Form.Item
              name="street"
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    defaultMessage: 'Enter a street',
                  }),
                },
              ]}
            >
              <Input onBlur={onBlur} readOnly={link} />
            </Form.Item>
          </Col>
          <Col span={3} className={classes.cell} style={{ maxWidth: 250 }}>
            <Form.Item
              name="townCity"
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    defaultMessage: 'Enter a town/city',
                  }),
                },
              ]}
            >
              <Input onBlur={onBlur} readOnly={link} />
            </Form.Item>
          </Col>
          <Col span={3} className={classes.cell} style={{ maxWidth: 250 }}>
            <Form.Item name="county">
              <Input onBlur={onBlur} readOnly={link} />
            </Form.Item>
          </Col>
          <Col span={2} className={classes.cell} style={{ maxWidth: 250 }}>
            <Form.Item
              name="postcode"
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    defaultMessage: 'Enter a postcode',
                  }),
                },
              ]}
            >
              <Input onBlur={onBlur} readOnly={link} />
            </Form.Item>
          </Col>
          <Col>
            {!link && (
              <Tooltip
                title={intl.formatMessage({
                  defaultMessage: 'Link to existing business',
                })}
              >
                <Button size="small" onClick={() => setLink(true)}>
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </Button>
              </Tooltip>
            )}
            {link && (
              <Row gutter={8}>
                <Col>
                  <Form.Item
                    name="existing"
                    rules={[
                      {
                        required: true,
                        message: intl.formatMessage({
                          defaultMessage: 'Select a business',
                        }),
                      },
                    ]}
                  >
                    <Select
                      style={{ width: 160 }}
                      options={data?.listBusinesses.businesses.map((item) => ({
                        value: item.id,
                        label: item.name,
                      }))}
                      onBlur={onBlur}
                    />
                  </Form.Item>
                </Col>
                <Col>
                  <Tooltip
                    title={intl.formatMessage({
                      defaultMessage: 'Clear link',
                    })}
                  >
                    <Button size="small" onClick={clearLink}>
                      <FontAwesomeIcon icon={faClose} />
                    </Button>
                  </Tooltip>
                </Col>
              </Row>
            )}
          </Col>
          <Col>
            <Popconfirm
              overlayInnerStyle={{ padding: 10 }}
              title={intl.formatMessage({
                defaultMessage:
                  'Are you sure you want to remove this business?',
              })}
              onConfirm={() => onDelete(business.id)}
            >
              <Button size="small">
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </Popconfirm>
          </Col>
        </Row>
      </Form>
    );
  }
);

interface Props {
  onAdd: () => void;
  onDelete: (id: string) => void;
  newBusinesses: NewBusiness[];
  onUpdateBusiness: (data: NewBusiness) => void;
}

const NewBusinessTable = ({
  onAdd,
  newBusinesses,
  onDelete,
  onUpdateBusiness,
}: Props) => {
  const classes = useStyles();

  const [currentPage, setCurrentPage] = useState(1);
  const [activeIncidents, setActiveIncidents] = useState<NewBusiness[]>(
    newBusinesses.slice(0, 10)
  );

  useEffect(() => {
    setActiveIncidents(
      newBusinesses.slice((currentPage - 1) * 10, 10 * currentPage)
    );
  }, [currentPage]);
  const intl = useIntl();
  return (
    <Card
      title={intl.formatMessage({
        defaultMessage: 'Businesses',
      })}
      extra={
        <Button type="primary" style={{ marginBottom: 16 }} onClick={onAdd}>
          {intl.formatMessage({
            defaultMessage: 'Add business',
          })}
        </Button>
      }
    >
      <Row
        gutter={8}
        style={{ marginBottom: 10 }}
        className={classes.headerRow}
      >
        <Col
          span={4}
          className={classes.headerCell}
          style={{ borderTopLeftRadius: 10 }}
        >
          <Text style={{ paddingLeft: 5 }} strong>
            {intl.formatMessage({
              defaultMessage: 'Name',
            })}
          </Text>
        </Col>
        <Col span={3} className={classes.headerCell}>
          <Text style={{ paddingLeft: 5 }} strong>
            {intl.formatMessage({
              defaultMessage: 'Building',
            })}
          </Text>
        </Col>
        <Col span={3} className={classes.headerCell}>
          <Text style={{ paddingLeft: 5 }} strong>
            {intl.formatMessage({
              defaultMessage: 'Street',
            })}
          </Text>
        </Col>
        <Col span={3} className={classes.headerCell}>
          <Text style={{ paddingLeft: 5 }} strong>
            {intl.formatMessage({
              defaultMessage: 'Town/City',
            })}
          </Text>
        </Col>
        <Col span={3} className={classes.headerCell}>
          <Text style={{ paddingLeft: 5 }} strong>
            {intl.formatMessage({
              defaultMessage: 'County',
            })}
          </Text>
        </Col>
        <Col span={2} className={classes.headerCell}>
          <Text style={{ paddingLeft: 5 }} strong>
            {intl.formatMessage({
              defaultMessage: 'Postcode',
            })}
          </Text>
        </Col>
      </Row>

      {activeIncidents.map((business) => (
        <NewBusinessRow
          key={business.id}
          business={business}
          onDelete={onDelete}
          onUpdateBusiness={onUpdateBusiness}
        />
      ))}

      <Pagination
        current={currentPage}
        onChange={setCurrentPage}
        total={newBusinesses.length}
        showTotal={(total) =>
          intl.formatMessage(
            {
              defaultMessage: 'Total Businesses: {total}',
            },
            {
              total,
            }
          )
        }
        pageSizeOptions={[10]}
        hideOnSinglePage
      />
    </Card>
  );
};

export default React.memo(NewBusinessTable);
