import type { CurrentSchemeTermsQuery } from 'graphql/scheme/queries/__generated__/current-terms.generated';

import AccountDetail from '#/components/onboarding/Onboarding/AccountDetail/AccountDetail.container';
import SchemeTerms from '#/components/onboarding/Onboarding/SchemeTerms';
import Terms from '#/components/onboarding/Onboarding/Terms/Terms.view';
import { Card, Steps } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

import type { AccountData } from './useOnboarding';

interface Props {
  accountDetail: AccountData | undefined;
  current: number;
  loading: boolean;
  name: string;
  onBack: () => void;
  onSubmit: () => void;
  saving: boolean;
  schemeTerms: CurrentSchemeTermsQuery | undefined;
  updateAccountDetail: (value: AccountData | undefined) => void;
  updateSchemeTermsSigned: (value: unknown) => void;
  updateTermsSigned: () => void;
}

const Onboarding = ({
  accountDetail,
  current,
  loading,
  name,
  onBack,
  onSubmit,
  saving,
  schemeTerms,
  updateAccountDetail,
  updateSchemeTermsSigned,
  updateTermsSigned,
}: Props): JSX.Element => {
  const intl = useIntl();
  return (
    <div className="page-container">
      <Card loading={loading}>
        <Steps
          className="site-navigation-steps"
          current={current}
          items={[
            {
              title: intl.formatMessage({
                defaultMessage: 'Account Details',
              }),
            },
            {
              title: intl.formatMessage({
                defaultMessage: 'Terms & Conditions',
              }),
            },
            {
              title: intl.formatMessage({
                defaultMessage: 'Scheme Terms & Conditions',
              }),
            },
          ]}
          type="navigation"
        />

        {current === 0 && (
          <AccountDetail
            accountDetail={accountDetail}
            update={updateAccountDetail}
          />
        )}
        {current === 1 && (
          <Terms
            onBack={onBack}
            onSubmit={onSubmit}
            saving={saving}
            update={updateTermsSigned}
          />
        )}
        {current === 2 && (
          <SchemeTerms
            content={schemeTerms?.scheme?.currentTerms?.content || ''}
            name={name}
            onBack={onBack}
            onSubmit={onSubmit}
            saving={saving}
            update={updateSchemeTermsSigned}
            updateBox={updateTermsSigned}
          />
        )}
      </Card>
    </div>
  );
};

export default Onboarding;
