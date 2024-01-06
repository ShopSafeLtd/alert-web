import React from 'react';
import type { EditOffenderQuery } from 'graphql/generated';
import { IdSource } from 'graphql/generated';

import {
  Radio,
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Skeleton,
  Switch,
} from 'antd';
import { ageValues, buildValues, genderValues, raceValues } from 'types/enums';
import moment from 'moment';
import { useIntl } from 'react-intl';
import { heightValues } from 'types/enums/height';
import type { FormData } from './useEditOffenderFeed';

interface Props {
  onClose: () => void;
  onSubmit: (value: FormData) => void;
  data: EditOffenderQuery | undefined;
  loading: boolean;
  saving: boolean;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  tags: { value: string; label: string }[];
  tagsLoading: boolean;
  customGalleries: { value: string; label: string }[];
  customGalleriesLoading: boolean;
  ageCheck: boolean;
  setAgeCheck: (value: boolean) => void;
  idVerified: boolean;
  onValuesChange?: (changedValues: FormData, values: FormData) => void;
  adminRights: boolean;
  needJustification: boolean;
}

const EditOffender = ({
  onSubmit,
  data,
  loading,
  saving,
  groups,
  groupsLoading,
  tags,
  tagsLoading,
  customGalleries,
  customGalleriesLoading,
  ageCheck,
  setAgeCheck,
  onClose,
  idVerified,
  onValuesChange,
  adminRights,
  needJustification,
}: Props): JSX.Element => {
  const intl = useIntl();

  return (
    <div className="list-view">
      {loading ? (
        <Skeleton />
      ) : (
        <Form
          onFinish={onSubmit}
          onValuesChange={onValuesChange}
          layout="vertical"
          initialValues={{
            name: data?.offender?.name || null,
            alias: data?.offender?.alias || [],
            age: data?.offender?.age || null,
            gender: data?.offender?.gender || null,
            race: data?.offender?.race || null,
            build: data?.offender?.build || null,
            height: data?.offender?.height || null,
            hair: data?.offender?.hair || null,
            ageCheck: !!data?.offender?.dateOfBirth,
            peculiarities: data?.offender?.peculiarities || null,
            dateOfBirth: data?.offender?.dateOfBirth
              ? moment(data?.offender?.dateOfBirth, 'YYYY-MM-DD')
              : null,
            dateSource: data?.offender?.dateSource || null,
            groups:
              data?.offender?.groups && data?.offender?.groups.length > 0
                ? data?.offender?.groups.map(({ id }) => id)
                : [],
            tags:
              data?.offender?.tags && data?.offender?.tags.length > 0
                ? data?.offender?.tags.map(({ id }) => id)
                : [],
            customGalleries:
              data?.offender?.customGalleries &&
              data.offender.customGalleries.length > 0
                ? data.offender.customGalleries.map(({ id }) => id)
                : [],
            idVerified: data?.offender?.idVerified || false,
            idSource: data?.offender?.idSource,
            infoSource: data?.offender?.infoSource || '',
            knownFor: data?.offender?.knownFor || [],
            targetedGoods: data?.offender?.targetedGoods || [],
            justification: data?.offender?.justification || '',
            comment: data?.offender?.comment || '',
          }}
        >
          <Row gutter={30}>
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
                <Input disabled={saving} />
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
                <Select disabled={saving} mode="tags" />
              </Form.Item>
            </Col>

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

            <Col span={24}>
              <Form.Item
                name="ageCheck"
                label={intl.formatMessage({
                  defaultMessage: "Do you know the offender's date of birth?",
                  id: 'nRYjxK',
                })}
              >
                <Switch
                  style={{ width: 70, marginLeft: 10 }}
                  checked={ageCheck}
                  checkedChildren={intl.formatMessage({
                    defaultMessage: 'Yes',
                    id: 'a5msuh',
                  })}
                  unCheckedChildren={intl.formatMessage({
                    defaultMessage: 'No',
                    id: 'oUWADl',
                  })}
                  onChange={() => {
                    setAgeCheck(!ageCheck);
                  }}
                />
              </Form.Item>
            </Col>

            {ageCheck ? (
              <>
                <Col span={8}>
                  <Form.Item
                    name="dateOfBirth"
                    label={intl.formatMessage({
                      defaultMessage: 'Date of Birth',
                      id: 'e9Z+tg',
                    })}
                    tooltip={intl.formatMessage({
                      defaultMessage:
                        "Enter the offender's date of birth if known.",
                      id: 'Yt1WCY',
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
                <Col span={16}>
                  <Form.Item
                    name="dateSource"
                    label={intl.formatMessage({
                      defaultMessage: 'Information Source',
                      id: 'LUqHSz',
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
              <Col span={12}>
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
            <Col span={24}>
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
                <Radio.Group disabled={saving}>
                  <Radio.Button value>
                    {intl.formatMessage({
                      defaultMessage: 'Yes',
                      id: 'a5msuh',
                    })}
                  </Radio.Button>
                  <Radio.Button value={false}>
                    {intl.formatMessage({
                      defaultMessage: 'No',
                      id: 'oUWADl',
                    })}
                  </Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
            {idVerified && (
              <Col span={12}>
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

          {adminRights && (
            <Row gutter={30}>
              <Col span={12}>
                <Form.Item
                  name="tags"
                  label={intl.formatMessage({
                    defaultMessage: 'Offender Warnings',
                    id: '1jRWJS',
                  })}
                  tooltip={intl.formatMessage({
                    defaultMessage:
                      'select any warning labels that are relevant to this offender or add your own.',
                    id: 'BwoE1F',
                  })}
                >
                  <Select
                    loading={tagsLoading}
                    disabled={saving}
                    mode="multiple"
                    maxTagCount={2}
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
              <Col span={12}>
                <Form.Item
                  name="customGalleries"
                  label={intl.formatMessage({
                    defaultMessage: 'Custom Galleries',
                    id: 'bzpFEk',
                  })}
                  tooltip={intl.formatMessage({
                    defaultMessage:
                      'select any custom galleries that are relevant to this offender or add your own.',
                    id: 'Or8c6M',
                  })}
                >
                  <Select
                    loading={customGalleriesLoading}
                    disabled={saving}
                    mode="multiple"
                    maxTagCount={2}
                    optionFilterProp="label"
                  >
                    {customGalleries.map((el) => (
                      <Select.Option value={el.value} label={el.label}>
                        {el.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          )}
          {groups.length > 0 && (
            <Row>
              <Col span={24}>
                <Form.Item
                  name="groups"
                  label={intl.formatMessage({
                    defaultMessage: 'Groups',
                    id: 'hzmswI',
                  })}
                  tooltip={intl.formatMessage({
                    defaultMessage:
                      'Select the groups that you would like this offender to be visible to.',
                    id: '/oJY/I',
                  })}
                  rules={[
                    {
                      required: true,
                      message: intl.formatMessage({
                        defaultMessage:
                          'Please select at least one group for the offender.',
                        id: 'hK3zLA',
                      }),
                    },
                  ]}
                >
                  <Select
                    loading={groupsLoading}
                    disabled={saving}
                    mode="multiple"
                    maxTagCount={3}
                  >
                    {groups.map((group) => (
                      <Select.Option key={group.value} value={group.value}>
                        {group.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          )}
          {data?.offender.knownFor && data?.offender.knownFor.length > 0 && (
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
                  <Select disabled={saving} mode="multiple" maxTagCount={3}>
                    {data?.offender.knownFor.map((el) => (
                      <Select.Option key={el} value={el}>
                        {el}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          )}
          {data?.offender.targetedGoods &&
            data?.offender.targetedGoods.length > 0 && (
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
                    <Select disabled={saving} mode="multiple" maxTagCount={3}>
                      {data?.offender.targetedGoods.map((el) => (
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
            {data?.offender?.infoSource && (
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
            <Col span={23}>
              <Form.Item
                name="peculiarities"
                label={intl.formatMessage({
                  defaultMessage: 'Characteristics',
                  id: 'xksukL',
                })}
                tooltip={intl.formatMessage({
                  defaultMessage:
                    'Enter any distinctive features of the offender.',
                  id: 'jISH3I',
                })}
              >
                <Input.TextArea disabled={saving} />
              </Form.Item>
            </Col>
            <Col span={23}>
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
                <Input.TextArea disabled={saving} />
              </Form.Item>
            </Col>

            {(needJustification || data?.offender.justification) && (
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

          <Form.Item>
            <Row style={{ marginTop: 30 }} gutter={10} justify="end">
              <Col>
                <Button disabled={saving} onClick={onClose}>
                  {intl.formatMessage({
                    defaultMessage: 'Cancel',
                    id: '47FYwb',
                  })}
                </Button>
              </Col>
              <Col>
                <Button
                  disabled={saving}
                  loading={saving}
                  type="primary"
                  htmlType="submit"
                >
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
