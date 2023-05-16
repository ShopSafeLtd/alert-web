import React, { useState } from 'react';
import { Button, Col, Descriptions, Divider, Row, Tag, Typography } from 'antd';
import type { InvestigationSuggestionsQuery } from 'graphql/generated';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import WatermarkImage from 'components/images/WatermarkImage.view';
import { Link } from 'react-router-dom';
import type { WatermarkSlideType } from 'components/images/WatermartkSlide.view';
import WatermarkSlide from 'components/images/WatermartkSlide.view';
import OffenderTable from 'components/tables/OffenderTable/OffenderTable.view';
import useStyles from './SuggestedIncidents.style';

const { Paragraph, Title, Text } = Typography;

interface Props {
  suggestedData: InvestigationSuggestionsQuery | undefined;
  handleAddSuggestion: (id: string) => void;
  onClose: () => void;
}

const SuggestedIncidents = ({
  suggestedData,
  onClose,
  handleAddSuggestion,
}: Props) => {
  const classes = useStyles();
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
      {suggestedData?.investigation?.suggestedIncidents?.map((incident) => (
        <div>
          <Row
            gutter={8}
            justify="start"
            align="middle"
            wrap={false}
            className={classes.images}
            style={{
              height: incident.images.length > 0 ? undefined : 0,
            }}
          >
            {incident?.images.map((image, i) => (
              <Col key={image.id} onClick={() => openLightbox(incident, i)}>
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
            {incident.subject}
          </Title>
          <Text>Alert ID: {incident.reference}</Text>
          <Paragraph>{incident.description}</Paragraph>
          <Descriptions style={{ marginTop: 20, marginBottom: 20 }}>
            <Descriptions.Item label="Date/Time">
              {incident.dayTime}
            </Descriptions.Item>
            <Descriptions.Item label="Location">
              {incident.location?.full}
            </Descriptions.Item>
            <Descriptions.Item label="Crime Number">
              {incident.policeRef}
            </Descriptions.Item>
            <Descriptions.Item label="Crime Type">
              <Row>
                {incident.crimeTypes.map((item) => (
                  <Col key={item.id}>
                    <Tag>{item.name}</Tag>
                  </Col>
                ))}
              </Row>
            </Descriptions.Item>
          </Descriptions>
          {incident.offenders && incident.offenders.length > 0 && (
            <div className={classes.tableContainer}>
              <OffenderTable
                offenders={incident.offenders}
                hasNavigation={false}
              />
            </div>
          )}
          <Row gutter={8} justify="end">
            <Col>
              <Link to={`/app/incidents/view/${incident.id}`} onClick={onClose}>
                <Button>View Incident</Button>
              </Link>
            </Col>
            <Col>
              <Button
                danger
                type="ghost"
                onClick={() => handleAddSuggestion(incident.id)}
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

export default SuggestedIncidents;
