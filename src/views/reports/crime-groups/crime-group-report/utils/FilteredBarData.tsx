interface DataFormatToBarParams {
  item: { data: { label: string; value: number }[] | null | undefined };
}

const dataFormatToBar = ({ item }: DataFormatToBarParams) => {
  if (!item?.data) return {};
  const data = Object.fromEntries(
    item?.data?.map((d) => [d?.label || ' ', d?.value || 0])
  );
  if (data) return { ...data };
  return undefined;
};

interface FilteredBarDataParams {
  data:
    | Array<{
        label: string;
        data: Array<{ value: number; label: string }>;
      } | null>
    | null
    | undefined;
}

const filteredBarData = ({ data }: FilteredBarDataParams) => {
  const initData = data?.map((item) => ({
    label: item?.label || '',
    ...dataFormatToBar({ item: item || { data: null } }),
  }));
  const filteredData = initData?.filter((item) => Object.keys(item).length > 2);
  if (!filteredData)
    return [
      {
        label: 'No Data',
      },
    ];
  return filteredData;
};

export default filteredBarData;
