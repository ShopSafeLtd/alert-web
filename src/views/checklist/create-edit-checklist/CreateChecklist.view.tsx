import { PlusOutlined } from '@ant-design/icons';
import type { FormInstance } from 'antd';
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
import React from 'react';
import { useIntl } from 'react-intl';
import { useNavigate, useParams } from 'react-router';
import type { FormData, Section, SelectOption } from './useCreateChecklist';

interface Props {
  form: FormInstance<FormData>;
  onFinish: (data: FormData) => void;
  handleAddSection: () => void;
  handleRemoveSection: (index: number) => void;
  handleSectionChange: (
    changedValues: {
      sections: Section[];
    },
    allValues: {
      sections: Section[];
    }
  ) => void;
  handleAddSubsection: (index: number) => void;
  handleRemoveSubsection: (
    sectionIndex: number,
    subsectionIndex: number
  ) => void;
  handleAddQuestion: (sectionIndex: number, subSectionIndex: number) => void;
  handleRemoveQuestion: (
    sectionIndex: number,
    subsectionIndex: number,
    questionIndex: number
  ) => void;
  loading: boolean;
  businesses: SelectOption[];
  users: SelectOption[];
}
const indexToLetter = (num: number) => (num + 10).toString(36).toUpperCase();
const CreateChecklistView: React.FC<Props> = ({
  form,
  onFinish,
  handleAddSection,
  handleRemoveSection,
  handleSectionChange,
  handleAddSubsection,
  handleRemoveSubsection,
  handleAddQuestion,
  handleRemoveQuestion,
  loading,
  businesses,
  users,
}) => {
  const intl = useIntl();
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="page-view">
      <PageHeader
        onBack={() => navigate(`/app/checklists`)}
        title={
          id
            ? intl.formatMessage({
                defaultMessage: 'Edit Checklist',
                id: '2yq6iI',
              })
            : intl.formatMessage({
                defaultMessage: 'Create Checklist',
                id: 'aDpBb2',
              })
        }
      />
      <Form
        form={form}
        name="checklist_form"
        onFinish={onFinish}
        onValuesChange={handleSectionChange}
        autoComplete="off"
        layout="horizontal"
      >
        <Card loading={loading}>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label={intl.formatMessage({
                  id: 'F+9MHk',
                  defaultMessage: 'Checklist Title',
                })}
                name="title"
                rules={[
                  {
                    required: true,
                    message: intl.formatMessage({
                      id: 'K+LnZG',
                      defaultMessage: 'Missing title',
                    }),
                  },
                ]}
              >
                <Input
                  placeholder={intl.formatMessage({
                    id: '9a9+ww',
                    defaultMessage: 'Title',
                  })}
                />
              </Form.Item>
            </Col>
            <Col flex={1}>
              <Form.Item
                label={intl.formatMessage({
                  id: '1OyEjZ',
                  defaultMessage: 'Checklist Description',
                })}
                name="description"
              >
                <Input.TextArea
                  placeholder={intl.formatMessage({
                    id: 'Q8Qw5B',
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
                  id: 'YDMrKK',
                  defaultMessage: 'Users',
                })}
                name="userIds"
              >
                <Select
                  optionFilterProp="label"
                  showSearch
                  mode="multiple"
                  maxTagCount="responsive"
                  placeholder={intl.formatMessage({
                    id: 'YDMrKK',
                    defaultMessage: 'Users',
                  })}
                  options={users}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={intl.formatMessage({
                  id: 'D0tMhW',
                  defaultMessage: 'Businesses',
                })}
                name="businessIds"
              >
                <Select
                  optionFilterProp="label"
                  showSearch
                  mode="multiple"
                  maxTagCount="responsive"
                  placeholder={intl.formatMessage({
                    id: 'D0tMhW',
                    defaultMessage: 'Businesses',
                  })}
                  options={businesses}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Form.List name="sections">
          {(fields) => (
            <>
              {fields.map(({ name }, sectionIndex) => (
                <Card loading={loading}>
                  <Row>
                    <Space>
                      <Form.Item
                        label={intl.formatMessage({
                          id: 'q1Cd7m',
                          defaultMessage: 'Section',
                        })}
                        name={[name, 'order']}
                        rules={[
                          {
                            required: true,
                            message: intl.formatMessage({
                              id: 'zx0+xA',
                              defaultMessage: 'Missing order',
                            }),
                          },
                        ]}
                      >
                        <InputNumber
                          placeholder={intl.formatMessage({
                            id: 'XPruqs',
                            defaultMessage: 'Order',
                          })}
                          size="small"
                          min={1}
                          style={{ width: '55px' }}
                        />
                      </Form.Item>
                      <Form.Item
                        label={intl.formatMessage({
                          id: 'uHmtQN',
                          defaultMessage: 'Section Title',
                        })}
                        name={[name, 'title']}
                        rules={[{ required: true, message: 'Missing title' }]}
                      >
                        <Input
                          placeholder={intl.formatMessage({
                            id: '9a9+ww',
                            defaultMessage: 'Title',
                          })}
                          style={{ width: 600 }}
                        />
                      </Form.Item>
                    </Space>
                    <Col flex={1} />
                    <Form.Item>
                      <Button
                        type="primary"
                        onClick={() => handleRemoveSection(sectionIndex)}
                      >
                        {intl.formatMessage({
                          id: '+3zeQW',
                          defaultMessage: 'Delete Section',
                        })}
                      </Button>
                    </Form.Item>
                  </Row>
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
                                        id: '2ywqay',
                                        defaultMessage: 'Subsection: {value}',
                                      },
                                      {
                                        value: subsectionIndex + 1,
                                      }
                                    )}
                                    name={[subsectionField.name, 'order']}
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Missing order',
                                      },
                                    ]}
                                  >
                                    <InputNumber
                                      placeholder={intl.formatMessage({
                                        id: 'uY1hPI',
                                        defaultMessage: 'Subsection Order',
                                      })}
                                      size="small"
                                      min={1}
                                      style={{ width: '55px' }}
                                    />
                                  </Form.Item>
                                  <Form.Item
                                    label={intl.formatMessage({
                                      id: 'TSyRmY',
                                      defaultMessage: 'Subsection title',
                                    })}
                                    name={[subsectionField.name, 'title']}
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Missing title',
                                      },
                                    ]}
                                  >
                                    <Input
                                      placeholder={intl.formatMessage({
                                        id: 'fB20Jz',
                                        defaultMessage: 'Subsection Title',
                                      })}
                                      style={{ width: 600 }}
                                    />
                                  </Form.Item>
                                </Space>
                                <Col flex={1} />
                                <Form.Item>
                                  <Button
                                    size="small"
                                    onClick={() =>
                                      handleRemoveSubsection(
                                        sectionIndex,
                                        subsectionIndex
                                      )
                                    }
                                  >
                                    {intl.formatMessage({
                                      id: 'tF4nnC',
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
                                        <Card loading={loading}>
                                          <Row key={questionField.key}>
                                            <Col span={2} />
                                            <Col span={20}>
                                              <Space size="large">
                                                {/* Questions fields */}
                                                <Form.Item
                                                  label={intl.formatMessage(
                                                    {
                                                      id: 'G/p6Ga',
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
                                                      required: true,
                                                      message: 'Missing order',
                                                    },
                                                  ]}
                                                >
                                                  <InputNumber
                                                    placeholder={intl.formatMessage(
                                                      {
                                                        id: 'g6pvMr',
                                                        defaultMessage:
                                                          'Question Order',
                                                      }
                                                    )}
                                                    size="small"
                                                    min={1}
                                                    style={{ width: '55px' }}
                                                  />
                                                </Form.Item>
                                                <Form.Item
                                                  label={intl.formatMessage({
                                                    id: 'kgOBET',
                                                    defaultMessage: 'Question',
                                                  })}
                                                  name={[
                                                    questionField.name,
                                                    'title',
                                                  ]}
                                                  rules={[
                                                    {
                                                      required: true,
                                                      message:
                                                        'Missing question',
                                                    },
                                                  ]}
                                                >
                                                  <Input.TextArea
                                                    style={{ width: 600 }}
                                                    placeholder={intl.formatMessage(
                                                      {
                                                        id: 'kgOBET',
                                                        defaultMessage:
                                                          'Question',
                                                      }
                                                    )}
                                                    autoSize
                                                  />
                                                </Form.Item>
                                              </Space>
                                            </Col>
                                            <Col span={2}>
                                              <Form.Item>
                                                <Button
                                                  size="small"
                                                  onClick={() =>
                                                    handleRemoveQuestion(
                                                      sectionIndex,
                                                      subsectionIndex,
                                                      questionIndex
                                                    )
                                                  }
                                                >
                                                  {intl.formatMessage({
                                                    id: 'hdAZpB',
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
                                                    id: '+U6ozc',
                                                    defaultMessage: 'Type',
                                                  })}
                                                  name={[
                                                    questionField.name,
                                                    'type',
                                                  ]}
                                                  rules={[
                                                    {
                                                      required: true,
                                                      message:
                                                        'Missing question type',
                                                    },
                                                  ]}
                                                >
                                                  <Radio.Group
                                                    options={[
                                                      {
                                                        label:
                                                          intl.formatMessage({
                                                            id: 'AUmBVv',
                                                            defaultMessage:
                                                              'Pass/Fail',
                                                          }),
                                                        value: 'PASS_FAIL',
                                                      },
                                                      {
                                                        label:
                                                          intl.formatMessage({
                                                            id: 'KgcF6B',
                                                            defaultMessage:
                                                              'Yes/No',
                                                          }),
                                                        value: 'YES_NO',
                                                      },
                                                      {
                                                        label:
                                                          intl.formatMessage({
                                                            id: 'u2Ejz4',
                                                            defaultMessage:
                                                              'Good/Bad',
                                                          }),
                                                        value: 'GOOD_BAD',
                                                      },
                                                      {
                                                        label:
                                                          intl.formatMessage({
                                                            id: 'aA8bDw',
                                                            defaultMessage:
                                                              'Text',
                                                          }),
                                                        value: 'TEXT',
                                                      },
                                                    ]}
                                                    optionType="button"
                                                    buttonStyle="solid"
                                                  />
                                                </Form.Item>
                                                <Form.Item
                                                  label={intl.formatMessage({
                                                    id: 'tHTw4s',
                                                    defaultMessage: 'Weighted',
                                                  })}
                                                  name={[
                                                    questionField.name,
                                                    'weighted',
                                                  ]}
                                                  rules={[
                                                    {
                                                      required: true,
                                                      message:
                                                        'Missing question type',
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
                                                          case 'PASS_FAIL': {
                                                            return (
                                                              <Space>
                                                                <Row>
                                                                  <Form.Item
                                                                    name={[
                                                                      questionField.name,
                                                                      'passWeight',
                                                                    ]}
                                                                    label={intl.formatMessage(
                                                                      {
                                                                        id: 'TK3Mb0',
                                                                        defaultMessage:
                                                                          'Pass Weight',
                                                                      }
                                                                    )}
                                                                    rules={[
                                                                      {
                                                                        required:
                                                                          true,
                                                                      },
                                                                    ]}
                                                                    initialValue={
                                                                      5
                                                                    }
                                                                    style={{
                                                                      marginBottom: 0,
                                                                    }}
                                                                  >
                                                                    <InputNumber
                                                                      placeholder={intl.formatMessage(
                                                                        {
                                                                          id: 'TK3Mb0',
                                                                          defaultMessage:
                                                                            'Pass Weight',
                                                                        }
                                                                      )}
                                                                      size="small"
                                                                      min={0}
                                                                      style={{
                                                                        width:
                                                                          '100px',
                                                                      }}
                                                                    />
                                                                  </Form.Item>

                                                                  <Form.Item
                                                                    name={[
                                                                      questionField.name,
                                                                      'failWeight',
                                                                    ]}
                                                                    label={intl.formatMessage(
                                                                      {
                                                                        id: 'n5Pq9/',
                                                                        defaultMessage:
                                                                          'Fail Weight',
                                                                      }
                                                                    )}
                                                                    initialValue={
                                                                      0
                                                                    }
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
                                                                      placeholder={intl.formatMessage(
                                                                        {
                                                                          id: 'n5Pq9/',
                                                                          defaultMessage:
                                                                            'Fail Weight',
                                                                        }
                                                                      )}
                                                                      size="small"
                                                                      min={0}
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
                                                          case 'YES_NO': {
                                                            return (
                                                              <Space>
                                                                <Row>
                                                                  <Form.Item
                                                                    name={[
                                                                      questionField.name,
                                                                      'passWeight',
                                                                    ]}
                                                                    label={intl.formatMessage(
                                                                      {
                                                                        id: 'JI4CP3',
                                                                        defaultMessage:
                                                                          'Yes Weight',
                                                                      }
                                                                    )}
                                                                    initialValue={
                                                                      5
                                                                    }
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
                                                                      placeholder={intl.formatMessage(
                                                                        {
                                                                          id: 'JI4CP3',
                                                                          defaultMessage:
                                                                            'Yes Weight',
                                                                        }
                                                                      )}
                                                                      size="small"
                                                                      min={0}
                                                                      style={{
                                                                        width:
                                                                          '100px',
                                                                      }}
                                                                    />
                                                                  </Form.Item>

                                                                  <Form.Item
                                                                    name={[
                                                                      questionField.name,
                                                                      'failWeight',
                                                                    ]}
                                                                    label={intl.formatMessage(
                                                                      {
                                                                        id: 'PwFJqP',
                                                                        defaultMessage:
                                                                          'No Weight',
                                                                      }
                                                                    )}
                                                                    initialValue={
                                                                      0
                                                                    }
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
                                                                      placeholder={intl.formatMessage(
                                                                        {
                                                                          id: 'PwFJqP',
                                                                          defaultMessage:
                                                                            'No Weight',
                                                                        }
                                                                      )}
                                                                      size="small"
                                                                      min={0}
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

                                                          case 'GOOD_BAD': {
                                                            return (
                                                              <Space>
                                                                <Row>
                                                                  <Form.Item
                                                                    name={[
                                                                      questionField.name,
                                                                      'passWeight',
                                                                    ]}
                                                                    label={intl.formatMessage(
                                                                      {
                                                                        id: 'yW3z+F',
                                                                        defaultMessage:
                                                                          'Good Weight',
                                                                      }
                                                                    )}
                                                                    initialValue={
                                                                      5
                                                                    }
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
                                                                      placeholder={intl.formatMessage(
                                                                        {
                                                                          id: 'yW3z+F',
                                                                          defaultMessage:
                                                                            'Good Weight',
                                                                        }
                                                                      )}
                                                                      size="small"
                                                                      min={0}
                                                                      style={{
                                                                        width:
                                                                          '100px',
                                                                      }}
                                                                    />
                                                                  </Form.Item>

                                                                  <Form.Item
                                                                    name={[
                                                                      questionField.name,
                                                                      'failWeight',
                                                                    ]}
                                                                    initialValue={
                                                                      0
                                                                    }
                                                                    label={intl.formatMessage(
                                                                      {
                                                                        id: '/fJf+L',
                                                                        defaultMessage:
                                                                          'Bad Weight',
                                                                      }
                                                                    )}
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
                                                                      placeholder={intl.formatMessage(
                                                                        {
                                                                          id: '/fJf+L',
                                                                          defaultMessage:
                                                                            'Bad Weight',
                                                                        }
                                                                      )}
                                                                      size="small"
                                                                      min={0}
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
                                                                    name={[
                                                                      questionField.name,
                                                                      'passWeight',
                                                                    ]}
                                                                    initialValue={
                                                                      5
                                                                    }
                                                                    label={intl.formatMessage(
                                                                      {
                                                                        id: 'nSHZnm',
                                                                        defaultMessage:
                                                                          'Text Weight',
                                                                      }
                                                                    )}
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
                                                                      placeholder={intl.formatMessage(
                                                                        {
                                                                          id: 'nSHZnm',
                                                                          defaultMessage:
                                                                            'Text Weight',
                                                                        }
                                                                      )}
                                                                      size="small"
                                                                      min={0}
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
                                          </Row>
                                        </Card>
                                      )
                                    )}
                                    <Button
                                      type="dashed"
                                      onClick={() =>
                                        handleAddQuestion(
                                          sectionIndex,
                                          subsectionIndex
                                        )
                                      }
                                      block
                                      icon={<PlusOutlined />}
                                    >
                                      {intl.formatMessage({
                                        id: '7nSzTq',
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
                          type="dashed"
                          onClick={() => handleAddSubsection(sectionIndex)}
                          block
                          icon={<PlusOutlined />}
                        >
                          {intl.formatMessage({
                            id: 'yvByKt',
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
                  type="dashed"
                  onClick={handleAddSection}
                  block
                  icon={<PlusOutlined />}
                >
                  {intl.formatMessage({
                    id: 'ckO4/Z',
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
                  onClick={() => navigate(`/app/checklists`)}
                >
                  {id
                    ? intl.formatMessage({
                        id: '47FYwb',
                        defaultMessage: 'Cancel',
                      })
                    : intl.formatMessage({
                        id: 'cyR7Kh',
                        defaultMessage: 'Back',
                      })}
                </Button>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item>
                <Button loading={loading} type="primary" htmlType="submit">
                  {id
                    ? intl.formatMessage({
                        id: 'jvo0vs',
                        defaultMessage: 'Save',
                      })
                    : intl.formatMessage({
                        id: 'wSZR47',
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
