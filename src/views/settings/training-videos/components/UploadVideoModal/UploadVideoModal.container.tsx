import React from 'react';

import UploadVideoModalView from './UploadVideoModal.view';
import useUploadVideoModal from './useUploadVideoModal';

interface UploadVideoModalContainerProps {
  onClose: () => void;
  onSuccess: () => void;
  visible: boolean;
}

const UploadVideoModalContainer: React.FC<UploadVideoModalContainerProps> = ({
  onClose,
  onSuccess,
  visible,
}) => {
  const props = useUploadVideoModal({ onClose, onSuccess });
  return (
    <UploadVideoModalView {...props} onClose={onClose} visible={visible} />
  );
};

export default UploadVideoModalContainer;
