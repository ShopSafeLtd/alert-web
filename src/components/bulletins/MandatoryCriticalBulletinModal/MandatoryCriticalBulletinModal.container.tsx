import React from 'react';

import type { PendingCriticalBulletin } from './types';

import MandatoryCriticalBulletinModalView from './MandatoryCriticalBulletinModal.view';
import useMandatoryCriticalBulletinModal from './useMandatoryCriticalBulletinModal';

interface MandatoryCriticalBulletinModalContainerProps {
  bulletins: PendingCriticalBulletin[];
  onComplete: () => void;
  visible: boolean;
}

const MandatoryCriticalBulletinModalContainer: React.FC<
  MandatoryCriticalBulletinModalContainerProps
> = ({ bulletins, onComplete, visible }) => {
  const props = useMandatoryCriticalBulletinModal({ bulletins, onComplete });

  return (
    <MandatoryCriticalBulletinModalView
      {...props}
      bulletins={bulletins}
      visible={visible}
    />
  );
};

export default MandatoryCriticalBulletinModalContainer;
