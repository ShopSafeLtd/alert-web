import type { ListDemEvidenceQuery } from '#/graphql/dem/queries/list-evidence.generated';
import { useListDemEvidenceQuery } from '#/graphql/dem/queries/list-evidence.generated';
import { useState } from 'react';
import { useStoreState } from 'state';

interface Props {
  onClose: () => void;
  selectEvidence: (evidence: { url: string }) => void;
}

interface Return {
  onSubmit: () => void;
  saving: boolean;
  data: ListDemEvidenceQuery | undefined;
  loading: boolean;
  onSelect: (item: { key: string }) => void;
}

const useLinkDem = ({ onClose, selectEvidence }: Props): Return => {
  const [saving, setSaving] = useState(false);
  const [selected, setSelected] = useState<string | undefined>();
  const business = useStoreState((state) => state.user.businesses);
  // map all the demIds from the businesses and use the first value
  const demId = business.map((item) => item.demId)[0];
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
    onSubmit,
    saving,
    data,
    loading: data?.listDemEvidence ? false : loading,
    onSelect,
  };
};

export default useLinkDem;
