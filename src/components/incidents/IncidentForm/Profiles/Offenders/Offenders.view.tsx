import type { FormInstance } from 'antd';

import { Col, Divider, Drawer, Form, Row, Typography } from 'antd';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import type { FormData } from '../../../../../views/incidents/AddIncident/useAddIncident';
import type { StateOffenderData } from './useOffenders';

import CountButton from '../../../../form-components/count-buttons/CountButton.view';
import CounterButton from '../../../../form-components/count-buttons/CounterButton.view';
import AddExistingOffender from '../../../../form-components/offender/offender/AddExistingOffender';
import AddNewOffenderSimple from '../../../../form-components/offender/offender/AddNewOffenderSimple';
import SimpleEditOffender from '../../../../form-components/offender/offender/SimpleEditOffender';
import useStyles from '../Profiles.styles';
import FacesColumn from './FacesColumn.view';
import OffenderProfile from './OffenderProfile.view';
import useOffenders from './useOffenders';

const { Paragraph } = Typography;

interface Props {
  addExistingOpen: boolean;
  addNewOpen: boolean;
  form: FormInstance<FormData>;
  onChange?: (value: StateOffenderData[]) => void;
  saving: boolean;
  toggleAddExistingOpen: () => void;
  toggleAddNewOpen: () => void;
  value?: StateOffenderData[];
}

const Offenders = ({
  addExistingOpen,
  addNewOpen,
  form,
  onChange,
  saving,
  toggleAddExistingOpen,
  toggleAddNewOpen,
  value,
}: Props) => {
  const classes = useStyles();
  const intl = useIntl();
  const incidentBusinessId = Form.useWatch('business', form)?.value;

  const {
    facesOpen,
    matchExistingOpen,
    mergeActive,
    mergeSelected,
    noOffenders,
    offenders,
    onAddBlankOffenders,
    onAddOffenders,
    onChangeOffenderImage,
    onConfirmOffender,
    onImagesUploadedInForm,
    onMatchOffender,
    onMerge,
    onNoImages,
    onRemoveOffender,
    onSubmitImageFaces,
    onUpdateOffender,
    setFacesOpen,
    setMatchExistingOpen,
    setUpdateOpen,
    toggleMerge,
    toggleMergeSelected,
    toggleNoOffenders,
    updateOpen,
    uploading,
  } = useOffenders({
    form,
    onChange,
    value,
  });
  const images = Form.useWatch('images', form);

  return (
    <>
      {offenders.length > 0 ? (
        <>
          <Divider>
            {intl.formatMessage({
              defaultMessage: 'Offenders',
            })}
          </Divider>
          <Row gutter={[16, 16]}>
            {offenders.map((offender, index) => (
              <Col key={offender.id}>
                <OffenderProfile
                  index={index}
                  mergeActive={mergeActive}
                  mergeSelected={mergeSelected}
                  offender={offender}
                  onChangeOffenderImage={onChangeOffenderImage}
                  onConfirmOffender={onConfirmOffender}
                  onMerge={onMerge}
                  onNoImages={onNoImages}
                  onRemoveOffender={onRemoveOffender}
                  saving={saving}
                  setMatchExistingOpen={setMatchExistingOpen}
                  setUpdateOpen={setUpdateOpen}
                  toggleMerge={toggleMerge}
                  toggleMergeSelected={toggleMergeSelected}
                  uploading={uploading}
                />
              </Col>
            ))}
          </Row>
        </>
      ) : null}
      {offenders.length === 0 && (
        <div>
          <Paragraph className={classes.subHeader}>
            {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
            <span className={classes.subHeaderRequired}>*</span>
            <FormattedMessage defaultMessage="How many offenders were involved in the incident?" />
          </Paragraph>
          <Row gutter={8}>
            <Col>
              <CountButton
                onClick={toggleNoOffenders}
                selected={noOffenders}
                text={intl.formatMessage({
                  defaultMessage: 'None',
                })}
                tooltip={intl.formatMessage({
                  defaultMessage: "Don't add any offenders to this incident",
                })}
              />
            </Col>
            {[1, 2, 3, 4].map((count) => (
              <Col key={count}>
                <CountButton
                  onClick={() => onAddBlankOffenders(count)}
                  text={intl.formatMessage(
                    {
                      defaultMessage:
                        '{count} {count, plural, one {Offender} other {Offenders}}',
                    },
                    {
                      count,
                    }
                  )}
                  tooltip={intl.formatMessage(
                    {
                      defaultMessage:
                        'Add {count} {count, plural, one {offender} other {offenders}} to the incident',
                    },
                    {
                      count,
                    }
                  )}
                />
              </Col>
            ))}
            <Col>
              <CounterButton
                dataName={intl.formatMessage({
                  defaultMessage: 'Offenders',
                })}
                onClick={onAddBlankOffenders}
              />
            </Col>
          </Row>
        </div>
      )}

      <Drawer
        onClose={toggleAddNewOpen}
        open={addNewOpen}
        title={intl.formatMessage({
          defaultMessage: 'Add New Offender',
        })}
        width="700"
        zIndex={999}
      >
        {addNewOpen ? (
          <AddNewOffenderSimple
            images={images}
            incidentBusinessId={incidentBusinessId}
            onAddOffender={(data) => onAddOffenders([data], false, false)}
            onClose={toggleAddNewOpen}
            onImagesUploaded={onImagesUploadedInForm}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={toggleAddExistingOpen}
        open={addExistingOpen}
        title={intl.formatMessage({
          defaultMessage: 'Add Existing Offenders',
        })}
        width="1000"
        zIndex={1001}
      >
        {addExistingOpen ? (
          <AddExistingOffender
            offenderIds={offenders.map(({ id }) => id)}
            onClose={toggleAddExistingOpen}
            update={(data) => onAddOffenders([data], true, false)}
          />
        ) : (
          <div />
        )}
      </Drawer>

      <Drawer
        onClose={() => setMatchExistingOpen(null)}
        open={!!matchExistingOpen}
        title={intl.formatMessage({
          defaultMessage: 'Search & Match Offender',
        })}
        width="1000"
        zIndex={1001}
      >
        {matchExistingOpen ? (
          <AddExistingOffender
            offenderIds={offenders.map(({ id }) => id)}
            onClose={() => setMatchExistingOpen(null)}
            update={(data) => {
              onMatchOffender(data);
            }}
          />
        ) : (
          <div />
        )}
      </Drawer>

      <Drawer
        onClose={() => setUpdateOpen(null)}
        open={!!updateOpen}
        title={intl.formatMessage({
          defaultMessage: 'Edit Offender',
        })}
        width="700"
      >
        {updateOpen ? (
          <SimpleEditOffender
            data={updateOpen}
            images={images?.map((el) => ({ ...el, id: `${Math.random()}` }))}
            onClose={() => setUpdateOpen(null)}
            onEditOffender={(values) => onUpdateOffender(values)}
            onImagesUploaded={onImagesUploadedInForm}
            showAddress
          />
        ) : (
          <div />
        )}
      </Drawer>

      <Drawer
        bodyStyle={{ padding: 0 }}
        headerStyle={{ display: 'none' }}
        onClose={() => setFacesOpen(null)}
        open={facesOpen !== null}
        width={1000}
      >
        {facesOpen !== null && (
          <FacesColumn
            facesOpen={facesOpen}
            onClose={() => setFacesOpen(null)}
            onSubmit={onSubmitImageFaces}
          />
        )}
      </Drawer>
    </>
  );
};

export default Offenders;
