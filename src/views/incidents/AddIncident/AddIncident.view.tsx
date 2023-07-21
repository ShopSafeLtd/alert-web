/* eslint-disable react/jsx-props-no-spreading,@typescript-eslint/no-unsafe-member-access,formatjs/no-literal-string-in-jsx */
import React from 'react';
import type {
  AddressesQuery,
  CreateTagMutation,
  ListOffendersQuery,
} from 'graphql/generated';
import { IncidentFormField } from 'graphql/generated';
import type {
  CustomQuestion,
  LocationData,
  OffenderData as GlobalOffenderData,
  VehicleData,
} from 'types/DataType';

import type { FormInstance } from 'antd';
import { Button, Card, Col, Drawer, Form, PageHeader, Row } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import type { MutationUpdaterFn } from '@apollo/client';
import AddIncidentTag from 'components/form-components/tags/crimeTypes/AddCrimeType';
import moment from 'moment';
import AssignImageOffender from 'components/form-components/incident/image/AssignImageOffenders';
import type { UploadChangeParam } from 'antd/lib/upload';
import IncidentDetails from 'components/incidents/IncidentForm/IncidentDetails';
import Profiles from 'components/incidents/IncidentForm/Profiles';
import ImageSection from 'components/incidents/IncidentForm/ImageSection';
import AddLocation from 'components/form-components/incident/location/AddLocation';
import { useIntl } from 'react-intl';
import useStyles from './AddIncident.styles';
import type { FormData, NewImage } from './useAddIncident';
import IncidentTypes from './components/IncidentTypes/IncidentTypes.container';
import IncidentWhere from './components/IncidentWhere/IncidentWhere.container';
import IncidentGoods from './components/IncidentsGoods/IncidentGoods.container';
import IncidentPolice from './components/IncidentPolice/IncidentPolice.view';
import IncidentGroups from './components/IncidentGroups/IncidentGroups.container';
import IncidentCustom from './components/IncidentCustom/IncidentCustom.view';

interface OffenderData extends GlobalOffenderData {
  new: boolean;
  existing: boolean;
  edited: boolean;
}

interface Props {
  addIncidentTag: boolean;
  assignOffendersToImages: (data: {
    image: NewImage;
    offenders: OffenderData[];
  }) => void;
  beforeUpload: (value: RcFile) => void;
  fileList: NewImage[];
  form: FormInstance<FormData>;
  imgChange: UploadProps['onChange'];
  newImage: NewImage | null;
  offenderImgChange: (
    info: UploadChangeParam<UploadFile>,
    currentId: string
  ) => void;
  offendersData: OffenderData[];
  onCancelNewImage: () => void;
  onSubmit: (value: FormData) => void;
  onValuesChange: (changedValues: FormData, values: FormData) => void;
  primaryAddress:
    | Exclude<AddressesQuery['addresses'], undefined | null>[0]
    | undefined;
  recentOffenderData: ListOffendersQuery | undefined;
  recentOffenderLoading: boolean;
  removeImage: (uid: string) => void;
  removeImageFromOffender: (data: {
    image: NewImage;
    offenderId: string;
  }) => void;
  removeOffender: (offenderId: string) => void;
  saving: boolean;
  searchOffenders: string;
  setAssignToImage: (image: NewImage) => void;
  setSearchOffenders: (value: string) => void;
  toggleAddIncidentTag: () => void;
  updateIncidentTag: MutationUpdaterFn<CreateTagMutation>;
  onAddOffender: (value: GlobalOffenderData, existing: boolean) => void;
  vehiclesData: VehicleData[];
  formStages: {
    crimeTypes: boolean;
    where: boolean;
    goods: boolean;
    profiles: boolean;
    images: boolean;
    police: boolean;
    details: boolean;
    groups: boolean;
  };
  addNewAddress: boolean;
  toggleAddNewAddress: () => void;
  updateNewAddressData: (value: LocationData | undefined) => void;
  newAddressData: LocationData | undefined;
  goodsVisible: boolean;
  dontKnowGoods: () => void;
  knowGoods: () => void;
  onEditImage: (value: NewImage) => void;
  onAddVehicle: (value: VehicleData, existing: boolean) => void;
  onRemoveVehicle: (vehicleId: string) => void;
  primaryImage: string;
  setPrimaryImage: (value: string) => void;
  incidentForm: IncidentFormField[];
  customQuestions: CustomQuestion[];
}

