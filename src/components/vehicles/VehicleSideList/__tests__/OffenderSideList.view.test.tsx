import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { storeModel } from 'state';
import { createStore, StoreProvider } from 'easy-peasy';
import { ImagePosition, Role, SortOrder } from 'graphql/generated';
import { MockedProvider } from '@apollo/client/testing';
import VehicleSideList from '../VehicleSideList.view';

describe('Detail Officer View', () => {
  const store = createStore(storeModel, {
    initialState: {
      scheme: {
        id: 'schemeId',
      },
      user: {
        role: Role.User,
        groups: [{ id: 'ckqtnb4r056540229myw4yk8zvq', name: 'NightSafe' }],
      },
      data: {
        Vehicles: {
          pagination: { page: 1, pageSize: 1, sizeOptions: [] },
          variables: {
            where: {
              schemes: {
                some: {
                  id: {
                    equals: 'schemeId',
                  },
                },
              },
            },
            order: SortOrder.Desc,
          },
        },
      },
    },
    mockActions: true,
  });
  const data = {
    total: 1,
    vehicles: [
      {
        totalCrimeGroups: 0,
        totalOffenders: 0,
        totalIncidents: 0,
        totalImages: 0,
        id: 'vehicleId',
        createdAt: new Date('2022-07-25T08:57:55.299Z'),
        updatedAt: new Date('2022-07-25T08:57:55.299Z'),
        createdBy: {
          fullName: 'aaa',
          id: 'cl4pe3eu91312371op4c4k2lih2',
          businesses: [{ name: 'user business', id: '' }],
        },
        groups: [{ id: 'ckqtnb4r056540229myw4yk8zvq', name: 'NightSafe' }],
        images: [
          {
            id: 'cl6owsuzo33227f9pe9zk4wone',
            optimised: null,
            url: null,
            position: ImagePosition.CenterCenter,
            rotation: 0,
          },
        ],
        incidents: [],
        offenders: [],
        crimeGroup: [],
      },
    ],
  };
  it('renders the page', () => {
    const { getByText } = render(
      <StoreProvider store={store}>
        <MemoryRouter>
          <MockedProvider mocks={[]} addTypename={false}>
            <VehicleSideList next={jest.fn()} data={data} loading={false} />
          </MockedProvider>
        </MemoryRouter>
      </StoreProvider>
    );

    expect(getByText('vehicle name')).toBeInTheDocument();
  });
});
