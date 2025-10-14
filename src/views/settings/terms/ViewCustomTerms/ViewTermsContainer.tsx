import React from 'react';

import View from './ViewTerms';
import useViewTerms from './hooks/useViewTerms';

const ViewTermsContainer = () => {
  const { data, editTerms, isAdmin, loading } = useViewTerms();

  return (
    <View
      data={data}
      editTerms={editTerms}
      isAdmin={isAdmin}
      loading={loading}
    />
  );
};

export default ViewTermsContainer;
