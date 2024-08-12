/* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment */
import type { FormInstance } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload/interface';
import type {
  SearchOffendersQuery,
  SearchOffendersQueryVariables,
} from 'graphql/offenders/queries/__generated__/search-offenders.generated';
import type { Age, Build, Gender, Height, IdSource, Race } from 'graphql/types';
import type { Image, OffenderData } from 'types/DataType';

import { useApolloClient } from '@apollo/client';
import { Form, message } from 'antd';
import { SearchOffendersDocument } from 'graphql/offenders/queries/__generated__/search-offenders.generated';
import { QueryMode, SortOrder } from 'graphql/types';
import update from 'immutability-helper';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useStoreState } from 'state';
import { compressImage } from 'utils/compress-images';

import OffenderItem from './OffenderItem';

export interface FormData {
  age: Age;
  alias?: string[];
  build: Build;
  comment: string;
  dateOfBirth: Date;
  dateSource: string;
  gender: Gender;
  groups: string[];
  hair: string;
  height: Height;
  idSource?: IdSource;
  idVerified?: boolean;
  name: string;
  peculiarities: string;
  race: Race;
}

interface Props {
  onClose: () => void;
  update: (value: OffenderData) => void;
}
interface Return {
  ageCheck: boolean;
  beforeUpload: (value: RcFile) => void;
  editImage: Image | null;
  fileList: Image[];
  form: FormInstance<FormData>;
  idVerified: boolean;
  imgChange: UploadProps['onChange'];
  onEditImage: (value: Image) => void;
  onRemoveImage: (imageId: string) => void;
  onSearchOffender: (
    value: string
  ) => Promise<{ label: React.ReactNode; value: string }[]>;
  onSubmit: (value: FormData) => void;
  onValuesChange: (changedValues: FormData, values: FormData) => void;
  primaryImage: string;
  saving: boolean;
  setAgeCheck: (value: boolean) => void;
  setPrimaryImage: (value: string) => void;
  toggleEditImage: (value?: Image) => void;
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
          order: {
            updatedAt: SortOrder.Desc,
          },
          scheme: {
            id: schemeId,
          },
          where: {
            name: {
              contains: value,
              mode: QueryMode.Insensitive,
            },
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
                disabled: true,
                label: intl.formatMessage({
                  defaultMessage: 'No results found',
                }),
                value: '',
              },
            ]
      );
  };

  const onSubmit = (data: FormData) => {
    setSaving(true);
    updateOffender({
      age: ageCheck ? null : data.age || null,
      alias:
        data.alias && data.alias.length > 0
          ? [...new Set(data.alias?.map((el) => el.trim().toLowerCase()))]
          : [],
      build: data.build || null,
      dateOfBirth: ageCheck ? data.dateOfBirth || null : null,
      dateSource: ageCheck ? data.dateSource || null : null,
      gender: data.gender || null,
      hair: data.hair || null,
      id: Math.floor(Math.random() * 1000).toString(),
      idSource: data.idSource,
      idVerified: data.idVerified,
      images: imageChange
        ? fileList.map((el) => ({
            fileName: el.fileName,
            id: el.uid,
            new: true,
            optimised: el.url,
            policeImage: el.policeImage,
            position: el.position,
            primary: el.uid === primaryImage,
            type: el.type,
            url: el.url,
          }))
        : undefined,
      name: data.name || 'Unidentified Offender',
      peculiarities: data.peculiarities || null,
      race: data.race || null,
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
    return compressImage(file);
  };
  const imgChange: UploadProps['onChange'] = (info) => {
    if (info.file.response && info.file.status === 'done') {
      setFileList([
        ...fileList.filter((item) => item.uid !== info.file.uid),
        {
          ...info.file,
          fileName: info.file.response[0].blobName,
          type: info.file.response[0].mimetype,
          url: info.file.response[0].url,
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
    ageCheck,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    beforeUpload,
    editImage,
    fileList,
    form,
    idVerified,
    imgChange,
    onEditImage,
    onRemoveImage,
    onSearchOffender,
    onSubmit,
    onValuesChange,
    primaryImage,
    saving,
    setAgeCheck,
    setPrimaryImage,
    toggleEditImage,
  };
};

export default useAddNewOffender;
