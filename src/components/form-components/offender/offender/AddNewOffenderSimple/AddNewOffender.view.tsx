import React from 'react';

import type { FormInstance } from 'antd';
import { Skeleton, Button, Col, Form, Row } from 'antd';

import { FormattedMessage, useIntl } from 'react-intl';
import type { OffenderSettingsType } from '#/types/DataType';
import type { FormData } from './useAddNewOffender';
import type { ImageData } from '../../../ImageSelect/ImageSelectAnalyse.view';
import ImageSelectAnalyse from '../../../ImageSelect/ImageSelectAnalyse.view';
import { useStoreState } from '../../../../../state';
import OffenderFormDetails from '../OffenderForm/OffenderFormDetails.view';
import OffenderFormAddress from '../OffenderForm/OffenderFormAddress.view';

interface Props {
  onClose: () => void;
  onSubmit: (value: FormData) => void;
  saving: boolean;
  ageCheck: boolean | undefined;
  form: FormInstance<FormData>;
  idVerified: boolean | undefined;
  images?: ImageData[] | undefined;
  uploading: boolean;
  setUploading: (value: boolean) => void;
  offenderSettings: OffenderSettingsType | undefined;
  loading: boolean;
  knowAddress: boolean | undefined;
}

const AddNewOffender = ({
  onClose,
  onSubmit,
  saving,
  ageCheck,
  idVerified,
  form,
  images,
  uploading,
  setUploading,
  offenderSettings,
  loading,
  knowAddress,
}: Props): JSX.Element => {
  const intl = useIntl();
  const imagesRequired = useStoreState(
    (state) => state.scheme.imagesRequiredOnOffenders
  );

  return loading ? (
    <Skeleton />
  ) : (
    <Form form={form} layout="vertical" onFinish={onSubmit}>
      <OffenderFormDetails
        ageCheck={ageCheck}
        idVerified={idVerified}
        offenderSettings={offenderSettings}
        saving={saving}
      />
      <OffenderFormAddress knowAddress={knowAddress} saving={saving} />

      {offenderSettings?.images && (
        <Form.Item
          name="images"
          label={intl.formatMessage({
            defaultMessage: 'Images',
            id: 'Fip4H8',
          })}
          tooltip={intl.formatMessage({
            defaultMessage: 'Select the images that the offender is in.',
            id: 'LQT0YO',
          })}
          rules={[
            {
              required: imagesRequired,
              message: intl.formatMessage({
                defaultMessage: 'Images are required for offenders.',
                id: 'UwlDA8',
              }),
            },
          ]}
        >
          <ImageSelectAnalyse
            setUploading={setUploading}
            uploading={uploading}
            images={images}
            form={form}
          />
        </Form.Item>
      )}

      <Form.Item>
        <Row style={{ marginTop: 30 }} gutter={10} justify="end">
          <Col>
            <Button disabled={saving || uploading} onClick={onClose}>
              <FormattedMessage defaultMessage="Cancel" id="47FYwb" />
            </Button>
          </Col>
          <Col>
            <Button
              disabled={saving}
              loading={saving || uploading}
              type="primary"
              htmlType="submit"
            >
              <FormattedMessage defaultMessage="Add Offender" id="m3ChN4" />
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};
export default AddNewOffender;
