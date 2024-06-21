import React from 'react';
import { Button, Card, Table } from 'antd';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { useStoreState } from '../../../../state';
import { Role } from 'graphql/types';
import { useCurrentSchemeTermsQuery } from 'graphql/scheme/queries/current-terms.generated';

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
        SchemeTerms &&
        SchemeTerms.scheme &&
        !SchemeTerms.scheme.currentTerms?.id && (
          <Button
            style={{ marginBottom: 10 }}
            type="primary"
            onClick={() => navigate('/app/scheme-settings/terms/scheme/create')}
          >
            <FormattedMessage defaultMessage="Create Terms and Conditions" />
          </Button>
        )}
      <Card>
        <Table
          loading={SchemeTermsLoading}
          size="small"
          pagination={false}
          columns={[
            {
              key: 'term',
              title: 'Terms',
              dataIndex: 'term',
              render: (value, record) => (
                <Link to={`/app/scheme-settings/terms/${record.key}`}>
                  {value}
                </Link>
              ),
            },
          ]}
          dataSource={
            SchemeTerms &&
            SchemeTerms.scheme &&
            SchemeTerms.scheme.currentTerms?.id
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
        />
      </Card>
    </div>
  );
};

export default Terms;
