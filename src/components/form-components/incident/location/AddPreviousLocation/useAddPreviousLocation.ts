import type { AddressesQuery } from 'graphql/incidents/queries/__generated__/address.generated';

import { useAddressesQuery } from 'graphql/incidents/queries/__generated__/address.generated';
import { useState } from 'react';
import { useStoreState } from 'state';

interface FormData {
  selectedLocation: string;
}

interface Props {
  onClose: () => void;
  update: (value: string) => void;
}

interface Return {
  data: AddressesQuery | undefined;
  // data: Exclude<AddressesQuery['addresses'], undefined | null> | undefined;
  loading: boolean;
  onSubmit: (value: FormData) => void;
  saving: boolean;
}

const useAddPreviousLocation = ({ onClose, update }: Props): Return => {
  const [saving, setSaving] = useState(false);
  const userId = useStoreState((state) => state.user.id);

  const { data: addressData, loading } = useAddressesQuery({
    variables: {
      where: {
        user: {
          id: {
            equals: userId,
          },
        },
      },
    },
  });

  const onSubmit = (data: FormData) => {
    setSaving(true);
    update(data.selectedLocation);
    setSaving(false);
    onClose();
  };
  return {
    // data: addressData?.addresses.filter(({ primary }) => !primary),
    data: addressData,
    loading,
    onSubmit,
    saving,
  };
};

export default useAddPreviousLocation;
