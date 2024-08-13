/* eslint-disable */
// @ts-nocheck
import React from 'react';

import Papa from 'papaparse';

export interface IFileInfo {
  name: string;
  size: number;
  type: string;
}

export interface CSVReaderProps {
  accept?: string;
  cssClass?: string;
  cssInputClass?: string;
  cssLabelClass?: string;

  fileEncoding?: string;
  inputId?: string;
  inputName?: string;
  inputStyle?: object;
  label?: string | React.ReactNode;
  onError?: (error: Error) => void;
  onFileLoaded: (
    data: Array<any>,
    fileInfo: IFileInfo,
    originalFile?: File
  ) => any;
  parserOptions?: Papa.ParseConfig;
  disabled?: boolean;
  strict?: boolean;
  setLoading?: (loading: boolean) => void;
}

const CSVReader = React.forwardRef<HTMLInputElement, CSVReaderProps>(
  (
    {
      accept = '.csv, text/csv, text/plain',
      cssClass = 'csv-reader-input',
      cssInputClass = 'csv-input',
      cssLabelClass = 'csv-label',
      fileEncoding = 'utf8',
      inputId = 'react-csv-reader-input',
      inputName = 'react-csv-reader-input',
      inputStyle = {},
      label,
      onError = () => {},
      onFileLoaded,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      parserOptions = {} as Papa.ParseConfig,
      disabled = false,
      strict = false,
      setLoading,
    },
    inputRef
  ) => {
    const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
      const reader: FileReader = new FileReader();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const files: FileList = e.target.files!;

      if (files.length > 0) {
        if (setLoading) setLoading(true);
        const fileInfo: IFileInfo = {
          name: files[0].name,
          size: files[0].size,
          type: files[0].type,
        };

        if (strict && accept.indexOf(fileInfo.type) <= 0) {
          if (setLoading) setLoading(false);
          onError(
            new Error(
              `[strict mode] Accept type not respected: got '${fileInfo.type}' but not in '${accept}'`
            )
          );
          return;
        }

        reader.onload = (_event: Event) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
          const csvData = Papa.parse(
            reader.result as string,
            Object.assign(parserOptions, {
              error: onError,
              encoding: fileEncoding,
            })
          );
          if (setLoading) setLoading(false);
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
          onFileLoaded(csvData?.data ?? [], fileInfo, files[0]);
        };

        reader.readAsText(files[0], fileEncoding);
      }
    };

    return (
      <div className={cssClass}>
        {label && (
          <label className={cssLabelClass} htmlFor={inputId}>
            {label}
          </label>
        )}
        <input
          className={cssInputClass}
          type="file"
          id={inputId}
          name={inputName}
          style={inputStyle}
          accept={accept}
          onChange={handleChangeFile}
          disabled={disabled}
          ref={inputRef}
        />
      </div>
    );
  }
);

export default CSVReader;
