import type { CustomQuestionsCountGraphQueryVariables } from '#/components/reports/components/CustomQuestionsCountGraph/__generated__/CustomQuestionsCountGraph.generated';
import type { MetaData } from '#/views/reports/types';

import { useAvailableQuestionsQuery } from '#/components/form-components/addQuestion/graphql/__generated__/get-questions.generated';
import { useCustomQuestionsCountGraphQuery } from '#/components/reports/components/CustomQuestionsCountGraph/__generated__/CustomQuestionsCountGraph.generated';
import { DonutGraph } from '#/components/reports/graphs';
import { faCogs, faTrash } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Empty, Modal, Select, Typography } from 'antd';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';

interface Props {
  editMode: boolean;
  isPrinting: boolean;
  metaData?: MetaData;
  removeItem?: () => void;
  updateQuestionId: (value: string) => void;
  variables: CustomQuestionsCountGraphQueryVariables;
}

const CustomQuestionsCountGraph = ({
  editMode,
  isPrinting,
  metaData,
  removeItem,
  updateQuestionId,
  variables,
}: Props) => {
  const intl = useIntl();
  const [selectOpen, setSelectOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<null | string>(null);
  const toggleSelectOpen = () => setSelectOpen(!selectOpen);

  const { data } = useCustomQuestionsCountGraphQuery({
    skip: !variables.where.questionId,
    variables,
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
        className="change-graph1 no-print"
        hidden={!editMode}
        icon={<FontAwesomeIcon icon={faCogs} size="lg" />}
        onClick={() => {
          toggleSelectOpen();
        }}
        shape="circle"
        size="small"
        type="text"
      />
      <Button
        className="card-remove no-print"
        hidden={!editMode}
        icon={<FontAwesomeIcon color="red" icon={faTrash} size="lg" />}
        onClick={removeItem}
        shape="circle"
        size="small"
        type="text"
      />
      {metaData?.propId ? (
        <DonutGraph
          data={data?.customQuestionsCountGraph.data}
          emptyLabel={intl.formatMessage({
            defaultMessage: 'No Data',
          })}
          isPrinting={isPrinting}
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
        onCancel={toggleSelectOpen}
        onOk={() => {
          if (selectedValue) {
            updateQuestionId(selectedValue);
            toggleSelectOpen();
          }
        }}
        open={selectOpen}
        title={intl.formatMessage({
          defaultMessage: 'Select Question',
        })}
      >
        <Select
          loading={loading}
          onChange={setSelectedValue}
          options={questionsData?.availableQuestions.map((option) => ({
            label: option.question,
            value: option.id,
          }))}
          style={{ width: '100%' }}
          value={selectedValue}
        />
      </Modal>
    </>
  );
};

export default CustomQuestionsCountGraph;
