import { useState } from 'react';

export const useOffenderSort = (defaultSort: string = 'lastSeen') => {
  const [sortBy, setSortBy] = useState(defaultSort);

  return {
    setSortBy,
    sortBy,
  };
};
