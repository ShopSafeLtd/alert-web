/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
import type { FormInstance } from 'antd';
import { Form } from 'antd';
import { useEffect, useState } from 'react';
import type {
  VehicleData,
  OffenderData,
  CrimeGroupCardData,
} from 'types/DataType';

interface Props {
  update: (value: CrimeGroupCardData) => void;
}

export interface FormData {
  alias: string;
  vehicles?: VehicleData[];
  offenders?: OffenderData[];
}
interface Return {
  onSubmit: (value: FormData) => void;
  form: FormInstance<FormData>;
  linkOffender: boolean;
  toggleLinkOffender: () => void;
  offendersData: OffenderData[];
  vehiclesData: VehicleData[];
  updateOffendersList: (value: OffenderData) => void;
  removeOffender: (value: string | undefined) => void;
  linkVehicle: boolean;
  toggleLinkVehicle: () => void;
  updateVehiclesList: (value: VehicleData) => void;
  removeVehicle: (value: string | undefined) => void;
}

const useAddCrimeGroup = ({ update }: Props): Return => {
  const [form] = Form.useForm<FormData>();
  const [linkOffender, setLinkOffender] = useState(false);
  const [linkVehicle, setLinkVehicle] = useState(false);
  const [offendersData, setOffendersData] = useState<OffenderData[]>([]);
  const [vehiclesData, setVehiclesData] = useState<VehicleData[]>([]);

  useEffect(() => {
    form.setFieldsValue({ offenders: offendersData });
  }, [offendersData]);

  const updateVehiclesList = (selectedVehicle: VehicleData) => {
    setVehiclesData([...vehiclesData, selectedVehicle]);
  };
  const updateOffendersList = (selectedOffender: OffenderData) => {
    setOffendersData([...offendersData, selectedOffender]);
  };
  const removeOffender = (offenderId: string | undefined) => {
    if (offenderId) {
      setOffendersData(
        offendersData?.filter((offender) => offender.id !== offenderId)
      );
    }
  };

  const removeVehicle = (vehicleId: string | undefined) => {
    if (vehicleId) {
      setVehiclesData(
        vehiclesData?.filter((vehicle) => vehicle.id !== vehicleId)
      );
    }
  };
  const onSubmit = (data: FormData) => {
    update({
      id: Math.floor(Math.random() * 1000).toString(),
      alias: data.alias,
      vehicles: data.vehicles,
      offenders: data.offenders,
    });
  };

  const toggleLinkVehicle = () => {
    setLinkVehicle(!linkVehicle);
  };
  const toggleLinkOffender = () => {
    setLinkOffender(!linkOffender);
  };
  return {
    onSubmit,
    form,
    offendersData,
    vehiclesData,
    linkVehicle,
    linkOffender,
    toggleLinkVehicle,
    toggleLinkOffender,
    updateVehiclesList,
    updateOffendersList,
    removeOffender,
    removeVehicle,
  };
};
export default useAddCrimeGroup;
