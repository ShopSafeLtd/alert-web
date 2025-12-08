import type { ViewIncidentQuery } from '#/views/incidents/ViewIncident/__generated__/view-incident.generated';
import type { UpdateIncidentMutationVariables } from 'graphql/incidents/mutations/__generated__/update-incident.generated';

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
  Tooltip,
  Typography,
  notification,
} from 'antd';
import dayjs from 'dayjs';
import { useUpdateIncidentMutation } from 'graphql/incidents/mutations/__generated__/update-incident.generated';
import { useListIncidentTagsQuery } from 'graphql/tags/queries/__generated__/list-incident-tags.generated';
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

  // Fetch custom questions for the current incident types
  const { data: incidentTagsData } = useListIncidentTagsQuery({
    skip: !data?.incident?.scheme?.id,
    variables: {
      where: {
        schemeId: data?.incident?.scheme?.id || '',
      },
    },
  });

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
      if (!dataSource) {
        return;
      }

      // Separate updates and creates
      const updates: Array<{
        data: { answer: string };
        where: { id: string };
      }> = [];
      const creates: Array<{
        answer: string;
        tagQuestionId: string;
        type: AnswerType;
      }> = [];

      for (const question of dataSource) {
        // Skip disabled questions
        if (question.isDisabled) {
          continue;
        }

        const newAnswer = editedAnswers[question.id] ?? question.answer;

        if (question.isUnanswered) {
          // New answer - create it if there's a value
          if (newAnswer && newAnswer.trim() !== '' && question.tagQuestionId) {
            creates.push({
              answer: newAnswer,
              tagQuestionId: question.tagQuestionId,
              type: question.type,
            });
          }
        } else {
          // Existing answer - update if changed
          const originalAnswer = data?.incident.answers.find(
            (a) => a.id === question.id
          );
          if (originalAnswer && originalAnswer.answer !== newAnswer) {
            updates.push({
              data: { answer: newAnswer },
              where: { id: question.id },
            });
          }
        }
      }

      if (updates.length === 0 && creates.length === 0) {
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

      const mutationVariables: UpdateIncidentMutationVariables = {
        data: {
          answers: {
            ...(creates.length > 0 && { create: creates }),
            ...(updates.length > 0 && { update: updates }),
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
    disabledReason?: string;
    formattedAnswer: React.ReactNode;
    id: string;
    isDisabled?: boolean;
    isUnanswered?: boolean;
    key: string;
    question: string;
    tagQuestion?: {
      question?: {
        options?: unknown[];
        optionsFormatted?: string[];
        question?: string;
      };
    };
    tagQuestionId?: string;
    type: AnswerType;
  }

  const renderEditableInput = (answer: AnswerData) => {
    const value = editedAnswers[answer.id] ?? answer.answer;
    const isDisabled = saving || answer.isDisabled;

    const input = (() => {
      switch (answer.type) {
        case AnswerType.Boolean: {
          return (
            <Radio.Group
              disabled={isDisabled}
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
              disabled={isDisabled}
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
              disabled={isDisabled}
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
          const currentValue = (() => {
            if (!value || value === '') {
              return isMultiple ? [] : undefined;
            }
            return isMultiple ? value.split(',').filter(Boolean) : value;
          })();

          return (
            <Select
              disabled={isDisabled}
              mode={isMultiple ? 'multiple' : undefined}
              onChange={(val) =>
                handleAnswerChange(
                  answer.id,
                  Array.isArray(val) ? val.filter(Boolean).join(',') : val || ''
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
              disabled={isDisabled}
              onChange={(e) => handleAnswerChange(answer.id, e.target.value)}
              placeholder={intl.formatMessage({ defaultMessage: 'HH:mm' })}
              value={value}
            />
          );
        }

        default: {
          return (
            <Input
              disabled={isDisabled}
              onChange={(e) => handleAnswerChange(answer.id, e.target.value)}
              value={value}
            />
          );
        }
      }
    })();

    // Wrap in tooltip if disabled due to missing tag
    if (answer.isDisabled && answer.disabledReason) {
      return <Tooltip title={answer.disabledReason}>{input}</Tooltip>;
    }

    return input;
  };

  const dataSource = useMemo(() => {
    if (!data?.incident || !incidentTagsData?.listIncidentTags) {
      return undefined;
    }

    interface MergedQuestion {
      answer: string;
      answerRecordId?: string;
      dependentMode: null | string;
      dependentOnAnswerValue: null | string;
      dependentOnAnswerValueArray: string[];
      dependentOnBrandIds: string[];
      dependentOnQuestionId: null | string;
      dependentOnTagIds: string[];
      disabledReason?: string;
      isDisabled?: boolean;
      isUnanswered: boolean;
      options: Array<{
        __typename?: 'AnswerOption';
        label: string;
        value: string;
      }>;
      priority: number;
      question: string;
      tagQuestion: (typeof data.incident.answers)[0]['tagQuestion'];
      tagQuestionId: string;
      type: AnswerType;
    }

    const { incident } = data;
    const businessId = incident.business?.id;
    const involvedTagIds = incident.involvedTags?.map((tag) => tag.id) || [];
    const crimeTypeIds = incident.crimeTypes?.map((ct) => ct.id) || [];

    // Get all questions from the current incident types
    const allQuestionsFromTypes = incidentTagsData.listIncidentTags
      .filter((tag) => crimeTypeIds.includes(tag.value))
      .flatMap((tag) => tag.questions || []);

    // Create a map of existing answers by tagQuestionId
    const existingAnswersMap = new Map(
      incident.answers.map((answer) => [answer.tagQuestion?.id || '', answer])
    );

    // Merge questions with existing answers
    const mergedQuestions: MergedQuestion[] = allQuestionsFromTypes.map(
      (question) => {
        const existingAnswer = existingAnswersMap.get(question.tagQuestionId);
        return {
          answer: existingAnswer?.answer || '',
          answerRecordId: existingAnswer?.id,
          dependentMode: question.dependentMode || null,
          dependentOnAnswerValue: question.dependentOnAnswerValue || null,
          dependentOnAnswerValueArray:
            question.dependentOnAnswerValueArray || [],
          // Store question metadata for filtering
          dependentOnBrandIds: question.dependentOnBrandIds || [],
          dependentOnQuestionId: question.dependentOnQuestionId || null,
          dependentOnTagIds: question.dependentOnTagIds || [],
          isUnanswered: !existingAnswer,
          options: question.options || [],
          priority: question.priority,
          question: question.label,
          tagQuestion: existingAnswer?.tagQuestion,
          tagQuestionId: question.tagQuestionId,
          type: question.answerType,
        };
      }
    );

    // Filter by brand dependencies
    const filteredByBrand = mergedQuestions.filter((q) => {
      if (q.dependentOnBrandIds.length > 0) {
        // If question depends on brands, check if incident business matches
        return q.dependentOnBrandIds.includes(businessId || '');
      }
      return true;
    });

    // Filter by tag dependencies and mark as disabled if missing
    const filteredByTagsWithDisabled: MergedQuestion[] = filteredByBrand.map(
      (q) => {
        if (q.dependentOnTagIds.length > 0) {
          const hasRequiredTag = q.dependentOnTagIds.some((tagId) =>
            involvedTagIds.includes(tagId)
          );

          if (!hasRequiredTag) {
            // Find the tag name for the disabled reason
            const requiredTagNames = q.dependentOnTagIds
              .map((tagId) => {
                const tag = incident.involvedTags?.find((t) => t.id === tagId);
                return tag?.name;
              })
              .filter(Boolean);

            return {
              ...q,
              disabledReason: `Requires tag: ${requiredTagNames.join(' or ')}`,
              isDisabled: true,
            };
          }
        }
        return q;
      }
    );

    // Filter by question dependencies (question-to-question)
    const filteredByQuestions = filteredByTagsWithDisabled.filter((q) => {
      if (q.dependentOnQuestionId) {
        // Find the parent question in our merged list
        const parentQuestion = filteredByTagsWithDisabled.find(
          (pq) => pq.tagQuestionId === q.dependentOnQuestionId
        );

        if (!parentQuestion || !parentQuestion.answer) {
          return false; // Hide if parent doesn't exist or has no answer
        }

        // Check if parent answer matches expected value
        const expectedAnswer = q.dependentOnAnswerValue;
        const expectedAnswers = q.dependentOnAnswerValueArray;

        if (expectedAnswer || expectedAnswers.length > 0) {
          const parentAnswerLower = parentQuestion.answer.toLowerCase();

          // Handle multiple acceptable answers
          if (expectedAnswers.length > 0) {
            const acceptableAnswers = expectedAnswers.map((a) =>
              a.toLowerCase()
            );
            return acceptableAnswers.includes(parentAnswerLower);
          }

          // Handle '|||' separated answers
          if (expectedAnswer && expectedAnswer.includes('|||')) {
            const acceptableAnswers = expectedAnswer
              .split('|||')
              .map((a) => a.toLowerCase());
            return acceptableAnswers.includes(parentAnswerLower);
          }

          // Single expected answer
          if (expectedAnswer) {
            return parentAnswerLower === expectedAnswer.toLowerCase();
          }
        }
      }
      return true;
    });

    // Sort by priority (descending, like the original query)
    const sorted = [...filteredByQuestions].sort((a, b) => {
      const aPriority = a.priority || 0;
      const bPriority = b.priority || 0;
      return bPriority - aPriority;
    });

    // Map to AnswerData format
    return sorted.map((q) => ({
      answer: q.answer,
      disabledReason: q.disabledReason,
      formattedAnswer: formatAnswer(q.answer, q.type),
      id: q.answerRecordId || `temp-${q.tagQuestionId}`,
      isDisabled: q.isDisabled,
      isUnanswered: q.isUnanswered,
      key: q.answerRecordId || `temp-${q.tagQuestionId}`,
      question: q.question,
      tagQuestion: {
        question: {
          options: q.options,
          optionsFormatted: q.options.map((opt) => opt.label),
          question: q.question,
        },
      },
      tagQuestionId: q.tagQuestionId,
      type: q.type,
    })) as AnswerData[];
  }, [data, incidentTagsData]);

  return data?.incident && dataSource && dataSource.length > 0 ? (
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
            render: (text: string, record) => {
              if (record.isDisabled) {
                return (
                  <Tooltip title={record.disabledReason}>
                    <span style={{ color: '#999' }}>{text}</span>
                  </Tooltip>
                );
              }
              return text;
            },
            title: intl.formatMessage({ defaultMessage: 'Question' }),
          },
          {
            dataIndex: 'answer',
            key: 'answer',
            render: (_, record) => {
              if (editMode) {
                return renderEditableInput(record);
              }
              if (record.isDisabled) {
                const emDash = '\u2014'; // Em dash character
                return (
                  <span style={{ color: '#999', fontStyle: 'italic' }}>
                    {record.formattedAnswer || emDash}
                  </span>
                );
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
        rowClassName={(record) =>
          record.isDisabled ? 'disabled-question-row' : ''
        }
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
