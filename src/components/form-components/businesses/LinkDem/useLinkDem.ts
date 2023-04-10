import { useState } from 'react';

import type { ListDemCompaniesQuery } from 'graphql/generated';
import {
  useLinkOrgToDemMutation,
  useListDemCompaniesQuery,
} from 'graphql/generated';

interface Props {
  onClose: () => void;
  businessId: string;
}

interface Return {
  onSubmit: () => void;
  saving: boolean;
  data: ListDemCompaniesQuery | undefined;
  loading: boolean;
  onSelect: (item: { key: string }) => void;
}

const useLinkDem = ({ onClose, businessId }: Props): Return => {
  const [saving, setSaving] = useState(false);
  const [selected, setSelected] = useState<string | undefined>();

  const { data, loading } = useListDemCompaniesQuery({
    fetchPolicy: 'cache-and-network',
  });

  const [linkToDem] = useLinkOrgToDemMutation();
  const onSubmit = () => {
    setSaving(true);
    if (selected) {
      const company = data?.listDemCompanies?.demCompanies.find(
        (item) => item.id === selected
      );
      if (company) {
        linkToDem({
          variables: {
            where: {
              id: businessId,
            },
            data: {
              id: company.id || '',
            },
          },
        });
      }
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
    loading: data?.listDemCompanies ? false : loading,
    onSelect,
  };
};

export default useLinkDem;
