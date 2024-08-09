import { Button, Card, Table } from 'antd';
import { useCurrentSchemeTermsQuery } from 'graphql/scheme/queries/__generated__/current-terms.generated';
import { Role } from 'graphql/types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import { useStoreState } from '../../../../state';

const Terms = (): JSX.Element => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const isAdmin = useStoreState((state) => state.user.role !== Role.User);
  const { data: SchemeTerms, loading: SchemeTermsLoading } =
    useCurrentSchemeTermsQuery({
      variables: {
        where: {
          id: schemeId,
        },
      },
    });

  const navigate = useNavigate();

  return (
    <div className="list-view">
      {isAdmin &&
        SchemeTerms?.scheme &&
        !SchemeTerms.scheme.currentTerms?.id && (
          <Button
            onClick={() => navigate('/app/scheme-settings/terms/scheme/create')}
            style={{ marginBottom: 10 }}
            type="primary"
          >
            <FormattedMessage defaultMessage="Create Terms and Conditions" />
          </Button>
        )}
      <Card>
        <Table
          columns={[
            {
              dataIndex: 'term',
              key: 'term',
              render: (value, record) => (
                <Link to={`/app/scheme-settings/terms/${record.key}`}>
                  {value}
                </Link>
              ),
              title: 'Terms',
            },
          ]}
          dataSource={
            SchemeTerms?.scheme?.currentTerms?.id
              ? [
                  {
                    key: `scheme/${SchemeTerms.scheme.currentTerms?.id}`,
                    term: 'Custom Scheme Terms',
                  },
                  {
                    key: 'user-terms',
                    term: 'User Terms',
                  },
                  {
                    key: 'scheme-terms',
                    term: 'Scheme Terms',
                  },
                ]
              : [
                  {
                    key: 'user-terms',
                    term: 'User Terms',
                  },
                  {
                    key: 'scheme-terms',
                    term: 'Scheme Terms',
                  },
                ]
          }
          loading={SchemeTermsLoading}
          pagination={false}
          size="small"
        />
      </Card>
    </div>
  );
};

export default Terms;
