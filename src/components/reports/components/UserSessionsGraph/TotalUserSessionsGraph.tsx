import type { TotalUserSessionsGraphQueryVariables } from '#/components/reports/components/UserSessionsGraph/__generated__/TotalUserSessionsGraph.generated';
import type { Props } from 'react';

import { useTotalUserSessionsGraphQuery } from '#/components/reports/components/UserSessionsGraph/__generated__/TotalUserSessionsGraph.generated';
import { faTrash } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Typography } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

import { DonutGraph } from '../../graphs';

interface Props {
  editMode: boolean;
  isPrinting: boolean;
  onNavigate: () => void;
  removeItem: () => void;
  variables: TotalUserSessionsGraphQueryVariables;
}

const TotalUserSessionsGraph = ({
  editMode,
  isPrinting,
  onNavigate,
  removeItem,
  variables,
}: Props) => {
  const intl = useIntl();

  const { data } = useTotalUserSessionsGraphQuery({
    variables,
  });

  return (
    <>
      <Typography.Title level={4} style={{ fontWeight: 700 }}>
        {intl.formatMessage({
          defaultMessage: 'User Sessions',
        })}
      </Typography.Title>

      {editMode ? (
        <Button
          className="card-remove no-print"
          hidden={!editMode}
          icon={<FontAwesomeIcon color="red" icon={faTrash} size="lg" />}
          onClick={removeItem}
          shape="circle"
          size="small"
          type="text"
        />
      ) : (
        <Button
          className="change-graph1-view-more"
          danger
          onClick={onNavigate}
          // style={{ position: 'absolute', right: 5, top: 15, zIndex: 1 }}
          size="small"
          type="text"
        >
          {intl.formatMessage({
            defaultMessage: 'View More',
          })}
        </Button>
      )}

      <DonutGraph
        data={data?.totalUserSessionsGraph}
        emptyLabel={intl.formatMessage({
          defaultMessage: 'No Users',
        })}
        isPrinting={isPrinting}
      />
    </>
  );
};

export default TotalUserSessionsGraph;
