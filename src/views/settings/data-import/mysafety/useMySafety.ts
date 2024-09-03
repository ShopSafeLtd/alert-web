import type { MySafetyCSVData } from '#/components/form-components/MySafetyCSV/MySafetyCSV.types';
import type { FormInstance } from 'antd';

import { Form, notification } from 'antd';
import { useMySafetyImportDataMutation } from 'graphql/imports/__generated__/mysafety-import.generated';
import { useState } from 'react';
import { useStoreState } from 'state';

interface FormData {
  groups: string[];
  mySafety: MySafetyCSVData[];
}

interface Return {
  form: FormInstance<FormData>;
  onSubmit: (data: FormData) => void;
  saving: boolean;
}

const useMySafety = (): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const [saving, setSaving] = useState(false);
  const [form] = Form.useForm<FormData>();
  const [importData] = useMySafetyImportDataMutation({
    onCompleted: () => {
      notification.success({
        description: 'Import has been completed successfully',
        message: 'Import Completed',
        placement: 'bottomRight',
      });
    },
    onError: () => {
      notification.error({
        description: 'Import could not be completed for data.',
        message: 'Import Failed',
        placement: 'bottomRight',
      });
    },
  });

  const onSubmit = async ({ groups, mySafety }: FormData) => {
    try {
      setSaving(true);

      await importData({
        variables: {
          data: {
            groups: groups.map((id) => ({ id })) || [],
            incidents: mySafety
              .filter(
                // filter where actualValue isn't NaN
                (item) => !Number.isNaN(item.actualValue)
              )
              .map((item) => ({
                actualValue: item.actualValue,
                createdByName: item.createdByName,
                crimeReferenceNumber: item.crimeReferenceNumber,
                crimeType: item.crimeType,
                dateOccurred: item.dateOccurred,
                description: item.description,
                emergencyServicesAttend: item.emergencyServicesAttend,
                estimatedValue: item.estimatedValue,
                incidentID: item.incidentID,
                site: item.site,
                specificArea: item.specificArea,
                wereWeaponsUsed: item.wereWeaponsUsed,
              })),
            scheme: {
              id: schemeId,
            },
          },
        },
      });
      setSaving(false);
    } catch {
      setSaving(false);
    }
  };

  return {
    form,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onSubmit,
    saving,
  };
};

export default useMySafety;
