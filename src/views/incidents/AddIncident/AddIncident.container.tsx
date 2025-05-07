import React from 'react';
import { useParams } from 'react-router';

import View from './AddIncident.view';
import useAddIncident from './useAddIncident';

const AddIncident = ({
  investigation = false,
}: {
  investigation?: boolean;
}): JSX.Element => {
  const id = useParams().id || '';

  const {
    addNewAddress,
    customQuestions,
    dontKnowGoods,
    draftLoading,
    form,
    generatingStatement,
    goodsMode,
    goodsVisible,
    incidentForm,
    incidentTagsData,
    incidentTagsLoading,
    knowGoods,
    newAddressData,
    onSubmit,
    onValuesChange,
    policeReporting,
    primaryAddress,
    primaryImage,
    reportOnly,
    saving,
    setPoliceReporting,
    setPrimaryImage,
    showSiteNumber,
    submitDraft,
    tagsData,
    toggleAddNewAddress,
    updateNewAddressData,
  } = useAddIncident({ id, investigationId: investigation ? id : undefined });

  return (
    <div>
      <View
        addNewAddress={addNewAddress}
        customQuestions={customQuestions}
        dontKnowGoods={dontKnowGoods}
        draftLoading={draftLoading}
        form={form}
        generatingStatement={generatingStatement}
        goodsMode={goodsMode}
        goodsVisible={goodsVisible}
        incidentForm={incidentForm}
        incidentTagsData={incidentTagsData}
        incidentTagsLoading={incidentTagsLoading}
        knowGoods={knowGoods}
        newAddressData={newAddressData}
        onSubmit={onSubmit}
        onValuesChange={onValuesChange}
        policeReporting={policeReporting}
        primaryAddress={primaryAddress}
        primaryImage={primaryImage}
        reportOnly={reportOnly}
        saving={saving}
        setPoliceReporting={setPoliceReporting}
        setPrimaryImage={setPrimaryImage}
        showSiteNumber={showSiteNumber}
        submitDraft={submitDraft}
        tagsData={tagsData}
        toggleAddNewAddress={toggleAddNewAddress}
        updateNewAddressData={updateNewAddressData}
      />
    </div>
  );
};

export default AddIncident;
