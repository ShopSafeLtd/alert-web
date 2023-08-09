import React from 'react';
import type { FormInstance } from 'antd';
import { Col, Divider, Drawer, Row, Typography, Form } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';
import useStyles from '../Profiles.styles';
import type { StateOffenderData } from './useOffenders';
import useOffenders from './useOffenders';
import CountButton from '../../../../form-components/count-buttons/CountButton.view';
import CounterButton from '../../../../form-components/count-buttons/CounterButton.view';
import OffenderProfile from './OffenderProfile.view';
import AddOffender from '../../../../form-components/offender/offender/AddNewOffenderSimple/AddNewOffender.container';
import AddExistingOffender from '../../../../form-components/offender/offender/AddExistingOffender';
import EditOffender from '../../../../form-components/offender/offender/SimpleEditOffender';
import type { FormData } from '../../../../../views/incidents/AddIncident/useAddIncident';
import FacesColumn from './FacesColumn.view';

const { Paragraph } = Typography;

interface Props {
  value?: StateOffenderData[];
  onChange?: (value: StateOffenderData[]) => void;
  saving: boolean;
  toggleAddNewOpen: () => void;
  addNewOpen: boolean;
  toggleAddExistingOpen: () => void;
  addExistingOpen: boolean;
  form: FormInstance<FormData>;
}

const Offenders = ({
  value,
  onChange,
  saving,
  toggleAddNewOpen,
  addNewOpen,
  toggleAddExistingOpen,
  addExistingOpen,
  form,
}: Props) => {
  const classes = useStyles();
  const intl = useIntl();
  const {
    offenders,
    onRemoveOffender,
    setMatchExistingOpen,
    onAddBlankOffenders,
    onUpdateOffender,
    setUpdateOpen,
    toggleNoOffenders,
    noOffenders,
    onMatchOffender,
    matchExistingOpen,
    updateOpen,
    onAddOffenders,
    onConfirmOffender,
    mergeActive,
    toggleMerge,
    mergeSelected,
    toggleMergeSelected,
    onMerge,
    onChangeOffenderImage,
    uploading,
    onNoImages,
    onImagesUploadedInForm,
    facesOpen,
    setFacesOpen,
    onSubmitImageFaces,
  } = useOffenders({
    value,
    onChange,
    form,
  });
  const images = Form.useWatch('images', form);

  return (
    <>
      {offenders.length > 0 ? (
        <>
          <Divider>
            {intl.formatMessage({
              id: 'xb54TN',
              defaultMessage: 'Offenders',
            })}
          </Divider>
          <Row gutter={[16, 16]}>
            {offenders.map((offender, index) => (
              <Col key={offender.id}>
                <OffenderProfile
                  offender={offender}
                  onRemoveOffender={onRemoveOffender}
                  setMatchExistingOpen={setMatchExistingOpen}
                  setUpdateOpen={setUpdateOpen}
                  saving={saving}
                  onConfirmOffender={onConfirmOffender}
                  mergeActive={mergeActive}
                  toggleMerge={toggleMerge}
                  toggleMergeSelected={toggleMergeSelected}
                  mergeSelected={mergeSelected}
                  onMerge={onMerge}
                  index={index}
                  onChangeOffenderImage={onChangeOffenderImage}
                  uploading={uploading}
                  onNoImages={onNoImages}
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
            <FormattedMessage
              defaultMessage="How many offenders were involved in the incident?"
              id="Ly8wXs"
            />
          </Paragraph>
          <Row gutter={8}>
            <Col>
              <CountButton
                onClick={toggleNoOffenders}
                selected={noOffenders}
                tooltip={intl.formatMessage({
                  defaultMessage: "Don't add any offenders to this incident",
                  id: 'WyzOhb',
                })}
                text={intl.formatMessage({
                  defaultMessage: 'None',
                  id: '450Fty',
                })}
              />
            </Col>
            {[1, 2, 3, 4].map((count) => (
              <Col key={count}>
                <CountButton
                  onClick={() => onAddBlankOffenders(count)}
                  text={intl.formatMessage(
                    {
                      defaultMessage: '{count} Offender',
                      id: 'q6iRDn',
                    },
                    {
                      count,
                    }
                  )}
                  tooltip={intl.formatMessage(
                    {
                      defaultMessage:
                        'Add {count} {count, plural, one {offender} other {offenders}} to the incident',
                      id: 'pgzkcv',
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
                  id: 'xb54TN',
                  defaultMessage: 'Offenders',
                })}
                onClick={onAddBlankOffenders}
              />
            </Col>
          </Row>
        </div>
      )}

      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Add New Offender',
          id: 'V+RsEq',
        })}
        open={addNewOpen}
        width="700"
        zIndex={999}
        onClose={toggleAddNewOpen}
      >
        {addNewOpen ? (
          <AddOffender
            update={(data) => onAddOffenders([data], false)}
            onClose={toggleAddNewOpen}
            images={images}
            onImagesUploaded={onImagesUploadedInForm}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Add Existing Offenders',
          id: '1FbM4r',
        })}
        open={addExistingOpen}
        width="800"
        onClose={toggleAddExistingOpen}
        zIndex={1001}
      >
        {addExistingOpen ? (
          <AddExistingOffender
            update={(data) => onAddOffenders([data], true)}
            offenderIds={offenders.map(({ id }) => id)}
            onClose={toggleAddExistingOpen}
          />
        ) : (
          <div />
        )}
      </Drawer>

      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Search & Match Offender',
          id: 'E3wLhk',
        })}
        open={!!matchExistingOpen}
        width="800"
        onClose={() => setMatchExistingOpen(null)}
        zIndex={1001}
      >
        {matchExistingOpen ? (
          <AddExistingOffender
            update={(data) => {
              onMatchOffender(data);
            }}
            offenderIds={offenders.map(({ id }) => id)}
            onClose={() => setMatchExistingOpen(null)}
          />
        ) : (
          <div />
        )}
      </Drawer>

      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Edit Offender',
          id: '+OfJ4/',
        })}
        open={!!updateOpen}
        width="700"
        onClose={() => setUpdateOpen(null)}
      >
        {updateOpen ? (
          <EditOffender
            data={updateOpen}
            onClose={() => setUpdateOpen(null)}
            update={onUpdateOffender}
            images={images?.map((el) => ({ ...el, id: `${Math.random()}` }))}
            onImagesUploaded={onImagesUploadedInForm}
          />
        ) : (
          <div />
        )}
      </Drawer>

      <Drawer
        open={facesOpen !== null}
        bodyStyle={{ padding: 0 }}
        width={1000}
        onClose={() => setFacesOpen(null)}
        headerStyle={{ display: 'none' }}
      >
        {facesOpen !== null && (
          <FacesColumn
            facesOpen={facesOpen}
            onSubmit={onSubmitImageFaces}
            onClose={() => setFacesOpen(null)}
          />
        )}
      </Drawer>
    </>
  );
};

export default Offenders;
