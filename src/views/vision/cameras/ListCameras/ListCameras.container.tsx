import ListCamerasView from '#/views/vision/cameras/ListCameras/ListCameras.view';
import useListCameras from '#/views/vision/cameras/ListCameras/useListCameras';

const ListCamerasContainer = () => {
  const {
    data,
    loading,
    search,
    setSearch,
    page,
    pageSize,
    total,
    onPageChange,
    defaultTimeout,
    loadingDefault,
    onUpdateDefaultTimeout,
    drawerVisible,
    setDrawerVisible,
    form,
    submitting,
    handleEditClick,
    handleDrawerClose,
    handleFormSubmit,
  } = useListCameras();
  return (
    <ListCamerasView
      data={data}
      loading={loading}
      search={search}
      setSearch={setSearch}
      page={page}
      pageSize={pageSize}
      total={total}
      onPageChange={onPageChange}
      defaultTimeout={defaultTimeout}
      loadingDefault={loadingDefault}
      onUpdateDefaultTimeout={onUpdateDefaultTimeout}
      drawerVisible={drawerVisible}
      setDrawerVisible={setDrawerVisible}
      form={form}
      submitting={submitting}
      handleEditClick={handleEditClick}
      handleDrawerClose={handleDrawerClose}
      handleFormSubmit={handleFormSubmit}
    />
  );
};

export default ListCamerasContainer;
