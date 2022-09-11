import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Form } from 'antd';
import AddIncident from '../AddIncident.view';

describe('List Officer View', () => {
  const FormWrapper = () => {
    const [form] = Form.useForm();

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
        onPreview={jest.fn()}
        fileList={[]}
        beforeUpload={jest.fn()}
        addIncidentTag={false}
        toggleAddIncidentTag={jest.fn()}
        updateIncidentTag={jest.fn()}
        addOffender={false}
        toggleAddOffender={jest.fn()}
        addExistingOffender={false}
        toggleAddExistingOffender={jest.fn()}
        updateOffenderList={jest.fn()}
        offendersData={undefined}
        deleteConfirm={jest.fn()}
        addPreviousLocation={false}
        toggleAddPreviousLocation={jest.fn()}
        updatePreviousLocation={jest.fn()}
        addNewLocation={false}
        toggleAddNewLocation={jest.fn()}
        updateNewLocation={jest.fn()}
        form={form}
        assignImage={false}
        toggleAssignImage={jest.fn()}
        updateAssignImage={jest.fn()}
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
