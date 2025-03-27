import type { CarouselRef } from 'antd/lib/carousel';
import type { ListOffendersQuery } from 'graphql/offenders/queries/__generated__/list-offenders.generated';

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
import { faAngleLeft, faAngleRight } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
import WatermarkImage from 'components/images/WatermarkImage.view';
import WatermarkSlide from 'components/images/WatermartkSlide.view';
import OffenderTile from 'components/offenders/OffenderTile';
import OffenderTileSkeleton from 'components/offenders/OffenderTileSkeleton';
import React, { useRef } from 'react';
import { useIntl } from 'react-intl';
import FormatCalendar from 'utils/format-calendar-24h';
import {
  calcAge,
  getLastOffence,
  getOffenderAge,
  getOffenderBuild,
  getOffenderGender,
  getOffenderRace,
} from 'utils/offender/get-offender-desc';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

const { Title } = Typography;

interface Props {
  data: ListOffendersQuery | undefined;
  lightBoxOpen: {
    index: number;
    open: boolean;
  };
  loading: boolean;
  onClose: () => void;
  onPaginationChange: (page: number, pageSize: number) => void;
  onSubmit: (value: string | undefined) => void;
  openLightbox: (index: number) => void;
  publicOffenderDOB: boolean;
  saving: boolean;
  search: string;
  selectedOffender:
    | Exclude<
        ListOffendersQuery['listOffenders'],
        null | undefined
      >['offenders'][0]
    | null
    | undefined;
  setCurrentId: (value: string | undefined) => void;
  setSearch: (value: string) => void;
}

const AddExistingOffender = ({
  data,
  lightBoxOpen,
  loading,
  onClose,
  onPaginationChange,
  onSubmit,
  openLightbox,
  publicOffenderDOB,
  saving,
  search,
  selectedOffender,
  setCurrentId,
  setSearch,
}: Props): JSX.Element => {
  const imagesRef = useRef<CarouselRef>(null);
  const intl = useIntl();
  const existingOffenders = (): JSX.Element => {
    if (!data?.listOffenders && loading)
      return (
        <Row gutter={16} wrap>
          {Array.from({ length: data?.listOffenders?.total || 24 })
            .fill(0)
            .map(() => (
              <Col className="offender-item" span={4}>
                <OffenderTileSkeleton />
              </Col>
            ))}
        </Row>
      );
    if (data?.listOffenders && data.listOffenders.offenders.length > 0) {
      return (
        <Row gutter={16} style={{ marginRight: 0 }} wrap>
          {data?.listOffenders?.offenders.map((offender) => (
            <Col
              className="offender-item"
              key={offender.id}
              span={selectedOffender ? 12 : 4}
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
      <Row align="middle" className="no-offenders" justify="center">
        <Col>
          <Title level={4}>
            {intl.formatMessage({
              defaultMessage: 'No Offenders Found',
            })}
          </Title>
        </Col>
      </Row>
    );
  };
  return (
    <div className="add-existing-offender">
      <Row className="search-offender" gutter={8}>
        <Col span={18}>
          <Input
            allowClear
            onChange={(event) => setSearch(event.target.value)}
            placeholder={intl.formatMessage({
              defaultMessage: 'Search Offenders...',
            })}
            value={search}
          />
        </Col>
      </Row>

      <Row className="add-existing-offender-row">
        <Col
          className={selectedOffender ? 'offenders-side-list' : ''}
          span={selectedOffender ? 12 : 24}
        >
          {existingOffenders()}
          <Pagination
            hideOnSinglePage
            onChange={onPaginationChange}
            pageSize={24}
            showSizeChanger={false}
            size="small"
            style={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
            }}
            total={data?.listOffenders?.total}
          />
        </Col>
        {selectedOffender && (
          <Col className="view-offender" span={12}>
            {selectedOffender && selectedOffender.images.length > 0 && (
              <Row
                align="middle"
                className="offender-images"
                gutter={8}
                justify="start"
                wrap={false}
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
                            position={image.position}
                            rotation={image.rotation}
                            url={image.optimised}
                          />
                        </div>
                      </div>
                    ))}
                  </Carousel>
                  {selectedOffender && selectedOffender.images.length > 1 && (
                    <Row className="offender-image-controls">
                      <Col>
                        <FontAwesomeIcon
                          className="offender-image-control"
                          icon={faAngleLeft}
                          onClick={() => imagesRef.current?.prev()}
                          size="lg"
                        />
                      </Col>
                      <Col flex={1} />
                      <Col>
                        <FontAwesomeIcon
                          className="offender-image-control"
                          icon={faAngleRight}
                          onClick={() => imagesRef.current?.next()}
                          size="lg"
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
                <Descriptions className="offender-descriptions" column={1}>
                  <Descriptions.Item
                    label={
                      <span>
                        <FontAwesomeIcon
                          className="offender-description-icon"
                          icon={faClock}
                        />
                        {intl.formatMessage({
                          defaultMessage: 'Last updated',
                        })}
                      </span>
                    }
                  >
                    {FormatCalendar(selectedOffender.updatedAt, intl)}
                  </Descriptions.Item>
                  {publicOffenderDOB && (
                    <Descriptions.Item
                      label={
                        <span>
                          <FontAwesomeIcon
                            className="offender-description-icon"
                            icon={faUserClock}
                          />
                          {intl.formatMessage({
                            defaultMessage: 'Age',
                          })}
                        </span>
                      }
                    >
                      {selectedOffender.dateOfBirth
                        ? calcAge(selectedOffender.dateOfBirth)
                        : getOffenderAge(selectedOffender.age)}
                    </Descriptions.Item>
                  )}
                  <Descriptions.Item
                    label={
                      <span>
                        <FontAwesomeIcon
                          className="offender-description-icon"
                          icon={faMarsAndVenus}
                        />
                        {intl.formatMessage({
                          defaultMessage: 'Sex',
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
            <Row gutter={10} justify="end" style={{ marginTop: 30 }}>
              <Col>
                <Button disabled={saving} onClick={onClose}>
                  {intl.formatMessage({
                    defaultMessage: 'Cancel',
                  })}
                </Button>
              </Col>
              <Col>
                <Button
                  disabled={saving}
                  loading={saving}
                  onClick={() => onSubmit(selectedOffender?.id)}
                  type="primary"
                >
                  {intl.formatMessage({
                    defaultMessage: 'Add Offender',
                  })}
                </Button>
              </Col>
            </Row>
          </Col>
        )}
      </Row>
      <Lightbox
        close={() => openLightbox(0)}
        controller={{
          closeOnBackdropClick: true,
        }}
        open={lightBoxOpen.open}
        plugins={[Zoom]}
        render={{
          slide: (slide) => <WatermarkSlide slide={slide} />,
        }}
        slides={
          selectedOffender?.images.map((image) => ({
            src: image.optimised || '',
          })) || []
        }
      />
    </div>
  );
};

export default AddExistingOffender;
