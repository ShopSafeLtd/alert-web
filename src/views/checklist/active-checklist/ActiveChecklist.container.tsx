import React from 'react';
import useActiveChecklist from './useActiveChecklist';
import ActiveChecklistView from './ActiveChecklist.view';

const ActiveChecklistContainer = () => {
  const {
    data,
    loading,
    onFinish,
    form,
    id,
    sections,
    saveDraft,
    name,
    file,
    setFile,
    setSign,
    update,
    selectedFont,
    setSelectedFont,
    sign,
    setTab,
    tab,
    submitting,
  } = useActiveChecklist();
  return (
    <ActiveChecklistView
      submitting={submitting}
      id={id}
      loading={loading}
      form={form}
      onFinish={onFinish}
      data={data}
      saveDraft={saveDraft}
      sections={sections}
      name={name}
      file={file}
      setFile={setFile}
      setSign={setSign}
      update={update}
      selectedFont={selectedFont}
      setSelectedFont={setSelectedFont}
      sign={sign}
      setTab={setTab}
      tab={tab}
    />
  );
};

export default ActiveChecklistContainer;
