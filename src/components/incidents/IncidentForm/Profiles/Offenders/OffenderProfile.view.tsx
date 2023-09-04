import {
  Button,
  Checkbox,
  Col,
  Divider,
  Popconfirm,
  Radio,
  Row,
  Tooltip,
  Typography,
  Upload,
} from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/pro-light-svg-icons';
import React from 'react';
import type { UploadChangeParam } from 'antd/lib/upload';
import { useStoreState } from 'state';
import {
  getOffenderAge,
  getOffenderBuild,
  getOffenderGender,
  getOffenderHeight,
  getOffenderRace,
} from 'utils/offender/get-offender-desc';
import WatermarkImage from 'components/images/WatermarkImage.view';
import CropFaceImage from 'components/images/CropFaceImage';
import { Role } from 'graphql/generated';
import useStyles from '../Profiles.styles';
import type { StateOffenderData } from './useOffenders';
import type { StateImageData } from '../../ImageSection/useImageSection';

const { Title, Text, Paragraph } = Typography;

interface Props {
  offender: StateOffenderData;
  setUpdateOpen: (value: StateOffenderData | null) => void;
  setMatchExistingOpen: (value: StateOffenderData | null) => void;
  onRemoveOffender: (id: string) => void;
  onConfirmOffender: (id: string) => void;
  saving: boolean;
  mergeActive: string | null;
  toggleMerge: (value: string | null) => void;
  toggleMergeSelected: (value: string) => void;
  mergeSelected: string | null;
  onMerge: () => void;
  index: number;
  onChangeOffenderImage: (
    info: UploadChangeParam<StateImageData>,
    offenderId: string
  ) => void;
  uploading: boolean;
  onNoImages: (id: string) => void;
}

