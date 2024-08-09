import type { IntelOneCSVData } from '#/components/form-components/IntelOneCSV/IntelOneCSV.types';

import { notification } from 'antd';
import { useIntelOneImportDataMutation } from 'graphql/imports/__generated__/intel-one-import.generated';
import { useState } from 'react';
import { useStoreState } from 'state';

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
            groups: data.groups.map((id) => ({
              id,
            })),
            incidents: data.intelOne
              .map((item) => ({
                colour: item.colour,
                crimeRef: item.crimeRef,
                description: item.description,
                group: item.group,
                make: item.make,
                model: item.model,
                offenderName: item.offenderName,
                reference: item.reference,
                registration: item.registration,
                reportDate: item.reportDate,
                siteName: item.siteName,
                type: item.type,
                value: item.value,
              }))
              .filter(
                (item) => item.description && item.type && item.reportDate
              ),
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
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onSubmit,
    saving,
  };
};

export default useIntelOne;
