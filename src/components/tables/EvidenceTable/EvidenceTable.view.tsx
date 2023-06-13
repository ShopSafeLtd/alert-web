import React from 'react';
import { Button, Table } from 'antd';
import { createUseStyles } from 'react-jss';
import type { FileType } from 'graphql/generated';

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
  return (
    <Table
      size="small"
      rowClassName={classes.row}
      columns={[
        {
          key: 'name',
          dataIndex: 'name',
          title: 'Name',
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
              Download
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
