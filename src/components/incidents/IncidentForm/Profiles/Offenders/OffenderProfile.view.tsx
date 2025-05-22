import type { UploadChangeParam } from 'antd/lib/upload';

import { getCustomUrls } from '#/providers/GetCustomUrls';
import { currentSchemeAtom } from '#/providers/SchemeProvider/SchemeProvider';
import publicOffenderDob from '#/utils/public-offender-dob';
import { faTrash } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Col,
  Divider,
  Popconfirm,
  Radio,
  Row,
  Tooltip,
  Typography,
  Upload,
} from 'antd';
import WatermarkImage from 'components/images/WatermarkImage.view';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  getOffenderAge,
  getOffenderBuild,
  getOffenderGender,
  getOffenderHeight,
  getOffenderRace,
} from 'utils/offender/get-offender-desc';

import type { StateImageData } from '../../ImageSection/useImageSection';
import type { StateOffenderData } from './useOffenders';

import useStyles from '../Profiles.styles';

const { Paragraph, Text, Title } = Typography;

interface Props {
  index: number;
  mergeActive: null | string;
  mergeSelected: null | string;
  offender: StateOffenderData;
  onChangeOffenderImage: (
    info: UploadChangeParam<StateImageData>,
    offenderId: string
  ) => void;
  onConfirmOffender: (id: string) => void;
  onMerge: () => void;
  onNoImages: (id: string) => void;
  onRemoveOffender: (id: string) => void;
  saving: boolean;
  setMatchExistingOpen: (value: StateOffenderData | null) => void;
  setUpdateOpen: (value: StateOffenderData | null) => void;
  toggleMerge: (value: null | string) => void;
  toggleMergeSelected: (value: string) => void;
  uploading: boolean;
}

