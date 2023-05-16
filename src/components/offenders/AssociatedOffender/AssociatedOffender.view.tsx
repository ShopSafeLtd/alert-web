import React, { useEffect, useState } from 'react';
import { Button, Col, Descriptions, Row, Typography } from 'antd';
import type { AssociatedOffendersQuery } from 'graphql/generated';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import WatermarkImage from 'components/images/WatermarkImage.view';
import IncidentTable from 'components/tables/IncidentTable/IncidentTable.view';
import CrimeGroupTable from 'components/tables/CrimeGroupTable/CrimeGroupTable.view';
import { Link } from 'react-router-dom';
import { useStoreState } from 'state';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleInfo,
  faEarth,
  faMarsAndVenus,
  faUserClock,
  faUserHair,
  faUserTag,
} from '@fortawesome/pro-light-svg-icons';
import { calcAge } from 'utils';
import {
  getOffenderAge,
  getOffenderBuild,
  getOffenderGender,
  getOffenderRace,
} from 'utils/offender/get-offender-desc';
import type { WatermarkSlideType } from 'components/images/WatermartkSlide.view';
import WatermarkSlide from 'components/images/WatermartkSlide.view';
import useStyles from './AssociatedOffender.style';

const { Paragraph, Title, Text } = Typography;

type ViewAssociate = Exclude<
  Exclude<
    AssociatedOffendersQuery['offender'],
    null | undefined
  >['knownAssociates'],
  undefined | null
>[0];

interface Props {
  offender: ViewAssociate;
  onClose: () => void;
}

const AssociatedOffender = ({ offender, onClose }: Props) => {
  const classes = useStyles();
  const publicOffenderDOB = useStoreState(
    (state) => state.scheme.defaultPublicOffenderDOB
  );

  const [lightBoxOpen, setLightBoxOpen] = useState({
    open: false,
    index: 0,
  });
  const [lightboxElements, setLightboxElements] = useState<{ src: string }[]>(
    []
  );

  const openLightbox = (index: number) => {
    setLightBoxOpen({ open: !lightBoxOpen.open, index });
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
        gutter={8}
        justify="start"
        align="middle"
        wrap={false}
        className={classes.images}
        style={{
          height: offender.images.length > 0 ? undefined : 0,
        }}
      >
        {offender?.images.map((image, i) => (
          <Col key={image.id} onClick={() => openLightbox(i)}>
            <div className={classes.image}>
              <WatermarkImage url={image.optimised} position={image.position} />
            </div>
          </Col>
        ))}
      </Row>
      <Title level={3} style={{ margin: 0 }}>
        {offender.name}
      </Title>
      <Text>Alert ID: {offender.reference}</Text>
      <Descriptions style={{ marginTop: 20, marginBottom: 20 }}>
        {offender.alias.length > 0 ? (
          <Descriptions.Item label="Alias ">
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
                Age
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
              Sex
            </span>
          }
        >
          {getOffenderGender(offender.gender)}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <span>
              <FontAwesomeIcon className={classes.descIcon} icon={faUserTag} />
              Build
            </span>
          }
        >
          {getOffenderBuild(offender.build)}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <span>
              <FontAwesomeIcon className={classes.descIcon} icon={faEarth} />
              Ethnicity
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
                Hair
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
                Additional Info
              </span>
            }
          >
            {offender.peculiarities}
          </Descriptions.Item>
        )}
      </Descriptions>
      {offender.associatedIncidents && offender.associatedIncidents.length > 0 && (
        <div className={classes.tableContainer}>
          <Paragraph className={classes.explainText}>
            This offender shares {offender.totalAssociatedIncidents} incidents
          </Paragraph>
          <IncidentTable
            incidents={offender?.associatedIncidents || []}
            hasNavigation
          />
        </div>
      )}
      {offender.associatedCrimeGroups &&
        offender.associatedCrimeGroups.length > 0 && (
          <div className={classes.tableContainer}>
            <Paragraph className={classes.explainText}>
              This offender shares {offender.totalAssociatedCrimeGroups} crime
              groups
            </Paragraph>
            <CrimeGroupTable
              crimeGroups={offender.associatedCrimeGroups || []}
              hasNavigation
            />
          </div>
        )}
      <Row gutter={8} justify="end">
        <Col>
          <Button onClick={onClose}>Close</Button>
        </Col>
        <Col>
          <Link to={`/app/offenders/view/${offender.id}`} onClick={onClose}>
            <Button>View Offender</Button>
          </Link>
        </Col>
      </Row>

      <Lightbox
        open={lightBoxOpen.open}
        close={() => openLightbox(0)}
        plugins={[Zoom]}
        index={lightBoxOpen.index}
        slides={lightboxElements}
        controller={{
          closeOnBackdropClick: true,
        }}
        render={{
          slide: (slide: WatermarkSlideType) => (
            <WatermarkSlide slide={slide} />
          ),
        }}
      />
    </div>
  );
};

export default AssociatedOffender;
