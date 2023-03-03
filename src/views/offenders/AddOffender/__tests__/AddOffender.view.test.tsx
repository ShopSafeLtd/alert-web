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
          form={undefined}
          updateExclusion={jest.fn()}
          adminRights={false}
          removeImage={jest.fn()}
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
          addExistingCrimeGroup
          addExistingVehicle
          addNewCrimeGroup
          addNewVehicle
          crimeGroupsData={[]}
          editCrimeGroupId="test"
          editVehicleId="test"
          listCrimeGroupsData={{
            listCrimeGroups: { crimeGroups: [], total: 0 },
          }}
          listVehiclesData={{ listVehicles: { total: 0, vehicles: [] } }}
          removeCrimeGroup={jest.fn()}
          removeVehicle={jest.fn()}
          setEditCrimeGroupId={jest.fn()}
          setEditVehicleId={jest.fn()}
          toggleAddExistingCrimeGroup={jest.fn()}
          toggleAddExistingVehicle={jest.fn()}
          toggleAddNewCrimeGroup={jest.fn()}
          toggleAddNewVehicle={jest.fn()}
          updateCrimeGroupsData={jest.fn()}
          updateVehiclesData={jest.fn()}
          vehiclesData={[]}
        />
      </MemoryRouter>
    );
    expect(getByText('Offender Details')).toBeInTheDocument();
  });
});
