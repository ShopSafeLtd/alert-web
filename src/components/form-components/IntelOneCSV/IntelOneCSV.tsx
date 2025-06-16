import CSVReader from '#/components/CSVReader/CSVReader';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import React, { useRef } from 'react';

import type { IntelOneCSVData } from './IntelOneCSV.types';

dayjs.extend(customParseFormat);

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
      data[0][8] === 'Incident Details (MO)' &&
      data[0][9] === 'Vehicle Reg' &&
      data[0][10] === 'Make' &&
      data[0][11] === 'Model' &&
      data[0][12] === 'Colour' &&
      data[0][13] === 'Group Name';

    if (!validCSV && inputRef?.current) {
      // @ts-expect-error set string to null
      inputRef.current.value = null;
    }

    if (onChange && validCSV)
      onChange(
        data
          .filter((_, i) => i > 0)
          .map((item) => ({
            colour: item[12],
            crimeRef: item[7],
            description: item[8],
            group: item[13],
            make: item[10],
            model: item[11],
            offenderName: item[5] && item[5] !== '' ? item[5]?.split(',') : [],
            reference: item[2],
            registration: item[9],
            reportDate: dayjs(item[1], 'DD/MM/YYYY HH:mm').toDate(),
            siteName: item[0],
            type: item[4],
            value: Number(item[6]),
          }))
      );
  };

  return <CSVReader onFileLoaded={onFileLoad} ref={inputRef} />;
};

export default IntelOneCSV;
