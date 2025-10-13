import type { ListStatementTemplatesQuery } from 'graphql/statementTemplates/queries/__generated__/list-templates.generated';

import { faEdit, faPlus } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Drawer, Row, Table } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

import CreateEditStatementContainer from '../../../../components/form-components/statements/createEditStatement.container';
import useStyles from './ListBusinesses.styles';

interface TableData {
  content: string;
  key: string;
  name: string;
}

interface Props {
  createTemplate: boolean;
  data: ListStatementTemplatesQuery | undefined;
  editTemplate: null | string;
  loading: boolean;
  toggleCreate: () => void;
  toggleEdit: (t: null | string) => void;
}

const ListBusinesses = ({
  createTemplate,
  data,
  editTemplate,
  loading,
  toggleCreate,
  toggleEdit,
}: Props) => {
  const classNames = useStyles();
  const intl = useIntl();
  return (
    <div className={classNames.page}>
      <Row className={classNames.actions} gutter={8}>
        <Col flex={1} />
        <Col>
          <Button
            danger
            icon={
              <FontAwesomeIcon
                icon={faPlus}
                size="lg"
                style={{ marginRight: 5 }}
              />
            }
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
            dataIndex: 'name',
            key: 'name',
            title: intl.formatMessage({
              defaultMessage: 'Name',
            }),
          },
          {
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => (
              <Button
                onClick={() => toggleEdit(record.key)}
                size="small"
                type="text"
              >
                <FontAwesomeIcon icon={faEdit} size="lg" />
              </Button>
            ),
            title: '',
            width: 50,
          },
        ]}
        dataSource={data?.statementTemplates.map((item) => ({
          content: item.content,
          key: item.id,
          name: item.name,
        }))}
        expandable={{
          // eslint-disable-next-line react/no-unstable-nested-components
          expandedRowRender: (record) => (
            <div style={{ margin: 0 }}>{record.content}</div>
          ),
          rowExpandable: (record) => !!record.content,
        }}
        loading={loading}
        pagination={{
          hideOnSinglePage: true,
          pageSize: 30,
        }}
        size="small"
      />

      <Drawer
        onClose={toggleCreate}
        open={createTemplate}
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
        onClose={() => toggleEdit(null)}
        open={!!editTemplate}
        title={intl.formatMessage({
          defaultMessage: 'Edit statement',
        })}
        width={600}
      >
        {editTemplate && (
          <CreateEditStatementContainer
            id={editTemplate}
            initData={{
              content: '',
              name: '',
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
          />
        )}
      </Drawer>
    </div>
  );
};

export default ListBusinesses;
