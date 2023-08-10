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
import { IdSource } from 'graphql/generated';
import { useStoreState } from 'state';
import type { FormData, OffenderData } from './useEditOffender';
import type { ImageData } from '../../../ImageSelect/ImageSelect.view';
import ImageSelect from '../../../ImageSelect/ImageSelect.view';

interface Props {
  onSubmit: (value: FormData) => void;
  data: OffenderData;
  onClose: () => void;
  form: FormInstance<FormData>;
  ageCheck: boolean | undefined;
  idVerified: boolean | undefined;
  images?: ImageData[];
}

const EditOffender = ({
  onSubmit,
  data,
  onClose,
  form,
  ageCheck,
  idVerified,
  images,
}: Props): JSX.Element => {
  const intl = useIntl();
  const imagesRequired = useStoreState(
    (state) => state.scheme.imagesRequiredOnOffenders
  );

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
        }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label={intl.formatMessage({
                defaultMessage: 'Name',
                id: 'HAlOn1',
              })}
              tooltip={intl.formatMessage({
                defaultMessage:
                  'Enter the offenders name if you know it, if not leave this field blank.',
                id: 'pYHIHH',
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
                id: 'Ri9jA7',
              })}
              tooltip={intl.formatMessage({
                defaultMessage: 'Select the alias of the offender if known.',
                id: '54LWuR',
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
                id: 'RSctv1',
              })}
              tooltip={intl.formatMessage({
                defaultMessage: 'Select the build of the offender if known.',
                id: 'f0WQZR',
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
                id: 'teLZyZ',
              })}
              tooltip={intl.formatMessage({
                defaultMessage: 'Select the height of the offender if known.',
                id: 'B+TToj',
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
                id: 'eWJHGp',
              })}
              tooltip={intl.formatMessage({
                defaultMessage: 'Select the gender of the offender if known.',
                id: 'h04BWW',
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
                id: 'XtCAFo',
              })}
              tooltip={intl.formatMessage({
                defaultMessage:
                  'Select the ethnicity of the offender if known.',
                id: 'Wv0puZ',
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
                id: 'e4YBbX',
              })}
              tooltip={intl.formatMessage({
                defaultMessage:
                  'The style and colour of the offenders hair if known.',
                id: 'bnOdvC',
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
                defaultMessage: 'Peculiarities',
                id: '9s+ZmX',
              })}
              tooltip={intl.formatMessage({
                defaultMessage:
                  'Anything distinctive features of the offender.',
                id: 'NssvPD',
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
                id: 'LgbKvU',
              })}
              tooltip={intl.formatMessage({
                defaultMessage: 'Leave a comment for the offender.',
                id: 'YSNQlW',
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
                id: 'nRYjxK',
              })}
            </Typography.Text>
            <Form.Item name="ageCheck" valuePropName="checked">
              <Switch
                style={{ marginLeft: 10, marginTop: 10 }}
                checkedChildren={intl.formatMessage({
                  defaultMessage: 'Yes',
                  id: 'a5msuh',
                })}
                unCheckedChildren={intl.formatMessage({
                  defaultMessage: 'No',
                  id: 'oUWADl',
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
                    id: 'e9Z+tg',
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
                    id: 'txjqJv',
                  })}
                  tooltip={intl.formatMessage({
                    defaultMessage:
                      "Enter the information source of the offender's date of birth range of the offender.",
                    id: '3Jk/hp',
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
                  id: '9oNQSC',
                })}
                tooltip={intl.formatMessage({
                  defaultMessage:
                    'Select an estimated age range of the offender if known.',
                  id: 'w+tgOS',
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
                defaultMessage: 'Has the offenders ID been verified?',
                id: 'xP3cvr',
              })}
              tooltip={intl.formatMessage({
                defaultMessage:
                  'Have you confirmed the offenders ID using an accepted method?',
                id: 'I7veBp',
              })}
            >
              <Radio.Group>
                <Radio.Button value>
                  {intl.formatMessage({ defaultMessage: 'Yes', id: 'a5msuh' })}
                </Radio.Button>
                <Radio.Button value={false}>
                  {intl.formatMessage({ defaultMessage: 'No', id: 'oUWADl' })}
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
                  id: 'nPSQJe',
                })}
                tooltip={intl.formatMessage({
                  defaultMessage: 'How did you confirm the ID?',
                  id: 'TuUlTh',
                })}
                rules={[
                  {
                    required: true,
                    message: intl.formatMessage({
                      defaultMessage: 'Please enter the source of the ID.',
                      id: 'tGh93Z',
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
                        id: 'wstpvP',
                      }),
                      value: IdSource.DrivingLicence,
                    },
                    {
                      label: intl.formatMessage({
                        defaultMessage: 'ID Card',
                        id: 'Fdvpdz',
                      }),
                      value: IdSource.IdCard,
                    },
                    {
                      label: intl.formatMessage({
                        defaultMessage: 'Known Offender',
                        id: 'he2Vcw',
                      }),
                      value: IdSource.Known,
                    },
                    {
                      label: intl.formatMessage({
                        defaultMessage: 'Other',
                        id: '/VnDMl',
                      }),
                      value: IdSource.Other,
                    },
                    {
                      label: intl.formatMessage({
                        defaultMessage: 'Passport',
                        id: 'OSJSb9',
                      }),
                      value: IdSource.Passport,
                    },
                  ]}
                />
              </Form.Item>
            </Col>
          )}
        </Row>

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
          <ImageSelect
            images={
              data.images
                ? images
                    ?.filter(
                      (el) => !data?.images?.find((el2) => el2.url === el.url)
                    )
                    // concat not allowed
                    // eslint-disable-next-line
                    .concat(data.images.map((el) => ({ ...el, uid: el.id })))
                : images
            }
            value={data.images}
          />
        </Form.Item>
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
    </div>
  );
};
export default EditOffender;
