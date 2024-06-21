import React, { useState } from 'react';
import {
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Row,
  Tag,
  Typography,
} from 'antd';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import WatermarkImage from 'components/images/WatermarkImage.view';
import { Link } from 'react-router-dom';
import type { WatermarkSlideType } from 'components/images/WatermartkSlide.view';
import WatermarkSlide from 'components/images/WatermartkSlide.view';
import OffenderTable from 'components/tables/OffenderTable/OffenderTable.view';
import { FormattedMessage } from 'react-intl';
import useStyles from './SuggestedIncidents.style';
import type { InvestigationSuggestionsQuery } from 'graphql/investigations/queries/investigation-suggestions.generated';

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
  const [lightBoxOpen, setLightBoxOpen] = useState<{
    open: boolean;
    index: number;
  }>({
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
                    rotation={image.rotation}
                    position={image.position}
                  />
                </div>
              </Col>
            ))}
          </Row>
          <Title level={3} style={{ margin: 0 }}>
            {incident.subject}
          </Title>
          <Text>
            <FormattedMessage
              defaultMessage="Alert ID: {reference}"
              values={{ reference: incident.reference }}
            />
          </Text>
          <Paragraph>{incident.description}</Paragraph>
          <Descriptions style={{ marginTop: 20, marginBottom: 20 }}>
            <Descriptions.Item
              label={<FormattedMessage defaultMessage="Date/Time" />}
            >
              {incident.dayTime}
            </Descriptions.Item>
            <Descriptions.Item
              label={<FormattedMessage defaultMessage="Location" />}
            >
              {incident.location?.full}
            </Descriptions.Item>
            <Descriptions.Item
              label={<FormattedMessage defaultMessage="Crime Number" />}
            >
              {incident.policeRef}
            </Descriptions.Item>
            <Descriptions.Item
              label={<FormattedMessage defaultMessage="Crime Type" />}
            >
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
            <Card
              title={<FormattedMessage defaultMessage="Offenders" />}
              headStyle={{ marginTop: -5 }}
              bodyStyle={{ padding: 0 }}
              className={classes.tableContainer}
            >
              <OffenderTable
                offenders={incident.offenders}
                hasNavigation={false}
              />
            </Card>
          )}

          <Row gutter={8} justify="end">
            <Col>
              <Link to={`/app/incidents/view/${incident.id}`} onClick={onClose}>
                <Button>
                  <FormattedMessage defaultMessage="View Incident" />
                </Button>
              </Link>
            </Col>
            <Col>
              <Button
                danger
                type="ghost"
                onClick={() => handleAddSuggestion(incident.id)}
              >
                <FormattedMessage defaultMessage="Add To Investigation" />
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
