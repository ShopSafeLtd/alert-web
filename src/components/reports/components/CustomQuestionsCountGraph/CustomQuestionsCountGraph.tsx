import React, { useState } from 'react';
import { DonutGraph } from '#/components/reports/graphs';
import { Button, Typography, Empty, Modal, Select } from 'antd';

import { useIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs, faTrash } from '@fortawesome/pro-light-svg-icons';
import type { MetaData } from '#/views/reports/types';

import type { CustomQuestionsCountGraphQueryVariables } from './CustomQuestionsCountGraph.generated';
import { useCustomQuestionsCountGraphQuery } from './CustomQuestionsCountGraph.generated';
import { useAvailableQuestionsQuery } from '#/components/form-components/addQuestion/graphql/get-questions.generated';
interface Props {
  isPrinting: boolean;
  editMode: boolean;
  variables: CustomQuestionsCountGraphQueryVariables;
  updateQuestionId: (value: string) => void;
  metaData?: MetaData;
  removeItem?: () => void;
}

const CustomQuestionsCountGraph = ({
  isPrinting,
  variables,
  editMode,
  updateQuestionId,
  metaData,
  removeItem,
}: Props) => {
  const intl = useIntl();
  const [selectOpen, setSelectOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const toggleSelectOpen = () => setSelectOpen(!selectOpen);

  const { data } = useCustomQuestionsCountGraphQuery({
    variables,
    skip: !variables.where.questionId,
  });

  const { data: questionsData, loading } = useAvailableQuestionsQuery({
    skip: !selectOpen,
  });

  return (
    <>
      <Typography.Title level={4} style={{ fontWeight: 700 }}>
        {data?.customQuestionsCountGraph.title}
      </Typography.Title>
      <Button
        type="text"
        shape="circle"
        className="change-graph1 no-print"
        hidden={!editMode}
        icon={<FontAwesomeIcon icon={faCogs} size="lg" />}
        size="small"
        onClick={() => {
          toggleSelectOpen();
        }}
      />
      <Button
        type="text"
        shape="circle"
        className="card-remove no-print"
        hidden={!editMode}
        icon={<FontAwesomeIcon icon={faTrash} color="red" size="lg" />}
        size="small"
        onClick={removeItem}
      />
      {metaData?.propId ? (
        <DonutGraph
          isPrinting={isPrinting}
          data={data?.customQuestionsCountGraph.data}
          emptyLabel={intl.formatMessage({
            defaultMessage: 'No Data',
          })}
          type="donut"
        />
      ) : (
        <Empty
          description={intl.formatMessage({
            defaultMessage: 'No question set for graph',
          })}
        />
      )}

      <Modal
        title={intl.formatMessage({
          defaultMessage: 'Select Question',
        })}
        open={selectOpen}
        onCancel={toggleSelectOpen}
        onOk={() => {
          if (selectedValue) {
            updateQuestionId(selectedValue);
            toggleSelectOpen();
          }
        }}
      >
        <Select
          loading={loading}
          style={{ width: '100%' }}
          options={questionsData?.availableQuestions.map((option) => ({
            label: option.question,
            value: option.id,
          }))}
          onChange={setSelectedValue}
          value={selectedValue}
        />
      </Modal>
    </>
  );
};

export default CustomQuestionsCountGraph;
