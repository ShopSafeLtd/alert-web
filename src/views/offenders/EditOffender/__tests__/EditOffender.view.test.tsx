import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import EditOffender from '../EditOffender.view';
import { ViewOffenderQuery } from '../../../../graphql/generated';

describe('List Officer View', () => {
  const data: ViewOffenderQuery = {
    offender: {
      updates: [],
      crimeGroups: [],
      subscribed: false,
      id: 'offenderId',
      createdAt: '2022-08-10T10:40:06.191Z',
      updatedAt: '2022-08-11T10:40:09.985Z',
      age: null,
      build: null,
      dateOfBirth: null,
      dateSource: null,
      hair: null,
      gender: null,
      name: 'offender name',
      race: null,
      peculiarities: null,
      approved: null,
      active: null,
      createdBy: {
        fullName: 'aaa',
        id: 'cl4pe3eu91312371op4c4k2lih2',
        businesses: [{ name: 'test business', id: '' }],
      },
      tags: [{ id: 'ckdhdhmr500186mnyy5k9sunm', name: 'Theft & Handling ' }],
      groups: [{ id: 'ckqtnb4r056540229myw4yk8zvq', name: 'NightSafe' }],
      images: [
        {
          id: 'cl6owsuzo33227f9pe9zk4wone',
          optimised: null,
          url: null,
        },
      ],
      incidents: [],
      bans: [],
      vehicles: [],
      idVerified: false,
      addresses: [],
    },
  };

  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <EditOffender
          selectedItems={[]}
          form={undefined}
          setSelectedItems={jest.fn()}
          adminRights
          banData={{
            id: 'ckqtnb4r056540229myw4yk8zvq',
            description: 'NightSafe',
            endDate: new Date(),
            startDate: new Date(),
            location: 'NightSafe',
            title: 'NightSafe',
          }}
          bansData={[]}
          setBanData={jest.fn()}
          onSubmit={jest.fn()}
          data={data}
          loading={false}
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
          updateExclusion={jest.fn()}
          deleteConfirm={jest.fn()}
          ageCheck={false}
          setAgeCheck={jest.fn()}
          reviewed={false}
          onReject={jest.fn()}
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
          idVerified
          onValuesChange={jest.fn()}
          addAddress
          addressesData={[]}
          editAddress=""
          onDeleteAddress={jest.fn()}
          onEditAddress={jest.fn()}
          onSubmitAddress={jest.fn()}
          toggleAddAddress={jest.fn()}
          toggleEditAddress={jest.fn()}
        />
      </MemoryRouter>
    );
    expect(getByText('Edit Offender')).toBeInTheDocument();
  });
});
