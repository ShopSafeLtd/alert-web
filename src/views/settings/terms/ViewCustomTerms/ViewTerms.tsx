import { Button, Card } from 'antd';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import type { ReturnProps as Props } from './types/ViewCustomTerms';

const ViewTerms = ({ data, editTerms, isAdmin, loading }: Props) => (
  <div className="page-view">
    {isAdmin && (
      <Button onClick={editTerms} style={{ margin: 15 }} type="primary">
        <FormattedMessage defaultMessage="Edit" />
      </Button>
    )}
    <Card loading={loading} style={{ marginLeft: 20, marginRight: 20 }}>
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
