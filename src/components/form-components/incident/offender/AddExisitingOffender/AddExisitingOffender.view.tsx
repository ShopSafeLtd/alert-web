/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { ListOffendersQuery } from 'graphql/generated';
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
import {
  faLocationDot,
  faClock,
  faUserTag,
  faUserClock,
  faEarth,
  faMarsAndVenus,
  faUserHair,
  faCircleInfo,
} from '@fortawesome/pro-light-svg-icons';
import {
  getOffenderAge,
  getOffenderBuild,
  getOffenderGender,
  getOffenderRace,
  getLastOffence,
  calcAge,
} from 'utils/offender/get-offender-desc';

import { SRLWrapper } from 'simple-react-lightbox';
import moment from 'moment';

const { Title, Text } = Typography;
interface FormData {
  selectedOffenderIds: string[];
}

interface Props {
  onClose: () => void;
  onSubmit: (value: FormData) => void;
  saving: boolean;
  data: ListOffendersQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  onPaginationChange: (page: number, pageSize: number) => void;
  openLightbox: (index: number) => void;
  setCurrentId: (value: string | undefined) => void;
  offenderData:
    | Exclude<
        ListOffendersQuery['listOffenders'],
        undefined | null
      >['offenders'][0]
    | undefined;
}

const AddExisitingOffender = ({
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
  offenderData,
}: Props): JSX.Element => (
  <Form layout="vertical" onFinish={onSubmit}>
    <Row gutter={8} style={{ marginBottom: 10 }}>
      <Col span={22}>
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search Offenders..."
          allowClear
        />
      </Col>
    </Row>
    <Row>
      <Col span={8}>
        {/* <OffenderSideList current={offenderId} /> */}
        <div className="offenders-side-list">
          <Form.Item
            name="selectedOffenderIds"
            label="Offenders:"
            rules={[
              {
                required: true,
                message:
                  'Please at least select an existing offender for the incident.',
              },
            ]}
          >
            <Checkbox.Group>
              {data?.listOffenders?.offenders.map((offender) => (
                <div key={offender.id} className="offender-item">
                  <Row wrap={false} key={offender.id}>
                    <Checkbox
                      value={offender.id}
                      onChange={() => setCurrentId(offender.id)}
                      style={{ lineHeight: '32px', borderColor: 'black' }}
                    >
                      <Col>
                        {offender.images.length > 0 ? (
                          <div
                            className="offender-item-image"
                            style={{
                              backgroundImage: `url(${offender.images[0].optimised})`,
                            }}
                          />
                        ) : (
                          <Skeleton.Image className="offender-item-image-skeleton" />
                        )}
                      </Col>
                      <Col className="offender-item-content" flex={1}>
                        <Text ellipsis>{offender.name}</Text>
                      </Col>
                    </Checkbox>
                  </Row>

                  <Divider className="offender-item-divider" />
                </div>
              ))}
            </Checkbox.Group>
          </Form.Item>

          <Pagination
            total={data?.listOffenders?.total}
            size="small"
            showSizeChanger={false}
            onChange={onPaginationChange}
          />
        </div>
      </Col>
      <Col span={14}>
        <div className="view-offender">
          <Row
            gutter={8}
            justify="start"
            align="middle"
            wrap={false}
            className="offender-images"
          >
            {offenderData?.images.map((image, i) => (
              <Col key={image.id}>
                <div
                  onClick={() => openLightbox(i)}
                  className="offender-image"
                  style={{ backgroundImage: `url(${image.optimised})` }}
                />
              </Col>
            ))}
          </Row>

          <Tabs>
            <Tabs.TabPane key={0} tab="Details">
              <Row>
                <Col span={24} style={{ margin: 10 }}>
                  <Title level={4}>{offenderData?.name}</Title>
                  {offenderData?.groups?.map((group) => (
                    <Text key={group.id} type="danger" ellipsis>
                      {group.name}
                    </Text>
                  ))}

                  <Descriptions column={1} className="offender-descriptions">
                    <Descriptions.Item
                      span={2}
                      label={
                        <span>
                          <FontAwesomeIcon
                            className="offender-description-icon"
                            icon={faClock}
                          />
                          Last updated
                        </span>
                      }
                    >
                      {loading ? (
                        <Skeleton title={{ width: 100 }} paragraph={false} />
                      ) : (
                        moment(offenderData?.updatedAt || moment()).format(
                          `ddd MMM DD YYYY - HH:mm`
                        )
                      )}
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={
                        <span>
                          <FontAwesomeIcon
                            className="offender-description-icon"
                            icon={faUserClock}
                          />
                          Age
                        </span>
                      }
                    >
                      {loading ? (
                        <Skeleton title={{ width: 100 }} paragraph={false} />
                      ) : (
                        (offenderData?.dateOfBirth &&
                          calcAge(offenderData?.dateOfBirth)) ||
                        getOffenderAge(offenderData?.age)
                      )}
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={
                        <span>
                          <FontAwesomeIcon
                            className="offender-description-icon"
                            icon={faUserTag}
                          />
                          Build
                        </span>
                      }
                    >
                      {loading ? (
                        <Skeleton title={{ width: 100 }} paragraph={false} />
                      ) : (
                        getOffenderBuild(offenderData?.build)
                      )}
                    </Descriptions.Item>
                    {offenderData?.hair && (
                      <Descriptions.Item
                        label={
                          <span>
                            <FontAwesomeIcon
                              className="offender-description-icon"
                              icon={faUserHair}
                            />
                            Hair
                          </span>
                        }
                      >
                        {loading ? (
                          <Skeleton title={{ width: 100 }} paragraph={false} />
                        ) : (
                          offenderData?.hair
                        )}
                      </Descriptions.Item>
                    )}
                    <Descriptions.Item
                      label={
                        <span>
                          <FontAwesomeIcon
                            className="offender-description-icon"
                            icon={faMarsAndVenus}
                          />
                          Sex
                        </span>
                      }
                    >
                      {loading ? (
                        <Skeleton title={{ width: 100 }} paragraph={false} />
                      ) : (
                        getOffenderGender(offenderData?.gender)
                      )}
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={
                        <span>
                          <FontAwesomeIcon
                            className="offender-description-icon"
                            icon={faEarth}
                          />
                          Ethnicity
                        </span>
                      }
                    >
                      {loading ? (
                        <Skeleton title={{ width: 100 }} paragraph={false} />
                      ) : (
                        getOffenderRace(offenderData?.race, false)
                      )}
                    </Descriptions.Item>

                    {offenderData?.peculiarities && (
                      <Descriptions.Item
                        span={2}
                        label={
                          <span>
                            <FontAwesomeIcon
                              className="offender-description-icon"
                              icon={faCircleInfo}
                            />
                            Additional Info
                          </span>
                        }
                      >
                        {loading ? (
                          <Skeleton title={{ width: 100 }} paragraph={false} />
                        ) : (
                          offenderData?.peculiarities
                        )}
                      </Descriptions.Item>
                    )}

                    {offenderData?.incidents[0]?.location && (
                      <Descriptions.Item
                        span={2}
                        label={
                          <span>
                            <FontAwesomeIcon
                              className="offender-description-icon"
                              icon={faLocationDot}
                            />
                            Last offence
                          </span>
                        }
                      >
                        {loading ? (
                          <Skeleton title={{ width: 100 }} paragraph={false} />
                        ) : (
                          getLastOffence(offenderData?.incidents)?.location
                        )}
                      </Descriptions.Item>
                    )}
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
        offenderData?.images.map((image) => ({
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
            Add Offender
          </Button>
        </Col>
      </Row>
    </Form.Item>
  </Form>
);

export default AddExisitingOffender;
