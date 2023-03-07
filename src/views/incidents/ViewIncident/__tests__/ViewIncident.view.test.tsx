import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Role, ViewIncidentQuery } from 'graphql/generated';
import { createStore, StoreProvider } from 'easy-peasy';
import { IncidentSort, storeModel } from 'state';
import { MockedProvider } from '@apollo/client/testing';
import ViewIncident from '../ViewIncident.view';

describe('Detail Officer View', () => {
  const store = createStore(storeModel, {
    initialState: {
      id: 'offenderId',
      user: { role: Role.User },
      scheme: {
        id: 'schemeId',
      },
      data: {
        incidents: {
          pagination: { page: 1, pageSize: 1, sizeOptions: [] },
          variables: {
            groups: [{ id: 'ckqtnb4r056540229myw4yk8zvq', name: 'NightSafe' }],
            crimeTypes: [
              { id: 'ckdhdhmr500186mnyy5k9sunm', name: 'Theft & Handling ' },
            ],
          },
          order: IncidentSort.createdAtAsc,
        },
      },
    },
  });
  const data: ViewIncidentQuery = {
    incident: {
      policeInvolved: false,
      policeRef: null,
      reference: null,
      policeReported: false,
      updates: [],
      subscribed: false,
      id: 'incidentId',
      date: '2022-08-10T10:40:06.191Z',
      time: '2022-08-11T10:40:09.985Z',
      dayTime: '11:40 - Wed 10, Aug 22',
      description: 'test description',
      business: {
        id: 'test',
        name: 'shopsafe',
      },
      subject: 'test subject ',
      approved: null,
      createdBy: {
        fullName: 'aaa',
        id: 'cl4pe3eu91312371op4c4k2lih2',
        businesses: [{ name: 'test business', id: '' }],
      },
      crimeTypes: [
        { id: 'ckdhdhmr500186mnyy5k9sunm', name: 'Theft & Handling ' },
      ],
      groups: [{ id: 'ckqtnb4r056540229myw4yk8zvq', name: 'NightSafe' }],
      images: [
        { id: 'cl6owsuzo33227f9pe9zk4wone', optimised: null, url: null },
      ],
      offenders: [],
      crimeGroups: [],
      vehicles: [],
      incidentItems: [],
      totalRecoveredValue: 0,
      totalValue: 0,
    },
  };
  it('renders the page', () => {
    const { getByText } = render(
      <StoreProvider store={store}>
        <MemoryRouter>
          <MockedProvider mocks={[]} addTypename={false}>
            <ViewIncident
              lightBoxOpen={{
                open: false,
                index: 0,
              }}
              data={data}
              loading={false}
              saving={false}
              openLightbox={jest.fn()}
              incidentId=""
              deleteRights={false}
              editRights={false}
              linkOffender={false}
              toggleLinkOffender={jest.fn()}
              updateOffendersList={jest.fn()}
              scrolledToTop={jest.fn()}
              loadMore={false}
              userId=""
              replyTo={null}
              setReplyTo={jest.fn()}
              confirmUpdateImages={jest.fn()}
              addUpdateImages={jest.fn()}
              addImages={null}
              closeAddImages={jest.fn()}
              toggleSubscribe={jest.fn()}
              toggleSelectImages={jest.fn()}
              selectedImages={[]}
              confirmDeleteUpdate={jest.fn()}
              editUpdate={null}
              setEditUpdate={jest.fn()}
              handleEditUpdate={jest.fn()}
              editUpdateInput=""
              setEditUpdateInput={jest.fn()}
              optionMenuItems={[]}
              lightboxElements={[]}
            />
          </MockedProvider>
        </MemoryRouter>
      </StoreProvider>
    );
    expect(getByText('test description')).toBeInTheDocument();
  });
});
