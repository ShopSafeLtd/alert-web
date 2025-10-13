import { useState } from 'react';

interface Return {
  addExistingOffenderOpen: boolean;
  addExistingVehicleOpen: boolean;
  addNewOffenderOpen: boolean;
  addNewVehicleOpen: boolean;
  toggleAddExisingVehicleOpen: () => void;
  toggleAddExistingOffenderOpen: () => void;
  toggleAddNewOffenderOpen: () => void;
  toggleAddNewVehicleOpen: () => void;
}

const useProfiles = (): Return => {
  const [addNewOffenderOpen, setAddNewOffenderOpen] = useState(false);
  const [addExistingOffenderOpen, setAddExistingOffenderOpen] = useState(false);
  const [addNewVehicleOpen, setAddNewVehicleOpen] = useState(false);
  const [addExistingVehicleOpen, setAddExistingVehicleOpen] = useState(false);

  const toggleAddNewOffenderOpen = () => {
    setAddNewOffenderOpen(!addNewOffenderOpen);
  };
  const toggleAddExistingOffenderOpen = () => {
    setAddExistingOffenderOpen(!addExistingOffenderOpen);
  };
  const toggleAddNewVehicleOpen = () => {
    setAddNewVehicleOpen(!addNewVehicleOpen);
  };
  const toggleAddExisingVehicleOpen = () => {
    setAddExistingVehicleOpen(!addExistingVehicleOpen);
  };

  return {
    addExistingOffenderOpen,
    addExistingVehicleOpen,
    addNewOffenderOpen,
    addNewVehicleOpen,
    toggleAddExisingVehicleOpen,
    toggleAddExistingOffenderOpen,
    toggleAddNewOffenderOpen,
    toggleAddNewVehicleOpen,
  };
};

export default useProfiles;
