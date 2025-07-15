import type { ViewInvestigationQuery } from 'graphql/investigations/queries/__generated__/view-investigation.generated';
import type { RefObject } from 'react';
import type {
  CrimeGroupCardData,
  OffenderData,
  VehicleData,
} from 'types/DataType';

import React from 'react';

import View from './ViewDetails.view';
import useViewDetails from './useViewDetails';

interface Props {
  componentRef: RefObject<HTMLDivElement>;
  data: ViewInvestigationQuery | undefined;
  demId: null | string | undefined;
  handlePrint: () => void;
  investigationId: string;
  isPrinting: boolean;
  loading: boolean;
  onCloseInvestigation: () => void;
  onDeleteCrimeGroup: (id: string) => void;
  onDeleteDocument: (id: string) => void;
  onDeleteIncident: (id: string) => void;
  onDeleteInvestigation: () => void;
  onDeleteOffender: (id: string) => void;
  onDeleteVehicle: (id: string) => void;
  onReopenInvestigation: () => void;
  saving: boolean;
  setCompleteTodoVisible: (value: null | string) => void;
  setEditCrimeGroupData: (value: CrimeGroupCardData | null) => void;
  setEditOffenderData: (value: OffenderData | null) => void;
  setEditVehicleData: (value: VehicleData | null) => void;
  setViewTodoVisible: (value: null | string) => void;
  templatesLoading: boolean;
  toggleAddCrimeGroup: () => void;
  toggleAddDemDocument: () => void;
  toggleAddDocument: () => void;
  toggleAddExistingCrimeGroup: () => void;
  toggleAddExistingIncident: () => void;
  toggleAddExistingOffender: () => void;
  toggleAddExistingVehicle: () => void;
  toggleAddOffender: () => void;
  toggleAddTodo: () => void;
  toggleAddVehicle: () => void;
  toggleEditInvestigation: () => void;
  toggleSubscribe: () => void;
}

const ViewDetails = ({
  componentRef,
  data,
  demId,
  handlePrint,
  investigationId,
  isPrinting,
  loading,
  onCloseInvestigation,
  onDeleteCrimeGroup,
  onDeleteDocument,
  onDeleteIncident,
  onDeleteInvestigation,
  onDeleteOffender,
  onDeleteVehicle,
  onReopenInvestigation,
  saving,
  setCompleteTodoVisible,
  setEditCrimeGroupData,
  setEditOffenderData,
  setEditVehicleData,
  setViewTodoVisible,
  templatesLoading,
  toggleAddCrimeGroup,
  toggleAddDemDocument,
  toggleAddDocument,
  toggleAddExistingCrimeGroup,
  toggleAddExistingIncident,
  toggleAddExistingOffender,
  toggleAddExistingVehicle,
  toggleAddOffender,
  toggleAddTodo,
  toggleAddVehicle,
  toggleEditInvestigation,
  toggleSubscribe,
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
      _setCompleteTodoVisible={setCompleteTodoVisible}
      _setEditOffenderData={setEditOffenderData}
      _setEditVehicleData={setEditVehicleData}
      _templatesLoading={templatesLoading}
      _toggleAddTodo={toggleAddTodo}
      componentRef={componentRef}
      confirmDeleteUpdate={confirmDeleteUpdate}
      data={data}
      demId={demId}
      editIncidentId={editIncidentId}
      editRights={editRights}
      editUpdate={editUpdate}
      editUpdateInput={editUpdateInput}
      handleConnectIncident={handleConnectIncident}
      handleConnectOffender={handleConnectOffender}
      handleConnectVehicle={handleConnectVehicle}
      handleEditUpdate={handleEditUpdate}
      handlePrint={handlePrint}
      investigationId={investigationId}
      isPrinting={isPrinting}
      loadMore={loadMore}
      loading={loading}
      onCloseInvestigation={onCloseInvestigation}
      onDeleteCrimeGroup={onDeleteCrimeGroup}
      onDeleteDocument={onDeleteDocument}
      onDeleteIncident={onDeleteIncident}
      onDeleteInvestigation={onDeleteInvestigation}
      onDeleteOffender={onDeleteOffender}
      onDeleteVehicle={onDeleteVehicle}
      onReopenInvestigation={onReopenInvestigation}
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
      toggleAddDemDocument={toggleAddDemDocument}
      toggleAddDocument={toggleAddDocument}
      toggleAddExistingCrimeGroup={toggleAddExistingCrimeGroup}
      toggleAddExistingIncident={toggleAddExistingIncident}
      toggleAddExistingOffender={toggleAddExistingOffender}
      toggleAddExistingVehicle={toggleAddExistingVehicle}
      toggleAddOffender={toggleAddOffender}
      toggleAddTodo={toggleAddTodo}
      toggleAddVehicle={toggleAddVehicle}
      toggleEditInvestigation={toggleEditInvestigation}
      toggleSubscribe={toggleSubscribe}
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
