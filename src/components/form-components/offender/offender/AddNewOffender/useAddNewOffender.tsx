/* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment */
import React, { useState } from 'react';
import type {
  Age,
  Build,
  Gender,
  Height,
  IdSource,
  Race,
  SearchOffendersQuery,
  SearchOffendersQueryVariables,
} from 'graphql/generated';
import {
  QueryMode,
  SearchOffendersDocument,
  SortOrder,
} from 'graphql/generated';
import type { RcFile, UploadProps } from 'antd/es/upload/interface';
import type { FormInstance } from 'antd';
import { Form, message, Upload } from 'antd';
import { useApolloClient } from '@apollo/client';
import { useStoreState } from 'state';
import update from 'immutability-helper';
import type { Image, OffenderData } from 'types/DataType';
import { useIntl } from 'react-intl';
import OffenderItem from './OffenderItem';

export interface FormData {
  name: string;
  alias?: string[];
  age: Age;
  gender: Gender;
  race: Race;
  build: Build;
  height: Height;
  hair: string;
  peculiarities: string;
  comment: string;
  dateSource: string;
  dateOfBirth: Date;
  groups: string[];
  idVerified?: boolean;
  idSource?: IdSource;
}

interface Props {
  onClose: () => void;
  update: (value: OffenderData) => void;
}
interface Return {
  onSubmit: (value: FormData) => void;
  saving: boolean;
  ageCheck: boolean;
  setAgeCheck: (value: boolean) => void;
  imgChange: UploadProps['onChange'];
  beforeUpload: (value: RcFile) => void;
  fileList: Image[];
  primaryImage: string;
  setPrimaryImage: (value: string) => void;
  editImage: Image | null;
  onEditImage: (value: Image) => void;
  onRemoveImage: (imageId: string) => void;
  toggleEditImage: (value?: Image) => void;
  onSearchOffender: (
    value: string
  ) => Promise<{ label: React.ReactNode; value: string }[]>;
  idVerified: boolean;
  onValuesChange: (changedValues: FormData, values: FormData) => void;
  form: FormInstance<FormData>;
}

const useAddNewOffender = ({
  onClose,
  update: updateOffender,
}: Props): Return => {
  const intl = useIntl();
  const client = useApolloClient();
  const [form] = Form.useForm<FormData>();
  const schemeId = useStoreState((state) => state.scheme.id);
  const [saving, setSaving] = useState(false);
  const [ageCheck, setAgeCheck] = useState(false);
  const [fileList, setFileList] = useState<Image[]>([]);
  const [imageChange, setImageChange] = useState(false);
  const [editImage, setEditImage] = useState<Image | null>(null);
  const [primaryImage, setPrimaryImage] = useState<string>('');
  const [idVerified, setIDVerified] = useState(false);

  const onSearchOffender = async (value: string) => {
    if (value.length < 2) {
      return [];
    }
    return client
      .query<SearchOffendersQuery, SearchOffendersQueryVariables>({
        query: SearchOffendersDocument,
        variables: {
          where: {
            name: {
              contains: value,
              mode: QueryMode.Insensitive,
            },
          },
          scheme: {
            id: schemeId,
          },
          order: {
            updatedAt: SortOrder.Desc,
          },
        },
      })
      .then((response) =>
        response.data.listOffenders?.offenders.length
          ? response.data.listOffenders.offenders.map((item) => ({
              label: <OffenderItem item={item} />,
              value: item?.id || '',
            }))
          : [
              {
                label: intl.formatMessage({
                  defaultMessage: 'No results found',
                  id: 'hX5PAb',
                }),
                value: '',
                disabled: true,
              },
            ]
      );
  };

  const onSubmit = (data: FormData) => {
    setSaving(true);
    updateOffender({
      id: Math.floor(Math.random() * 1000).toString(),
      name: data.name || 'Unidentified Offender',
      alias:
        data.alias && data.alias.length > 0
          ? [...new Set(data.alias?.map((el) => el.trim().toLowerCase()))]
          : [],
      gender: data.gender || null,
      race: data.race || null,
      build: data.build || null,
      hair: data.hair || null,
      peculiarities: data.peculiarities || null,
      age: ageCheck ? null : data.age || null,
      dateSource: ageCheck ? data.dateSource || null : null,
      dateOfBirth: ageCheck ? data.dateOfBirth || null : null,
      idVerified: data.idVerified,
      idSource: data.idSource,
      images: imageChange
        ? fileList.map((el) => ({
            id: el.uid,
            optimised: el.url,
            url: el.url,
            fileName: el.fileName,
            type: el.type,
            new: true,
            position: el.position,
            primary: el.uid === primaryImage,
            policeImage: el.policeImage,
          }))
        : undefined,
    });

    onClose();
    setSaving(false);
  };

  // image
  const beforeUpload = (file: RcFile) => {
    const isFileDuplicate = fileList.find((item) => item.name === file.name);
    if (isFileDuplicate) {
      void message.error(
        'This image already exists, please choose another one.'
      );
    }
    return !isFileDuplicate || Upload.LIST_IGNORE;
  };
  const imgChange: UploadProps['onChange'] = (info) => {
    if (info.file.response && info.file.status === 'done') {
      setFileList([
        ...fileList.filter((item) => item.uid !== info.file.uid),
        {
          ...info.file,
          url: info.file.response[0].url,
          fileName: info.file.response[0].blobName,
          type: info.file.response[0].mimetype,
        },
      ]);
      setImageChange(true);
    } else {
      setFileList(info.fileList);
      setImageChange(true);
    }
  };
  const onEditImage = (value: Image) => {
    setEditImage(null);
    const index = fileList.map((item) => item.uid).indexOf(value.uid);
    setFileList(
      update(fileList, {
        [index]: {
          $set: value,
        },
      })
    );
  };

  const onRemoveImage = (imageId: string) => {
    setFileList(fileList.filter((item) => item.uid !== imageId));
  };

  const toggleEditImage = (image?: Image) => {
    setEditImage(image || null);
  };
  const onValuesChange = (changedValues: FormData) => {
    if (changedValues.idVerified !== undefined) {
      setIDVerified(changedValues.idVerified);
    }
  };

  return {
    onSubmit,
    saving,
    ageCheck,
    setAgeCheck,
    imgChange,
    beforeUpload,
    fileList,
    onRemoveImage,
    onEditImage,
    toggleEditImage,
    editImage,
    primaryImage,
    setPrimaryImage,
    onSearchOffender,
    onValuesChange,
    idVerified,
    form,
  };
};

export default useAddNewOffender;
