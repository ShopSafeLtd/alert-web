import type { ListDemCompaniesQuery } from 'graphql/dem/queries/__generated__/list-companies.generated';

import { useLinkOrgToDemMutation } from 'graphql/dem/mutations/__generated__/link-org-to-dem.generated';
import { useListDemCompaniesQuery } from 'graphql/dem/queries/__generated__/list-companies.generated';
import { useState } from 'react';

interface Props {
  businessId: string;
  onClose: () => void;
}

interface Return {
  data: ListDemCompaniesQuery | undefined;
  loading: boolean;
  onSelect: (item: { key: string }) => void;
  onSubmit: () => void;
  saving: boolean;
}

const useLinkDem = ({ businessId, onClose }: Props): Return => {
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
        void linkToDem({
          variables: {
            data: {
              id: company.id || '',
            },
            where: {
              id: businessId,
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
    data,
    loading: data?.listDemCompanies ? false : loading,
    onSelect,
    onSubmit,
    saving,
  };
};

export default useLinkDem;
