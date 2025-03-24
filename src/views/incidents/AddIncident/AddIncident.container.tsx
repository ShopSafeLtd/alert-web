import React from 'react';
import { useParams } from 'react-router';

import View from './AddIncident.view';
import useAddIncident from './useAddIncident';

const AddIncident = (): JSX.Element => {
  const investigationId = useParams().investigationId || '';

  const {
    addNewAddress,
    customQuestions,
    dontKnowGoods,
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
    tagsData,
    toggleAddNewAddress,
    updateNewAddressData,
  } = useAddIncident({ investigationId });

  return (
    <div>
      <View
        addNewAddress={addNewAddress}
        customQuestions={customQuestions}
        dontKnowGoods={dontKnowGoods}
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
        tagsData={tagsData}
        toggleAddNewAddress={toggleAddNewAddress}
        updateNewAddressData={updateNewAddressData}
      />
    </div>
  );
};

export default AddIncident;
