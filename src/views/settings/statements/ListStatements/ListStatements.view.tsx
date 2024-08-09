import React from 'react';

import { Button, Col, Drawer, Row, Table } from 'antd';
import { faEdit, faPlus } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useIntl } from 'react-intl';
import useStyles from './ListBusinesses.styles';
import CreateEditStatementContainer from '../../../../components/form-components/statements/createEditStatement.container';
import { ListStatementTemplatesQuery } from 'graphql/statementTemplates/queries/__generated__/list-templates.generated';

interface TableData {
  key: string;
  name: string;
  content: string;
}

interface Props {
  data: ListStatementTemplatesQuery | undefined;
  loading: boolean;
  toggleCreate: () => void;
  toggleEdit: (t: string | null) => void;
  createTemplate: boolean;
  editTemplate: string | null;
}

const ListBusinesses = ({
  data,
  loading,
  toggleCreate,
  toggleEdit,
  createTemplate,
  editTemplate,
}: Props) => {
  const classNames = useStyles();
  const intl = useIntl();
  return (
    <div className={classNames.page}>
      <Row gutter={8} className={classNames.actions}>
        <Col flex={1} />
        <Col>
          <Button
            icon={
              <FontAwesomeIcon
                icon={faPlus}
                size="lg"
                style={{ marginRight: 5 }}
              />
            }
            danger
            onClick={toggleCreate}
          >
            {intl.formatMessage({
              defaultMessage: 'Create statement',
            })}
          </Button>
        </Col>
      </Row>
      <Table<TableData>
        columns={[
          {
            key: 'name',
            dataIndex: 'name',
            title: intl.formatMessage({
              defaultMessage: 'Name',
            }),
          },
          {
            key: 'actions',
            title: '',
            dataIndex: 'actions',
            width: 50,
            render: (_, record) => (
              <Button
                size="small"
                type="text"
                onClick={() => toggleEdit(record.key)}
              >
                <FontAwesomeIcon size="lg" icon={faEdit} />
              </Button>
            ),
          },
        ]}
        expandable={{
          // eslint-disable-next-line react/no-unstable-nested-components
          expandedRowRender: (record) => (
            <div style={{ margin: 0 }}>{record.content}</div>
          ),
          rowExpandable: (record) => !!record.content,
        }}
        dataSource={data?.statementTemplates.map((item) => ({
          key: item.id,
          name: item.name,
          content: item.content,
        }))}
        loading={loading}
        size="small"
        pagination={{
          hideOnSinglePage: true,
          pageSize: 30,
        }}
      />

      <Drawer
        open={createTemplate}
        onClose={toggleCreate}
        title={intl.formatMessage({
          defaultMessage: 'Create statement',
        })}
        width={600}
      >
        {createTemplate && (
          <CreateEditStatementContainer
            initData={undefined}
            onClose={toggleCreate}
          />
        )}
      </Drawer>
      <Drawer
        open={!!editTemplate}
        onClose={() => toggleEdit(null)}
        title={intl.formatMessage({
          defaultMessage: 'Edit statement',
        })}
        width={600}
      >
        {editTemplate && (
          <CreateEditStatementContainer
            initData={{
              name: '',
              content: '',
              ...data?.statementTemplates.find(
                (item) => item.id === editTemplate
              ),
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              schemes:
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
                data?.statementTemplates
                  .find((item) => item.id === editTemplate)
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
                  ?.schemes?.map((item) => item?.id || '') || [],
            }}
            onClose={() => {
              toggleEdit(null);
            }}
            id={editTemplate}
          />
        )}
      </Drawer>
    </div>
  );
};

export default ListBusinesses;
