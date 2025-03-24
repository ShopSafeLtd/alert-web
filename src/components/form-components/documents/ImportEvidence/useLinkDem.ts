import type { ListDemEvidenceQuery } from 'graphql/dem/queries/__generated__/list-evidence.generated';

import { demIdAtom } from '#/providers/UserProvider/UserProvider';
import { useListDemEvidenceQuery } from 'graphql/dem/queries/__generated__/list-evidence.generated';
import { useAtomValue } from 'jotai/index';
import { useState } from 'react';

interface Props {
  onClose: () => void;
  selectEvidence: (evidence: { url: string }) => void;
}

interface Return {
  data: ListDemEvidenceQuery | undefined;
  loading: boolean;
  onSelect: (item: { key: string }) => void;
  onSubmit: () => void;
  saving: boolean;
}

const useLinkDem = ({ onClose, selectEvidence }: Props): Return => {
  const [saving, setSaving] = useState(false);
  const [selected, setSelected] = useState<string | undefined>();
  const demId = useAtomValue(demIdAtom);
  const { data, loading } = useListDemEvidenceQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: demId || '',
    },
  });

  const onSubmit = () => {
    setSaving(true);
    if (selected) {
      selectEvidence({
        url: selected,
      });
    }
    setSaving(false);
    onClose();
  };

  const onSelect = (item: { key: string }) => {
    setSelected(item.key);
  };

  return {
    data,
    loading: data?.listDemEvidence ? false : loading,
    onSelect,
    onSubmit,
    saving,
  };
};

export default useLinkDem;
