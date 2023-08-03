import { useState } from 'react';

interface Return {
  addNewOffenderOpen: boolean;
  addExistingOffenderOpen: boolean;
  addNewVehicleOpen: boolean;
  addExistingVehicleOpen: boolean;
  toggleAddNewOffenderOpen: () => void;
  toggleAddExistingOffenderOpen: () => void;
  toggleAddNewVehicleOpen: () => void;
  toggleAddExisingVehicleOpen: () => void;
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
    addNewOffenderOpen,
    addExistingOffenderOpen,
    addExistingVehicleOpen,
    addNewVehicleOpen,
    toggleAddExisingVehicleOpen,
    toggleAddExistingOffenderOpen,
    toggleAddNewVehicleOpen,
    toggleAddNewOffenderOpen,
  };
};

export default useProfiles;
