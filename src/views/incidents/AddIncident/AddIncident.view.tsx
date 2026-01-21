/* eslint-disable react/jsx-props-no-spreading,@typescript-eslint/no-unsafe-member-access,formatjs/no-literal-string-in-jsx */
import type { FormData } from '#/views/incidents/AddIncident/types/formData';
import type { IncidentFormState } from '#/views/incidents/AddIncident/useAddIncident';
import type { FormInstance } from 'antd';
import type { AddressesQuery } from 'graphql/incidents/queries/__generated__/address.generated';
import type { ListIncidentTagsQuery } from 'graphql/tags/queries/__generated__/list-incident-tags.generated';
import type { TagsQuery } from 'graphql/tags/queries/__generated__/tags.generated';
import type { CustomQuestion, LocationData } from 'types/DataType';

import Loading from '#/components/shared-components/AntD/Loading';
import { currentSchemeAtom } from '#/providers/SchemeProvider/SchemeProvider';
import IncidentCCTV from '#/views/incidents/AddIncident/components/IncidentCCTV/IncidentCCTV.view';
import {
  Button,
  Card,
  Col,
  Drawer,
  Form,
  Modal,
  PageHeader,
  Row,
  Space,
  Typography,
} from 'antd';
import AddLocation from 'components/form-components/addresses/AddLocation';
import ImageSection from 'components/incidents/IncidentForm/ImageSection';
import IncidentDetails from 'components/incidents/IncidentForm/IncidentDetails';
import Profiles from 'components/incidents/IncidentForm/Profiles';
import { IncidentFormField } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import { useIntl } from 'react-intl';

import useStyles from './AddIncident.styles';
import IncidentCustom from './components/IncidentCustom/IncidentCustom.view';
import IncidentGroups from './components/IncidentGroups/IncidentGroups.container';
import IncidentPolice from './components/IncidentPolice/IncidentPolice.container';
import IncidentTypes from './components/IncidentTypes/IncidentTypes.container';
import IncidentWhere from './components/IncidentWhere/IncidentWhere.container';
import IncidentGoods from './components/IncidentsGoods/IncidentGoods.container';

const { Paragraph } = Typography;

interface Props {
  addNewAddress: boolean;

  continueDraft: () => void;
  customQuestions: CustomQuestion[];
  dontKnowGoods: () => void;
  draftLoading: boolean;
  form: FormInstance<FormData>;
  generatingStatement: boolean;
  goodsMode: string;
  goodsVisible: boolean;
  hidePostDraftSections: boolean;

  incidentForm: IncidentFormState;
  incidentTagsData: ListIncidentTagsQuery | undefined;
  incidentTagsLoading: boolean;
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
  setPoliceReporting: (value: boolean) => void;
  setPrimaryImage: (value: string) => void;
  showSiteNumber: boolean;
  submitDraft: () => void;
  tagsData: TagsQuery | undefined;
  toggleAddNewAddress: () => void;
  updateNewAddressData: (value: LocationData | undefined) => void;
}

