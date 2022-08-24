import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Role } from 'graphql/generated';
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
          order: IncidentSort.createdAtDesc,
        },
      },
    },
  });
  const data = {
    incident: {
      id: 'incidentId',
      date: '2022-08-10T10:40:06.191Z',
      time: '2022-08-11T10:40:09.985Z',
      dayTime: '11:40 - Wed 10, Aug 22',
      description: 'test description',
      location: null,
      subject: 'test subject ',
      approved: null,
      createdBy: {
        fullName: 'aaa',
        id: 'cl4pe3eu91312371op4c4k2lih2',
        organisation: 'ShopSafe',
      },
      crimeTypes: [
        { id: 'ckdhdhmr500186mnyy5k9sunm', name: 'Theft & Handling ' },
      ],
      groups: [{ id: 'ckqtnb4r056540229myw4yk8zvq', name: 'NightSafe' }],
      images: [
        { id: 'cl6owsuzo33227f9pe9zk4wone', optimised: null, url: null },
      ],
      offenders: [],
    },
  };
  it('renders the page', () => {
    const { getByText } = render(
      <StoreProvider store={store}>
        <MemoryRouter>
          <MockedProvider mocks={[]} addTypename={false}>
            <ViewIncident
              data={data}
              loading={false}
              saving={false}
              openLightbox={jest.fn()}
              addOffenderRights={false}
              incidentId=""
              deleteRights={false}
              editRights={false}
              onDelete={jest.fn()}
              addExistingOffender={false}
              toggleAddExistingOffender={jest.fn()}
              updateOffenderList={jest.fn()}
            />
          </MockedProvider>
        </MemoryRouter>
      </StoreProvider>
    );
    expect(getByText('test description')).toBeInTheDocument();
  });
});
