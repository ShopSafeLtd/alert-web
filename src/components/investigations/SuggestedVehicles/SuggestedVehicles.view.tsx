import type { WatermarkSlideType } from 'components/images/WatermartkSlide.view';
import type { InvestigationSuggestionsQuery } from 'graphql/investigations/queries/__generated__/investigation-suggestions.generated';

import { Button, Table } from 'antd';
import WatermarkSlide from 'components/images/WatermartkSlide.view';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

import useStyles from './SuggestedVehicles.style';

interface Props {
  handleAddSuggestion: (id: string) => void;
  suggestedData: InvestigationSuggestionsQuery | undefined;
}

const SuggestedVehicles = ({ handleAddSuggestion, suggestedData }: Props) => {
  const classes = useStyles();
  const [lightBoxOpen, setLightBoxOpen] = useState<{
    index: number;
    open: boolean;
  }>({
    index: 0,
    open: false,
  });
  const [lightboxElements, setLightboxElements] = useState<{ src: string }[]>(
    []
  );

  const openLightbox = (
    offender: {
      images: { id: string; optimised?: null | string | undefined }[];
    },
    index: number
  ) => {
    setLightboxElements(
      offender.images.map((image) => ({
        src: image.optimised || '',
      })) || []
    );
    setLightBoxOpen({ index, open: !lightBoxOpen.open });
  };

  return (
    <div className={classes.container}>
      <Table
        columns={[
          {
            dataIndex: 'reference',
            key: 'reference',
            title: <FormattedMessage defaultMessage="Alert ID" />,
          },
          {
            dataIndex: 'registration',
            key: 'registration',
            title: <FormattedMessage defaultMessage="Registration" />,
          },
          {
            dataIndex: 'make',
            key: 'make',
            title: <FormattedMessage defaultMessage="Make" />,
          },
          {
            dataIndex: 'model',
            key: 'model',
            title: <FormattedMessage defaultMessage="Model" />,
          },
          {
            dataIndex: 'colour',
            key: 'colour',
            title: <FormattedMessage defaultMessage="Colour" />,
          },
          {
            dataIndex: 'actions',
            key: 'actions',
            render: (_, row) => (
              <Button
                danger
                onClick={() => handleAddSuggestion(row.key)}
                type="ghost"
              >
                <FormattedMessage defaultMessage="Add To Investigation" />
              </Button>
            ),
            title: '',
          },
        ]}
        dataSource={
          suggestedData?.investigation?.suggestedVehicles?.map((item) => ({
            colour: item.colour,
            key: item.id,
            make: item.make,
            model: item.model,
            reference: item.reference,
            registration: item.registration,
          })) || []
        }
      />

      <Lightbox
        close={() => openLightbox({ images: [] }, 0)}
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

export default SuggestedVehicles;
