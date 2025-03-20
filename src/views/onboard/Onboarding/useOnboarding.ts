import type { CurrentSchemeTermsQuery } from 'graphql/scheme/queries/__generated__/current-terms.generated';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { userIdAtom } from '#/providers/UserProvider/UserProvider';
import { notification } from 'antd';
import { useCurrentSchemeTermsQuery } from 'graphql/scheme/queries/__generated__/current-terms.generated';
import { useSignTermsMutation } from 'graphql/user/mutation/__generated__/sign-terms.generated';
import { useUpdateUserMutation } from 'graphql/user/mutation/__generated__/update_user.generated';
import { useAtomValue } from 'jotai/index';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { useStoreActions, useStoreState } from 'state';

export interface AccountData {
  fullName: string;
  incidentEmail: boolean;
  incidentPush: boolean;
  offenderEmail: boolean;
  offenderPush: boolean;
  subscribedIncidentOnly: boolean;
  subscribedOffenderOnly: boolean;
}

interface Return {
  accountDetail: AccountData | undefined;
  current: number;
  loading: boolean;
  name: string;
  onBack: () => void;
  onSubmit: () => void;
  saving: boolean;
  schemeTerms: CurrentSchemeTermsQuery | undefined;
  setCurrent: (value: number) => void;
  updateAccountDetail: (value: AccountData | undefined) => void;
  updateSchemeTermsSigned: (value: unknown) => void;
  updateTermsSigned: () => void;
}

const useOnboarding = (): Return => {
  const intl = useIntl();
  const userId = useAtomValue(userIdAtom);
  const schemeId = useAtomValue(currentSchemeIdAtom);
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
        description: intl.formatMessage({
          defaultMessage: 'Your account has been updated!',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Updated!',
        }),
        placement: 'bottomRight',
      });
      markTermsSigned();
      navigate('/app/dashboard');
    },
    onError: () => {
      setSaving(false);
      notification.error({
        description: intl.formatMessage({
          defaultMessage: 'Whoops, there are some errors. Please try again.',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Error!',
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
          chatWhere: {
            chat: {
              scheme: {
                id: {
                  equals: schemeId,
                },
              },
            },
          },
          data: {
            fullName: { set: accountDetail?.fullName },
            newUser: { set: false },
            termsExpire: { set: oneYearAway },
            termsSigned: { set: true },
            // status: { set: UserStatus.Active },
          },
          groupWhere: {
            scheme: {
              id: {
                equals: schemeId,
              },
            },
          },
          where: {
            id: userId,
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
        onCompleted: () => {
          void updateUser({
            variables: {
              chatWhere: {
                chat: {
                  scheme: {
                    id: {
                      equals: schemeId,
                    },
                  },
                },
              },
              data: {
                fullName: { set: accountDetail?.fullName || '' },
                newUser: { set: false },
                termsExpire: { set: oneYearAway },
                termsSigned: { set: true },
              },
              groupWhere: {
                scheme: {
                  id: {
                    equals: schemeId,
                  },
                },
              },
              where: {
                id: userId,
              },
            },
          });
        },
        variables: {
          data: {
            signature: schemeTermsSigned,
            termsId: SchemeTerms?.scheme?.currentTerms?.id || '',
          },
        },
      });
    }
  };

  return {
    accountDetail,
    current,
    loading: SchemeTermsLoading,
    name,
    onBack,
    onSubmit,
    saving,
    schemeTerms: SchemeTerms,
    setCurrent,
    updateAccountDetail,
    updateSchemeTermsSigned,
    updateTermsSigned,
  };
};

export default useOnboarding;
