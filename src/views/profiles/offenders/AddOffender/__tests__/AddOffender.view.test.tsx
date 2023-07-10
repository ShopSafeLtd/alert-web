import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Form } from 'antd';
import AddOffender from '../AddOffender.view';

describe('List Officer View', () => {
  const FormWrapper = () => {
    const [form] = Form.useForm();

    return (
      <AddOffender
        editImage={null}
        onEditImage={jest.fn()}
        toggleEditImage={jest.fn()}
        updateExclusion={jest.fn()}
        adminRights={false}
        key={0}
        onSubmit={jest.fn()}
        saving={false}
        groups={[]}
        groupsLoading={false}
        tags={[]}
        tagsLoading={false}
        imgChange={jest.fn()}
        beforeUpload={jest.fn()}
        fileList={[]}
        addOffenderTag={false}
        toggleAddOffenderTag={jest.fn()}
        addExclusion={false}
        toggleAddExclusion={jest.fn()}
        editExclusion={false}
        toggleEditExclusion={jest.fn()}
        banData={null}
        setBanData={jest.fn()}
        deleteConfirm={jest.fn()}
        ageCheck={false}
        setAgeCheck={jest.fn()}
        bansData={[]}
        crimeGroupsData={[]}
        listVehiclesData={{ listVehicles: { total: 0, vehicles: [] } }}
        vehiclesData={[]}
        idVerified
        onValuesChange={jest.fn()}
        onAddCrimeGroup={jest.fn()}
        onAddVehicle={jest.fn()}
        onRemoveCrimeGroup={jest.fn()}
        onRemoveImage={jest.fn()}
        onRemoveVehicle={jest.fn()}
        primaryImage="primaryImage"
        setPrimaryImage={jest.fn()}
        form={form}
        customGalleries={[]}
        customGalleriesLoading={false}
        addCustomGallery={false}
        toggleAddCustomGallery={jest.fn()}
        updateNewCustomGalleryData={jest.fn()}
        updateNewOffenderTagData={jest.fn()}
      />
    );
  };
  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <FormWrapper />
      </MemoryRouter>
    );
    expect(getByText('Offender Details')).toBeInTheDocument();
  });
});
