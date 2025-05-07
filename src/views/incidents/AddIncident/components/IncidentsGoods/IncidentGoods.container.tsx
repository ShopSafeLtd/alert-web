import type { FormData } from '#/views/incidents/AddIncident/types/formData';
import type { FormInstance } from 'antd';

import React from 'react';

import View from './IncidentGoods.view';
import useIncidentGoods from './useIncidentGoods';

interface Props {
  dontKnowGoods: () => void;
  form: FormInstance<FormData>;
  goodsMode: string;
  goodsVisible: boolean;
  knowGoods: () => void;
}

const IncidentGoods = ({
  dontKnowGoods,
  form,
  goodsMode,
  goodsVisible,
  knowGoods,
}: Props) => {
  const { division, goods, goodsTypesData, onAddItem } = useIncidentGoods({
    form,
  });
  return (
    <View
      division={division}
      dontKnowGoods={dontKnowGoods}
      goods={goods}
      goodsMode={goodsMode}
      goodsTypesData={goodsTypesData}
      goodsVisible={goodsVisible}
      knowGoods={knowGoods}
      onAddItem={onAddItem}
    />
  );
};

export default IncidentGoods;
