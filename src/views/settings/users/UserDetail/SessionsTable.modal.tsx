import type { ViewportData } from '#/types/DataType';
import type { IntlShape } from 'react-intl';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import FormatCalendar from '#/utils/format-calendar-24h';
import { useListSessionsQuery } from '#/views/settings/users/UserDetail/graphql/queries/__generated__/sessions.generated';
import { faLocationDot } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Table, Tag, Tooltip } from 'antd';
import { AppType } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import React, { useState } from 'react';

const SessionsTableModal = ({
  intl,
  open,
  saving,
  setViewport,
  userId,
}: {
  intl: IntlShape;
  open: boolean;
  saving: boolean;
  setViewport: (value: ViewportData | null) => void;
  userId: string;
}) => {
  const currentSchemeId = useAtomValue(currentSchemeIdAtom);
  const [typeFilter, setTypeFilter] = useState<AppType[]>([]);
  const { data, loading } = useListSessionsQuery({
    skip: !open,
    variables: {
      SessionWhere: {
        app:
          typeFilter.length > 0
            ? {
                in: typeFilter,
              }
            : undefined,
        scheme: {
          id: {
            equals: currentSchemeId,
          },
        },
      },
      where: {
        id: userId,
      },
    },
  });
  const AppTypeFilter = [
    {
      text: intl.formatMessage({
        defaultMessage: 'Web',
      }),
      value: AppType.Web,
    },
    {
      text: intl.formatMessage({
        defaultMessage: 'App',
      }),
      value: AppType.Native,
    },
  ];
  return (
    <Table
      // rowClassName={classes.row}
      columns={[
        {
          dataIndex: 'type',
          filters: AppTypeFilter,
          key: 'type',
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          onFilter: (value: AppType, record: { type: AppType }) =>
            record.type.includes(value),
          // eslint-disable-next-line no-confusing-arrow
          render: (_, record: { type: AppType }) =>
            record.type === AppType.Web ? (
              <Tag color="green">
                {intl.formatMessage({
                  defaultMessage: 'Web',
                })}
              </Tag>
            ) : (
              <Tag color="red">
                {intl.formatMessage({
                  defaultMessage: 'App',
                })}
              </Tag>
            ),
          title: intl.formatMessage({ defaultMessage: 'Type' }),
          width: 100,
        },
        {
          dataIndex: 'updatedAt',
          ellipsis: true,
          key: 'updatedAt',
          // eslint-disable-next-line no-confusing-arrow
          render: (value: Date) => (
            <Tooltip title={new Date(value).toLocaleString('en-GB')}>
              {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
              {FormatCalendar(new Date(value), true)}{' '}
              {new Date(value).toLocaleTimeString('en-GB')}
            </Tooltip>
          ),
          title: intl.formatMessage({ defaultMessage: 'At' }),
        },
        {
          dataIndex: 'completed',
          key: 'actions',
          // eslint-disable-next-line no-confusing-arrow
          render: (_, record: { viewport: ViewportData | undefined }) =>
            record.viewport ? (
              <Tooltip
                title={intl.formatMessage({
                  defaultMessage: 'View Session Location',
                })}
              >
                <Button
                  disabled={saving}
                  icon={<FontAwesomeIcon icon={faLocationDot} />}
                  onClick={() => {
                    if (record.viewport) setViewport(record.viewport);
                  }}
                  size="small"
                />
              </Tooltip>
            ) : undefined,
          width: 50,
        },
      ]}
      dataSource={
        data?.user.sessions.map((session) => ({
          key: session.id,
          type: session.app,
          updatedAt: session.createdAt,
          viewport:
            session.locationLat && session.locationLng
              ? {
                  latitude: session.locationLat,
                  longitude: session.locationLng,
                }
              : undefined,
        })) || []
      }
      loading={loading}
      onChange={(_, filters) => {
        console.log(filters);
        if (filters && filters.type) {
          setTypeFilter(filters.type as AppType[]);
        } else {
          setTypeFilter([]);
        }
      }}
      pagination={{
        hideOnSinglePage: true,
        pageSize: 10,
        total: data?.user.sessions.length || 0,
      }}
      size="small"
    />
  );
};

export default SessionsTableModal;
