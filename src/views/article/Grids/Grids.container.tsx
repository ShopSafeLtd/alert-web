import React from 'react';
import useGrids from './hooks/useGrids';
import View from './Grids.view';

const GridsContainer = () => {
  const { editMode, setEditMode } = useGrids();
  return <View editMode={editMode} setEditMode={setEditMode} />;
};
export default GridsContainer;
