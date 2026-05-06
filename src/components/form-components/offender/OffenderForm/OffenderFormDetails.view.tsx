import type { OffenderSettingsType } from '#/types/DataType';

import DatePicker from '#/components/util-components/DatePicker';
import {
  ageValues,
  buildValues,
  genderValues,
  raceValues,
} from '#/types/enums';
import { heightValues } from '#/types/enums/height';
import { Col, Form, Input, Radio, Row, Select } from 'antd';
import { IdSource } from 'graphql/types';
import React from 'react';
import { useIntl } from 'react-intl';

import useStyles from './OffenderFormDetails.style';

interface Props {
  ageCheck: boolean | undefined;
  idSource?: IdSource | null;
  idVerified: boolean | undefined;
  offenderSettings: OffenderSettingsType | undefined;
  saving?: boolean;
}

const OffenderFormDetails = ({
  ageCheck,
  idSource,
  idVerified,
  offenderSettings,
  saving,
}: Props): JSX.Element => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <>
      <Row gutter={16}>
        {offenderSettings?.name && (
          <Col span={12}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Name',
              })}
              name="name"
              tooltip={intl.formatMessage({
                defaultMessage: 'Enter the offenders name if you know it',
              })}
            >
              <Input className={classes.nameSelect} disabled={saving} />
            </Form.Item>
          </Col>
        )}
        {offenderSettings?.alias && (
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
              <Select disabled={saving} mode="tags" />
            </Form.Item>
          </Col>
        )}
      </Row>
      <Row gutter={16} wrap>
        {offenderSettings?.build && (
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
              <Select disabled={saving} options={buildValues} />
            </Form.Item>
          </Col>
        )}
        {offenderSettings?.height && (
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
              <Select disabled={saving} options={heightValues} />
            </Form.Item>
          </Col>
        )}
        {offenderSettings?.gender && (
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
              <Select disabled={saving} options={genderValues} />
            </Form.Item>
          </Col>
        )}
        {offenderSettings?.ethnicity && (
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
              <Select disabled={saving} options={raceValues} />
            </Form.Item>
          </Col>
        )}
        {offenderSettings?.hair && (
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
              <Input disabled={saving} />
            </Form.Item>
          </Col>
        )}
      </Row>

      <Row gutter={16} wrap>
        {offenderSettings?.peculiarities && (
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
              <Input.TextArea disabled={saving} />
            </Form.Item>
          </Col>
        )}
        {offenderSettings?.comment && (
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
              <Input.TextArea disabled={saving} />
            </Form.Item>
          </Col>
        )}
      </Row>
      {offenderSettings?.age && (
        <Row gutter={20} wrap>
          <Col span={12}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: "Do you know the offender's date of birth?",
              })}
              name="ageCheck"
            >
              <Radio.Group disabled={saving}>
                <Radio.Button value>
                  {intl.formatMessage({
                    defaultMessage: 'Yes',
                  })}
                </Radio.Button>
                <Radio.Button value={false}>
                  {intl.formatMessage({ defaultMessage: 'No' })}
                </Radio.Button>
              </Radio.Group>
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
                    disabled={saving}
                    disabledDate={(current) =>
                      // eslint-disable-next-line   @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
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
                  <Input.TextArea disabled={saving} />
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
                <Select disabled={saving} options={ageValues} />
              </Form.Item>
            </Col>
          )}
        </Row>
      )}
      {offenderSettings?.idVerified && (
        <Row gutter={20} wrap>
          <Col span={12}>
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
              <Radio.Group disabled={saving}>
                <Radio.Button value={true}>
                  {intl.formatMessage({
                    defaultMessage: 'Yes',
                  })}
                </Radio.Button>
                <Radio.Button value={false}>
                  {intl.formatMessage({ defaultMessage: 'No' })}
                </Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>

          {idVerified && (
            <>
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

              <Col>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Id Source Details',
                  })}
                  name="sourceDetails"
                  rules={[
                    {
                      message: intl.formatMessage({
                        defaultMessage:
                          'Please enter details of the verified id source.',
                      }),
                      required: idSource === IdSource.Police,
                    },
                  ]}
                  tooltip={intl.formatMessage({
                    defaultMessage:
                      'Details of the verified id source, if this is police provide officer collar number and the date it was provided.',
                  })}
                >
                  <Input.TextArea />
                </Form.Item>
              </Col>
            </>
          )}
        </Row>
      )}
      <Row>
        <Col>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Offender wanted?',
            })}
            name="wanted"
            // tooltip={intl.formatMessage({
            //   defaultMessage:
            //     'Is a wanted offender?',
            // })}
          >
            <Radio.Group disabled={saving}>
              <Radio.Button value>
                {intl.formatMessage({
                  defaultMessage: 'Yes',
                })}
              </Radio.Button>
              <Radio.Button value={false}>
                {intl.formatMessage({ defaultMessage: 'No' })}
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};
export default OffenderFormDetails;
