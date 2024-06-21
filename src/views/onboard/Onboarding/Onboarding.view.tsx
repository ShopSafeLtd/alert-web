import React from 'react';
import { useIntl } from 'react-intl';

import { Card, Steps } from 'antd';
import AccountDetail from '#/components/onboarding/Onboarding/AccountDetail/AccountDetail.container';
import Terms from '#/components/onboarding/Onboarding/Terms/Terms.view';
import SchemeTerms from '#/components/onboarding/Onboarding/SchemeTerms';
import type { AccountData } from './useOnboarding';
import type { CurrentSchemeTermsQuery } from 'graphql/scheme/queries/current-terms.generated';

interface Props {
  onSubmit: () => void;
  saving: boolean;
  current: number;
  onBack: () => void;
  updateAccountDetail: (value: AccountData | undefined) => void;
  updateTermsSigned: () => void;
  updateSchemeTermsSigned: (value: unknown) => void;
  loading: boolean;
  schemeTerms: CurrentSchemeTermsQuery | undefined;
  name: string;
  accountDetail: AccountData | undefined;
}

const Onboarding = ({
  onSubmit,
  saving,
  current,
  onBack,
  updateAccountDetail,
  updateTermsSigned,
  loading,
  schemeTerms,
  updateSchemeTermsSigned,
  name,
  accountDetail,
}: Props): JSX.Element => {
  const intl = useIntl();
  return (
    <div className="page-container">
      <Card loading={loading}>
        <Steps
          type="navigation"
          current={current}
          className="site-navigation-steps"
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
        />

        {current === 0 && (
          <AccountDetail
            update={updateAccountDetail}
            accountDetail={accountDetail}
          />
        )}
        {current === 1 && (
          <Terms
            onSubmit={onSubmit}
            update={updateTermsSigned}
            saving={saving}
            onBack={onBack}
          />
        )}
        {current === 2 && (
          <SchemeTerms
            onSubmit={onSubmit}
            update={updateSchemeTermsSigned}
            updateBox={updateTermsSigned}
            saving={saving}
            onBack={onBack}
            content={schemeTerms?.scheme?.currentTerms?.content || ''}
            name={name}
          />
        )}
      </Card>
    </div>
  );
};

export default Onboarding;
