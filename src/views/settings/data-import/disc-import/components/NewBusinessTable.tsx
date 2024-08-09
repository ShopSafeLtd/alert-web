import {
  faClose,
  faMagnifyingGlass,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
import { useListBusinessesLocationsQuery } from 'graphql/businesses/queries/__generated__/list-businesses-locations.generated';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';
import { useStoreState } from 'state';

import type { NewBusiness } from '../DiscImport.types';

const { Text } = Typography;

const useStyles = createUseStyles(() => ({
  cell: {},
  headerCell: {},
  headerRow: {
    borderTopLeftRadius: 10,
    marginLeft: '0px !important',
    marginRight: '0px !important',
  },
  row: {
    paddingLeft: 7,
  },
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
      <Form className={classes.row} form={form} onValuesChange={onValuesChange}>
        <Row gutter={8}>
          <Col className={classes.cell} span={4}>
            <Form.Item
              name="name"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage: 'Enter a name',
                  }),
                  required: true,
                },
              ]}
            >
              <Input onBlur={onBlur} readOnly={link} />
            </Form.Item>
          </Col>
          <Col className={classes.cell} span={3}>
            <Form.Item name="building">
              <Input onBlur={onBlur} readOnly={link} />
            </Form.Item>
          </Col>
          <Col className={classes.cell} span={3} style={{ maxWidth: 200 }}>
            <Form.Item
              name="street"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage: 'Enter a street',
                  }),
                  required: true,
                },
              ]}
            >
              <Input onBlur={onBlur} readOnly={link} />
            </Form.Item>
          </Col>
          <Col className={classes.cell} span={3} style={{ maxWidth: 250 }}>
            <Form.Item
              name="townCity"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage: 'Enter a town/city',
                  }),
                  required: true,
                },
              ]}
            >
              <Input onBlur={onBlur} readOnly={link} />
            </Form.Item>
          </Col>
          <Col className={classes.cell} span={3} style={{ maxWidth: 250 }}>
            <Form.Item name="county">
              <Input onBlur={onBlur} readOnly={link} />
            </Form.Item>
          </Col>
          <Col className={classes.cell} span={2} style={{ maxWidth: 250 }}>
            <Form.Item
              name="postcode"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage: 'Enter a postcode',
                  }),
                  required: true,
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
                <Button onClick={() => setLink(true)} size="small">
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
                        message: intl.formatMessage({
                          defaultMessage: 'Select a business',
                        }),
                        required: true,
                      },
                    ]}
                  >
                    <Select
                      onBlur={onBlur}
                      options={data?.listBusinesses.businesses.map((item) => ({
                        label: item.name,
                        value: item.id,
                      }))}
                      style={{ width: 160 }}
                    />
                  </Form.Item>
                </Col>
                <Col>
                  <Tooltip
                    title={intl.formatMessage({
                      defaultMessage: 'Clear link',
                    })}
                  >
                    <Button onClick={clearLink} size="small">
                      <FontAwesomeIcon icon={faClose} />
                    </Button>
                  </Tooltip>
                </Col>
              </Row>
            )}
          </Col>
          <Col>
            <Popconfirm
              onConfirm={() => onDelete(business.id)}
              overlayInnerStyle={{ padding: 10 }}
              title={intl.formatMessage({
                defaultMessage:
                  'Are you sure you want to remove this business?',
              })}
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
  newBusinesses: NewBusiness[];
  onAdd: () => void;
  onDelete: (id: string) => void;
  onUpdateBusiness: (data: NewBusiness) => void;
}

const NewBusinessTable = ({
  newBusinesses,
  onAdd,
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
      extra={
        <Button onClick={onAdd} style={{ marginBottom: 16 }} type="primary">
          {intl.formatMessage({
            defaultMessage: 'Add business',
          })}
        </Button>
      }
      title={intl.formatMessage({
        defaultMessage: 'Businesses',
      })}
    >
      <Row
        className={classes.headerRow}
        gutter={8}
        style={{ marginBottom: 10 }}
      >
        <Col
          className={classes.headerCell}
          span={4}
          style={{ borderTopLeftRadius: 10 }}
        >
          <Text strong style={{ paddingLeft: 5 }}>
            {intl.formatMessage({
              defaultMessage: 'Name',
            })}
          </Text>
        </Col>
        <Col className={classes.headerCell} span={3}>
          <Text strong style={{ paddingLeft: 5 }}>
            {intl.formatMessage({
              defaultMessage: 'Building',
            })}
          </Text>
        </Col>
        <Col className={classes.headerCell} span={3}>
          <Text strong style={{ paddingLeft: 5 }}>
            {intl.formatMessage({
              defaultMessage: 'Street',
            })}
          </Text>
        </Col>
        <Col className={classes.headerCell} span={3}>
          <Text strong style={{ paddingLeft: 5 }}>
            {intl.formatMessage({
              defaultMessage: 'Town/City',
            })}
          </Text>
        </Col>
        <Col className={classes.headerCell} span={3}>
          <Text strong style={{ paddingLeft: 5 }}>
            {intl.formatMessage({
              defaultMessage: 'County',
            })}
          </Text>
        </Col>
        <Col className={classes.headerCell} span={2}>
          <Text strong style={{ paddingLeft: 5 }}>
            {intl.formatMessage({
              defaultMessage: 'Postcode',
            })}
          </Text>
        </Col>
      </Row>

      {activeIncidents.map((business) => (
        <NewBusinessRow
          business={business}
          key={business.id}
          onDelete={onDelete}
          onUpdateBusiness={onUpdateBusiness}
        />
      ))}

      <Pagination
        current={currentPage}
        hideOnSinglePage
        onChange={setCurrentPage}
        pageSizeOptions={[10]}
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
        total={newBusinesses.length}
      />
    </Card>
  );
};

export default React.memo(NewBusinessTable);
