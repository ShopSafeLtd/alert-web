import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import AddOffender from '../AddOffender.view';

describe('List Officer View', () => {
  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <AddOffender
          updateExclusion={jest.fn()}
          adminRights={false}
          removeImage={jest.fn()}
          key={0}
          onSubmit={jest.fn()}
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
          banData={null}
          setBanData={jest.fn()}
          deleteConfirm={jest.fn()}
          ageCheck={false}
          setAgeCheck={jest.fn()}
          bansData={[]}
        />
      </MemoryRouter>
    );
    expect(getByText('Offender Details')).toBeInTheDocument();
  });
});
