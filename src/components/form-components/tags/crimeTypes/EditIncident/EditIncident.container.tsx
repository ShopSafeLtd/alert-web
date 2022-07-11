import React from 'react';
import View from './EditIncident.view';
import useEditIncident from './useEditIncident';

interface Props {
  onClose: () => void;
  incidentId: string | undefined;
}

const EditIncident = ({ onClose, incidentId }: Props): JSX.Element => {
  const { onSubmit, data, loading, saving } = useEditIncident({
    onClose,
    incidentId,
  });
  return (
    <View
      onSubmit={onSubmit}
      onClose={onClose}
      data={data}
      loading={loading}
      saving={saving}
    />
  );
};

export default EditIncident;
