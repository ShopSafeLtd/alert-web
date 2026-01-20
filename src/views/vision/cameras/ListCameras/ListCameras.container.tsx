import ListCamerasView from '#/views/vision/cameras/ListCameras/ListCameras.view';
import useListCameras from '#/views/vision/cameras/ListCameras/useListCameras';
import React from 'react';

const ListCamerasContainer = () => {
  const {
    data,
    defaultTimeout,
    drawerVisible,
    form,
    handleDrawerClose,
    handleEditClick,
    handleFormSubmit,
    loading,
    loadingDefault,
    onPageChange,
    onUpdateDefaultTimeout,
    page,
    pageSize,
    search,
    setDrawerVisible,
    setSearch,
    submitting,
    total,
  } = useListCameras();
  return (
    <ListCamerasView
      data={data}
      defaultTimeout={defaultTimeout}
      drawerVisible={drawerVisible}
      form={form}
      handleDrawerClose={handleDrawerClose}
      handleEditClick={handleEditClick}
      handleFormSubmit={handleFormSubmit}
      loading={loading}
      loadingDefault={loadingDefault}
      onPageChange={onPageChange}
      onUpdateDefaultTimeout={onUpdateDefaultTimeout}
      page={page}
      pageSize={pageSize}
      search={search}
      setDrawerVisible={setDrawerVisible}
      setSearch={setSearch}
      submitting={submitting}
      total={total}
    />
  );
};

export default ListCamerasContainer;
