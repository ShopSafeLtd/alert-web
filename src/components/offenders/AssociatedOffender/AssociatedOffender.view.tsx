import type { WatermarkSlideType } from 'components/images/WatermartkSlide.view';
import type { AssociatedOffendersQuery } from 'graphql/offenders/queries/__generated__/associated-offenders.generated';

import publicOffenderDob from '#/utils/public-offender-dob';
import {
  faCircleInfo,
  faEarth,
  faMarsAndVenus,
  faUserClock,
  faUserHair,
  faUserTag,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Descriptions, Row, Typography } from 'antd';
import WatermarkImage from 'components/images/WatermarkImage.view';
import WatermarkSlide from 'components/images/WatermartkSlide.view';
import CrimeGroupTable from 'components/tables/CrimeGroupTable/CrimeGroupTable.view';
import IncidentTable from 'components/tables/IncidentTable/IncidentTable.view';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { calcAge } from 'utils';
import {
  getOffenderAge,
  getOffenderBuild,
  getOffenderGender,
  getOffenderRace,
} from 'utils/offender/get-offender-desc';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

import useStyles from './AssociatedOffender.style';

const { Paragraph, Text, Title } = Typography;

type ViewAssociate = Exclude<
  Exclude<
    AssociatedOffendersQuery['offender'],
    null | undefined
  >['knownAssociates'],
  null | undefined
>[0];

interface Props {
  offender: ViewAssociate;
  onClose: () => void;
}

const AssociatedOffender = ({ offender, onClose }: Props) => {
  const classes = useStyles();
  const publicOffenderDOB = publicOffenderDob();
  const intl = useIntl();
  const [lightBoxOpen, setLightBoxOpen] = useState({
    index: 0,
    open: false,
  });
  const [lightboxElements, setLightboxElements] = useState<{ src: string }[]>(
    []
  );

  const openLightbox = (index: number) => {
    setLightBoxOpen({ index, open: !lightBoxOpen.open });
  };

  useEffect(() => {
    setLightboxElements(
      offender.images.map((image) => ({
        src: image.optimised || '',
      })) || []
    );
  }, []);

  return (
    <div>
      <Row
        align="middle"
        className={classes.images}
        gutter={8}
        justify="start"
        style={{
          height: offender.images.length > 0 ? undefined : 0,
        }}
        wrap={false}
      >
        {offender?.images.map((image, i) => (
          <Col key={image.id} onClick={() => openLightbox(i)}>
            <div className={classes.image}>
              <WatermarkImage
                position={image.position}
                rotation={image.rotation}
                url={image.optimised}
              />
            </div>
          </Col>
        ))}
      </Row>
      <Title level={3} style={{ margin: 0 }}>
        {offender.name}
      </Title>
      <Text>
        {intl.formatMessage(
          { defaultMessage: 'Alert ID: {alertID}' },
          { alertID: offender.reference }
        )}
      </Text>
      <Descriptions style={{ marginBottom: 20, marginTop: 20 }}>
        {offender.alias.length > 0 ? (
          <Descriptions.Item
            label={intl.formatMessage({
              defaultMessage: 'Alias',
            })}
          >
            {offender.alias.map((item) => (
              <Text>{item}</Text>
            ))}
          </Descriptions.Item>
        ) : undefined}
        {publicOffenderDOB ? (
          <Descriptions.Item
            label={
              <span>
                <FontAwesomeIcon
                  className={classes.descIcon}
                  icon={faUserClock}
                />
                {intl.formatMessage({ defaultMessage: 'Age' })}
              </span>
            }
          >
            {offender.dateOfBirth
              ? calcAge(offender.dateOfBirth)
              : getOffenderAge(offender.age)}
          </Descriptions.Item>
        ) : undefined}
        <Descriptions.Item
          label={
            <span>
              <FontAwesomeIcon
                className={classes.descIcon}
                icon={faMarsAndVenus}
              />
              {intl.formatMessage({ defaultMessage: 'Sex' })}
            </span>
          }
        >
          {getOffenderGender(offender.gender)}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <span>
              <FontAwesomeIcon className={classes.descIcon} icon={faUserTag} />
              {intl.formatMessage({ defaultMessage: 'Build' })}
            </span>
          }
        >
          {getOffenderBuild(offender.build)}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <span>
              <FontAwesomeIcon className={classes.descIcon} icon={faEarth} />
              {intl.formatMessage({
                defaultMessage: 'Ethnicity',
              })}
            </span>
          }
        >
          {getOffenderRace(offender.race, false)}
        </Descriptions.Item>
        {offender.hair && (
          <Descriptions.Item
            label={
              <span>
                <FontAwesomeIcon
                  className={classes.descIcon}
                  icon={faUserHair}
                />
                {intl.formatMessage({ defaultMessage: 'Hair' })}
              </span>
            }
          >
            {offender.hair}
          </Descriptions.Item>
        )}
      </Descriptions>
      <Descriptions column={1}>
        {offender.peculiarities && (
          <Descriptions.Item
            label={
              <span>
                <FontAwesomeIcon
                  className={classes.descIcon}
                  icon={faCircleInfo}
                />
                {intl.formatMessage({
                  defaultMessage: 'Additional Info',
                })}
              </span>
            }
          >
            {offender.peculiarities}
          </Descriptions.Item>
        )}
      </Descriptions>
      {offender.associatedIncidents &&
        offender.associatedIncidents.length > 0 && (
          <div className={classes.tableContainer}>
            <Paragraph className={classes.explainText}>
              {intl.formatMessage(
                {
                  defaultMessage:
                    'This offender shares {incidentCount} incidents',
                },
                {
                  incidentCount: offender.totalAssociatedIncidents,
                }
              )}
            </Paragraph>
            <IncidentTable
              hasNavigation
              incidents={offender?.associatedIncidents || []}
            />
          </div>
        )}
      {offender.associatedCrimeGroups &&
        offender.associatedCrimeGroups.length > 0 && (
          <div className={classes.tableContainer}>
            <Paragraph className={classes.explainText}>
              {intl.formatMessage(
                {
                  defaultMessage:
                    'This offender shares {crimeGroupCount} crime groups',
                },
                {
                  crimeGroupCount: offender.totalAssociatedCrimeGroups,
                }
              )}
            </Paragraph>
            <CrimeGroupTable
              crimeGroups={offender.associatedCrimeGroups || []}
              hasNavigation
            />
          </div>
        )}
      <Row gutter={8} justify="end">
        <Col>
          <Button onClick={onClose}>
            {intl.formatMessage({ defaultMessage: 'Close' })}
          </Button>
        </Col>
        <Col>
          <Link onClick={onClose} to={`/app/offenders/view/${offender.id}`}>
            <Button>
              {intl.formatMessage({
                defaultMessage: 'View Offender',
              })}
            </Button>
          </Link>
        </Col>
      </Row>

      <Lightbox
        close={() => openLightbox(0)}
        controller={{
          closeOnBackdropClick: true,
        }}
        index={lightBoxOpen.index}
        open={lightBoxOpen.open}
        plugins={[Zoom]}
        render={{
          slide: (slide: WatermarkSlideType) => (
            <WatermarkSlide slide={slide} />
          ),
        }}
        slides={lightboxElements}
      />
    </div>
  );
};

export default AssociatedOffender;