const AddIncident = ({
  addIncidentTag,
  assignOffendersToImages,
  beforeUpload,
  fileList,
  form,
  formStages,
  imgChange,
  customQuestions,
  newImage,
  offenderImgChange,
  offendersData,
  onCancelNewImage,
  onSubmit,
  onValuesChange,
  primaryAddress,
  recentOffenderData,
  recentOffenderLoading,
  removeImage,
  removeImageFromOffender,
  removeOffender,
  saving,
  searchOffenders,
  setAssignToImage,
  setSearchOffenders,
  toggleAddIncidentTag,
  updateIncidentTag,
  onAddOffender,
  vehiclesData,
  addNewAddress,
  toggleAddNewAddress,
  updateNewAddressData,
  newAddressData,
  dontKnowGoods,
  goodsVisible,
  knowGoods,
  onEditImage,
  onAddVehicle,
  onRemoveVehicle,
  primaryImage,
  setPrimaryImage,
  incidentForm,
}: Props): JSX.Element => {
  const classes = useStyles();
  const intl = useIntl();
  return (
    <div className="page-view">
      <PageHeader
        onBack={() => window.history.back()}
        title={intl.formatMessage({
          defaultMessage: 'Add Incident',
          id: 'kG1p3q',
        })}
      />
      <Form<FormData>
        form={form}
        initialValues={{
          fullAddress: primaryAddress?.full,
          date: moment(),
          involvedTags: [],
        }}
        onFinish={onSubmit}
        layout="vertical"
        onValuesChange={onValuesChange}
      >
        {incidentForm.map((field) => {
          switch (field) {
            case IncidentFormField.Types: {
              return <IncidentTypes incidentForm={incidentForm} />;
            }
            case IncidentFormField.Where: {
              return (
                <IncidentWhere
                  updateNewAddressData={updateNewAddressData}
                  newAddressData={newAddressData}
                  toggleAddNewAddress={toggleAddNewAddress}
                  saving={saving}
                  formStages={formStages}
                />
              );
            }
            case IncidentFormField.Goods: {
              return (
                <IncidentGoods
                  formStages={formStages}
                  dontKnowGoods={dontKnowGoods}
                  goodsVisible={goodsVisible}
                  knowGoods={knowGoods}
                />
              );
            }
            case IncidentFormField.Offenders: {
              return (
                <Card
                  className={classes.card}
                  style={{ opacity: formStages.profiles ? 1 : 0.7 }}
                >
                  {!formStages.profiles && (
                    <div className={classes.cardOverlay} />
                  )}
                  <Form.Item name="profiles">
                    <Profiles
                      offenderImgChange={offenderImgChange}
                      offendersData={offendersData}
                      recentOffenderData={recentOffenderData}
                      recentOffenderLoading={recentOffenderLoading}
                      removeOffender={removeOffender}
                      saving={saving}
                      searchOffenders={searchOffenders}
                      setSearchOffenders={setSearchOffenders}
                      updateOffender={() => {}}
                      vehiclesData={vehiclesData}
                      onAddOffender={onAddOffender}
                      onAddVehicle={onAddVehicle}
                      onRemoveVehicle={onRemoveVehicle}
                    />
                  </Form.Item>
                </Card>
              );
            }
            case IncidentFormField.Images: {
              return (
                <Card
                  className={classes.card}
                  style={{ opacity: formStages.images ? 1 : 0.7 }}
                >
                  {!formStages.images && (
                    <div className={classes.cardOverlay} />
                  )}
                  <ImageSection
                    imgChange={imgChange}
                    fileList={fileList}
                    beforeUpload={beforeUpload}
                    setAssignToImage={setAssignToImage}
                    removeImageFromOffender={removeImageFromOffender}
                    removeImage={removeImage}
                    disabled={saving}
                    onEditImage={onEditImage}
                    primaryImage={primaryImage}
                    setPrimaryImage={setPrimaryImage}
                    hideOffenders={
                      !incidentForm.includes(IncidentFormField.Offenders)
                    }
                  />
                </Card>
              );
            }
            case IncidentFormField.Police: {
              return <IncidentPolice formStages={formStages} saving={saving} />;
            }
            case IncidentFormField.Details: {
              return (
                <Card
                  className={classes.card}
                  style={{ opacity: formStages.details ? 1 : 0.7 }}
                >
                  {!formStages.details && (
                    <div className={classes.cardOverlay} />
                  )}
                  <IncidentDetails saving={saving} />
                </Card>
              );
            }
            case IncidentFormField.Groups: {
              return <IncidentGroups formStages={formStages} saving={saving} />;
            }
            case IncidentFormField.Custom: {
              return (
                <IncidentCustom questions={customQuestions} saving={saving} />
              );
            }
            default: {
              return <div />;
            }
          }
        })}

        {/* Buttons */}
        <Form.Item>
          <Row style={{ marginTop: 10 }} gutter={10} justify="end">
            <Col>
              <Button disabled={saving} onClick={() => window.history.back()}>
                {intl.formatMessage({ defaultMessage: 'Cancel', id: '47FYwb' })}
              </Button>
            </Col>
            <Col>
              <Button
                disabled={saving || !formStages.details}
                loading={saving}
                type="primary"
                htmlType="submit"
              >
                {intl.formatMessage({
                  defaultMessage: 'Create Incident',
                  id: 'qbNNUK',
                })}
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>

      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Add Crime Type',
          id: 'OAVeBQ',
        })}
        open={addIncidentTag}
        width="400"
        onClose={toggleAddIncidentTag}
      >
        {addIncidentTag ? (
          <AddIncidentTag
            update={updateIncidentTag}
            onClose={toggleAddIncidentTag}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Enter Address',
          id: 'kGBG2S',
        })}
        open={addNewAddress}
        width="600"
        onClose={toggleAddNewAddress}
      >
        {addNewAddress && (
          <AddLocation
            onClose={toggleAddNewAddress}
            update={updateNewAddressData}
          />
        )}
      </Drawer>

      <AssignImageOffender
        image={newImage || undefined}
        offenderData={offendersData || []}
        onCancel={onCancelNewImage}
        onSubmit={assignOffendersToImages}
      />
    </div>
  );
};
export default AddIncident;
