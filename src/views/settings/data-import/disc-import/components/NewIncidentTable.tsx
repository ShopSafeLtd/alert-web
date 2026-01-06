import type { Theme } from 'configs/ThemeConfig';
import type { SchemeGroupsQuery } from 'graphql/groups/queries/__generated__/scheme-groups.generated';
import type { TagsQuery } from 'graphql/tags/queries/__generated__/tags.generated';

import DatePicker from '#/components/util-components/DatePicker';
import { faTrash } from '@fortawesome/pro-light-svg-icons';
import { faImages } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Pagination,
  Popconfirm,
  Radio,
  Row,
  Select,
  Skeleton,
  Space,
} from 'antd';
import dayjs from 'dayjs';
import { TagType } from 'graphql/types';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';

import type {
  NewBusiness,
  NewIncident,
  NewOffender,
  NewUser,
} from '../DiscImport.types';

const useStyles = createUseStyles((theme: Theme) => ({
  bottomRow: {
    borderBottom: `1px solid ${theme.borderColor}`,
    marginBottom: 10,
    paddingLeft: 7,
  },
  cell: {},
  headerRow: {
    borderTopLeftRadius: 10,
    marginLeft: '0px !important',
    marginRight: '0px !important',
  },
  row: {
    paddingLeft: 7,
  },
}));

interface NewIncidentRowProps {
  groupsData: SchemeGroupsQuery | undefined;
  incident: NewIncident;
  newBusinesses: NewBusiness[];
  newOffenders: NewOffender[];
  newUsers: NewUser[];
  onDelete: (id: string) => void;
  onUpdateIncident: (data: NewIncident) => void;
  tagsData: TagsQuery | undefined;
}

