import type { FormData } from '#/views/incidents/AddIncident/types/formData';
import type { FormInstance } from 'antd';

import MG11Sign from '#/components/form-components/MG11Sign/MG11Sign';
import CheckTags from '#/components/form-components/check-tags/CheckTags.view';
import WitnessAuthorView from '#/views/incidents/AddIncident/components/IncidentPolice/WitnessAuthor.view';
import {
  Card,
  Col,
  Divider,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Typography,
} from 'antd';
import { PoliceResponseTime } from 'graphql/types';
import React from 'react';
import { useIntl } from 'react-intl';

import useStyles from '../../AddIncident.styles';

const { Title } = Typography;

interface Props {
  form: FormInstance<FormData>;
  generatingStatement: boolean;
  saving: boolean;
  usPoliceData?: boolean;
}

const IncidentPolice = ({
  form,
  generatingStatement,
  saving,
  usPoliceData,
}: Props) => {
  const classes = useStyles();
  const intl = useIntl();

  const reported = Form.useWatch('policeReported', form);
  const policeMG11 = Form.useWatch('policeMG11', form);
  const reportToPolice = Form.useWatch('reportToPolice', form);
  const policeWitnessName = Form.useWatch('policeWitnessName', form);
  const policeKnownBefore = Form.useWatch('policeKnownBefore', form);
  const policeWitnessAtTime = Form.useWatch('policeWitnessAtTime', form);
  const obstructed = Form.useWatch('policeObstructions', form) === 'true';
  return (
    <Card className={classes.card}>
      <Row align="bottom" style={{ marginBottom: 20 }}>
        <Col>
          <Title level={4} style={{ marginBottom: 0, marginLeft: 5 }}>
            {intl.formatMessage({
              defaultMessage: 'Police Reporting',
            })}
          </Title>
        </Col>
      </Row>
      <Row gutter={50}>
        <Col>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage:
                'Have you already reported the incident to the police?',
            })}
            name="policeReported"
            rules={[
              {
                message: intl.formatMessage({
                  defaultMessage: 'Please answer this question.',
                }),
                required: true,
              },
            ]}
          >
            <Radio.Group
              disabled={saving}
              optionType="button"
              options={[
                {
                  label: intl.formatMessage({
                    defaultMessage: 'Yes',
                  }),
                  value: true,
                },
                {
                  label: intl.formatMessage({
                    defaultMessage: 'No',
                  }),
                  value: false,
                },
              ]}
            />
          </Form.Item>
          {reported && (
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Did the police attend this incident?',
              })}
              name="policeInvolved"
              tooltip={intl.formatMessage({
                defaultMessage: 'Did the police attend this incident.',
              })}
            >
              <Radio.Group
                disabled={saving}
                optionType="button"
                options={[
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'Yes',
                    }),
                    value: true,
                  },
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'No',
                    }),
                    value: false,
                  },
                ]}
              />
            </Form.Item>
          )}
        </Col>

        {reported === false && (
          <Col span={24}>
            <Divider style={{ marginTop: 0 }} />
            <Form.Item
              label={intl.formatMessage({
                defaultMessage:
                  'Do you want to report this automatically to the police now?',
              })}
              name="reportToPolice"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage: 'Please answer this question.',
                  }),
                  required: true,
                },
              ]}
              tooltip={intl.formatMessage({
                defaultMessage:
                  'You can complete the required fields within the report and Alert will report it to the police.',
              })}
            >
              <Radio.Group
                disabled={saving}
                optionType="button"
                options={[
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'Yes',
                    }),
                    value: true,
                  },
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'No',
                    }),
                    value: false,
                  },
                ]}
              />
            </Form.Item>
            {reportToPolice && (
              <>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage:
                      'Where in the store the item was taken from?',
                  })}
                  name="policeItemsLocation"
                  rules={[
                    {
                      message: intl.formatMessage({
                        defaultMessage: 'Please answer this question.',
                      }),
                      required: true,
                    },
                  ]}
                >
                  <CheckTags
                    options={[
                      {
                        label: intl.formatMessage({
                          defaultMessage: 'Front',
                        }),
                        value: 'Front',
                      },
                      {
                        label: intl.formatMessage({
                          defaultMessage: 'Middle',
                        }),
                        value: 'Middle',
                      },
                      {
                        label: intl.formatMessage({
                          defaultMessage: 'Back',
                        }),
                        value: 'Back',
                      },
                      {
                        label: intl.formatMessage({
                          defaultMessage: 'Till Point',
                        }),
                        value: 'Till Point',
                      },
                      {
                        label: intl.formatMessage({
                          defaultMessage: 'Kiosk',
                        }),
                        value: 'Kiosk',
                      },
                      {
                        label: intl.formatMessage({
                          defaultMessage: 'Fitting room',
                        }),
                        value: 'Fitting room',
                      },
                      {
                        label: intl.formatMessage({
                          defaultMessage: 'Back of house',
                        }),
                        value: 'Back of house',
                      },
                      {
                        label: intl.formatMessage({
                          defaultMessage: 'Other',
                        }),
                        value: 'Other',
                      },
                      {
                        label: intl.formatMessage({
                          defaultMessage: 'None',
                        }),
                        value: 'None',
                      },
                    ]}
                  />
                </Form.Item>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'What was the method used?',
                  })}
                  name="policeItemsMO"
                  rules={[
                    {
                      message: intl.formatMessage({
                        defaultMessage: 'Please answer this question.',
                      }),
                      required: true,
                    },
                  ]}
                >
                  <CheckTags
                    options={[
                      {
                        label: intl.formatMessage({
                          defaultMessage: 'Distraction',
                        }),
                        value: 'Distraction',
                      },
                      {
                        label: intl.formatMessage({
                          defaultMessage: 'Going equipped',
                        }),
                        value: 'Going equipped to steal',
                      },
                      {
                        label: intl.formatMessage({
                          defaultMessage: 'Select & Conceal',
                        }),
                        value: 'Select and Conceal',
                      },
                      {
                        label: intl.formatMessage({
                          defaultMessage: 'Steaming',
                        }),
                        value: 'Steaming',
                      },
                      {
                        label: intl.formatMessage({
                          defaultMessage: 'Foil lined bag',
                        }),
                        value: 'Foil lined bag',
                      },
                      {
                        label: intl.formatMessage({
                          defaultMessage: 'Passing the items',
                        }),
                        value: 'Passing the items',
                      },
                      {
                        label: intl.formatMessage({
                          defaultMessage: 'Other',
                        }),
                        value: 'Other',
                      },
                      {
                        label: intl.formatMessage({
                          defaultMessage: 'None',
                        }),
                        value: 'None',
                      },
                    ]}
                  />
                </Form.Item>
                <Divider />
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage:
                      'Are you willing to complete an MG11 witness statement?',
                  })}
                  name="policeMG11"
                  rules={[
                    {
                      message: intl.formatMessage({
                        defaultMessage: 'Please answer this question.',
                      }),
                      required: true,
                    },
                  ]}
                  tooltip={intl.formatMessage({
                    defaultMessage:
                      'Alert will generate an MG11 witness statement which will provided to the police along with the crime report.',
                  })}
                >
                  <Radio.Group
                    disabled={saving}
                    optionType="button"
                    options={[
                      {
                        label: intl.formatMessage({
                          defaultMessage: 'Yes',
                        }),
                        value: true,
                      },
                      {
                        label: intl.formatMessage({
                          defaultMessage: 'No',
                        }),
                        value: false,
                      },
                    ]}
                  />
                </Form.Item>
                {policeMG11 && (
                  <>
                    <Form.Item
                      label={intl.formatMessage({
                        defaultMessage:
                          'Was this witnessed at the time of the offence, or are you viewing the incident on CCTV?',
                      })}
                      name="policeWitnessAtTime"
                      rules={[
                        {
                          message: intl.formatMessage({
                            defaultMessage: 'Please answer this question.',
                          }),
                          required: true,
                        },
                      ]}
                    >
                      <Radio.Group
                        disabled={saving}
                        optionType="button"
                        options={[
                          {
                            label: intl.formatMessage({
                              defaultMessage: 'Witnessed In-person',
                            }),
                            value: true,
                          },
                          {
                            label: intl.formatMessage({
                              defaultMessage: 'Viewing CCTV',
                            }),
                            value: false,
                          },
                        ]}
                      />
                    </Form.Item>
                    {policeWitnessAtTime && (
                      <>
                        <Row gutter={16}>
                          <Col span={8}>
                            <Form.Item
                              label={intl.formatMessage({
                                defaultMessage:
                                  'How long did the incident last?',
                              })}
                              name="policeIncidentDuration"
                              rules={[
                                {
                                  message: intl.formatMessage({
                                    defaultMessage:
                                      'Please answer this question.',
                                  }),
                                  required: true,
                                },
                              ]}
                            >
                              <Input />
                            </Form.Item>
                          </Col>
                          <Col span={8}>
                            <Form.Item
                              label={intl.formatMessage({
                                defaultMessage:
                                  'How far away were you from the incident?',
                              })}
                              name="policeDistanceFromIncident"
                              rules={[
                                {
                                  message: intl.formatMessage({
                                    defaultMessage:
                                      'Please answer this question.',
                                  }),
                                  required: true,
                                },
                              ]}
                            >
                              <Select
                                options={[
                                  {
                                    label: intl.formatMessage({
                                      defaultMessage: 'Less than 1m',
                                    }),
                                    value: 'Less than 1m',
                                  },
                                  {
                                    label: intl.formatMessage({
                                      defaultMessage: '1m',
                                    }),
                                    value: '1m',
                                  },
                                  {
                                    label: intl.formatMessage({
                                      defaultMessage: '2m',
                                    }),
                                    value: '2m',
                                  },
                                  {
                                    label: intl.formatMessage({
                                      defaultMessage: 'Further than 2m',
                                    }),
                                    value: 'Further than 2m',
                                  },
                                ]}
                              />
                            </Form.Item>
                          </Col>
                          <Col span={8}>
                            <Form.Item
                              label={intl.formatMessage({
                                defaultMessage:
                                  'Did you have a clear and unobstructed view of the incident?',
                              })}
                              name="policeObstructions"
                              rules={[
                                {
                                  message: intl.formatMessage({
                                    defaultMessage:
                                      'Please answer this question.',
                                  }),
                                  required: true,
                                },
                              ]}
                            >
                              <Radio.Group
                                disabled={saving}
                                optionType="button"
                                options={[
                                  {
                                    label: intl.formatMessage({
                                      defaultMessage: 'Yes',
                                    }),
                                    value: 'true',
                                  },
                                  {
                                    label: intl.formatMessage({
                                      defaultMessage: 'No',
                                    }),
                                    value: 'false',
                                  },
                                ]}
                              />
                            </Form.Item>
                          </Col>
                          {!obstructed && (
                            <Col span={8}>
                              <Form.Item
                                label={intl.formatMessage({
                                  defaultMessage:
                                    'What was obstructing your view?',
                                })}
                                name="policeObstructionsDetails"
                                rules={[
                                  {
                                    message: intl.formatMessage({
                                      defaultMessage:
                                        'Please answer this question.',
                                    }),
                                    required: true,
                                  },
                                ]}
                              >
                                <Select
                                  options={[
                                    {
                                      label: intl.formatMessage({
                                        defaultMessage: 'Bad Light',
                                      }),
                                      value: 'Bad Light',
                                    },
                                    {
                                      label: intl.formatMessage({
                                        defaultMessage:
                                          'Obscured by Other People',
                                      }),
                                      value: 'Obscured by Other People',
                                    },
                                    {
                                      label: intl.formatMessage({
                                        defaultMessage: 'Obscured by Shelving',
                                      }),
                                      value: 'Obscured by Shelving',
                                    },
                                  ]}
                                />
                              </Form.Item>
                            </Col>
                          )}

                          <Col span={8}>
                            <Form.Item
                              label={intl.formatMessage({
                                defaultMessage:
                                  'How long did you witness the event?',
                              })}
                              name="policeWitnessLength"
                              rules={[
                                {
                                  message: intl.formatMessage({
                                    defaultMessage:
                                      'Please answer this question.',
                                  }),
                                  required: true,
                                },
                              ]}
                            >
                              <Input />
                            </Form.Item>
                          </Col>
                        </Row>
                      </>
                    )}

                    <Form.Item
                      label={intl.formatMessage({
                        defaultMessage:
                          'Do you know the subjects from before the incident?',
                      })}
                      name="policeKnownBefore"
                      rules={[
                        {
                          message: intl.formatMessage({
                            defaultMessage: 'Please answer this question.',
                          }),
                          required: true,
                        },
                      ]}
                    >
                      <Radio.Group
                        disabled={saving}
                        optionType="button"
                        options={[
                          {
                            label: intl.formatMessage({
                              defaultMessage: 'Not Known',
                            }),
                            value: 'NOT_KNOWN',
                          },
                          {
                            label: intl.formatMessage({
                              defaultMessage: 'Known Personally',
                            }),
                            value: 'KNOWN_PERSONALLY',
                          },
                          {
                            label: intl.formatMessage({
                              defaultMessage: 'Known From Previous Incidents',
                            }),
                            value: 'KNOWN_FROM_PREVIOUS_INCIDENTS',
                          },
                        ]}
                      />
                    </Form.Item>
                    {policeKnownBefore !== 'NOT_KNOWN' && (
                      <Form.Item
                        label={intl.formatMessage({
                          defaultMessage: 'How do you know the offender?',
                        })}
                        name="policeReasonRemember"
                        rules={[
                          {
                            message: intl.formatMessage({
                              defaultMessage: 'Please answer this question.',
                            }),
                            required: true,
                          },
                        ]}
                      >
                        <Input.TextArea />
                      </Form.Item>
                    )}

                    <Form.Item
                      label={intl.formatMessage({
                        defaultMessage: 'Would you be willing to attend court?',
                      })}
                      name="policeWillingCourt"
                      rules={[
                        {
                          message: intl.formatMessage({
                            defaultMessage: 'Please answer this question.',
                          }),
                          required: true,
                        },
                      ]}
                    >
                      <Radio.Group
                        disabled={saving}
                        optionType="button"
                        options={[
                          {
                            label: intl.formatMessage({
                              defaultMessage: 'Yes',
                            }),
                            value: true,
                          },
                          {
                            label: intl.formatMessage({
                              defaultMessage: 'No',
                            }),
                            value: false,
                          },
                        ]}
                      />
                    </Form.Item>
                    {/* <Row gutter={16}>*/}
                    {/*  <Col span={6}>*/}
                    {/*    <Form.Item*/}
                    {/*      label={intl.formatMessage({*/}
                    {/*        defaultMessage: 'Witness Name',*/}
                    {/*      })}*/}
                    {/*      name="policeWitnessName"*/}
                    {/*      rules={[*/}
                    {/*        {*/}
                    {/*          message: intl.formatMessage({*/}
                    {/*            defaultMessage: 'Please provide a name.',*/}
                    {/*          }),*/}
                    {/*          required: true,*/}
                    {/*        },*/}
                    {/*      ]}*/}
                    {/*    >*/}
                    {/*      <Input defaultValue={userName} />*/}
                    {/*    </Form.Item>*/}
                    {/*  </Col>*/}
                    {/*  <Col span={6}>*/}
                    {/*    <Form.Item*/}
                    {/*      label={intl.formatMessage({*/}
                    {/*        defaultMessage: 'Witness Email',*/}
                    {/*      })}*/}
                    {/*      name="policeWitnessEmail"*/}
                    {/*      rules={[*/}
                    {/*        {*/}
                    {/*          message: intl.formatMessage({*/}
                    {/*            defaultMessage: 'Please provide an email.',*/}
                    {/*          }),*/}
                    {/*          required: true,*/}
                    {/*        },*/}
                    {/*      ]}*/}
                    {/*    >*/}
                    {/*      <Input defaultValue={userEmail} />*/}
                    {/*    </Form.Item>*/}
                    {/*  </Col>*/}
                    {/*  <Col span={6}>*/}
                    {/*    <Form.Item*/}
                    {/*      label={intl.formatMessage({*/}
                    {/*        defaultMessage: 'Work Phone No.',*/}
                    {/*      })}*/}
                    {/*      name="policeWitnessWorkNo"*/}
                    {/*      rules={[*/}
                    {/*        {*/}
                    {/*          message: intl.formatMessage({*/}
                    {/*            defaultMessage:*/}
                    {/*              'Please provide a phone number.',*/}
                    {/*          }),*/}
                    {/*          required: true,*/}
                    {/*        },*/}
                    {/*      ]}*/}
                    {/*    >*/}
                    {/*      <Input defaultValue="07548106855" />*/}
                    {/*    </Form.Item>*/}
                    {/*  </Col>*/}
                    {/*  <Col span={6}>*/}
                    {/*    <Form.Item*/}
                    {/*      label={intl.formatMessage({*/}
                    {/*        defaultMessage: 'Mobile No.',*/}
                    {/*      })}*/}
                    {/*      name="policeWitnessMobileNo"*/}
                    {/*      rules={[*/}
                    {/*        {*/}
                    {/*          message: intl.formatMessage({*/}
                    {/*            defaultMessage:*/}
                    {/*              'Please provide a mobile phone number.',*/}
                    {/*          }),*/}
                    {/*          required: true,*/}
                    {/*        },*/}
                    {/*      ]}*/}
                    {/*    >*/}
                    {/*      <Input defaultValue="07548106855" />*/}
                    {/*    </Form.Item>*/}
                    {/*  </Col>*/}
                    {/*  <Col span={6}>*/}
                    {/*    <Form.Item*/}
                    {/*      label={intl.formatMessage({*/}
                    {/*        defaultMessage: 'Date & Place of Birth',*/}
                    {/*      })}*/}
                    {/*      name="policeWitnessPlaceOfBirth"*/}
                    {/*      rules={[*/}
                    {/*        {*/}
                    {/*          message: intl.formatMessage({*/}
                    {/*            defaultMessage: 'Please complete this field.',*/}
                    {/*          }),*/}
                    {/*          required: true,*/}
                    {/*        },*/}
                    {/*      ]}*/}
                    {/*    >*/}
                    {/*      <Input defaultValue="14/02/1995 Bury St Edmunds" />*/}
                    {/*    </Form.Item>*/}
                    {/*  </Col>*/}
                    {/*  <Col span={4}>*/}
                    {/*    <Form.Item*/}
                    {/*      label={intl.formatMessage({*/}
                    {/*        defaultMessage: 'Ethnicity Code',*/}
                    {/*      })}*/}
                    {/*      name="policeWitnessEthnicity"*/}
                    {/*      rules={[*/}
                    {/*        {*/}
                    {/*          message: intl.formatMessage({*/}
                    {/*            defaultMessage: 'Please complete this field.',*/}
                    {/*          }),*/}
                    {/*          required: true,*/}
                    {/*        },*/}
                    {/*      ]}*/}
                    {/*    >*/}
                    {/*      <Select*/}
                    {/*        defaultValue="W1"*/}
                    {/*        options={[*/}
                    {/*          {*/}
                    {/*            label: 'Asian or Asian British',*/}
                    {/*            options: [*/}
                    {/*              { label: 'Indian', value: 'A1' },*/}
                    {/*              { label: 'Pakistani', value: 'A2' },*/}
                    {/*              { label: 'Bangladeshi', value: 'A3' },*/}
                    {/*              {*/}
                    {/*                label: 'Any other Asian background',*/}
                    {/*                value: 'A9',*/}
                    {/*              },*/}
                    {/*            ],*/}
                    {/*          },*/}
                    {/*          {*/}
                    {/*            label: 'Black or Black British',*/}
                    {/*            options: [*/}
                    {/*              { label: 'Caribbean', value: 'B1' },*/}
                    {/*              { label: 'African', value: 'B2' },*/}
                    {/*              {*/}
                    {/*                label: 'Any other Black background',*/}
                    {/*                value: 'B9',*/}
                    {/*              },*/}
                    {/*            ],*/}
                    {/*          },*/}
                    {/*          {*/}
                    {/*            label: 'Mixed',*/}
                    {/*            options: [*/}
                    {/*              {*/}
                    {/*                label: 'White and Black Caribbean',*/}
                    {/*                value: 'M1',*/}
                    {/*              },*/}
                    {/*              {*/}
                    {/*                label: 'White and Black African',*/}
                    {/*                value: 'M2',*/}
                    {/*              },*/}
                    {/*              { label: 'White and Asian', value: 'M3' },*/}
                    {/*              {*/}
                    {/*                label: 'Any other mixed background',*/}
                    {/*                value: 'M9',*/}
                    {/*              },*/}
                    {/*            ],*/}
                    {/*          },*/}
                    {/*          {*/}
                    {/*            label: 'Chinese or any other ethnic group',*/}
                    {/*            options: [*/}
                    {/*              { label: 'Chinese', value: 'O1' },*/}
                    {/*              {*/}
                    {/*                label: 'Any other ethnic group',*/}
                    {/*                value: 'O9',*/}
                    {/*              },*/}
                    {/*            ],*/}
                    {/*          },*/}
                    {/*          {*/}
                    {/*            label: 'White',*/}
                    {/*            options: [*/}
                    {/*              { label: 'British', value: 'W1' },*/}
                    {/*              { label: 'Irish', value: 'W2' },*/}
                    {/*              {*/}
                    {/*                label: 'Any other White background',*/}
                    {/*                value: 'W9',*/}
                    {/*              },*/}
                    {/*            ],*/}
                    {/*          },*/}
                    {/*          {*/}
                    {/*            label: '+1 Codes',*/}
                    {/*            options: [*/}
                    {/*              {*/}
                    {/*                label:*/}
                    {/*                  'The officer’s presence is urgently required elsewhere',*/}
                    {/*                value: 'N1',*/}
                    {/*              },*/}
                    {/*              {*/}
                    {/*                label:*/}
                    {/*                  'The situation involves public disorder',*/}
                    {/*                value: 'N2',*/}
                    {/*              },*/}
                    {/*              {*/}
                    {/*                label:*/}
                    {/*                  'The person did not understand what is required',*/}
                    {/*                value: 'N3',*/}
                    {/*              },*/}
                    {/*              {*/}
                    {/*                label:*/}
                    {/*                  'The person declined to define their ethnicity',*/}
                    {/*                value: 'N4',*/}
                    {/*              },*/}
                    {/*            ],*/}
                    {/*          },*/}
                    {/*          {*/}
                    {/*            label: 'Other',*/}
                    {/*            options: [{ label: 'Other', value: 'other' }],*/}
                    {/*          },*/}
                    {/*        ]}*/}
                    {/*      />*/}
                    {/*    </Form.Item>*/}
                    {/*  </Col>*/}
                    {/*  <Col span={4}>*/}
                    {/*    <Form.Item*/}
                    {/*      label={intl.formatMessage({*/}
                    {/*        defaultMessage: 'Gender',*/}
                    {/*      })}*/}
                    {/*      name="policeWitnessGender"*/}
                    {/*      rules={[*/}
                    {/*        {*/}
                    {/*          message: intl.formatMessage({*/}
                    {/*            defaultMessage: 'Please complete this field.',*/}
                    {/*          }),*/}
                    {/*          required: true,*/}
                    {/*        },*/}
                    {/*      ]}*/}
                    {/*    >*/}
                    {/*      <Input defaultValue="Male" />*/}
                    {/*    </Form.Item>*/}
                    {/*  </Col>*/}
                    {/*  <Col span={6}>*/}
                    {/*    <Form.Item*/}
                    {/*      label={intl.formatMessage({*/}
                    {/*        defaultMessage: 'Address',*/}
                    {/*      })}*/}
                    {/*      name="policeWitnessAddress"*/}
                    {/*      rules={[*/}
                    {/*        {*/}
                    {/*          message: intl.formatMessage({*/}
                    {/*            defaultMessage: 'Please complete this field.',*/}
                    {/*          }),*/}
                    {/*          required: true,*/}
                    {/*        },*/}
                    {/*      ]}*/}
                    {/*      style={{ marginBottom: 5 }}*/}
                    {/*    >*/}
                    {/*      <Input.TextArea defaultValue="1 Post Office House, Bury St Edmunds, Suffolk" />*/}
                    {/*    </Form.Item>*/}
                    {/*    <Form.Item*/}
                    {/*      name="policeWitnessPostcode"*/}
                    {/*      rules={[*/}
                    {/*        {*/}
                    {/*          message: intl.formatMessage({*/}
                    {/*            defaultMessage: 'Please complete this field.',*/}
                    {/*          }),*/}
                    {/*          required: true,*/}
                    {/*        },*/}
                    {/*      ]}*/}
                    {/*    >*/}
                    {/*      <Input*/}
                    {/*        defaultValue="IP29 4SP"*/}
                    {/*        placeholder={intl.formatMessage({*/}
                    {/*          defaultMessage: 'Postcode',*/}
                    {/*        })}*/}
                    {/*      />*/}
                    {/*    </Form.Item>*/}
                    {/*  </Col>*/}
                    {/* </Row>*/}
                    <Form.Item
                      label={intl.formatMessage({
                        defaultMessage: 'Witness Author',
                      })}
                      name="witnessAuthor"
                      rules={[
                        {
                          message: intl.formatMessage({
                            defaultMessage: 'Please update your details',
                          }),
                          required: true,
                        },
                      ]}
                    >
                      <WitnessAuthorView
                        detailsExist={() =>
                          form.setFieldValue('witnessAuthor', true)
                        }
                      />
                    </Form.Item>

                    <Form.Item
                      label={intl.formatMessage({
                        defaultMessage: 'Statement',
                      })}
                      name="policeStatement"
                      rules={[
                        {
                          message: intl.formatMessage({
                            defaultMessage: 'Please provide a statement.',
                          }),
                          required: true,
                        },
                      ]}
                    >
                      <Input.TextArea
                        disabled={generatingStatement}
                        rows={10}
                      />
                    </Form.Item>
                    <Form.Item
                      name="policeSign"
                      rules={[
                        {
                          message: intl.formatMessage({
                            defaultMessage: 'Please sign the statement.',
                          }),
                          required: true,
                        },
                      ]}
                    >
                      <MG11Sign name={policeWitnessName} />
                    </Form.Item>
                  </>
                )}
              </>
            )}
          </Col>
        )}

        {reported && (
          <Col>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Crime Ref No.',
              })}
              name="policeRef"
              tooltip={intl.formatMessage({
                defaultMessage:
                  'The crime reference number provided by the police.',
              })}
            >
              <Input disabled={saving} />
            </Form.Item>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Officer Collar No.',
              })}
              name="policeNo"
              tooltip={intl.formatMessage({
                defaultMessage:
                  'The collar number of the officers involved in this incident.',
              })}
            >
              <Input disabled={saving} />
            </Form.Item>
            {usPoliceData && (
              <>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Police Department',
                  })}
                  name="policeDepartment"
                  tooltip={intl.formatMessage({
                    defaultMessage:
                      'The police department handling this incident.',
                  })}
                >
                  <Input.TextArea disabled={saving} rows={2} />
                </Form.Item>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Police Officer Name',
                  })}
                  name="policeOfficerName"
                  tooltip={intl.formatMessage({
                    defaultMessage:
                      'The name of the police officer assigned to this case.',
                  })}
                >
                  <Input disabled={saving} />
                </Form.Item>
              </>
            )}
          </Col>
        )}
        {reported && (
          <Col>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Police Response Time',
              })}
              name="policeResponse"
              tooltip={intl.formatMessage({
                defaultMessage:
                  'The time taken for the police to respond to the incident.',
              })}
            >
              <Select
                disabled={saving}
                options={[
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'Within 1 Hour',
                    }),
                    value: PoliceResponseTime.Within_1Hour,
                  },
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'Within 3 Hours',
                    }),
                    value: PoliceResponseTime.Within_3Hours,
                  },
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'Within 12 Hours',
                    }),
                    value: PoliceResponseTime.Within_12Hours,
                  },
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'Within 24 Hours',
                    }),
                    value: PoliceResponseTime.Within_24Hours,
                  },
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'Over 24 Hours',
                    }),
                    value: PoliceResponseTime.Over_24Hours,
                  },
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'No Response',
                    }),
                    value: PoliceResponseTime.NoResponse,
                  },
                ]}
              />
            </Form.Item>
          </Col>
        )}
      </Row>
    </Card>
  );
};

export default IncidentPolice;
