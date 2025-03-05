import type {
  AiSuggestionsQuery,
  AiSuggestionsQueryVariables,
} from '#/views/ai/ai-centre/components/AiSuggestions/__generated__/AiSuggestions.generated';

import AiSuggestionCard from '#/components/ai-suggestions/AiSuggestionCard.view';
import ReviewAiSuggestion from '#/components/ai-suggestions/ReviewAiSuggestion.view';
import { useStoreState } from '#/state';
import {
  AiSuggestionsDocument,
  useAiSuggestionsQuery,
} from '#/views/ai/ai-centre/components/AiSuggestions/__generated__/AiSuggestions.generated';
import { faFilter } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Drawer, Input, Row, Skeleton, Typography } from 'antd';
import { useApproveAiSuggestionMutation } from 'graphql/ai-suggestions/__generated__/approve-ai-suggestions.generated';
import { useDismissAiSuggestionMutation } from 'graphql/ai-suggestions/__generated__/dismiss-ai-suggestions.generated';
import { AiSuggestionStatus, AiSuggestionType, SortOrder } from 'graphql/types';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

enum QueryFilters {
  CRIME_GROUPS = 'CRIME_GROUPS',
  DUPLICATES = 'DUPLICATES',
  FACE_MATCH = 'FACE_MATCH',
  INVESTIGATIONS = 'INVESTIGATIONS',
}

const defaultFilter = [
  AiSuggestionType.InvestigationVehicle,
  AiSuggestionType.InvestigationOffender,
  AiSuggestionType.InvestigationIncident,
  AiSuggestionType.CrimeGroupOffender,
  AiSuggestionType.CrimeGroupNew,
  AiSuggestionType.FaceMatch,
  AiSuggestionType.OffenderDuplicate,
  AiSuggestionType.IncidentPoliceReport,
];

