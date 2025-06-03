/* eslint-disable @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call,  @typescript-eslint/no-unsafe-member-access, no-return-assign */
import type { FormInstance } from 'antd';

import BusinessesSelect from '#/components/form-components/BusinessesSelect/BusinessesSelect.view';
import RoleSelect from '#/components/form-components/Roles/RoleSelect';
import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  PageHeader,
  Radio,
  Row,
  Select,
  Space,
} from 'antd';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import { useIntl } from 'react-intl';
import { useNavigate, useParams } from 'react-router';

import type { FormData, Section, SelectOption } from './useCreateChecklist';

interface Props {
  brands: SelectOption[];
  form: FormInstance<FormData>;
  handleAddQuestion: (sectionIndex: number, subSectionIndex: number) => void;
  handleAddSection: () => void;
  handleAddSubsection: (index: number) => void;
  handleRemoveQuestion: (
    sectionIndex: number,
    subsectionIndex: number,
    questionIndex: number
  ) => void;
  handleRemoveSection: (index: number) => void;
  handleRemoveSubsection: (
    sectionIndex: number,
    subsectionIndex: number
  ) => void;
  handleSectionChange: (
    changedValues: {
      sections: Section[];
    },
    allValues: {
      sections: Section[];
    }
  ) => void;
  loading: boolean;
  onFinish: (data: FormData) => void;
  users: SelectOption[];
}
const indexToLetter = (num: number) => (num + 10).toString(36).toUpperCase();

const typeToAvail = (ty: string) => {
  switch (ty) {
    case 'PASS_FAIL':
    case 'PASS_FAIL_NA': {
      return [
        { label: 'PASS', value: 'PASS' },
        { label: 'FAIL', value: 'FAIL' },
      ];
    }
    case 'YES_NO':
    case 'YES_NO_NA': {
      return [
        { label: 'YES', value: 'YES' },
        { label: 'NO', value: 'NO' },
      ];
    }
    case 'GOOD_BAD':
    case 'GOOD_BAD_NA': {
      return [
        { label: 'GOOD', value: 'GOOD' },
        { label: 'BAD', value: 'BAD' },
      ];
    }
    case 'TEXT': {
      return [];
    }
    default: {
      return [];
    }
  }
};

