import { useState } from 'react';
import {
  useRecycleOffenderMutation,
  useUpdateOffenderMutation,
} from 'graphql/generated';
import { notification, Modal } from 'antd';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router';
import errorNotification from 'types/error_notification';

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
          id: 'DWgpGc',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The Offender has been approved!',
          id: 'ZU5DGM',
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
      navigate(`/app/offenders`);
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Successfully Rejected!',
          id: 'C0DMPx',
        }),
        description: intl.formatMessage({
          defaultMessage:
            'The offender has been deleted from the feed and moved to the recycle bin.',
          id: 'nQ1eW+',
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
          'Click reject if you wish to reject the approving of this offender. It will be removed from the feed and added to the recycle bin for 30 days before being permanently deleted.',
        id: '5YfZun',
      }),
      okText: intl.formatMessage({ defaultMessage: 'Reject', id: 'VzIOKf' }),
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
