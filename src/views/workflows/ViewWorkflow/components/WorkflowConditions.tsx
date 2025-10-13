import type { Theme } from '#/configs/ThemeConfig';
import type { WorkflowProps } from '#/views/workflows/ViewWorkflow/Workflow.view';

import { Card, Form, Radio, Typography } from 'antd';
import { Model } from 'graphql/types';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';

import ChecklistConditions from './ChecklistConditions';
import IncidentConditions from './IncidentConditions';
import OffenderConditions from './OffenderConditions';
import TodoConditions from './TodoConditions';

const useStyles = createUseStyles((theme: Theme) => ({
  cardBody: {
    backgroundColor: theme.cardSubsectionBackground,
    borderTop: `1px solid ${theme.borderColor}`,
    padding: 20,
  },
}));

type PickedProps = Pick<
  WorkflowProps,
  | 'availableQuestions'
  | 'brands'
  | 'brandsLoading'
  | 'brandsSelected'
  | 'checklistOption'
  | 'countries'
  | 'countriesSelected'
  | 'descriptionCheck'
  | 'divisions'
  | 'divisionsLoading'
  | 'divisionsSelected'
  | 'form'
  | 'goods'
  | 'goodsTypeCheck'
  | 'groups'
  | 'groupsSelected'
  | 'incidentTimeCountCheck'
  | 'lessThanSelected'
  | 'loading'
  | 'lossValueSelected'
  | 'modelSelected'
  | 'prefix'
  | 'prioritySelected'
  | 'questions'
  | 'questionsSelected'
  | 'schemeId'
  | 'selectedQuestions'
  | 'setActivityTemplateForm'
  | 'setAvailableQuestions'
  | 'setNewQuestion'
  | 'setSelectedActivity'
  | 'setSelectedQuestions'
  | 'tags'
  | 'tagsSelected'
  | 'taskQuestions'
  | 'typeWatch'
  | 'valueSelected'
>;

const WorkflowConditions: React.FC<PickedProps> = ({
  modelSelected,
  ...props
}) => {
  const classes = useStyles();
  const intl = useIntl();

  if (!modelSelected) return null;

  return (
    <Card bodyStyle={{ padding: 0 }}>
      <div style={{ padding: 20 }}>
        <Typography.Title level={3} style={{ marginBottom: 2 }}>
          <FormattedMessage defaultMessage="Conditions" />
        </Typography.Title>
        <Typography.Paragraph style={{ marginBottom: 20 }}>
          <FormattedMessage defaultMessage="Use workflow conditions to trigger the workflow only when certain conditions are met." />
          <br />
          {modelSelected === Model.Checklist && (
            <FormattedMessage defaultMessage="If no conditions selected, workflow will trigger on checklist completion" />
          )}
        </Typography.Paragraph>
        <Form.Item
          label={
            <FormattedMessage defaultMessage="If any or all the selected checks are present for the outcome to happen" />
          }
          name="option"
          rules={[
            {
              message: intl.formatMessage({
                defaultMessage: 'Please select an option',
              }),
              required: modelSelected !== Model.Checklist,
            },
          ]}
        >
          <Radio.Group
            optionType="button"
            options={[
              {
                label: intl.formatMessage({
                  defaultMessage: 'Any',
                }),
                value: 'any',
              },
              {
                label: intl.formatMessage({
                  defaultMessage: 'All',
                }),
                value: 'all',
              },
            ]}
          />
        </Form.Item>
      </div>

      {modelSelected === Model.Checklist && (
        <ChecklistConditions
          checklistOption={props.checklistOption}
          classes={classes}
          loading={props.loading}
        />
      )}

      {modelSelected === Model.Incident && (
        <IncidentConditions
          availableQuestions={props.availableQuestions}
          brands={props.brands}
          brandsLoading={props.brandsLoading}
          brandsSelected={props.brandsSelected}
          classes={classes}
          countries={props.countries}
          countriesSelected={props.countriesSelected}
          descriptionCheck={props.descriptionCheck}
          divisions={props.divisions}
          divisionsLoading={props.divisionsLoading}
          divisionsSelected={props.divisionsSelected}
          goods={props.goods}
          goodsTypeCheck={props.goodsTypeCheck}
          groupsSelected={props.groupsSelected}
          lessThanSelected={props.lessThanSelected}
          lossValueSelected={props.lossValueSelected}
          prefix={props.prefix}
          prioritySelected={props.prioritySelected}
          questions={props.questions}
          questionsSelected={props.questionsSelected}
          selectedQuestions={props.selectedQuestions}
          setAvailableQuestions={props.setAvailableQuestions}
          setSelectedQuestions={props.setSelectedQuestions}
          tags={props.tags}
          tagsSelected={props.tagsSelected}
          valueSelected={props.valueSelected}
        />
      )}

      {modelSelected === Model.Offender && (
        <OffenderConditions
          classes={classes}
          incidentTimeCountCheck={props.incidentTimeCountCheck}
        />
      )}

      {modelSelected === Model.Todo && (
        <TodoConditions
          availableQuestions={props.availableQuestions}
          classes={classes}
          questionsSelected={props.questionsSelected}
          selectedQuestions={props.selectedQuestions}
          setAvailableQuestions={props.setAvailableQuestions}
          setSelectedQuestions={props.setSelectedQuestions}
          taskQuestions={props.taskQuestions}
        />
      )}
    </Card>
  );
};

export default WorkflowConditions;