const AddIncident = ({
  addNewAddress,
  continueDraft,
  customQuestions,
  dontKnowGoods,
  draftLoading,
  form,
  generatingStatement,
  goodsMode,
  goodsVisible,
  hidePostDraftSections,
  incidentForm,
  incidentTagsData,
  incidentTagsLoading,
  knowGoods,
  newAddressData,
  onSubmit,
  onValuesChange,
  policeReporting,
  primaryAddress,
  primaryImage,
  reportOnly,
  saving,
  setPoliceReporting,
  setPrimaryImage,
  showSiteNumber,
  submitDraft,
  tagsData,
  toggleAddNewAddress,
  updateNewAddressData,
}: Props): JSX.Element => {
  const classes = useStyles();
  const intl = useIntl();
  const scheme = useAtomValue(currentSchemeAtom);
  const dontSetDate = scheme?.dontAutoSetTimeDate;
  const usPoliceData = scheme?.usPoliceData;

  const reorderedAndTrimmedForm = (() => {
    const reordered = incidentForm.flatMap((field) => {
      if (field.type === IncidentFormField.Police && policeReporting) {
        const detailsIndex = incidentForm.findIndex(
          (t) => t.type === IncidentFormField.Details
        );
        return detailsIndex === -1
          ? [field]
          : [{ type: IncidentFormField.Details }, field];
      }
      if (field.type === IncidentFormField.Details && policeReporting) {
        return [];
      }
      return [field];
    });

    if (!hidePostDraftSections) return reordered;

    const draftIndex = reordered.findIndex(
      (f) => f.type === IncidentFormField.Draft
    );
    return draftIndex === -1 ? reordered : reordered.slice(0, draftIndex + 1);
  })();

  if (draftLoading) {
    return (
      <div className="page-view">
        <PageHeader
          onBack={reportOnly ? undefined : () => window.history.back()}
          title={intl.formatMessage({
            defaultMessage: 'Add Incident',
          })}
        />
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            height: '80vh',
            justifyContent: 'center',
          }}
        >
          <Loading />
        </div>
      </div>
    );
  }
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
          date: dontSetDate ? undefined : new Date(),
          fullAddress: primaryAddress?.full,
          images: [],
          involvedTags: [],
          offenders: null,
          vehicles: null,
        }}
        layout="vertical"
        onFinish={onSubmit}
        onFinishFailed={() => {
          Modal.error({
            content: intl.formatMessage({
              defaultMessage:
                'Please fill in all required fields before submitting the incident. Check the form for any missing or highlighted sections and try again.',
            }),
            title: intl.formatMessage({ defaultMessage: 'Incomplete Fields' }),
          });
        }}
        onValuesChange={onValuesChange}
      >
        {reorderedAndTrimmedForm.map((field) => {
          switch (field.type) {
            case IncidentFormField.Types: {
              return (
                <IncidentTypes
                  form={form}
                  incidentForm={incidentForm}
                  incidentTagsData={incidentTagsData}
                  incidentTagsLoading={incidentTagsLoading}
                  involvedMetadata={
                    incidentForm.find((f) => f.type === 'INVOLVED')?.metadata
                  }
                  setPoliceReporting={setPoliceReporting}
                  tagsData={tagsData}
                />
              );
            }
            case IncidentFormField.Where: {
              return (
                <IncidentWhere
                  newAddressData={newAddressData}
                  saving={saving}
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
                  incidentForm={incidentForm}
                  knowGoods={knowGoods}
                />
              );
            }
            case IncidentFormField.Draft: {
              const metadata = field.metadata?.[0];
              const { draftButton, draftDescription, draftTitle } =
                metadata || {
                  draftButton: intl.formatMessage({
                    defaultMessage: 'Save Draft',
                  }),
                  draftDescription: '',
                  draftTitle: '',
                };

              if (!hidePostDraftSections) {
                return null;
              }
              return (
                <Card className={classes.card} title={draftTitle}>
                  <Paragraph
                    italic
                    style={{ marginBottom: 10, marginLeft: 5 }}
                    type="secondary"
                  >
                    {draftDescription}
                  </Paragraph>
                  <Space>
                    <Button
                      disabled={saving}
                      onClick={() => submitDraft()}
                      type="primary"
                    >
                      {draftButton}
                    </Button>

                    <Button
                      disabled={saving}
                      onClick={continueDraft}
                      type="primary"
                    >
                      {intl.formatMessage({
                        defaultMessage: 'Continue to Report',
                      })}
                    </Button>
                  </Space>
                </Card>
              );
            }
            case IncidentFormField.Offenders: {
              return (
                <Card className={classes.card}>
                  <Profiles
                    form={form}
                    hasVictims={incidentForm
                      .map((f) => f.type)
                      .includes(IncidentFormField.Victims)}
                    // hasVehicles={incidentForm.includes(
                    //   IncidentFormField.Vehicles
                    // )}
                    hasWitnesses={incidentForm
                      .map((f) => f.type)
                      .includes(IncidentFormField.Witnesses)}
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
              const metadata = field.metadata?.[0];
              // Support both new format (titles.description) and legacy format (descriptionTitle)
              const titles = metadata?.titles as
                | { description?: string }
                | undefined;
              const descriptionTitle =
                titles?.description || (metadata?.descriptionTitle as string);
              return (
                <Card className={classes.card}>
                  <IncidentDetails
                    descriptionTitle={descriptionTitle}
                    saving={saving}
                  />
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
                  usPoliceData={usPoliceData}
                />
              );
            }
            case IncidentFormField.Groups: {
              return <IncidentGroups saving={saving} />;
            }
            case IncidentFormField.Custom: {
              return (
                <IncidentCustom
                  form={form}
                  questions={customQuestions}
                  saving={saving}
                />
              );
            }
            case IncidentFormField.Cctv: {
              return (
                <IncidentCCTV
                  form={form}
                  policeReporting={policeReporting}
                  saving={saving}
                />
              );
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
