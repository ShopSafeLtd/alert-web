/* eslint-disable react/jsx-props-no-spreading,@typescript-eslint/no-unsafe-member-access,formatjs/no-literal-string-in-jsx */
import React from 'react';
import type { AddressesQuery } from 'graphql/generated';
import { IncidentFormField } from 'graphql/generated';
import type { CustomQuestion, LocationData } from 'types/DataType';

import type { FormInstance } from 'antd';
import { Button, Card, Col, Drawer, Form, PageHeader, Row } from 'antd';
import moment from 'moment';
import IncidentDetails from 'components/incidents/IncidentForm/IncidentDetails';
import Profiles from 'components/incidents/IncidentForm/Profiles';
import ImageSection from 'components/incidents/IncidentForm/ImageSection';
import AddLocation from 'components/form-components/addresses/AddLocation';
import { useIntl } from 'react-intl';
import IncidentCCTV from '#/views/incidents/AddIncident/components/IncidentCCTV/IncidentCCTV.view';
import useStyles from './AddIncident.styles';
import type { FormData } from './useAddIncident';
import IncidentTypes from './components/IncidentTypes/IncidentTypes.container';
import IncidentWhere from './components/IncidentWhere/IncidentWhere.container';
import IncidentGoods from './components/IncidentsGoods/IncidentGoods.container';
import IncidentPolice from './components/IncidentPolice/IncidentPolice.view';
import IncidentGroups from './components/IncidentGroups/IncidentGroups.container';
import IncidentCustom from './components/IncidentCustom/IncidentCustom.view';

interface Props {
  form: FormInstance<FormData>;
  onSubmit: (value: FormData) => void;
  onValuesChange: (changedValues: FormData, values: FormData) => void;
  primaryAddress:
    | Exclude<AddressesQuery['addresses'], undefined | null>[0]
    | undefined;
  saving: boolean;
  addNewAddress: boolean;
  toggleAddNewAddress: () => void;
  updateNewAddressData: (value: LocationData | undefined) => void;
  newAddressData: LocationData | undefined;
  goodsVisible: boolean;
  dontKnowGoods: () => void;
  knowGoods: () => void;
  primaryImage: string;
  setPrimaryImage: (value: string) => void;
  incidentForm: IncidentFormField[];
  customQuestions: CustomQuestion[];
  goodsMode: string;
  reportOnly: boolean;
  brands: string[];
  setBrands: (value: string[]) => void;
  showSiteNumber: boolean;
}

const AddIncident = ({
  form,
  customQuestions,
  onSubmit,
  onValuesChange,
  primaryAddress,
  saving,
  addNewAddress,
  toggleAddNewAddress,
  updateNewAddressData,
  newAddressData,
  dontKnowGoods,
  goodsVisible,
  knowGoods,
  primaryImage,
  setPrimaryImage,
  incidentForm,
  goodsMode,
  reportOnly,
  showSiteNumber,
  brands,
  setBrands,
}: Props): JSX.Element => {
  const classes = useStyles();
  const intl = useIntl();
  return (
    <div className="page-view">
      <PageHeader
        onBack={reportOnly ? undefined : () => window.history.back()}
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
          offenders: null,
          vehicles: null,
          images: [],
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
                  brands={brands}
                  setBrands={setBrands}
                  updateNewAddressData={updateNewAddressData}
                  newAddressData={newAddressData}
                  toggleAddNewAddress={toggleAddNewAddress}
                  saving={saving}
                  showSiteNumber={showSiteNumber}
                />
              );
            }
            case IncidentFormField.Goods: {
              return (
                <IncidentGoods
                  dontKnowGoods={dontKnowGoods}
                  goodsVisible={goodsVisible}
                  knowGoods={knowGoods}
                  goodsMode={goodsMode}
                  form={form}
                />
              );
            }
            case IncidentFormField.Offenders: {
              return (
                <Card className={classes.card}>
                  <Profiles
                    form={form}
                    saving={saving}
                    hasVehicles={incidentForm.includes(
                      IncidentFormField.Vehicles
                    )}
                    hasWitnesses={incidentForm.includes(
                      IncidentFormField.Witnesses
                    )}
                    hasVictims={incidentForm.includes(
                      IncidentFormField.Victims
                    )}
                  />
                </Card>
              );
            }
            case IncidentFormField.Images: {
              return (
                <Card className={classes.card}>
                  <ImageSection
                    disabled={saving}
                    primaryImage={primaryImage}
                    setPrimaryImage={setPrimaryImage}
                    form={form}
                    incidentForm={incidentForm}
                  />
                </Card>
              );
            }
            case IncidentFormField.Police: {
              return <IncidentPolice saving={saving} form={form} />;
            }
            case IncidentFormField.Details: {
              return (
                <Card className={classes.card}>
                  <IncidentDetails saving={saving} />
                </Card>
              );
            }
            case IncidentFormField.Groups: {
              return <IncidentGroups saving={saving} />;
            }
            case IncidentFormField.Custom: {
              return (
                <IncidentCustom questions={customQuestions} saving={saving} />
              );
            }
            case IncidentFormField.Cctv: {
              return <IncidentCCTV saving={saving} form={form} />;
            }
            default: {
              return <div />;
            }
          }
        })}

        {/* Buttons */}
        <Form.Item>
          <Row style={{ marginTop: 10 }} gutter={10} justify="end">
            {!reportOnly && (
              <Col>
                <Button disabled={saving} onClick={() => window.history.back()}>
                  {intl.formatMessage({
                    defaultMessage: 'Cancel',
                    id: '47FYwb',
                  })}
                </Button>
              </Col>
            )}
            <Col>
              <Button
                disabled={saving}
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
    </div>
  );
};
export default AddIncident;
