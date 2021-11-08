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

const BoldItalic = ({ children }) => (
  <strong>
    <em>{children}</em>
  </strong>
);

class Terms extends PureComponent {
  render() {
    const {
      values: { termsSigned, error },
      handleChange,
      hideForm,
    } = this.props;
    return (
      <Page>
        <Header>
          <HeaderText>Terms of Use</HeaderText>
          {hideForm ? (
            <HeaderSubText>
              Below are the terms and conditions that you accepted during your
              onboarding process as an Alert! user.
            </HeaderSubText>
          ) : (
            <HeaderSubText>
              Please read through our terms and conditions and accept them to
              continue.
            </HeaderSubText>
          )}
        </Header>
        <TermsContainer>
          <TermsText>
            <div style={{ lineHeight: '18px' }}>
              <strong>
                By accessing Alert! you have entered into an Agreement to accept
                these Terms of Use.
              </strong>
              <br />
              <strong>
                These Terms of Use include specific responsibilities to comply
                to the UK General Data Protection Regulations. You must make
                sure the information is:
              </strong>
              <br />
              <ul>
                <li>Used fairly, lawfully and transparently</li>
                <li>Used for specified, explicit purposes </li>
                <li>
                  Used in a way that is adequate, relevant and limited to only
                  what is necessary
                </li>
                <li>Accurate and, where necessary, kept up to date</li>
                <li>Kept for no longer than is necessary</li>
                <li>
                  Handled in a way that ensures appropriate security, including
                  protection against unlawful or unauthorised processing,
                  access, loss, copying, destruction or damage
                </li>
              </ul>
              <strong>
                You have agreed to allow us to process your Personal Data.
              </strong>
              <br />
              <strong>You are over 16 years of age.</strong>
              <br />
              <br />
              <TermSubHeader>1 The Services</TermSubHeader>
              <br />
              1.1 Alert! is a cloud-based secure information sharing and
              management system designed specifically for crime prevention,
              crime reduction, asset protection and staff security. The{' '}
              <BoldItalic>Alert! App</BoldItalic> provides quick and intuitive
              access to data and intelligence regarding those that attempt to
              commit crime, and as a means to report acts of crime and
              anti-social behaviour shared amongst a closed group of{' '}
              <BoldItalic>users</BoldItalic>.
              <br />
              Note: Items in <BoldItalic>bold italics</BoldItalic> are defined
              the first time they are used in Section 11 Definitions
              <br />
              <br />
              <TermSubHeader>2 Your User Obligations</TermSubHeader>
              <br />
              2.1 Whenever you access Alert! or use the information or data
              contained therein you accept and agree to comply with these Terms
              of Use.
              <br />
              2.2 You must only use the Services for lawful purposes and
              undertake not to use the Services in any way that breaches any Law
              or <BoldItalic>Data Protection</BoldItalic> Regulations.
              <br />
              2.3 You must not divulge in any way personal, identifiable or
              event data to any person for purposes other than the intended
              purpose.
              <br />
              2.4 You must not disclose, copy or show in any way, personal,
              identifiable or event data to any{' '}
              <BoldItalic>Data Subject</BoldItalic>, or to any person associated
              in any way to that Data Subject’ that is contained or reported
              within Alert!
              <br />
              2.5 Data accessed within Alert is for your personal use and for
              the benefit of the company for which you are employed, but must
              not be shown, shared or disclosed with any other person, business,
              company or organization that is not a member or User of Alert!
              <br />
              2.6{' '}
              <strong>
                If a User believes that any data contained or reported is
                inaccurate in any way, or shared in a way that maybe breach
                these terms of use, they must immediately report the incidence
                to Alert! or their managing <em>Organisation</em> so that the
                information or data can be corrected or removed.
              </strong>
              <br />
              2.7 Users of the Services must comply to the guidance and rules
              issued by Alert!, the Organisation, Crime Reduction{' '}
              <BoldItalic>Partnership</BoldItalic>
              (CRP) or <BoldItalic>
                Business Improvement District
              </BoldItalic>{' '}
              (BID) in respect of the operation of the Services.
              <br />
              <br />
              <TermSubHeader>3 Security</TermSubHeader>
              <br />
              3.1 Your password is personal to you. Your transactions are logged
              throughout your visits to Alert! You must use all reasonable
              endeavours to prevent any unauthorised access to the Services and
              shall not disclose your password, or grant access to any part of
              the Services, to any other person, third party, or business.
              <br />
              3.2 The Users is responsible for maintaining the confidentiality
              of your User Login details and Password.
              <br />
              3.3 You must never log on to the services using any other user’s
              log in or password.
              <br />
              3.4 Users must notify ShopSafe and the{' '}
              <BoldItalic>Data Controller</BoldItalic> immediately if you
              believe there is a risk of an unauthorised access or if you
              believe another person knows your User password. In any such
              circumstances you must immediately change your User password.
              <br />
              <br />
              <TermSubHeader>
                4 Confidentiality and Non-Disclosure
              </TermSubHeader>
              <br />
              4.1 Users may not disclose any Alert!{' '}
              <BoldItalic>Confidential Information</BoldItalic> for a period of
              five years after the termination of these Terms of Use other than
              as required by law.
              <br />
              4.2 Users may use the Confidential Information only for the
              purposes described in The Service and only when complying to these
              Terms of Use.
              <br />
              4.3 Users must at all times take all reasonable measures to avoid
              the disclosure, unauthorised use or dissemination of the
              Confidential Information uploaded, contained and managed within
              Alert!
              <br />
              4.4 Confidentiality and Non Disclosure however shall not apply as
              required by Law, any Court Order or in compliance to an Authority
              with competent jurisdiction.
              <br />
              <br />
              <TermSubHeader>5 Uploads</TermSubHeader>
              <br />
              5.1 All uploaded data, reports and images are considered
              confidential to Alert!
              <br />
              5.2 Users should only upload data, reports and images of a Data
              Subject that follow the guidance and training provided by Alert!,
              the <BoldItalic>
                Organisation, Crime Partnership, BID
              </BoldItalic>{' '}
              or the Police.
              <br />
              5.3 Uploads should not contain any content that could be deemed
              defamatory or obscene.
              <br />
              5.4 Incidents should never be reported in an abusive manner. Keep
              to the facts.
              <br />
              5.5 No <BoldItalic>personal data</BoldItalic> should be uploaded
              of any Data Subject that is believed to be below the age of 18
              years.
              <br />
              5.6 If a User believes that any upload data is inaccurate, they
              must report the matter to the{' '}
              <BoldItalic>Data Administrator</BoldItalic> as soon as possible so
              that it can be corrected.
              <br />
              <br />
              <TermSubHeader>6 Termination</TermSubHeader>
              <br />
              6.1 ShopSafe may suspend the Service immediately if any of these
              Terms of Use are not complied with by the User.
              <br />
              6.2 ShopSafe may terminate any <BoldItalic>
                Agreement
              </BoldItalic>{' '}
              where the User is abusing the Service, fails to comply with any of
              these Terms of Use, fails to comply with the{' '}
              <BoldItalic>UK GDPR</BoldItalic> Legislation or fails to pay any
              agreed charges. In such circumstances the User will remain liable
              to meet all unpaid charges.
              <br />
              6.3 The User can cease to use the Service at any time, and can
              request their account to be suspended at any time. The data
              uploaded by the User to Alert! cannot however be removed, but will
              be deleted as it exceeds the time limits for that data.
              <br />
              <br />
              <TermSubHeader>
                7 Intellectual Property, Service and Software Security
              </TermSubHeader>
              <br />
              7.1 All the rights in respect of Intellectual Property in the
              Service and the Alert! App are owned by ShopSafe Limited.
              <br />
              7.2 The User must not upload, attempt to download, provide or give
              access to any party of :
              <br />
              <div style={{ marginLeft: '12px' }}>
                7.2.1 Any data, code, file, program or image that may infringe
                any patent, trademark, copyright or trade secret or any other
                form of intellectual proprietary right of any party.
                <br />
                7.2.2 Any form of virus, code, file, program or software
                designed to damage, interrupt, divert, destroy, amend or limit
                any software code, virtual or physical computer equipment,
                hardware or communications systems.
                <br />
                7.2.3 Any form of license or enable any form of access to any
                party whatsoever designed to commercially exploit, bypass,
                share, sell, or resell the Service.
                <br />{' '}
              </div>
              7.3 The User may not at any time:
              <br />
              <div style={{ marginLeft: '12px' }}>
                7.3.1 Interfere with the working or provision of the Service{' '}
                <br />
                7.3.2 Disrupt the Service, the servers or the network that
                deliver or connect the Service
                <br />
                7.3.3 Attempt to upload data that exceeds the template construct
                and layout of the App in a way designed to place an unreasonable
                load on the Service or network.
                <br />
                7.3.4 Attempt to gain unauthorized access to the Service,
                software or infrastructure.
              </div>
              <br />
              <TermSubHeader>8 Data Protection</TermSubHeader>
              <br />
              8.1 Your Personal Data:
              <br />
              <div style={{ marginLeft: '12px' }}>
                8.1.1 ShopSafe may process your personal data to perform our
                obligations under the Agreement and to enable us to provide the
                Services, and in particular for the following purposes:
                <br />
                <ul>
                  <li>To manage your access and use of the Services </li>
                  <li>
                    To ensure compliance to the{' '}
                    <BoldItalic>Data Protection Laws</BoldItalic>
                  </li>
                  <li>
                    To update you about new features, additional services and
                    the activities of Alert!{' '}
                  </li>
                </ul>
                8.1.2 We will not share your personal data with any third party
                for marketing purposes.
                <br />
                8.1.3 We may continue to process your personal data after you
                have ceased to be a User of the Services for record keeping
                purposes.
                <br />
                8.1.4 We will take measures against unauthorised or unlawful
                processing of your personal data and protect against accidental
                loss, destruction or damage.
                <br />
                8.1.5 We reserve the right to amend or withdraw your login
                and/or password at any time without notice and without incurring
                any liability whatsoever.
                <br />
              </div>
              8.2 Data Subject’s Personal Data:
              <br />
              <div style={{ marginLeft: '12px' }}>
                8.2.1 Personal Data, information, tags, images and conversations
                that you upload to Alert! must be true to the best of your
                knowledge.
                <br />
                8.2.2 You undertake that information you input in respect of a{' '}
                <BoldItalic>Data Subject</BoldItalic> is neither false,
                malicious, defamatory or discriminatory in any way.
                <br />
                8.2.3 You must have a Legitimate Interest to upload such
                information and images – reasonable suspicion or risk of a
                crime, protection of your property or staff, suspected
                anti-social behaviour by an individual or individuals alongside
                statements and information in support of your suspicions.
                <br />
                8.2.4 When you upload Personal Data relating to a Data Subject
                or act upon any Personal Data in the Services, you, and any
                crime partnership or Organisation you are representing or a
                member of, become the Data Controller of that data.
                <br />
                8.2.5 You undertake not to disclose any Personal Data that you
                have accessed or determined to any third party unless required
                to do so in law.
                <br />
                8.2.6 All Personal Data and all the related information, notes
                and images are considered Confidential Information.
              </div>
              <br />
              <TermSubHeader>
                9 Alert! Data Ownership and Data Protection Law
              </TermSubHeader>
              <br />
              9.1 The Organisation owns the User data and supplies it via the
              Alert! App to ShopSafe to manage and process.
              <br />
              9.2 Under UK General Data Protection Regulation (GDPR)
              legislation, both the Organisation and the User are considered
              Data Controllers.
              <br />
              9.3 The Data Administrator, those enabling the User’s Access and
              managing Passwords is the Organisation.
              <br />
              9.4 ShopSafe, the developer and owner of the Alert! App and the
              data management system are the{' '}
              <BoldItalic>Data Processor</BoldItalic>.
              <br />
              <br />
              <TermSubHeader>10 Contact Alert!</TermSubHeader>
              <br />
              10.1 If you have any questions or comments, or wish to report any
              errors, we welcome your contact via our website on
              shopsafealert.co.uk.
              <br />
              <br />
              <TermSubHeader>
                11 Definitions Used within the Terms of Use
              </TermSubHeader>
              <br />
              11.1 <BoldItalic>“Agreement”</BoldItalic> Means the agreement
              between ShopSafe, the Organisation and their Members who are Users
              of the Services
              <br />
              11.2 <BoldItalic>"Data Protection Laws"</BoldItalic> and{' '}
              <BoldItalic>“UK GDPR”</BoldItalic> and{' '}
              <BoldItalic>“Applicable Law”</BoldItalic> means the UK General
              Data Protection Regulation (UK GDPR), tailored by the Data
              Protection Act 2018.
              <br />
              11.3 <BoldItalic>"Personal Data"</BoldItalic> includes “any
              information relating to an identified or identifiable natural
              person” as defined in GDPR, article 4 (1) (1) (the ”Personal
              Data”);
              <br />
              11.4 <BoldItalic>“Data Subject”</BoldItalic> shall mean a person
              who can be identified, directly or indirectly, by reference to an
              identification number or to factors specific to his or her
              physical, physiological, mental, economic, cultural or social
              identity;
              <br />
              11.5 <BoldItalic>“Data Controller”</BoldItalic> describes the
              owner of the data, namely the Organisation and their Members.
              <br />
              11.6 The <BoldItalic>“User(s)”</BoldItalic> or{' '}
              <BoldItalic>“You”</BoldItalic> is a member of the Organisation
              authorised by the Data Controller to access and share information
              via the Alert! App to a securely hosted cloud based software
              database.
              <br />
              11.7 <BoldItalic>“Data Administrator”</BoldItalic> is the role
              undertaken by the Data Controller to enable and manage their
              members to become Users of Alert!
              <br />
              11.8 <BoldItalic>“Data Processor”</BoldItalic> describes ShopSafe
              as we process the Alert! data uploaded by the Users of the
              Service.
              <br />
              11.9 The <BoldItalic>“Alert! App”</BoldItalic> is an application
              developed by ShopSafe that provides access to a web hosted crime
              database.
              <br />
              11.10 The <BoldItalic>“Purpose”</BoldItalic> of the processing
              under this Agreement is the provision of the Services by the
              ShopSafe as specified in section 8 of this agreement;
              <br />
              11.11 <BoldItalic>“Organisation”</BoldItalic> is the{' '}
              <BoldItalic>“Partnership”</BoldItalic> or{' '}
              <BoldItalic>“Business Improvement District”</BoldItalic> or{' '}
              <BoldItalic>“Crime Partnership”</BoldItalic> or{' '}
              <BoldItalic>“Crime Reduction Group”</BoldItalic>, an entity that
              has authorised you as a User, and has separately entered into a
              Data Processing Agreement with ShopSafe to act as Data Processors
              to provide and manage a cloud-based database, access to which is
              via the Alert! App under these Terms of Use.
              <br />
              11.12 <BoldItalic>“Confidential Information”</BoldItalic> is the
              data containing Personal Data that Users have uploaded via the
              Alert! App to the secure cloud based secure information data base
              for the purposes of crime prevention and to protect against
              anti-social behaviour.
              <br />
            </div>
          </TermsText>
        </TermsContainer>
        {!!error && <ErrorText>{error}</ErrorText>}

        {!hideForm && (
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
        )}
      </Page>
    );
  }
}

