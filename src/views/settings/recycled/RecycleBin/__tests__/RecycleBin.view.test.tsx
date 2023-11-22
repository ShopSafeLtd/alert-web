import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import RecycledItemList from '../RecycleBin.view';

describe('List Officer View', () => {
  const data = {
    recycledItems: [
      {
        id: 'testId',
        deletedAt: new Date('2022-07-25T08:57:55.299Z'),
        expiresAt: new Date('2022-07-25T08:57:55.299Z'),
        systemTask: false,
        scheme: { id: 'schemeId' },
        offender: null,
        deletedBy: {
          id: 'userId',
          fullName: 'Ying Luo',
          businesses: [{ name: 'test business', id: 'test' }],
        },
        incident: {
          id: 'incidentId',
          date: new Date('2022-07-25T08:57:55.299Z'),
          recycled: true,
          subject: 'test subject',
          location: null,
          createdBy: {
            fullName: 'test createBy',
            id: 'cl4pe3eu91312371op4c4k2lih2',
            businesses: [{ name: 'test business', id: 'test' }],
          },
        },
      },
    ],
  };
  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <RecycledItemList
          //  @ts-ignore TODO fix
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
