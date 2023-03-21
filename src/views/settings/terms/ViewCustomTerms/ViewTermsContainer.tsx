import React from 'react';
import useViewTerms from './hooks/useViewTerms';
import View from './ViewTerms';

const ViewTermsContainer = () => {
  const { data, loading, isAdmin, editTerms } = useViewTerms();

  return (
    <View
      data={data}
      loading={loading}
      isAdmin={isAdmin}
      editTerms={editTerms}
    />
  );
};

export default ViewTermsContainer;
