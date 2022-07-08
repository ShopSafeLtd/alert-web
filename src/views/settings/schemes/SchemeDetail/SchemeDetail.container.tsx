import React from 'react';
import View from './SchemeDetail.view';

import useSchemeDetail from './useSchemeDetail';

function SchemeDetail() {
  const { data, loading, saving, schemeSubmit } = useSchemeDetail();
  return (
    <div>
      <View
        data={data}
        loading={loading}
        saving={saving}
        schemeSubmit={schemeSubmit}
      />
    </div>
  );
}

export default SchemeDetail;
