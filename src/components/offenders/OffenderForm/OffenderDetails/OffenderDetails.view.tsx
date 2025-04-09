import type {
  CustomGalleryData,
  OffenderSettingsType,
  TagData,
} from 'types/DataType';

import DatePicker from '#/components/util-components/DatePicker';
import { faPlus } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Switch,
  Typography,
} from 'antd';
import AddCustomGallery from 'components/form-components/customGalleries/AddCustomGallery';
import AddOffenderTag from 'components/form-components/tags/offenderWarnings/AddOffenderWarning';
import { IdSource } from 'graphql/types';
import React from 'react';
import { useIntl } from 'react-intl';
import { ageValues, buildValues, genderValues, raceValues } from 'types/enums';
import { heightValues } from 'types/enums/height';

const { Paragraph, Title } = Typography;

interface Props {
  addCustomGallery: boolean;
  addOffenderTag: boolean;
  adminRights: boolean;
  ageCheck: boolean;
  customGalleries: { label: string; value: string }[];
  customGalleriesLoading: boolean;
  idVerified?: boolean;
  offenderSettings: OffenderSettingsType;
  onSearchOffender: () => void;
  potentialOffenders: number;
  saving: boolean;
  setAgeCheck: (value: boolean) => void;
  tags: { label: string; value: string }[];
  tagsLoading: boolean;
  toggleAddCustomGallery: () => void;
  toggleAddOffenderTag: () => void;
  toggleViewPotentialOffenders: () => void;
  updateNewCustomGalleryData: (values: CustomGalleryData) => void;
  updateNewOffenderTagData: (values: TagData) => void;
}

