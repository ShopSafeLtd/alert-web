import React, { useState } from 'react';
import { Button, Table } from 'antd';
import type { InvestigationSuggestionsQuery } from 'graphql/generated';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import type { WatermarkSlideType } from 'components/images/WatermartkSlide.view';
import WatermarkSlide from 'components/images/WatermartkSlide.view';
import { FormattedMessage } from 'react-intl';
import useStyles from './SuggestedVehicles.style';

interface Props {
  suggestedData: InvestigationSuggestionsQuery | undefined;
  handleAddSuggestion: (id: string) => void;
}

const SuggestedVehicles = ({ suggestedData, handleAddSuggestion }: Props) => {
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
      <Table
        columns={[
          {
            key: 'reference',
            dataIndex: 'reference',
            title: <FormattedMessage id="k8ZNgH" defaultMessage="Alert ID" />,
          },
          {
            key: 'registration',
            dataIndex: 'registration',
            title: (
              <FormattedMessage id="qv7ied" defaultMessage="Registration" />
            ),
          },
          {
            key: 'make',
            dataIndex: 'make',
            title: <FormattedMessage id="6AAM0P" defaultMessage="Make" />,
          },
          {
            key: 'model',
            dataIndex: 'model',
            title: <FormattedMessage id="rhSI1/" defaultMessage="Model" />,
          },
          {
            key: 'colour',
            dataIndex: 'colour',
            title: <FormattedMessage id="+e8vAT" defaultMessage="Colour" />,
          },
          {
            key: 'actions',
            dataIndex: 'actions',
            title: '',
            render: (_, row) => (
              <Button
                danger
                type="ghost"
                onClick={() => handleAddSuggestion(row.key)}
              >
                <FormattedMessage
                  id="zEXZIx"
                  defaultMessage="Add To Investigation"
                />
              </Button>
            ),
          },
        ]}
        dataSource={
          suggestedData?.investigation?.suggestedVehicles?.map((item) => ({
            reference: item.reference,
            registration: item.registration,
            make: item.make,
            model: item.model,
            colour: item.colour,
            key: item.id,
          })) || []
        }
      />

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

export default SuggestedVehicles;
