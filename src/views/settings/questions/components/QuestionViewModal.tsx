import { useQuestionModalDetailsQuery } from '#/views/settings/questions/graphql/queries/__generated__/question.generated';
import { Modal, Table } from 'antd';
import React from 'react';

const generateViewTagLink = (tagId: string) =>
  `/app/scheme-settings/crime-types/view/${tagId}`;

const generateViewActivityLink = (activityId: string) =>
  `/app/scheme-settings/activity-settings/${activityId}`;

const QuestionViewModal = ({
  closeModal,
  questionId,
}: {
  closeModal: () => void;
  questionId: null | string;
}) => {
  const { data, loading } = useQuestionModalDetailsQuery({
    skip: !questionId,
    variables: {
      where: {
        id: questionId ?? '',
      },
    },
  });
  if (!questionId) {
    return null;
  }

  const isActivityGroup =
    data?.question?.questionGroup && data?.question?.questionGroup?.length > 0;
  const tableData = isActivityGroup
    ? data?.question?.questionGroup.map((group) => ({
        id: group.id,
        name: group.name,
        type: 'ActivityGroup',
      }))
    : data?.question?.tags.map(({ tag }) => ({
        id: tag.id,
        name: tag.name,
        type: 'QuestionTag',
      }));
  return (
    <Modal
      confirmLoading={loading}
      footer={null}
      maskClosable
      onCancel={closeModal}
      open={!!questionId}
      title={data?.question.question}
      width={1000}
    >
      <Table
        columns={[
          {
            dataIndex: 'name',
            key: 'name',
            render: (name, record) => {
              if (record.type === 'QuestionTag') {
                return (
                  <a
                    href={generateViewTagLink(record.id)}
                    rel="noreferrer"
                    target={'_blank'}
                  >
                    {name}
                  </a>
                );
              }
              if (record.type === 'ActivityGroup') {
                return (
                  <a
                    href={generateViewActivityLink(record.id)}
                    rel="noreferrer"
                    target={'_blank'}
                  >
                    {name}
                  </a>
                );
              }
            },
            title: 'Name',
          },
          {
            dataIndex: 'type',
            key: 'type',
            title: 'Type',
          },
        ]}
        dataSource={tableData}
        loading={loading}
        pagination={{
          hideOnSinglePage: true,
        }}
      />
    </Modal>
  );
};

export default QuestionViewModal;
