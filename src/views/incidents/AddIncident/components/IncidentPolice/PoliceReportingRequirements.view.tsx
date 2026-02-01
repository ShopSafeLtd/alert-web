import { CheckCircleFilled, ExclamationCircleFilled } from '@ant-design/icons';
import { Alert, List, Typography } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

import type { PoliceReportingRequirement } from '../../hooks/usePoliceReportingValidation';

interface Props {
  allRequirementsMet: boolean;
  completedCount: number;
  requirements: PoliceReportingRequirement[];
  totalCount: number;
}

const PoliceReportingRequirements = ({
  allRequirementsMet,
  completedCount,
  requirements,
  totalCount,
}: Props) => {
  const intl = useIntl();

  return (
    <Alert
      description={
        <>
          <List
            dataSource={requirements}
            renderItem={(req) => (
              <List.Item>
                {req.completed ? (
                  <CheckCircleFilled
                    style={{ color: '#52c41a', marginRight: 8 }}
                  />
                ) : (
                  <ExclamationCircleFilled
                    style={{ color: '#faad14', marginRight: 8 }}
                  />
                )}
                <Typography.Text>{req.label}</Typography.Text>
                {req.completed ? (
                  <Typography.Text
                    style={{ marginLeft: 'auto' }}
                    type="success"
                  >
                    {intl.formatMessage({ defaultMessage: 'Complete' })}
                  </Typography.Text>
                ) : (
                  <Typography.Text
                    style={{ marginLeft: 'auto' }}
                    type="warning"
                  >
                    {intl.formatMessage({ defaultMessage: 'Required' })}
                  </Typography.Text>
                )}
              </List.Item>
            )}
            size="small"
          />
          <Typography.Text style={{ display: 'block', marginTop: 8 }}>
            {intl.formatMessage(
              {
                defaultMessage: '{completed} of {total} requirements completed',
              },
              { completed: completedCount, total: totalCount }
            )}
          </Typography.Text>
        </>
      }
      message={intl.formatMessage({
        defaultMessage: 'Requirements to Report to Police',
      })}
      showIcon
      style={{ marginBottom: 16 }}
      type={allRequirementsMet ? 'success' : 'info'}
    />
  );
};

export default PoliceReportingRequirements;
