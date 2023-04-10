import { useState } from 'react';

interface ReturnType {
  editMode: boolean;
  setEditMode: (arg0: boolean) => void;
}

const useGrids = (): ReturnType => {
  const [editMode, setEditMode] = useState(false);
  return {
    editMode,
    setEditMode,
  };
};

export default useGrids;
