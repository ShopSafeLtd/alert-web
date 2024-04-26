import React from 'react';
import type { FormInstance } from 'antd';
import { Input, Skeleton, Button, Col, Form, Row, Select } from 'antd';
import moment from 'moment';
import { useIntl } from 'react-intl';
import { useStoreState } from 'state';
import type { OffenderSettingsType } from '#/types/DataType';
import type { FormData, OffenderData } from './useSimpleEditOffender';
import type { ImageData } from '../../../ImageSelect/ImageSelectAnalyse.view';
import ImageSelectAnalyse from '../../../ImageSelect/ImageSelectAnalyse.view';
import OffenderFormDetails from '../OffenderForm/OffenderFormDetails.view';
import OffenderFormAddress from '../OffenderForm/OffenderFormAddress.view';

interface Props {
  onSubmit: (value: FormData) => void;
  data: OffenderData;
  onClose: () => void;
  form: FormInstance<FormData>;
  ageCheck: boolean | undefined;
  idVerified: boolean | undefined;
  images?: ImageData[];
  offenderSettings: OffenderSettingsType | undefined;
  loading: boolean;
  saving: boolean;
  needJustification: boolean;
  uploading: boolean;
  setUploading: (value: boolean) => void;
  knowAddress: boolean | undefined;
}

const EditOffender = ({
  onSubmit,
  data,
  onClose,
  form,
  ageCheck,
  idVerified,
  images,
  offenderSettings,
  loading,
  saving,
  needJustification,
  uploading,
  setUploading,

  knowAddress,
}: Props): JSX.Element => {
  const intl = useIntl();
  const imagesRequired = useStoreState(
    (state) => state.scheme.imagesRequiredOnOffenders
  );
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
          onFinish={onSubmit}
          layout="vertical"
          form={form}
          initialValues={{
            name: data.name || null,
            alias: data.alias || [],
            age: data.age || null,
            gender: data.gender || null,
            race: data.race || null,
            build: data.build || null,
            height: data.height || null,
            hair: data.hair || null,
            ageCheck: !!data.dateOfBirth,
            peculiarities: data.peculiarities || null,
            dateOfBirth: data.dateOfBirth
              ? moment(data.dateOfBirth, 'YYYY-MM-DD')
              : null,
            dateSource: data.dateSource || null,
            comment: data.comment || null,
            idVerified: data.idVerified || null,
            idSource: data.idSource || null,
            images: data.images || null,
            knownFor: data.knownFor || [],
            targetedGoods: data.targetedGoods || [],
            justification: data.justification || '',
            infoSource: data.infoSource || '',
          }}
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
                  name="knownFor"
                  label={intl.formatMessage({
                    defaultMessage: 'Crime Types',
                    id: 'Piba4q',
                  })}
                  tooltip={intl.formatMessage({
                    defaultMessage:
                      'Select the relevant crime types for this offender, these help to categorize the offender.',
                    id: 'ly6B/b',
                  })}
                >
                  <Select mode="multiple" maxTagCount={3}>
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
                  name="targetedGoods"
                  label={intl.formatMessage({
                    defaultMessage: 'Goods',
                    id: 'u5dS1t',
                  })}
                  tooltip={intl.formatMessage({
                    defaultMessage:
                      'Select the Goods that this offender stole.',
                    id: 'cjsTZ/',
                  })}
                >
                  <Select mode="multiple" maxTagCount={3}>
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
                  name="infoSource"
                  label={intl.formatMessage({
                    defaultMessage: 'Information Source',
                    id: 'LUqHSz',
                  })}
                  tooltip={intl.formatMessage({
                    defaultMessage: `Enter the information source of the offender's name`,
                    id: 'WYJoK2',
                  })}
                >
                  <Input.TextArea disabled={saving} />
                </Form.Item>
              </Col>
            )}

            {(needJustification || data.justification) && (
              <Col span={23}>
                <Form.Item
                  name="justification"
                  label={intl.formatMessage({
                    defaultMessage: 'Justification',
                    id: 'i0xkcf',
                  })}
                  tooltip={intl.formatMessage({
                    defaultMessage: `Enter a justification to explain why this offender doesn't connect with an incident.`,
                    id: 'P7rUrU',
                  })}
                  rules={[
                    {
                      required: needJustification,
                      message: intl.formatMessage({
                        defaultMessage:
                          'Please enter a justification for the offender.',
                        id: '11rxZC',
                      }),
                    },
                  ]}
                >
                  <Input.TextArea disabled={saving} />
                </Form.Item>
              </Col>
            )}
          </Row>
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
                images={allImages}
                value={data.images}
                form={form}
                setUploading={setUploading}
                uploading={uploading}
              />
            </Form.Item>
          )}
          <Form.Item>
            <Row style={{ marginTop: 30 }} gutter={10} justify="end">
              <Col>
                <Button onClick={onClose}>
                  {intl.formatMessage({
                    defaultMessage: 'Cancel',
                    id: '47FYwb',
                  })}
                </Button>
              </Col>
              <Col>
                <Button type="primary" htmlType="submit">
                  {intl.formatMessage({
                    defaultMessage: 'Save',
                    id: 'jvo0vs',
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