// eslint-disable-next-line react/display-name
const NewOffenderRow = React.memo(
  ({
    groupsData,
    incident,
    newBusinesses,
    newOffenders,
    newUsers,
    onDelete,
    onUpdateIncident,
    tagsData,
  }: NewIncidentRowProps) => {
    const [form] = Form.useForm<NewIncident>();

    const classes = useStyles();

    useEffect(() => {
      form.setFieldsValue({
        ...incident,
      });
      void form.validateFields();
    }, [incident]);

    const onBlur = () => {
      const values = form.getFieldsValue();
      onUpdateIncident({ ...incident, ...values });
    };
    const intl = useIntl();
    return (
      <Form form={form} layout="vertical">
        <Row className={classes.row} gutter={8}>
          <Col className={classes.cell} style={{ marginTop: 10, width: 160 }}>
            {incident.images.length > 0 && (
              <div
                style={{
                  backgroundImage: `url(${incident.images[0]?.url})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  borderRadius: 5,
                  cursor: 'pointer',
                  height: 150,
                  position: 'relative',
                  width: 150,
                }}
              >
                {incident.images.length > 1 && (
                  <FontAwesomeIcon
                    color="#FFF"
                    icon={faImages}
                    size="lg"
                    style={{ bottom: 10, position: 'absolute', right: 10 }}
                  />
                )}
              </div>
            )}
            {incident.images.length === 0 && (
              <Skeleton.Image style={{ height: 150, width: 150 }} />
            )}
          </Col>
          <Col flex={1}>
            <Row gutter={8}>
              <Col>
                <Row gutter={8}>
                  <Col className={classes.cell} span={12}>
                    <Form.Item
                      getValueProps={(value: unknown) => {
                        const dayjsValue = value as
                          | { toDate?: () => Date }
                          | Date
                          | undefined;
                        return {
                          value:
                            dayjsValue &&
                            typeof dayjsValue === 'object' &&
                            'toDate' in dayjsValue
                              ? dayjsValue.toDate()
                              : dayjsValue,
                        };
                      }}
                      label={intl.formatMessage({
                        defaultMessage: 'Date',
                      })}
                      name="date"
                      normalize={(value: unknown) => {
                        if (!value) return value;
                        return value instanceof Date ? dayjs(value) : value;
                      }}
                    >
                      <DatePicker format="DD/MM/YYYY" onBlur={onBlur} />
                    </Form.Item>
                  </Col>
                  <Col className={classes.cell} span={12}>
                    <Form.Item
                      getValueProps={(value: unknown) => {
                        const dayjsValue = value as
                          | { toDate?: () => Date }
                          | Date
                          | undefined;
                        return {
                          value:
                            dayjsValue &&
                            typeof dayjsValue === 'object' &&
                            'toDate' in dayjsValue
                              ? dayjsValue.toDate()
                              : dayjsValue,
                        };
                      }}
                      label={intl.formatMessage({
                        defaultMessage: 'Time',
                      })}
                      name="time"
                      normalize={(value: unknown) => {
                        if (!value) return value;
                        return value instanceof Date ? dayjs(value) : value;
                      }}
                    >
                      <DatePicker format="HH:mm" onBlur={onBlur} />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col className={classes.cell} span={3} style={{ maxWidth: 260 }}>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Offenders',
                  })}
                  name="offenders"
                >
                  <Select
                    disabled
                    mode="multiple"
                    onBlur={onBlur}
                    options={newOffenders.map((item) => ({
                      label: item.name,
                      value: item.id,
                    }))}
                    style={{ width: 250 }}
                  />
                </Form.Item>
              </Col>
              <Col className={classes.cell} span={3} style={{ maxWidth: 250 }}>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Created by',
                  })}
                  name="createdBy"
                >
                  <Select
                    onBlur={onBlur}
                    options={newUsers.map((item) => ({
                      label: item.fullName,
                      value: item.id,
                    }))}
                  />
                </Form.Item>
              </Col>
              <Col className={classes.cell} span={3} style={{ maxWidth: 250 }}>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Business',
                  })}
                  name="business"
                >
                  <Select
                    allowClear
                    onBlur={onBlur}
                    options={newBusinesses.map((item) => ({
                      label: item.name,
                      value: item.id,
                    }))}
                  />
                </Form.Item>
              </Col>
              <Col className={classes.cell} span={3} style={{ maxWidth: 250 }}>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Groups',
                  })}
                  name="groups"
                  rules={[
                    {
                      message: intl.formatMessage({
                        defaultMessage: 'Choose at least one group',
                      }),
                      required: true,
                    },
                  ]}
                >
                  <Select
                    mode="multiple"
                    onBlur={onBlur}
                    options={groupsData?.groups?.map((item) => ({
                      label: item.name,
                      value: item.id,
                    }))}
                  />
                </Form.Item>
              </Col>
              <Col style={{ marginTop: 30 }}>
                <Popconfirm
                  onConfirm={() => onDelete(incident.id)}
                  overlayInnerStyle={{ padding: 10 }}
                  title={intl.formatMessage({
                    defaultMessage:
                      'Are you sure you want to delete this incident?',
                  })}
                >
                  <Button size="small">
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </Popconfirm>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={8}>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Incident Types',
                  })}
                  name="crimeTypes"
                  rules={[
                    {
                      message: intl.formatMessage({
                        defaultMessage: 'Choose at least one incident type',
                      }),
                      required: true,
                    },
                  ]}
                >
                  <Select
                    maxTagCount={2}
                    mode="multiple"
                    onBlur={onBlur}
                    options={tagsData?.tags
                      .filter((tag) => tag.type === TagType.IncidentCrimeType)
                      .map((tag) => ({
                        label: tag.name,
                        value: tag.id,
                      }))}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Impact Types',
                  })}
                  name="impactTypes"
                >
                  <Select
                    maxTagCount={2}
                    mode="multiple"
                    onBlur={onBlur}
                    options={tagsData?.tags
                      .filter((tag) => tag.type === TagType.IncidentImpact)
                      .map((tag) => ({
                        label: tag.name,
                        value: tag.id,
                      }))}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Involved Types',
                  })}
                  name="involvedTypes"
                >
                  <Select
                    maxTagCount={2}
                    mode="multiple"
                    onBlur={onBlur}
                    options={tagsData?.tags
                      .filter((tag) => tag.type === TagType.IncidentInvolved)
                      .map((tag) => ({
                        label: tag.name,
                        value: tag.id,
                      }))}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Value',
              })}
              name="lostValue"
            >
              <InputNumber onBlur={onBlur} />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Recovered Value',
              })}
              name="recoveredValue"
            >
              <InputNumber onBlur={onBlur} />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Police Involved',
              })}
              name="policeInvolved"
            >
              <Radio.Group
                onBlur={onBlur}
                optionType="button"
                options={[
                  {
                    label: 'Yes',
                    value: true,
                  },
                  {
                    label: 'No',
                    value: false,
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Police Ref',
              })}
              name="policeRef"
            >
              <Input onBlur={onBlur} />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Building',
              })}
              name="building"
            >
              <Input onBlur={onBlur} />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Street',
              })}
              name="street"
              rules={[{ required: true }]}
            >
              <Input onBlur={onBlur} />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Town/City',
              })}
              name="townCity"
            >
              <Input onBlur={onBlur} />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'County',
              })}
              name="county"
            >
              <Input onBlur={onBlur} />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Postcode',
              })}
              name="postcode"
            >
              <Input onBlur={onBlur} />
            </Form.Item>
          </Col>
        </Row>
        <Row className={classes.bottomRow} gutter={8}>
          <Col className={classes.cell} span={12}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Description',
              })}
              name="description"
            >
              <Input.TextArea onBlur={onBlur} rows={5} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
);

interface Props {
  groupsData: SchemeGroupsQuery | undefined;
  newBusinesses: NewBusiness[];
  newIncidents: NewIncident[];
  newOffenders: NewOffender[];
  newUsers: NewUser[];
  onAdd: () => void;
  onUpdateIncident: (data: NewIncident) => void;
  rematchIncidentOffenders: () => void;
  tagsData: TagsQuery | undefined;
}

const NewIncidentTable = ({
  groupsData,
  newBusinesses = [],
  newIncidents,
  newOffenders = [],
  newUsers = [],
  onAdd,
  onUpdateIncident,
  rematchIncidentOffenders,
  tagsData,
}: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeIncidents, setActiveIncidents] = useState<NewIncident[]>(
    newIncidents.slice(0, 10)
  );

  useEffect(() => {
    setActiveIncidents(
      newIncidents.slice((currentPage - 1) * 10, 10 * currentPage)
    );
  }, [currentPage]);
  const intl = useIntl();
  return (
    <Card
      extra={
        <Space>
          <Button
            onClick={rematchIncidentOffenders}
            style={{ marginBottom: 16 }}
          >
            <FormattedMessage defaultMessage="Rematch Offenders" />
          </Button>
          <Button onClick={onAdd} style={{ marginBottom: 16 }} type="primary">
            <FormattedMessage defaultMessage="Add Incident" />
          </Button>
        </Space>
      }
      title={intl.formatMessage(
        {
          defaultMessage: 'Incidents: {total}',
        },
        {
          total: newIncidents.length,
        }
      )}
    >
      {activeIncidents.map((incident) => (
        <NewOffenderRow
          groupsData={groupsData}
          incident={incident}
          key={incident.id}
          newBusinesses={newBusinesses}
          newOffenders={newOffenders}
          newUsers={newUsers}
          onDelete={() => {}}
          onUpdateIncident={onUpdateIncident}
          tagsData={tagsData}
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
              defaultMessage: 'Total Incidents: {total}',
            },
            {
              total,
            }
          )
        }
        total={newOffenders.length}
      />
    </Card>
  );
};

export default React.memo(NewIncidentTable);
