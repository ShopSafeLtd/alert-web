import React from 'react';

import CreateImpact from './CreateImpact.view';
import useCreateImpact from './useCreateImpact';

const CreateImpactContainer = () => {
  const {
    data,
    file,
    form,
    incidentData,
    name,
    onSubmit,
    saving,
    selectedFont,
    setFile,
    setSelectedFont,
    setSign,
    setTab,
    sign,
    tab,
    update,
  } = useCreateImpact();

  return (
    <CreateImpact
      data={data}
      file={file}
      form={form}
      incidentData={incidentData}
      name={name}
      onSubmit={onSubmit}
      saving={saving}
      selectedFont={selectedFont}
      setFile={setFile}
      setSelectedFont={setSelectedFont}
      setSign={setSign}
      setTab={setTab}
      sign={sign}
      tab={tab}
      update={update}
    />
  );
};

export default CreateImpactContainer;
