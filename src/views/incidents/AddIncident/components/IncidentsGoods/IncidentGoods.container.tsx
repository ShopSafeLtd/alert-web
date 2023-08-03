import React from 'react';
import View from './IncidentGoods.view';
import useIncidentGoods from './useIncidentGoods';

interface Props {
  goodsVisible: boolean;
  dontKnowGoods: () => void;
  knowGoods: () => void;
  goodsMode: string;
}

const IncidentGoods = ({
  goodsVisible,
  knowGoods,
  dontKnowGoods,
  goodsMode,
}: Props) => {
  const { goodsTypesData } = useIncidentGoods();
  return (
    <View
      goodsTypesData={goodsTypesData}
      goodsVisible={goodsVisible}
      knowGoods={knowGoods}
      dontKnowGoods={dontKnowGoods}
      goodsMode={goodsMode}
    />
  );
};

export default IncidentGoods;
