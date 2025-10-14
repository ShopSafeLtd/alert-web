import type { FormInstance } from 'antd';
import type { LocationData } from 'types/DataType';

import { Form } from 'antd';
import { useEffect, useState } from 'react';

const { useForm } = Form;
export interface FormData {
  alias: string;
  building: string;
  county: string;
  geoLat: number;
  geoLng: number;
  postcode: string;
  street: string;
  townCity: string;
}
interface Props {
  locationData?: LocationData;
  onClose: () => void;
  update: (value: LocationData) => void;
}

interface Return {
  form: FormInstance<FormData>;
  location: LocationData | undefined;
  onSubmit: (value: FormData) => void;
  saving: boolean;
  setLocation: (value: LocationData) => void;
}

const useAddLocation = ({ locationData, onClose, update }: Props): Return => {
  const [saving, setSaving] = useState(false);
  const [form] = useForm<FormData>();
  const [location, setLocation] = useState<LocationData>();

  useEffect(() => {
    if (locationData?.geoLat && locationData.geoLng) {
      setLocation({ geoLat: locationData.geoLat, geoLng: locationData.geoLng });
    }
  }, []);

  const onSetLocation = (data: LocationData) => {
    if (data) {
      setLocation(data);
      form.setFieldsValue({
        postcode: data.postcode || '',
        street: data.street || '',
        townCity: data.townCity || '',
      });
    }
  };

  const onSubmit = (data: FormData) => {
    setSaving(true);
    update({
      alias: data.alias,
      building: data.building,
      county: data.county,
      geoLat: location?.geoLat ?? undefined,
      geoLng: location?.geoLng ?? undefined,
      postcode: data.postcode,
      street: data.street,
      townCity: data.townCity,
    });
    onClose();
    setSaving(false);
  };

  return {
    form,
    location,
    onSubmit,
    saving,
    setLocation: onSetLocation,
  };
};

export default useAddLocation;
