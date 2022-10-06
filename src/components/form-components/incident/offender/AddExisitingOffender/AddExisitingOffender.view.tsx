/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { ListOffendersQuery } from 'graphql/generated';
import {
  Typography,
  Row,
  Col,
  Descriptions,
  Button,
  Input,
  Skeleton,
  Pagination,
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
import OffenderTile from 'components/offenders/OffenderTile';

const { Title } = Typography;
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
    | undefined
    | null;
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
  <div className="add-existing-offender">
    <Row gutter={8} className="search-offender">
      <Col span={18}>
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search Offenders..."
          allowClear
        />
      </Col>
    </Row>

    <Row className="add-existing-offender-row">
      <Col
        span={offenderData !== null ? 10 : 24}
        className="offenders-side-list"
      >
        {loading ? (
          <Skeleton />
        ) : (
          <Row wrap gutter={16}>
            {data?.listOffenders?.offenders.map((offender) => (
              <Col
                span={offenderData !== null ? 12 : 4}
                key={offender.id}
                className="offender-item"
              >
                <OffenderTile
                  offender={offender}
                  onClick={() => setCurrentId(offender.id)}
                />
              </Col>
            ))}
          </Row>
        )}

        <Pagination
          total={data?.listOffenders?.total}
          size="small"
          showSizeChanger={false}
          onChange={onPaginationChange}
        />
      </Col>
      {offenderData && (
        <Col span={14} className="view-offender">
          {offenderData && offenderData.images.length > 0 && (
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
          )}

          <Row>
            <Col span={24} style={{ margin: 10 }}>
              <Title level={4}>{offenderData?.name}</Title>
              <Descriptions column={1} className="offender-descriptions">
                <Descriptions.Item
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
                  {moment(data?.offender?.updatedAt || moment()).format(
                    `ddd MMM DD YYYY - HH:mm`
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
                  {data?.offender?.dateOfBirth
                    ? calcAge(data?.offender?.dateOfBirth)
                    : getOffenderAge(data?.offender?.age)}
                </Descriptions.Item>
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
                  {getOffenderGender(data?.offender?.gender)}
                </Descriptions.Item>

                {data?.offender?.hair && (
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
                    {data?.offender?.hair}
                  </Descriptions.Item>
                )}
                <Descriptions.Item
                  //
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
                  {getOffenderBuild(data?.offender?.build)}
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
                  {getOffenderRace(data?.offender?.race, false)}
                </Descriptions.Item>

                {data?.offender?.peculiarities && (
                  <Descriptions.Item
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
                    {data?.offender?.peculiarities}
                  </Descriptions.Item>
                )}

                {data?.offender?.incidents[0]?.location && (
                  <Descriptions.Item
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
                    {getLastOffence(data?.offender?.incidents)?.location}
                  </Descriptions.Item>
                )}
              </Descriptions>
            </Col>
          </Row>
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
                onClick={() =>
                  onSubmit({
                    selectedOffenderIds: [offenderData?.id],
                  })
                }
              >
                Add Offender
              </Button>
            </Col>
          </Row>
        </Col>
      )}
    </Row>

    <SRLWrapper
      elements={
        offenderData?.images.map((image) => ({
          src: image.optimised || '',
        })) || []
      }
      options={{ buttons: { showDownloadButton: false } }}
    />
  </div>
);

export default AddExisitingOffender;
