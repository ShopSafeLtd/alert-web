import { notification } from 'antd';
import {
  CrimeGroupQuery,
  useCrimeGroupQuery,
  useDeleteCrimeGroupMutation,
} from 'graphql/generated';
import { useState } from 'react';
import { useParams } from 'react-router';

interface Return {
  data: CrimeGroupQuery | undefined;
  loading: boolean;
  saving: boolean;
  offenderIds: string[];
  vehicleIds: string[];
  addOffender: boolean;
  toggleAddOffender: () => void;
  addExistingOffender: boolean;
  toggleAddExistingOffender: () => void;
  addNewVehicle: boolean;
  addExistingVehicle: boolean;
  toggleAddNewVehicle: () => void;
  addAlias: boolean;
  toggleAddAlias: () => void;
  toggleAddExistingVehicle: () => void;
  onDeleteCrimeGroup: () => void;
}

const useViewCrimeGroup = (): Return => {
  const params = useParams();
  const [saving, setSaving] = useState(false);
  const [addOffender, setAddOffender] = useState(false);
  const [addExistingOffender, setAddExistingOffender] = useState(false);
  // const [offendersData, setOffendersData] = useState<OffenderData[]>([]);
  const [offenderIds, setOffenderIds] = useState<string[]>([]);

  const [addNewVehicle, setAddNewVehicle] = useState(false);
  const [addExistingVehicle, setAddExistingVehicle] = useState(false);
  // const [vehiclesData, setVehiclesData] = useState<VehicleData[]>([]);
  const [vehicleIds, setVehicleIds] = useState<string[]>([]);
  const [addAlias, setAddAlias] = useState(false);

  const { data, loading } = useCrimeGroupQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        id: params.id,
      },
    },
    onCompleted: ({ crimeGroup }) => {
      if (crimeGroup?.offenders && crimeGroup.offenders.length) {
        setOffenderIds(crimeGroup.offenders.map(({ id }) => id));
      }
      if (crimeGroup?.vehicles && crimeGroup.vehicles.length) {
        setVehicleIds(crimeGroup.vehicles.map(({ id }) => id));
      }
    },
  });

  // function
  const toggleAddOffender = () => {
    setAddOffender(!addOffender);
  };
  const toggleAddExistingOffender = () => {
    setAddExistingOffender(!addExistingOffender);
  };
  const toggleAddNewVehicle = () => {
    setAddNewVehicle(!addNewVehicle);
  };

  const toggleAddExistingVehicle = () => {
    setAddExistingVehicle(!addExistingVehicle);
  };
  const toggleAddAlias = () => {
    setAddAlias(!addAlias);
  };
  const [deleteCrimeGroup] = useDeleteCrimeGroupMutation({
    onCompleted: () => {
      setSaving(false);
      window.history.back();
      notification.success({
        message: 'Successfully Deleted!',
        description: 'The vehicle has been deleted!',
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      notification.error({
        message: 'Error!',
        description: 'Whoops, there are some errors. Please try again. ',
        placement: 'bottomRight',
      });
    },
  });

  const onDeleteCrimeGroup = () => {
    setSaving(true);
    deleteCrimeGroup({
      variables: {
        id: params.id || '',
      },
    });
  };

  return {
    data,
    loading,
    saving,
    offenderIds,
    vehicleIds,
    addOffender,
    toggleAddOffender,
    addExistingOffender,
    toggleAddExistingOffender,
    addNewVehicle,
    addExistingVehicle,
    toggleAddNewVehicle,
    toggleAddExistingVehicle,
    addAlias,
    toggleAddAlias,
    onDeleteCrimeGroup,
  };
};

export default useViewCrimeGroup;
