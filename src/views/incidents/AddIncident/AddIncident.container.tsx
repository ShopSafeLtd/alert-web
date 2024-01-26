import React from 'react';
import { useParams } from 'react-router';
import View from './AddIncident.view';
import useAddIncident from './useAddIncident';

const AddIncident = (): JSX.Element => {
  const investigationId = useParams().investigationId || '';

  const {
    form,
    onSubmit,
    primaryAddress,
    saving,
    onValuesChange,
    addNewAddress,
    toggleAddNewAddress,
    updateNewAddressData,
    newAddressData,
    dontKnowGoods,
    goodsVisible,
    knowGoods,
    primaryImage,
    setPrimaryImage,
    incidentForm,
    customQuestions,
    goodsMode,
    reportOnly,
    showSiteNumber,
  } = useAddIncident({ investigationId });

  return (
    <div>
      <View
        form={form}
        onSubmit={onSubmit}
        primaryAddress={primaryAddress}
        saving={saving}
        onValuesChange={onValuesChange}
        addNewAddress={addNewAddress}
        toggleAddNewAddress={toggleAddNewAddress}
        updateNewAddressData={updateNewAddressData}
        newAddressData={newAddressData}
        dontKnowGoods={dontKnowGoods}
        goodsVisible={goodsVisible}
        knowGoods={knowGoods}
        primaryImage={primaryImage}
        setPrimaryImage={setPrimaryImage}
        incidentForm={incidentForm}
        customQuestions={customQuestions}
        goodsMode={goodsMode}
        reportOnly={reportOnly}
        showSiteNumber={showSiteNumber}
      />
    </div>
  );
};

export default AddIncident;
