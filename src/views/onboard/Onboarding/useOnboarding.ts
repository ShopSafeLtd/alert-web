import { useState } from 'react';

import { Modal, notification } from 'antd';

import { useStoreState } from 'state';
import { useCurrentUserQuery, useUpdateUserMutation } from 'graphql/generated';

interface AccountData {
  fullName: string;
  organisation: string;
  postcode: string;
  street: string;
  townCity: string;
  building: string | null;
  county: string | null;
}
interface Return {
  onSubmit: () => void;
  saving: boolean;
  current: number;
  // onNext: () => void;
  onBack: () => void;
  updateAccountDetail: (value: AccountData | undefined) => void;
  updateTermsSigned: () => void;
  setCurrent: (value: number) => void;
}

const useOnboarding = (): Return => {
  const userId = useStoreState((state) => state.user.id);
  const schemeId = useStoreState((state) => state.scheme.id);
  const [current, setCurrent] = useState(0);
  const [accountDetail, setAccountDetail] = useState<AccountData | undefined>();
  const [termsSigned, setTermsSigned] = useState(false);
  const [saving, setSaving] = useState(false);

  const { data: userData } = useCurrentUserQuery({
    fetchPolicy: 'cache-and-network',
  });
  const onNext = () => {
    if (current < 1) {
      setCurrent(current + 1);
    } else {
      setCurrent(1);
    }
  };

  const onBack = () => {
    if (current > 1) {
      setCurrent(current - 1);
    } else {
      setCurrent(0);
    }
  };

  const updateAccountDetail = (value: AccountData | undefined) => {
    setAccountDetail(value);
    onNext();
  };

  const updateTermsSigned = () => setTermsSigned(!termsSigned);

  const [updateUser] = useUpdateUserMutation({
    onCompleted: () => {
      setSaving(false);
      notification.success({
        message: 'Successfully Updated!',
        description: 'Your account has been updated! ',
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      notification.error({
        message: 'Error!',
        description: 'Whoops, there are some errors. Please try again. ',
        placement: 'bottomRight',
      });
    },
  });

  const onSubmit = () => {
    setSaving(true);
    if (!termsSigned) {
      Modal.warning({
        title: 'Please agree to the terms and conditions!',
      });
      setSaving(false);
    } else if (termsSigned && accountDetail) {
      updateUser({
        variables: {
          where: {
            id: userId,
          },
          data: {
            fullName: { set: accountDetail.fullName },
            organisation: { set: accountDetail.organisation },
            addresses: {
              update: [
                {
                  data: {
                    postcode: { set: accountDetail.postcode },
                    street: { set: accountDetail.street },
                    townCity: { set: accountDetail.townCity },
                    building: { set: accountDetail.building || '' },
                    county: { set: accountDetail.county || '' },
                  },
                  where: {
                    id: userData?.currentUser?.addresses[0].id,
                  },
                },
              ],
            },
          },
          groupWhere: {
            scheme: {
              id: {
                equals: schemeId,
              },
            },
          },
          chatWhere: {
            chat: {
              scheme: {
                id: {
                  equals: schemeId,
                },
              },
            },
          },
        },
      });
    }
  };

  return {
    onSubmit,
    saving,
    current,
    setCurrent,
    // onNext,
    onBack,
    updateAccountDetail,
    updateTermsSigned,
  };
};

export default useOnboarding;
