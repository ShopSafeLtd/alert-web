import type { OffenderSettingsType } from '#/types/DataType';
import type { FormInstance } from 'antd';

import { Button, Col, Form, Row, Skeleton } from 'antd';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import type { ImageData } from '../../ImageSelect/ImageSelectAnalyse.view';
import type { FormData } from './useAddNewOffender';

import { useStoreState } from '../../../../state';
import ImageSelectAnalyse from '../../ImageSelect/ImageSelectAnalyse.view';
import OffenderFormAddress from '../OffenderForm/OffenderFormAddress.view';
import OffenderFormDetails from '../OffenderForm/OffenderFormDetails.view';

interface Props {
  addOverride?: string;
  ageCheck: boolean | undefined;
  form: FormInstance<FormData>;
  idVerified: boolean | undefined;
  images?: ImageData[] | undefined;
  knowAddress: boolean | undefined;
  loading: boolean;
  offenderSettings: OffenderSettingsType | undefined;
  onClose: () => void;
  onSubmit: (value: FormData) => void;
  saving: boolean;
  setUploading: (value: boolean) => void;
  uploading: boolean;
}

const AddNewOffender = ({
  addOverride,
  ageCheck,
  form,
  idVerified,
  images,
  knowAddress,
  loading,
  offenderSettings,
  onClose,
  onSubmit,
  saving,
  setUploading,
  uploading,
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
          label={intl.formatMessage({
            defaultMessage: 'Images',
          })}
          name="images"
          rules={[
            {
              message: intl.formatMessage({
                defaultMessage: 'Images are required for offenders.',
              }),
              required: imagesRequired,
            },
          ]}
          tooltip={intl.formatMessage({
            defaultMessage: 'Select the images that the offender is in.',
          })}
        >
          <ImageSelectAnalyse
            form={form}
            images={images}
            setUploading={setUploading}
            uploading={uploading}
          />
        </Form.Item>
      )}

      <Form.Item>
        <Row gutter={10} justify="end" style={{ marginTop: 30 }}>
          <Col>
            <Button disabled={saving || uploading} onClick={onClose}>
              <FormattedMessage defaultMessage="Cancel" />
            </Button>
          </Col>
          <Col>
            <Button
              disabled={saving}
              htmlType="submit"
              loading={saving || uploading}
              type="primary"
            >
              {addOverride || intl.formatMessage({ defaultMessage: 'Add' })}
              {intl.formatMessage({ defaultMessage: 'Offender' })}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};
export default AddNewOffender;
