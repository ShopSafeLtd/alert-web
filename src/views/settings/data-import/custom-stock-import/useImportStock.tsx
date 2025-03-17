import type { FormInstance } from 'antd';
import type { ColumnsType } from 'antd/es/table/interface';
import type { ListGoodsTypesQuery } from 'graphql/goods-types/queries/__generated__/list-goods-types.generated';
import type { Dispatch, SetStateAction } from 'react';

import { customRequest } from '#/views/settings/data-import/custom-stock-import/customRequest';
import { useImportStockItemCsvMutation } from '#/views/settings/data-import/custom-stock-import/graphql/mutations/__generated__/stock-item-import.generated';
import { Form, notification } from 'antd';
import { useListGoodsTypesQuery } from 'graphql/goods-types/queries/__generated__/list-goods-types.generated';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useStoreState } from 'state';

// import type { ColumnsType } from 'antd/es/table/interface';
import type { HeaderToFixed, IFormData, Record } from './types';
// import { ColumnsType } from 'antd/es/table/interface';

const { useForm } = Form;

interface ColumnType {
  dataIndex: string;
  key: string;
  render?: (value: string) => string;
  title: string;
  width?: number;
}

const fileHeaders: (keyof HeaderToFixed)[] = [
  'barcode',
  'variant',
  'name',
  'brand',
  'sku',
  'goodsTypeId',
  'schemeId',
  'division',
];
interface Return {
  badData: Record[];
  columns: ColumnsType<Record>;
  current: number;
  data: Record[];
  form: FormInstance;
  formattedDataColumns: ColumnsType<Record>;
  goodsTypeData: ListGoodsTypesQuery | undefined;
  header: string[];
  headerToFixed: HeaderToFixed;
  itemToFix: Partial<IFormData> | null;
  loading: boolean;
  onFileLoaded: (d: string[][]) => void;
  onFix: (values: IFormData) => void;
  onNext: () => void;
  onPrev: () => void;
  onSubmit: () => void;
  setBadData: Dispatch<SetStateAction<Record[]>>;
  setItemToFix: (v: Partial<IFormData> | null) => void;
  setLoading: (v: boolean) => void;
  setOriginalItemToFix: (v: Record | null) => void;
  setUploading: (v: boolean) => void;
  uploading: boolean;
}
const escapeCSVField = (field: string): string => {
  if (field === null) return '';
  // Escape any double quotes
  const escapedField = field.replaceAll('"', '""');
  // Wrap in quotes if the field contains a comma, newline, or a double quote
  if (
    escapedField.includes(',') ||
    escapedField.includes('\n') ||
    escapedField.includes('"')
  ) {
    return `"${escapedField}"`;
  }
  return escapedField;
};
const useImportStock = (): Return => {
  const customFields = new Set(['goodsTypeId', 'schemeId', 'division', 'name']);

  const [data, setData] = useState<Record[]>([]);
  const [badData, setBadData] = useState<Record[]>([]);
  const [current, setCurrent] = useState(0);
  const [uploading, setUploading] = useState(false);
  const intl = useIntl();
  const [form] = useForm<IFormData>();
  const schemeId = useStoreState((state) => state.scheme.id);
  const [headerToFixed, setHeaderToFixed] = useState<HeaderToFixed>({
    barcode: '',
    brand: '',
    colour: '',
    description: '',
    division: '',
    goodsTypeId: '',
    itemSize: '',
    name: '',
    schemeId: '',
    sku: '',
    variant: '',
  });
  const [header, setHeader] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [itemToFix, setItemToFix] = useState<Partial<IFormData> | null>(null);
  const [originalItemToFix, setOriginalItemToFix] = useState<Record | null>(
    null
  );

  const onFix = (values: IFormData) => {
    const fixedItem = {
      ...originalItemToFix,
      [headerToFixed.barcode]: values.barcode,
      [headerToFixed.brand]: values.brand,
      [headerToFixed.colour || '']: values.colour || '',
      [headerToFixed.description]: values.description,
      [headerToFixed.goodsTypeId]: values.stockItem,
      [headerToFixed.itemSize || '']: values.itemSize || '',
      [headerToFixed.sku]: values.itemNumber,
      [headerToFixed.variant || '']: values.variant || '',
    };

    setData((previousData) => [...previousData, fixedItem]);
    setBadData((previousBadData) =>
      previousBadData.filter((row) => row !== originalItemToFix)
    );

    setItemToFix(null);
    setOriginalItemToFix(null);
  };

  const [createImport] = useImportStockItemCsvMutation({
    onCompleted: () => {
      form.resetFields();
      setCurrent(0);
      setHeader([]);
      setData([]);
      setBadData([]);
      setHeaderToFixed({
        barcode: '',
        brand: '',
        colour: '',
        description: '',
        division: '',
        goodsTypeId: '',
        itemSize: '',
        name: '',
        schemeId: '',
        sku: '',
        variant: '',
      });

      setLoading(false);
      setUploading(false);
      void notification.success({
        description: intl.formatMessage({
          defaultMessage: 'Data import started successfully',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successful!',
        }),
        placement: 'bottomRight',
      });
    },
  });

  const { data: goodsTypeData } = useListGoodsTypesQuery({
    variables: {
      where: {
        schemes: {
          id: {
            equals: schemeId,
          },
        },
      },
    },
  });

  const onFileLoaded = (d: string[][]) => {
    const initCsvData = d.map((value) =>
      Object.fromEntries(
        value.map((current_, index) => [
          index,
          current_.replaceAll(/["']+/g, ''),
        ])
      )
    );

    const headerD = Object.values(initCsvData[0]);

    setHeader(headerD);
    setData(
      d
        .map((value) =>
          Object.fromEntries(
            value.map((current_, index) => [
              headerD[index],
              current_.replaceAll(/["']+/g, ''),
            ])
          )
        )
        .filter((__, index) => index !== 0)
    );
  };
  const columns = header.map((key) => ({
    dataIndex: key,
    key,
    title: key,
    width: 250,
  }));

  const barcodeForm = Form.useWatch('barcode', form);
  const variantForm = Form.useWatch('variant', form);
  const descriptionForm = Form.useWatch('description', form);
  const brandForm = Form.useWatch('brand', form);
  const itemNumberForm = Form.useWatch('itemNumber', form);
  const stockItemForm = Form.useWatch('stockItem', form);

  const convertJSONToCSV = () => {
    // Check if JSON data is empty
    if (data.length === 0) {
      return '';
    }
    const goodsDataMap = new Map<string, string>();
    if (goodsTypeData?.listGoodsTypes?.goodsTypes) {
      for (const value of goodsTypeData.listGoodsTypes.goodsTypes) {
        goodsDataMap.set(value.name, value.id);
      }
    }

    // Create header string with proper escaping
    const headers = `${fileHeaders.map(escapeCSVField).join(',')}\n`;

    const rows = data
      .map((row) =>
        fileHeaders
          .map((field) => {
            const dataHeader = headerToFixed[field];
            let cellValue = '';
            if (!dataHeader) {
              return '';
            }
            if (customFields.has(field)) {
              switch (field) {
                case 'name': {
                  cellValue = renderDescription(
                    row,
                    headerToFixed.description,
                    headerToFixed.itemSize,
                    headerToFixed.colour
                  );
                  break;
                }
                case 'goodsTypeId': {
                  const goodsName = row[headerToFixed.goodsTypeId];
                  const goodsId = goodsDataMap.get(goodsName);
                  cellValue = goodsId || '';
                  break;
                }
                case 'schemeId': {
                  cellValue = schemeId; // always the same value for all rows
                  break;
                }
                case 'division': {
                  cellValue = 'no-division';
                  break;
                }
                // No default, but you may add one if needed.
                default: {
                  cellValue = row[dataHeader] || '';
                }
              }
            } else {
              cellValue = row[dataHeader] || '';
            }
            return escapeCSVField(cellValue);
          })
          .join(',')
      )
      .join('\n');

    // Combine headers and rows
    return headers + rows;
  };
  const uploadDataAsCsv = async () => {
    const newCsvData = new Blob([convertJSONToCSV()], {
      type: 'text/csv',
    });

    return customRequest(newCsvData);
  };

  const onSubmitCsv = async () => {
    const url = await uploadDataAsCsv();
    if (!url) {
      return;
    }

    void createImport({
      variables: {
        where: url,
      },
    });
  };

  const onSubmit = () => {
    setUploading(true);
    void onSubmitCsv().finally(() => setUploading(false));
  };
  const renderDescription = (
    record: Record,
    descriptionField: string,
    sizeField?: string,
    colourField?: string
  ) => {
    const description = record[descriptionField || ''];
    const size = record[sizeField || ''];
    const colour = record[colourField || ''];

    let formattedDescription = description;

    if (size && colour) {
      formattedDescription += ` (${colour} / ${size})`;
    } else if (size) {
      formattedDescription += ` (${size})`;
    } else if (colour) {
      formattedDescription += ` (${colour})`;
    }

    return formattedDescription;
  };

  const formattedDataColumns: ColumnType[] = [
    {
      dataIndex: barcodeForm || headerToFixed.barcode,
      key: barcodeForm || headerToFixed.barcode,
      title: 'Barcode',
    },
    {
      dataIndex: variantForm || headerToFixed.variant || '',
      key: variantForm || headerToFixed.variant || '',
      title: 'Variant',
    },
    {
      dataIndex: descriptionForm || headerToFixed.description,
      key: descriptionForm || headerToFixed.description,
      title: 'Name',
    },
    {
      dataIndex: brandForm || headerToFixed.brand,
      key: brandForm || headerToFixed.brand,
      title: 'Brand',
    },
    {
      dataIndex: itemNumberForm || headerToFixed.sku,
      key: itemNumberForm || headerToFixed.sku,
      title: 'Item Number',
    },
    {
      dataIndex: stockItemForm || headerToFixed.goodsTypeId,
      key: stockItemForm || headerToFixed.goodsTypeId,
      render: (value: string) => {
        const goods = goodsTypeData?.listGoodsTypes?.goodsTypes.find(
          (goodsType) => goodsType.id === value
        );
        return goods?.name || value;
      },
      title: 'Stock Item',
    },
  ];

  const checkGoodExists = (item?: string) => {
    if (!item) return true;
    return !!goodsTypeData?.listGoodsTypes?.goodsTypes.find(
      (goodsType) => goodsType.name === item
    );
  };

  const onNext = () => {
    if (current === 1) {
      form
        .validateFields()
        .then((formValue) => {
          setHeaderToFixed({
            barcode: formValue.barcode,
            brand: formValue.brand,
            colour: formValue.colour,
            description: formValue.description,
            division: 'no-division',
            goodsTypeId: formValue.stockItem,
            itemSize: formValue.itemSize,
            name: formValue.description,
            schemeId,
            sku: formValue.itemNumber,
            variant: formValue.variant,
          });

          const ignoreFields = () => {
            const ignored: string[] = [];
            if (formValue.barcode === 'no-barcode') ignored.push('barcode');
            if (formValue.variant === 'no-variant') ignored.push('variant');
            return ignored;
          };

          // Precompute ignored fields
          const ignoredFields = ignoreFields();

          // remove bad data from data and move it to badData state
          const badDataFilter = data.filter(
            (row) =>
              (!ignoredFields.includes('barcode') && !row[formValue.barcode]) ||
              (!ignoredFields.includes('variant') &&
                formValue.variant &&
                !row[formValue.variant]) ||
              !row[formValue.description] ||
              !checkGoodExists(row[formValue.stockItem])
          );

          setBadData(badDataFilter);
          setData(data.filter((row) => !badDataFilter.includes(row)));

          setCurrent(current + 1);
        })
        .catch(() => {
          console.log('invalid');
        });
    } else {
      setCurrent(current + 1);
    }
  };

  const onPrevious = () => {
    if (current === 2) setData((previousData) => [...previousData, ...badData]);
    setCurrent(current - 1);
  };

  return {
    badData,
    columns,
    current,
    data,
    form,
    formattedDataColumns,
    goodsTypeData,
    header,
    headerToFixed,
    itemToFix,
    loading,
    onFileLoaded,
    onFix,
    onNext,
    onPrev: onPrevious,
    onSubmit,
    setBadData,
    setItemToFix,
    setLoading,
    setOriginalItemToFix,
    setUploading,
    uploading,
  };
};

export default useImportStock;
