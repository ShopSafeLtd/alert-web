import React from 'react';
import type { FormInstance } from 'antd';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Switch,
  Typography,
} from 'antd';
import { ageValues, buildValues, genderValues, raceValues } from 'types/enums';
import moment from 'moment';
import { useIntl } from 'react-intl';
import { heightValues } from 'types/enums/height';
import { IdSource } from 'graphql/types';
import { useStoreState } from 'state';
import type { FormData, OffenderData } from './useEditOffender';
import type { ImageData } from '../../../ImageSelect/ImageSelectAnalyse.view';
import ImageSelectAnalyse from '../../../ImageSelect/ImageSelectAnalyse.view';

interface Props {
  onSubmit: (value: FormData) => void;
  data: OffenderData;
  onClose: () => void;
  form: FormInstance<FormData>;
  ageCheck: boolean | undefined;
  idVerified: boolean | undefined;
  images?: ImageData[];
  uploading: boolean;
  setUploading: (value: boolean) => void;
}

const EditOffender = ({
  onSubmit,
  data,
  onClose,
  form,
  ageCheck,
  idVerified,
  images,
  uploading,
  setUploading,
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
        }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label={intl.formatMessage({
                defaultMessage: 'Name',
              })}
              tooltip={intl.formatMessage({
                defaultMessage: 'Enter the offenders name if you know it.',
              })}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="alias"
              label={intl.formatMessage({
                defaultMessage: 'Alias',
              })}
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
              name="build"
              label={intl.formatMessage({
                defaultMessage: 'Build',
              })}
              tooltip={intl.formatMessage({
                defaultMessage: 'Select the build of the offender if known.',
              })}
            >
              <Select options={buildValues} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="height"
              label={intl.formatMessage({
                defaultMessage: 'Height',
              })}
              tooltip={intl.formatMessage({
                defaultMessage: 'Select the height of the offender if known.',
              })}
            >
              <Select options={heightValues} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="gender"
              label={intl.formatMessage({
                defaultMessage: 'Sex',
              })}
              tooltip={intl.formatMessage({
                defaultMessage: 'Select the gender of the offender if known.',
              })}
            >
              <Select options={genderValues} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="race"
              label={intl.formatMessage({
                defaultMessage: 'Ethnicity',
              })}
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
              name="hair"
              label={intl.formatMessage({
                defaultMessage: 'Hair',
              })}
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
              name="peculiarities"
              label={intl.formatMessage({
                defaultMessage: 'Characteristics',
              })}
              tooltip={intl.formatMessage({
                defaultMessage: 'Any distinctive features of the offender.',
              })}
            >
              <Input.TextArea />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="comment"
              label={intl.formatMessage({
                defaultMessage: 'Comment',
              })}
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
                style={{ marginLeft: 10, marginTop: 10 }}
                checkedChildren={intl.formatMessage({
                  defaultMessage: 'Yes',
                })}
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
                  name="dateOfBirth"
                  label={intl.formatMessage({
                    defaultMessage: 'Date of Birth',
                  })}
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
                  name="dateSource"
                  label={intl.formatMessage({
                    defaultMessage: 'Date of Birth Source',
                  })}
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
                name="age"
                label={intl.formatMessage({
                  defaultMessage: 'Age',
                })}
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
              name="idVerified"
              label={intl.formatMessage({
                defaultMessage: "Has the offender's ID been verified?",
              })}
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
                name="idSource"
                label={intl.formatMessage({
                  defaultMessage: 'ID Source',
                })}
                tooltip={intl.formatMessage({
                  defaultMessage: 'How did you confirm the ID?',
                })}
                rules={[
                  {
                    required: true,
                    message: intl.formatMessage({
                      defaultMessage: 'Please enter the source of the ID.',
                    }),
                  },
                ]}
              >
                <Select
                  style={{ width: 200 }}
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
                />
              </Form.Item>
            </Col>
          )}
        </Row>
        {data.knownFor && data.knownFor.length > 0 && (
          <Row>
            <Col span={24}>
              <Form.Item
                name="knownFor"
                label={intl.formatMessage({
                  defaultMessage: 'Crime Types',
                })}
                tooltip={intl.formatMessage({
                  defaultMessage:
                    'Select the relevant crime types for this offender, these help to categorize the offender.',
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
                })}
                tooltip={intl.formatMessage({
                  defaultMessage: 'Select the Goods that this offender stole.',
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
          name="images"
          label={intl.formatMessage({
            defaultMessage: 'Images',
          })}
          tooltip={intl.formatMessage({
            defaultMessage: 'Select the images that the offender is in.',
          })}
          rules={[
            {
              required: imagesRequired,
              message: intl.formatMessage({
                defaultMessage: 'Images are required for offenders.',
              }),
            },
          ]}
        >
          <ImageSelectAnalyse
            images={allImages}
            value={data.images}
            setUploading={setUploading}
            uploading={uploading}
            form={form}
          />
        </Form.Item>
        <Form.Item>
          <Row style={{ marginTop: 30 }} gutter={10} justify="end">
            <Col>
              <Button onClick={onClose} loading={uploading}>
                {intl.formatMessage({
                  defaultMessage: 'Cancel',
                })}
              </Button>
            </Col>
            <Col>
              <Button type="primary" htmlType="submit" loading={uploading}>
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
