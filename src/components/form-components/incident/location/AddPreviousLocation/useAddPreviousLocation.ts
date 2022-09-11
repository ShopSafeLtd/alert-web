import { useState } from 'react';

import { useAddressesQuery, AddressesQuery } from 'graphql/generated';

import { useStoreState } from 'state';

interface FormData {
  selectedLocation: string;
}

interface Props {
  onClose: () => void;
  update: (value: string) => void;
}

interface Return {
  onSubmit: (value: FormData) => void;
  saving: boolean;
  data: AddressesQuery | undefined;
  // data: Exclude<AddressesQuery['addresses'], undefined | null> | undefined;
  loading: boolean;
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
    onSubmit,
    saving,
    // data: addressData?.addresses.filter(({ primary }) => !primary),
    data: addressData,
    loading,
  };
};

export default useAddPreviousLocation;
