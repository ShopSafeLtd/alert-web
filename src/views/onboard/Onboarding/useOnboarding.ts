import type { CurrentSchemeTermsQuery } from 'graphql/scheme/queries/__generated__/current-terms.generated';

import { currentSchemeAtom } from '#/providers/SchemeProvider/SchemeProvider';
import {
  currentUserAtom,
  userIdAtom,
} from '#/providers/UserProvider/UserProvider';
import { useAgreeTermsMutation } from '#/views/onboard/Onboarding/__generated__/agreeTerms.generated';
import { notification } from 'antd';
import { useCurrentSchemeTermsQuery } from 'graphql/scheme/queries/__generated__/current-terms.generated';
import { useSignTermsMutation } from 'graphql/user/mutation/__generated__/sign-terms.generated';
import { useAtomValue, useSetAtom } from 'jotai';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { useStoreActions } from 'state';

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
  current: number;
  loading: boolean;
  name: string;
  onBack: () => void;
  onSubmit: () => void;
  saving: boolean;
  schemeTerms: CurrentSchemeTermsQuery | undefined;
  setCurrent: (value: number) => void;
  updateSchemeTermsSigned: (value: unknown) => void;
  updateTermsSigned: () => void;
}

const useOnboarding = (): Return => {
  const intl = useIntl();
  const userId = useAtomValue(userIdAtom);
  const user = useAtomValue(currentUserAtom);

  const name = useAtomValue(currentUserAtom)?.fullName ?? '';
  const schemeId = useAtomValue(currentSchemeAtom)?.id ?? '';
  const [current, setCurrent] = useState(0);
  const [termsSigned, setTermsSigned] = useState(false);
  const [schemeTermsSigned, setSchemeTermsSigned] = useState('');
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const markTermsSigned = useStoreActions(
    (action) => action.user.userOnboarded
  );
  const newUser = useAtomValue(currentUserAtom)?.newUser;
  const setNewUser = useSetAtom(currentUserAtom);

  console.log('newUser', newUser);
  console.log(schemeId);

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

  const { data: SchemeTerms, loading } = useCurrentSchemeTermsQuery({
    skip: !schemeId,
    variables: {
      where: {
        id: schemeId,
      },
    },
  });

  const [agreeToTerms] = useAgreeTermsMutation({
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
      if (user) {
        setNewUser({
          ...user,
          newUser: false,
          termsExpired: false,
        });
      }
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

    if (SchemeTerms?.scheme?.currentTerms?.id) {
      if (current === 0) {
        onNext();
        setSaving(false);
        setTermsSigned(false);
      } else if (current === 1) {
        const oneYearAway = new Date();
        oneYearAway.setFullYear(oneYearAway.getFullYear() + 1);
        void signTerms({
          onCompleted: () => {
            void agreeToTerms({
              variables: {
                data: {
                  newUser: { set: false },
                  termsExpire: { set: oneYearAway },
                  termsSigned: { set: true },
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
    } else {
      const oneYearAway = new Date();
      oneYearAway.setFullYear(oneYearAway.getFullYear() + 1);
      void agreeToTerms({
        variables: {
          data: {
            newUser: { set: false },
            termsExpire: { set: oneYearAway },
            termsSigned: { set: true },
          },
          where: {
            id: userId,
          },
        },
      });
    }
  };

  return {
    current,
    loading: !schemeId || loading,
    name,
    onBack,
    onSubmit,
    saving,
    schemeTerms: SchemeTerms,
    setCurrent,
    updateSchemeTermsSigned,
    updateTermsSigned,
  };
};

export default useOnboarding;
