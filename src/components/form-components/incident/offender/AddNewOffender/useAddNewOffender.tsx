import React, { useState } from 'react';
import type {
  Age,
  Gender,
  Race,
  Build,
  SearchOffendersQuery,
  SearchOffendersQueryVariables,
} from 'graphql/generated';
import {
  SearchOffendersDocument,
  QueryMode,
  SortOrder,
} from 'graphql/generated';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { message, Upload } from 'antd';
import { useApolloClient } from '@apollo/client';
import { useStoreState } from 'state';
import OffenderItem from './OffenderItem';

interface FormData {
  name: string;
  age: Age;
  gender: Gender;
  race: Race;
  build: Build;
  hair: string;
  peculiarities: string;
  dateSource: string;
  dateOfBirth: Date;
}
interface OffenderData {
  id: string;
  name?: string | null;
  age?: Age | null;
  gender?: Gender | null;
  race?: Race | null;
  build?: Build | null;
  dateOfBirth?: Date | null;
  hair?: string | null;
  dateSource?: string | null;
  peculiarities?: string | null;
  approved?: boolean | null;
  groups?:
    | {
        id: string;
        name: string;
      }[]
    | undefined;
  images?: {
    id: string;
    optimised?: string | null;
    url?: string | null;
    fileName?: string | null;
    type?: string | null;
    new?: boolean;
  }[];
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
  fileList: UploadFile[];
  onSearchOffender: (
    value: string
  ) => Promise<{ label: React.ReactNode; value: string }[]>;
}

const useAddNewOffender = ({ onClose, update }: Props): Return => {
  const client = useApolloClient();
  const [saving, setSaving] = useState(false);
  const [ageCheck, setAgeCheck] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [imageChange, setImageChange] = useState(false);
  const schemeId = useStoreState((state) => state.scheme.id);

  const beforeUpload = (file: RcFile) => {
    const isFileDuplicate = fileList.find((item) => item.name === file.name);
    if (isFileDuplicate) {
      message.error(
        'This image has already existed, please choose another one.'
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
                label: 'No results found',
                value: '',
                disabled: true,
              },
            ]
      );
  };

  const onSubmit = (data: FormData) => {
    setSaving(true);
    update({
      id: Math.floor(Math.random() * 1000).toString(),
      name: data.name || 'Unidentified Offender',
      gender: data.gender || null,
      race: data.race || null,
      build: data.build || null,
      hair: data.hair || null,
      peculiarities: data.peculiarities || null,
      age: ageCheck ? null : data.age || null,
      dateSource: ageCheck ? data.dateSource || null : null,
      dateOfBirth: ageCheck ? data.dateOfBirth || null : null,
      images: imageChange
        ? fileList.map((el) => ({
            id: el.uid,
            optimised: el.url,
            url: el.url,
            fileName: el.fileName,
            type: el.type,
            new: true,
          }))
        : undefined,
    });

    onClose();
    setSaving(false);
  };

  return {
    onSubmit,
    saving,
    ageCheck,
    setAgeCheck,
    imgChange,
    beforeUpload,
    fileList,
    onSearchOffender,
  };
};

export default useAddNewOffender;
