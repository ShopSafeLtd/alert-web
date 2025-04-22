import type { CustomQuestionsCountGraphQueryVariables } from '#/components/reports/components/CustomQuestionsCountGraph/__generated__/CustomQuestionsCountGraph.generated';
import type { MetaData } from '#/views/reports/types';

import { useAvailableQuestionsQuery } from '#/components/form-components/addQuestion/graphql/__generated__/get-questions.generated';
import { useCustomQuestionsCountGraphQuery } from '#/components/reports/components/CustomQuestionsCountGraph/__generated__/CustomQuestionsCountGraph.generated';
import Graph from '#/components/reports/graphs/graph';
import {
  faBarChart,
  faCogs,
  faPieChart,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Empty, Modal, Select } from 'antd';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';

interface Props {
  editMode: boolean;
  fullMetadata: MetaData[];
  isPrinting: boolean;
  metaData?: MetaData;
  metaDataKey: string;
  removeItem?: () => void;
  setMetadata: (arg0: MetaData[]) => void;
  updateQuestionId: (value: string) => void;
  variables: CustomQuestionsCountGraphQueryVariables;
}

const CustomQuestionsCountGraph = ({
  editMode,
  fullMetadata,
  isPrinting,
  metaData,
  metaDataKey,
  removeItem,
  setMetadata,
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
      <Button
        className="cancelDrag change-graph2 no-print"
        hidden={!editMode}
        icon={<FontAwesomeIcon icon={faPieChart} size="lg" />}
        onClick={() => {
          const updatedMetadata = fullMetadata.map((item) => {
            if (item.key === metaDataKey) {
              if (item.type === 'donut') return { ...item, type: 'pie' };
              return { ...item, type: 'donut' };
            }
            return item;
          }) satisfies MetaData[];
          setMetadata(updatedMetadata);
        }}
        shape="circle"
        size="small"
        type="text"
      />
      <Button
        className="cancelDrag change-graph3 no-print"
        hidden={!editMode}
        icon={<FontAwesomeIcon icon={faBarChart} size="lg" />}
        onClick={() => {
          const updatedMetadata = fullMetadata.map((item) => {
            console.log(item.key, metaDataKey);
            if (item.key === metaDataKey) {
              return { ...item, type: 'bar' };
            }
            return item;
          }) satisfies MetaData[];
          console.log(updatedMetadata);
          setMetadata(updatedMetadata);
        }}
        shape="circle"
        size="small"
        type="text"
      />
      <Button
        className="cancelDrag change-graph1 no-print"
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
        className="cancelDrag card-remove no-print"
        hidden={!editMode}
        icon={<FontAwesomeIcon color="red" icon={faTrash} size="lg" />}
        onClick={removeItem}
        shape="circle"
        size="small"
        type="text"
      />
      {metaData?.propId ? (
        metaData.type === 'donut' || metaData.type === 'pie' ? (
          <Graph
            emptyLabel={intl.formatMessage({
              defaultMessage: 'No Data',
            })}
            graphOptions={{
              data: data?.customQuestionsCountGraph?.data.map((item) => ({
                count: item.value,
                type: item.label,
              })),
              legend: {
                position: 'right',
              },
              series: [
                {
                  angleKey: 'count',
                  calloutLabel: {
                    enabled: false,
                  },
                  calloutLabelKey: 'type',
                  calloutLabelName: 'type',
                  innerRadiusRatio: 0.7,
                  labelKey: 'count',
                  sectorLabelKey: 'count',
                  // @ts-expect-error graph type error
                  type: metaData.type === 'pie' ? 'pie' : 'donut',
                },
              ],
            }}
            gridOptions={{
              columnDefs: [
                {
                  field: 'type',
                },
                {
                  field: 'count',
                },
              ],
              rowData: data?.customQuestionsCountGraph.data.map((item) => ({
                count: item.value,
                type: item.label,
              })),
            }}
            isPrinting={isPrinting}
            label={data?.customQuestionsCountGraph.title ?? ''}
            loading={!!data?.customQuestionsCountGraph?.data}
          />
        ) : (
          <Graph
            emptyLabel={intl.formatMessage({
              defaultMessage: 'No Data',
            })}
            graphOptions={{
              data: data?.customQuestionsCountGraph?.data.map((item) => ({
                count: item.value,
                type: item.label,
              })),
              legend: {
                enabled: false,
              },
              series: [
                {
                  type: 'bar',
                  xKey: 'type',
                  yKey: 'count',
                },
              ],
            }}
            gridOptions={{
              columnDefs: [
                {
                  field: 'type',
                },
                {
                  field: 'count',
                },
              ],
              rowData: data?.customQuestionsCountGraph.data.map((item) => ({
                count: item.value,
                type: item.label,
              })),
            }}
            isPrinting={isPrinting}
            label={data?.customQuestionsCountGraph.title ?? ''}
            loading={!!data?.customQuestionsCountGraph?.data}
          />
        )
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
