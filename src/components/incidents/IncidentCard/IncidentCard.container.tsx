import React from "react";
import { IncidentFeedQuery } from "graphql/generated";
import View from "./IncidentCard.view";
import useIncidentCard from "./useIncidentCard";

interface Props {
  incident: Exclude<IncidentFeedQuery["incidentFeed"], undefined | null>[0];
  openLightbox: (elements: { src: string }[], index: number) => void;
}

const IncidentCard = ({ incident, openLightbox }: Props) => {
  const { approvalRights, deleteRights, menuRights, onDelete } =
    useIncidentCard({
      createdById: incident?.createdBy.id,
    });

  return (
    <View
      approvalRights={approvalRights}
      deleteRights={deleteRights}
      menuRights={menuRights}
      incident={incident}
      openLightbox={openLightbox}
      onDelete={onDelete}
    />
  );
};

export default IncidentCard;
