import { useState } from 'react';

import { useStoreState } from 'state';
import { notification } from 'antd';
import type { IntelOneCSVData } from '#/components/form-components/IntelOneCSV/IntelOneCSV.types';
import { useIntelOneImportDataMutation } from 'graphql/imports/intel-one-import.generated';

interface FormData {
  groups: string[];
  intelOne: IntelOneCSVData[];
}

interface Return {
  onSubmit: (data: FormData) => void;
  saving: boolean;
}

const useIntelOne = (): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const [saving, setSaving] = useState(false);

  const [importData] = useIntelOneImportDataMutation({
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

  const onSubmit = async (data: FormData) => {
    try {
      setSaving(true);
      await importData({
        variables: {
          data: {
            scheme: {
              id: schemeId,
            },
            groups: data.groups.map((id) => ({
              id,
            })),
            incidents: data.intelOne
              .map((item) => ({
                description: item.description,
                offenderName: item.offenderName,
                crimeRef: item.crimeRef,
                reference: item.reference,
                reportDate: item.reportDate,
                siteName: item.siteName,
                value: item.value,
                type: item.type,
                registration: item.registration,
                make: item.make,
                model: item.model,
                colour: item.colour,
                group: item.group,
              }))
              .filter(
                (item) => item.description && item.type && item.reportDate
              ),
          },
        },
      });
      setSaving(false);
    } catch {
      setSaving(false);
    }
  };

  return {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onSubmit,
    saving,
  };
};

export default useIntelOne;
