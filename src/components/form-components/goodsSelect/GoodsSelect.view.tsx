import { useListGoodsTypesQuery } from '#/graphql/goods-types/queries/__generated__/list-goods-types.generated';
import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { Select } from 'antd';
import { useAtomValue } from 'jotai/index';
import React from 'react';

interface Props {
  allowClear?: boolean;
  className?: string;
  maxTagCount?: 'responsive' | number;
  mode?: 'multiple' | 'tags';
  onChange?: (value: string[]) => void;
  placeholder?: string;
  style?: React.CSSProperties;
  value?: string[];
}

export const useGoodsData = () => {
  const currentSchemeId = useAtomValue(currentSchemeIdAtom);
  const { data, loading } = useListGoodsTypesQuery({
    variables: {
      where: {
        schemes: {
          id: { equals: currentSchemeId },
        },
      },
    },
  });
  return {
    data,
    goodsData:
      data?.listGoodsTypes.goodsTypes.map((item) => ({
        label: item.name,
        value: item.id,
      })) || [],
    loading,
  };
};

const GoodsSelect = ({
  allowClear,
  className,
  maxTagCount,
  mode,
  onChange,
  placeholder,
  style,
  value,
}: Props) => {
  const { goodsData, loading } = useGoodsData();

  return (
    <Select
      allowClear={allowClear}
      className={className}
      disabled={loading}
      loading={loading}
      maxTagCount={maxTagCount}
      mode={mode}
      onChange={onChange}
      optionFilterProp="label"
      options={goodsData}
      placeholder={placeholder}
      style={style}
      value={value}
    />
  );
};

export default GoodsSelect;
