import React from 'react';
import { useParams } from 'react-router';

import View from './AddIncident.view';
import useAddIncident from './useAddIncident';

const AddIncident = (): JSX.Element => {
  const investigationId = useParams().investigationId || '';

  const {
    addNewAddress,
    brands,
    customQuestions,
    dontKnowGoods,
    form,
    generatingStatement,
    goodsMode,
    goodsVisible,
    incidentForm,
    knowGoods,
    newAddressData,
    onSubmit,
    onValuesChange,
    policeReporting,
    primaryAddress,
    primaryImage,
    reportOnly,
    saving,
    setBrands,
    setPoliceReporting,
    setPrimaryImage,
    showSiteNumber,
    toggleAddNewAddress,
    updateNewAddressData,
  } = useAddIncident({ investigationId });

  return (
    <div>
      <View
        addNewAddress={addNewAddress}
        brands={brands}
        customQuestions={customQuestions}
        dontKnowGoods={dontKnowGoods}
        form={form}
        generatingStatement={generatingStatement}
        goodsMode={goodsMode}
        goodsVisible={goodsVisible}
        incidentForm={incidentForm}
        knowGoods={knowGoods}
        newAddressData={newAddressData}
        onSubmit={onSubmit}
        onValuesChange={onValuesChange}
        policeReporting={policeReporting}
        primaryAddress={primaryAddress}
        primaryImage={primaryImage}
        reportOnly={reportOnly}
        saving={saving}
        setBrands={setBrands}
        setPoliceReporting={setPoliceReporting}
        setPrimaryImage={setPrimaryImage}
        showSiteNumber={showSiteNumber}
        toggleAddNewAddress={toggleAddNewAddress}
        updateNewAddressData={updateNewAddressData}
      />
    </div>
  );
};

export default AddIncident;
