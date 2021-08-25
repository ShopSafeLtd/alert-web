import React, { useState, useEffect } from "react";

import ExistingOffenderQuery from "../ExistingOffenders/ExistingOffenders";

const ExistingOffenderPopover = ({
  open,
  close,
  existingsOffenders,
  addExistingOffenders,
  userId,
}) => {
  const [selected, setSelected] = useState(existingsOffenders || []);
  const [currentOffender, setCurrentOffender] = useState("");

  useEffect(() => {
    if (!existingsOffenders) return;
    setSelected((prev) => {
      if (!prev) return [...existingsOffenders];
      return [...new Set([...prev, ...existingsOffenders])];
    });
  }, [existingsOffenders]);

  const handleClose = () => {
    setSelected([]);
    close();
  };

  return (
    <ExistingOffenderQuery
      setCurrentOffender={setCurrentOffender}
      current={currentOffender}
      existingOffenders={existingsOffenders}
      addExistingOffenders={addExistingOffenders}
      selected={selected}
      userId={userId}
      close={handleClose}
      open={open}
    />
  );
};

export default ExistingOffenderPopover;
