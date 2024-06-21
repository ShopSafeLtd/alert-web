import { useState } from 'react';

import { notification, Modal } from 'antd';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router';
import errorNotification from 'types/mutation_notifications/error_notification';
import { useUpdateOffenderMutation } from 'graphql/offenders/mutations/update-offender.generated';
import { useRecycleOffenderMutation } from 'graphql/offenders/mutations/recycle-offender.generated';

const { confirm } = Modal;

interface Props {
  offenderId: string;
}

interface Return {
  onReject: () => void;
  onApprove: () => void;
  approving: boolean;
}

const useApproveOffender = ({ offenderId }: Props): Return => {
  const intl = useIntl();
  const navigate = useNavigate();

  const [approving, setApproving] = useState(false);

  const [updateOffender] = useUpdateOffenderMutation({
    onCompleted: () => {
      setApproving(false);
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Successfully Approved',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The Offender has been approved!',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setApproving(false);
      errorNotification();
    },
  });

  // delete offender
  const [recycleOffender] = useRecycleOffenderMutation({
    onCompleted: () => {
      setApproving(false);
      navigate('/app/offenders');
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Successfully Rejected!',
        }),
        description: intl.formatMessage({
          defaultMessage:
            'The offender has been deleted from the feed and moved to the recycle bin.',
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
      }),
      content: intl.formatMessage({
        defaultMessage:
          'Click reject if you wish to reject the approving of this offender. It will be removed from the feed and added to the recycle bin for 30 days before being permanently deleted.',
      }),
      okText: intl.formatMessage({ defaultMessage: 'Reject' }),
      onOk() {
        setApproving(true);
        void recycleOffender({
          variables: {
            where: { id: offenderId },
          },
        });
      },
    });
  };

  const onApprove = () => {
    setApproving(true);
    void updateOffender({
      variables: {
        where: {
          id: offenderId,
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

export default useApproveOffender;
