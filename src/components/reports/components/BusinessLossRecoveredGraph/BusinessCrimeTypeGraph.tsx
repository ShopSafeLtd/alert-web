import type { BusinessLossRecoveredGraphQueryVariables } from '#/components/reports/components/BusinessLossRecoveredGraph/__generated__/BusinessLossRecoveredGraph.generated';

import { useBusinessLossRecoveredGraphQuery } from '#/components/reports/components/BusinessLossRecoveredGraph/__generated__/BusinessLossRecoveredGraph.generated';
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
  variables: BusinessLossRecoveredGraphQueryVariables;
}

const BusinessLossRecoveredGraph = ({
  editMode,
  isPrinting,
  onNavigate,
  removeItem,
  variables,
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
        data={data?.businessLossRecoveredGraph}
        emptyLabel={intl.formatMessage({
          defaultMessage: 'No Incident Types',
        })}
        isPrinting={isPrinting}
        valueSymbol="£"
      />
    </>
  );
};

export default BusinessLossRecoveredGraph;
