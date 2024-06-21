import React from 'react';
import { Button, Typography } from 'antd';

import { useIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/pro-light-svg-icons';
import MultiBarGraph from '../../graphs/multiBarGraph';
import type { BusinessCrimeTypeGraphQueryVariables } from './BusinessCrimeTypeGraph.generated';
import { useBusinessCrimeTypeGraphQuery } from './BusinessCrimeTypeGraph.generated';

interface Props {
  editMode: boolean;
  variables: BusinessCrimeTypeGraphQueryVariables;
  removeItem: () => void;
  onNavigate: () => void;
  isPrinting: boolean;
}

const BusinessCrimeTypeGraph = ({
  variables,
  editMode,
  removeItem,
  onNavigate,
  isPrinting,
}: Props) => {
  const intl = useIntl();

  const { data } = useBusinessCrimeTypeGraphQuery({
    variables,
  });

  return (
    <>
      <Typography.Title level={4} style={{ fontWeight: 700 }}>
        {intl.formatMessage({
          defaultMessage: 'Business Crime Types',
        })}
      </Typography.Title>

      {editMode ? (
        <Button
          type="text"
          shape="circle"
          className="card-remove no-print"
          hidden={!editMode}
          icon={<FontAwesomeIcon icon={faTrash} color="red" size="lg" />}
          size="small"
          onClick={removeItem}
        />
      ) : (
        <Button
          type="text"
          className="change-graph1-view-more"
          // style={{ position: 'absolute', right: 5, top: 15, zIndex: 1 }}
          size="small"
          onClick={onNavigate}
          danger
        >
          {intl.formatMessage({
            defaultMessage: 'View More',
          })}
        </Button>
      )}
      <MultiBarGraph
        isPrinting={isPrinting}
        tooltip
        data={data?.businessCrimeTypeGraph}
        emptyLabel={intl.formatMessage({
          defaultMessage: 'No Crime Types or Incidents',
        })}
        isStacked
      />
    </>
  );
};

export default BusinessCrimeTypeGraph;
