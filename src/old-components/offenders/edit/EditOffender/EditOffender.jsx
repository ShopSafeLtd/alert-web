import React from "react";
import { useParams } from "react-router-dom";

import EditDesktop from "../desktop/EditDesktop/EditDesktop";

const EditOffender = () => {
  const params = useParams()
  return <EditDesktop id={params.id} />;
}

export default EditOffender;
