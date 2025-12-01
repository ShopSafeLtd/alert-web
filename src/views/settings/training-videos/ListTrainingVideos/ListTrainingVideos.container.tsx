import React from 'react';

import ListTrainingVideosView from './ListTrainingVideos.view';
import useListTrainingVideos from './useListTrainingVideos';

const ListTrainingVideosContainer: React.FC = () => {
  const props = useListTrainingVideos();
  return <ListTrainingVideosView {...props} />;
};

export default ListTrainingVideosContainer;
