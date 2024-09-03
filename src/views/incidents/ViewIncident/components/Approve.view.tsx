import type { ViewIncidentQuery } from '#/views/incidents/ViewIncident/__generated__/view-incident.generated';

import { useStoreState } from '#/state';
import useStyles from '#/views/incidents/ViewIncident/ViewIncident.styles';
import useApproveIncident from '#/views/incidents/ViewIncident/useApproveIncident';
import { Button, Col, Row } from 'antd';
import { Role } from 'graphql/types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

interface Props {
  data: ViewIncidentQuery | undefined;
  incidentId: string;
}

const Approve = ({ data, incidentId }: Props) => {
  const classes = useStyles();
  const { approving, onApprove, onReject } = useApproveIncident({ incidentId });
  const userRole = useStoreState((state) => state.user.role);

  return data?.incident?.approved === false && userRole !== Role.User ? (
    <div className={classes.approveBar}>
      <Row gutter={8} justify="end">
        <Col>
          <Button disabled={approving} onClick={onReject} type="ghost">
            <FormattedMessage defaultMessage="Reject Incident" />
          </Button>
        </Col>
        <Col>
          <Button disabled={approving} onClick={onApprove} type="primary">
            <FormattedMessage defaultMessage="Approve Incident" />
          </Button>
        </Col>
      </Row>
    </div>
  ) : (
    <div />
  );
};

export default Approve;
