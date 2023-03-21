import React from 'react';
import { Button, Card } from 'antd';
import { ReturnProps as Props } from './types/ViewCustomTerms';

const ViewTerms = ({ data, loading, isAdmin, editTerms }: Props) => (
  <>
    <div className="page-view">
      {isAdmin && (
        <Button onClick={editTerms} type="primary" style={{ margin: 15 }}>
          Edit
        </Button>
      )}
      <Card style={{ marginLeft: 20, marginRight: 20 }} loading={loading}>
        <div
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: data?.scheme?.currentTerms?.content || '',
          }}
        />
      </Card>
    </div>
  </>
);

export default ViewTerms;
