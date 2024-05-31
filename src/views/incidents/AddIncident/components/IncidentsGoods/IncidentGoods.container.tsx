import React from 'react';
import type { FormInstance } from 'antd';
import View from './IncidentGoods.view';
import useIncidentGoods from './useIncidentGoods';
import type { FormData } from '../../useAddIncident';

interface Props {
  goodsVisible: boolean;
  dontKnowGoods: () => void;
  knowGoods: () => void;
  goodsMode: string;
  form: FormInstance<FormData>;
}

const IncidentGoods = ({
  goodsVisible,
  knowGoods,
  dontKnowGoods,
  goodsMode,
  form,
}: Props) => {
  const { goodsTypesData, onAddItem, division, goods } = useIncidentGoods({
    form,
  });
  return (
    <View
      goodsTypesData={goodsTypesData}
      goodsVisible={goodsVisible}
      knowGoods={knowGoods}
      dontKnowGoods={dontKnowGoods}
      goodsMode={goodsMode}
      onAddItem={onAddItem}
      division={division}
      goods={goods}
    />
  );
};

export default IncidentGoods;
