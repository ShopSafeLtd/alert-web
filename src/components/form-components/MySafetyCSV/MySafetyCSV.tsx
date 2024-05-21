import React from 'react';
import CSVReader from '#/components/CSVReader/CSVReader';
import moment from 'moment/moment';
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
            site: item[0],
            dateCreated: new Date(item[1]),
            dateOccurred: moment(
              `${item[3]} ${item[2]}`,
              'HH:mm DD-MMM-YY'
            ).toDate(),
            timeOccurred: moment(item[3], 'HH:mm').toDate(),
            crimeType: item[4] ? item[4].split(',') : [],
            incidentID: item[5],
            actualValue: Number(item[6]),
            estimatedValue: Number(item[7]),
            createdByName: item[8],
            description: item[9],
            specificArea: item[10],
            weaponsUsed: item[11],
            weaponsUsedOther: item[12],
            wereWeaponsUsed: item[13] === 'Yes',
            createdByTelephone: item[14],
            createdByEmail: item[15],
            vehicleRegistration: item[16],
            vehicleType: item[17],
            vehicleColourOther: item[18],
            vehicleMake: item[19],
            vehicleColour: item[20],
            injuryAction: item[21],
            suspectsTitle: item[22],
            suspectsFullName: item[23],
            suspectsGender: item[24],
            suspectsTelephone: item[25],
            suspectsAddressLine1: item[26],
            suspectsAddressLine2: item[27],
            suspectsTown: item[28],
            suspectsCounty: item[29],
            suspectsPostcode: item[30],
            suspectsEthnicGroup: item[31],
            suspectsBuild: item[32],
            suspectsHairColour: item[33],
            suspectsFacialHair: item[34],
            suspectsEyeColour: item[35],
            suspectApproxAge: item[36],
            suspectsGlasses: item[37],
            suspectsPiercings: item[38],
            suspectsTattoos: item[39],
            suspectsTattooDescription: item[40],
            suspectsAnyScars: item[41],
            suspectsWeightImperial: item[42],
            suspectsWeightMetric: item[43],
            suspectsHeightImperial: item[44],
            suspectsHeightMetric: item[45],
            suspectsClothing: item[46],
            emergencyServicesRef: item[47],
            emergencyServicesAttend: item[48] === 'Yes',
            emergencyServiceNumber: item[49],
            crimeReferenceNumber: item[50],
            officerName: item[51],
            officerSerial: item[52],
            officerTelephone: item[53],
          }))
      );
  };

  return <CSVReader onFileLoaded={onFileLoad} />;
};

export default MySafetyCSV;
