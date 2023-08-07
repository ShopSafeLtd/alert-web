import { useEffect, useState } from 'react';
import update from 'immutability-helper';
import type { FormInstance } from 'antd';
import { Form } from 'antd';
import type { FormData } from 'views/incidents/AddIncident/useAddIncident';
import type { StateImageData } from '../../ImageSection/useImageSection';

export interface AddVehicleData {
  id: string;
  make?: string | null | undefined;
  model?: string | null | undefined;
  colour?: string | null | undefined;
  reference?: number | null;
  registration?: string | null | undefined;
  images?: {
    id: string;
    optimised?: string | null;
  }[];
}

export interface StateVehicleData extends AddVehicleData {
  new: boolean;
  existing: boolean;
  edited: boolean;
  blank: boolean;
}

interface Props {
  value?: StateVehicleData[];
  onChange?: (value: StateVehicleData[]) => void;
  form: FormInstance<FormData>;
}

interface Return {
  vehicles: StateVehicleData[];
  noVehicles: boolean;
  toggleNoVehicles: () => void;
  onAddBlankVehicles: (count: number) => void;
  onRemoveVehicle: (id: string) => void;
  setMatchExistingOpen: (value: AddVehicleData | null) => void;
  setUpdateOpen: (value: StateVehicleData | null) => void;
  matchExistingOpen: AddVehicleData | null;
  updateOpen: StateVehicleData | null;
  onAddVehicles: (vehicles: AddVehicleData[], existing: boolean) => void;
  onMatchVehicle: (value: AddVehicleData) => void;
  onUpdateVehicle: (data: AddVehicleData) => void;
  onImagesUploadedInForm: (values: StateImageData[]) => void;
}

const useVehicles = ({ value, onChange, form }: Props): Return => {
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
        images: vehicle.images || [],
        edited: false,
        existing,
        new: !existing,
        blank,
      })),
    ]);
  };
  const onRemoveVehicle = (id: string) => {
    setVehicles(vehicles.filter((vehicle) => vehicle.id !== id));
  };
  const onAddBlankVehicles = (count: number) => {
    const data: AddVehicleData[] = Array.from({ length: count }, () => ({
      make: '',
      model: '',
      colour: '',
      registration: '',
      id: Math.floor(Math.random() * 1000).toString(),
      images: [],
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
              images: data.images,
              registration: data.registration,
              make: data.make,
              model: data.model,
              colour: data.colour,
              edited: !currentData.new,
              blank: false,
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
              reference: data.reference,
              id: data.id,
              registration: registrationUpdated
                ? matchExistingOpen?.registration
                : data.registration,
              make: makeUpdated ? matchExistingOpen?.make : data.make,
              model: modelUpdated ? matchExistingOpen?.model : data.model,
              colour: colourUpdated ? matchExistingOpen?.colour : data.colour,
              images: [...newImages, ...existingImages],
              new: false,
              existing: true,
              edited:
                registrationUpdated ||
                makeUpdated ||
                modelUpdated ||
                colourUpdated,
              blank: false,
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
    vehicles,
    noVehicles,
    onRemoveVehicle,
    setMatchExistingOpen,
    setUpdateOpen,
    onAddBlankVehicles,
    toggleNoVehicles,
    updateOpen,
    matchExistingOpen,
    onAddVehicles,
    onMatchVehicle,
    onUpdateVehicle,
    onImagesUploadedInForm,
  };
};

export default useVehicles;
