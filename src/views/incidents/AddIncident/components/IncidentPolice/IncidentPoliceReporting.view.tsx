import type { FormData } from '#/views/incidents/AddIncident/types/formData';
import type { FormInstance } from 'antd';

import MG11Sign from '#/components/form-components/MG11Sign/MG11Sign';
import PoliceReportingRequirements from '#/views/incidents/AddIncident/components/IncidentPolice/PoliceReportingRequirements.view';
import WitnessAuthorView from '#/views/incidents/AddIncident/components/IncidentPolice/WitnessAuthor.view';
import { usePoliceReportingValidation } from '#/views/incidents/AddIncident/hooks/usePoliceReportingValidation';
import {
  faCheckCircle,
  faFileAlt,
  faHandshake,
  faIdCard,
  faQuestionCircle,
} from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Alert,
  Card,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
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
  const reportToPolice = Form.useWatch('reportToPolice', form);
  const policeWitnessName = Form.useWatch('policeWitnessName', form);
  const policeCCTVReviewed = Form.useWatch('policeCCTVReviewed', form);
  const cctvAvailable = Form.useWatch('cctvAvailable', form);
  const policeCCTVTimeCorrect = Form.useWatch('policeCCTVTimeCorrect', form);
  const images = Form.useWatch('images', form);
  const offenders = Form.useWatch('offenders', form);

  const firstOffenderName = React.useMemo(() => {
    const firstOffender = offenders?.[0];
    if (firstOffender?.name && firstOffender.name !== 'Unidentified Offender') {
      return firstOffender.name;
    }
    return 'this person';
  }, [offenders]);

  const knownBeforeOptions = React.useMemo(
    () => [
      {
        description: intl.formatMessage(
          {
            defaultMessage:
              "I verified {name}'s identity using official ID documents",
          },
          { name: firstOffenderName }
        ),
        icon: faIdCard,
        title: intl.formatMessage({
          defaultMessage: 'Verified Identity',
        }),
        value: 'KNOWN_VERIFIED_ID',
      },
      {
        description: intl.formatMessage(
          {
            defaultMessage:
              'I know {name} personally from face-to-face dealings',
          },
          { name: firstOffenderName }
        ),
        icon: faHandshake,
        title: intl.formatMessage({
          defaultMessage: 'Know Personally',
        }),
        value: 'KNOWN_PERSONALLY',
      },
      {
        description: intl.formatMessage({
          defaultMessage:
            'Their identity was confirmed by police or courts at this store',
        }),
        icon: faFileAlt,
        title: intl.formatMessage({
          defaultMessage: 'Previous Incidents',
        }),
        value: 'KNOWN_FROM_PREVIOUS_INCIDENTS',
      },
      {
        description: intl.formatMessage({
          defaultMessage: "I don't know this person from before",
        }),
        icon: faQuestionCircle,
        title: intl.formatMessage({
          defaultMessage: "Don't Know Them",
        }),
        value: 'NOT_KNOWN',
      },
    ],
    [intl, firstOffenderName]
  );

  // Police reporting validation
  const { allRequirementsMet, completedCount, requirements, totalCount } =
    usePoliceReportingValidation(form);

  // Map policeCCTVReviewed to policeWitnessAtTime for MG11 generation
  React.useEffect(() => {
    if (policeCCTVReviewed !== undefined) {
      // If reviewed on CCTV, witness was NOT at the time (false)
      // If NOT reviewed on CCTV, witness WAS at the time (true)
      const wasPresent = !policeCCTVReviewed;

      // Use setFieldsValue to ensure proper form change event triggering
      form.setFieldsValue({
        policeWitnessAtTime: wasPresent,
      });
    }
  }, [policeCCTVReviewed, form]);

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

            {/* Requirements Checklist */}
            <PoliceReportingRequirements
              allRequirementsMet={allRequirementsMet}
              completedCount={completedCount}
              requirements={requirements}
              totalCount={totalCount}
            />

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
                    disabled: !allRequirementsMet,
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

            {/* Helper text when disabled */}
            {!allRequirementsMet && (
              <Alert
                message={intl.formatMessage({
                  defaultMessage:
                    'Complete the requirements above to enable police reporting',
                })}
                showIcon
                style={{ marginBottom: 16, marginTop: -8 }}
                type="warning"
              />
            )}

            {reportToPolice && (
              <>
                {/* <Form.Item
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
                </Form.Item> */}
                {/* <Form.Item
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
                </Form.Item> */}
                <Divider />
                {/* MG11 is now required for direct police reporting, so this question is no longer needed */}
                {/* <Form.Item
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
                </Form.Item> */}
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage:
                      'Are you reporting this having reviewed the incident on CCTV?',
                  })}
                  name="policeCCTVReviewed"
                  rules={[
                    {
                      message: intl.formatMessage({
                        defaultMessage: 'Please answer this question.',
                      }),
                      required: true,
                    },
                  ]}
                >
                  <Radio.Group disabled={saving} optionType="button">
                    <Radio value={true}>
                      {intl.formatMessage({ defaultMessage: 'Yes' })}
                    </Radio>
                    <Radio value={false}>
                      {intl.formatMessage({ defaultMessage: 'No' })}
                    </Radio>
                  </Radio.Group>
                </Form.Item>

                {policeCCTVReviewed === false && (
                  <Alert
                    description={intl.formatMessage({
                      defaultMessage:
                        'You need to review the CCTV of the incident and have it available for the police.',
                    })}
                    message={intl.formatMessage({
                      defaultMessage: 'CCTV Review Required',
                    })}
                    showIcon
                    type="error"
                  />
                )}

                {policeCCTVReviewed === true && (
                  <>
                    {!cctvAvailable && (
                      <>
                        <Divider />
                        <Title level={5} style={{ marginBottom: 16 }}>
                          {intl.formatMessage({
                            defaultMessage: 'CCTV Review Details',
                          })}
                        </Title>
                        <Row gutter={16}>
                          <Col span={8}>
                            <Form.Item
                              label={intl.formatMessage({
                                defaultMessage: 'CCTV Review Date & Time',
                              })}
                              name="policeCCTVReviewDateTime"
                              rules={[
                                {
                                  message: intl.formatMessage({
                                    defaultMessage:
                                      'Please provide the date and time you reviewed CCTV.',
                                  }),
                                  required: true,
                                },
                              ]}
                              tooltip={intl.formatMessage({
                                defaultMessage:
                                  'The date and time when you reviewed the CCTV footage.',
                              })}
                            >
                              <DatePicker
                                format="DD/MM/YYYY HH:mm"
                                showTime={{ format: 'HH:mm' }}
                                style={{ width: '100%' }}
                              />
                            </Form.Item>
                          </Col>
                          <Col span={8}>
                            <Form.Item
                              label={intl.formatMessage({
                                defaultMessage: 'CCTV Time Correct',
                              })}
                              name="policeCCTVTimeCorrect"
                              rules={[
                                {
                                  message: intl.formatMessage({
                                    defaultMessage:
                                      'Please answer this question.',
                                  }),
                                  required: true,
                                },
                              ]}
                              tooltip={intl.formatMessage({
                                defaultMessage:
                                  'Does the CCTV system display the correct time and date?',
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
                          </Col>
                        </Row>
                        {policeCCTVTimeCorrect === false && (
                          <Row gutter={16}>
                            <Col span={8}>
                              <Form.Item
                                label={intl.formatMessage({
                                  defaultMessage: 'Ahead/Behind',
                                })}
                                name="policeCCTVAheadBehind"
                                rules={[
                                  {
                                    message: intl.formatMessage({
                                      defaultMessage:
                                        'Please select Ahead or Behind',
                                    }),
                                    required: true,
                                  },
                                ]}
                                tooltip={intl.formatMessage({
                                  defaultMessage:
                                    'Is the CCTV time ahead of or behind actual time?',
                                })}
                              >
                                <Select>
                                  <Select.Option value="ahead">
                                    {intl.formatMessage({
                                      defaultMessage: 'Ahead',
                                    })}
                                  </Select.Option>
                                  <Select.Option value="behind">
                                    {intl.formatMessage({
                                      defaultMessage: 'Behind',
                                    })}
                                  </Select.Option>
                                </Select>
                              </Form.Item>
                            </Col>
                            <Col span={8}>
                              <Form.Item
                                label={intl.formatMessage({
                                  defaultMessage: 'Incorrect By (minutes)',
                                })}
                                name="policeCCTVIncorrectBy"
                                rules={[
                                  {
                                    message: intl.formatMessage({
                                      defaultMessage:
                                        'Please input the number of minutes',
                                    }),
                                    required: true,
                                  },
                                  {
                                    validator: (_, value) => {
                                      if (
                                        value === undefined ||
                                        value === null
                                      ) {
                                        return Promise.resolve();
                                      }
                                      return Number.isInteger(value)
                                        ? Promise.resolve()
                                        : Promise.reject(
                                            new Error(
                                              intl.formatMessage({
                                                defaultMessage:
                                                  'Please enter a whole number',
                                              })
                                            )
                                          );
                                    },
                                  },
                                ]}
                                tooltip={intl.formatMessage({
                                  defaultMessage:
                                    'How many minutes is the CCTV time off by?',
                                })}
                              >
                                <InputNumber
                                  min={0}
                                  step={1}
                                  style={{ width: '100%' }}
                                />
                              </Form.Item>
                            </Col>
                          </Row>
                        )}
                        <Divider />
                      </>
                    )}

                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item
                          label={intl.formatMessage({
                            defaultMessage:
                              'Email address police can use to obtain CCTV',
                          })}
                          name="policeCCTVEmail"
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
                              'The email address that the police can use to obtain CCTV evidence from the business, this will normally be your store address or the address for your SOC.',
                          })}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                    </Row>

                    {images && images.length > 0 && (
                      <>
                        <Title level={5} style={{ marginBottom: 16 }}>
                          {intl.formatMessage({
                            defaultMessage: 'Screenshot Details',
                          })}
                        </Title>
                        <Row gutter={16}>
                          <Col span={8}>
                            <Form.Item
                              label={intl.formatMessage({
                                defaultMessage: 'Screenshot Date & Time',
                              })}
                              name="policeScreenshotDateTime"
                              tooltip={intl.formatMessage({
                                defaultMessage:
                                  'The date and time shown on the CCTV screenshot of the suspect',
                              })}
                            >
                              <DatePicker
                                format="DD/MM/YYYY HH:mm"
                                showTime={{ format: 'HH:mm' }}
                                style={{ width: '100%' }}
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Divider />
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
                      <Row gutter={[16, 16]}>
                        {knownBeforeOptions.map((option) => {
                          const isSelected =
                            form.getFieldValue('policeKnownBefore') ===
                            option.value;

                          return (
                            <Col key={option.value} sm={12} xs={24}>
                              <div
                                className={`${classes.knownBeforeCard} ${
                                  isSelected
                                    ? classes.knownBeforeCardSelected
                                    : ''
                                } ${saving ? classes.knownBeforeCardDisabled : ''}`}
                                onClick={() => {
                                  if (!saving) {
                                    form.setFieldValue(
                                      'policeKnownBefore',
                                      option.value
                                    );
                                  }
                                }}
                                onKeyPress={(e) => {
                                  if (
                                    !saving &&
                                    (e.key === 'Enter' || e.key === ' ')
                                  ) {
                                    form.setFieldValue(
                                      'policeKnownBefore',
                                      option.value
                                    );
                                  }
                                }}
                                role="button"
                                tabIndex={saving ? -1 : 0}
                              >
                                {isSelected && (
                                  <FontAwesomeIcon
                                    className={classes.knownBeforeCardCheckmark}
                                    icon={faCheckCircle}
                                  />
                                )}
                                <FontAwesomeIcon
                                  className={classes.knownBeforeCardIcon}
                                  icon={option.icon}
                                />
                                <div className={classes.knownBeforeCardContent}>
                                  <div className={classes.knownBeforeCardTitle}>
                                    {option.title}
                                  </div>
                                  <div
                                    className={
                                      classes.knownBeforeCardDescription
                                    }
                                  >
                                    {option.description}
                                  </div>
                                </div>
                              </div>
                            </Col>
                          );
                        })}
                      </Row>
                    </Form.Item>

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

                    <Form.Item
                      label={intl.formatMessage({
                        defaultMessage:
                          'Is there any other information or evidence available to the police?',
                      })}
                      name="policeAdditionalEvidence"
                      tooltip={intl.formatMessage({
                        defaultMessage:
                          'For example: body camera footage, witness contact details, or previous crime numbers linked to this person.',
                      })}
                    >
                      <Input.TextArea
                        disabled={saving}
                        placeholder={intl.formatMessage({
                          defaultMessage:
                            'For example body camera footage, witness to the incident contacts details, previous crime numbers linked to this person...',
                        })}
                        rows={4}
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
