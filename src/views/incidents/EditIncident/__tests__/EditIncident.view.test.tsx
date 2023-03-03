import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import EditIncident from '../EditIncident.view';
import { ViewIncidentQuery } from '../../../../graphql/generated';

describe('List Officer View', () => {
  const data: ViewIncidentQuery = {
    incident: {
      value: 0,
      policeInvolved: false,
      policeRef: null,
      reference: null,
      policeReported: false,
      subscribed: false,
      updates: [],
      recoveredValue: 0,
      id: 'incidentId',
      subject: 'test subject ',
      business: {
        id: 'test',
        name: 'shopsafe',
      },
      approved: null,
      date: '2022-08-10T10:40:06.191Z',
      time: '2022-08-11T10:40:09.985Z',
      dayTime: '11:40 - Wed 10, Aug 22',
      description: 'test description',
      createdBy: {
        fullName: 'aaa',
        id: 'cl4pe3eu91312371op4c4k2lih2',
        businesses: [{ name: 'test business', id: '' }],
      },
      crimeTypes: [
        { id: 'ckdhdhmr500186mnyy5k9sunm', name: 'Theft & Handling' },
      ],
      groups: [{ id: 'ckqtnb4r056540229myw4yk8zvq', name: 'NightSafe' }],
      images: [
        { id: 'cl6owsuzo33227f9pe9zk4wone', optimised: null, url: null },
      ],
      offenders: [],
      crimeGroups: [],
      vehicles: [],
    },
  };

  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <EditIncident
          updateOffender={jest.fn()}
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
          fileList={[]}
          beforeUpload={jest.fn()}
          addIncidentTag={false}
          toggleAddIncidentTag={jest.fn()}
          updateIncidentTag={jest.fn()}
          addOffender={false}
          toggleAddOffender={jest.fn()}
          addExistingOffender={false}
          toggleAddExistingOffender={jest.fn()}
          offendersData={[]}
          reviewed={false}
          onReject={jest.fn()}
          addRecentOffender={null}
          assignOffendersToImages={jest.fn()}
          listOffendersData={undefined}
          newImage={null}
          offenderImgChange={jest.fn()}
          onCancelNewImage={jest.fn()}
          recentOffenderData={undefined}
          recentOffenderLoading={false}
          removeImage={jest.fn()}
          removeImageFromOffender={jest.fn()}
          removeOffender={jest.fn()}
          searchOffenders=""
          setAddRecentOffender={jest.fn()}
          setAssignToImage={jest.fn()}
          setSearchOffenders={jest.fn()}
          addExistingCrimeGroup
          addExistingVehicle
          addNewCrimeGroup
          addNewVehicle
          crimeGroupsData={[]}
          editCrimeGroupId="test"
          editOffenderId="test"
          editVehicleId="test"
          listCrimeGroupsData={{
            listCrimeGroups: { crimeGroups: [], total: 0 },
          }}
          listVehiclesData={{ listVehicles: { total: 0, vehicles: [] } }}
          removeCrimeGroup={jest.fn()}
          removeVehicle={jest.fn()}
          setEditCrimeGroupId={jest.fn()}
          setEditOffenderId={jest.fn()}
          setEditVehicleId={jest.fn()}
          toggleAddExistingCrimeGroup={jest.fn()}
          toggleAddExistingVehicle={jest.fn()}
          toggleAddNewCrimeGroup={jest.fn()}
          toggleAddNewVehicle={jest.fn()}
          updateCrimeGroupsData={jest.fn()}
          updateOffendersData={jest.fn()}
          updateVehiclesData={jest.fn()}
          onSearchBusiness={jest.fn()}
          vehiclesData={[]}
        />
      </MemoryRouter>
    );
    expect(getByText('Edit Incident')).toBeInTheDocument();
  });
});
