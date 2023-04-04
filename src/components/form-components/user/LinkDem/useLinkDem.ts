import { useState } from 'react';

import type { ListDemUsersQuery } from 'graphql/generated';
import {
  useLinkUserToDemMutation,
  useListDemUsersQuery,
} from 'graphql/generated';

interface Props {
  onClose: () => void;
  businessId: string;
  userId: string;
}

interface Return {
  onSubmit: () => void;
  saving: boolean;
  data: ListDemUsersQuery | undefined;
  loading: boolean;
  onSelect: (item: { key: string }) => void;
}

const useLinkDem = ({ onClose, businessId, userId }: Props): Return => {
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
        linkToDem({
          variables: {
            where: {
              id: userId,
            },
            data: {
              id: user.id || '',
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
    loading: data?.listDemUsers ? false : loading,
    onSelect,
  };
};

export default useLinkDem;
