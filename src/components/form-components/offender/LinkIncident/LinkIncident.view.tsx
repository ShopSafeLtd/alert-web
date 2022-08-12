/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { ListIncidentsQuery } from 'graphql/generated';
import {
  Typography,
  Row,
  Col,
  Tabs,
  Descriptions,
  Button,
  Input,
  Divider,
  Skeleton,
  Pagination,
  Form,
  Checkbox,
} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faUser } from '@fortawesome/pro-light-svg-icons';

import { SRLWrapper } from 'simple-react-lightbox';

const { Title, Text } = Typography;
interface FormData {
  selectedIncidentIds: string[];
}

interface Props {
  onClose: () => void;
  onSubmit: (value: FormData) => void;
  saving: boolean;
  data: ListIncidentsQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  onPaginationChange: (page: number, pageSize: number) => void;
  openLightbox: (index: number) => void;
  setCurrentId: (value: string | undefined) => void;
  incidentData:
    | Exclude<
        ListIncidentsQuery['listIncidents'],
        undefined | null
      >['incidents'][0]
    | undefined;
}

const LinkIncident = ({
  onClose,
  onSubmit,
  saving,
  data,
  loading,
  search,
  setSearch,
  openLightbox,
  onPaginationChange,
  setCurrentId,
  incidentData,
}: Props): JSX.Element => (
  <Form layout="vertical" onFinish={onSubmit}>
    <Row gutter={8} style={{ marginBottom: 10 }}>
      <Col span={22}>
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search Incidents..."
          allowClear
        />
      </Col>
    </Row>
    <Row>
      <Col span={8}>
        <div className="incidents-side-list">
          <Form.Item
            name="selectedIncidentIds"
            label="incidents:"
            rules={[
              {
                required: true,
                message:
                  'Please at least select an existing incident for the offender.',
              },
            ]}
          >
            <Checkbox.Group>
              {data?.listIncidents?.incidents.map((incident) => (
                <div key={incident.id} className="incident-item">
                  <Row wrap={false}>
                    <Checkbox
                      value={incident.id}
                      onChange={() => setCurrentId(incident.id)}
                      style={{ lineHeight: '32px', borderColor: 'black' }}
                    >
                      <Col>
                        {incident.images.length > 0 ? (
                          <div
                            className="incident-item-image"
                            style={{
                              backgroundImage: `url(${incident.images[0].optimised})`,
                            }}
                          />
                        ) : (
                          <Skeleton.Image className="incident-item-image-skeleton" />
                        )}
                      </Col>
                      <Col className="incident-item-content" flex={1}>
                        <Text ellipsis>{incident.subject}</Text>
                      </Col>
                    </Checkbox>
                  </Row>

                  <Divider className="incident-item-divider" />
                </div>
              ))}
            </Checkbox.Group>
          </Form.Item>

          <Pagination
            total={data?.listIncidents?.total}
            size="small"
            showSizeChanger={false}
            onChange={onPaginationChange}
          />
        </div>
      </Col>
      <Col span={14}>
        <div className="view-incident">
          <Row
            gutter={8}
            justify="start"
            align="middle"
            className="incident-images"
            wrap={false}
          >
            {incidentData?.images.map((image, i) => (
              <Col key={image.id}>
                <div
                  onClick={() => openLightbox(i)}
                  className="incident-image"
                  style={{ backgroundImage: `url(${image.optimised})` }}
                />
              </Col>
            ))}
          </Row>

          <Tabs>
            <Tabs.TabPane key={0} tab="Details">
              <Row>
                <Col span={24} style={{ margin: 10 }}>
                  {loading ? (
                    <Skeleton />
                  ) : (
                    <>
                      <Title level={4}>{incidentData?.subject}</Title>
                      {incidentData?.groups?.map((group) => (
                        <Text key={group.id} type="danger" ellipsis>
                          {group.name}
                        </Text>
                      ))}
                    </>
                  )}
                  <Descriptions column={1} className="incident-descriptions">
                    <Descriptions.Item
                      span={2}
                      label={
                        <span>
                          <FontAwesomeIcon
                            className="incident-description-icon"
                            icon={faClock}
                          />
                          Created At
                        </span>
                      }
                    >
                      {loading ? (
                        <Skeleton title={{ width: 100 }} paragraph={false} />
                      ) : (
                        incidentData?.dayTime
                      )}
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={
                        <span>
                          <FontAwesomeIcon
                            className="incident-description-icon"
                            icon={faUser}
                          />
                          Created By
                        </span>
                      }
                    >
                      {loading ? (
                        <Skeleton title={{ width: 100 }} paragraph={false} />
                      ) : (
                        `${incidentData?.createdBy?.fullName} -
                        ${incidentData?.createdBy?.organisation}`
                      )}
                    </Descriptions.Item>
                  </Descriptions>
                </Col>
              </Row>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </Col>
    </Row>

    <SRLWrapper
      elements={
        incidentData?.images.map((image) => ({
          src: image.optimised || '',
        })) || []
      }
      options={{ buttons: { showDownloadButton: false } }}
    />
    <Form.Item>
      <Row style={{ marginTop: 30 }} gutter={10} justify="end">
        <Col>
          <Button disabled={saving} onClick={onClose}>
            Cancel
          </Button>
        </Col>
        <Col>
          <Button
            disabled={saving}
            loading={saving}
            type="primary"
            htmlType="submit"
          >
            Link incident
          </Button>
        </Col>
      </Row>
    </Form.Item>
  </Form>
);

export default LinkIncident;
