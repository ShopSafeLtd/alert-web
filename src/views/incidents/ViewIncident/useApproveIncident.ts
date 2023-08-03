import { useState } from 'react';
import {
  useRecycleIncidentMutation,
  useUpdateIncidentMutation,
} from 'graphql/generated';
import { notification, Modal } from 'antd';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router';
import errorNotification from 'types/error_notification';

const { confirm } = Modal;

interface Props {
  incidentId: string;
}

interface Return {
  onReject: () => void;
  onApprove: () => void;
  approving: boolean;
}

const useApproveIncident = ({ incidentId }: Props): Return => {
  const intl = useIntl();
  const navigate = useNavigate();

  const [approving, setApproving] = useState(false);

  const [updateIncident] = useUpdateIncidentMutation({
    onCompleted: () => {
      setApproving(false);
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Successfully Approved',
          id: 'DWgpGc',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The Incident has been approved!',
          id: '05bSdr',
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
      navigate(`/app/incidents`);
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Successfully Rejected!',
          id: 'C0DMPx',
        }),
        description: intl.formatMessage({
          defaultMessage:
            'The incident has been deleted from the feed and moved to the recycle bin.',
          id: 'YagqVR',
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
      title: intl.formatMessage({
        defaultMessage: 'Are you sure?',
        id: '2oCaym',
      }),
      content: intl.formatMessage({
        defaultMessage:
          'Click reject if you wish to reject the approving of this incident. It will be removed from the feed and added to the recycle bin for 30 days before being permanently deleted.',
        id: '51xeBs',
      }),
      okText: intl.formatMessage({ defaultMessage: 'Reject', id: 'VzIOKf' }),
      onOk() {
        setApproving(true);
        void recycleIncident({
          variables: {
            where: { id: incidentId },
          },
        });
      },
    });
  };

  const onApprove = () => {
    setApproving(true);
    void updateIncident({
      variables: {
        where: {
          id: incidentId,
        },
        data: {
          approved: { set: true },
        },
      },
    });
  };

  return {
    onReject,
    onApprove,
    approving,
  };
};

export default useApproveIncident;
