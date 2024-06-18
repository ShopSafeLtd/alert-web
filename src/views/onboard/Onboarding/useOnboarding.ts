import { useMemo, useState } from 'react';

import { notification } from 'antd';

import { useStoreState } from 'state';
import type { CurrentSchemeTermsQuery } from 'graphql/generated';
import {
  useCurrentSchemeTermsQuery,
  useSignTermsMutation,
  useUpdateUserMutation,
} from 'graphql/generated';
import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';

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
  loading: boolean;
  schemeTerms: CurrentSchemeTermsQuery | undefined;
  updateSchemeTermsSigned: (value: unknown) => void;
  name: string;
}

const useOnboarding = (): Return => {
  const intl = useIntl();
  const userId = useStoreState((state) => state.user.id);
  const schemeId = useStoreState((state) => state.scheme.id);
  const [current, setCurrent] = useState(0);
  const [accountDetail, setAccountDetail] = useState<AccountData | undefined>();
  const [termsSigned, setTermsSigned] = useState(false);
  const [schemeTermsSigned, setSchemeTermsSigned] = useState('');
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const onNext = () => {
    // if (current < 2) {
    setCurrent(current + 1);
    // } else {
    //   setCurrent(1);
    // }
  };

  const onBack = () => {
    if (current > 0) {
      setCurrent(current - 1);
    } else {
      setCurrent(0);
    }
  };

  const updateTermsSigned = () => setTermsSigned(!termsSigned);
  const updateSchemeTermsSigned = (arg0: unknown) =>
    setSchemeTermsSigned(arg0 as string);

  const [signTerms] = useSignTermsMutation();

  const { data: SchemeTerms, loading: SchemeTermsLoading } =
    useCurrentSchemeTermsQuery({
      variables: {
        where: {
          id: schemeId,
        },
      },
    });
  const name = useMemo(
    () => accountDetail?.fullName || '',
    [accountDetail?.fullName]
  );
  const updateAccountDetail = (value: AccountData | undefined) => {
    setAccountDetail(value);
    if (SchemeTerms?.scheme?.currentTerms?.id && (value?.fullName || name)) {
      setSchemeTermsSigned(`<svg xmlns="http://www.w3.org/2000/svg" style="background:#ffffff00" height="100" width="300" viewBox="0 0 300 100" class="signature-svg" data-reactroot=""><text x="20" y="60" font-family="Caveat" font-size="30" fill="black">
      ${value?.fullName || name}
</text></svg>`);
    }
    onNext();
  };
  const [updateUser] = useUpdateUserMutation({
    onCompleted: () => {
      setSaving(false);
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Successfully Updated!',
          id: 'w5Yfkf',
        }),
        description: intl.formatMessage({
          defaultMessage: 'Your account has been updated!',
          id: 'W19COr',
        }),
        placement: 'bottomRight',
      });
      navigate('/app/dashboard');
    },
    onError: () => {
      setSaving(false);
      notification.error({
        message: intl.formatMessage({
          defaultMessage: 'Error!',
          id: 'DIDBlF',
        }),
        description: intl.formatMessage({
          defaultMessage: 'Whoops, there are some errors. Please try again.',
          id: 'tPB3Wl',
        }),
        placement: 'bottomRight',
      });
    },
  });

  const onSubmit = () => {
    setSaving(true);
    if (!termsSigned) {
      setSaving(false);
    }

    if (SchemeTerms?.scheme?.currentTerms?.id && current === 1) {
      if (termsSigned) {
        onNext();
        setSaving(false);

        navigate('/app/onboarding/scheme-terms-conditions');
        setTermsSigned(false);
      }
    } else if (
      termsSigned &&
      accountDetail &&
      !SchemeTerms?.scheme?.currentTerms?.id
    ) {
      void updateUser({
        variables: {
          where: {
            id: userId,
          },
          data: {
            fullName: { set: accountDetail?.fullName },
            termsSigned: { set: true },
            newUser: { set: false },
            // status: { set: UserStatus.Active },
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

    if (
      schemeTermsSigned &&
      current === 2 &&
      SchemeTerms?.scheme?.currentTerms?.id
    ) {
      void signTerms({
        variables: {
          data: {
            signature: schemeTermsSigned,
            termsId: SchemeTerms?.scheme?.currentTerms?.id || '',
          },
        },
      });
      void updateUser({
        variables: {
          where: {
            id: userId,
          },
          data: {
            fullName: { set: accountDetail?.fullName || '' },
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
    loading: SchemeTermsLoading,
    schemeTerms: SchemeTerms,
    updateSchemeTermsSigned,
    name,
  };
};

export default useOnboarding;
