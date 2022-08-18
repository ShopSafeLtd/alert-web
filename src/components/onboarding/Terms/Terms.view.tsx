import React from 'react';
import { Card, Typography, Row, Col, Space, Checkbox, Button } from 'antd';
// import { Link } from 'react-router-dom';

const { Text, Title, Paragraph } = Typography;

interface Props {
  onSubmit: () => void;
  update: () => void;
  saving: boolean;
  onBack: () => void;
  setCurrent: (value: number) => void;
  hideForm: boolean;
}

const SchemeTerms = ({
  onSubmit,
  update,
  saving,
  onBack,
  setCurrent,
  hideForm,
}: Props): JSX.Element => {
  setCurrent(1);
  return (
    <div className="list-view">
      <Row style={{ margin: 15 }}>
        <Col>
          <Title level={3}>Terms of Use</Title>
          {hideForm ? (
            <Text>
              Below are the terms and conditions that you accepted during your
              onboarding process as an Alert! user.
            </Text>
          ) : (
            <Text>
              Please read through our terms and conditions and accept them to
              continue.
            </Text>
          )}
          {/* <Text>
            Please read through our terms and conditions and accept them to
            continue.
          </Text> */}
        </Col>
      </Row>
      <Card style={{ width: '98%' }}>
        <Space direction="vertical" style={{ fontSize: 12 }} size={1}>
          <Title style={{ fontSize: 14, marginTop: 20, marginBottom: 20 }}>
            1 Background
          </Title>
          <Paragraph>
            Alert is a cloud-based secure information sharing and management
            system designed specifically for crime prevention, crime reduction,
            asset protection and staff security. The Alert! App provides quick
            and intuitive access to data and intelligence regarding those that
            attempt to commit crime, and a means to report acts of crime and
            anti-social behaviour shared amongst a closed group of users.
          </Paragraph>

          <Paragraph>
            The Organisation owns the Users data and supplies it to ShopSafe
            Alert! to manage and process. Under UK GDPR legislation the
            Organisation and Users are considered the Data Controllers.
          </Paragraph>

          <Paragraph>ShopSafe Alert! are the Data Processor.</Paragraph>

          <Paragraph>
            The Users are a group of businesses that are all Members of the
            Organisation shown. The intelligence data they share may be
            constructed over time from a number of sources and may include
            personal data, photographs and videos. The Data Controller has
            Administration rights to enable the Users to access the Alert!
            system
          </Paragraph>

          <Paragraph>
            This Agreement is to ensure there is in place proper arrangements
            relating to personal data passed from Data Controller to the Data
            Processor.
          </Paragraph>

          <Paragraph>
            This purpose of this Agreement is to ensure compliance with the
            requirements of Article 28 of the General Data Protection
            Regulation.
          </Paragraph>

          <Paragraph>
            The parties wish to record their commitments under this Agreement.
          </Paragraph>

          <Title style={{ fontSize: 14, marginTop: 20, marginBottom: 20 }}>
            2 Definitions and Interpretation
          </Title>

          <Paragraph>In this Agreement:</Paragraph>

          <Paragraph>
            “Agreement” means the agreement between the Data Processor and the
            Data Controller for the provision of access to and use of the
            “Service” provided by ShopSafe Alert.
          </Paragraph>

          <Paragraph>
            The “UK GDPR” is the General Data Protection Regulations, tailored
            by the Data Protection Act 2018 (and referred to as the “Applicable
            Law”).
          </Paragraph>

          <Paragraph>
            &quot;Personal Data&quot; includes any information relating to an
            identified or identifiable natural person as defined in GDPR,
            article 4 (1) (1) (the ”Personal Data”).
          </Paragraph>

          <Paragraph>
            “Data Subject” shall mean a person who can be identified, directly
            or indirectly, by reference to an identification number or to
            factors specific to his or her physical, physiological, mental,
            economic, cultural or social identity.
          </Paragraph>

          <Paragraph>
            The “Purpose” of the processing under this Agreement is the
            provision of the Services by the Data Processor as specified in
            Section 3 of this agreement.
          </Paragraph>

          <Paragraph>
            A “User” or “Member” is any person, business or organisation enabled
            or authorised by the Data Controller to access and share information
            via the Services.
          </Paragraph>

          <Paragraph>
            An “Offender” is a person who has been uploaded to the Services by A
            User and approved by the Data Controller for the purposes of crime
            reduction, to aid in the apprehension of an offender, for asset
            protection or crime prevention.
          </Paragraph>

          <Title style={{ fontSize: 14, marginTop: 20, marginBottom: 20 }}>
            3 The Services and Data Processing
          </Title>

          <Text>
            3.1 ShopSafe provides a secure information sharing and management
            system, known as Alert!, deployed over the internet for the purposes
            of crime reduction; to aid in the apprehension of offenders; asset
            protection; crime prevention; and to record acts of crime and
            anti-social behaviour.
          </Text>
          <Text>
            3.2 ShopSafe will configure, manage and maintain workspace to
            provide the Service on the servers for the Organisation; assist in
            the Administration role to enable Users; provide training support
            material for the Users; and provide any template documents as
            necessary for the Client to provide the service.
          </Text>
          <Text>
            3.3 ShopSafe will provide continuous telephone and email support on
            a 24/7/365 basis via our HelpDesk.
          </Text>
          <Text>
            3.4 The purpose of data processing is to enable the Organisation and
            Users to securely store and share data with other members; to
            intuitively access the data for the purposes of crime reduction and
            safety; anonymise it as required and delete it irrevocably to meet
            the Organisation’s rules and protocols in compliance with the UK
            GDPR legislation.
          </Text>
          <Text>
            3.5 The Data Processor Agreement shall ensure that the Data
            Processor complies with the applicable data protection and privacy
            legislation and in particular the General Data Protection Regulation
            (GDPR) (Regulation (EU) 2016/679) the Applicable Law.
          </Text>
          <Text>
            3.6 In connection with the Data Processor’s delivery of the Services
            to the Data Controller, ShopSafe will process agreed categories and
            types of the Data Controller’s personal data on behalf of the Data
            Controller. The categories and types of Personal Data processed by
            ShopSafe on behalf of the Data Controller are listed in Appendix A.
          </Text>
          <Text>
            3.7 The Data Processor will only perform processing activities that
            are necessary and relevant to perform the Services outlined in
            Section 3.
          </Text>
          <Text>
            3.8 The parties shall update Appendix A whenever changes occur that
            necessitates an update.
          </Text>
          <Text>
            3.9 The Data Processor shall have and maintain a register of
            processing activities in accordance with the GDPR Article 32 (2).
          </Text>

          <Title style={{ fontSize: 14, marginTop: 20, marginBottom: 20 }}>
            4 Instruction
          </Title>

          <Text>
            4.1 ShopSafeAlert will only act and process the Personal Data in
            accordance with the documented instruction from the Data Controller
            (the “Instruction”), unless required by law to act without such
            instruction. The Instruction at the time of entering into this Data
            Processor Agreement (or DPA) is that the Data Processor may only
            process the Personal Data with the purpose of delivering the
            Services as described in Section 3. Subject to the terms of this DPA
            and with mutual agreement of the parties, the Data Controller may
            issue additional written instructions consistent with the terms of
            this Agreement. The Data Controller is responsible for ensuring that
            all individuals who provide written instructions are authorised to
            do so.
          </Text>
          <Text>
            4.2 The Data Controller guarantees to process Personal Data in
            accordance with the requirements of Data Protection Laws and
            Regulations. The Data Controller’s instructions for the processing
            of Personal Data shall comply with Applicable Law. The Data
            Controller will have sole responsibility for the accuracy, quality,
            and legality of Personal Data and the means by which it was
            obtained.
          </Text>
          <Text>
            4.3 It is the Data Controller’s sole responsibility to ensure the
            Instructions comply to Applicable Law.
          </Text>
          <Text>
            4.4 Should ShopSafe, acting as Data Processors, deem that any
            Instruction violates that Applicable Law they will inform the Data
            Controller and will not execute the instructions until they have
            been confirmed or modified. If ShopSafe deems not to execute an
            Instruction, not to process or subsequently delete that data they
            will not be liable for any loss or damages of any kind whatsoever.
          </Text>

          <Title style={{ fontSize: 14, marginTop: 20, marginBottom: 20 }}>
            5 The Data Controller’s and Administrator’s Obligations
          </Title>

          <Text>
            5.1 The Data Controller’s organisation must hgve a Personal Data
            Processing Policy that describes the way that personal data is
            processed and secured by the Organisation. This should include the
            types of data processed on Users and Members, and Offenders, and the
            purpose of processing that personal data. The Policy should also
            include the lawful basis of processing that data; the categories of
            data and the data retention periods agreed with the Data Processor
            and how this period might vary in some circumstances. This Policy
            must form part of the User’s Membership Agreement. The Members must
            have agreed to abide by this Policy.
          </Text>
          <Text>
            5.2 The Data Controller must also ensure that all their Members that
            become Users of the Alert! System have also read, understood, agreed
            and signed the Alert! Terms of Use that governs access to and use of
            the ShopSafe Alert! System prior to enabling access to the system.
            This Terms of Use will include the members responsibilities to
            comply to the UK GDPR legislation referred to as the Applicable Law;
            the Members responsibilities to ensure security of the system; and
            that data submitted must be fair and neither discriminatory nor
            defamatory as making a false or malicious report may itself be a
            crime.
          </Text>
          <Text>
            5.3 The Member must also be made aware and agree to the use of audit
            trails that monitors use and compliance within Alert!, and that
            emails and telephone calls may be recorded to ensure compliance. The
            User must also agree to prevent unauthorised access to the system;
            of the need for confidentiality and security in respect of passwords
            to prevent unauthorised access to the Service and their
            responsibilities not to disclose the password, grant or share access
            by any other means.
          </Text>
          <Text>
            5.4 The Member must agree to abide by the rules on reporting a
            personal data breach; and that disclosure of personal data without
            consent would make the Member (and not the Data Controller) guilty
            of an offence under Data Protection Law.
          </Text>
          <Text>
            5.5 The Data Controller agrees that any User or Member that fails to
            comply with their Personal Data Processing Policy, the Alert! Terms
            of Use, or fails to reaffirm their compliance on signing in to the
            Alert! App or suspected of a breach or potential breach will be
            prevented from accessing the Alert! System.
          </Text>

          <Title style={{ fontSize: 14, marginTop: 20, marginBottom: 20 }}>
            6 The Data Processor’s Obligations
          </Title>

          <Text>6.1 Confidentiality</Text>
          <Text style={{ marginLeft: '12px' }}>
            6.1.1 ShopSafe shall treat all the Personal Data as strictly
            confidential information. The Personal Data may not be copied,
            transferred or otherwise processed in conflict with the Instruction,
            unless the Data Controller in writing has agreed.
          </Text>
          <Text style={{ marginLeft: '12px' }}>
            6.1.2 ShopSafe employees shall be subject to an obligation of
            confidentiality that ensures that the employees shall treat all the
            Personal Data under this DPA with strict confidentiality.
          </Text>
          <Text style={{ marginLeft: '12px' }}>
            6.1.3 Personal Data will only be made available to personnel that
            require access to such Personal Data for the delivery of the
            Services and this Data Processor Agreement.
          </Text>
          <Text>
            6.2 ShopSafe shall ensure that employees processing the Personal
            Data only process the Personal Data in accordance with the
            Instruction.
          </Text>
          <Text>6.3 Security</Text>
          <Text style={{ marginLeft: '12px' }}>
            6.3.1 ShopSafe shall implement the appropriate technical and
            organizational measures as set out in this Agreement and in the
            Applicable Law, including in accordance with GDPR, Article 32. These
            security measures are subject to technical progress and development.
            The Data Processor may update or modify the security measures from
            time-to-time provided that such updates and modifications do not
            result in the degradation of the overall security.
          </Text>
          <Text style={{ marginLeft: '12px' }}>
            6.3.2 ShopSafe shall provide documentation for such security
            measures if requested by the Data Controller in writing.
          </Text>
          <Text>
            6.4 Data protection impact assessments and prior consultation
          </Text>
          <Text style={{ marginLeft: '12px' }}>
            6.4.1 If the Data Processor’s assistance is necessary and relevant,
            ShopSafe shall assist the Data Controller in preparing data
            protection impact assessments in accordance with GDPR Article 35,
            along with any prior consultation in accordance with GDPR, Article
            36.
          </Text>
          <Text>6.5 Rights of the Data Subjects</Text>
          <Text style={{ marginLeft: '12px' }}>
            6.5.1 If the Data Controller receives a request from a Data Subject
            for the exercise of the Data Subject’s rights under the Applicable
            Law and the correct and legitimate reply to such a request
            necessitates the Data Processor’s assistance, ShopSafe shall assist
            the Data Controller by providing the necessary information and
            documentation. ShopSafe shall be given reasonable time to assist the
            Data Controller with such requests in accordance with the Applicable
            Law.
          </Text>
          <Text style={{ marginLeft: '12px' }}>
            6.5.2 If ShopSafe receives a request from a Data Subject for the
            exercise of the Data Subject’s rights under the Applicable Law and
            such request is related to the Personal Data of the Data Controller,
            ShopSafe will immediately forward the request to the Data Controller
            and will refrain from responding to the Data Subject directly.
          </Text>
          <Text>6.6 Personal Data Breaches</Text>
          <Text style={{ marginLeft: '12px' }}>
            6.6.1 ShopSafe shall give immediate notice to the Data Controller if
            a breach occurs, that can lead to the accidental or unlawful
            destruction, loss, alteration, unauthorized disclosure of or access
            to, personal data transmitted, stored or otherwise processed re the
            Personal Data processed on behalf of the Data Controller (a
            “Personal Data Breach”).
          </Text>
          <Text style={{ marginLeft: '12px' }}>
            6.6.2 ShopSafe shall make reasonable efforts to identify the cause
            of such a breach and take those steps as they deem necessary to
            establish the cause, and to prevent such a breach from reoccurring.
          </Text>
          <Text style={{ marginLeft: '12px' }}>
            6.6.3 Each party to this agreement will inform the other party
            immediately it suspects or becomes aware of any breach of data.
          </Text>
          <Text>6.7 Documentation of compliance and Audit Rights</Text>
          <Text style={{ marginLeft: '12px' }}>
            6.7.1 Upon request by a Data Controller, the Data Processor shall
            make available to the Data Controller all relevant information
            necessary to demonstrate compliance with this DPA, and shall allow
            for and reasonably cooperate with audits, including inspections by
            the Data Controller or an auditor mandated by the Data Controller.
            The Data Controller shall give notice of any audit or document
            inspection to be conducted and shall make reasonable endeavors to
            avoid causing damage or disruption to ShopSafeAlert’s premises,
            equipment and business in the course of such an audit or inspection.
            Any audit or document inspection shall be carried out with
            reasonable prior written notice of no less than 30 days and shall
            not be conducted more than once a year.
          </Text>
          <Text style={{ marginLeft: '12px' }}>
            6.7.2 The Data Controller may be requested to sign a non-disclosure
            agreement reasonably acceptable to ShopSafe before being furnished
            with the above.
          </Text>
          <Text>6.8 Data Transfers</Text>
          <Text style={{ marginLeft: '12px' }}>
            6.8.1 The Data Processor will not transfer data to countries outside
            the European Economic Area.
          </Text>

          <Title style={{ fontSize: 14, marginTop: 20, marginBottom: 20 }}>
            7 Sub-Processors
          </Title>

          <Text>
            7.1 ShopSafe is given general authorisation to engage third-parties
            to process the Personal Data (“Sub-Processors”) without obtaining
            any further written, specific authorization from the Data
            Controller, provided that ShopSafe notifies the Data Controller in
            writing about the identity of a potential Sub-Processor (and its
            processors, if any) before any agreements are made with the relevant
            Sub-Processors and before the relevant Sub-Processor processes any
            of the Personal Data. If the Data Controller wishes to object to the
            relevant Sub-Processor, the Data Controller shall give notice hereof
            in writing within ten (10) business days from receiving the
            notification from ShopSafe. Absence of any objections from the Data
            Controller shall be deemed consent to the relevant Sub-Processor.
          </Text>
          <Text>
            7.2 In the event the Data Controller objects to a new Sub-Processor
            and ShopSafe cannot accommodate the Data Controller’s objection,
            ShopSafe may terminate the Services by providing written notice to
            the Data Controller.
          </Text>
          <Text>
            7.3 ShopSafe shall complete a written sub-processor agreement with
            any Sub-Processors. Such an agreement shall at minimum provide the
            same data protection obligations as the ones applicable to the Data
            Processor, including the obligations under this Data Processor
            Agreement. The Data Processor shall on an ongoing basis monitor and
            control its Sub-Processors’ compliance with the Applicable Law.
            Documentation of such monitoring and control shall be provided to
            the Data Controller if so requested in writing.
          </Text>
          <Text>
            7.4 ShopSafe is accountable to the Data Controller for any
            Sub-Processor in the same way as for its own actions and omissions.
          </Text>
          <Text>
            7.5 ShopSafe is at the time of entering into this Data Processor
            Agreement using the Sub-Processors listed in Appendix B. If the Data
            Processor initiates sub-processing with a new Sub-Processor, such
            new Sub-Processor shall be added to the list in Appendix B under
            paragraph 2.
          </Text>

          <Title style={{ fontSize: 14, marginTop: 20, marginBottom: 20 }}>
            8 Remuneration and Costs
          </Title>

          <Text>
            8.1 The Data Controller shall remunerate ShopSafe based on time
            spent to perform the obligations under section 6.4, 6.5, 6.6, 6.7
            and 6.8 of this Data Processor Agreement based on ShopSafe’s hourly
            rates of £70.
          </Text>
          <Text>
            8.2 ShopSafe is also entitled to remuneration for any time and
            material used to adapt and change the processing activities to
            comply with any changes to the Data Controller’s Instruction,
            including implementation costs and additional costs required to
            deliver the Services due to the change in the Instruction. ShopSafe
            is exempted from liability for non-performance if the performance of
            the obligations would be in conflict with any changed Instruction or
            if contractual delivery in accordance with the changed Instruction
            is impossible. This could for instance be the case:
          </Text>
          <Text style={{ marginLeft: '12px' }}>
            (i) if the changes to the Instruction cannot technically,
            practically or legally be implemented
          </Text>

          <Text style={{ marginLeft: '12px' }}>
            (ii) where the Data Controller explicitly requires that the changes
            to the Instruction shall be applicable before the changes can be
            implemented; and
          </Text>

          <Text style={{ marginLeft: '12px' }}>
            (iii) in the period of time until the Agreement is changed to
            reflect the new Instruction and commercial terms thereof.
          </Text>

          <Title style={{ fontSize: 14, marginTop: 20, marginBottom: 20 }}>
            9 Duration
          </Title>

          <Text>
            9.1 This Data Processor Agreement shall remain in force until the
            agreement is terminated in accordance with section 11 of this
            agreement.
          </Text>

          <Title style={{ fontSize: 14, marginTop: 20, marginBottom: 20 }}>
            10 Data Protection Officer
          </Title>

          <Text>
            10.1 The Data Processor will appoint a Data Protection Officer where
            such appointment is required by Data Protection Laws and
            Regulations.
          </Text>

          <Title style={{ fontSize: 14, marginTop: 20, marginBottom: 20 }}>
            10 Data Protection Officer
          </Title>

          <Text>
            10.1 The Data Processor will appoint a Data Protection Officer where
            such appointment is required by Data Protection Laws and
            Regulations.
          </Text>

          <Title style={{ fontSize: 14, marginTop: 20, marginBottom: 20 }}>
            11 Termination and Liability
          </Title>

          <Text>
            11.1 ShopSafe may suspend the Service immediately and terminate the
            Contract forthwith where the Data Controller or any User is abusing
            the Service, fails to comply to the Applicable Laws or fails to pay
            any cost. In such circumstances the Data Controller will remain
            liable to meet all costs due.
          </Text>
          <Text>
            11.2 Following expiration or termination of the Agreement, the Data
            Processor will delete or return to the Data Controller all Personal
            Data in its possession as provided in the Agreement except to the
            extent the Data Processor is required by Applicable law to retain
            some or all of the Personal Data (in which case the Data Processor
            will archive the data and implement reasonable measures to prevent
            the Personal Data from any further processing). The terms of this
            DPA will continue to apply to such Personal Data.
          </Text>
          <Text>
            11.3 Either party may terminate the Contract if the other becomes
            bankrupt, insolvent, goes into liquidation, makes an arrangement
            with its creditors or a receiving or administration order is made.
          </Text>
          <Text>
            11.4 In the event of any failure of the service, ShopSafe will not
            be liable to the Data Controller or any other party for any special,
            indirect, or consequential damages, including but not limited to
            loss of revenue, business, anticipated savings or profit, loss of
            goodwill, loss or corruption of data or any other economic loss or
            any indirect or consequential loss whatsoever or howsoever arising
            even if the Data Controller has notified ShopSafe that any of the
            above may occur.
          </Text>
          <Text>
            11.5 Nothing in this DPA relieves ShopSafe of its own direct
            responsibilities and liabilities under the GDPR.
          </Text>

          <Title style={{ fontSize: 14, marginTop: 20, marginBottom: 20 }}>
            12 General
          </Title>

          <Text>
            12.1 This Agreement may only be varied with the written consent of
            both parties.
          </Text>
          <Text>
            12.2 For the purposes of this Agreement the representatives of each
            party are detailed in Appendix C.
          </Text>
          <Text>
            12.3 This Agreement represents the entire understanding of the
            parties relating to necessary legal protections arising out of their
            Data Controller/Processor relationship under Data Protection Laws.
          </Text>
          <Text>
            12.4 This Agreement is subject to English law and the exclusive
            jurisdiction of the English Courts.
          </Text>

          <Title style={{ fontSize: 14, marginTop: 20, marginBottom: 20 }}>
            Appendix A
          </Title>

          <Text>1. Personal Data</Text>
          <Text>
            The Data Processor processes the following types of Personal Data in
            connection with its delivery of the Services:
          </Text>
          <Text style={{ marginLeft: '12px' }}>
            1.1 Information on offenders submitted to Alert! by users and
            approved by the Data Controller:
          </Text>
          <Text style={{ marginLeft: '24px' }}>- Full Name</Text>
          <Text style={{ marginLeft: '24px' }}>- Age or age range</Text>
          <Text style={{ marginLeft: '24px' }}>- Images</Text>
          <Text style={{ marginLeft: '24px' }}>
            - Physical description (including height, build, ethnicity, hair
            colour, hair style, clothing, carrying and peculiarities)
          </Text>
          <Text style={{ marginLeft: '12px' }}>
            1.2 Information on users of Alert! as approved by the Data
            Controller required for the supply of Services:
          </Text>
          <Text style={{ marginLeft: '24px' }}>- Full Name</Text>
          <Text style={{ marginLeft: '24px' }}>- Organisation</Text>
          <Text style={{ marginLeft: '24px' }}>- Organisation address</Text>
          <Text style={{ marginLeft: '24px' }}>- Phone contact number</Text>
          <Text style={{ marginLeft: '24px' }}>- Email address</Text>
          <Text style={{ marginLeft: '12px' }}>
            1.3 Information on relevant employees from the Data Controller
            required for the supply of Services:
          </Text>
          <Text style={{ marginLeft: '24px' }}>- Full Name</Text>
          <Text style={{ marginLeft: '24px' }}>- Organisation</Text>
          <Text style={{ marginLeft: '24px' }}>- Organisation address</Text>
          <Text style={{ marginLeft: '24px' }}>- Phone contact number</Text>
          <Text style={{ marginLeft: '24px' }}>- Email address</Text>

          <Text>2. Categories of data subjects</Text>
          <Text>
            ShopSafe processes personal data about the following categories of
            data subjects on behalf of the Client:
          </Text>
          <Text style={{ marginLeft: '12px' }}>
            - Offenders recorded in Alert!
          </Text>
          <Text style={{ marginLeft: '12px' }}>
            - Employees of the Data Controller
          </Text>
          <Text style={{ marginLeft: '12px' }}>- Users of Alert!</Text>

          <Title style={{ fontSize: 14, marginTop: 20, marginBottom: 20 }}>
            Appendix B
          </Title>

          <Text>1. Approved Sub-Processors</Text>
          <Text>
            The following Sub-Processors shall be considered approved by the
            Data Controller at the time of entering into this Agreement:
          </Text>
          <Text style={{ marginLeft: '12px' }}>
            i. Authentification Provider &amp; Secure Hosting: Auth0 Inc., 10900
            NE 8th Street, Suite 700, Bellevue, WA 98004
          </Text>
          <Text style={{ marginLeft: '12px' }}>
            ii. Image Manipulation Services &amp; Secure Hosting: Cloudinary
            Inc., 111 W Evelyn Avenue, Suite 206, Sunnyvayle, CA 94086
          </Text>
          <Text style={{ marginLeft: '12px' }}>
            iii. Software Provider &amp; Secure Hosting: Graphcool Inc.
          </Text>

          <Text>2. New Sub-Processors</Text>
          <Text>
            The following Sub-Processors have been added and communicated to the
            Data Controller prior to the relevant sub-processing:
          </Text>
          <Text style={{ marginLeft: '12px' }}>i. N/a</Text>

          <Title style={{ fontSize: 14, marginTop: 20, marginBottom: 20 }}>
            Appendix C
          </Title>

          <Paragraph>
            ShopSafeAlert Limited’s Representative shall be{' '}
            <strong>Elliot Blenkhorn</strong> or such other person as shall be
            notified by the Data Processor.
          </Paragraph>

          <Paragraph>
            The Data Controllers’ Representative shall be{' '}
            <strong>[ ... ]</strong> or such other person as shall be notified
            by the Data Controller.
          </Paragraph>
        </Space>
      </Card>
      <Row gutter={10} justify="end">
        <Col>
          <Checkbox onChange={update}>
            <Title level={4}>
              I confirm that I have read and agree to the above terms and
              conditions.
            </Title>
          </Checkbox>
        </Col>
      </Row>
      {hideForm && (
        <Row style={{ marginTop: 30 }} gutter={10} justify="end">
          <Col>
            {/* <Link to="/app/onboarding"> */}
            <Button
              disabled={saving}
              loading={saving}
              type="primary"
              onClick={() => {
                window.history.back();
                onBack();
              }}
            >
              Back
            </Button>
            {/* </Link> */}
          </Col>

          <Col>
            <Button
              disabled={saving}
              loading={saving}
              onClick={onSubmit}
              type="primary"
              htmlType="submit"
            >
              Save
            </Button>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default SchemeTerms;
