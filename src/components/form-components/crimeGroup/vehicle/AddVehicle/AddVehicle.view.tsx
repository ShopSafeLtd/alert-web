import React from 'react';
import {
  Button,
  Col,
  Divider,
  Drawer,
  Form,
  Image,
  Input,
  Modal,
  Row,
  Select,
  Skeleton,
  Table,
  Tooltip,
} from 'antd';
import { ListCrimeGroupsQuery, ListIncidentsQuery } from 'graphql/generated';
import { OffenderData } from 'components/viewChat/ViewMessage/useViewMessage';
import LinkOffender from 'components/form-components/incident/offender/AddExistingOffender';
import LinkIncident from 'components/form-components/offender/LinkIncident';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/pro-light-svg-icons';
import useStyles from './AddVehicle.styles';

interface FormData {
  make?: string;
  model?: string;
  colour?: string;
  registration?: string;
  crimeGroup?: string[];
}
const { confirm } = Modal;
interface Props {
  onClose: () => void;
  onSubmit: (value: FormData) => void;
  CrimeGroupsData: ListCrimeGroupsQuery | undefined;
  CrimeGroupsLoading: boolean;
  saving: boolean;
  offendersData: OffenderData[];
  incidentsData:
    | Exclude<
        ListIncidentsQuery['listIncidents'],
        undefined | null
      >['incidents'];
  linkIncident: boolean;
  linkOffender: boolean;
  toggleLinkIncident: () => void;
  toggleLinkOffender: () => void;
  updateOffendersList: (value: OffenderData) => void;
  updateIncidentList: (value: string) => void;
  removeOffender: (value: string | undefined) => void;
  removeIncident: (value: string | undefined) => void;
  adminRights: boolean;
}

