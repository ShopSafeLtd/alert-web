import React from 'react';

import type { PendingVideo } from './types';

import MandatoryVideoModalView from './MandatoryVideoModal.view';
import useMandatoryVideoModal from './useMandatoryVideoModal';

interface MandatoryVideoModalContainerProps {
  onComplete: () => void;
  videos: PendingVideo[];
  visible: boolean;
}

const MandatoryVideoModalContainer: React.FC<
  MandatoryVideoModalContainerProps
> = ({ onComplete, videos, visible }) => {
  const props = useMandatoryVideoModal({ onComplete, videos });

  return (
    <MandatoryVideoModalView {...props} videos={videos} visible={visible} />
  );
};

export default MandatoryVideoModalContainer;
