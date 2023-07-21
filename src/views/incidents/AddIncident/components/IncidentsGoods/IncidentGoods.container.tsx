import React from 'react';
import View from './IncidentGoods.view';
import useIncidentGoods from './useIncidentGoods';

interface Props {
  formStages: {
    crimeTypes: boolean;
    where: boolean;
    goods: boolean;
    profiles: boolean;
    images: boolean;
    police: boolean;
    details: boolean;
    groups: boolean;
  };
  goodsVisible: boolean;
  dontKnowGoods: () => void;
  knowGoods: () => void;
}

const IncidentGoods = ({
  formStages,
  goodsVisible,
  knowGoods,
  dontKnowGoods,
}: Props) => {
  const { goodsTypesData } = useIncidentGoods();
  return (
    <View
      goodsTypesData={goodsTypesData}
      goodsVisible={goodsVisible}
      knowGoods={knowGoods}
      dontKnowGoods={dontKnowGoods}
      formStages={formStages}
    />
  );
};

export default IncidentGoods;
