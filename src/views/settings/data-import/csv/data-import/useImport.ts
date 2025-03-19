import type { Dispatch } from 'react';
import type { IFileInfo } from 'react-csv-reader';

import { userIdAtom } from '#/providers/UserProvider/UserProvider';
import { useCreateCsvImportMutation } from '#/views/settings/data-import/csv/data-import/graphql/mutation/__generated__/create-csv.generated';
import { useGoodsTypesQuery } from '#/views/settings/data-import/csv/data-import/graphql/queries/__generated__/goods-types.generated';
import { notification } from 'antd';
import { CsvType } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import { useEffect, useReducer, useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router';

import { useStoreState } from '../../../../../state';

export type CSVData = string[][];
export type DataType =
  | 'businesses'
  | 'groups'
  // | 'offenders'
  // | 'vehicles'
  | 'stockItems'
  | 'users';

export interface TableData {
  [key: number]: string;
}

export interface AdditionalInfo {
  goodsType: null | string;
  organisation: null | string;
  password: null | string;
  role: null | string;
}

export type ActionType =
  | 'RESET'
  | 'SET_ADDITIONAL_INFO'
  | 'SET_DATA_TYPE'
  | 'SET_GOODS'
  | 'SET_SAVING'
  | 'SET_TABLE_DATA'
  | 'SET_UPLOAD_URL';

export interface SelectValue {
  label: string;
  value: string;
}

export type Action = {
  payload:
    | AdditionalInfo
    | SelectValue[]
    | TableData[]
    | boolean
    | null
    // | DataType
    | number
    | string
    | string[];
  type: ActionType;
};

export interface State {
  additionalInfo: AdditionalInfo;
  dataTypes: DataType | null;
  goods: SelectValue[];
  saving: boolean;
  tableData: TableData[];
  uploadedUrl: null | string;
}

interface Return {
  dispatch: Dispatch<Action>;
  onItemsLoaded: (
    data: CSVData,
    _: IFileInfo,
    originalFile: File | undefined
  ) => void;
  onSubmit: () => void;
  saving: boolean;
  state: State;
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
  const userId = useAtomValue(userIdAtom);
  const { data: goods } = useGoodsTypesQuery();
  const intl = useIntl();
  const initState: State = {
    additionalInfo: {
      goodsType: null,
      organisation: null,
      password: null,
      role: null,
    },
    dataTypes: null,
    goods: [],
    saving: false,
    tableData: [],
    uploadedUrl: null,
  };

  function reducer(state: State, action: Action): State {
    switch (action.type) {
      case 'SET_TABLE_DATA': {
        return { ...state, tableData: action.payload as TableData[] };
      }
      case 'SET_UPLOAD_URL': {
        return { ...state, uploadedUrl: action.payload as null | string };
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
        payload: goods.goodsTypes.map((value) => ({
          label: value.name,
          value: value.id,
        })),
        type: 'SET_GOODS',
      });
    }
  }, [goods]);

  const onItemsLoaded = async (
    data: CSVData,
    _: IFileInfo,
    originalFile: File | undefined
  ) => {
    dispatch({
      payload: null,
      type: 'SET_UPLOAD_URL',
    });
    if (originalFile) {
      const formData = new FormData();
      formData.append('file', originalFile);
      const res = await fetch(import.meta.env.VITE_CSV_UPLOAD_ENDPOINT, {
        body: formData,
        headers: {},
        method: 'POST',
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const resData: { url: string }[] = await res.json();
      dispatch({
        payload: resData[0].url,
        type: 'SET_UPLOAD_URL',
      });
    }

    dispatch({
      payload: data
        .map((value) => Object.fromEntries(value.map((cur, i) => [i, cur])))
        .filter((__, i) => i !== 0),
      type: 'SET_TABLE_DATA',
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
        payload: null,
        type: 'RESET',
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
          additionalInfo: state.additionalInfo,
          file: state.uploadedUrl as string,
          scheme: {
            connect: {
              id: schemeId,
            },
          },
          total: state.tableData.length,
          type: dataTypeToCsvType(state.dataTypes as DataType),
          user: {
            connect: {
              id: userId,
            },
          },
        },
      },
    });
  };

  return {
    dispatch,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onItemsLoaded,
    onSubmit,
    saving,
    state,
  };
};

export default useImport;
