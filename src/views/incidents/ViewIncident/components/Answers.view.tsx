import type { ViewIncidentQuery } from '#/views/incidents/ViewIncident/__generated__/view-incident.generated';

import DatePicker from '#/components/util-components/DatePicker';
import formatAnswer from '#/utils/format-answer';
import { EditOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Table,
  Typography,
  notification,
} from 'antd';
import dayjs from 'dayjs';
import { useUpdateIncidentMutation } from 'graphql/incidents/mutations/__generated__/update-incident.generated';
import { AnswerType } from 'graphql/types';
import React, { useEffect, useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

const { Title } = Typography;

interface Props {
  data: ViewIncidentQuery | undefined;
  editRights?: boolean;
  incidentId: string;
  isPrinting?: boolean;
  loading: boolean;
}

const Answers = ({
  data,
  editRights,
  incidentId,
  isPrinting,
  loading,
}: Props) => {
  const intl = useIntl();

  const [pageSize, setPageSize] = useState(10);
  const [editMode, setEditMode] = useState(false);
  const [editedAnswers, setEditedAnswers] = useState<Record<string, string>>(
    {}
  );
  const [saving, setSaving] = useState(false);

  const [updateIncident] = useUpdateIncidentMutation();

  useEffect(() => {
    setPageSize((p) => (isPrinting ? 10_000 : p === 10 ? 10_000 : 10));
  }, [isPrinting]);

  useEffect(() => {
    // Initialize edited answers when entering edit mode
    if (editMode && data?.incident?.answers) {
      const initialAnswers: Record<string, string> = {};
      for (const answer of data.incident.answers) {
        initialAnswers[answer.id] = answer.answer;
      }
      setEditedAnswers(initialAnswers);
    }
  }, [editMode, data]);

  const togglePageSize = () => {
    setPageSize(pageSize === 10 ? 10_000 : 10);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
    setEditedAnswers({});
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Only update answers that have actually changed
      const changedAnswers = Object.entries(editedAnswers)
        .filter(([id, newAnswer]) => {
          const originalAnswer = data?.incident.answers.find(
            (a) => a.id === id
          );
          return originalAnswer && originalAnswer.answer !== newAnswer;
        })
        .map(([id, answer]) => ({
          data: { answer },
          where: { id },
        }));

      if (changedAnswers.length === 0) {
        notification.info({
          description: intl.formatMessage({
            defaultMessage: 'No changes to save.',
          }),
          message: intl.formatMessage({
            defaultMessage: 'Info',
          }),
        });
        setEditMode(false);
        return;
      }

      const mutationVariables = {
        data: {
          answers: {
            update: changedAnswers,
          },
        },
        where: { id: incidentId },
      };

      console.log(
        'Mutation variables:',
        JSON.stringify(mutationVariables, null, 2)
      );

      await updateIncident({
        variables: mutationVariables,
      });

      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'Answers have been updated successfully.',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Success',
        }),
      });

      setEditMode(false);
    } catch (error) {
      console.error('Error updating answers:', error);
      notification.error({
        description: intl.formatMessage({
          defaultMessage: 'Failed to update answers. Please try again.',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Error',
        }),
      });
    } finally {
      setSaving(false);
    }
  };

  const handleAnswerChange = (answerId: string, value: string) => {
    setEditedAnswers((prev) => ({
      ...prev,
      [answerId]: value,
    }));
  };

  interface AnswerData {
    answer: string;
    formattedAnswer: React.ReactNode;
    id: string;
    key: string;
    question: string;
    tagQuestion?: {
      question?: {
        options?: unknown[];
        optionsFormatted?: string[];
        question?: string;
      };
    };
    type: AnswerType;
  }

  const renderEditableInput = (answer: AnswerData) => {
    const value = editedAnswers[answer.id] ?? answer.answer;

    switch (answer.type) {
      case AnswerType.Boolean: {
        return (
          <Radio.Group
            disabled={saving}
            onChange={(e) =>
              handleAnswerChange(answer.id, String(e.target.value))
            }
            value={value}
          >
            <Radio value="true">
              <FormattedMessage defaultMessage="Yes" />
            </Radio>
            <Radio value="false">
              <FormattedMessage defaultMessage="No" />
            </Radio>
          </Radio.Group>
        );
      }

      case AnswerType.Date: {
        return (
          <DatePicker
            disabled={saving}
            format="DD/MM/YYYY"
            onChange={(date) =>
              handleAnswerChange(
                answer.id,
                date ? dayjs(date).format('YYYY-MM-DD') : ''
              )
            }
            style={{ width: '100%' }}
            value={value ? new Date(value) : undefined}
          />
        );
      }

      case AnswerType.Number: {
        return (
          <InputNumber
            disabled={saving}
            onChange={(val) =>
              handleAnswerChange(answer.id, val?.toString() || '')
            }
            style={{ width: '100%' }}
            value={value ? Number(value) : undefined}
          />
        );
      }

      case AnswerType.Select:
      case AnswerType.SelectSingle: {
        // Try to get formatted options first, fall back to raw options
        const formattedOptions =
          answer.tagQuestion?.question?.optionsFormatted || [];
        const rawOptions = answer.tagQuestion?.question?.options || [];

        // Use formatted options if available, otherwise try to parse raw options
        let options: Array<{ label: string; value: string }> = [];

        if (formattedOptions.length > 0) {
          // Use the formatted options - these should be an array of strings
          options = formattedOptions.map((opt: string) => ({
            label: opt,
            value: opt,
          }));
        } else if (Array.isArray(rawOptions) && rawOptions.length > 0) {
          // Fall back to parsing raw options
          const [firstElement] = rawOptions;
          if (firstElement && typeof firstElement === 'object') {
            // Get the first value from the object
            const values = Object.values(firstElement);
            if (values.length > 0 && typeof values[0] === 'string') {
              // Split the comma-separated string into individual options
              options = values[0].split(',').map((opt: string) => {
                const trimmed = opt.trim();
                return { label: trimmed, value: trimmed };
              });
            }
          } else if (typeof firstElement === 'string') {
            // Direct string value
            options = firstElement.split(',').map((opt: string) => {
              const trimmed = opt.trim();
              return { label: trimmed, value: trimmed };
            });
          }
        }

        const isMultiple = answer.type === AnswerType.Select;
        const currentValue =
          isMultiple && value ? value.split(',').filter(Boolean) : value;

        return (
          <Select
            disabled={saving}
            mode={isMultiple ? 'multiple' : undefined}
            onChange={(val) =>
              handleAnswerChange(
                answer.id,
                Array.isArray(val) ? val.join(',') : val
              )
            }
            placeholder={intl.formatMessage({
              defaultMessage: 'Select an option',
            })}
            style={{ width: '100%' }}
            value={currentValue}
          >
            {options.map((option) => (
              <Select.Option key={option.value} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        );
      }

      case AnswerType.Time: {
        return (
          <Input
            disabled={saving}
            onChange={(e) => handleAnswerChange(answer.id, e.target.value)}
            placeholder={intl.formatMessage({ defaultMessage: 'HH:mm' })}
            value={value}
          />
        );
      }

      default: {
        return (
          <Input
            disabled={saving}
            onChange={(e) => handleAnswerChange(answer.id, e.target.value)}
            value={value}
          />
        );
      }
    }
  };

  const dataSource = useMemo(
    () =>
      data?.incident.answers
        .map((answer) => ({
          ...answer,
          dependentQuestions: answer.tagQuestion?.dependentQuestions,
        }))
        .filter((answer) => {
          if (
            answer.dependentQuestions &&
            answer.dependentQuestions.length > 0
          ) {
            const parent = data.incident.answers.find(
              (item) =>
                answer.dependentQuestions &&
                item.tagQuestion?.id ===
                  answer.dependentQuestions[0]?.tagQuestionId
            );

            return parent?.answer.toLowerCase() === answer.answer.toLowerCase();
          }

          return true;
        })
        .map((answer) => ({
          answer: answer.answer,
          formattedAnswer: formatAnswer(answer.answer, answer.type),
          id: answer.id,
          key: answer.id,
          question: answer.tagQuestion?.question?.question || '',
          tagQuestion: answer.tagQuestion,
          type: answer.type,
        })),
    [data]
  );

  return data?.incident && data.incident.answers.length > 0 ? (
    <Card loading={loading}>
      <Row align="middle" justify="space-between" style={{ marginBottom: 16 }}>
        <Col>
          <Title level={4} style={{ margin: 0 }}>
            {intl.formatMessage({
              defaultMessage: 'Incident Details',
            })}
          </Title>
        </Col>
        {editRights && !isPrinting && !editMode && (
          <Col>
            <Button
              icon={<EditOutlined style={{ marginRight: 4 }} />}
              onClick={handleEdit}
            >
              <FormattedMessage defaultMessage="Edit" />
            </Button>
          </Col>
        )}
      </Row>
      <Table
        columns={[
          {
            dataIndex: 'question',
            filterSearch: (input, item) =>
              item.value.toString().includes(input),
            filters: dataSource?.map((answer) => ({
              text: answer.question ?? '',
              value: answer.question ?? '',
            })),
            key: 'question',
            onFilter: (value, record) => record.question === value,
            title: intl.formatMessage({ defaultMessage: 'Question' }),
          },
          {
            dataIndex: 'answer',
            key: 'answer',
            render: (_, record) => {
              if (editMode) {
                return renderEditableInput(record);
              }
              return record.formattedAnswer;
            },
            title: intl.formatMessage({ defaultMessage: 'Answer' }),
          },
        ]}
        dataSource={dataSource}
        pagination={{
          pageSize,
          style: {
            display: 'none',
          },
        }}
        size="small"
      />
      {editMode ? (
        <Row gutter={16} justify="center" style={{ marginTop: 20 }}>
          <Col>
            <Button disabled={saving} onClick={handleCancel}>
              <FormattedMessage defaultMessage="Cancel" />
            </Button>
          </Col>
          <Col>
            <Button
              loading={saving}
              onClick={() => {
                void handleSave();
              }}
              type="primary"
            >
              <FormattedMessage defaultMessage="Save" />
            </Button>
          </Col>
        </Row>
      ) : (
        dataSource &&
        dataSource.length > 10 && (
          <Row justify="center" style={{ marginTop: 20 }}>
            <Col>
              <Button onClick={togglePageSize} size="small">
                {pageSize === 10 ? (
                  <FormattedMessage
                    defaultMessage="Show All {value1} Answers"
                    values={{ value1: dataSource?.length }}
                  />
                ) : (
                  <FormattedMessage defaultMessage="Show Less" />
                )}
              </Button>
            </Col>
          </Row>
        )
      )}
    </Card>
  ) : (
    <div />
  );
};

export default Answers;
