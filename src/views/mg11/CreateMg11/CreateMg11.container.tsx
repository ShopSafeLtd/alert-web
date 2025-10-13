import React from 'react';

import View from './CreateMg11.view';
import useAddIncident from './useCreateMg11';

const CreateMg11 = (): JSX.Element => {
  const {
    file,
    form,
    interviewerFile,
    interviewerName,
    interviewerSelectedFont,
    interviewerSetFile,
    interviewerSetSelectedFont,
    interviewerSetTab,
    interviewerSign,
    interviewerTab,
    name,
    onSubmit,
    saving,
    selectedFont,
    setFile,
    setInterviewerSign,
    setSelectedFont,
    setSign,
    setTab,
    sign,
    statementTemplates,
    tab,
    update,
    updateInterviewer,
  } = useAddIncident();

  return (
    <View
      file={file}
      form={form}
      interviewerFile={interviewerFile}
      interviewerName={interviewerName}
      interviewerSelectedFont={interviewerSelectedFont}
      interviewerSetFile={interviewerSetFile}
      interviewerSetSelectedFont={interviewerSetSelectedFont}
      interviewerSetTab={interviewerSetTab}
      interviewerSign={interviewerSign}
      interviewerTab={interviewerTab}
      name={name}
      onSubmit={onSubmit}
      saving={saving}
      selectedFont={selectedFont}
      setFile={setFile}
      setInterviewerSign={setInterviewerSign}
      setSelectedFont={setSelectedFont}
      setSign={setSign}
      setTab={setTab}
      sign={sign}
      statementTemplates={statementTemplates}
      tab={tab}
      update={update}
      updateInterviewer={updateInterviewer}
    />
  );
};

export default CreateMg11;
