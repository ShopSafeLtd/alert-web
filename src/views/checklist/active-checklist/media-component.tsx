import type { UploadFile, UploadProps } from 'antd';

import { getCustomUrls } from '#/providers/GetCustomUrls';
import { faFileUpload } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

export type MediaUrlUploaderProps = {
  onChange?: (url: null | string) => void;
  value?: null | string;
};

const MediaUrlUploader = ({ onChange, value }: MediaUrlUploaderProps) => {
  const { checklistUpload } = getCustomUrls();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const intl = useIntl();
  useEffect(() => {
    if (value) {
      setFileList([
        {
          name: value.split('/').pop() || 'file',
          status: 'done',
          uid: '-1',
          url: value,
        },
      ]);
    } else {
      setFileList([]);
    }
  }, [value]);

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
    }
    setFileList(info.fileList);

    if (info.file.status === 'done') {
      setLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const url: null | string =
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        info.file.response?.[0]?.url ||
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        info.fileList.at(-1)?.response?.[0]?.url;
      if (url && onChange) {
        onChange(url);
      }
    }

    if (info.file.status === 'error') {
      setLoading(false);
    }
  };

  return (
    <div style={{ height: 400, width: 400 }}>
      {fileList.length > 0 && fileList[0].status === 'done' ? (
        <div
          style={{
            alignItems: 'center',
            border: '1px solid #ccc',
            borderRadius: '4px',
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '12px',
            padding: '10px',
          }}
        >
          <div style={{ alignItems: 'center', display: 'flex' }}>
            <FontAwesomeIcon icon={faFileUpload} style={{ marginRight: 8 }} />
            <a href={fileList[0].url} rel="noopener noreferrer" target="_blank">
              {(fileList[0].url || '').split('?se=')[0].split('/').pop()}
            </a>
          </div>
          <Button
            onClick={() => {
              setFileList([]);
              if (onChange) {
                onChange(null);
              }
            }}
            size="small"
          >
            {intl.formatMessage({
              defaultMessage: 'x',
            })}
          </Button>
        </div>
      ) : (
        <Upload
          action={checklistUpload}
          data={(file) => ({
            filename: file.name,
          })}
          fileList={fileList}
          maxCount={1}
          onChange={handleChange}
        >
          <Button loading={loading} type="primary">
            <FontAwesomeIcon icon={faFileUpload} style={{ marginRight: 8 }} />
            {loading
              ? intl.formatMessage({
                  defaultMessage: 'Uploading...',
                })
              : intl.formatMessage({
                  defaultMessage: 'Upload',
                })}
          </Button>
        </Upload>
      )}
    </div>
  );
};

export default MediaUrlUploader;
