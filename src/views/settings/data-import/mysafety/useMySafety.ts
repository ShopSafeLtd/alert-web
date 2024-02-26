import { useState } from 'react';
import moment from 'moment';
import {
  useMySafetyImportDataMutation,
  useSchemeGroupsQuery,
} from 'graphql/generated';
import { useStoreState } from 'state';
import { notification } from 'antd';
import type { MySafetyCSVData } from './MySafety.types';

interface Return {
  onFileLoad: (data: string[][]) => void;
  onSubmit: () => void;
  saving: boolean;
  valid: boolean;
}

const useMySafety = (): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const [csvData, setCsvData] = useState<MySafetyCSVData[]>([]);
  const [saving, setSaving] = useState(false);

  const { data: groupsData } = useSchemeGroupsQuery({
    variables: {
      where: {
        scheme: {
          id: {
            equals: schemeId,
          },
        },
      },
    },
  });

  const [importData] = useMySafetyImportDataMutation({
    onCompleted: () => {
      notification.success({
        description: 'Import has been completed successfully',
        message: 'Import Completed',
        placement: 'bottomLeft',
      });
    },
    onError: () => {
      notification.error({
        description: 'Import could not be completed for data.',
        message: 'Import Failed',
        placement: 'bottomLeft',
      });
    },
  });

  const onFileLoad = (data: string[][]) => {
    setCsvData(
      data
        .filter((_, i) => i > 40)
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

  const onSubmit = async () => {
    setSaving(false);
    await importData({
      variables: {
        data: {
          scheme: {
            id: schemeId,
          },
          groups: groupsData?.groups.map(({ id }) => ({ id })) || [],
          incidents: csvData.map((item) => ({
            site: item.site,
            actualValue: item.actualValue,
            createdByName: item.createdByName,
            crimeReferenceNumber: item.crimeReferenceNumber,
            crimeType: item.crimeType,
            incidentID: item.incidentID,
            dateOccurred: item.dateOccurred,
            description: item.description,
            emergencyServicesAttend: item.emergencyServicesAttend,
            estimatedValue: item.estimatedValue,
            specificArea: item.specificArea,
            wereWeaponsUsed: item.wereWeaponsUsed,
          })),
        },
      },
    });
    setSaving(false);
  };

  return {
    onFileLoad,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onSubmit,
    saving,
    valid: csvData.length === 0,
  };
};

export default useMySafety;
