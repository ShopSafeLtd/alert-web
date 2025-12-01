import React from 'react';

import type { TrainingVideo } from '../../types';

import EditVideoModalView from './EditVideoModal.view';
import useEditVideoModal from './useEditVideoModal';

interface EditVideoModalContainerProps {
  onClose: () => void;
  onSuccess: () => void;
  video: TrainingVideo;
  visible: boolean;
}

const EditVideoModalContainer: React.FC<EditVideoModalContainerProps> = ({
  onClose,
  onSuccess,
  video,
  visible,
}) => {
  const props = useEditVideoModal({ onClose, onSuccess, video });
  return <EditVideoModalView {...props} onClose={onClose} visible={visible} />;
};

export default EditVideoModalContainer;
