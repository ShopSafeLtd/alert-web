/* eslint-disable react/jsx-props-no-spreading,@typescript-eslint/no-unsafe-member-access,formatjs/no-literal-string-in-jsx */
import type { FormInstance } from 'antd';
import type { AddressesQuery } from 'graphql/incidents/queries/__generated__/address.generated';
import type { CustomQuestion, LocationData } from 'types/DataType';

import IncidentCCTV from '#/views/incidents/AddIncident/components/IncidentCCTV/IncidentCCTV.view';
import { Button, Card, Col, Drawer, Form, PageHeader, Row } from 'antd';
import AddLocation from 'components/form-components/addresses/AddLocation';
import ImageSection from 'components/incidents/IncidentForm/ImageSection';
import IncidentDetails from 'components/incidents/IncidentForm/IncidentDetails';
import Profiles from 'components/incidents/IncidentForm/Profiles';
import { IncidentFormField } from 'graphql/types';
import moment from 'moment';
import React from 'react';
import { useIntl } from 'react-intl';

import type { FormData } from './useAddIncident';

import useStyles from './AddIncident.styles';
import IncidentCustom from './components/IncidentCustom/IncidentCustom.view';
import IncidentGroups from './components/IncidentGroups/IncidentGroups.container';
import IncidentPolice from './components/IncidentPolice/IncidentPolice.container';
import IncidentTypes from './components/IncidentTypes/IncidentTypes.container';
import IncidentWhere from './components/IncidentWhere/IncidentWhere.container';
import IncidentGoods from './components/IncidentsGoods/IncidentGoods.container';

interface Props {
  addNewAddress: boolean;
  brands: string[];
  customQuestions: CustomQuestion[];
  dontKnowGoods: () => void;
  form: FormInstance<FormData>;
  generatingStatement: boolean;
  goodsMode: string;
  goodsVisible: boolean;
  incidentForm: IncidentFormField[];
  knowGoods: () => void;
  newAddressData: LocationData | undefined;
  onSubmit: (value: FormData) => void;
  onValuesChange: (changedValues: FormData, values: FormData) => void;
  policeReporting: boolean;
  primaryAddress:
    | Exclude<AddressesQuery['addresses'], null | undefined>[0]
    | undefined;
  primaryImage: string;
  reportOnly: boolean;
  saving: boolean;
  setBrands: (value: string[]) => void;
  setPoliceReporting: (value: boolean) => void;
  setPrimaryImage: (value: string) => void;
  showSiteNumber: boolean;
  toggleAddNewAddress: () => void;
  updateNewAddressData: (value: LocationData | undefined) => void;
}

const AddIncident = ({
  addNewAddress,
  brands,
  customQuestions,
  dontKnowGoods,
  form,
  generatingStatement,
  goodsMode,
  goodsVisible,
  incidentForm,
  knowGoods,
  newAddressData,
  onSubmit,
  onValuesChange,
  policeReporting,
  primaryAddress,
  primaryImage,
  reportOnly,
  saving,
  setBrands,
  setPoliceReporting,
  setPrimaryImage,
  showSiteNumber,
  toggleAddNewAddress,
  updateNewAddressData,
}: Props): JSX.Element => {
  const classes = useStyles();
  const intl = useIntl();
  return (
    <div className="page-view">
      <PageHeader
        onBack={reportOnly ? undefined : () => window.history.back()}
        title={intl.formatMessage({
          defaultMessage: 'Add Incident',
        })}
      />
      <Form<FormData>
        form={form}
        initialValues={{
          date: moment(),
          fullAddress: primaryAddress?.full,
          images: [],
          involvedTags: [],
          offenders: null,
          vehicles: null,
        }}
        layout="vertical"
        onFinish={onSubmit}
        onValuesChange={onValuesChange}
      >
        {incidentForm.map((field) => {
          switch (field) {
            case IncidentFormField.Types: {
              return (
                <IncidentTypes
                  form={form}
                  incidentForm={incidentForm}
                  setPoliceReporting={setPoliceReporting}
                />
              );
            }
            case IncidentFormField.Where: {
              return (
                <IncidentWhere
                  brands={brands}
                  newAddressData={newAddressData}
                  saving={saving}
                  setBrands={setBrands}
                  showSiteNumber={showSiteNumber}
                  toggleAddNewAddress={toggleAddNewAddress}
                  updateNewAddressData={updateNewAddressData}
                />
              );
            }
            case IncidentFormField.Goods: {
              return (
                <IncidentGoods
                  dontKnowGoods={dontKnowGoods}
                  form={form}
                  goodsMode={goodsMode}
                  goodsVisible={goodsVisible}
                  knowGoods={knowGoods}
                />
              );
            }
            case IncidentFormField.Offenders: {
              return (
                <Card className={classes.card}>
                  <Profiles
                    form={form}
                    hasVictims={incidentForm.includes(
                      IncidentFormField.Victims
                    )}
                    // hasVehicles={incidentForm.includes(
                    //   IncidentFormField.Vehicles
                    // )}
                    hasWitnesses={incidentForm.includes(
                      IncidentFormField.Witnesses
                    )}
                    saving={saving}
                  />
                </Card>
              );
            }
            case IncidentFormField.Images: {
              return (
                <Card className={classes.card}>
                  <ImageSection
                    disabled={saving}
                    form={form}
                    incidentForm={incidentForm}
                    primaryImage={primaryImage}
                    setPrimaryImage={setPrimaryImage}
                  />
                </Card>
              );
            }
            case IncidentFormField.Details: {
              return (
                <Card className={classes.card}>
                  <IncidentDetails saving={saving} />
                </Card>
              );
            }
            case IncidentFormField.Police: {
              return (
                <IncidentPolice
                  form={form}
                  generatingStatement={generatingStatement}
                  policeReporting={policeReporting}
                  saving={saving}
                />
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
              return <IncidentCCTV form={form} saving={saving} />;
            }
            default: {
              return <div />;
            }
          }
        })}

        {/* Buttons */}
        <Form.Item>
          <Row gutter={10} justify="end" style={{ marginTop: 10 }}>
            {!reportOnly && (
              <Col>
                <Button disabled={saving} onClick={() => window.history.back()}>
                  {intl.formatMessage({
                    defaultMessage: 'Cancel',
                  })}
                </Button>
              </Col>
            )}
            <Col>
              <Button
                disabled={saving}
                htmlType="submit"
                loading={saving}
                type="primary"
              >
                {intl.formatMessage({
                  defaultMessage: 'Create Incident',
                })}
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>

      <Drawer
        onClose={toggleAddNewAddress}
        open={addNewAddress}
        title={intl.formatMessage({
          defaultMessage: 'Enter Address',
        })}
        width="600"
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