const AddVehicle = ({
  onClose,
  onSubmit,
  CrimeGroupsData,
  CrimeGroupsLoading,
  saving,
  offendersData,
  incidentsData,
  linkIncident,
  linkOffender,
  toggleLinkIncident,
  toggleLinkOffender,
  updateIncidentList,
  updateOffendersList,
  removeOffender,
  removeIncident,
  adminRights,
}: Props): JSX.Element => {
  const classes = useStyles();
  return (
    <div>
      <Form layout="vertical" onFinish={onSubmit}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="make"
              label="Make"
              // rules={[
              //   {
              //     required: true,
              //     message: 'Please enter a make for the new vehicle.',
              //   },
              // ]}
            >
              <Input disabled={saving} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="model" label="Model">
              <Input disabled={saving} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="colour" label="Colour">
              <Input disabled={saving} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="registration" label="Registration">
              <Input disabled={saving} />
            </Form.Item>
          </Col>
        </Row>

        {adminRights && (
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="crimeGroup" label="Crime Groups">
                <Select
                  loading={CrimeGroupsLoading}
                  disabled={saving}
                  mode="multiple"
                  maxTagCount={3}
                  filterOption
                  optionFilterProp="label"
                  options={CrimeGroupsData?.listCrimeGroups.crimeGroups.map(
                    (crimeGroup) => ({
                      value: crimeGroup.id,
                      label: crimeGroup.reference,
                    })
                  )}
                />
              </Form.Item>
            </Col>
          </Row>
        )}
        {adminRights && (
          <Row gutter={16}>
            {!(incidentsData && incidentsData.length) && (
              <Col>
                <Button
                  onClick={toggleLinkIncident}
                  disabled={saving || linkOffender}
                  icon={
                    <FontAwesomeIcon
                      className="button-icon"
                      icon={faPlus}
                      size="lg"
                    />
                  }
                >
                  Link Incident
                </Button>
              </Col>
            )}
            {!(offendersData && offendersData.length) && (
              <Col>
                <div>
                  <Button
                    onClick={toggleLinkOffender}
                    disabled={saving || linkIncident}
                    icon={
                      <FontAwesomeIcon
                        className="button-icon"
                        icon={faPlus}
                        size="lg"
                      />
                    }
                  >
                    Link Offender
                  </Button>
                </div>
              </Col>
            )}
          </Row>
        )}

        {incidentsData && incidentsData.length ? (
          <>
            <Divider>Linked Incidents</Divider>
            <Table
              columns={[
                {
                  key: 'reference',
                  dataIndex: 'reference',
                  title: 'Reference',
                },
                {
                  key: 'subject',
                  dataIndex: 'subject',
                  title: 'Subject',
                },
                {
                  key: 'date',
                  dataIndex: 'date',
                  title: 'Date',
                },
                {
                  key: 'Options',
                  title: 'Delete',
                  dataIndex: 'Options',
                  // width: 100,
                  render: (_, record) => (
                    <Row>
                      <Col>
                        <Tooltip title="Remove Incident">
                          <Button
                            size="small"
                            disabled={saving}
                            onClick={() => {
                              confirm({
                                title: 'Do you want to remove the incident?',
                                content: 'This action cannot be undone.',
                                onOk() {
                                  removeIncident(record.key);
                                },
                              });
                            }}
                            icon={<FontAwesomeIcon icon={faTrash} />}
                          />
                        </Tooltip>
                      </Col>
                    </Row>
                  ),
                },
              ]}
              dataSource={incidentsData.map((incident) => ({
                subject: incident.subject,
                reference: incident.reference,

                date: incident.dayTime,

                key: incident.id,
              }))}
              pagination={false}
              size="small"
            />
            {adminRights && (
              <Row gutter={16} style={{ marginTop: 5 }}>
                <Col flex={1} />
                <Col>
                  <Button
                    onClick={toggleLinkIncident}
                    disabled={saving || linkOffender}
                    icon={
                      <FontAwesomeIcon
                        className="button-icon"
                        icon={faPlus}
                        size="lg"
                      />
                    }
                  >
                    Link Incident
                  </Button>
                </Col>
              </Row>
            )}
          </>
        ) : null}

        {offendersData && offendersData.length ? (
          <>
            <Divider>Linked Offenders</Divider>
            <Table
              columns={[
                {
                  key: 'images',
                  dataIndex: 'images',
                  title: 'Image',
                  render: (images: { id: string; optimised: string }[]) =>
                    // eslint-disable-next-line
                    images.length > 0 ? (
                      <div className={classes.searchImageContainer}>
                        <Image
                          className={classes.searchImage}
                          // eslint-disable-next-line
                          src={images[0]?.optimised}
                        />
                      </div>
                    ) : (
                      <Skeleton.Image className={classes.imageSkeleton} />
                    ),
                  onCell: () => ({
                    className: classes.imageCell,
                  }),
                },
                {
                  key: 'name',
                  dataIndex: 'name',
                  title: 'Name',
                },

                {
                  key: 'Options',
                  title: 'Delete',
                  dataIndex: 'Options',
                  width: 5,
                  render: (_, record) => (
                    <Row>
                      <Col>
                        <Tooltip title="Remove Offender">
                          <Button
                            size="small"
                            disabled={saving}
                            onClick={() => {
                              confirm({
                                title: 'Do you want to remove the offender?',
                                content: 'This action cannot be undone.',
                                onOk() {
                                  removeOffender(record.key);
                                },
                              });
                            }}
                            icon={<FontAwesomeIcon icon={faTrash} />}
                          />
                        </Tooltip>
                      </Col>
                    </Row>
                  ),
                },
              ]}
              dataSource={offendersData.map((offender) => ({
                key: offender.id,
                name: offender.name,
                images: offender.images,
              }))}
              pagination={false}
              size="small"
            />
            {adminRights && (
              <Row gutter={16} style={{ marginTop: 5 }}>
                <Col flex={1} />
                <Col>
                  <Button
                    onClick={toggleLinkOffender}
                    disabled={saving || linkOffender}
                    icon={
                      <FontAwesomeIcon
                        className="button-icon"
                        icon={faPlus}
                        size="lg"
                      />
                    }
                  >
                    Link Offender
                  </Button>
                </Col>
              </Row>
            )}
          </>
        ) : null}

        <Form.Item>
          <Row style={{ marginTop: 30 }} gutter={16} justify="end">
            <Col>
              <Button disabled={saving} onClick={onClose}>
                Cancel
              </Button>
            </Col>
            <Col>
              <Button
                type="primary"
                htmlType="submit"
                disabled={saving}
                loading={saving}
              >
                Create Vehicle
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
      <Drawer
        title="Link Offenders"
        visible={linkOffender}
        width="800"
        onClose={toggleLinkOffender}
      >
        {linkOffender ? (
          <LinkOffender
            update={updateOffendersList}
            onClose={toggleLinkOffender}
            offenderIds={offendersData.map(({ id }) => id)}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        title="Link Incidents"
        visible={linkIncident}
        width="800"
        onClose={toggleLinkIncident}
      >
        {linkIncident ? (
          <LinkIncident
            update={updateIncidentList}
            onClose={toggleLinkIncident}
            incidentIds={incidentsData?.map(({ id }) => id)}
          />
        ) : (
          <div />
        )}
      </Drawer>
    </div>
  );
};

export default AddVehicle;
