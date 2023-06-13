import React from 'react';
import View from './FinalSignMg11.view';
import useAddIncident from './useFinalSignMg11';

const CreateMg11 = (): JSX.Element => {
  const {
    onSubmit,
    saving,
    form,
    setSign,
    update,
    selectedFont,
    name,
    file,
    setTab,
    tab,
    setSelectedFont,
    setFile,
    data,
    sign,
    status,
  } = useAddIncident();

  return (
    <div>
      <View
        form={form}
        onSubmit={onSubmit}
        saving={saving}
        setSign={setSign}
        update={update}
        selectedFont={selectedFont}
        name={name}
        file={file}
        setTab={setTab}
        tab={tab}
        setSelectedFont={setSelectedFont}
        setFile={setFile}
        data={data}
        sign={sign}
        status={status}
      />
    </div>
  );
};

export default CreateMg11;
