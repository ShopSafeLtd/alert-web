import type { FormInstance } from 'antd';
import { Form } from 'antd';
import { useEffect, useState } from 'react';
import type { LocationData } from 'types/DataType';

const { useForm } = Form;
export interface FormData {
  alias: string;
  building: string;
  street: string;
  townCity: string;
  county: string;
  postcode: string;
  geoLat: number;
  geoLng: number;
}
interface Props {
  onClose: () => void;
  update: (value: LocationData) => void;
  locationData?: LocationData;
}

interface Return {
  onSubmit: (value: FormData) => void;
  saving: boolean;
  location: LocationData | undefined;
  setLocation: (value: LocationData) => void;
  form: FormInstance<FormData>;
}

const useAddLocation = ({ onClose, update, locationData }: Props): Return => {
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
        street: data.street || '',
        townCity: data.townCity || '',
        postcode: data.postcode || '',
      });
    }
  };

  const onSubmit = (data: FormData) => {
    setSaving(true);
    update({
      alias: data.alias,
      building: data.building,
      street: data.street,
      townCity: data.townCity,
      county: data.county,
      postcode: data.postcode,
      geoLat: location?.geoLat ?? undefined,
      geoLng: location?.geoLng ?? undefined,
    });
    onClose();
    setSaving(false);
  };

  return {
    onSubmit,
    saving,
    location,
    setLocation: onSetLocation,
    form,
  };
};

export default useAddLocation;
