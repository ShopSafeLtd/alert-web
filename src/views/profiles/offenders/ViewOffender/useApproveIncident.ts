import { Modal, notification } from 'antd';
import { useRecycleOffenderMutation } from 'graphql/offenders/mutations/__generated__/recycle-offender.generated';
import { useUpdateOffenderMutation } from 'graphql/offenders/mutations/__generated__/update-offender.generated';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router';
import errorNotification from 'types/mutation_notifications/error_notification';

const { confirm } = Modal;

interface Props {
  offenderId: string;
}

interface Return {
  approving: boolean;
  onApprove: () => void;
  onReject: () => void;
}

const useApproveOffender = ({ offenderId }: Props): Return => {
  const intl = useIntl();
  const navigate = useNavigate();

  const [approving, setApproving] = useState(false);

  const [updateOffender] = useUpdateOffenderMutation({
    onCompleted: () => {
      setApproving(false);
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'The Offender has been approved!',
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

  // delete offender
  const [recycleOffender] = useRecycleOffenderMutation({
    onCompleted: () => {
      setApproving(false);
      navigate('/app/offenders');
      notification.success({
        description: intl.formatMessage({
          defaultMessage:
            'The offender has been deleted from the feed and moved to the recycle bin.',
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
      title: intl.formatMessage({
        defaultMessage: 'Are you sure?',
      }),
    });
  };

  const onApprove = () => {
    setApproving(true);
    void updateOffender({
      variables: {
        data: {
          approved: { set: true },
        },
        where: {
          id: offenderId,
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

export default useApproveOffender;
