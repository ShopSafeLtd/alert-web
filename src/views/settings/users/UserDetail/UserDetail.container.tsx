import React from 'react';
import { useParams } from 'react-router-dom';

import View from './UserDetail.view';
import useUserDetail from './useUserDetail';

const UserDetailContainer = (): JSX.Element => {
  const userId = useParams().id || '';

  const {
    componentRef,
    data,
    deleteConfirm,
    demId,
    demLink,
    disableConfirm,
    editPassword,
    editUser,
    enableConfirm,
    handlePrint,
    inviteConfirm,
    // isOwn,
    isPrinting,
    isSessionsModalOpen,
    loading,
    saving,
    setIsSessionsModalOpen,
    setViewport,
    toggleDemLink,
    toggleEditPassword,
    toggleEditUser,
    userRole,
    viewport,
  } = useUserDetail(userId);

  return (
    <View
      componentRef={componentRef}
      data={data}
      deleteConfirm={deleteConfirm}
      demId={demId}
      demLink={demLink}
      disableConfirm={disableConfirm}
      editPassword={editPassword}
      editUser={editUser}
      enableConfirm={enableConfirm}
      handlePrint={handlePrint}
      inviteConfirm={inviteConfirm}
      // isOwn={isOwn}
      isPrinting={isPrinting}
      isSessionsModalOpen={isSessionsModalOpen}
      loading={loading}
      saving={saving}
      setIsSessionsModalOpen={setIsSessionsModalOpen}
      setViewport={setViewport}
      toggleDemLink={toggleDemLink}
      toggleEditPassword={toggleEditPassword}
      toggleEditUser={toggleEditUser}
      userRole={userRole}
      viewport={viewport}
    />
  );
};

export default UserDetailContainer;
