import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import RecycledItemList from '../RecycleBin.view';

describe('List Officer View', () => {
  const data = {
    recycledItems: [
      {
        id: 'testId',
        deletedAt: '2022-07-25T08:57:55.299Z',
        expiresAt: '2022-07-25T08:57:55.299Z',
        systemTask: false,
        scheme: { id: 'schemeId' },
        offender: null,
        deletedBy: {
          id: 'userId',
          fullName: 'Ying Luo',
          organisation: 'ShopSafe',
        },
        incident: {
          id: 'incidentId',
          date: '2022-08-01T16:44:33.355Z',
          recycled: true,
          subject: 'test subject',
          location: null,
          createdBy: {
            fullName: 'test createBy',
            id: 'cl4pe3eu91312371op4c4k2lih2',
            organisation: 'ShopSafe',
          },
        },
      },
    ],
  };
  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <RecycledItemList
          data={data}
          loading={false}
          saving={false}
          currentId=""
          setCurrentId={jest.fn()}
          recycledId=""
          setRecycledId={jest.fn()}
          toggleRestore={jest.fn()}
          restoreIncident={false}
          toggleRestoreIncident={jest.fn()}
          updateRestoreIncident={jest.fn()}
          updateDeleteIncident={jest.fn()}
          restoreOffender={false}
          toggleRestoreOffender={jest.fn()}
          updateRestoreOffender={jest.fn()}
          updateDeleteOffender={jest.fn()}
        />
      </MemoryRouter>
    );
    expect(getByText('test subject')).toBeInTheDocument();
  });
});
