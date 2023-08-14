import React from 'react';
import { Button, Table } from 'antd';
import { createUseStyles } from 'react-jss';
import type { FileType } from 'graphql/generated';
import { useIntl } from 'react-intl';

const useStyles = createUseStyles({
  row: { cursor: 'pointer' },
});

interface Props {
  evidence:
    | {
        id: string;
        name?: string;
        url?: string;
        fileType?: FileType | null | undefined;
      }[];
}

const EvidenceTable = ({ evidence }: Props): JSX.Element => {
  const classes = useStyles();
  const intl = useIntl();
  return (
    <Table
      size="small"
      pagination={{
        hideOnSinglePage: true,
        pageSize: 5,
      }}
      rowClassName={classes.row}
      columns={[
        {
          key: 'name',
          dataIndex: 'name',
          title: intl.formatMessage({
            id: 'HAlOn1',
            defaultMessage: 'Name',
          }),
          width: '80%',
        },
        {
          title: '',
          dataIndex: 'fileUrl',
          key: 'fileUrl',
          render: (fileUrl: string) => (
            <Button
              type="link"
              onClick={() => {
                window.open(fileUrl);
              }}
            >
              {intl.formatMessage({
                id: '5q3qC0',
                defaultMessage: 'Download',
              })}
            </Button>
          ),
        },
      ]}
      dataSource={evidence.map((e) => ({
        key: e.id,
        fileUrl: e.url,
        name: e.name || 'File',
      }))}
    />
  );
};
export default EvidenceTable;
