import type { FormData } from '#/views/incidents/AddIncident/types/formData';
import type { IncidentFormState } from '#/views/incidents/AddIncident/useAddIncident';
import type { FormInstance } from 'antd';

import React from 'react';

import View from './IncidentGoods.view';
import useIncidentGoods from './useIncidentGoods';

interface Props {
  dontKnowGoods: () => void;
  form: FormInstance<FormData>;
  goodsMode: string;
  goodsVisible: boolean;
  incidentForm?: IncidentFormState;
  knowGoods: () => void;
}

const IncidentGoods = ({
  dontKnowGoods,
  form,
  goodsMode,
  goodsVisible,
  incidentForm,
  knowGoods,
}: Props) => {
  const { businessCurrency, division, goods, goodsTypesData, onAddItem } =
    useIncidentGoods({
      form,
    });

  // Extract showDamagedQuantity from GOODS field metadata
  const goodsFormField = incidentForm?.find((f) => f.type === 'GOODS');
  const showDamagedQuantity =
    goodsFormField?.metadata?.[0]?.showDamagedQuantity === true;

  return (
    <View
      businessCurrency={businessCurrency}
      division={division}
      dontKnowGoods={dontKnowGoods}
      goods={goods}
      goodsMode={goodsMode}
      goodsTypesData={goodsTypesData}
      goodsVisible={goodsVisible}
      knowGoods={knowGoods}
      onAddItem={onAddItem}
      showDamagedQuantity={showDamagedQuantity}
    />
  );
};

export default IncidentGoods;
