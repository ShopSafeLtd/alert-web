import { useState } from 'react';
import moment from 'moment';
import {
  useIntelOneImportDataMutation,
  useSchemeGroupsQuery,
} from 'graphql/generated';
import { useStoreState } from 'state';
import { notification } from 'antd';
import type { IntelOneCSVData } from './IntelOne.types';

interface Return {
  onFileLoad: (data: string[][]) => void;
  onSubmit: () => void;
  saving: boolean;
  valid: boolean;
}

const useIntelOne = (): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const [csvData, setCsvData] = useState<IntelOneCSVData[]>([]);
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

  const [importData] = useIntelOneImportDataMutation({
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
        .filter((_, i) => i > 0)
        .map((item) => ({
          siteName: item[0],
          reportDate: moment(item[1], 'DD/MM/YYYY HH:mm').toDate(),
          reference: item[2],
          type: item[4],
          offenderName: item[5].split(','),
          value: Number(item[6]),
          lat: item[7],
          lng: item[8],
          postcode: item[9],
          description: item[10],
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
            description: item.description,
            lat: item.lat,
            lng: item.lng,
            offenderName: item.offenderName,
            postcode: item.postcode,
            reference: item.reference,
            reportDate: item.reportDate,
            siteName: item.siteName,
            value: item.value,
            type: item.type,
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

export default useIntelOne;
