import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createStore, StoreProvider } from 'easy-peasy';
import { Role } from 'graphql/generated';
import { storeModel } from 'state/store';

import { OffenderSort } from 'state';
import { MockedProvider } from '@apollo/client/testing';
import ViewOffender from '../ViewOffender.view';

describe('Detail Officer View', () => {
  const store = createStore(storeModel, {
    initialState: {
      id: 'offenderId',
      user: { role: Role.User },
      scheme: {
        id: 'schemeId',
      },
      data: {
        offenders: {
          pagination: { page: 1, pageSize: 1, sizeOptions: [] },
          variables: {
            groups: [{ id: 'ckqtnb4r056540229myw4yk8zvq', name: 'NightSafe' }],
            crimeTypes: [
              { id: 'ckdhdhmr500186mnyy5k9sunm', name: 'Theft & Handling ' },
            ],
          },
          order: OffenderSort.updatedAtDesc,
        },
      },
    },
  });
  const data = {
    offender: {
      id: 'offenderId',
      createdAt: '2022-08-10T10:40:06.191Z',
      updatedAt: '2022-08-11T10:40:09.985Z',
      createdBy: {
        fullName: 'aaa',
        id: 'cl4pe3eu91312371op4c4k2lih2',
        organisation: 'ShopSafe',
      },
      tags: [{ id: 'ckdhdhmr500186mnyy5k9sunm', name: 'Theft & Handling ' }],
      groups: [{ id: 'ckqtnb4r056540229myw4yk8zvq', name: 'NightSafe' }],
      images: [{ id: 'cl6owsuzo33227f9pe9zk4wone' }],
      bans: [],
      incidents: [],
    },
  };
  it('renders the page', () => {
    const { getByText } = render(
      <StoreProvider store={store}>
        <MemoryRouter>
          <MockedProvider mocks={[]} addTypename={false}>
            <ViewOffender
              data={data}
              loading={false}
              saving={false}
              openLightbox={jest.fn()}
              addIncidentRights={false}
              offenderId="offenderId"
              deleteRights={false}
              editRights={false}
              onDelete={jest.fn()}
              addExistingIncident={false}
              toggleAddExistingIncident={jest.fn()}
              updateIncidentList={jest.fn()}
            />
          </MockedProvider>
        </MemoryRouter>
      </StoreProvider>
    );
    expect(getByText('Last updated')).toBeInTheDocument();
  });
});
