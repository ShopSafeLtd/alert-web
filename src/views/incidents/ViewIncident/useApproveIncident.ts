import { Modal, notification } from 'antd';
import { useRecycleIncidentMutation } from 'graphql/incidents/mutations/__generated__/recycle-incident.generated';
import { useUpdateIncidentMutation } from 'graphql/incidents/mutations/__generated__/update-incident.generated';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router';
import errorNotification from 'types/mutation_notifications/error_notification';

const { confirm } = Modal;

interface Props {
  incidentId: string;
}

interface Return {
  approving: boolean;
  onApprove: () => void;
  onReject: () => void;
}

const useApproveIncident = ({ incidentId }: Props): Return => {
  const intl = useIntl();
  const navigate = useNavigate();
  const [approving, setApproving] = useState(false);

  const [updateIncident] = useUpdateIncidentMutation({
    onCompleted: () => {
      setApproving(false);
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'The Incident has been approved!',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Approved',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setApproving(false);
      errorNotification();
    },
  });

  // delete incident
  const [recycleIncident] = useRecycleIncidentMutation({
    onCompleted: () => {
      setApproving(false);
      navigate('/app/incidents');
      notification.success({
        description: intl.formatMessage({
          defaultMessage:
            'The incident has been deleted from the feed and moved to the recycle bin.',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Rejected!',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setApproving(false);
      errorNotification();
    },
  });
  const onReject = () => {
    confirm({
      content: intl.formatMessage({
        defaultMessage:
          'Click reject if you wish to reject the approving of this incident. It will be removed from the feed and added to the recycle bin for 30 days before being permanently deleted.',
      }),
      okText: intl.formatMessage({ defaultMessage: 'Reject' }),
      onOk() {
        setApproving(true);
        void recycleIncident({
          variables: {
            where: { id: incidentId },
          },
        });
      },
      title: intl.formatMessage({
        defaultMessage: 'Are you sure?',
      }),
    });
  };

  const onApprove = () => {
    setApproving(true);
    void updateIncident({
      variables: {
        data: {
          approved: { set: true },
        },
        where: {
          id: incidentId,
        },
      },
    });
  };

  return {
    approving,
    onApprove,
    onReject,
  };
};

export default useApproveIncident;
