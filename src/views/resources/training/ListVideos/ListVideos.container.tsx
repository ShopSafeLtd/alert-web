import React from 'react';

import ListVideosView from './ListVideos.view';
import useListVideos from './useListVideos';

const ListVideosContainer: React.FC = () => {
  const props = useListVideos();
  return <ListVideosView {...props} />;
};

export default ListVideosContainer;
