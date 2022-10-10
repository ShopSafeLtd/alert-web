import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Form } from 'antd';
import AddIncident from '../AddIncident.view';

describe('List Officer View', () => {
  const FormWrapper = () => {
    const [form] = Form.useForm();
    const recentOffenderData = {
      listOffenders: {
        total: 1,
        offenders: [
          {
            id: 'incidentId',
            createdAt: '2022-08-10T10:40:06.191Z',
            updatedAt: '2022-08-11T10:40:09.985Z',
            age: null,
            build: null,
            dateOfBirth: null,
            dateSource: null,
            hair: null,
            gender: null,
            name: null,
            race: null,
            peculiarities: null,
            approved: null,
            active: null,
            createdBy: {
              fullName: 'aaa',
              id: 'cl4pe3eu91312371op4c4k2lih2',
              organisation: 'ShopSafe',
            },
            tags: [
              { id: 'ckdhdhmr500186mnyy5k9sunm', name: 'Theft & Handling ' },
            ],
            groups: [{ id: 'ckqtnb4r056540229myw4yk8zvq', name: 'NightSafe' }],
            images: [
              {
                id: 'cl6owsuzo33227f9pe9zk4wone',
                optimised: null,
              },
            ],
            bans: [],
            incidents: [],
          },
        ],
      },
    };
    const addRecentOffender = {
      id: 'offenderId',
      createdAt: '2022-08-10T10:40:06.191Z',
      updatedAt: '2022-08-11T10:40:09.985Z',
      age: null,
      build: null,
      dateOfBirth: null,
      dateSource: null,
      hair: null,
      gender: null,
      name: 'offender name',
      race: null,
      peculiarities: null,
      approved: null,
      active: null,
      createdBy: {
        fullName: 'aaa',
        id: 'cl4pe3eu91312371op4c4k2lih2',
        organisation: 'ShopSafe',
      },
      tags: [{ id: 'ckdhdhmr500186mnyy5k9sunm', name: 'Theft & Handling ' }],
      groups: [{ id: 'ckqtnb4r056540229myw4yk8zvq', name: 'NightSafe' }],
      images: [
        {
          id: 'cl6owsuzo33227f9pe9zk4wone',
          optimised: null,
          url: null,
        },
      ],
      incidents: [],
    };

    return (
      <AddIncident
        onSubmit={jest.fn()}
        saving={false}
        groups={[]}
        groupsLoading={false}
        tags={[]}
        tagsLoading={false}
        primaryAddress={undefined}
        addressLoading={false}
        imgChange={jest.fn()}
        fileList={[]}
        beforeUpload={jest.fn()}
        addIncidentTag={false}
        toggleAddIncidentTag={jest.fn()}
        updateIncidentTag={jest.fn()}
        addOffender={false}
        toggleAddOffender={jest.fn()}
        addExistingOffender={false}
        toggleAddExistingOffender={jest.fn()}
        updateOffendersList={jest.fn()}
        offendersData={[]}
        addPreviousLocation={false}
        toggleAddPreviousLocation={jest.fn()}
        updatePreviousLocation={jest.fn()}
        addNewLocation={false}
        toggleAddNewLocation={jest.fn()}
        updateNewLocation={jest.fn()}
        form={form}
        recentOffenderData={recentOffenderData}
        recentOffenderLoading={false}
        addRecentOffender={addRecentOffender}
        setAddRecentOffender={jest.fn()}
        searchOffenders=""
        setSearchOffenders={jest.fn()}
        newImage={null}
        onCancelNewImage={jest.fn()}
        assignOffendersToImages={jest.fn()}
        setAssignToImage={jest.fn()}
        removeImageFromOffender={jest.fn()}
        removeImage={jest.fn()}
        removeOffender={jest.fn()}
        adminRights={false}
        listOffendersData={recentOffenderData}
        offenderImgChange={jest.fn()}
      />
    );
  };
  it('renders the page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <FormWrapper />
      </MemoryRouter>
    );
    expect(getByText('Incident Details')).toBeInTheDocument();
  });
});
