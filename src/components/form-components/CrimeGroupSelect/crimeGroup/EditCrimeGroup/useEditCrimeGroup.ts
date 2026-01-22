/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
import type { FormInstance } from 'antd';
import type {
  CrimeGroupCardData,
  OffenderData,
  VehicleData,
} from 'types/DataType';

import { Form } from 'antd';
import { useEffect, useState } from 'react';

interface Props {
  editData: CrimeGroupCardData | null | undefined;
  update: (value: CrimeGroupCardData) => void;
}

export interface FormData {
  alias: string;
  offenders?: OffenderData[];
  vehicles?: VehicleData[];
}
interface Return {
  form: FormInstance<FormData>;
  linkOffender: boolean;
  linkVehicle: boolean;
  offendersData: OffenderData[];
  onSubmit: (value: FormData) => void;
  removeOffender: (value: string | undefined) => void;
  removeVehicle: (value: string | undefined) => void;
  toggleLinkOffender: () => void;
  toggleLinkVehicle: () => void;
  updateOffendersList: (value: OffenderData) => void;
  updateVehiclesList: (value: VehicleData) => void;
  vehiclesData: VehicleData[];
}

const useEditCrimeGroup = ({ editData, update }: Props): Return => {
  const [form] = Form.useForm<FormData>();

  const [linkOffender, setLinkOffender] = useState(false);
  const [linkVehicle, setLinkVehicle] = useState(false);
  const [offendersData, setOffendersData] = useState<OffenderData[]>([]);
  const [vehiclesData, setVehiclesData] = useState<VehicleData[]>([]);

  useEffect(() => {
    setOffendersData(<[]>editData?.offenders);
    setVehiclesData(<[]>editData?.vehicles);
  }, [editData]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
    form.setFieldsValue({ offenders: offendersData } as any);
  }, [offendersData, form]);

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
      alias: data.alias,
      id: editData?.id || '',
      offenders: data.offenders,
      vehicles: data.vehicles,
    });
  };

  const toggleLinkVehicle = () => {
    setLinkVehicle(!linkVehicle);
  };
  const toggleLinkOffender = () => {
    setLinkOffender(!linkOffender);
  };
  return {
    form,
    linkOffender,
    linkVehicle,
    offendersData,
    onSubmit,
    removeOffender,
    removeVehicle,
    toggleLinkOffender,
    toggleLinkVehicle,
    updateOffendersList,
    updateVehiclesList,
    vehiclesData,
  };
};
export default useEditCrimeGroup;
