import React from 'react';
import useCreateImpact from './useCreateImpact';
import CreateImpact from './CreateImpact.view';

const CreateImpactContainer = () => {
  const {
    incidentData,
    form,
    setSign,
    sign,
    name,
    setFile,
    file,
    selectedFont,
    setSelectedFont,
    tab,
    setTab,
    update,
    saving,
    onSubmit,
    data,
  } = useCreateImpact();

  return (
    <CreateImpact
      incidentData={incidentData}
      form={form}
      setSign={setSign}
      sign={sign}
      name={name}
      setFile={setFile}
      file={file}
      selectedFont={selectedFont}
      setSelectedFont={setSelectedFont}
      tab={tab}
      setTab={setTab}
      update={update}
      saving={saving}
      onSubmit={onSubmit}
      data={data}
    />
  );
};

export default CreateImpactContainer;
