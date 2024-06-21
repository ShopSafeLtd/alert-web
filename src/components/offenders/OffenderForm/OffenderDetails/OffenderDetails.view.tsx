import React from 'react';
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Switch,
  Typography,
} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-light-svg-icons';
import { ageValues, buildValues, genderValues, raceValues } from 'types/enums';
import { heightValues } from 'types/enums/height';
import AddCustomGallery from 'components/form-components/customGalleries/AddCustomGallery';
import AddOffenderTag from 'components/form-components/tags/offenderWarnings/AddOffenderWarning';
import type {
  CustomGalleryData,
  OffenderSettingsType,
  TagData,
} from 'types/DataType';
import { useIntl } from 'react-intl';
import { IdSource } from 'graphql/types';

const { Title, Paragraph } = Typography;

interface Props {
  adminRights: boolean;
  saving: boolean;
  tags: { value: string; label: string }[];
  tagsLoading: boolean;
  customGalleries: { value: string; label: string }[];
  customGalleriesLoading: boolean;
  toggleAddOffenderTag: () => void;
  ageCheck: boolean;
  setAgeCheck: (value: boolean) => void;
  idVerified?: boolean;
  toggleAddCustomGallery: () => void;
  addOffenderTag: boolean;
  updateNewOffenderTagData: (values: TagData) => void;
  addCustomGallery: boolean;
  updateNewCustomGalleryData: (values: CustomGalleryData) => void;
  onSearchOffender: () => void;
  potentialOffenders: number;
  toggleViewPotentialOffenders: () => void;
  offenderSettings: OffenderSettingsType;
}

