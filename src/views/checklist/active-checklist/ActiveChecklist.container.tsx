import React from 'react';

import ActiveChecklistView from './ActiveChecklist.view';
import useActiveChecklist from './useActiveChecklist';

const ActiveChecklistContainer = () => {
  const {
    activeKeys,
    completionStats,
    data,
    file,
    form,
    id,
    loading,
    name,
    onFinish,
    saveDraft,
    saveStatus,
    sections,
    selectedBusinessId,
    selectedFont,
    setActiveKeys,
    setFile,
    setSelectedBusinessId,
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
      activeKeys={activeKeys}
      completionStats={completionStats}
      data={data}
      file={file}
      form={form}
      id={id}
      loading={loading}
      name={name}
      onFinish={onFinish}
      saveDraft={saveDraft}
      saveStatus={saveStatus}
      sections={sections}
      selectedBusinessId={selectedBusinessId}
      selectedFont={selectedFont}
      setActiveKeys={setActiveKeys}
      setFile={setFile}
      setSelectedBusinessId={setSelectedBusinessId}
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