const AiSuggestions = () => {
  const navigate = useNavigate();
  const currentScheme = useStoreState((state) => state.scheme.id);

  const [search, setSearch] = useState('');
  const [open, setOpen] = useState<null | string>(null);
  const [typeFilter, setTypeFilter] = useState<QueryFilters | null>(null);
  const [queryFilter, setQueryFilter] =
    useState<AiSuggestionType[]>(defaultFilter);

  const intl = useIntl();

  const variables: AiSuggestionsQueryVariables = {
    orderBy: [
      {
        createdAt: SortOrder.Desc,
      },
    ],
    take: 10,
    where: {
      schemeIds: [currentScheme],
      search,
      status: [AiSuggestionStatus.Open],
      type: queryFilter.length > 0 ? queryFilter : undefined,
    },
  };

  const { data, fetchMore, loading } = useAiSuggestionsQuery({
    variables,
  });
  const [approveSuggestion] = useApproveAiSuggestionMutation({
    update: (store, { data: res }) => {
      if (
        res?.approveAiSuggestion === null ||
        res?.approveAiSuggestion === undefined
      )
        return;

      const existingData = store.readQuery<
        AiSuggestionsQuery,
        AiSuggestionsQueryVariables
      >({
        query: AiSuggestionsDocument,
        variables,
      });

      if (!existingData?.aiSuggestions.edges) return;

      store.writeQuery<AiSuggestionsQuery, AiSuggestionsQueryVariables>({
        data: {
          aiSuggestions: {
            ...existingData.aiSuggestions,
            edges: existingData.aiSuggestions.edges.filter(
              (item) => item.node.id !== res.approveAiSuggestion.id
            ),
          },
        },
        query: AiSuggestionsDocument,
        variables,
      });
    },
  });
  const [dismissSuggestion] = useDismissAiSuggestionMutation({
    update: (store, { data: res }) => {
      if (
        res?.dismissAiSuggestion === null ||
        res?.dismissAiSuggestion === undefined
      )
        return;

      const existingData = store.readQuery<
        AiSuggestionsQuery,
        AiSuggestionsQueryVariables
      >({
        query: AiSuggestionsDocument,
        variables,
      });

      if (!existingData?.aiSuggestions.edges) return;

      store.writeQuery<AiSuggestionsQuery, AiSuggestionsQueryVariables>({
        data: {
          aiSuggestions: {
            ...existingData.aiSuggestions,
            edges: existingData.aiSuggestions.edges.filter(
              (item) => item.node.id !== res.dismissAiSuggestion.id
            ),
          },
        },
        query: AiSuggestionsDocument,
        variables,
      });
    },
  });

  const onApproveSuggestion = (id: string) => {
    setOpen(null);
    void approveSuggestion({
      optimisticResponse: {
        approveAiSuggestion: {
          id,
        },
      },
      variables: {
        where: {
          id,
        },
      },
    });
    void fetchMore({
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          aiSuggestions: {
            ...fetchMoreResult.aiSuggestions,
            edges: [
              ...(prev.aiSuggestions?.edges || []),
              ...(fetchMoreResult.aiSuggestions?.edges.filter(
                (item) =>
                  !prev.aiSuggestions.edges.some(
                    ({ node }) => node.id === item.node.id
                  )
              ) || []),
            ],
          },
        };
      },
      variables: {
        after: data?.aiSuggestions.pageInfo.endCursor,
        orderBy: variables.orderBy,
        take: 1,
        where: variables.where,
      },
    });
  };
  const onDismissSuggestion = (id: string) => {
    setOpen(null);
    void dismissSuggestion({
      optimisticResponse: {
        dismissAiSuggestion: {
          id,
        },
      },
      variables: {
        where: {
          id,
        },
      },
    });
    void fetchMore({
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          aiSuggestions: {
            ...fetchMoreResult.aiSuggestions,
            edges: [
              ...(prev.aiSuggestions?.edges || []),
              ...(fetchMoreResult.aiSuggestions?.edges.filter(
                (item) =>
                  !prev.aiSuggestions.edges.some(
                    ({ node }) => node.id === item.node.id
                  )
              ) || []),
            ],
          },
        };
      },
      variables: {
        after: data?.aiSuggestions.pageInfo.endCursor,
        orderBy: variables.orderBy,
        take: 1,
        where: variables.where,
      },
    });
  };

  const onSetTypeFilter = (filter: QueryFilters) => {
    switch (filter) {
      case typeFilter: {
        setTypeFilter(null);
        setQueryFilter(defaultFilter);

        break;
      }
      case QueryFilters.FACE_MATCH: {
        setTypeFilter(filter);
        setQueryFilter([AiSuggestionType.FaceMatch]);

        break;
      }
      case QueryFilters.CRIME_GROUPS: {
        setTypeFilter(filter);
        setQueryFilter([
          AiSuggestionType.CrimeGroupNew,
          AiSuggestionType.CrimeGroupOffender,
        ]);

        break;
      }
      case QueryFilters.INVESTIGATIONS: {
        setTypeFilter(filter);
        setQueryFilter([
          AiSuggestionType.InvestigationOffender,
          AiSuggestionType.InvestigationCreate,
          AiSuggestionType.InvestigationIncident,
          AiSuggestionType.InvestigationVehicle,
        ]);

        break;
      }
      case QueryFilters.DUPLICATES: {
        setTypeFilter(filter);
        setQueryFilter([AiSuggestionType.OffenderDuplicate]);

        break;
      }
      // eslint-disable-next-line sonarjs/no-duplicated-branches
      default: {
        setTypeFilter(null);
        setQueryFilter(defaultFilter);
      }
    }
  };

  const typeFilters = [
    {
      id: QueryFilters.FACE_MATCH,
      onClick: () => onSetTypeFilter(QueryFilters.FACE_MATCH),
      title: <FormattedMessage defaultMessage="Face Matches" />,
    },
    {
      id: QueryFilters.CRIME_GROUPS,
      onClick: () => onSetTypeFilter(QueryFilters.CRIME_GROUPS),
      title: <FormattedMessage defaultMessage="Crime Groups" />,
    },
    {
      id: QueryFilters.INVESTIGATIONS,
      onClick: () => onSetTypeFilter(QueryFilters.INVESTIGATIONS),
      title: <FormattedMessage defaultMessage="Investigations" />,
    },
    {
      id: QueryFilters.DUPLICATES,
      onClick: () => onSetTypeFilter(QueryFilters.DUPLICATES),
      title: <FormattedMessage defaultMessage="Duplicates" />,
    },
  ];

  return (
    <>
      <Row align="middle" gutter={8} style={{ marginBottom: 10 }}>
        <Col flex={1}>
          <Typography.Title level={3} style={{ marginBottom: 0 }}>
            <FormattedMessage defaultMessage="Suggestions" />
          </Typography.Title>
        </Col>
        <Col>
          <Button type="text">
            <FontAwesomeIcon icon={faFilter} size={'lg'} />
          </Button>
        </Col>
        <Col>
          <Button type="text">
            <FormattedMessage defaultMessage="View All Suggestions" />
          </Button>
        </Col>
      </Row>

      <div>
        <Input
          onChange={(event) => setSearch(event.target.value)}
          placeholder={intl.formatMessage({
            defaultMessage: 'Search suggestions...',
          })}
          value={search}
        />
      </div>
      <Row gutter={8} style={{ marginTop: 12 }}>
        {typeFilters.map((type) => (
          <Col key={type.id}>
            <Button
              onClick={type.onClick}
              size="small"
              style={{ borderRadius: 100 }}
              type={typeFilter === type.id ? 'default' : 'ghost'}
            >
              {type.title}
            </Button>
          </Col>
        ))}
      </Row>
      <div style={{ marginTop: 20, width: '100%' }}>
        {loading &&
          [0, 1, 2, 3, 4, 5, 6, 7].map((item) => (
            <Skeleton
              active
              avatar={{
                style: { borderRadius: 10, height: 100, width: '100%' },
              }}
              key={item}
              paragraph={false}
              style={{ height: 100, marginBottom: 20, width: '100%' }}
              title={false}
            />
          ))}
        {!loading &&
          data?.aiSuggestions.edges.map((edge) => (
            <AiSuggestionCard
              data={edge.node}
              key={edge.node.id}
              onDismissSuggestion={() => {
                void onDismissSuggestion(edge.node.id);
              }}
              onReview={() => setOpen(edge.node.id)}
            />
          ))}
        <AiSuggestionCard
          data={{
            createdAt: new Date(),
            description:
              'Ethan Reynolds, a prolific shoplifter aged between 18 and 30, has repeatedly targeted stores using methods such as walkout theft, concealment, self-checkout fraud, and coordinated distraction. His behavior has escalated to include verbal abuse and threats towards staff, demonstrating a concerning adaptability in his criminal tactics. This investigation will aim to develop a comprehensive profile of Reynolds and his associates, identify patterns in his methods, and take proactive measures to mitigate future risks.',
            id: 'fasdff',
            reference: 897,
            title: 'Suggested Investigation into Ethan Reynolds & Associates',
            type: AiSuggestionType.InvestigationCreate,
          }}
          key="fasdff"
          onDismissSuggestion={() => {}}
          onReview={() =>
            navigate('/app/investigations/view/cm7vul1bw01gps401awdn6u5a')
          }
        />
      </div>

      <Drawer
        onClose={() => setOpen(null)}
        open={open !== null}
        title={<FormattedMessage defaultMessage="Review Suggestion" />}
        width={800}
      >
        <ReviewAiSuggestion
          onApproveSuggestion={() => onApproveSuggestion(open ?? '')}
          onDismissSuggestion={() => onDismissSuggestion(open ?? '')}
          suggestionId={open}
        />
      </Drawer>
    </>
  );
};

export default AiSuggestions;
