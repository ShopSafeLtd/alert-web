import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Pagination,
  Popconfirm,
  Radio,
  Row,
  Select,
  Skeleton,
} from 'antd';
import { createUseStyles } from 'react-jss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/pro-light-svg-icons';
import { faImages } from '@fortawesome/pro-solid-svg-icons';
import type { Theme } from 'configs/ThemeConfig';
import type { SchemeGroupsQuery, TagsQuery } from 'graphql/generated';
import { TagType } from 'graphql/generated';
import type {
  NewBusiness,
  NewIncident,
  NewOffender,
  NewUser,
} from '../DiscImport.types';

const useStyles = createUseStyles((theme: Theme) => ({
  cell: {},
  row: {
    paddingLeft: 7,
  },
  bottomRow: {
    paddingLeft: 7,
    marginBottom: 10,
    borderBottom: `1px solid ${theme.borderColor}`,
  },
  headerRow: {
    marginLeft: '0px !important',
    marginRight: '0px !important',
    borderTopLeftRadius: 10,
  },
}));

interface NewIncidentRowProps {
  incident: NewIncident;
  groupsData: SchemeGroupsQuery | undefined;
  onDelete: (id: string) => void;
  tagsData: TagsQuery | undefined;
  newOffenders: NewOffender[];
  newUsers: NewUser[];
  newBusinesses: NewBusiness[];
  onUpdateIncident: (data: NewIncident) => void;
}

