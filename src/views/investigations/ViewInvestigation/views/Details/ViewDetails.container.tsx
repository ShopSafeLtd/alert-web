import type { ViewInvestigationQuery } from 'graphql/investigations/queries/__generated__/view-investigation.generated';
import type {
  CrimeGroupCardData,
  OffenderData,
  VehicleData,
} from 'types/DataType';

import React from 'react';

import View from './ViewDetails.view';
import useViewDetails from './useViewDetails';

interface Props {
  data: ViewInvestigationQuery | undefined;
  investigationId: string;
  loading: boolean;
  onDeleteCrimeGroup: (id: string) => void;
  onDeleteIncident: (id: string) => void;
  onDeleteOffender: (id: string) => void;
  onDeleteVehicle: (id: string) => void;
  saving: boolean;
  setCompleteTodoVisible: (value: null | string) => void;
  setEditCrimeGroupData: (value: CrimeGroupCardData | null) => void;
  setEditOffenderData: (value: OffenderData | null) => void;
  setEditVehicleData: (value: VehicleData | null) => void;
  setViewTodoVisible: (value: null | string) => void;
  templatesLoading: boolean;
  toggleAddCrimeGroup: () => void;
  toggleAddExistingCrimeGroup: () => void;
  toggleAddExistingIncident: () => void;
  toggleAddExistingOffender: () => void;
  toggleAddExistingVehicle: () => void;
  toggleAddOffender: () => void;
  toggleAddTodo: () => void;
  toggleAddVehicle: () => void;
  toggleEditInvestigation: () => void;
}

const ViewDetails = ({
  data,
  investigationId,
  loading,
  onDeleteCrimeGroup,
  onDeleteIncident,
  onDeleteOffender,
  onDeleteVehicle,
  saving,
  setCompleteTodoVisible,
  setEditCrimeGroupData,
  setEditOffenderData,
  setEditVehicleData,
  setViewTodoVisible,
  templatesLoading,
  toggleAddCrimeGroup,
  toggleAddExistingCrimeGroup,
  toggleAddExistingIncident,
  toggleAddExistingOffender,
  toggleAddExistingVehicle,
  toggleAddOffender,
  toggleAddTodo,
  toggleAddVehicle,
  toggleEditInvestigation,
}: Props) => {
  const {
    confirmDeleteUpdate,
    editIncidentId,
    editRights,
    editUpdate,
    editUpdateInput,
    handleConnectIncident,
    handleConnectOffender,
    handleConnectVehicle,
    handleEditUpdate,
    loadMore,
    optionRowShow,
    replyTo,
    scrolledToTop,
    setEditIncidentId,
    setEditUpdate,
    setEditUpdateInput,
    setOptionRowShow,
    setReplyTo,
    suggestedData,
    toggleViewSuggestedIncidents,
    toggleViewSuggestedOffenders,
    toggleViewSuggestedVehicles,
    userId,
    viewSuggestedIncidents,
    viewSuggestedOffenders,
    viewSuggestedVehicles,
  } = useViewDetails({
    investigationId,
  });

  return (
    <View
      confirmDeleteUpdate={confirmDeleteUpdate}
      data={data}
      editIncidentId={editIncidentId}
      editRights={editRights}
      editUpdate={editUpdate}
      editUpdateInput={editUpdateInput}
      handleConnectIncident={handleConnectIncident}
      handleConnectOffender={handleConnectOffender}
      handleConnectVehicle={handleConnectVehicle}
      handleEditUpdate={handleEditUpdate}
      investigationId={investigationId}
      loadMore={loadMore}
      loading={loading}
      onDeleteCrimeGroup={onDeleteCrimeGroup}
      onDeleteIncident={onDeleteIncident}
      onDeleteOffender={onDeleteOffender}
      onDeleteVehicle={onDeleteVehicle}
      optionRowShow={optionRowShow}
      replyTo={replyTo}
      saving={saving}
      scrolledToTop={scrolledToTop}
      setCompleteTodoVisible={setCompleteTodoVisible}
      setEditCrimeGroupData={setEditCrimeGroupData}
      setEditIncidentId={setEditIncidentId}
      setEditOffenderData={setEditOffenderData}
      setEditUpdate={setEditUpdate}
      setEditUpdateInput={setEditUpdateInput}
      setEditVehicleData={setEditVehicleData}
      setOptionRowShow={setOptionRowShow}
      setReplyTo={setReplyTo}
      setViewTodoVisible={setViewTodoVisible}
      suggestedData={suggestedData}
      templatesLoading={templatesLoading}
      toggleAddCrimeGroup={toggleAddCrimeGroup}
      toggleAddExistingCrimeGroup={toggleAddExistingCrimeGroup}
      toggleAddExistingIncident={toggleAddExistingIncident}
      toggleAddExistingOffender={toggleAddExistingOffender}
      toggleAddExistingVehicle={toggleAddExistingVehicle}
      toggleAddOffender={toggleAddOffender}
      toggleAddTodo={toggleAddTodo}
      toggleAddVehicle={toggleAddVehicle}
      toggleEditInvestigation={toggleEditInvestigation}
      toggleViewSuggestedIncidents={toggleViewSuggestedIncidents}
      toggleViewSuggestedOffenders={toggleViewSuggestedOffenders}
      toggleViewSuggestedVehicles={toggleViewSuggestedVehicles}
      userId={userId}
      viewSuggestedIncidents={viewSuggestedIncidents}
      viewSuggestedOffenders={viewSuggestedOffenders}
      viewSuggestedVehicles={viewSuggestedVehicles}
    />
  );
};

export default ViewDetails;
