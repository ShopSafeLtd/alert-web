import { notification } from 'antd';
import {
  VehicleQuery,
  useVehicleQuery,
  useDeleteVehicleMutation,
} from 'graphql/generated';
import { useState } from 'react';
import { useParams } from 'react-router';

interface Return {
  data: VehicleQuery | undefined;
  loading: boolean;
  editVehicle: boolean;
  toggleEditVehicle: () => void;
  saving: boolean;
  onDeleteVehicle: () => void;
}

const useViewVehicle = (): Return => {
  const params = useParams();
  const [saving, setSaving] = useState(false);
  const [editVehicle, setEditVehicle] = useState(false);
  const { data, loading } = useVehicleQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        id: params.id,
      },
    },
  });
  const [deleteVehicle] = useDeleteVehicleMutation({
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

  const onDeleteVehicle = () => {
    setSaving(true);
    deleteVehicle({
      variables: {
        id: params.id || '',
      },
    });
  };

  const toggleEditVehicle = () => {
    setEditVehicle(!editVehicle);
  };
  return {
    data,
    loading,
    editVehicle,
    toggleEditVehicle,
    saving,
    onDeleteVehicle,
  };
};

export default useViewVehicle;
