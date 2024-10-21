import errorNotification from '#/types/mutation_notifications/error_notification';
import { notification } from 'antd';
import { useState } from 'react';
import { useIntl } from 'react-intl';

import type { ListDemEvidenceRecycleQuery } from '../graphql/queries/__generated__/list-dem-evidence-recycle.generated';

import { useRestoreDemEvidenceMutation } from '../graphql/mutations/__generated__/restore-dem-evidence.generated';
import {
  ListDemEvidenceRecycleDocument,
  useListDemEvidenceRecycleQuery,
} from '../graphql/queries/__generated__/list-dem-evidence-recycle.generated';
export type EvidenceType = {
  date: Date | null | undefined;
  duration: null | string | undefined;
  importance: null | string | undefined;
  key: string;
  name: string;
  playbackUrl: string;
  thumbnail: {
    id: string;
    url: string;
  };
  type: string;
};
interface Return {
  data: ListDemEvidenceRecycleQuery | undefined;
  loading: boolean;
  onRestore: (value: string) => void;
  saving: boolean;
  selectedData: EvidenceType | undefined;
  setSelectedData: React.Dispatch<
    React.SetStateAction<EvidenceType | undefined>
  >;
}

const useRecycleEvidence = (): Return => {
  const intl = useIntl();

  const [saving, setSaving] = useState(false);
  const [selectedData, setSelectedData] = useState<EvidenceType | undefined>(
    undefined
  );
  const variables = {
    recycled: true,
  };
  const { data, loading } = useListDemEvidenceRecycleQuery({
    variables,
  });
  const [restoreDemEvidence] = useRestoreDemEvidenceMutation({
    onCompleted: () => {
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'The evidence has been restore from DEM!',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Removed!',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      errorNotification();
    },
  });
  const onRestore = (value: string) => {
    setSaving(true);
    void restoreDemEvidence({
      update: (store, { data: res }) => {
        if (res === null || res === undefined) return;

        const existingData = store.readQuery<ListDemEvidenceRecycleQuery>({
          query: ListDemEvidenceRecycleDocument,
          variables,
        });

        if (existingData === null) return;

        store.writeQuery<ListDemEvidenceRecycleQuery>({
          data: {
            __typename: 'Query',
            listDemEvidenceRecycle: {
              ...existingData.listDemEvidenceRecycle,
              edges: existingData.listDemEvidenceRecycle.edges.filter(
                (item) => item.node.id !== value
              ),
            },
          },
          query: ListDemEvidenceRecycleDocument,
          variables,
        });
      },
      variables: {
        id: value || '',
      },
    }).finally(() => {
      setSaving(false), setSelectedData(undefined);
    });
  };

  return {
    data,
    loading,
    onRestore,
    saving,
    selectedData,
    setSelectedData,
  };
};

export default useRecycleEvidence;
