import React from 'react';

import ActiveChecklistView from './ActiveChecklist.view';
import useActiveChecklist from './useActiveChecklist';

const ActiveChecklistContainer = () => {
  const {
    data,
    file,
    form,
    id,
    loading,
    name,
    onFinish,
    saveDraft,
    sections,
    selectedFont,
    setFile,
    setSelectedFont,
    setSign,
    setTab,
    sign,
    submitting,
    tab,
    update,
  } = useActiveChecklist();

  return (
    <ActiveChecklistView
      data={data}
      file={file}
      form={form}
      id={id}
      loading={loading}
      name={name}
      onFinish={onFinish}
      saveDraft={saveDraft}
      sections={sections}
      selectedFont={selectedFont}
      setFile={setFile}
      setSelectedFont={setSelectedFont}
      setSign={setSign}
      setTab={setTab}
      sign={sign}
      submitting={submitting}
      tab={tab}
      update={update}
    />
  );
};

export default ActiveChecklistContainer;
