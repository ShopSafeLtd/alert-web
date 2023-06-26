/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useRef } from 'react';
import type { ListOffendersQuery } from 'graphql/generated';
import {
  Button,
  Carousel,
  Col,
  Descriptions,
  Input,
  Pagination,
  Row,
  Typography,
} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleInfo,
  faClock,
  faEarth,
  faLocationDot,
  faMarsAndVenus,
  faUserClock,
  faUserHair,
  faUserTag,
} from '@fortawesome/pro-light-svg-icons';
import {
  calcAge,
  getLastOffence,
  getOffenderAge,
  getOffenderBuild,
  getOffenderGender,
  getOffenderRace,
} from 'utils/offender/get-offender-desc';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

import moment from 'moment';
import OffenderTile from 'components/offenders/OffenderTile';
import OffenderTileSkeleton from 'components/offenders/OffenderTileSkeleton';
import Lightbox from 'yet-another-react-lightbox';
import type { CarouselRef } from 'antd/lib/carousel';
import { faAngleLeft, faAngleRight } from '@fortawesome/pro-solid-svg-icons';
import WatermarkSlide from 'components/images/WatermartkSlide.view';
import WatermarkImage from 'components/images/WatermarkImage.view';
import { useIntl } from 'react-intl';

const { Title } = Typography;

interface Props {
  onClose: () => void;
  onSubmit: (value: string | undefined) => void;
  saving: boolean;
  data: ListOffendersQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  onPaginationChange: (page: number, pageSize: number) => void;
  setCurrentId: (value: string | undefined) => void;
  selectedOffender:
    | Exclude<
        ListOffendersQuery['listOffenders'],
        undefined | null
      >['offenders'][0]
    | undefined
    | null;
  openLightbox: (index: number) => void;
  lightBoxOpen: {
    open: boolean;
    index: number;
  };
}

