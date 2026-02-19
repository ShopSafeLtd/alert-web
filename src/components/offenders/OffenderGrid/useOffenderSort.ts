import { useState } from 'react';

export const useOffenderSort = (defaultSort: string = 'incidents') => {
  const [sortBy, setSortBy] = useState(defaultSort);

  return {
    setSortBy,
    sortBy,
  };
};
