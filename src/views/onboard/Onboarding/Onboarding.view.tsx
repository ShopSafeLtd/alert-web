import React from 'react';

import { Steps, Card } from 'antd';
import AccountDetail from 'components/onboarding/AccountDetail';
import Terms from 'components/onboarding/Terms';
import { Route, Routes } from 'react-router';
// import { Link } from 'react-router-dom';

const { Step } = Steps;

interface AccountData {
  fullName: string;
  organisation: string;
  postcode: string;
  street: string;
  townCity: string;
  building: string | null;
  county: string | null;
}
interface Props {
  onSubmit: () => void;
  saving: boolean;
  current: number;
  setCurrent: (value: number) => void;
  // onNext: () => void;
  onBack: () => void;
  updateAccountDetail: (value: AccountData | undefined) => void;
  updateTermsSigned: () => void;
}

const Onboarding = ({
  onSubmit,
  saving,
  current,
  setCurrent,
  // onNext,
  onBack,
  updateAccountDetail,
  updateTermsSigned,
}: Props): JSX.Element => (
  <div className="page-container">
    <Card>
      <Steps
        type="navigation"
        current={current}
        className="site-navigation-steps"
      >
        <Step title="Account Details" />
        <Step title="Terms & Conditions" />
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
              hideForm={false}
            />
          }
        />
      </Routes>
    </Card>
  </div>
);

export default Onboarding;