const OffenderDetails = ({
  tags,
  tagsLoading,
  adminRights,
  saving,
  ageCheck,
  setAgeCheck,
  toggleAddOffenderTag,
  idVerified,
  customGalleries,
  customGalleriesLoading,
  toggleAddCustomGallery,
  addOffenderTag,
  updateNewOffenderTagData,
  addCustomGallery,
  updateNewCustomGalleryData,
  onSearchOffender,
  potentialOffenders,
  toggleViewPotentialOffenders,
  offenderSettings,
}: Props): JSX.Element => {
  const intl = useIntl();

  return (
    <>
      <Row align="middle" style={{ marginBottom: 30 }}>
        <Col>
          {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
          <Title style={{ marginBottom: 0 }} level={4}>
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
            style={{ marginBottom: 1, marginLeft: 5 }}
            type="secondary"
            italic
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
              disabled={saving || potentialOffenders === 0}
              size="small"
              danger
              type="ghost"
              onClick={toggleViewPotentialOffenders}
              style={{ marginLeft: 20 }}
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
              name="name"
              label={intl.formatMessage({
                defaultMessage: 'Name',
              })}
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
              name="alias"
              label={intl.formatMessage({
                defaultMessage: 'Alias',
              })}
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
              name="gender"
              label={intl.formatMessage({
                defaultMessage: 'Sex',
              })}
              tooltip={intl.formatMessage({
                defaultMessage: 'Select the gender of the offender if known.',
              })}
            >
              <Select options={genderValues} disabled={saving} />
            </Form.Item>
          </Col>
        )}
      </Row>
      <Row gutter={50}>
        {offenderSettings.build && (
          <Col span={8}>
            <Form.Item
              name="build"
              label={intl.formatMessage({
                defaultMessage: 'Build',
              })}
              tooltip={intl.formatMessage({
                defaultMessage: 'Select the build of the offender if known.',
              })}
            >
              <Select options={buildValues} disabled={saving} />
            </Form.Item>
          </Col>
        )}
        {offenderSettings.height && (
          <Col span={8}>
            <Form.Item
              name="height"
              label={intl.formatMessage({
                defaultMessage: 'Height',
              })}
              tooltip={intl.formatMessage({
                defaultMessage: 'Select the height of the offender if known.',
              })}
            >
              <Select options={heightValues} disabled={saving} />
            </Form.Item>
          </Col>
        )}
        {offenderSettings.ethnicity && (
          <Col span={8}>
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
              <Select options={raceValues} disabled={saving} />
            </Form.Item>
          </Col>
        )}
      </Row>
      {offenderSettings.hair && (
        <Row gutter={50}>
          <Col span={8}>
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
              <Input disabled={saving} />
            </Form.Item>
          </Col>
        </Row>
      )}

      {adminRights && (
        <Row gutter={50}>
          <Col span={10}>
            <Row gutter={5} align="middle">
              <Col flex={1}>
                <Form.Item
                  name="tags"
                  label={intl.formatMessage({
                    defaultMessage: 'Offender Warnings',
                  })}
                  tooltip={intl.formatMessage({
                    defaultMessage:
                      'select any warning labels that are relevant to this offender or add your own.',
                  })}
                >
                  <Select
                    loading={tagsLoading}
                    disabled={saving}
                    mode="multiple"
                    maxTagCount={3}
                    optionFilterProp="label"
                  >
                    {tags.map((tag) => (
                      <Select.Option value={tag.value} label={tag.label}>
                        {tag.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col>
                <Button
                  disabled={saving}
                  style={{ color: 'red', padding: 8 }}
                  onClick={toggleAddOffenderTag}
                  icon={
                    <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />
                  }
                >
                  {intl.formatMessage({
                    defaultMessage: 'Add Label',
                  })}
                </Button>
              </Col>
            </Row>
          </Col>
          <Col span={10}>
            <Row gutter={5} align="middle">
              <Col flex={1}>
                <Form.Item
                  name="customGalleries"
                  label={intl.formatMessage({
                    defaultMessage: 'Custom Galleries',
                  })}
                  tooltip={intl.formatMessage({
                    defaultMessage:
                      'select any custom galleries that are relevant to this offender or add your own.',
                  })}
                >
                  <Select
                    loading={customGalleriesLoading}
                    disabled={saving}
                    mode="multiple"
                    maxTagCount={3}
                    optionFilterProp="label"
                    // value={selectedItems}
                    // onChange={onSelectCustomGallery}
                  >
                    {customGalleries.map((el) => (
                      <Select.Option value={el.value} label={el.label}>
                        {el.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col>
                <Button
                  disabled={saving}
                  style={{ color: 'red', padding: 8 }}
                  onClick={toggleAddCustomGallery}
                  icon={
                    <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />
                  }
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
              name="peculiarities"
              label={intl.formatMessage({
                defaultMessage: 'Characteristics',
              })}
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
              name="comment"
              label={intl.formatMessage({
                defaultMessage: 'Comment',
              })}
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
              name="ageCheck"
              label={intl.formatMessage({
                defaultMessage: "Do you know the offender's date of birth?",
              })}
            >
              <Switch
                style={{ width: 70, marginLeft: 10 }}
                checked={ageCheck}
                checkedChildren="Yes"
                unCheckedChildren="No"
                onChange={() => {
                  setAgeCheck(!ageCheck);
                }}
              />
            </Form.Item>
          </Col>

          {ageCheck ? (
            <>
              <Col>
                <Form.Item
                  name="dateOfBirth"
                  label={intl.formatMessage({
                    defaultMessage: 'Date of Birth',
                  })}
                  tooltip={intl.formatMessage({
                    defaultMessage:
                      "Enter the offender's date of birth if known.",
                  })}
                >
                  <DatePicker
                    style={{ width: 200 }}
                    disabled={saving}
                    disabledDate={(current) =>
                      current && current.valueOf() > Date.now()
                    }
                  />
                </Form.Item>
              </Col>
              {offenderSettings.dateOfBirthSource && (
                <Col>
                  <Form.Item
                    name="dateSource"
                    label={intl.formatMessage({
                      defaultMessage: 'Information Source',
                    })}
                    tooltip={intl.formatMessage({
                      defaultMessage:
                        "Enter the information source of the offender's date of birth range of the offender .",
                    })}
                  >
                    <Input.TextArea style={{ width: 300 }} disabled={saving} />
                  </Form.Item>
                </Col>
              )}
            </>
          ) : (
            <Col>
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
                <Select
                  style={{ width: 200 }}
                  options={ageValues}
                  disabled={saving}
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
              name="idVerified"
              label={intl.formatMessage({
                defaultMessage: "Has the offender's ID been verified?",
              })}
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
                />
              </Form.Item>
            </Col>
          )}
        </Row>
      )}
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Add Offender Warning',
        })}
        open={addOffenderTag}
        width="400"
        onClose={toggleAddOffenderTag}
      >
        {addOffenderTag ? (
          <AddOffenderTag
            update={updateNewOffenderTagData}
            onClose={toggleAddOffenderTag}
          />
        ) : (
          <div />
        )}
      </Drawer>

      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Add Custom Gallery',
        })}
        open={addCustomGallery}
        width="400"
        onClose={toggleAddCustomGallery}
      >
        {addCustomGallery ? (
          <AddCustomGallery
            update={updateNewCustomGalleryData}
            onClose={toggleAddCustomGallery}
          />
        ) : (
          <div />
        )}
      </Drawer>
    </>
  );
};
export default OffenderDetails;
