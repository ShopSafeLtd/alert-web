import React, { useRef } from 'react';
import CSVReader from '#/components/CSVReader/CSVReader';
import moment from 'moment/moment';
import type { IntelOneCSVData } from './IntelOneCSV.types';

interface Props {
  onChange?: (value: IntelOneCSVData[]) => void;
}

const IntelOneCSV = ({ onChange }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const onFileLoad = (data: string[][]) => {
    const validCSV =
      data[0][0] === 'Site Name' &&
      data[0][1] === 'Incident Report Date' &&
      data[0][2] === 'Reference' &&
      data[0][3] === 'Outcome' &&
      data[0][4] === 'Type' &&
      data[0][5] === 'Offender Name' &&
      data[0][6] === 'Total Product Stock Value' &&
      data[0][7] === 'Crime Reference' &&
      data[0][8] === 'Incident Details (MO)';

    if (!validCSV && inputRef?.current) {
      // @ts-expect-error set string to null
      inputRef.current.value = null;
    }

    if (onChange && validCSV)
      onChange(
        data
          .filter((_, i) => i > 0)
          .map((item) => ({
            siteName: item[0],
            reportDate: moment(item[1], 'DD/MM/YYYY HH:mm').toDate(),
            reference: item[2],
            type: item[4],
            offenderName: item[5] && item[5] !== '' ? item[5]?.split(',') : [],
            value: Number(item[6]),
            crimeRef: item[7],
            description: item[8],
          }))
      );
  };

  return <CSVReader ref={inputRef} onFileLoaded={onFileLoad} />;
};

export default IntelOneCSV;
