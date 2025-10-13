/* eslint-disable formatjs/no-literal-string-in-jsx */
import { Card, Col, Row, Space, Typography } from 'antd';
import React from 'react';

const { Text, Title } = Typography;
const UserTerms = (): JSX.Element => (
  <div className="list-view">
    <Row style={{ margin: 10 }}>
      <Col>
        <Title level={3}>Terms of Use</Title>
        <Text>
          Below are the terms and conditions that you accepted during your
          onboarding process as an Alert! user.
        </Text>
      </Col>
    </Row>
    <Card style={{ width: '98%' }}>
      <Space direction="vertical" size={1} style={{ fontSize: 13 }}>
        <Text strong>
          By accessing Alert! you have entered into an Agreement to accept these
          Terms of Use.
        </Text>
        <Text strong>
          These Terms of Use include specific responsibilities to comply to the
          UK General Data Protection Regulations. You must make sure the
          information is:
        </Text>
        <Text>
          Below are the terms and conditions that you accepted during your
          onboarding process as an Alert! user.
        </Text>
        <ul>
          <li>Used fairly, lawfully and transparently</li>
          <li>Used for specified, explicit purposes </li>
          <li>
            Used in a way that is adequate, relevant and limited to only what is
            necessary
          </li>
          <li>Accurate and, where necessary, kept up to date</li>
          <li>Kept for no longer than is necessary</li>
          <li>
            Handled in a way that ensures appropriate security, including
            protection against unlawful or unauthorised processing, access,
            loss, copying, destruction or damage
          </li>
        </ul>
        <Text strong>
          You have agreed to allow us to process your Personal Data.
        </Text>
        <Text strong>You are over 16 years of age.</Text>
        <Title level={4} style={{ marginTop: 20 }}>
          1 The Services
        </Title>
        <Text>
          1.1 Alert! is a cloud-based secure information sharing and management
          system designed specifically for crime prevention, crime reduction,
          asset protection and staff security. The{' '}
          <strong>
            <i>Alert! App</i>
          </strong>{' '}
          provides quick and intuitive access to data and intelligence regarding
          those that attempt to commit crime, and as a means to report acts of
          crime and anti-social behaviour shared amongst a closed group of{' '}
          <strong>
            <i>users</i>
          </strong>
          .
        </Text>
        <Text>
          Note: Items in bold italics are defined the first time they are used
          in Section 11 Definitions
        </Text>
        <Title level={4} style={{ marginTop: 20 }}>
          2 Your User Obligations
        </Title>
        <Text>
          2.1 Whenever you access Alert! or use the information or data
          contained therein you accept and agree to comply with these Terms of
          Use.
        </Text>
        <Text>
          2.2 You must only use the Services for lawful purposes and undertake
          not to use the Services in any way that breaches any Law or{' '}
          <strong>
            <i>Data Protection</i>
          </strong>{' '}
          Regulations.
        </Text>
        <Text>
          2.3 You must not divulge in any way personal, identifiable or event
          data to any person for purposes other than the intended purpose.
        </Text>
        <Text>
          2.4 You must not disclose, copy or show in any way, personal,
          identifiable or event data to any{' '}
          <strong>
            <i>Data Subject</i>
          </strong>
          , or to any person associated in any way to that Data Subject’ that is
          contained or reported within Alert!
        </Text>
        <Text>
          2.5 Data accessed within Alert is for your personal use and for the
          benefit of the company for which you are employed, but must not be
          shown, shared or disclosed with any other person, business, company or
          organization that is not a member or User of Alert!
        </Text>
        <Text strong>
          2.6 If a User believes that any data contained or reported is
          inaccurate in any way, or shared in a way that maybe breach these
          terms of use, they must immediately report the incidence to Alert! or
          their managing <em>Organisation</em> so that the information or data
          can be corrected or removed.
        </Text>
        <Text>
          2.7 Users of the Services must comply to the guidance and rules issued
          by Alert!, the Organisation, Crime Reduction{' '}
          <strong>
            <i>Partnership</i>
          </strong>
          (CRP) or{' '}
          <strong>
            <i>Business Improvement District</i>
          </strong>{' '}
          (BID) in respect of the operation of the Services.
        </Text>
        <Title level={4} style={{ marginTop: 20 }}>
          3 Security
        </Title>
        <Text>
          3.1 Your password is personal to you. Your transactions are logged
          throughout your visits to Alert! You must use all reasonable
          endeavours to prevent any unauthorised access to the Services and
          shall not disclose your password, or grant access to any part of the
          Services, to any other person, third party, or business.
        </Text>
        <Text>
          3.2 The Users is responsible for maintaining the confidentiality of
          your User Login details and Password.
        </Text>
        <Text>
          3.3 You must never log on to the services using any other user’s log
          in or password.
        </Text>
        <Text>
          3.4 Users must notify ShopSafe and the{' '}
          <strong>
            <i>Data Controller</i>
          </strong>{' '}
          immediately if you believe there is a risk of an unauthorised access
          or if you believe another person knows your User password. In any such
          circumstances you must immediately change your User password.
        </Text>
        <Title level={4} style={{ marginTop: 20 }}>
          4 Confidentiality and Non-Disclosure
        </Title>
        <Text>
          4.1 Users may not disclose any Alert!{' '}
          <strong>
            <i>Confidential Information</i>
          </strong>{' '}
          for a period of five years after the termination of these Terms of Use
          other than as required by law.
        </Text>
        <Text>
          4.2 Users may use the Confidential Information only for the purposes
          described in The Service and only when complying to these Terms of
          Use.
        </Text>
        <Text>
          4.3 Users must at all times take all reasonable measures to avoid the
          disclosure, unauthorised use or dissemination of the Confidential
          Information uploaded, contained and managed within Alert!
        </Text>
        <Text>
          4.4 Confidentiality and Non Disclosure however shall not apply as
          required by Law, any Court Order or in compliance to an Authority with
          competent jurisdiction.
        </Text>
        <Title level={4} style={{ marginTop: 20 }}>
          5 Uploads
        </Title>
        <Text>
          5.1 All uploaded data, reports and images are considered confidential
          to Alert!
        </Text>
        <Text>
          5.2 Users should only upload data, reports and images of a Data
          Subject that follow the guidance and training provided by Alert!, the{' '}
          <strong>
            <i>Organisation, Crime Partnership, BID</i>
          </strong>{' '}
          or the Police.
        </Text>
        <Text>
          5.3 Uploads should not contain any content that could be deemed
          defamatory or obscene.
        </Text>
        <Text>
          5.4 Incidents should never be reported in an abusive manner. Keep to
          the facts.
        </Text>
        <Text>
          5.5 No{' '}
          <strong>
            <i>personal data</i>
          </strong>{' '}
          should be uploaded of any Data Subject that is believed to be below
          the age of 18 years.
        </Text>
        <Text>
          5.6 If a User believes that any upload data is inaccurate, they must
          report the matter to the{' '}
          <strong>
            <i>Data Administrator</i>
          </strong>{' '}
          as soon as possible so that it can be corrected.
        </Text>
        <Title level={4} style={{ marginTop: 20 }}>
          6 Termination
        </Title>
        <Text>
          6.1 ShopSafe may suspend the Service immediately if any of these Terms
          of Use are not complied with by the User.
        </Text>
        <Text>
          6.2 ShopSafe may terminate any{' '}
          <strong>
            <i>Agreement</i>
          </strong>{' '}
          where the User is abusing the Service, fails to comply with any of
          these Terms of Use, fails to comply with the{' '}
          <strong>
            <i>UK GDPR</i>
          </strong>{' '}
          Legislation or fails to pay any agreed charges. In such circumstances
          the User will remain liable to meet all unpaid charges.
        </Text>
        <Text>
          6.3 The User can cease to use the Service at any time, and can request
          their account to be suspended at any time. The data uploaded by the
          User to Alert! cannot however be removed, but will be deleted as it
          exceeds the time limits for that data.
        </Text>

        <Title level={4} style={{ marginTop: 20 }}>
          7 Intellectual Property, Service and Software Security
        </Title>
        <Text>
          7.1 All the rights in respect of Intellectual Property in the Service
          and the Alert! App are owned by ShopSafe Limited.
        </Text>
        <Text>
          7.2 The User must not upload, attempt to download, provide or give
          access to any party of :
        </Text>
        <Text style={{ marginLeft: '12px' }}>
          7.2.1 Any data, code, file, program or image that may infringe any
          patent, trademark, copyright or trade secret or any other form of
          intellectual proprietary right of any party.
        </Text>
        <Text style={{ marginLeft: '12px' }}>
          7.2.2 Any form of virus, code, file, program or software designed to
          damage, interrupt, divert, destroy, amend or limit any software code,
          virtual or physical computer equipment, hardware or communications
          systems.
        </Text>
        <Text style={{ marginLeft: '12px' }}>
          7.2.3 Any form of license or enable any form of access to any party
          whatsoever designed to commercially exploit, bypass, share, sell, or
          resell the Service.
        </Text>
        <Text>7.3 The User may not at any time:</Text>
        <Text style={{ marginLeft: '12px' }}>
          7.3.1 Interfere with the working or provision of the Service{' '}
        </Text>
        <Text style={{ marginLeft: '12px' }}>
          7.3.2 Disrupt the Service, the servers or the network that deliver or
          connect the Service
        </Text>
        <Text style={{ marginLeft: '12px' }}>
          7.3.3 Attempt to upload data that exceeds the template construct and
          layout of the App in a way designed to place an unreasonable load on
          the Service or network.
        </Text>
        <Text style={{ marginLeft: '12px' }}>
          7.3.4 Attempt to gain unauthorized access to the Service, software or
          infrastructure.
        </Text>

        <Title level={4} style={{ marginTop: 20 }}>
          8 Data Protection
        </Title>

        <Text>8.1 Your Personal Data:</Text>
        <Text style={{ marginLeft: '12px' }}>
          8.1.1 ShopSafe may process your personal data to perform our
          obligations under the Agreement and to enable us to provide the
          Services, and in particular for the following purposes:
        </Text>

        <ul>
          <li>To manage your access and use of the Services </li>
          <li>
            To ensure compliance to the{' '}
            <strong>
              <i>Data Protection Laws</i>
            </strong>
          </li>
          <li>
            To update you about new features, additional services and the
            activities of Alert!{' '}
          </li>
        </ul>
        <Text style={{ marginLeft: '12px' }}>
          8.1.2 We will not share your personal data with any third party for
          marketing purposes.
        </Text>
        <Text style={{ marginLeft: '12px' }}>
          8.1.3 We may continue to process your personal data after you have
          ceased to be a User of the Services for record keeping purposes.
        </Text>
        <Text style={{ marginLeft: '12px' }}>
          8.1.4 We will take measures against unauthorised or unlawful
          processing of your personal data and protect against accidental loss,
          destruction or damage.
        </Text>
        <Text style={{ marginLeft: '12px' }}>
          8.1.5 We reserve the right to amend or withdraw your login and/or
          password at any time without notice and without incurring any
          liability whatsoever.
        </Text>
        <Text>8.2 Data Subject’s Personal Data:</Text>
        <Text style={{ marginLeft: '12px' }}>
          8.2.1 Personal Data, information, tags, images and conversations that
          you upload to Alert! must be true to the best of your knowledge.
        </Text>
        <Text>
          8.2.2 You undertake that information you input in respect of a{' '}
          <strong>
            <i>Data Subject</i>
          </strong>{' '}
          is neither false, malicious, defamatory or discriminatory in any way.
        </Text>
        <Text style={{ marginLeft: '12px' }}>
          8.2.3 You must have a Legitimate Interest to upload such information
          and images – reasonable suspicion or risk of a crime, protection of
          your property or staff, suspected anti-social behaviour by an
          individual or individuals alongside statements and information in
          support of your suspicions.
        </Text>
        <Text style={{ marginLeft: '12px' }}>
          8.2.4 When you upload Personal Data relating to a Data Subject or act
          upon any Personal Data in the Services, you, and any crime partnership
          or Organisation you are representing or a member of, become the Data
          Controller of that data.
        </Text>
        <Text style={{ marginLeft: '12px' }}>
          8.2.5 You undertake not to disclose any Personal Data that you have
          accessed or determined to any third party unless required to do so in
          law.
        </Text>
        <Text style={{ marginLeft: '12px' }}>
          8.2.6 All Personal Data and all the related information, notes and
          images are considered Confidential Information.
        </Text>

        <Title level={4} style={{ marginTop: 20 }}>
          9 Alert! Data Ownership and Data Protection Law
        </Title>

        <Text>
          9.1 The Organisation owns the User data and supplies it via the Alert!
          App to ShopSafe to manage and process.
        </Text>
        <Text>
          9.2 Under UK General Data Protection Regulation (GDPR) legislation,
          both the Organisation and the User are considered Data Controllers.
        </Text>
        <Text>
          9.3 The Data Administrator, those enabling the User’s Access and
          managing Passwords is the Organisation.
        </Text>
        <Text>
          9.4 ShopSafe, the developer and owner of the Alert! App and the data
          management system are the{' '}
          <strong>
            <i>Data Processor</i>
          </strong>
          .
        </Text>

        <Title level={4} style={{ marginTop: 20 }}>
          10 Contact Alert!
        </Title>

        <Text>
          10.1 If you have any questions or comments, or wish to report any
          errors, we welcome your contact via our website on
          shopsafealert.co.uk.
        </Text>

        <Title level={4} style={{ marginTop: 20 }}>
          11 Definitions Used within the Terms of Use
        </Title>

        <Text>
          11.1{' '}
          <strong>
            <i>“Agreement”</i>
          </strong>{' '}
          Means the agreement between ShopSafe, the Organisation and their
          Members who are Users of the Services
        </Text>
        <Text>
          11.2{' '}
          <strong>
            <i> &quot;Data Protection Laws&quot; </i>
          </strong>{' '}
          and{' '}
          <strong>
            <i>“UK GDPR”</i>
          </strong>{' '}
          and{' '}
          <strong>
            <i>“Applicable Law”</i>
          </strong>{' '}
          means the UK General Data Protection Regulation (UK GDPR), tailored by
          the Data Protection Act 2018.
        </Text>
        <Text>
          11.3{' '}
          <strong>
            <i> &quot;Personal Data &quot;</i>
          </strong>{' '}
          includes “any information relating to an identified or identifiable
          natural person” as defined in GDPR, article 4 (1) (1) (the ”Personal
          Data”);
        </Text>
        <Text>
          11.4{' '}
          <strong>
            <i>“Data Subject”</i>
          </strong>{' '}
          shall mean a person who can be identified, directly or indirectly, by
          reference to an identification number or to factors specific to his or
          her physical, physiological, mental, economic, cultural or social
          identity;
        </Text>
        <Text>
          11.5{' '}
          <strong>
            <i>“Data Controller”</i>
          </strong>{' '}
          describes the owner of the data, namely the Organisation and their
          Members.
        </Text>
        <Text>
          11.6 The{' '}
          <strong>
            <i>“User(s)”</i>
          </strong>{' '}
          or{' '}
          <strong>
            <i>“You”</i>
          </strong>{' '}
          is a member of the Organisation authorised by the Data Controller to
          access and share information via the Alert! App to a securely hosted
          cloud based software database.
        </Text>
        <Text>
          11.7{' '}
          <strong>
            <i>“Data Administrator”</i>
          </strong>{' '}
          is the role undertaken by the Data Controller to enable and manage
          their members to become Users of Alert!
        </Text>
        <Text>
          11.8{' '}
          <strong>
            <i>“Data Processor”</i>
          </strong>{' '}
          describes ShopSafe as we process the Alert! data uploaded by the Users
          of the Service.
        </Text>
        <Text>
          11.9 The{' '}
          <strong>
            <i>“Alert! App”</i>
          </strong>{' '}
          is an application developed by ShopSafe that provides access to a web
          hosted crime database.
        </Text>
        <Text>
          11.10 The{' '}
          <strong>
            <i>“Purpose”</i>
          </strong>{' '}
          of the processing under this Agreement is the provision of the
          Services by the ShopSafe as specified in section 8 of this agreement;
        </Text>
        <Text>
          11.11{' '}
          <strong>
            <i>“Organisation”</i>
          </strong>{' '}
          is the{' '}
          <strong>
            <i>“Partnership”</i>
          </strong>{' '}
          or{' '}
          <strong>
            <i>“Business Improvement District”</i>
          </strong>{' '}
          or{' '}
          <strong>
            <i>“Crime Partnership”</i>
          </strong>{' '}
          or{' '}
          <strong>
            <i>“Crime Reduction Group”</i>
          </strong>
          , an entity that has authorised you as a User, and has separately
          entered into a Data Processing Agreement with ShopSafe to act as Data
          Processors to provide and manage a cloud-based database, access to
          which is via the Alert! App under these Terms of Use.
        </Text>
        <Text>
          11.12{' '}
          <strong>
            <i>“Confidential Information”</i>
          </strong>{' '}
          is the data containing Personal Data that Users have uploaded via the
          Alert! App to the secure cloud based secure information data base for
          the purposes of crime prevention and to protect against anti-social
          behaviour.
        </Text>
      </Space>
    </Card>
  </div>
);

export default UserTerms;
