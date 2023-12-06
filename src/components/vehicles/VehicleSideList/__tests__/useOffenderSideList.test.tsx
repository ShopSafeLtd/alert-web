import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createStore, StoreProvider } from 'easy-peasy';
import { storeModel } from 'state/store';
import { MemoryRouter } from 'react-router-dom';
import {
  ImagePosition,
  ListVehiclesDocument,
  SortOrder,
} from 'graphql/generated';
import useVehicleSideList from '../useVehicleSideList';

const mocks = [
  {
    request: {
      query: ListVehiclesDocument,
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
        order: {
          updatedAt: SortOrder.Desc,
        },
        take: 1,
        skip: 0,
      },
    },
    result: {
      data: {
        listVehicles: {
          total: 1,
          vehicles: [
            {
              id: 'vehicleId',

              createdAt: new Date('2022-07-25T08:57:55.299Z'),
              updatedAt: new Date('2022-07-25T08:57:55.299Z'),
              createdBy: {
                fullName: 'aaa',
                id: 'cl4pe3eu91312371op4c4k2lih2',
                businesses: [{ name: 'user business', id: '' }],
              },
              groups: [
                { id: 'ckqtnb4r056540229myw4yk8zvq', name: 'NightSafe' },
              ],
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
              reference: 'reference',
            },
          ],
        },
        take: 1,
        skip: 0,
      },
    },
  },
];

const UseVehicleSideListTest = () => {
  const { data } = useVehicleSideList();
  const ListVehicles =
    data &&
    data.vehicles?.map((el) => (
      <div key={el.id}>
        <span>{el.id}</span>
        <span>{el.reference}</span>
      </div>
    ));

  return <div>{ListVehicles}</div>;
};

describe('useVehicleSideList - hook', () => {
  const store = createStore(storeModel, {
    initialState: {
      data: {
        vehicles: {
          pagination: { page: 1, pageSize: 1, sizeOptions: [] },
          variables: {
            search: '',
            groups: [],
            tags: [],
            order: SortOrder.Desc,
          },
        },
      },
    },
    mockActions: true,
  });

  it('returns the expected values', async () => {
    const { findByText } = render(
      <StoreProvider store={store}>
        <MemoryRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <UseVehicleSideListTest />
          </MockedProvider>
        </MemoryRouter>
      </StoreProvider>
    );

    expect(await findByText('reference')).toBeInTheDocument();
  });
});
