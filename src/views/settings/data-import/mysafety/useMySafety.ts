import { useState } from 'react';
import { useMySafetyImportDataMutation } from 'graphql/generated';
import { useStoreState } from 'state';
import { notification } from 'antd';
import type { MySafetyCSVData } from '#/components/form-components/MySafetyCSV/MySafetyCSV.types';

interface FormData {
  groups: string[];
  mySafety: MySafetyCSVData[];
}

interface Return {
  onSubmit: (data: FormData) => void;
  saving: boolean;
}

const useMySafety = (): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const [saving, setSaving] = useState(false);

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

  const onSubmit = async ({ groups, mySafety }: FormData) => {
    setSaving(true);
    await importData({
      variables: {
        data: {
          scheme: {
            id: schemeId,
          },
          groups: groups.map((id) => ({ id })) || [],
          incidents: mySafety.map((item) => ({
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
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onSubmit,
    saving,
  };
};

export default useMySafety;
