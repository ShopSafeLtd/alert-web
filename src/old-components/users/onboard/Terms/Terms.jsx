import React, { PureComponent } from 'react';
import styled from 'styled-components';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';

import { HeaderText, HeaderSubText } from '../../../global/forms';
import { ErrorText } from '../../../global/typography';

const Page = styled.div`
  width: 100%;
  padding: 0px 0px 60px;
  overflow: auto;
  @media (min-width: 1024px) {
    padding: 0px;
  }
`;
const Header = styled.div`
  @media (min-width: 1024px) {
    padding: 0px 0px 10px;
  }
`;
const TermsText = styled(Typography)`
  color: rgba(0, 0, 0, 0.54);
  padding: 1rem;
  overflow: auto;
  font-size: 12px;
`;
const TermsContainer = styled.div`
  height: calc(100vh - 280px);
  margin-top: 10px;
  margin-bottom: 20px;
  overflow: auto;
  @media (min-width: 1024px) {
    border: 1px solid #e0e0e0;
    height: auto;
  }
`;
const CheckboxRow = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const TermSubHeader = styled.div`
  font-weight: 600;
`;

class Terms extends PureComponent {
  render() {
    const {
      values: { termsSigned, error },
      handleChange
    } = this.props;
    return (
      <Page>
        <Header>
          <HeaderText>Terms of Use</HeaderText>
          <HeaderSubText>
            Please read through our terms and conditions and accept them to
            continue.
          </HeaderSubText>
        </Header>
        {!!error && <ErrorText>{error}</ErrorText>}
        <TermsContainer>
          <TermsText>
            By accessing Alert! you agree to these Terms of Use.
            <br />
            These Terms of Use govern your access and use of the Services.
            <br />
            These Terms of Use include your specific responsibilities to comply
            to the General Data Protection Regulations.
            <br />
            Using the App and the data contained has specific responsibilities
            to which you have here agreed to abide.
            <br />
            You have agreed to allow us to process your Personal Data.
            <br />
            You have confirmed a Legitimate Interest to access and use Alert!
            and are over 18 years of age.
            <br />
            <br />
            <TermSubHeader>1 The Services</TermSubHeader>
            <br />
            <br />
            Alert! provides:
            <br />
            1.1 A secure information sharing, and management system deployed
            over the internet for the purposes of crime prevention, crime
            reduction, asset protection and staff security. As an aid in the
            apprehension of offenders by reporting acts of crime and anti-social
            behaviour.
            <br />
            1.2 Images ….
            <br />
            1.3 Messages ….
            <br />
            1.4 Alert! undertakes the role of Data Processor.
            <br />
            <br />
            <TermSubHeader>2 Data Protection</TermSubHeader>
            <br />
            <br />
            2.1 Personal Data:
            <br />
            2.1.1 ShopSafe may process your personal data for the purposes of
            performing our obligations under the Agreement and to enable us to
            provide the Services. In particular for the following purposes:
            <br />
            <ul>
              <li>To manage your access to the Services</li>
              <li>To ensure compliance to the Data Protection Laws</li>
              <li>
                To update you about new features, additional services and the
                activities of Alert!
              </li>
            </ul>
            2.1.2 We will not share your personal data with any third party for
            marketing purposes.
            <br />
            2.1.3 We may continue to process your personal data after you have
            ceased to be a User of the Services for record keeping purposes.
            <br />
            2.1.4 We will take measures against unauthorised or unlawful
            processing of your personal data and protect against accidental
            loss, destruction or damage.
            <br />
            2.1.5 We reserve the right to amend or withdraw your login and/or
            password at any time without notice and without incurring any
            liability whatsoever.
            <br />
            <br />
            2.2 Data Subject’s Personal Data:
            <br />
            2.2.1 Personal Data that you upload to Alert! and that we then
            process must be true to the best of your knowledge.
            <br />
            2.2.2 You undertake that information you input in respect of a Data
            Subject is neither false or malicious.
            <br />
            2.2.3 You must have a Legitimate Interest to upload such information
            and images – reasonable suspicion or risk of a crime, protection of
            your property or staff, suspected anti-social behaviour by an
            individual or individuals alongside statements and information in
            support of your suspicions.
            <br />
            2.2.4 When you upload Personal Data relating to a Data Subject or
            act upon any Personal Data in the Services, you, and any crime
            partnership you are representing, become the Data Controller of that
            data.
            <br />
            2.2.5 You undertake not to disclose any Personal Data that you have
            disclosed or determined to any third party unless required to do so
            in law.
            <br />
            <br />
            <TermSubHeader>3 Your User Obligations</TermSubHeader>
            <br />
            <br />
            3.1 Whenever you use Alert! or the information or data contained
            therein you must accept and comply with these Terms of Use.
            <br />
            3.2 You must only use the Services for lawful purposes and undertake
            not to use the Services in any way that breaches any Law or Data
            Protection Regulations.
            <br />
            3.3 You must not divulge in any way personal, identifiable or event
            data to any person for purposes other than the intended purposes of
            crime prevention.
            <br />
            3.4 You must not disclose or show in any way, personal, identifiable
            or event data to any person(s) or in any person associated in any
            way to that person, that is reported within Alert!
            <br />
            3.5 If a User believes that any data contained or reported is
            inaccurate in any way they must immediately report the incidence to
            Alert! or their Crime Reduction Partnership so that the information
            or data can be corrected or removed.
            <br />
            3.6 Users of the Services must comply to the guidance and rules
            issued by Alert!, the Crime Reduction Partnership or Business
            Improvement District in respect of the operation of the Services.
            <br />
            <br />
            <TermSubHeader>4 Security</TermSubHeader>
            <br />
            <br />
            4.1 Your password is personal to you. Your transactions are logged
            throughout your visits to Alert! You must use all reasonable
            endeavours to prevent any unauthorised access to the Services and
            shall not disclose your password, or grant access to any part of the
            Services, to any other person, third party, or business.
            <br />
            4.2 You must never log on to the services using any other user’s log
            in or password.
            <br />
            4.3 Users must notify us immediately if you believe there is a risk
            of an unauthorised access or use of the User account or if another
            person knows the User password. In such circumstances, the user must
            immediately change the User password.
            <br />
            <br />
            <TermSubHeader>5 Uploads</TermSubHeader>
            <br />
            <br />
            5.1 All uploaded data, reports and images are considered
            confidential to Alert!
            <br />
            5.2 Users should only upload data, reports and images of a Data
            Subject that follow the guidance and training delivered by Alert!
            their Crime Partnership, BID or the Police.
            <br />
            5.3 Uploads should not contain any content that could be deemed
            defamatory or obscene.
            <br />
            5.4 Incidents should never be reported in an abusive manner. Keep to
            the facts.
            <br />
            5.5 If a User believes an upload is inaccurate they must report the
            matter to Alert! as soon as possible so that it can be corrected.
            <br />
            <br />
            <TermSubHeader>6 Termination</TermSubHeader>
            <br />
            <br />
            6.1 Alert! may suspend the Service immediately and terminate the
            Contract forthwith where the User is abusing the Service, fails to
            comply with any of these Terms of Use, fails to comply with the Data
            Protection Laws or fails to pay any cost. In such circumstances the
            User will remain liable to meet all costs due.
            <br />
            6.2 The User can cease to use the Service at any time, and can
            request their account to be suspended at any time. The data uploaded
            by the User cannot however be removed, but will be deleted as it
            exceeds the time limits for that data.
            <br />
            6.3 User may not disclose any Alert! Confidential Information for a
            period of five years after the termination of these Terms of Use
            other than as required by law.
            <br />
            <br />
            <TermSubHeader>7 Contact Alert!</TermSubHeader>
            <br />
            <br />
            If you have any questions or comments, or wish to report any errors,
            we welcome your contact via our website on shopsafealert.co.uk.
            <br />
            <br />
            <TermSubHeader>
              8 Definitions Used in these Terms of Use
            </TermSubHeader>
            <br />
            <br />
            In this Agreement:
            <br />
            “Agreement” Means the agreement between ShopSafe and the Partnership
            for the provision of access to and use of the Services;
            <br />
            "Data Protection Laws" means the Data Protection Act 1998, together
            with successor legislation incorporating GDPR (the “Applicable
            Law”);
            <br />
            “Data Subject” shall mean a person who can be identified, directly
            or indirectly, by reference to an identification number or to
            factors specific to his or her physical, physiological, mental,
            economic, cultural or social identity;
            <br />
            "Personal Data" includes “any information relating to an identified
            or identifiable natural person” as defined in GDPR, article 4 (1)
            (1) (the ”Personal Data”);
            <br />
            “GDPR” means the General Data Protection Regulation;
            <br />
            “Data Subject” shall mean a person who can be identified, directly
            or indirectly, by reference to an identification number or to
            factors specific to his or her physical, physiological, mental,
            economic, cultural or social identity;
            <br />
            “Purpose” The purpose of the processing under this Agreement is the
            provision of the Services by the ShopSafe as specified in section 3
            of this agreement;
            <br />
            “User” A person authorised by the Data Controller to access and
            share information via the Services;
            <br />
            “Partnership” Means the legal entity that has authorised you as a
            user and which that has entered into the Agreement.
            <br />
            “Data Processor” describes Alert! as we process the data uploaded by
            the users of the Service.
            <br />
            “Data Controller” describes the owner and user of the data.
            <br />
          </TermsText>
        </TermsContainer>
        <CheckboxRow>
          <FormControlLabel
            control={
              <Checkbox
                checked={termsSigned}
                onChange={() => handleChange('termsSigned', !termsSigned)}
                value="accepted"
              />
            }
            label="I confirm that I have read and agree to the above terms and conditions."
          />
        </CheckboxRow>
      </Page>
    );
  }
}

export default Terms;