const NewOffenderRow = React.memo(
  ({
    incident,
    onDelete,
    groupsData,
    tagsData,
    newOffenders,
    newBusinesses,
    newUsers,
    onUpdateIncident,
  }: NewIncidentRowProps) => {
    const [form] = Form.useForm<NewIncident>();

    const classes = useStyles();

    useEffect(() => {
      form.setFieldsValue({
        ...incident,
      });
      form.validateFields();
    }, [incident]);

    const onBlur = () => {
      const values = form.getFieldsValue();
      onUpdateIncident({ ...incident, ...values });
    };

    return (
      <Form layout="vertical" form={form}>
        <Row gutter={8} className={classes.row}>
          <Col className={classes.cell} style={{ width: 160, marginTop: 10 }}>
            {incident.images.length > 0 && (
              <div
                style={{
                  height: 150,
                  width: 150,
                  backgroundImage: `url(${incident.images[0]?.url})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  borderRadius: 5,
                  position: 'relative',
                  cursor: 'pointer',
                }}
              >
                {incident.images.length > 1 && (
                  <FontAwesomeIcon
                    icon={faImages}
                    style={{ position: 'absolute', right: 10, bottom: 10 }}
                    color="#FFF"
                    size="lg"
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
                  <Col span={12} className={classes.cell}>
                    <Form.Item name="date" label="Date">
                      <DatePicker onBlur={onBlur} format="DD/MM/YYYY" />
                    </Form.Item>
                  </Col>
                  <Col span={12} className={classes.cell}>
                    <Form.Item name="time" label="Time">
                      <DatePicker onBlur={onBlur} format="HH:mm" />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col span={3} className={classes.cell} style={{ maxWidth: 260 }}>
                <Form.Item name="offenders" label="Offenders">
                  <Select
                    options={newOffenders.map((item) => ({
                      value: item.id,
                      label: item.name,
                    }))}
                    disabled
                    style={{ width: 250 }}
                    mode="multiple"
                    onBlur={onBlur}
                  />
                </Form.Item>
              </Col>
              <Col span={3} className={classes.cell} style={{ maxWidth: 250 }}>
                <Form.Item name="createdBy" label="Created By">
                  <Select
                    options={newUsers.map((item) => ({
                      value: item.id,
                      label: item.fullName,
                    }))}
                    onBlur={onBlur}
                  />
                </Form.Item>
              </Col>
              <Col span={3} className={classes.cell} style={{ maxWidth: 250 }}>
                <Form.Item name="business" label="Business">
                  <Select
                    allowClear
                    options={newBusinesses.map((item) => ({
                      value: item.id,
                      label: item.name,
                    }))}
                    onBlur={onBlur}
                  />
                </Form.Item>
              </Col>
              <Col span={3} className={classes.cell} style={{ maxWidth: 250 }}>
                <Form.Item
                  name="groups"
                  label="Groups"
                  rules={[
                    { required: true, message: 'Choose at least one group' },
                  ]}
                >
                  <Select
                    options={groupsData?.groups?.map((item) => ({
                      value: item.id,
                      label: item.name,
                    }))}
                    mode="multiple"
                    onBlur={onBlur}
                  />
                </Form.Item>
              </Col>
              <Col style={{ marginTop: 30 }}>
                <Popconfirm
                  overlayInnerStyle={{ padding: 10 }}
                  title="Are you sure you want to remove this user?"
                  onConfirm={() => onDelete(incident.id)}
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
                  name="crimeTypes"
                  label="Crime Types"
                  rules={[
                    { required: true, message: 'Choose at least one type' },
                  ]}
                >
                  <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    maxTagCount={2}
                    options={tagsData?.tags
                      .filter((tag) => tag.type === TagType.IncidentCrimeType)
                      .map((tag) => ({
                        value: tag.id,
                        label: tag.name,
                      }))}
                    onBlur={onBlur}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="impactTypes" label="Impact Types">
                  <Select
                    mode="multiple"
                    maxTagCount={2}
                    style={{ width: '100%' }}
                    options={tagsData?.tags
                      .filter((tag) => tag.type === TagType.IncidentImpact)
                      .map((tag) => ({
                        value: tag.id,
                        label: tag.name,
                      }))}
                    onBlur={onBlur}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="involvedTypes" label="Involved Types">
                  <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    maxTagCount={2}
                    options={tagsData?.tags
                      .filter((tag) => tag.type === TagType.IncidentInvolved)
                      .map((tag) => ({
                        value: tag.id,
                        label: tag.name,
                      }))}
                    onBlur={onBlur}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col>
            <Form.Item name="lostValue" label="Value">
              <InputNumber onBlur={onBlur} />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item name="recoveredValue" label="Recovered Value">
              <InputNumber onBlur={onBlur} />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item name="policeInvolved" label="Police Attended">
              <Radio.Group
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
                optionType="button"
                onBlur={onBlur}
              />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item name="policeRef" label="Crime Number">
              <Input onBlur={onBlur} />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item name="building" label="Building">
              <Input onBlur={onBlur} />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name="street"
              label="Street"
              rules={[{ required: true }]}
            >
              <Input onBlur={onBlur} />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item name="townCity" label="Town/City">
              <Input onBlur={onBlur} />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item name="county" label="County">
              <Input onBlur={onBlur} />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item name="postcode" label="Postcode">
              <Input onBlur={onBlur} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={8} className={classes.bottomRow}>
          <Col span={12} className={classes.cell}>
            <Form.Item name="description" label="Description">
              <Input.TextArea onBlur={onBlur} rows={5} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
);

interface Props {
  onAdd: () => void;
  newIncidents: NewIncident[];
  groupsData: SchemeGroupsQuery | undefined;
  tagsData: TagsQuery | undefined;
  newOffenders: NewOffender[];
  newUsers: NewUser[];
  newBusinesses: NewBusiness[];
  onUpdateIncident: (data: NewIncident) => void;
}

const NewIncidentTable = ({
  onAdd,
  newIncidents,
  groupsData,
  tagsData,
  newOffenders = [],
  newBusinesses = [],
  newUsers = [],
  onUpdateIncident,
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

  return (
    <Card
      title={`Incidents (${newIncidents.length})`}
      extra={
        <Button type="primary" style={{ marginBottom: 16 }} onClick={onAdd}>
          Add Incident
        </Button>
      }
    >
      {activeIncidents.map((incident) => (
        <NewOffenderRow
          key={incident.id}
          incident={incident}
          onDelete={() => {}}
          groupsData={groupsData}
          tagsData={tagsData}
          newOffenders={newOffenders}
          newBusinesses={newBusinesses}
          newUsers={newUsers}
          onUpdateIncident={onUpdateIncident}
        />
      ))}

      <Pagination
        current={currentPage}
        onChange={setCurrentPage}
        total={newOffenders.length}
        showTotal={(total) => `Total Incidents: ${total}`}
        pageSizeOptions={[10]}
      />
    </Card>
  );
};

export default React.memo(NewIncidentTable);
