import type { FormData } from '#/views/incidents/AddIncident/types/formData';
import type { FormInstance } from 'antd';

import { Form } from 'antd';
import update from 'immutability-helper';
import { useEffect, useState } from 'react';

import type { StateImageData } from '../../ImageSection/useImageSection';

export interface AddVehicleData {
  colour?: null | string | undefined;
  id: string;
  images?: {
    id: string;
    optimised?: null | string;
  }[];
  make?: null | string | undefined;
  model?: null | string | undefined;
  reference?: null | number;
  registration?: null | string | undefined;
}

export interface StateVehicleData extends AddVehicleData {
  blank: boolean;
  edited: boolean;
  existing: boolean;
  new: boolean;
}

interface Props {
  form: FormInstance<FormData>;
  onChange?: (value: StateVehicleData[]) => void;
  value?: StateVehicleData[];
}

interface Return {
  matchExistingOpen: AddVehicleData | null;
  noVehicles: boolean;
  onAddBlankVehicles: (count: number) => void;
  onAddVehicles: (vehicles: AddVehicleData[], existing: boolean) => void;
  onImagesUploadedInForm: (values: StateImageData[]) => void;
  onMatchVehicle: (value: AddVehicleData) => void;
  onRemoveVehicle: (id: string) => void;
  onUpdateVehicle: (data: AddVehicleData) => void;
  setMatchExistingOpen: (value: AddVehicleData | null) => void;
  setUpdateOpen: (value: StateVehicleData | null) => void;
  toggleNoVehicles: () => void;
  updateOpen: StateVehicleData | null;
  vehicles: StateVehicleData[];
}

const useVehicles = ({ form, onChange, value }: Props): Return => {
  const images = Form.useWatch('images', form);

  const [pristine, setPristine] = useState(true);
  const [vehicles, setVehicles] = useState<StateVehicleData[]>([]);
  const [noVehicles, setNoVehicles] = useState(false);

  const [matchExistingOpen, setMatchExistingOpen] =
    useState<AddVehicleData | null>(null);
  const [updateOpen, setUpdateOpen] = useState<StateVehicleData | null>(null);

  useEffect(() => {
    if (value && value.length !== vehicles.length) {
      setVehicles(value);
      setPristine(false);
    }
  }, []);

  useEffect(() => {
    if (onChange && !pristine) onChange(vehicles);
  }, [vehicles]);

  const onAddVehicles = (
    newData: AddVehicleData[],
    existing: boolean,
    blank = false
  ) => {
    setPristine(false);
    setVehicles([
      ...vehicles,
      ...newData.map((vehicle) => ({
        ...vehicle,
        blank,
        edited: false,
        existing,
        images: vehicle.images || [],
        new: !existing,
      })),
    ]);
  };
  const onRemoveVehicle = (id: string) => {
    setVehicles(vehicles.filter((vehicle) => vehicle.id !== id));
  };
  const onAddBlankVehicles = (count: number) => {
    const data: AddVehicleData[] = Array.from({ length: count }, () => ({
      colour: '',
      id: Math.floor(Math.random() * 1000).toString(),
      images: [],
      make: '',
      model: '',
      registration: '',
    }));
    onAddVehicles(data, false, true);
    setNoVehicles(false);
  };
  const toggleNoVehicles = () => {
    setNoVehicles(!noVehicles);
    if (onChange) onChange([]);
  };

  const onUpdateVehicle = (data: AddVehicleData) => {
    const currentData = vehicles.find(({ id }) => id === data.id);
    if (currentData)
      setVehicles(
        update<StateVehicleData[]>(vehicles, {
          [vehicles.findIndex((item) => item.id === data.id)]: {
            $set: {
              ...currentData,
              blank: false,
              colour: data.colour,
              edited: !currentData.new,
              images: data.images,
              make: data.make,
              model: data.model,
              registration: data.registration,
            },
          },
        })
      );
  };
  const onMatchVehicle = (data: AddVehicleData) => {
    const registrationUpdated =
      !data.registration || !!matchExistingOpen?.registration;
    const makeUpdated = !data.make || !!matchExistingOpen?.make;
    const modelUpdated = !data.model || !!matchExistingOpen?.model;
    const colourUpdated = !data.colour || !!matchExistingOpen?.colour;
    const newImages = data.images || [];
    const existingImages = data.images || [];

    if (matchExistingOpen)
      setVehicles(
        update<StateVehicleData[]>(vehicles, {
          [vehicles.findIndex((item) => item.id === matchExistingOpen.id)]: {
            $set: {
              blank: false,
              colour: colourUpdated ? matchExistingOpen?.colour : data.colour,
              edited:
                registrationUpdated ||
                makeUpdated ||
                modelUpdated ||
                colourUpdated,
              existing: true,
              id: data.id,
              images: [...newImages, ...existingImages],
              make: makeUpdated ? matchExistingOpen?.make : data.make,
              model: modelUpdated ? matchExistingOpen?.model : data.model,
              new: false,
              reference: data.reference,
              registration: registrationUpdated
                ? matchExistingOpen?.registration
                : data.registration,
            },
          },
        })
      );
  };

  const onImagesUploadedInForm = (values: StateImageData[]) => {
    if (images)
      form.setFieldsValue({
        images: update<StateImageData[]>(images, {
          $push: values,
        }),
      });
  };

  return {
    matchExistingOpen,
    noVehicles,
    onAddBlankVehicles,
    onAddVehicles,
    onImagesUploadedInForm,
    onMatchVehicle,
    onRemoveVehicle,
    onUpdateVehicle,
    setMatchExistingOpen,
    setUpdateOpen,
    toggleNoVehicles,
    updateOpen,
    vehicles,
  };
};

export default useVehicles;
