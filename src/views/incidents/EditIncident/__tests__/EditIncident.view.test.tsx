import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import EditIncident from '../EditIncident.view';
import type { ViewIncidentQuery } from '../../../../graphql/generated';

describe('List Officer View', () => {
  const data: ViewIncidentQuery = {
    incident: {
      policeInvolved: false,
      policeRef: null,
      impactTags: [],
      involvedTags: [],
      policeNo: null,
      reference: null,
      policeReported: false,
      subscribed: false,
      updates: [],
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
      totalRecoveredValue: 0,
      totalValue: 0,
      incidentItems: [],
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
          offendersData={[]}
          reviewed={false}
          onReject={jest.fn()}
          addRecentOffender={null}
          assignOffendersToImages={jest.fn()}
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
          crimeGroupsData={[]}
          removeCrimeGroup={jest.fn()}
          removeVehicle={jest.fn()}
          updateCrimeGroupsData={jest.fn()}
          updateOffendersData={jest.fn()}
          updateVehiclesData={jest.fn()}
          onSearchBusiness={jest.fn()}
          vehiclesData={[]}
          goodsTypesData={{ listGoodsTypes: { goodsTypes: [], total: 0 } }}
        />
      </MemoryRouter>
    );
    expect(getByText('Edit Incident')).toBeInTheDocument();
  });
});
