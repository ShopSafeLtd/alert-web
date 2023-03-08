import React from 'react';
import { Button, Card, Image, Skeleton, Table } from 'antd';
import TabContent from 'components/TabContent';
import type { ViewProps } from './types/Documents';

const DocumentsView = ({ data }: ViewProps) => {
  const tags = new Set(
    data?.flatMap((document) => document.tags.map((tag) => tag.name)) || []
  );
  // convert tags to string array
  const tagsArray = Array.from(tags);

  return (
    <TabContent>
      <Card style={{ marginLeft: 20, marginRight: 20, marginTop: 20 }}>
        <Table
          columns={[
            {
              title: 'Thumbnail',
              dataIndex: 'thumbnail',
              key: 'thumbnail',
              render: (thumbnail: string | null | undefined) =>
                thumbnail ? (
                  <Image src={thumbnail} width={180} alt="thumbnail" />
                ) : (
                  <Skeleton.Image style={{ width: 180 }} />
                ),
            },
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: 'Tags',
              dataIndex: 'tags',
              key: 'tags',
              filters: tagsArray.map((tag) => ({
                text: tag,
                value: tag,
              })),
              onFilter: (
                value: string | number | boolean,
                record: { tags: { text: string }[] }
              ) => record.tags.some((tag) => tag.text === value),

              render: (origTags: { text: string; value: string }[]) =>
                origTags.map((tag) => tag.text).join(', '),
            },
            // download button
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
          size="small"
          dataSource={
            data?.map((document) => ({
              key: document.id,
              thumbnail: document.thumbnailUrl,
              fileUrl: document.url,
              name: document.name,
              tags: document.tags.map((tag) => ({
                text: tag.name,
                value: tag.name,
              })),
            })) || []
          }
        />
      </Card>
    </TabContent>
  );
};

export default DocumentsView;
