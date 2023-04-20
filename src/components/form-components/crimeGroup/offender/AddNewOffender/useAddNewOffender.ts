import { useState } from 'react';
import type { Age, Gender, Race, Build } from 'graphql/generated';
import { useUpdateCrimeGroupMutation } from 'graphql/generated';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { message, notification, Upload } from 'antd';
import { useParams } from 'react-router';
import { useStoreState } from 'state';

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

interface Props {
  onClose: () => void;
}

interface Return {
  onSubmit: (value: FormData) => void;
  saving: boolean;
  ageCheck: boolean;
  setAgeCheck: (value: boolean) => void;
  imgChange: UploadProps['onChange'];
  beforeUpload: (value: RcFile) => void;
  fileList: UploadFile[];
}

const useAddNewOffender = ({ onClose }: Props): Return => {
  const params = useParams();
  const schemeId = useStoreState((state) => state.scheme.id);
  const userId = useStoreState((state) => state.user.id);
  const [saving, setSaving] = useState(false);
  const [ageCheck, setAgeCheck] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [imageChange, setImageChange] = useState(false);

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
  const [updateCrimeGroup] = useUpdateCrimeGroupMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
      notification.success({
        message: 'Successfully Updated!',
        description: 'The offender has been added to the crime group! ',
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      notification.error({
        message: 'Error!',
        description: 'Whoops, there are some errors. Please try again. ',
        placement: 'bottomRight',
      });
    },
  });
  const onSubmit = (data: FormData) => {
    setSaving(true);
    updateCrimeGroup({
      variables: {
        where: {
          id: params.id || '',
        },
        data: {
          offenders: {
            create: [
              {
                name: data.name,
                gender: data.gender || null,
                race: data.race || null,
                build: data.build || null,
                hair: data.hair || null,
                peculiarities: data.peculiarities || null,
                age: ageCheck ? null : data.age || null,
                dateSource: ageCheck ? data.dateSource || null : null,
                dateOfBirth: ageCheck ? data.dateOfBirth || null : null,
                createdBy: { connect: { id: userId } },
                scheme: { connect: { id: schemeId } },
                images: {
                  upload:
                    imageChange && fileList.length > 0
                      ? fileList.map((item) => ({
                          url: {
                            filename: item.fileName || '',
                            mimetype: item.type || '',
                            url: item.url || '',
                          },
                        }))
                      : undefined,
                },
              },
            ],
          },
        },
      },
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
  };
};

export default useAddNewOffender;
