import type { Dispatch } from 'react';
import { useEffect, useReducer, useState } from 'react';
import type { IFileInfo } from 'react-csv-reader';
import { useNavigate } from 'react-router';
import { notification } from 'antd';
import { useIntl } from 'react-intl';

import { useStoreState } from '../../../../../state';
import { useGoodsTypesQuery } from '#/views/settings/data-import/csv/data-import/graphql/queries/goods-types.generated';
import { CsvType } from 'graphql/types';
import { useCreateCsvImportMutation } from '#/views/settings/data-import/csv/data-import/graphql/mutation/create-csv.generated';

export type CSVData = string[][];
export type DataType =
  | 'stockItems'
  | 'users'
  // | 'offenders'
  // | 'vehicles'
  | 'groups'
  | 'businesses';

export interface TableData {
  [key: number]: string;
}

export interface AdditionalInfo {
  password: string | null;
  goodsType: string | null;
  role: string | null;
  organisation: string | null;
}

export type ActionType =
  | 'SET_TABLE_DATA'
  | 'SET_UPLOAD_URL'
  | 'SET_DATA_TYPE'
  | 'SET_SAVING'
  | 'SET_ADDITIONAL_INFO'
  | 'RESET'
  | 'SET_GOODS';

export interface SelectValue {
  label: string;
  value: string;
}

export type Action = {
  type: ActionType;
  payload:
    | number
    | string
    | boolean
    | string[]
    | null
    // | DataType
    | AdditionalInfo
    | TableData[]
    | SelectValue[];
};

export interface State {
  tableData: TableData[];
  uploadedUrl: string | null;
  dataTypes: DataType | null;
  saving: boolean;
  goods: SelectValue[];
  additionalInfo: AdditionalInfo;
}

interface Return {
  onItemsLoaded: (
    data: CSVData,
    _: IFileInfo,
    originalFile: File | undefined
  ) => void;
  dispatch: Dispatch<Action>;
  state: State;
  saving: boolean;
  onSubmit: () => void;
}

const dataTypeToCsvType = (type: DataType) => {
  switch (type) {
    case 'stockItems': {
      return CsvType.Stock;
    }
    case 'users': {
      return CsvType.User;
    }
    case 'groups': {
      return CsvType.Group;
    }
    case 'businesses': {
      return CsvType.Business;
    }
    default: {
      return CsvType.Stock;
    }
  }
};

const useImport = (): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const userId = useStoreState((state) => state.user.id);
  const { data: goods } = useGoodsTypesQuery();
  const intl = useIntl();
  const initState: State = {
    tableData: [],
    uploadedUrl: null,
    dataTypes: null,
    saving: false,
    goods: [],
    additionalInfo: {
      password: null,
      goodsType: null,
      role: null,
      organisation: null,
    },
  };

  function reducer(state: State, action: Action): State {
    switch (action.type) {
      case 'SET_TABLE_DATA': {
        return { ...state, tableData: action.payload as TableData[] };
      }
      case 'SET_UPLOAD_URL': {
        return { ...state, uploadedUrl: action.payload as string | null };
      }
      case 'SET_DATA_TYPE': {
        return { ...state, dataTypes: action.payload as DataType | null };
      }
      case 'SET_ADDITIONAL_INFO': {
        return { ...state, additionalInfo: action.payload as AdditionalInfo };
      }
      case 'SET_SAVING': {
        return { ...state, saving: action.payload as boolean };
      }
      case 'SET_GOODS': {
        return { ...state, goods: action.payload as SelectValue[] };
      }
      case 'RESET': {
        return initState;
      }
      default: {
        return state;
      }
    }
  }

  const [saving, setSaving] = useState(false);
  const [state, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    if (goods) {
      dispatch({
        type: 'SET_GOODS',
        payload: goods.goodsTypes.map((value) => ({
          label: value.name,
          value: value.id,
        })),
      });
    }
  }, [goods]);

  const onItemsLoaded = async (
    data: CSVData,
    _: IFileInfo,
    originalFile: File | undefined
  ) => {
    dispatch({
      type: 'SET_UPLOAD_URL',
      payload: null,
    });
    if (originalFile) {
      const formData = new FormData();
      formData.append('file', originalFile);
      const res = await fetch(import.meta.env.VITE_CSV_UPLOAD_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: {},
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const resData: { url: string }[] = await res.json();
      dispatch({
        type: 'SET_UPLOAD_URL',
        payload: resData[0].url,
      });
    }

    dispatch({
      type: 'SET_TABLE_DATA',
      payload: data
        .map((value) => Object.fromEntries(value.map((cur, i) => [i, cur])))
        .filter((__, i) => i !== 0),
    });
  };

  const navigate = useNavigate();

  const [createCsvImport] = useCreateCsvImportMutation({
    onCompleted: () => {
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Csv import started successfully',
        }),
        placement: 'bottomRight',
      });
      setSaving(false);
      dispatch({
        type: 'RESET',
        payload: null,
      });
      navigate('/app/scheme-settings/data-import/csv');
    },
    onError: () => {
      notification.error({
        message: intl.formatMessage({
          defaultMessage: 'An errer occurred while creating the import',
        }),
        placement: 'bottomRight',
      });
      setSaving(false);
    },
  });

  const onSubmit = () => {
    setSaving(true);
    void createCsvImport({
      variables: {
        data: {
          type: dataTypeToCsvType(state.dataTypes as DataType),
          file: state.uploadedUrl as string,
          scheme: {
            connect: {
              id: schemeId,
            },
          },
          user: {
            connect: {
              id: userId,
            },
          },
          additionalInfo: state.additionalInfo,
          total: state.tableData.length,
        },
      },
    });
  };

  return {
    state,
    dispatch,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onItemsLoaded,
    onSubmit,
    saving,
  };
};

export default useImport;