export default Terms;

// old terms
//* <TermsText>
// By accessing Alert! you agree to these Terms of Use.
// <br />
// These Terms of Use govern your access and use of the Services.
// <br />
// These Terms of Use include your specific responsibilities to comply
// to the General Data Protection Regulations.
// <br />
// Using the App and the data contained has specific responsibilities
// to which you have here agreed to abide.
// <br />
// You have agreed to allow us to process your Personal Data.
// <br />
// You have confirmed a Legitimate Interest to access and use Alert!
// and are over 18 years of age.
// <br />
// <br />
// <TermSubHeader>1 The Services</TermSubHeader>
// <br />
// <br />
// Alert! provides:
// <br />
// 1.1 A secure information sharing, and management system deployed
// over the internet for the purposes of crime prevention, crime
// reduction, asset protection and staff security. As an aid in the
// apprehension of offenders by reporting acts of crime and anti-social
// behaviour.
// <br />
// 1.2 Images ….
// <br />
// 1.3 Messages ….
// <br />
// 1.4 Alert! undertakes the role of Data Processor.
// <br />
// <br />
// <TermSubHeader>2 Data Protection</TermSubHeader>
// <br />
// <br />
// 2.1 Personal Data:
// <br />
// 2.1.1 ShopSafe may process your personal data for the purposes of
// performing our obligations under the Agreement and to enable us to
// provide the Services. In particular for the following purposes:
// <br />
// <ul>
//   <li>To manage your access to the Services</li>
//   <li>To ensure compliance to the Data Protection Laws</li>
//   <li>
//     To update you about new features, additional services and the
//     activities of Alert!
//   </li>
// </ul>
// 2.1.2 We will not share your personal data with any third party for
// marketing purposes.
// <br />
// 2.1.3 We may continue to process your personal data after you have
// ceased to be a User of the Services for record keeping purposes.
// <br />
// 2.1.4 We will take measures against unauthorised or unlawful
// processing of your personal data and protect against accidental
// loss, destruction or damage.
// <br />
// 2.1.5 We reserve the right to amend or withdraw your login and/or
// password at any time without notice and without incurring any
// liability whatsoever.
// <br />
// <br />
// 2.2 Data Subject’s Personal Data:
// <br />
// 2.2.1 Personal Data that you upload to Alert! and that we then
// process must be true to the best of your knowledge.
// <br />
// 2.2.2 You undertake that information you input in respect of a Data
// Subject is neither false or malicious.
// <br />
// 2.2.3 You must have a Legitimate Interest to upload such information
// and images – reasonable suspicion or risk of a crime, protection of
// your property or staff, suspected anti-social behaviour by an
// individual or individuals alongside statements and information in
// support of your suspicions.
// <br />
// 2.2.4 When you upload Personal Data relating to a Data Subject or
// act upon any Personal Data in the Services, you, and any crime
// partnership you are representing, become the Data Controller of that
// data.
// <br />
// 2.2.5 You undertake not to disclose any Personal Data that you have
// disclosed or determined to any third party unless required to do so
// in law.
// <br />
// <br />
// <TermSubHeader>3 Your User Obligations</TermSubHeader>
// <br />
// <br />
// 3.1 Whenever you use Alert! or the information or data contained
// therein you must accept and comply with these Terms of Use.
// <br />
// 3.2 You must only use the Services for lawful purposes and undertake
// not to use the Services in any way that breaches any Law or Data
// Protection Regulations.
// <br />
// 3.3 You must not divulge in any way personal, identifiable or event
// data to any person for purposes other than the intended purposes of
// crime prevention.
// <br />
// 3.4 You must not disclose or show in any way, personal, identifiable
// or event data to any person(s) or in any person associated in any
// way to that person, that is reported within Alert!
// <br />
// 3.5 If a User believes that any data contained or reported is
// inaccurate in any way they must immediately report the incidence to
// Alert! or their Crime Reduction Partnership so that the information
// or data can be corrected or removed.
// <br />
// 3.6 Users of the Services must comply to the guidance and rules
// issued by Alert!, the Crime Reduction Partnership or Business
// Improvement District in respect of the operation of the Services.
// <br />
// <br />
// <TermSubHeader>4 Security</TermSubHeader>
// <br />
// <br />
// 4.1 Your password is personal to you. Your transactions are logged
// throughout your visits to Alert! You must use all reasonable
// endeavours to prevent any unauthorised access to the Services and
// shall not disclose your password, or grant access to any part of the
// Services, to any other person, third party, or business.
// <br />
// 4.2 You must never log on to the services using any other user’s log
// in or password.
// <br />
// 4.3 Users must notify us immediately if you believe there is a risk
// of an unauthorised access or use of the User account or if another
// person knows the User password. In such circumstances, the user must
// immediately change the User password.
// <br />
// <br />
// <TermSubHeader>5 Uploads</TermSubHeader>
// <br />
// <br />
// 5.1 All uploaded data, reports and images are considered
// confidential to Alert!
// <br />
// 5.2 Users should only upload data, reports and images of a Data
// Subject that follow the guidance and training delivered by Alert!
// their Crime Partnership, BID or the Police.
// <br />
// 5.3 Uploads should not contain any content that could be deemed
// defamatory or obscene.
// <br />
// 5.4 Incidents should never be reported in an abusive manner. Keep to
// the facts.
// <br />
// 5.5 If a User believes an upload is inaccurate they must report the
// matter to Alert! as soon as possible so that it can be corrected.
// <br />
// <br />
// <TermSubHeader>6 Termination</TermSubHeader>
// <br />
// <br />
// 6.1 Alert! may suspend the Service immediately and terminate the
// Contract forthwith where the User is abusing the Service, fails to
// comply with any of these Terms of Use, fails to comply with the Data
// Protection Laws or fails to pay any cost. In such circumstances the
// User will remain liable to meet all costs due.
// <br />
// 6.2 The User can cease to use the Service at any time, and can
// request their account to be suspended at any time. The data uploaded
// by the User cannot however be removed, but will be deleted as it
// exceeds the time limits for that data.
// <br />
// 6.3 User may not disclose any Alert! Confidential Information for a
// period of five years after the termination of these Terms of Use
// other than as required by law.
// <br />
// <br />
// <TermSubHeader>7 Contact Alert!</TermSubHeader>
// <br />
// <br />
// If you have any questions or comments, or wish to report any errors,
// we welcome your contact via our website on shopsafealert.co.uk.
// <br />
// <br />
// <TermSubHeader>
//   8 Definitions Used in these Terms of Use
// </TermSubHeader>
// <br />
// <br />
// In this Agreement:
// <br />
// “Agreement” Means the agreement between ShopSafe and the Partnership
// for the provision of access to and use of the Services;
// <br />
// "Data Protection Laws" means the Data Protection Act 1998, together
// with successor legislation incorporating GDPR (the “Applicable
// Law”);
// <br />
// “Data Subject” shall mean a person who can be identified, directly
// or indirectly, by reference to an identification number or to
// factors specific to his or her physical, physiological, mental,
// economic, cultural or social identity;
// <br />
// "Personal Data" includes “any information relating to an identified
// or identifiable natural person” as defined in GDPR, article 4 (1)
// (1) (the ”Personal Data”);
// <br />
// “GDPR” means the General Data Protection Regulation;
// <br />
// “Data Subject” shall mean a person who can be identified, directly
// or indirectly, by reference to an identification number or to
// factors specific to his or her physical, physiological, mental,
// economic, cultural or social identity;
// <br />
// “Purpose” The purpose of the processing under this Agreement is the
// provision of the Services by the ShopSafe as specified in section 3
// of this agreement;
// <br />
// “User” A person authorised by the Data Controller to access and
// share information via the Services;
// <br />
// “Partnership” Means the legal entity that has authorised you as a
// user and which that has entered into the Agreement.
// <br />
// “Data Processor” describes Alert! as we process the data uploaded by
// the users of the Service.
// <br />
// “Data Controller” describes the owner and user of the data.
// <br />
//</TermsText> */