const OffenderProfile = ({
  offender,
  setUpdateOpen,
  onRemoveOffender,
  setMatchExistingOpen,
  saving,
  onConfirmOffender,
  mergeActive,
  toggleMerge,
  mergeSelected,
  toggleMergeSelected,
  onMerge,
  index,
  onChangeOffenderImage,
  uploading,
  onNoImages,
}: Props) => {
  const intl = useIntl();
  const classes = useStyles();
  const imagesRequired = useStoreState(
    (state) => state.scheme.imagesRequiredOnOffenders
  );
  const facialRec = useStoreState((state) => state.scheme.facialRecognition);
  const role = useStoreState((state) => state.user.role);
  const publicOffenderDOB =
    useStoreState((state) => state.scheme.defaultPublicOffenderDOB) ||
    role !== Role.User;
  return (
    <>
      <div
        className={
          !offender.confirmedInIncident || !offender.imageConfirmed
            ? classes.profileCardInvalid
            : classes.profileCard
        }
      >
        {mergeActive && mergeActive !== offender.id && (
          <Checkbox
            className={classes.mergeCheck}
            onChange={() => toggleMergeSelected(offender.id)}
            checked={mergeSelected === offender.id}
          />
        )}
        {offender.images && offender.images.length > 0 && (
          <div className={classes.profileImage}>
            {offender.images[0]?.boundingBox && (
              <CropFaceImage
                url={offender.images[0].url || ''}
                boundingBox={offender.images[0].boundingBox}
                height={210}
                width={210}
              />
            )}
            {!offender.images[0]?.boundingBox && (
              <WatermarkImage url={offender.images[0]?.optimised || ''} />
            )}
          </div>
        )}
        {offender.confirmedInIncident && offender.imageConfirmed && (
          <div className={classes.profileContent}>
            <Title level={4}>{offender.name}</Title>
            <Row gutter={[16, 8]} wrap className={classes.profileDetails}>
              <Col>
                <Text>
                  <FormattedMessage
                    defaultMessage="Sex: {gender}"
                    id="ulwh+J"
                    values={{
                      gender: getOffenderGender(offender.gender),
                    }}
                  />
                </Text>
              </Col>
              {publicOffenderDOB && (
                <Col>
                  <Text>
                    <FormattedMessage
                      defaultMessage="Age: {age}"
                      id="9kQMmf"
                      values={{
                        age: getOffenderAge(offender.age),
                      }}
                    />
                  </Text>
                </Col>
              )}
              <Col>
                <Text>
                  <FormattedMessage
                    defaultMessage="Build: {age}"
                    id="ahvubL"
                    values={{
                      age: getOffenderBuild(offender.build),
                    }}
                  />
                </Text>
              </Col>
              <Col>
                <Text>
                  <FormattedMessage
                    defaultMessage="Height: {age}"
                    id="f74aYV"
                    values={{
                      age: getOffenderHeight(offender.height),
                    }}
                  />
                </Text>
              </Col>
              <Col>
                <Text>
                  <FormattedMessage
                    defaultMessage="Ethnicity: {age}"
                    id="rFiqok"
                    values={{
                      age: getOffenderRace(offender.race),
                    }}
                  />
                </Text>
              </Col>
              {offender.peculiarities && (
                <Col>
                  <Text>
                    <FormattedMessage
                      defaultMessage="Peculiarities: {peculiarities}"
                      id="Rn7UHK"
                      values={{
                        peculiarities: offender.peculiarities,
                      }}
                    />
                  </Text>
                </Col>
              )}
            </Row>
            <div className={classes.grow} />
            <Row gutter={8} justify="end" style={{ marginTop: 10 }}>
              <Col>
                <Tooltip
                  title={intl.formatMessage({
                    id: 'YJ2Q25',
                    defaultMessage:
                      'Change values or add new details this this offender.',
                  })}
                >
                  <Button
                    size="small"
                    className={offender.blank ? classes.redButton : ''}
                    onClick={() => setUpdateOpen(offender)}
                    disabled={saving}
                  >
                    <FormattedMessage
                      defaultMessage="Add Details"
                      id="g5aL72"
                    />
                  </Button>
                </Tooltip>
              </Col>
              {offender.new && (
                <Col>
                  <Tooltip
                    title={intl.formatMessage({
                      id: 'lXviWk',
                      defaultMessage:
                        'Search existing offenders if this person already exists in the system.',
                    })}
                  >
                    <Button
                      size="small"
                      onClick={() => setMatchExistingOpen(offender)}
                      disabled={saving}
                    >
                      <FormattedMessage
                        defaultMessage="Match Offender"
                        id="n446LP"
                      />
                    </Button>
                  </Tooltip>
                </Col>
              )}
              <Col>
                <Popconfirm
                  placement="topLeft"
                  title={intl.formatMessage({
                    id: 'ttuPSC',
                    defaultMessage: 'Remove the offender?',
                  })}
                  onConfirm={() => {
                    onRemoveOffender(offender.id);
                  }}
                  okText={intl.formatMessage({
                    id: 'a5msuh',
                    defaultMessage: 'Yes',
                  })}
                  cancelText={intl.formatMessage({
                    id: 'oUWADl',
                    defaultMessage: 'No',
                  })}
                  overlayInnerStyle={{ padding: 10 }}
                >
                  <Button
                    disabled={saving}
                    style={{ height: 36 }}
                    icon={<FontAwesomeIcon size="xs" icon={faTrash} />}
                  />
                </Popconfirm>
              </Col>
            </Row>
          </div>
        )}
        {!offender.confirmedInIncident && (
          <div className={classes.involvedContainer}>
            {mergeActive !== offender.id && (
              <>
                <Paragraph className={classes.involvedQuestion}>
                  <FormattedMessage
                    defaultMessage="Was this person involved in the incident?"
                    id="CPLvWq"
                  />
                </Paragraph>
                <Radio.Group>
                  <Radio.Button
                    value
                    onClick={() => {
                      onConfirmOffender(offender.id);
                    }}
                  >
                    <FormattedMessage defaultMessage="Yes" id="a5msuh" />
                  </Radio.Button>
                  <Popconfirm
                    placement="topLeft"
                    title={intl.formatMessage({
                      id: 'MBmijh',
                      defaultMessage: 'Remove person from incident?',
                    })}
                    onConfirm={() => {
                      onRemoveOffender(offender.id);
                    }}
                    okText={intl.formatMessage({
                      id: 'a5msuh',
                      defaultMessage: 'Yes',
                    })}
                    cancelText={intl.formatMessage({
                      id: 'oUWADl',
                      defaultMessage: 'No',
                    })}
                    overlayInnerStyle={{ padding: 10 }}
                  >
                    <Radio.Button value={false} disabled={saving}>
                      <FormattedMessage defaultMessage="No" id="oUWADl" />
                    </Radio.Button>
                  </Popconfirm>
                </Radio.Group>
                <Divider style={{ marginTop: 10, marginBottom: 10 }}>
                  <Text className={classes.dividerText}>
                    <FormattedMessage defaultMessage="OR" id="INlWvJ" />
                  </Text>
                </Divider>
                <Tooltip
                  title={intl.formatMessage({
                    defaultMessage:
                      'Merge this offender with another offender on this incident',
                    id: 'BNOiMW',
                  })}
                >
                  <Button size="small" onClick={() => toggleMerge(offender.id)}>
                    <FormattedMessage
                      defaultMessage="Merge Person"
                      id="J2W0xX"
                    />
                  </Button>
                </Tooltip>
              </>
            )}
            {mergeActive === offender.id && (
              <>
                <Button
                  size="small"
                  onClick={onMerge}
                  type="ghost"
                  className={classes.mergeButton}
                  danger
                  disabled={!mergeSelected}
                >
                  <FormattedMessage defaultMessage="Merge People" id="FX2Nbd" />
                </Button>
                <Button size="small" onClick={() => toggleMerge(null)}>
                  <FormattedMessage defaultMessage="Cancel" id="47FYwb" />
                </Button>
              </>
            )}
          </div>
        )}
        {!offender.imageConfirmed && (
          <div className={classes.involvedContainer}>
            {mergeActive !== offender.id && (
              <>
                <Title level={4}>
                  <FormattedMessage
                    defaultMessage="Offender {index}"
                    id="hO4ExD"
                    values={{ index: index + 1 }}
                  />
                </Title>
                <Paragraph className={classes.involvedQuestion}>
                  <FormattedMessage
                    defaultMessage="Do you have an image for this offender?"
                    id="PNMvor"
                  />
                </Paragraph>
                <Row>
                  <Col>
                    <Upload
                      onChange={(info) =>
                        onChangeOffenderImage(info, offender.id)
                      }
                      action={
                        facialRec
                          ? import.meta.env
                              .VITE_APP_IMAGE_ANALYSE_UPLOAD_ENDPOINT
                          : import.meta.env.VITE_APP_IMAGE_UPLOAD_ENDPOINT
                      }
                      showUploadList={false}
                      accept=".png,.jpeg"
                    >
                      <Button
                        loading={uploading}
                        disabled={uploading}
                        size="small"
                        className={classes.buttonLeft}
                      >
                        <FormattedMessage defaultMessage="Yes" id="a5msuh" />
                      </Button>
                    </Upload>
                  </Col>
                  <Col>
                    {imagesRequired && (
                      <Popconfirm
                        placement="topLeft"
                        title={intl.formatMessage({
                          id: 'zM0KJt',
                          defaultMessage:
                            'If you have no image the offender will be removed',
                        })}
                        onConfirm={() => {
                          onRemoveOffender(offender.id);
                        }}
                        okText={intl.formatMessage({
                          id: 'a5msuh',
                          defaultMessage: 'Yes',
                        })}
                        cancelText={intl.formatMessage({
                          id: 'oUWADl',
                          defaultMessage: 'No',
                        })}
                        overlayInnerStyle={{ padding: 10 }}
                      >
                        <Button size="small" className={classes.buttonRight}>
                          <FormattedMessage defaultMessage="No" id="oUWADl" />
                        </Button>
                      </Popconfirm>
                    )}
                    {!imagesRequired && (
                      <Button
                        size="small"
                        className={classes.buttonRight}
                        onClick={() => onNoImages(offender.id)}
                      >
                        <FormattedMessage defaultMessage="No" id="oUWADl" />
                      </Button>
                    )}
                  </Col>
                </Row>
              </>
            )}
          </div>
        )}
      </div>
      {!offender.confirmedInIncident && (
        <Paragraph type="danger" style={{ marginTop: 5 }}>
          <FormattedMessage
            defaultMessage="Please confirm if this person was involved"
            id="Ej8PCR"
          />
        </Paragraph>
      )}
      {!offender.imageConfirmed && (
        <Paragraph type="danger" style={{ marginTop: 5 }}>
          <FormattedMessage
            defaultMessage="Confirm there is an image."
            id="VbQ5f+"
          />
        </Paragraph>
      )}
    </>
  );
};

export default OffenderProfile;
