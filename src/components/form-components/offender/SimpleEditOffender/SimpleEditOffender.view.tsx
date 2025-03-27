/* eslint-disable quotes */
import type { OffenderSettingsType } from '#/types/DataType';
import type { FormInstance } from 'antd';

import { currentSchemeAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { Button, Col, Form, Input, Row, Select, Skeleton } from 'antd';
import dayjs from 'dayjs';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import { useIntl } from 'react-intl';

import type { ImageData } from '../../ImageSelect/ImageSelectAnalyse.view';
import type { FormData, OffenderData } from './useSimpleEditOffender';

import ImageSelectAnalyse from '../../ImageSelect/ImageSelectAnalyse.view';
import OffenderFormAddress from '../OffenderForm/OffenderFormAddress.view';
import OffenderFormDetails from '../OffenderForm/OffenderFormDetails.view';

interface Props {
  ageCheck: boolean | undefined;
  data: OffenderData;
  form: FormInstance<FormData>;
  idVerified: boolean | undefined;
  images?: ImageData[];
  knowAddress: boolean | undefined;
  loading: boolean;
  needJustification: boolean;
  offenderSettings: OffenderSettingsType | undefined;
  onClose: () => void;
  onSubmit: (value: FormData) => void;
  saving: boolean;
  setUploading: (value: boolean) => void;
  showAddress?: boolean;
  uploading: boolean;
}

const EditOffender = ({
  ageCheck,
  data,
  form,
  idVerified,
  images,
  knowAddress,
  loading,
  needJustification,
  offenderSettings,
  onClose,
  onSubmit,
  saving,
  setUploading,
  showAddress,
  uploading,
}: Props): JSX.Element => {
  const intl = useIntl();
  const imagesRequired =
    useAtomValue(currentSchemeAtom)?.imagesRequiredOnOffenders;
  const filteredImages = images?.filter(
    (el) => !data?.images?.find((el2) => el2.url === el.url)
  );
  const vehicleImages = data?.images?.map((el) => ({ ...el, uid: el.id }));
  const allImages = vehicleImages
    ? [...(filteredImages || []), ...vehicleImages]
    : images;

  return (
    <div className="list-view">
      {loading ? (
        <Skeleton />
      ) : (
        <Form<FormData>
          form={form}
          initialValues={{
            addressAlias: data.address?.alias || '',
            age: data.age || null,
            ageCheck: !!data.dateOfBirth,
            alias: data.alias || [],
            build: data.build || null,
            building: data.address?.building || '',
            comment: data.comment || null,
            county: data.address?.county || '',
            dateOfBirth: data.dateOfBirth
              ? dayjs(data.dateOfBirth, 'YYYY-MM-DD').toDate()
              : null,
            dateSource: data.dateSource || null,
            gender: data.gender || null,
            hair: data.hair || null,
            height: data.height || null,
            idSource: data.idSource || null,
            idVerified: data.idVerified || null,
            images: data.images || null,
            infoSource: data.infoSource || '',
            justification: data.justification || '',
            knowAddress: data.knowAddress || false,
            knownFor: data.knownFor || [],
            name: data.name || null,
            peculiarities: data.peculiarities || null,
            postcode: data.address?.postcode || '',
            race: data.race || null,
            street: data.address?.street || '',
            targetedGoods: data.targetedGoods || [],
            townCity: data.address?.townCity || '',
          }}
          layout="vertical"
          onFinish={onSubmit}
        >
          <OffenderFormDetails
            ageCheck={ageCheck}
            idVerified={idVerified}
            offenderSettings={offenderSettings}
            saving={saving}
          />
          {data.knownFor && data.knownFor.length > 0 && (
            <Row>
              <Col span={24}>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Incident Types',
                  })}
                  name="knownFor"
                  tooltip={intl.formatMessage({
                    defaultMessage:
                      'Select the relevant incident types for this offender, these help to categorize the offender.',
                  })}
                >
                  <Select maxTagCount={3} mode="multiple">
                    {data.knownFor.map((el) => (
                      <Select.Option key={el} value={el}>
                        {el}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          )}
          {data.targetedGoods && data.targetedGoods.length > 0 && (
            <Row>
              <Col span={24}>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Goods',
                  })}
                  name="targetedGoods"
                  tooltip={intl.formatMessage({
                    defaultMessage:
                      'Select the Goods that this offender stole.',
                  })}
                >
                  <Select maxTagCount={3} mode="multiple">
                    {data.targetedGoods.map((el) => (
                      <Select.Option key={el} value={el}>
                        {el}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          )}
          <Row gutter={16}>
            {data.infoSource && (
              <Col span={23}>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Information Source',
                  })}
                  name="infoSource"
                  tooltip={intl.formatMessage({
                    defaultMessage:
                      "Enter the information source of the offender's name",
                  })}
                >
                  <Input.TextArea disabled={saving} />
                </Form.Item>
              </Col>
            )}

            {(needJustification || data.justification) && (
              <Col span={23}>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Justification',
                  })}
                  name="justification"
                  rules={[
                    {
                      message: intl.formatMessage({
                        defaultMessage:
                          'Please enter a justification for the offender.',
                      }),
                      required: needJustification,
                    },
                  ]}
                  tooltip={intl.formatMessage({
                    defaultMessage:
                      "Enter a justification to explain why this offender doesn't connect with an incident.",
                  })}
                >
                  <Input.TextArea disabled={saving} />
                </Form.Item>
              </Col>
            )}
          </Row>
          {showAddress && (
            <OffenderFormAddress knowAddress={knowAddress} saving={saving} />
          )}

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
                images={allImages}
                setUploading={setUploading}
                uploading={uploading}
                value={data.images}
              />
            </Form.Item>
          )}
          <Form.Item>
            <Row gutter={10} justify="end" style={{ marginTop: 30 }}>
              <Col>
                <Button onClick={onClose}>
                  {intl.formatMessage({
                    defaultMessage: 'Cancel',
                  })}
                </Button>
              </Col>
              <Col>
                <Button htmlType="submit" type="primary">
                  {intl.formatMessage({
                    defaultMessage: 'Save',
                  })}
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};
export default EditOffender;
