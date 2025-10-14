import React from 'react';

import View from './SignMg11.view';
import useAddIncident from './useSignMg11';

const CreateMg11 = (): JSX.Element => {
  const {
    data,
    file,
    form,
    name,
    onSubmit,
    saving,
    selectedFont,
    setFile,
    setSelectedFont,
    setSign,
    setTab,
    sign,
    status,
    tab,
    update,
  } = useAddIncident();

  return (
    <div>
      <View
        data={data}
        file={file}
        form={form}
        name={name}
        onSubmit={onSubmit}
        saving={saving}
        selectedFont={selectedFont}
        setFile={setFile}
        setSelectedFont={setSelectedFont}
        setSign={setSign}
        setTab={setTab}
        sign={sign}
        status={status}
        tab={tab}
        update={update}
      />
    </div>
  );
};

export default CreateMg11;