const CreateChecklistView: React.FC<Props> = ({
  brands,
  form,
  handleAddQuestion,
  handleAddSection,
  handleAddSubsection,
  handleRemoveQuestion,
  handleRemoveSection,
  handleRemoveSubsection,
  handleSectionChange,
  loading,
  onFinish,
  users,
}) => {
  const intl = useIntl();
  const { id } = useParams();
  const navigate = useNavigate();
  const schemeId = useAtomValue(currentSchemeIdAtom);

  return (
    <div className="page-view">
      <PageHeader
        onBack={() => navigate('/app/checklists')}
        title={
          id
            ? intl.formatMessage({
                defaultMessage: 'Edit Checklist',
              })
            : intl.formatMessage({
                defaultMessage: 'Create Checklist',
              })
        }
      />
      <Form
        autoComplete="off"
        form={form}
        layout="horizontal"
        name="checklist_form"
        onFinish={onFinish}
        onValuesChange={handleSectionChange}
      >
        <Card loading={loading}>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Checklist Title',
                })}
                name="title"
                rules={[
                  {
                    message: intl.formatMessage({
                      defaultMessage: 'Missing title',
                    }),
                    required: true,
                  },
                ]}
              >
                <Input
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Title',
                  })}
                />
              </Form.Item>
            </Col>
            <Col flex={1}>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Checklist Description',
                })}
                name="description"
              >
                <Input.TextArea
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Description',
                  })}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Users',
                })}
                name="userIds"
              >
                <Select
                  maxTagCount="responsive"
                  mode="multiple"
                  optionFilterProp="label"
                  options={users}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Users',
                  })}
                  showSearch
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Roles',
                })}
                name="roles"
              >
                <RoleSelect multi schemeId={schemeId} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Businesses',
                })}
                name="businessIds"
              >
                <BusinessesSelect
                  allowClear
                  maxTagCount="responsive"
                  mode="multiple"
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Businesses',
                  })}
                  showSearch
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Form.List name="sections">
          {(fields) => (
            <>
              {fields.map(({ name }, sectionIndex) => (
                <Card key={name} loading={loading}>
                  <Row>
                    <Space>
                      <Form.Item
                        label={intl.formatMessage({
                          defaultMessage: 'Section',
                        })}
                        name={[name, 'order']}
                        rules={[
                          {
                            message: intl.formatMessage({
                              defaultMessage: 'Missing order',
                            }),
                            required: true,
                          },
                        ]}
                      >
                        <InputNumber
                          min={1}
                          placeholder={intl.formatMessage({
                            defaultMessage: 'Order',
                          })}
                          size="small"
                          style={{ width: '55px' }}
                        />
                      </Form.Item>
                      <Form.Item
                        label={intl.formatMessage({
                          defaultMessage: 'Section Title',
                        })}
                        name={[name, 'title']}
                        rules={[{ message: 'Missing title', required: true }]}
                      >
                        <Input
                          placeholder={intl.formatMessage({
                            defaultMessage: 'Title',
                          })}
                          style={{ width: 600 }}
                        />
                      </Form.Item>
                    </Space>
                    <Col flex={1} />
                    <Form.Item>
                      <Button
                        onClick={() => handleRemoveSection(sectionIndex)}
                        type="primary"
                      >
                        {intl.formatMessage({
                          defaultMessage: 'Delete Section',
                        })}
                      </Button>
                    </Form.Item>
                  </Row>
                  <Form.Item
                    shouldUpdate={(prevValues, currentValues) =>
                      prevValues.sections !== currentValues.sections
                    }
                  >
                    {() => {
                      const currentDependent = form.getFieldValue([
                        'sections',
                        name,
                        'dependentWeight',
                      ]);
                      if (sectionIndex === 0) {
                        return null;
                      }
                      return (
                        <>
                          <Checkbox
                            checked={!!currentDependent}
                            onChange={(e) => {
                              if (e.target.checked) {
                                form.setFields([
                                  {
                                    name: ['sections', name, 'dependentWeight'],
                                    value: { dependsOn: '', weight: '' },
                                  },
                                ]);
                              } else {
                                form.setFields([
                                  {
                                    name: ['sections', name, 'dependentWeight'],
                                    value: undefined,
                                  },
                                ]);
                              }
                            }}
                          >
                            {intl.formatMessage({
                              defaultMessage: 'Enable Dependent Weight',
                            })}
                          </Checkbox>
                          {currentDependent && (
                            <div
                              style={{
                                display: 'flex',
                                gap: 16,
                                marginBottom: 16,
                              }}
                            >
                              <Form.Item
                                label={intl.formatMessage({
                                  defaultMessage: 'Depends On',
                                })}
                                name={[name, 'dependentWeight', 'dependsOn']}
                                rules={[
                                  {
                                    message: 'Please select a section',
                                    required: true,
                                  },
                                ]}
                              >
                                <Select
                                  placeholder={intl.formatMessage({
                                    defaultMessage: 'Select section',
                                  })}
                                  style={{
                                    width: 250,
                                  }}
                                >
                                  {(form.getFieldValue('sections') || []).map(
                                    (
                                      sec: FormData['sections'][number],
                                      idx: number
                                    ) => {
                                      if (idx === sectionIndex) return null;
                                      return (
                                        <Select.Option
                                          key={idx}
                                          value={(idx + 1).toString()}
                                        >
                                          {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                                          {`${idx + 1} - ${sec.title}`}
                                        </Select.Option>
                                      );
                                    }
                                  )}
                                </Select>
                              </Form.Item>
                              <Form.Item
                                label={intl.formatMessage({
                                  defaultMessage: 'Weight',
                                })}
                                name={[name, 'dependentWeight', 'weight']}
                                rules={[
                                  {
                                    message: 'Please input a weight',
                                    required: true,
                                  },
                                ]}
                              >
                                <InputNumber
                                  parser={(value) =>
                                    value ? value.toString() : ''
                                  }
                                  style={{ width: 120 }}
                                />
                              </Form.Item>
                            </div>
                          )}
                        </>
                      );
                    }}
                  </Form.Item>
                  <Form.List name={[name, 'subsections']}>
                    {(subsectionsFields) => (
                      <>
                        {subsectionsFields.map(
                          (subsectionField, subsectionIndex) => (
                            <>
                              <Row key={subsectionField.key}>
                                <Col span={1} />
                                <Space size={35}>
                                  {/* Subsection fields */}
                                  <Form.Item
                                    label={intl.formatMessage(
                                      {
                                        defaultMessage: 'Subsection: {value}',
                                      },
                                      {
                                        value: subsectionIndex + 1,
                                      }
                                    )}
                                    name={[subsectionField.name, 'order']}
                                    rules={[
                                      {
                                        message: 'Missing order',
                                        required: true,
                                      },
                                    ]}
                                  >
                                    <InputNumber
                                      min={1}
                                      placeholder={intl.formatMessage({
                                        defaultMessage: 'Subsection Order',
                                      })}
                                      size="small"
                                      style={{ width: '55px' }}
                                    />
                                  </Form.Item>
                                  <Form.Item
                                    label={intl.formatMessage({
                                      defaultMessage: 'Subsection title',
                                    })}
                                    name={[subsectionField.name, 'title']}
                                    rules={[
                                      {
                                        message: 'Missing title',
                                        required: true,
                                      },
                                    ]}
                                  >
                                    <Input
                                      placeholder={intl.formatMessage({
                                        defaultMessage: 'Subsection Title',
                                      })}
                                      style={{ width: 600 }}
                                    />
                                  </Form.Item>
                                </Space>
                                <Col flex={1} />
                                <Form.Item>
                                  <Button
                                    onClick={() =>
                                      handleRemoveSubsection(
                                        sectionIndex,
                                        subsectionIndex
                                      )
                                    }
                                    size="small"
                                  >
                                    {intl.formatMessage({
                                      defaultMessage: 'Delete Subsection',
                                    })}
                                  </Button>
                                </Form.Item>
                              </Row>

                              <Form.List
                                name={[subsectionField.name, 'questions']}
                              >
                                {(questionFields) => (
                                  <>
                                    {questionFields.map(
                                      (questionField, questionIndex) => (
                                        // eslint-disable-next-line react/jsx-key
                                        <Card loading={loading}>
                                          <Row key={questionField.key}>
                                            <Col span={2} />
                                            <Col span={20}>
                                              <Space size="large">
                                                {/* Questions fields */}
                                                <Form.Item
                                                  label={intl.formatMessage(
                                                    {
                                                      defaultMessage:
                                                        'Question: {value}',
                                                    },
                                                    {
                                                      value:
                                                        indexToLetter(
                                                          questionIndex
                                                        ),
                                                    }
                                                  )}
                                                  name={[
                                                    questionField.name,
                                                    'order',
                                                  ]}
                                                  rules={[
                                                    {
                                                      message: 'Missing order',
                                                      required: true,
                                                    },
                                                  ]}
                                                >
                                                  <InputNumber
                                                    min={1}
                                                    placeholder={intl.formatMessage(
                                                      {
                                                        defaultMessage:
                                                          'Question Order',
                                                      }
                                                    )}
                                                    size="small"
                                                    style={{ width: '55px' }}
                                                  />
                                                </Form.Item>
                                                <Form.Item
                                                  label={intl.formatMessage({
                                                    defaultMessage: 'Question',
                                                  })}
                                                  name={[
                                                    questionField.name,
                                                    'title',
                                                  ]}
                                                  rules={[
                                                    {
                                                      message:
                                                        'Missing question',
                                                      required: true,
                                                    },
                                                  ]}
                                                >
                                                  <Input.TextArea
                                                    autoSize
                                                    placeholder={intl.formatMessage(
                                                      {
                                                        defaultMessage:
                                                          'Question',
                                                      }
                                                    )}
                                                    style={{ width: 600 }}
                                                  />
                                                </Form.Item>
                                              </Space>
                                            </Col>
                                            <Col span={2}>
                                              <Form.Item>
                                                <Button
                                                  onClick={() =>
                                                    handleRemoveQuestion(
                                                      sectionIndex,
                                                      subsectionIndex,
                                                      questionIndex
                                                    )
                                                  }
                                                  size="small"
                                                >
                                                  {intl.formatMessage({
                                                    defaultMessage:
                                                      'Delete Question',
                                                  })}
                                                </Button>
                                              </Form.Item>
                                            </Col>
                                            <Col span={2} />
                                            <Col span={22}>
                                              <Space size="large">
                                                <Form.Item
                                                  label={intl.formatMessage({
                                                    defaultMessage: 'Type',
                                                  })}
                                                  name={[
                                                    questionField.name,
                                                    'type',
                                                  ]}
                                                  rules={[
                                                    {
                                                      message:
                                                        'Missing question type',
                                                      required: true,
                                                    },
                                                  ]}
                                                >
                                                  <Radio.Group
                                                    buttonStyle="solid"
                                                    optionType="button"
                                                    options={[
                                                      {
                                                        label:
                                                          intl.formatMessage({
                                                            defaultMessage:
                                                              'Pass/Fail',
                                                          }),
                                                        value: 'PASS_FAIL',
                                                      },
                                                      {
                                                        label:
                                                          intl.formatMessage({
                                                            defaultMessage:
                                                              'Yes/No',
                                                          }),
                                                        value: 'YES_NO',
                                                      },
                                                      {
                                                        label:
                                                          intl.formatMessage({
                                                            defaultMessage:
                                                              'Good/Bad',
                                                          }),
                                                        value: 'GOOD_BAD',
                                                      },
                                                      {
                                                        label:
                                                          intl.formatMessage({
                                                            defaultMessage:
                                                              'Pass/Fail (NA)',
                                                          }),
                                                        value: 'PASS_FAIL_NA',
                                                      },
                                                      {
                                                        label:
                                                          intl.formatMessage({
                                                            defaultMessage:
                                                              'Yes/No (NA)',
                                                          }),
                                                        value: 'YES_NO_NA',
                                                      },
                                                      {
                                                        label:
                                                          intl.formatMessage({
                                                            defaultMessage:
                                                              'Good/Bad (NA)',
                                                          }),
                                                        value: 'GOOD_BAD_NA',
                                                      },
                                                      {
                                                        label:
                                                          intl.formatMessage({
                                                            defaultMessage:
                                                              'Text',
                                                          }),
                                                        value: 'TEXT',
                                                      },
                                                    ]}
                                                  />
                                                </Form.Item>
                                                <Form.Item
                                                  label={intl.formatMessage({
                                                    defaultMessage: 'Weighted',
                                                  })}
                                                  name={[
                                                    questionField.name,
                                                    'weighted',
                                                  ]}
                                                  rules={[
                                                    {
                                                      message:
                                                        'Missing question type',
                                                      required: true,
                                                    },
                                                  ]}
                                                  valuePropName="checked"
                                                >
                                                  <Checkbox />
                                                </Form.Item>
                                                <Form.Item
                                                  shouldUpdate={(
                                                    prevValues,
                                                    currentValues
                                                  ) =>
                                                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                                                    prevValues.sections[name]
                                                      .subsections[
                                                      subsectionField.name
                                                    ].questions[
                                                      questionField.name
                                                    ].weighted !==
                                                      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                                                      currentValues.sections[
                                                        name
                                                      ].subsections[
                                                        subsectionField.name
                                                      ].questions[
                                                        questionField.name
                                                      ].weighted || // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                                                    prevValues.sections[name]
                                                      .subsections[
                                                      subsectionField.name
                                                    ].questions[
                                                      questionField.name
                                                    ].type !==
                                                      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                                                      currentValues.sections[
                                                        name
                                                      ].subsections[
                                                        subsectionField.name
                                                      ].questions[
                                                        questionField.name
                                                      ].type
                                                  }
                                                >
                                                  {({ getFieldValue }) => {
                                                    const type = getFieldValue([
                                                      'sections',
                                                      name,
                                                      'subsections',
                                                      subsectionField.name,
                                                      'questions',
                                                      questionField.name,
                                                      'type',
                                                    ]) as string;

                                                    const isWeighted =
                                                      getFieldValue([
                                                        'sections',
                                                        name,
                                                        'subsections',
                                                        subsectionField.name,
                                                        'questions',
                                                        questionField.name,
                                                        'weighted',
                                                      ]) as boolean;

                                                    if (!isWeighted) {
                                                      return null;
                                                    }

                                                    const renderFormItems =
                                                      () => {
                                                        switch (type) {
                                                          case 'PASS_FAIL_NA':
                                                          case 'PASS_FAIL': {
                                                            return (
                                                              <Space>
                                                                <Row>
                                                                  <Form.Item
                                                                    initialValue={
                                                                      5
                                                                    }
                                                                    label={intl.formatMessage(
                                                                      {
                                                                        defaultMessage:
                                                                          'Pass Weight',
                                                                      }
                                                                    )}
                                                                    name={[
                                                                      questionField.name,
                                                                      'passWeight',
                                                                    ]}
                                                                    rules={[
                                                                      {
                                                                        required:
                                                                          true,
                                                                      },
                                                                    ]}
                                                                    style={{
                                                                      marginBottom: 0,
                                                                    }}
                                                                  >
                                                                    <InputNumber
                                                                      min={0}
                                                                      placeholder={intl.formatMessage(
                                                                        {
                                                                          defaultMessage:
                                                                            'Pass Weight',
                                                                        }
                                                                      )}
                                                                      size="small"
                                                                      style={{
                                                                        width:
                                                                          '100px',
                                                                      }}
                                                                    />
                                                                  </Form.Item>

                                                                  <Form.Item
                                                                    initialValue={
                                                                      0
                                                                    }
                                                                    label={intl.formatMessage(
                                                                      {
                                                                        defaultMessage:
                                                                          'Fail Weight',
                                                                      }
                                                                    )}
                                                                    name={[
                                                                      questionField.name,
                                                                      'failWeight',
                                                                    ]}
                                                                    rules={[
                                                                      {
                                                                        required:
                                                                          true,
                                                                      },
                                                                    ]}
                                                                    style={{
                                                                      marginBottom: 0,
                                                                    }}
                                                                  >
                                                                    <InputNumber
                                                                      min={0}
                                                                      placeholder={intl.formatMessage(
                                                                        {
                                                                          defaultMessage:
                                                                            'Fail Weight',
                                                                        }
                                                                      )}
                                                                      size="small"
                                                                      style={{
                                                                        width:
                                                                          '100px',
                                                                      }}
                                                                    />
                                                                  </Form.Item>
                                                                </Row>
                                                              </Space>
                                                            );
                                                          }
                                                          case 'YES_NO_NA':
                                                          case 'YES_NO': {
                                                            return (
                                                              <Space>
                                                                <Row>
                                                                  <Form.Item
                                                                    initialValue={
                                                                      5
                                                                    }
                                                                    label={intl.formatMessage(
                                                                      {
                                                                        defaultMessage:
                                                                          'Yes Weight',
                                                                      }
                                                                    )}
                                                                    name={[
                                                                      questionField.name,
                                                                      'passWeight',
                                                                    ]}
                                                                    rules={[
                                                                      {
                                                                        required:
                                                                          true,
                                                                      },
                                                                    ]}
                                                                    style={{
                                                                      marginBottom: 0,
                                                                    }}
                                                                  >
                                                                    <InputNumber
                                                                      min={0}
                                                                      placeholder={intl.formatMessage(
                                                                        {
                                                                          defaultMessage:
                                                                            'Yes Weight',
                                                                        }
                                                                      )}
                                                                      size="small"
                                                                      style={{
                                                                        width:
                                                                          '100px',
                                                                      }}
                                                                    />
                                                                  </Form.Item>

                                                                  <Form.Item
                                                                    initialValue={
                                                                      0
                                                                    }
                                                                    label={intl.formatMessage(
                                                                      {
                                                                        defaultMessage:
                                                                          'No Weight',
                                                                      }
                                                                    )}
                                                                    name={[
                                                                      questionField.name,
                                                                      'failWeight',
                                                                    ]}
                                                                    rules={[
                                                                      {
                                                                        required:
                                                                          true,
                                                                      },
                                                                    ]}
                                                                    style={{
                                                                      marginBottom: 0,
                                                                    }}
                                                                  >
                                                                    <InputNumber
                                                                      min={0}
                                                                      placeholder={intl.formatMessage(
                                                                        {
                                                                          defaultMessage:
                                                                            'No Weight',
                                                                        }
                                                                      )}
                                                                      size="small"
                                                                      style={{
                                                                        width:
                                                                          '100px',
                                                                      }}
                                                                    />
                                                                  </Form.Item>
                                                                </Row>
                                                              </Space>
                                                            );
                                                          }
                                                          case 'GOOD_BAD_NA':
                                                          case 'GOOD_BAD': {
                                                            return (
                                                              <Space>
                                                                <Row>
                                                                  <Form.Item
                                                                    initialValue={
                                                                      5
                                                                    }
                                                                    label={intl.formatMessage(
                                                                      {
                                                                        defaultMessage:
                                                                          'Good Weight',
                                                                      }
                                                                    )}
                                                                    name={[
                                                                      questionField.name,
                                                                      'passWeight',
                                                                    ]}
                                                                    rules={[
                                                                      {
                                                                        required:
                                                                          true,
                                                                      },
                                                                    ]}
                                                                    style={{
                                                                      marginBottom: 0,
                                                                    }}
                                                                  >
                                                                    <InputNumber
                                                                      min={0}
                                                                      placeholder={intl.formatMessage(
                                                                        {
                                                                          defaultMessage:
                                                                            'Good Weight',
                                                                        }
                                                                      )}
                                                                      size="small"
                                                                      style={{
                                                                        width:
                                                                          '100px',
                                                                      }}
                                                                    />
                                                                  </Form.Item>

                                                                  <Form.Item
                                                                    initialValue={
                                                                      0
                                                                    }
                                                                    label={intl.formatMessage(
                                                                      {
                                                                        defaultMessage:
                                                                          'Bad Weight',
                                                                      }
                                                                    )}
                                                                    name={[
                                                                      questionField.name,
                                                                      'failWeight',
                                                                    ]}
                                                                    rules={[
                                                                      {
                                                                        required:
                                                                          true,
                                                                      },
                                                                    ]}
                                                                    style={{
                                                                      marginBottom: 0,
                                                                    }}
                                                                  >
                                                                    <InputNumber
                                                                      min={0}
                                                                      placeholder={intl.formatMessage(
                                                                        {
                                                                          defaultMessage:
                                                                            'Bad Weight',
                                                                        }
                                                                      )}
                                                                      size="small"
                                                                      style={{
                                                                        width:
                                                                          '100px',
                                                                      }}
                                                                    />
                                                                  </Form.Item>
                                                                </Row>
                                                              </Space>
                                                            );
                                                          }
                                                          case 'TEXT': {
                                                            return (
                                                              <Space>
                                                                <Row>
                                                                  <Form.Item
                                                                    initialValue={
                                                                      5
                                                                    }
                                                                    label={intl.formatMessage(
                                                                      {
                                                                        defaultMessage:
                                                                          'Text Weight',
                                                                      }
                                                                    )}
                                                                    name={[
                                                                      questionField.name,
                                                                      'passWeight',
                                                                    ]}
                                                                    rules={[
                                                                      {
                                                                        required:
                                                                          true,
                                                                      },
                                                                    ]}
                                                                    style={{
                                                                      marginBottom: 0,
                                                                    }}
                                                                  >
                                                                    <InputNumber
                                                                      min={0}
                                                                      placeholder={intl.formatMessage(
                                                                        {
                                                                          defaultMessage:
                                                                            'Text Weight',
                                                                        }
                                                                      )}
                                                                      size="small"
                                                                      style={{
                                                                        width:
                                                                          '100px',
                                                                      }}
                                                                    />
                                                                  </Form.Item>
                                                                </Row>
                                                              </Space>
                                                            );
                                                          }
                                                          default: {
                                                            return null;
                                                          }
                                                        }
                                                      };

                                                    return renderFormItems();
                                                  }}
                                                </Form.Item>
                                              </Space>
                                            </Col>
                                            <Col span={2} />
                                            <Col span={22}>
                                              <Form.Item
                                                label={intl.formatMessage({
                                                  defaultMessage: 'Brands',
                                                })}
                                                name={[
                                                  questionField.name,
                                                  'brandIds',
                                                ]}
                                                rules={[
                                                  {
                                                    required: false,
                                                  },
                                                ]}
                                              >
                                                <Select
                                                  allowClear
                                                  mode="multiple"
                                                  optionFilterProp="label"
                                                  options={brands}
                                                  style={{ width: 250 }}
                                                />
                                              </Form.Item>
                                            </Col>
                                            <Col span={2} />
                                            <Col span={20}>
                                              <Form.Item
                                                label={intl.formatMessage({
                                                  defaultMessage: 'Dependent',
                                                })}
                                                name={[
                                                  questionField.name,
                                                  'dependentCheck',
                                                ]}
                                                rules={[
                                                  {
                                                    required: false,
                                                  },
                                                ]}
                                                valuePropName="checked"
                                              >
                                                <Checkbox />
                                              </Form.Item>
                                              <Form.Item
                                                shouldUpdate={(
                                                  prevValues,
                                                  currentValues
                                                ) => {
                                                  const currentQs =
                                                    currentValues.sections[
                                                      name
                                                    ].subsections[
                                                      subsectionField.name
                                                    ].questions.map(
                                                      ({ title }) => title
                                                    );

                                                  const prevQs =
                                                    currentValues.sections[
                                                      name
                                                    ].subsections[
                                                      subsectionField.name
                                                    ].questions.map(
                                                      ({ title }) => title
                                                    );
                                                  if (!currentQs !== prevQs)
                                                    return true;

                                                  return (
                                                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                                                    prevValues.sections[name]
                                                      .subsections[
                                                      subsectionField.name
                                                    ].questions[
                                                      questionField.name
                                                    ].dependentCheck !==
                                                      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                                                      currentValues.sections[
                                                        name
                                                      ].subsections[
                                                        subsectionField.name
                                                      ].questions[
                                                        questionField.name
                                                      ].dependentCheck || // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                                                    prevValues.sections[name]
                                                      .subsections[
                                                      subsectionField.name
                                                    ].questions[
                                                      questionField.name
                                                    ].dependentQuestion !==
                                                      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                                                      currentValues.sections[
                                                        name
                                                      ].subsections[
                                                        subsectionField.name
                                                      ].questions[
                                                        questionField.name
                                                      ].dependentQuestion || // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                                                    prevValues.sections[name]
                                                      .subsections[
                                                      subsectionField.name
                                                    ].questions.length !==
                                                      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                                                      currentValues.sections[
                                                        name
                                                      ].subsections[
                                                        subsectionField.name
                                                      ].questions.length
                                                  );
                                                }}
                                              >
                                                {({
                                                  getFieldValue,
                                                  setFieldValue,
                                                }) => {
                                                  const isDependentCheck =
                                                    getFieldValue([
                                                      'sections',
                                                      name,
                                                      'subsections',
                                                      subsectionField.name,
                                                      'questions',
                                                      questionField.name,
                                                      'dependentCheck',
                                                    ]) as boolean;

                                                  if (!isDependentCheck) {
                                                    return null;
                                                  }

                                                  const formValues =
                                                    form.getFieldsValue();
                                                  const qs =
                                                    formValues.sections[
                                                      sectionIndex
                                                    ].subsections[
                                                      subsectionIndex
                                                    ].questions.map(
                                                      (q, index) => {
                                                        if (
                                                          index !==
                                                          questionIndex
                                                        ) {
                                                          return {
                                                            question: q.title,
                                                            type: q.type,
                                                          };
                                                        }
                                                        return null;
                                                      }
                                                    );

                                                  let selectedQ = qs.find(
                                                    (qQuestion) =>
                                                      qQuestion?.question ===
                                                      getFieldValue([
                                                        'sections',
                                                        name,
                                                        'subsections',
                                                        subsectionField.name,
                                                        'questions',
                                                        questionField.name,
                                                        'dependentQuestion',
                                                      ])
                                                  );

                                                  if (
                                                    getFieldValue([
                                                      'sections',
                                                      name,
                                                      'subsections',
                                                      subsectionField.name,
                                                      'questions',
                                                      questionField.name,
                                                      'dependentQuestion',
                                                    ]) &&
                                                    !qs
                                                      .map(
                                                        (qQuestion) =>
                                                          qQuestion?.question ||
                                                          ''
                                                      )
                                                      .includes(
                                                        getFieldValue([
                                                          'sections',
                                                          name,
                                                          'subsections',
                                                          subsectionField.name,
                                                          'questions',
                                                          questionField.name,
                                                          'dependentQuestion',
                                                        ]) ?? ''
                                                      )
                                                  )
                                                    setFieldValue(
                                                      [
                                                        'sections',
                                                        name,
                                                        'subsections',
                                                        subsectionField.name,
                                                        'questions',
                                                        questionField.name,
                                                        'dependentQuestion',
                                                      ],
                                                      null
                                                    );
                                                  return (
                                                    <Space>
                                                      <Row>
                                                        <Form.Item
                                                          label={intl.formatMessage(
                                                            {
                                                              defaultMessage:
                                                                'Dependent Question',
                                                            }
                                                          )}
                                                          name={[
                                                            questionField.name,
                                                            'dependentQuestion',
                                                          ]}
                                                          rules={[
                                                            {
                                                              required: true,
                                                            },
                                                          ]}
                                                          style={{
                                                            marginBottom: 0,
                                                          }}
                                                        >
                                                          <Select
                                                            onSelect={(value) =>
                                                              (selectedQ =
                                                                qs.find(
                                                                  (qQuestion) =>
                                                                    qQuestion?.question ===
                                                                    value
                                                                ))
                                                            }
                                                            options={qs
                                                              .map((qItem) => ({
                                                                label: `${
                                                                  qItem?.question ||
                                                                  ''
                                                                }`,
                                                                value:
                                                                  qItem?.question ||
                                                                  '',
                                                              }))
                                                              .filter(
                                                                ({ label }) =>
                                                                  label !== ''
                                                              )}
                                                            style={{
                                                              marginRight: 10,
                                                              width: 250,
                                                            }}
                                                          />
                                                        </Form.Item>

                                                        <Form.Item
                                                          label={intl.formatMessage(
                                                            {
                                                              defaultMessage:
                                                                'Dependent Answer',
                                                            }
                                                          )}
                                                          name={[
                                                            questionField.name,
                                                            'dependentAnswer',
                                                          ]}
                                                          rules={[
                                                            {
                                                              required: true,
                                                            },
                                                          ]}
                                                          style={{
                                                            marginBottom: 0,
                                                          }}
                                                        >
                                                          <Select
                                                            options={typeToAvail(
                                                              selectedQ?.type ||
                                                                'TEXT'
                                                            )}
                                                            style={{
                                                              marginRight: 10,
                                                              width: 250,
                                                            }}
                                                          />
                                                        </Form.Item>
                                                      </Row>
                                                    </Space>
                                                  );
                                                }}
                                              </Form.Item>
                                            </Col>
                                          </Row>
                                        </Card>
                                      )
                                    )}
                                    <Button
                                      block
                                      icon={<PlusOutlined />}
                                      onClick={() =>
                                        handleAddQuestion(
                                          sectionIndex,
                                          subsectionIndex
                                        )
                                      }
                                      type="dashed"
                                    >
                                      {intl.formatMessage({
                                        defaultMessage: 'Add Question',
                                      })}
                                    </Button>
                                    <Divider dashed />
                                  </>
                                )}
                              </Form.List>
                            </>
                          )
                        )}
                        <Button
                          block
                          icon={<PlusOutlined />}
                          onClick={() => handleAddSubsection(sectionIndex)}
                          type="dashed"
                        >
                          {intl.formatMessage({
                            defaultMessage: 'Add Subsection',
                          })}
                        </Button>
                      </>
                    )}
                  </Form.List>
                </Card>
              ))}
              <Card loading={loading}>
                <Button
                  block
                  icon={<PlusOutlined />}
                  onClick={handleAddSection}
                  type="dashed"
                >
                  {intl.formatMessage({
                    defaultMessage: 'Add Section',
                  })}
                </Button>
              </Card>
            </>
          )}
        </Form.List>

        <Row>
          <Col flex={1} />
          <Space>
            <Col>
              <Form.Item>
                <Button
                  loading={loading}
                  onClick={() => navigate('/app/checklists')}
                >
                  {id
                    ? intl.formatMessage({
                        defaultMessage: 'Cancel',
                      })
                    : intl.formatMessage({
                        defaultMessage: 'Back',
                      })}
                </Button>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item>
                <Button htmlType="submit" loading={loading} type="primary">
                  {id
                    ? intl.formatMessage({
                        defaultMessage: 'Save',
                      })
                    : intl.formatMessage({
                        defaultMessage: 'Submit',
                      })}
                </Button>
              </Form.Item>
            </Col>
          </Space>
        </Row>
      </Form>
    </div>
  );
};

export default CreateChecklistView;
