import React, { useState } from 'react';
import { Button, Col, Descriptions, Divider, Row, Typography } from 'antd';
import type { InvestigationSuggestionsQuery } from 'graphql/generated';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import WatermarkImage from 'components/images/WatermarkImage.view';
import IncidentTable from 'components/tables/IncidentTable/IncidentTable.view';
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
import CrimeGroupTable from 'components/tables/CrimeGroupTable/CrimeGroupTable.view';
import WatermarkSlide from 'components/images/WatermartkSlide.view';
import useStyles from './SuggestedOffenders.style';

const { Paragraph, Title, Text } = Typography;

interface Props {
  suggestedData: InvestigationSuggestionsQuery | undefined;
  handleAddSuggestion: (id: string) => void;
  onClose: () => void;
}

const SuggestedOffenders = ({
  suggestedData,
  onClose,
  handleAddSuggestion,
}: Props) => {
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

  const openLightbox = (
    offender: {
      images: { id: string; optimised?: string | undefined | null }[];
    },
    index: number
  ) => {
    setLightboxElements(
      offender.images.map((image) => ({
        src: image.optimised || '',
      })) || []
    );
    setLightBoxOpen({ open: !lightBoxOpen.open, index });
  };

  return (
    <div className={classes.container}>
      {suggestedData?.investigation?.suggestedOffenders?.map((offender) => (
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
              <Col key={image.id} onClick={() => openLightbox(offender, i)}>
                <div className={classes.image}>
                  <WatermarkImage
                    url={image.optimised}
                    position={image.position}
                  />
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
                  <FontAwesomeIcon
                    className={classes.descIcon}
                    icon={faUserTag}
                  />
                  Build
                </span>
              }
            >
              {getOffenderBuild(offender.build)}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <span>
                  <FontAwesomeIcon
                    className={classes.descIcon}
                    icon={faEarth}
                  />
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
          {offender.associatedIncidents &&
            offender.associatedIncidents.length > 0 && (
              <div className={classes.tableContainer}>
                <Paragraph className={classes.explainText}>
                  This offender shares {offender.totalAssociatedIncidents}{' '}
                  incidents with offenders in this investigation
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
                  This offender shares {offender.totalAssociatedCrimeGroups}{' '}
                  crime group with offenders in this investigation
                </Paragraph>
                <CrimeGroupTable
                  crimeGroups={offender?.associatedCrimeGroups || []}
                  hasNavigation
                />
              </div>
            )}
          <Row gutter={8} justify="end">
            <Col>
              <Link to={`/app/offenders/view/${offender.id}`} onClick={onClose}>
                <Button>View Offender</Button>
              </Link>
            </Col>
            <Col>
              <Button
                danger
                type="ghost"
                onClick={() => handleAddSuggestion(offender.id)}
              >
                Add To Investigation
              </Button>
            </Col>
          </Row>
          <Divider />
        </div>
      ))}
      <Lightbox
        open={lightBoxOpen.open}
        close={() => openLightbox({ images: [] }, 0)}
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

export default SuggestedOffenders;
