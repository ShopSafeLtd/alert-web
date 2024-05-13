import React from 'react';
import { Button, Typography } from 'antd';
import type { BusinessLossRecoveredGraphQueryVariables } from 'graphql/generated';
import { useBusinessLossRecoveredGraphQuery } from 'graphql/generated';
import { useIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/pro-light-svg-icons';
import MultiBarGraph from '../../graphs/multiBarGraph';

interface Props {
  isPrinting: boolean;
  editMode: boolean;
  variables: BusinessLossRecoveredGraphQueryVariables;
  removeItem: () => void;
  onNavigate: () => void;
}

const BusinessLossRecoveredGraph = ({
  isPrinting,
  variables,
  editMode,
  removeItem,
  onNavigate,
}: Props) => {
  const intl = useIntl();

  const { data } = useBusinessLossRecoveredGraphQuery({
    variables,
  });

  return (
    <>
      <Typography.Title level={4} style={{ fontWeight: 700 }}>
        {intl.formatMessage({
          defaultMessage: 'Business Loss Recovered Graph',
          id: 'O7e2dP',
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
            id: 'QQSdHP',
          })}
        </Button>
      )}
      <MultiBarGraph
        isPrinting={isPrinting}
        data={data?.businessLossRecoveredGraph}
        emptyLabel={intl.formatMessage({
          defaultMessage: 'No Incidents',
          id: '+nJOH5',
        })}
        valueSymbol="£"
      />
    </>
  );
};

export default BusinessLossRecoveredGraph;
