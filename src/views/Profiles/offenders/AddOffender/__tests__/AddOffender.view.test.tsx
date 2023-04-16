import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import AddOffender from '../AddOffender.view';

describe('List Officer View', () => {
  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <AddOffender
          setSelectedItems={jest.fn()}
          selectedItems={[]}
          editImage={null}
          onEditImage={jest.fn()}
          toggleEditImage={jest.fn()}
          form={undefined}
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
          onPreview={jest.fn()}
          beforeUpload={jest.fn()}
          fileList={[]}
          addOffenderTag={false}
          toggleAddOffenderTag={jest.fn()}
          updateOffenderTag={jest.fn()}
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
          onEditVehicle={jest.fn()}
          onRemoveCrimeGroup={jest.fn()}
          onRemoveImage={jest.fn()}
          onRemoveVehicle={jest.fn()}
        />
      </MemoryRouter>
    );
    expect(getByText('Offender Details')).toBeInTheDocument();
  });
});