const OffenderProfile = ({
  index,
  mergeActive,
  mergeSelected,
  offender,
  onChangeOffenderImage,
  onConfirmOffender,
  onMerge,
  onNoImages,
  onRemoveOffender,
  saving,
  setMatchExistingOpen,
  setUpdateOpen,
  toggleMerge,
  toggleMergeSelected,
  uploading,
}: Props) => {
  const intl = useIntl();
  const classes = useStyles();
  const imagesRequired =
    useAtomValue(currentSchemeAtom)?.imagesRequiredOnOffenders;
  const facialDetection =
    useAtomValue(currentSchemeAtom)?.facialDetection ?? true;
  const publicOffenderDOB = publicOffenderDob();
  const { imageAnalyseGo, imageUpload } = getCustomUrls();

  return (
    <>
      <div
        className={
          !offender.confirmedInIncident || !offender.imageConfirmed
            ? classes.profileCardInvalid
            : classes.profileCard
        }
      >
        {offender.images && offender.images.length > 0 && (
          <div className={classes.profileImage}>
            {offender.images[0]?.boundingBox && (
              <img
                // eslint-disable-next-line formatjs/no-literal-string-in-jsx
                alt={offender.name || 'offender image'}
                height={210}
                src={offender.images[0].url || ''}
                style={{
                  objectFit: 'contain',
                }}
                width={210}
              />
            )}
            {/* {offender.images[0]?.boundingBox && ( */}
            {/*   <CropFaceImage */}
            {/*     url={offender.images[0].url || ''} */}
            {/*     boundingBox={offender.images[0].boundingBox} */}
            {/*     height={210} */}
            {/*     width={210} */}
            {/*   /> */}
            {/* )} */}
            {!offender.images[0]?.boundingBox && (
              <WatermarkImage
                url={
                  offender.images[0]?.optimised || offender.images[0]?.url || ''
                }
              />
            )}
          </div>
        )}
        {offender.confirmedInIncident && offender.imageConfirmed && (
          <div className={classes.profileContent}>
            <Title level={4}>{offender.name}</Title>
            <Row className={classes.profileDetails} gutter={[16, 8]} wrap>
              <Col>
                <Text>
                  <FormattedMessage
                    defaultMessage="Sex: {gender}"
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
                      defaultMessage="Characteristics: {peculiarities}"
                      values={{
                        peculiarities: offender.peculiarities,
                      }}
                    />
                  </Text>
                </Col>
              )}
            </Row>
            <div className={classes.grow} />
            {mergeActive ? (
              <Row gutter={8} justify="end" style={{ marginTop: 10 }}>
                {/* <Col>
                  {mergeActive && mergeActive !== offender.id && (
                    <Checkbox
                      className={classes.mergeCheck}
                      onChange={() => toggleMergeSelected(offender.id)}
                      checked={mergeSelected === offender.id}
                    />
                  )}
                </Col> */}
                <Col>
                  <Button
                    onClick={() => {
                      toggleMergeSelected(offender.id);
                    }}
                    type={mergeSelected === offender.id ? 'primary' : 'default'}
                  >
                    {mergeSelected === offender.id ? (
                      <FormattedMessage defaultMessage="Selected" />
                    ) : (
                      <FormattedMessage defaultMessage="Merge" />
                    )}
                  </Button>
                </Col>
              </Row>
            ) : (
              <Row gutter={8} justify="end" style={{ marginTop: 10 }}>
                <Col>
                  <Tooltip
                    title={intl.formatMessage({
                      defaultMessage: 'Add or edit details for this offender.',
                    })}
                  >
                    <Button
                      className={offender.blank ? classes.redButton : ''}
                      disabled={saving}
                      onClick={() => setUpdateOpen(offender)}
                      size="small"
                    >
                      <FormattedMessage defaultMessage="Add Details" />
                    </Button>
                  </Tooltip>
                </Col>
                {offender.new && (
                  <Col>
                    <Tooltip
                      title={intl.formatMessage({
                        defaultMessage:
                          'Search existing offenders if this person already exists in the system.',
                      })}
                    >
                      <Button
                        disabled={saving}
                        onClick={() => setMatchExistingOpen(offender)}
                        size="small"
                      >
                        <FormattedMessage defaultMessage="Match Offender" />
                      </Button>
                    </Tooltip>
                  </Col>
                )}
                <Col>
                  <Popconfirm
                    cancelText={intl.formatMessage({
                      defaultMessage: 'No',
                    })}
                    okText={intl.formatMessage({
                      defaultMessage: 'Yes',
                    })}
                    onConfirm={() => {
                      onRemoveOffender(offender.id);
                    }}
                    overlayInnerStyle={{ padding: 10 }}
                    placement="topLeft"
                    title={intl.formatMessage({
                      defaultMessage: 'Remove the offender?',
                    })}
                  >
                    <Button
                      disabled={saving}
                      icon={<FontAwesomeIcon icon={faTrash} size="xs" />}
                      style={{ height: 36 }}
                    />
                  </Popconfirm>
                </Col>
              </Row>
            )}
          </div>
        )}
        {!offender.confirmedInIncident && (
          <div className={classes.involvedContainer}>
            {mergeActive ? (
              mergeActive === offender.id ? (
                <>
                  <Button
                    className={classes.mergeButton}
                    danger
                    disabled={!mergeSelected}
                    onClick={onMerge}
                    size="small"
                    type="ghost"
                  >
                    <FormattedMessage defaultMessage="Merge People" />
                  </Button>
                  <Button onClick={() => toggleMerge(null)} size="small">
                    <FormattedMessage defaultMessage="Cancel" />
                  </Button>
                </>
              ) : (
                <>
                  {/* <div className={classes.grow} /> */}
                  <Row gutter={8} justify="end">
                    <Col>
                      <Button
                        onClick={() => {
                          toggleMergeSelected(offender.id);
                        }}
                        type={
                          mergeSelected === offender.id ? 'primary' : 'default'
                        }
                      >
                        {mergeSelected === offender.id ? (
                          <FormattedMessage defaultMessage="Selected" />
                        ) : (
                          <FormattedMessage defaultMessage="Merge" />
                        )}
                      </Button>
                    </Col>
                  </Row>
                </>
              )
            ) : (
              <>
                <Paragraph className={classes.involvedQuestion}>
                  <FormattedMessage defaultMessage="Was this person involved in the incident?" />
                </Paragraph>
                <Radio.Group>
                  <Radio.Button
                    onClick={() => {
                      onConfirmOffender(offender.id);
                    }}
                    value
                  >
                    <FormattedMessage defaultMessage="Yes" />
                  </Radio.Button>
                  <Popconfirm
                    cancelText={intl.formatMessage({
                      defaultMessage: 'No',
                    })}
                    okText={intl.formatMessage({
                      defaultMessage: 'Yes',
                    })}
                    onConfirm={() => {
                      onRemoveOffender(offender.id);
                    }}
                    overlayInnerStyle={{ padding: 10 }}
                    placement="topLeft"
                    title={intl.formatMessage({
                      defaultMessage: 'Remove person from incident?',
                    })}
                  >
                    <Radio.Button disabled={saving} value={false}>
                      <FormattedMessage defaultMessage="No" />
                    </Radio.Button>
                  </Popconfirm>
                </Radio.Group>
                <Divider style={{ marginBottom: 10, marginTop: 10 }}>
                  <Text className={classes.dividerText}>
                    <FormattedMessage defaultMessage="OR" />
                  </Text>
                </Divider>
                <Tooltip
                  title={intl.formatMessage({
                    defaultMessage:
                      'Merge this offender with another offender on this incident',
                  })}
                >
                  <Button onClick={() => toggleMerge(offender.id)} size="small">
                    <FormattedMessage defaultMessage="Merge Person" />
                  </Button>
                </Tooltip>
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
                    values={{ index: index + 1 }}
                  />
                </Title>
                <Paragraph className={classes.involvedQuestion}>
                  <FormattedMessage defaultMessage="Do you have an image for this offender?" />
                </Paragraph>
                <Row>
                  <Col>
                    <Upload
                      accept=".png,.jpeg"
                      action={facialDetection ? imageAnalyseGo : imageUpload}
                      onChange={(info) =>
                        onChangeOffenderImage(info, offender.id)
                      }
                      showUploadList={false}
                    >
                      <Button
                        className={classes.buttonLeft}
                        disabled={uploading}
                        loading={uploading}
                        size="small"
                      >
                        <FormattedMessage defaultMessage="Yes" />
                      </Button>
                    </Upload>
                  </Col>
                  <Col>
                    {imagesRequired && (
                      <Popconfirm
                        cancelText={intl.formatMessage({
                          defaultMessage: 'No',
                        })}
                        okText={intl.formatMessage({
                          defaultMessage: 'Yes',
                        })}
                        onConfirm={() => {
                          onRemoveOffender(offender.id);
                        }}
                        overlayInnerStyle={{ padding: 10 }}
                        placement="topLeft"
                        title={intl.formatMessage({
                          defaultMessage:
                            'If you have no image the offender will be removed',
                        })}
                      >
                        <Button className={classes.buttonRight} size="small">
                          <FormattedMessage defaultMessage="No" />
                        </Button>
                      </Popconfirm>
                    )}
                    {!imagesRequired && (
                      <Button
                        className={classes.buttonRight}
                        onClick={() => onNoImages(offender.id)}
                        size="small"
                      >
                        <FormattedMessage defaultMessage="No" />
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
        <Paragraph style={{ marginTop: 5 }} type="danger">
          <FormattedMessage defaultMessage="Please confirm if this person was involved" />
        </Paragraph>
      )}
      {!offender.imageConfirmed && (
        <Paragraph style={{ marginTop: 5 }} type="danger">
          <FormattedMessage defaultMessage="Confirm there is an image." />
        </Paragraph>
      )}
    </>
  );
};

export default OffenderProfile;
