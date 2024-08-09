import type { BusinessCrimeTypeGraphQueryVariables } from '#/components/reports/components/BusinessCrimeTypeGraph/__generated__/BusinessCrimeTypeGraph.generated';

import { useBusinessCrimeTypeGraphQuery } from '#/components/reports/components/BusinessCrimeTypeGraph/__generated__/BusinessCrimeTypeGraph.generated';
import { faTrash } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Typography } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

import MultiBarGraph from '../../graphs/multiBarGraph';

interface Props {
  editMode: boolean;
  isPrinting: boolean;
  onNavigate: () => void;
  removeItem: () => void;
  variables: BusinessCrimeTypeGraphQueryVariables;
}

const BusinessCrimeTypeGraph = ({
  editMode,
  isPrinting,
  onNavigate,
  removeItem,
  variables,
}: Props) => {
  const intl = useIntl();

  const { data } = useBusinessCrimeTypeGraphQuery({
    variables,
  });

  return (
    <>
      <Typography.Title level={4} style={{ fontWeight: 700 }}>
        {intl.formatMessage({
          defaultMessage: 'Business Incident Types',
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
      <MultiBarGraph
        data={data?.businessCrimeTypeGraph}
        emptyLabel={intl.formatMessage({
          defaultMessage: 'No Crime Types or Incidents',
        })}
        isPrinting={isPrinting}
        isStacked
        tooltip
      />
    </>
  );
};

export default BusinessCrimeTypeGraph;
