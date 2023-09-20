import React from 'react';
import type {
  CrimeGroupCardData,
  OffenderData,
  VehicleData,
} from 'types/DataType';
import View from './ViewDetails.view';
import useViewDetails from './useViewDetails';
import type { ViewInvestigationQuery } from '../../../../../graphql/generated';

interface Props {
  investigationId: string;
  toggleAddOffender: () => void;
  toggleAddExistingOffender: () => void;
  setEditOffenderData: (value: OffenderData | null) => void;
  onDeleteOffender: (id: string) => void;
  toggleAddVehicle: () => void;
  toggleAddExistingVehicle: () => void;
  setEditVehicleData: (value: VehicleData | null) => void;
  onDeleteVehicle: (id: string) => void;
  toggleAddCrimeGroup: () => void;
  toggleAddExistingCrimeGroup: () => void;
  setEditCrimeGroupData: (value: CrimeGroupCardData | null) => void;
  onDeleteCrimeGroup: (id: string) => void;
  toggleAddExistingIncident: () => void;
  onDeleteIncident: (id: string) => void;
  templatesLoading: boolean;
  toggleAddTodo: () => void;
  setViewTodoVisible: (value: string | null) => void;
  setCompleteTodoVisible: (value: string | null) => void;
  saving: boolean;
  data: ViewInvestigationQuery | undefined;
  loading: boolean;
}

const ViewDetails = ({
  investigationId,
  toggleAddOffender,
  toggleAddExistingOffender,
  setEditOffenderData,
  onDeleteOffender,
  toggleAddVehicle,
  toggleAddExistingVehicle,
  setEditVehicleData,
  onDeleteVehicle,
  toggleAddCrimeGroup,
  toggleAddExistingCrimeGroup,
  setEditCrimeGroupData,
  onDeleteCrimeGroup,
  toggleAddExistingIncident,
  onDeleteIncident,
  saving,
  templatesLoading,
  setViewTodoVisible,
  setCompleteTodoVisible,
  toggleAddTodo,
  data,
  loading,
}: Props) => {
  const {
    scrolledToTop,
    loadMore,
    userId,
    editRights,
    setEditUpdate,
    confirmDeleteUpdate,
    replyTo,
    setReplyTo,
    handleEditUpdate,
    setEditUpdateInput,
    editUpdateInput,
    editUpdate,
    optionRowShow,
    setOptionRowShow,
    suggestedData,
    toggleViewSuggestedOffenders,
    viewSuggestedOffenders,
    handleConnectIncident,
    handleConnectOffender,
    handleConnectVehicle,
    toggleViewSuggestedIncidents,
    toggleViewSuggestedVehicles,
    viewSuggestedIncidents,
    viewSuggestedVehicles,
    editIncidentId,
    setEditIncidentId,
  } = useViewDetails({
    investigationId,
  });

  return (
    <View
      handleEditUpdate={handleEditUpdate}
      confirmDeleteUpdate={confirmDeleteUpdate}
      setEditUpdate={setEditUpdate}
      editRights={editRights}
      saving={saving}
      userId={userId}
      replyTo={replyTo}
      setReplyTo={setReplyTo}
      loadMore={loadMore}
      scrolledToTop={scrolledToTop}
      data={data}
      loading={loading}
      investigationId={investigationId}
      editUpdateInput={editUpdateInput}
      setEditUpdateInput={setEditUpdateInput}
      editUpdate={editUpdate}
      toggleAddOffender={toggleAddOffender}
      toggleAddExistingOffender={toggleAddExistingOffender}
      setEditOffenderData={setEditOffenderData}
      onDeleteOffender={onDeleteOffender}
      toggleAddVehicle={toggleAddVehicle}
      toggleAddExistingVehicle={toggleAddExistingVehicle}
      setEditVehicleData={setEditVehicleData}
      onDeleteVehicle={onDeleteVehicle}
      toggleAddCrimeGroup={toggleAddCrimeGroup}
      toggleAddExistingCrimeGroup={toggleAddExistingCrimeGroup}
      setEditCrimeGroupData={setEditCrimeGroupData}
      onDeleteCrimeGroup={onDeleteCrimeGroup}
      toggleAddExistingIncident={toggleAddExistingIncident}
      onDeleteIncident={onDeleteIncident}
      optionRowShow={optionRowShow}
      setOptionRowShow={setOptionRowShow}
      suggestedData={suggestedData}
      toggleViewSuggestedOffenders={toggleViewSuggestedOffenders}
      viewSuggestedOffenders={viewSuggestedOffenders}
      handleConnectIncident={handleConnectIncident}
      handleConnectOffender={handleConnectOffender}
      handleConnectVehicle={handleConnectVehicle}
      toggleViewSuggestedIncidents={toggleViewSuggestedIncidents}
      toggleViewSuggestedVehicles={toggleViewSuggestedVehicles}
      viewSuggestedIncidents={viewSuggestedIncidents}
      viewSuggestedVehicles={viewSuggestedVehicles}
      templatesLoading={templatesLoading}
      setViewTodoVisible={setViewTodoVisible}
      setCompleteTodoVisible={setCompleteTodoVisible}
      toggleAddTodo={toggleAddTodo}
      editIncidentId={editIncidentId}
      setEditIncidentId={setEditIncidentId}
    />
  );
};

export default ViewDetails;
