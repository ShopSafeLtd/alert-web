import { useState } from 'react';

import { notification } from 'antd';

import { useStoreActions, useStoreState } from 'state';

import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import type { CurrentSchemeTermsQuery } from 'graphql/scheme/queries/current-terms.generated';
import { useCurrentSchemeTermsQuery } from 'graphql/scheme/queries/current-terms.generated';
import { useSignTermsMutation } from 'graphql/user/mutation/sign-terms.generated';
import { useUpdateUserMutation } from 'graphql/user/mutation/update_user.generated';

export interface AccountData {
  fullName: string;
  subscribedIncidentOnly: boolean;
  incidentEmail: boolean;
  incidentPush: boolean;
  subscribedOffenderOnly: boolean;
  offenderEmail: boolean;
  offenderPush: boolean;
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
  accountDetail: AccountData | undefined;
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
  const { fullName } = useStoreState((state) => state.user);
  const markTermsSigned = useStoreActions(
    (action) => action.user.userOnboarded
  );

  const name = accountDetail?.fullName || fullName || '';
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

  const updateAccountDetail = (value: AccountData | undefined) => {
    setAccountDetail(value);
    if (
      SchemeTerms?.scheme?.currentTerms?.id &&
      (value?.fullName || fullName)
    ) {
      setSchemeTermsSigned(`<svg xmlns="http://www.w3.org/2000/svg" style="background:#ffffff00" height="100" width="300" viewBox="0 0 300 100" class="signature-svg" data-reactroot=""><text x="20" y="60" font-family="Caveat" font-size="30" fill="black">
      ${value?.fullName || fullName}
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
        }),
        description: intl.formatMessage({
          defaultMessage: 'Your account has been updated!',
        }),
        placement: 'bottomRight',
      });
      markTermsSigned();
      navigate('/app/dashboard');
    },
    onError: () => {
      setSaving(false);
      notification.error({
        message: intl.formatMessage({
          defaultMessage: 'Error!',
        }),
        description: intl.formatMessage({
          defaultMessage: 'Whoops, there are some errors. Please try again.',
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
        setTermsSigned(false);
      }
    } else if (
      termsSigned &&
      accountDetail &&
      !SchemeTerms?.scheme?.currentTerms?.id
    ) {
      const oneYearAway = new Date();
      oneYearAway.setFullYear(oneYearAway.getFullYear() + 1);
      void updateUser({
        variables: {
          where: {
            id: userId,
          },
          data: {
            fullName: { set: accountDetail?.fullName },
            termsSigned: { set: true },
            newUser: { set: false },
            termsExpire: { set: oneYearAway },
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
      const oneYearAway = new Date();
      oneYearAway.setFullYear(oneYearAway.getFullYear() + 1);
      void signTerms({
        variables: {
          data: {
            signature: schemeTermsSigned,
            termsId: SchemeTerms?.scheme?.currentTerms?.id || '',
          },
        },
        onCompleted: () => {
          void updateUser({
            variables: {
              where: {
                id: userId,
              },
              data: {
                fullName: { set: accountDetail?.fullName || '' },
                termsSigned: { set: true },
                newUser: { set: false },
                termsExpire: { set: oneYearAway },
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
    accountDetail,
  };
};

export default useOnboarding;
