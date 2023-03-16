import { useState } from 'react';

import { notification } from 'antd';

import { useStoreState } from 'state';
import { useUpdateUserMutation } from 'graphql/generated';
import { useNavigate } from 'react-router-dom';

interface AccountData {
  fullName: string;
}
interface Return {
  onSubmit: () => void;
  saving: boolean;
  current: number;
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
  const navigate = useNavigate();

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
      navigate('/app/dashboard');
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
      setSaving(false);
    }

    if (termsSigned && accountDetail) {
      updateUser({
        variables: {
          where: {
            id: userId,
          },
          data: {
            fullName: { set: accountDetail.fullName },
            termsSigned: { set: true },
            newUser: { set: false },
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
    onBack,
    updateAccountDetail,
    updateTermsSigned,
  };
};

export default useOnboarding;
