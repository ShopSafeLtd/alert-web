import React from 'react';
import { Button, Card } from 'antd';
import { FormattedMessage } from 'react-intl';
import type { ReturnProps as Props } from './types/ViewCustomTerms';

const ViewTerms = ({ data, loading, isAdmin, editTerms }: Props) => (
  <div className="page-view">
    {isAdmin && (
      <Button onClick={editTerms} type="primary" style={{ margin: 15 }}>
        <FormattedMessage defaultMessage="Edit" id="wEQDC6" />
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
);

export default ViewTerms;
