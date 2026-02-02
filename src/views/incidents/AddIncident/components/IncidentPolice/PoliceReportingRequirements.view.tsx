import { CheckCircleFilled, ExclamationCircleFilled } from '@ant-design/icons';
import { Alert, Col, Row, Typography } from 'antd';
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
          <Row gutter={[16, 12]}>
            {requirements.map((req) => (
              <Col key={req.id} md={6} sm={12} xs={24}>
                <div style={{ alignItems: 'center', display: 'flex' }}>
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
                </div>
              </Col>
            ))}
          </Row>
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
