import CSVReader from '#/components/CSVReader/CSVReader';
import moment from 'moment/moment';
import React from 'react';

import type { MySafetyCSVData } from './MySafetyCSV.types';

interface Props {
  onChange?: (value: MySafetyCSVData[]) => void;
}

const MySafetyCSV = ({ onChange }: Props) => {
  const onFileLoad = (data: string[][]) => {
    if (onChange)
      onChange(
        data
          .filter((_, i) => i > 41)
          .map((item) => ({
            actualValue: Number(item[6]),
            createdByEmail: item[15],
            createdByName: item[8],
            createdByTelephone: item[14],
            crimeReferenceNumber: item[50],
            crimeType: item[4] ? item[4].split(',') : [],
            dateCreated: new Date(item[1]),
            // TODO change to dayjs or base
            dateOccurred: moment
              .utc(`${item[3]} ${item[2]}`, 'HH:mm DD-MMM-YY')
              .toDate(),
            description: item[9],
            emergencyServiceNumber: item[49],
            emergencyServicesAttend: item[48] === 'Yes',
            emergencyServicesRef: item[47],
            estimatedValue: Number(item[7]),
            incidentID: item[5],
            injuryAction: item[21],
            officerName: item[51],
            officerSerial: item[52],
            officerTelephone: item[53],
            site: item[0],
            specificArea: item[10],
            suspectApproxAge: item[36],
            suspectsAddressLine1: item[26],
            suspectsAddressLine2: item[27],
            suspectsAnyScars: item[41],
            suspectsBuild: item[32],
            suspectsClothing: item[46],
            suspectsCounty: item[29],
            suspectsEthnicGroup: item[31],
            suspectsEyeColour: item[35],
            suspectsFacialHair: item[34],
            suspectsFullName: item[23],
            suspectsGender: item[24],
            suspectsGlasses: item[37],
            suspectsHairColour: item[33],
            suspectsHeightImperial: item[44],
            suspectsHeightMetric: item[45],
            suspectsPiercings: item[38],
            suspectsPostcode: item[30],
            suspectsTattooDescription: item[40],
            suspectsTattoos: item[39],
            suspectsTelephone: item[25],
            suspectsTitle: item[22],
            suspectsTown: item[28],
            suspectsWeightImperial: item[42],
            suspectsWeightMetric: item[43],
            timeOccurred: moment(item[3], 'HH:mm').toDate(),
            vehicleColour: item[20],
            vehicleColourOther: item[18],
            vehicleMake: item[19],
            vehicleRegistration: item[16],
            vehicleType: item[17],
            weaponsUsed: item[11],
            weaponsUsedOther: item[12],
            wereWeaponsUsed: item[13] === 'Yes',
          }))
      );
  };

  return <CSVReader onFileLoaded={onFileLoad} />;
};

export default MySafetyCSV;