const AddExistingOffender = ({
  onClose,
  onSubmit,
  saving,
  data,
  loading,
  search,
  setSearch,
  onPaginationChange,
  setCurrentId,
  openLightbox,
  selectedOffender,
  lightBoxOpen,
}: Props): JSX.Element => {
  const imagesRef = useRef<CarouselRef>(null);
  const intl = useIntl();
  const existingOffenders = (): JSX.Element => {
    if (!data?.listOffenders && loading)
      return (
        <Row wrap gutter={16}>
          {Array.from({ length: data?.listOffenders?.total || 24 })
            .fill(0)
            .map(() => (
              <Col span={4} className="offender-item">
                <OffenderTileSkeleton />
              </Col>
            ))}
        </Row>
      );
    if (data && data.listOffenders && data.listOffenders.offenders.length > 0) {
      return (
        <Row wrap gutter={16} style={{ marginRight: 0 }}>
          {data?.listOffenders?.offenders.map((offender) => (
            <Col
              span={selectedOffender ? 12 : 4}
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
      );
    }
    return (
      <Row justify="center" align="middle" className="no-offenders">
        <Col>
          <Title level={4}>
            {intl.formatMessage({
              defaultMessage: 'No Offenders Found',
              id: 'IhHcoJ',
            })}
          </Title>
        </Col>
      </Row>
    );
  };
  return (
    <div className="add-existing-offender">
      <Row gutter={8} className="search-offender">
        <Col span={18}>
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={intl.formatMessage({
              defaultMessage: 'Search Offenders...',
              id: 'mCDjFM',
            })}
            allowClear
          />
        </Col>
      </Row>

      <Row className="add-existing-offender-row">
        <Col
          span={selectedOffender ? 12 : 24}
          className={selectedOffender ? 'offenders-side-list' : ''}
        >
          {existingOffenders()}
          <Pagination
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'center',
            }}
            total={data?.listOffenders?.total}
            size="small"
            showSizeChanger={false}
            onChange={onPaginationChange}
            pageSize={24}
            hideOnSinglePage
          />
        </Col>
        {selectedOffender && (
          <Col span={12} className="view-offender">
            {selectedOffender && selectedOffender.images.length > 0 && (
              <Row
                gutter={8}
                justify="start"
                align="middle"
                wrap={false}
                className="offender-images"
              >
                <Col span={12}>
                  <Carousel ref={imagesRef}>
                    {selectedOffender?.images.map((image, i) => (
                      <div key={image.id}>
                        <div
                          className="offender-image"
                          onClick={() => openLightbox(i)}
                        >
                          <WatermarkImage
                            url={image.optimised}
                            position={image.position}
                          />
                        </div>
                      </div>
                    ))}
                  </Carousel>
                  {selectedOffender && selectedOffender.images.length > 1 && (
                    <Row className="offender-image-controls">
                      <Col>
                        <FontAwesomeIcon
                          size="lg"
                          className="offender-image-control"
                          icon={faAngleLeft}
                          onClick={() => imagesRef.current?.prev()}
                        />
                      </Col>
                      <Col flex={1} />
                      <Col>
                        <FontAwesomeIcon
                          size="lg"
                          className="offender-image-control"
                          icon={faAngleRight}
                          onClick={() => imagesRef.current?.next()}
                        />
                      </Col>
                    </Row>
                  )}
                </Col>
              </Row>
            )}

            <Row>
              <Col span={24} style={{ margin: 10 }}>
                <Title level={4}>{selectedOffender?.name}</Title>
                <Descriptions column={1} className="offender-descriptions">
                  <Descriptions.Item
                    label={
                      <span>
                        <FontAwesomeIcon
                          className="offender-description-icon"
                          icon={faClock}
                        />
                        {intl.formatMessage({
                          defaultMessage: 'Last updated',
                          id: '0ICwq5',
                        })}
                      </span>
                    }
                  >
                    {moment(selectedOffender.updatedAt || moment()).format(
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
                        {intl.formatMessage({
                          defaultMessage: 'Age',
                          id: '9oNQSC',
                        })}
                      </span>
                    }
                  >
                    {selectedOffender.dateOfBirth
                      ? calcAge(selectedOffender.dateOfBirth)
                      : getOffenderAge(selectedOffender.age)}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={
                      <span>
                        <FontAwesomeIcon
                          className="offender-description-icon"
                          icon={faMarsAndVenus}
                        />
                        {intl.formatMessage({
                          defaultMessage: 'Sex',
                          id: 'eWJHGp',
                        })}
                      </span>
                    }
                  >
                    {getOffenderGender(selectedOffender.gender)}
                  </Descriptions.Item>

                  {selectedOffender.hair && (
                    <Descriptions.Item
                      label={
                        <span>
                          <FontAwesomeIcon
                            className="offender-description-icon"
                            icon={faUserHair}
                          />
                          {intl.formatMessage({
                            defaultMessage: 'Hair',
                            id: 'e4YBbX',
                          })}
                        </span>
                      }
                    >
                      {selectedOffender.hair}
                    </Descriptions.Item>
                  )}
                  <Descriptions.Item
                    label={
                      <span>
                        <FontAwesomeIcon
                          className="offender-description-icon"
                          icon={faUserTag}
                        />
                        {intl.formatMessage({
                          defaultMessage: 'Build',
                          id: 'RSctv1',
                        })}
                      </span>
                    }
                  >
                    {getOffenderBuild(selectedOffender.build)}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={
                      <span>
                        <FontAwesomeIcon
                          className="offender-description-icon"
                          icon={faEarth}
                        />
                        {intl.formatMessage({
                          defaultMessage: 'Ethnicity',
                          id: 'XtCAFo',
                        })}
                      </span>
                    }
                  >
                    {getOffenderRace(selectedOffender.race, false)}
                  </Descriptions.Item>

                  {selectedOffender.peculiarities && (
                    <Descriptions.Item
                      label={
                        <span>
                          <FontAwesomeIcon
                            className="offender-description-icon"
                            icon={faCircleInfo}
                          />
                          {intl.formatMessage({
                            defaultMessage: 'Additional Info',
                            id: '3XOciw',
                          })}
                        </span>
                      }
                    >
                      {selectedOffender.peculiarities}
                    </Descriptions.Item>
                  )}

                  {selectedOffender.incidents[0]?.location && (
                    <Descriptions.Item
                      label={
                        <span>
                          <FontAwesomeIcon
                            className="offender-description-icon"
                            icon={faLocationDot}
                          />
                          {intl.formatMessage({
                            defaultMessage: 'Last offence',
                            id: 'A0w5MM',
                          })}
                        </span>
                      }
                    >
                      {getLastOffence(selectedOffender.incidents).message}
                    </Descriptions.Item>
                  )}
                </Descriptions>
              </Col>
            </Row>
            <Row style={{ marginTop: 30 }} gutter={10} justify="end">
              <Col>
                <Button disabled={saving} onClick={onClose}>
                  {intl.formatMessage({
                    defaultMessage: 'Cancel',
                    id: '47FYwb',
                  })}
                </Button>
              </Col>
              <Col>
                <Button
                  disabled={saving}
                  loading={saving}
                  type="primary"
                  onClick={() => onSubmit(selectedOffender?.id)}
                >
                  {intl.formatMessage({
                    defaultMessage: 'Add Offender',
                    id: 'm3ChN4',
                  })}
                </Button>
              </Col>
            </Row>
          </Col>
        )}
      </Row>
      <Lightbox
        open={lightBoxOpen.open}
        close={() => openLightbox(0)}
        plugins={[Zoom]}
        controller={{
          closeOnBackdropClick: true,
        }}
        slides={
          selectedOffender?.images.map((image) => ({
            src: image.optimised || '',
          })) || []
        }
        render={{
          slide: (slide) => <WatermarkSlide slide={slide} />,
        }}
      />
    </div>
  );
};

export default AddExistingOffender;