const OffenderDetails = ({
  addCustomGallery,
  addOffenderTag,
  adminRights,
  ageCheck,
  customGalleries,
  customGalleriesLoading,
  idVerified,
  offenderSettings,
  onSearchOffender,
  potentialOffenders,
  saving,
  setAgeCheck,
  tags,
  tagsLoading,
  toggleAddCustomGallery,
  toggleAddOffenderTag,
  toggleViewPotentialOffenders,
  updateNewCustomGalleryData,
  updateNewOffenderTagData,
}: Props): JSX.Element => {
  const intl = useIntl();

  return (
    <>
      <Row align="middle" style={{ marginBottom: 30 }}>
        <Col>
          {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
          <Title level={4} style={{ marginBottom: 0 }}>
            1.
          </Title>
        </Col>
        <Col>
          <Title level={4} style={{ marginBottom: 0, marginLeft: 5 }}>
            {intl.formatMessage({
              defaultMessage: 'Offender Details',
            })}
          </Title>
        </Col>
        <Col>
          <Paragraph
            italic
            style={{ marginBottom: 1, marginLeft: 5 }}
            type="secondary"
          >
            {intl.formatMessage({
              defaultMessage:
                '- Please complete the basic details for the offender.',
            })}
          </Paragraph>
        </Col>

        {potentialOffenders > 0 && (
          <Col>
            <Button
              danger
              disabled={saving || potentialOffenders === 0}
              onClick={toggleViewPotentialOffenders}
              size="small"
              style={{ marginLeft: 20 }}
              type="ghost"
            >
              {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
              {potentialOffenders}{' '}
              {intl.formatMessage({
                defaultMessage: 'Potential Offenders',
              })}
            </Button>
          </Col>
        )}
      </Row>
      <Row gutter={50}>
        {offenderSettings.name && (
          <Col span={8}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Name',
              })}
              name="name"
              tooltip={intl.formatMessage({
                defaultMessage: 'Enter the offenders name if you know it.',
              })}
            >
              <Input disabled={saving} onBlur={onSearchOffender} />
            </Form.Item>
          </Col>
        )}
        {offenderSettings.alias && (
          <Col span={8}>
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
        {offenderSettings.gender && (
          <Col span={8}>
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
      </Row>
      <Row gutter={50}>
        {offenderSettings.build && (
          <Col span={8}>
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
        {offenderSettings.height && (
          <Col span={8}>
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
        {offenderSettings.ethnicity && (
          <Col span={8}>
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
      </Row>
      {offenderSettings.hair && (
        <Row gutter={50}>
          <Col span={8}>
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
        </Row>
      )}

      {adminRights && (
        <Row gutter={50}>
          <Col span={10}>
            <Row align="middle" gutter={5}>
              <Col flex={1}>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Offender Warnings',
                  })}
                  name="tags"
                  tooltip={intl.formatMessage({
                    defaultMessage:
                      'select any warning labels that are relevant to this offender or add your own.',
                  })}
                >
                  <Select
                    disabled={saving}
                    loading={tagsLoading}
                    maxTagCount={3}
                    mode="multiple"
                    optionFilterProp="label"
                  >
                    {tags.map((tag) => (
                      <Select.Option label={tag.label} value={tag.value}>
                        {tag.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col>
                <Button
                  disabled={saving}
                  icon={
                    <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />
                  }
                  onClick={toggleAddOffenderTag}
                  style={{ color: 'red', padding: 8 }}
                >
                  {intl.formatMessage({
                    defaultMessage: 'Add Label',
                  })}
                </Button>
              </Col>
            </Row>
          </Col>
          <Col span={10}>
            <Row align="middle" gutter={5}>
              <Col flex={1}>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Custom Galleries',
                  })}
                  name="customGalleries"
                  tooltip={intl.formatMessage({
                    defaultMessage:
                      'select any custom galleries that are relevant to this offender or add your own.',
                  })}
                >
                  <Select
                    disabled={saving}
                    loading={customGalleriesLoading}
                    maxTagCount={3}
                    mode="multiple"
                    optionFilterProp="label"
                    // value={selectedItems}
                    // onChange={onSelectCustomGallery}
                  >
                    {customGalleries.map((el) => (
                      <Select.Option label={el.label} value={el.value}>
                        {el.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col>
                <Button
                  disabled={saving}
                  icon={
                    <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />
                  }
                  onClick={toggleAddCustomGallery}
                  style={{ color: 'red', padding: 8 }}
                >
                  {intl.formatMessage({
                    defaultMessage: 'Add Custom Gallery',
                  })}
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      )}

      {offenderSettings.peculiarities && (
        <Row gutter={16}>
          <Col span={23}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Characteristics',
              })}
              name="peculiarities"
              tooltip={intl.formatMessage({
                defaultMessage:
                  'Enter any distinctive features of the offender.',
              })}
            >
              <Input.TextArea disabled={saving} />
            </Form.Item>
          </Col>
        </Row>
      )}
      {offenderSettings.comment && (
        <Row gutter={16}>
          <Col span={23}>
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
        </Row>
      )}
      {offenderSettings.dateOfBirth && (
        <Row gutter={50}>
          <Col>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: "Do you know the offender's date of birth?",
              })}
              name="ageCheck"
            >
              <Switch
                checked={ageCheck}
                checkedChildren="Yes"
                onChange={() => {
                  setAgeCheck(!ageCheck);
                }}
                style={{ marginLeft: 10, width: 70 }}
                unCheckedChildren="No"
              />
            </Form.Item>
          </Col>

          {ageCheck ? (
            <>
              <Col>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Date of Birth',
                  })}
                  name="dateOfBirth"
                  tooltip={intl.formatMessage({
                    defaultMessage:
                      "Enter the offender's date of birth if known.",
                  })}
                >
                  <DatePicker
                    disabled={saving}
                    disabledDate={(current) =>
                      current && current.valueOf() > Date.now()
                    }
                    style={{ width: 200 }}
                  />
                </Form.Item>
              </Col>
              {offenderSettings.dateOfBirthSource && (
                <Col>
                  <Form.Item
                    label={intl.formatMessage({
                      defaultMessage: 'Information Source',
                    })}
                    name="dateSource"
                    tooltip={intl.formatMessage({
                      defaultMessage:
                        "Enter the information source of the offender's date of birth range of the offender .",
                    })}
                  >
                    <Input.TextArea disabled={saving} style={{ width: 300 }} />
                  </Form.Item>
                </Col>
              )}
            </>
          ) : (
            <Col>
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
                <Select
                  disabled={saving}
                  options={ageValues}
                  style={{ width: 200 }}
                />
              </Form.Item>
            </Col>
          )}
        </Row>
      )}
      {offenderSettings.idVerified && (
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
              <Radio.Group disabled={saving}>
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
                  disabled={saving}
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
                        defaultMessage: 'By BCRP',
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
      )}
      <Drawer
        onClose={toggleAddOffenderTag}
        open={addOffenderTag}
        title={intl.formatMessage({
          defaultMessage: 'Add Offender Warning',
        })}
        width="400"
      >
        {addOffenderTag ? (
          <AddOffenderTag
            onClose={toggleAddOffenderTag}
            update={updateNewOffenderTagData}
          />
        ) : (
          <div />
        )}
      </Drawer>

      <Drawer
        onClose={toggleAddCustomGallery}
        open={addCustomGallery}
        title={intl.formatMessage({
          defaultMessage: 'Add Custom Gallery',
        })}
        width="400"
      >
        {addCustomGallery ? (
          <AddCustomGallery
            onClose={toggleAddCustomGallery}
            update={updateNewCustomGalleryData}
          />
        ) : (
          <div />
        )}
      </Drawer>
    </>
  );
};
export default OffenderDetails;
