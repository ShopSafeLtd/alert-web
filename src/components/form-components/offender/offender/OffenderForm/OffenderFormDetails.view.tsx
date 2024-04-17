import React from 'react';
import {
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
import { heightValues } from 'types/enums/height';
import { IdSource } from 'graphql/generated';
import { useIntl } from 'react-intl';
import type { OffenderSettingsType } from '#/types/DataType';
import useStyles from './OffenderFormDetails.style';

interface Props {
  saving?: boolean;
  ageCheck: boolean | undefined;
  idVerified: boolean | undefined;
  offenderSettings: OffenderSettingsType | undefined;
}

const OffenderFormDetails = ({
  ageCheck,
  idVerified,
  saving,
  offenderSettings,
}: Props): JSX.Element => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <>
      <Row gutter={16}>
        {offenderSettings?.name && (
          <Col span={12}>
            <Form.Item
              name="name"
              label={intl.formatMessage({
                defaultMessage: 'Name',
                id: 'HAlOn1',
              })}
              tooltip={intl.formatMessage({
                defaultMessage: 'Enter the offenders name if you know it',
                id: 'cPZLw1',
              })}
            >
              <Input className={classes.nameSelect} disabled={saving} />
            </Form.Item>
          </Col>
        )}
        {offenderSettings?.alias && (
          <Col span={12}>
            <Form.Item
              name="alias"
              label={intl.formatMessage({
                defaultMessage: 'Alias',
                id: 'Ri9jA7',
              })}
              tooltip={intl.formatMessage({
                defaultMessage: 'Add the alias of the offender if known.',
                id: 'WC4Y9J',
              })}
            >
              <Select disabled={saving} mode="tags" />
            </Form.Item>
          </Col>
        )}
      </Row>
      <Row gutter={16} wrap>
        {offenderSettings?.build && (
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
              <Select options={buildValues} disabled={saving} />
            </Form.Item>
          </Col>
        )}
        {offenderSettings?.height && (
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
              <Select options={heightValues} disabled={saving} />
            </Form.Item>
          </Col>
        )}
        {offenderSettings?.gender && (
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
              <Select options={genderValues} disabled={saving} />
            </Form.Item>
          </Col>
        )}
        {offenderSettings?.ethnicity && (
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
              <Select options={raceValues} disabled={saving} />
            </Form.Item>
          </Col>
        )}
        {offenderSettings?.hair && (
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
              <Input disabled={saving} />
            </Form.Item>
          </Col>
        )}
      </Row>

      <Row gutter={16} wrap>
        {offenderSettings?.peculiarities && (
          <Col span={24}>
            <Form.Item
              name="peculiarities"
              label={intl.formatMessage({
                defaultMessage: 'Characteristics',
                id: 'xksukL',
              })}
              tooltip={intl.formatMessage({
                defaultMessage: 'Any distinctive features of the offender.',
                id: 'iEuZvV',
              })}
            >
              <Input.TextArea disabled={saving} />
            </Form.Item>
          </Col>
        )}
        {offenderSettings?.comment && (
          <Col span={24}>
            <Form.Item
              name="comment"
              label={intl.formatMessage({
                defaultMessage: 'Comment',
                id: 'LgbKvU',
              })}
              tooltip={intl.formatMessage({
                defaultMessage: 'Any other comments about this offender.',
                id: '8d0eZE',
              })}
            >
              <Input.TextArea disabled={saving} />
            </Form.Item>
          </Col>
        )}
      </Row>
      {offenderSettings?.age && (
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
            {/* <Form.Item
              name="ageCheck"
              label={intl.formatMessage({
                defaultMessage: "Do you know the offender's date of birth?",
                id: 'nRYjxK',
              })}
            >
              <Radio.Group disabled={saving}>
                <Radio.Button value>
                  {intl.formatMessage({
                    defaultMessage: 'Yes',
                    id: 'a5msuh',
                  })}
                </Radio.Button>
                <Radio.Button value={false}>
                  {intl.formatMessage({ defaultMessage: 'No', id: 'oUWADl' })}
                </Radio.Button>
              </Radio.Group>
            </Form.Item> */}
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
                    disabled={saving}
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
                  <Input.TextArea disabled={saving} />
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
                <Select options={ageValues} disabled={saving} />
              </Form.Item>
            </Col>
          )}
        </Row>
      )}
      {offenderSettings?.idVerified && (
        <Row gutter={50}>
          <Col>
            <Form.Item
              name="idVerified"
              label={intl.formatMessage({
                defaultMessage: "Has the offender's ID been verified?",
                id: 'FB6LSh',
              })}
              tooltip={intl.formatMessage({
                defaultMessage:
                  'Have you confirmed the offenders ID using an accepted method?',
                id: 'I7veBp',
              })}
            >
              <Radio.Group disabled={saving}>
                <Radio.Button value>
                  {intl.formatMessage({
                    defaultMessage: 'Yes',
                    id: 'a5msuh',
                  })}
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
                  disabled={saving}
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
                        defaultMessage: 'By BCRP',
                        id: 'poNXPu',
                      }),
                      value: IdSource.Bcrp,
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
                        defaultMessage: 'Provided By Police',
                        id: 'rZEvPc',
                      }),
                      value: IdSource.Police,
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
      )}
    </>
  );
};
export default OffenderFormDetails;
