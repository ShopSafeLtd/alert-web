import React from 'react';
import View from './CreateMg11.view';
import useAddIncident from './useCreateMg11';

const CreateMg11 = (): JSX.Element => {
  const {
    onSubmit,
    saving,
    form,
    setSign,
    sign,
    setInterviewerSign,
    interviewerName,
    interviewerFile,
    interviewerSetFile,
    interviewerSetSelectedFont,
    interviewerSelectedFont,
    interviewerSign,
    file,
    selectedFont,
    name,
    setFile,
    setSelectedFont,
    updateInterviewer,
    update,
    tab,
    setTab,
    interviewerSetTab,
    interviewerTab,
    statementTemplates,
  } = useAddIncident();

  return (
    <View
      statementTemplates={statementTemplates}
      form={form}
      onSubmit={onSubmit}
      saving={saving}
      setSign={setSign}
      sign={sign}
      setInterviewerSign={setInterviewerSign}
      interviewerName={interviewerName}
      interviewerFile={interviewerFile}
      interviewerSetFile={interviewerSetFile}
      interviewerSetSelectedFont={interviewerSetSelectedFont}
      interviewerSelectedFont={interviewerSelectedFont}
      interviewerSign={interviewerSign}
      file={file}
      selectedFont={selectedFont}
      name={name}
      setFile={setFile}
      setSelectedFont={setSelectedFont}
      updateInterviewer={updateInterviewer}
      update={update}
      tab={tab}
      setTab={setTab}
      interviewerSetTab={interviewerSetTab}
      interviewerTab={interviewerTab}
    />
  );
};

export default CreateMg11;
