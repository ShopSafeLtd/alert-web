import { useState } from 'react';

interface LocationData {
  building?: string | null;
  street: string;
  townCity: string;
  county?: string | null;
  postcode: string;
}
interface Props {
  onClose: () => void;
  update: (value: LocationData | undefined) => void;
}

interface Return {
  onSubmit: (value: LocationData) => void;
  saving: boolean;
}

const useAddOffender = ({ onClose, update }: Props): Return => {
  const [saving, setSaving] = useState(false);

  const onSubmit = (data: LocationData) => {
    setSaving(true);
    update({
      building: data.building,
      street: data.street,
      townCity: data.townCity,
      county: data.county,
      postcode: data.postcode,
    });
    onClose();
    setSaving(false);
  };

  return {
    onSubmit,
    saving,
  };
};

export default useAddOffender;
