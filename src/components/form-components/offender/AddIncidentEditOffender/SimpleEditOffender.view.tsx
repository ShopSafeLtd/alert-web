import type { FormInstance } from 'antd';

import DatePicker from '#/components/util-components/DatePicker';
import { currentSchemeAtom } from '#/providers/SchemeProvider/SchemeProvider';
import {
  ageValues,
  buildValues,
  genderValues,
  raceValues,
} from '#/types/enums';
import { heightValues } from '#/types/enums/height';
import {
  Button,
  Col,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Switch,
  Typography,
} from 'antd';
import dayjs from 'dayjs';
import { IdSource } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import { useIntl } from 'react-intl';

import type { ImageData } from '../../ImageSelect/ImageSelectAnalyse.view';
import type { FormData, OffenderData } from './useEditOffender';

import ImageSelectAnalyse from '../../ImageSelect/ImageSelectAnalyse.view';

interface Props {
  ageCheck: boolean | undefined;
  data: OffenderData;
  form: FormInstance<FormData>;
  idVerified: boolean | undefined;
  images?: ImageData[];
  onClose: () => void;
  onSubmit: (value: FormData) => void;
  setUploading: (value: boolean) => void;
  uploading: boolean;
}

const EditOffender = ({
  ageCheck,
  data,
  form,
  idVerified,
  images,
  onClose,
  onSubmit,
  setUploading,
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
      <Form<FormData>
        form={form}
        initialValues={{
          age: data.age || null,
          ageCheck: !!data.dateOfBirth,
          alias: data.alias || [],
          build: data.build || null,
          comment: data.comment || null,
          dateOfBirth: data.dateOfBirth
            ? dayjs(data.dateOfBirth, 'YYYY-MM-DD')
            : null,
          dateSource: data.dateSource || null,
          gender: data.gender || null,
          hair: data.hair || null,
          height: data.height || null,
          idSource: data.idSource || null,
          idVerified: data.idVerified || null,
          images: data.images || null,
          knownFor: data.knownFor || [],
          name: data.name || null,
          peculiarities: data.peculiarities || null,
          race: data.race || null,
          targetedGoods: data.targetedGoods || [],
        }}
        layout="vertical"
        onFinish={onSubmit}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Name',
              })}
              name="name"
              tooltip={intl.formatMessage({
                defaultMessage: 'Enter the offenders name if you know it.',
              })}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Alias',
              })}
              name="alias"
              tooltip={intl.formatMessage({
                defaultMessage: 'Add the alias of the offender if known.',
              })}
            >
              <Select mode="tags" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16} wrap>
          <Col span={12}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Build',
              })}
              name="build"
              tooltip={intl.formatMessage({
                defaultMessage: 'Select the build of the offender if known.',
              })}
            >
              <Select options={buildValues} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Height',
              })}
              name="height"
              tooltip={intl.formatMessage({
                defaultMessage: 'Select the height of the offender if known.',
              })}
            >
              <Select options={heightValues} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Sex',
              })}
              name="gender"
              tooltip={intl.formatMessage({
                defaultMessage: 'Select the gender of the offender if known.',
              })}
            >
              <Select options={genderValues} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Ethnicity',
              })}
              name="race"
              tooltip={intl.formatMessage({
                defaultMessage:
                  'Select the ethnicity of the offender if known.',
              })}
            >
              <Select options={raceValues} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Hair',
              })}
              name="hair"
              tooltip={intl.formatMessage({
                defaultMessage:
                  'The style and colour of the offenders hair if known.',
              })}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16} wrap>
          <Col span={24}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Characteristics',
              })}
              name="peculiarities"
              tooltip={intl.formatMessage({
                defaultMessage: 'Any distinctive features of the offender.',
              })}
            >
              <Input.TextArea />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Comment',
              })}
              name="comment"
              tooltip={intl.formatMessage({
                defaultMessage: 'Any other comments about this offender.',
              })}
            >
              <Input.TextArea />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20} wrap>
          <Col span={12}>
            <Typography.Text>
              {intl.formatMessage({
                defaultMessage: "Do you know the offender's date of birth?",
              })}
            </Typography.Text>
            <Form.Item name="ageCheck" valuePropName="checked">
              <Switch
                checkedChildren={intl.formatMessage({
                  defaultMessage: 'Yes',
                })}
                style={{ marginLeft: 10, marginTop: 10 }}
                unCheckedChildren={intl.formatMessage({
                  defaultMessage: 'No',
                })}
              />
            </Form.Item>
          </Col>

          {ageCheck ? (
            <>
              <Col span={10}>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Date of Birth',
                  })}
                  name="dateOfBirth"
                >
                  <DatePicker
                    disabledDate={(current) =>
                      current && current.valueOf() > Date.now()
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Date of Birth Source',
                  })}
                  name="dateSource"
                  tooltip={intl.formatMessage({
                    defaultMessage:
                      "Enter the information source of the offender's date of birth range of the offender.",
                  })}
                >
                  <Input.TextArea />
                </Form.Item>
              </Col>
            </>
          ) : (
            <Col span={10}>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Age',
                })}
                name="age"
                tooltip={intl.formatMessage({
                  defaultMessage:
                    'Select an estimated age range of the offender if known.',
                })}
              >
                <Select options={ageValues} />
              </Form.Item>
            </Col>
          )}
        </Row>
        <Row gutter={50}>
          <Col>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: "Has the offender's ID been verified?",
              })}
              name="idVerified"
              tooltip={intl.formatMessage({
                defaultMessage:
                  'Have you confirmed the offenders ID using an accepted method?',
              })}
            >
              <Radio.Group>
                <Radio.Button value>
                  {intl.formatMessage({ defaultMessage: 'Yes' })}
                </Radio.Button>
                <Radio.Button value={false}>
                  {intl.formatMessage({ defaultMessage: 'No' })}
                </Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>
          {idVerified && (
            <Col>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'ID Source',
                })}
                name="idSource"
                rules={[
                  {
                    message: intl.formatMessage({
                      defaultMessage: 'Please enter the source of the ID.',
                    }),
                    required: true,
                  },
                ]}
                tooltip={intl.formatMessage({
                  defaultMessage: 'How did you confirm the ID?',
                })}
              >
                <Select
                  options={[
                    {
                      label: intl.formatMessage({
                        defaultMessage: 'Driving Licence',
                      }),
                      value: IdSource.DrivingLicence,
                    },
                    {
                      label: intl.formatMessage({
                        defaultMessage: 'ID Card',
                      }),
                      value: IdSource.IdCard,
                    },
                    {
                      label: intl.formatMessage({
                        defaultMessage: 'by BCRP',
                      }),
                      value: IdSource.Bcrp,
                    },
                    {
                      label: intl.formatMessage({
                        defaultMessage: 'Known Offender',
                      }),
                      value: IdSource.Known,
                    },
                    {
                      label: intl.formatMessage({
                        defaultMessage: 'Provided By Police',
                      }),
                      value: IdSource.Police,
                    },
                    {
                      label: intl.formatMessage({
                        defaultMessage: 'Other',
                      }),
                      value: IdSource.Other,
                    },
                    {
                      label: intl.formatMessage({
                        defaultMessage: 'Passport',
                      }),
                      value: IdSource.Passport,
                    },
                  ]}
                  style={{ width: 200 }}
                />
              </Form.Item>
            </Col>
          )}
        </Row>
        {data.knownFor && data.knownFor.length > 0 && (
          <Row>
            <Col span={24}>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Crime Types',
                })}
                name="knownFor"
                tooltip={intl.formatMessage({
                  defaultMessage:
                    'Select the relevant crime types for this offender, these help to categorize the offender.',
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
                  defaultMessage: 'Select the Goods that this offender stole.',
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
        {/* <Tooltip
          title={intl.formatMessage({
            defaultMessage:
              'If there is a known address for the offender please enter it.',
            id: 'uYwK0e',
          })}
        >
          <Typography.Title
            style={{ marginBottom: 0, marginLeft: 5 }}
            level={4}
          >
            {intl.formatMessage({
              defaultMessage: 'Addresses',
              id: 'xBrtnx',
            })}
          </Typography.Title>
        </Tooltip>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="addressAlias"
              label={intl.formatMessage({
                defaultMessage: 'Label',
                id: '753yX5',
              })}
              tooltip={intl.formatMessage({
                defaultMessage:
                  'A friendly name for the address to identify it, such as home',
                id: 'YI+p4u',
              })}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="building"
              label={intl.formatMessage({
                defaultMessage: 'Building',
                id: 'oS/nae',
              })}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="street"
              label={intl.formatMessage({
                defaultMessage: 'Street',
                id: 'BaIwdV',
              })}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="townCity"
              label={intl.formatMessage({
                defaultMessage: 'Town/City',
                id: 'byaTQZ',
              })}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="county"
              label={intl.formatMessage({
                defaultMessage: 'County',
                id: 'B+KJhc',
              })}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="postcode"
              label={intl.formatMessage({
                defaultMessage: 'Postcode',
                id: 'FJhjgz',
              })}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row> */}

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
        <Form.Item>
          <Row gutter={10} justify="end" style={{ marginTop: 30 }}>
            <Col>
              <Button loading={uploading} onClick={onClose}>
                {intl.formatMessage({
                  defaultMessage: 'Cancel',
                })}
              </Button>
            </Col>
            <Col>
              <Button htmlType="submit" loading={uploading} type="primary">
                {intl.formatMessage({
                  defaultMessage: 'Save',
                })}
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </div>
  );
};
export default EditOffender;
