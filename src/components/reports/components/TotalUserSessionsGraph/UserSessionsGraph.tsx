import type { UserSessionsGraphQueryVariables } from '#/components/reports/components/TotalUserSessionsGraph/__generated__/UserSessionsGraph.generated';

import { useUserSessionsGraphQuery } from '#/components/reports/components/TotalUserSessionsGraph/__generated__/UserSessionsGraph.generated';
import { faTrash } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Typography } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

import RadialGraph from '../../graphs/radialGraph';

interface Props {
  editMode: boolean;
  isPrinting: boolean;
  onNavigate: () => void;
  removeItem: () => void;
  variables: UserSessionsGraphQueryVariables;
}

const UserSessionsGraph = ({
  editMode,
  isPrinting,
  onNavigate,
  removeItem,
  variables,
}: Props) => {
  const intl = useIntl();

  const { data } = useUserSessionsGraphQuery({
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

      <RadialGraph
        data={data?.userSessionsGraph}
        emptyLabel={intl.formatMessage({
          defaultMessage: 'No Users',
        })}
        isPrinting={isPrinting}
      />
    </>
  );
};

export default UserSessionsGraph;
