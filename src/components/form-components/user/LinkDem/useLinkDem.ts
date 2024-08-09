import type { ListDemUsersQuery } from 'graphql/dem/queries/__generated__/list-users.generated';

import { useLinkUserToDemMutation } from 'graphql/dem/mutations/__generated__/link-user-to-dem.generated';
import { useListDemUsersQuery } from 'graphql/dem/queries/__generated__/list-users.generated';
import { useState } from 'react';

interface Props {
  businessId: string;
  onClose: () => void;
  userId: string;
}

interface Return {
  data: ListDemUsersQuery | undefined;
  loading: boolean;
  onSelect: (item: { key: string }) => void;
  onSubmit: () => void;
  saving: boolean;
}

const useLinkDem = ({ businessId, onClose, userId }: Props): Return => {
  const [saving, setSaving] = useState(false);
  const [selected, setSelected] = useState<string | undefined>();

  const { data, loading } = useListDemUsersQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: businessId,
    },
  });

  const [linkToDem] = useLinkUserToDemMutation();
  const onSubmit = () => {
    setSaving(true);
    if (selected) {
      const user = data?.listDemUsers?.demUsers.find(
        (item) => item.id === selected
      );
      if (user) {
        void linkToDem({
          variables: {
            data: {
              id: user.id || '',
            },
            where: {
              id: userId,
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
    loading: data?.listDemUsers ? false : loading,
    onSelect,
    onSubmit,
    saving,
  };
};

export default useLinkDem;
