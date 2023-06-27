import React from 'react';

import { Card, Steps } from 'antd';
import AccountDetail from 'components/onboarding/Onboarding/AccountDetail';
import Terms from 'components/onboarding/Onboarding/Terms';
import { useIntl } from 'react-intl';
import { Route, Routes } from 'react-router-dom';
import type { CurrentSchemeTermsQuery } from '../../../graphql/generated';
import SchemeTerms from '../../../components/onboarding/Onboarding/SchemeTerms';

const { Step } = Steps;

interface AccountData {
  fullName: string;
}

interface Props {
  onSubmit: () => void;
  saving: boolean;
  current: number;
  setCurrent: (value: number) => void;
  onBack: () => void;
  updateAccountDetail: (value: AccountData | undefined) => void;
  updateTermsSigned: () => void;
  updateSchemeTermsSigned: (value: unknown) => void;
  loading: boolean;
  schemeTerms: CurrentSchemeTermsQuery | undefined;
  name: string;
}

const Onboarding = ({
  onSubmit,
  saving,
  current,
  setCurrent,
  onBack,
  updateAccountDetail,
  updateTermsSigned,
  loading,
  schemeTerms,
  updateSchemeTermsSigned,
  name,
}: Props): JSX.Element => {
  const intl = useIntl();
  return (
    <div className="page-container">
      <Card loading={loading}>
        <Steps
          type="navigation"
          current={current}
          className="site-navigation-steps"
        >
          <Step
            title={intl.formatMessage({
              defaultMessage: 'Account Details',
              id: 'mYx8sv',
            })}
          />
          <Step
            title={intl.formatMessage({
              defaultMessage: 'Terms & Conditions',
              id: 'arPp4e',
            })}
          />
          {schemeTerms?.scheme?.currentTerms?.id && (
            <Step
              title={intl.formatMessage({
                defaultMessage: 'Scheme Terms & Conditions',
                id: 'n6SkPt',
              })}
            />
          )}
        </Steps>
        <Routes>
          <Route
            index
            element={
              <AccountDetail
                update={updateAccountDetail}
                setCurrent={setCurrent}
              />
            }
          />
          {/* <Route
            path="/*"
            element={
              <Account
              // handleChange={handleDetailsChange}
              // values={details}
              // loading={loading}
              />
            }
          /> */}
          <Route
            path="terms-conditions"
            element={
              <Terms
                onSubmit={onSubmit}
                update={updateTermsSigned}
                saving={saving}
                onBack={onBack}
                setCurrent={setCurrent}
              />
            }
          />
          <Route
            path="scheme-terms-conditions"
            element={
              <SchemeTerms
                onSubmit={onSubmit}
                update={updateSchemeTermsSigned}
                updateBox={updateTermsSigned}
                saving={saving}
                setCurrent={setCurrent}
                content={schemeTerms?.scheme?.currentTerms?.content || ''}
                name={name}
              />
            }
          />
        </Routes>
      </Card>
    </div>
  );
};

export default Onboarding;
