/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  Carousel,
  Col,
  Collapse,
  Divider,
  Drawer,
  Row,
  Typography,
} from 'antd';
import { CarouselRef } from 'antd/lib/carousel';
import { useStoreActions } from 'state';
import { IoImagesOutline, IoLocationOutline } from 'react-icons/io5';
import moment from 'moment-timezone';
import {
  calcAge,
  calcDuration,
  getAge,
  getBuild,
  getEthnicity,
  getLastOffence,
  getSex,
} from 'utils';
import { ExclusionListItem, IncidentListItem } from '../ListItems';

const { Panel } = Collapse;

interface Props {
  visible: boolean;
  offender: any;
  close: () => void;
  viewIncident: (id: string) => void;
}
/**
 *
 * @param props - {@link Props}
 * @param props.visible - boolean
 * @param props.offender - offender data fetched from the database
 * @param props.close - function to call when drawer close is clicked (should set visible to false)
 * @param props.viewIncident - function to toggle the incident drawer
 * @return JSX.Element
 *
 * @description Renders a drawer used to display more information about an offender
 */
const ViewOffender: React.FC<Props> = ({
  visible,
  close,
  offender,
  viewIncident,
}: Props) => {
  const { images } = offender;

  const [imageIndex, setImageIndex] = useState<number>(0);

  const [activeIncident, setActiveIncident] = useState<string | string[]>();
  const [activeExclusion, setActiveExclusion] = useState<string | string[]>();

  const carouselRef = useRef<CarouselRef>(null);
  useEffect(() => {
    carouselRef.current?.goTo(0);
  }, []);

  const toggleLightBox = useStoreActions(
    (actions) => actions.theme.toggleLightBox
  );
  const lightBoxImages = images?.map(
    (img: { optimised: any; url: any }) => img.optimised || img.url
  );
  const incidentLightBoxImages = offender.incidents
    ?.find((el: { id: string }) => el.id === activeIncident)
    ?.images?.map(
      (img: { optimised: any; url: any }) => img.optimised || img.url
    );

  const onImageIndexChange = (index: number) => setImageIndex(index);
  const handleViewIncident = (id: string) => {
    viewIncident(id);
  };

  return (
    <Drawer
      title={
        <Row className="view-offender-title">
          <Col span={20} className="title">
            <Typography.Title ellipsis level={3}>
              {offender.name}
            </Typography.Title>
            <Typography.Text ellipsis type="secondary">
              Last updated:{' '}
              {moment
                .tz(offender.updatedAt, 'Europe/London')
                .format('ddd MMM DD YYYY - HH:mm')}
            </Typography.Text>
          </Col>
        </Row>
      }
      placement="right"
      onClose={close}
      visible={visible}
      width={640}
      className="view-offender-drawer"
    >
      <Row>
        <Col flex="200px">
          {images?.length ? (
            <div className="image-carousel">
              <Carousel afterChange={onImageIndexChange} ref={carouselRef}>
                {images?.map(
                  (image: { id: React.Key | null | undefined; url: any }) => (
                    <div key={image.id}>
                      <img
                        alt=""
                        onClick={() =>
                          toggleLightBox({
                            images: lightBoxImages,
                            index: imageIndex,
                          })
                        }
                        style={{ backgroundImage: `url(${image.url})` }}
                      />
                    </div>
                  )
                )}
              </Carousel>
            </div>
          ) : (
            <div className="no-image">
              <IoImagesOutline color="#959595" size="36px" />
              <Typography.Text>No Images</Typography.Text>
            </div>
          )}
        </Col>
        <Col flex="1">
          <div key="0" className="offender-details">
            <Row className="offender-groups">
              {offender?.groups?.map((el: any) => (
                <div key={el.id} className="group">
                  <Typography.Text>{el.name}</Typography.Text>
                </div>
              ))}
            </Row>
            <Row>
              <Typography.Text ellipsis>
                Age:{' '}
                {offender?.dateOfBirth
                  ? calcAge(offender?.dateOfBirth)
                  : getAge(offender?.age)}
              </Typography.Text>
            </Row>
            {offender.dateOfBirth && (
              <>
                <Row>
                  <Typography.Text ellipsis>
                    DoB:{' '}
                    {moment
                      .tz(offender.dateOfBirth, 'Europe/London')
                      .format('DD/MM/YYYY')}
                  </Typography.Text>
                </Row>
                <Row>
                  <Typography.Text ellipsis>
                    DoB Source: {offender.dateSource}
                  </Typography.Text>
                </Row>
              </>
            )}
            <Row>
              <Typography.Text ellipsis>
                Build: {getBuild(offender?.build)}
              </Typography.Text>
            </Row>
            <Row>
              <Typography.Text ellipsis>
                Sex: {getSex(offender?.sex)}
              </Typography.Text>
            </Row>
            <Row>
              <Typography.Text ellipsis>
                Ethnicity: {getEthnicity(offender?.race)}
              </Typography.Text>
            </Row>
            {offender.hair && (
              <Row>
                <Typography.Text ellipsis>
                  Hair: {offender.hair}
                </Typography.Text>
              </Row>
            )}

            <Row>
              <Typography.Text ellipsis className="additional-info">
                Additional Info:{' '}
              </Typography.Text>
            </Row>
            <Row>
              <Typography.Text
                type={offender.peculiarities ? undefined : 'secondary'}
              >
                {offender.peculiarities ||
                  '[ No further information available ]'}
              </Typography.Text>
            </Row>

            <Row align="top" wrap={false} className="location">
              <div className="icon-container">
                <IoLocationOutline color="#de4436" size={16} />
              </div>
              <Typography.Text type="secondary" className="margin">
                Last offence: {getLastOffence(offender?.incidents)?.location}
              </Typography.Text>
            </Row>
          </div>
        </Col>
      </Row>
      <Row>
        <div className="tags-container">
          {offender.tags?.map((el: any) => (
            <div className="main-tag">{el.name}</div>
          ))}
        </div>
      </Row>
      <Divider />
      <Row>
        <Col span={12} className="list-offender-items-incident">
          <Typography.Title level={3}>Incidents</Typography.Title>
          {offender.incidents?.length ? (
            <Collapse
              ghost
              onChange={(key) => setActiveIncident(key)}
              accordion
            >
              {offender?.incidents?.map((el: any) => (
                <Panel
                  header={
                    <IncidentListItem
                      incident={el}
                      incidentKey={el.id}
                      activeIncident={activeIncident}
                    />
                  }
                  key={el.id}
                >
                  <Row>
                    <Col flex="100px">
                      {incidentLightBoxImages?.length ? (
                        <img
                          className="incident-image"
                          alt=""
                          onClick={() =>
                            toggleLightBox({
                              images: incidentLightBoxImages,
                              index: 0,
                            })
                          }
                          style={{
                            backgroundImage: `url(${incidentLightBoxImages[0]})`,
                          }}
                        />
                      ) : (
                        <div className="no-image">
                          <IoImagesOutline color="#959595" size="18px" />
                          <Typography.Text>No Images</Typography.Text>
                        </div>
                      )}
                    </Col>
                    <Col flex="12px" />
                    <Col flex="1">
                      <Row>
                        <Typography.Text className="description">
                          {el.description || '[ No description available ]'}
                        </Typography.Text>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Typography.Text type="secondary" className="description">
                      Reported by: {el.createdBy.fullName} -{' '}
                      {el.createdBy.organisation}
                    </Typography.Text>
                  </Row>
                  <Row>
                    <Button
                      onClick={() => handleViewIncident(el.id)}
                      type="text"
                    >
                      View Incident
                    </Button>
                  </Row>
                </Panel>
              ))}
            </Collapse>
          ) : (
            <Row>
              <Typography.Text className="empty-list" type="secondary">
                [ This offender does not appear in any incidents ]
              </Typography.Text>
            </Row>
          )}
        </Col>
        <Col span={1} />
        <Col span={11} className="list-offender-items-exclusion">
          <Typography.Title level={3}>Exclusions</Typography.Title>
          {offender.bans?.length ? (
            <Collapse ghost onChange={(key) => setActiveExclusion(key)}>
              {offender?.bans?.map((el: any) => (
                <Panel
                  header={
                    <ExclusionListItem
                      exclusion={el}
                      exclusionKey={el.id}
                      activeExclusion={activeExclusion}
                    />
                  }
                  key={el.id}
                >
                  <Row>
                    <Typography.Text>{el.description}</Typography.Text>
                  </Row>
                  <Row>
                    <Typography.Text>{`Start: ${new Date(
                      el.startDate
                    ).toDateString()}`}</Typography.Text>
                  </Row>
                  <Row>
                    <Typography.Text type="secondary">{`Duration: ${calcDuration(
                      new Date(el.startDate),
                      new Date(el.endDate)
                    )}`}</Typography.Text>
                  </Row>
                  <Divider />
                </Panel>
              ))}
            </Collapse>
          ) : (
            <Row>
              <Typography.Text className="empty-list" type="secondary">
                [ This offender does not have any exclusions ]
              </Typography.Text>
            </Row>
          )}
        </Col>
      </Row>
    </Drawer>
  );
};

export default ViewOffender;
