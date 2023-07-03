/* eslint-disable formatjs/no-literal-string-in-jsx */
import React from 'react';
import './styles.css';

interface BusinessImpactStatementProps {
  businessName: string;
  businessAddress: string;
  contactName: string;
  telephone: string;
  contactAddress: string;
  crimeNumber: string;
  policeOfficerAttending: string;
  financialImpact: string;
  directLossStatement: string;
  otherLossStatement: string;
  nonFinancialImpact: string;
  otherComments: string;
  compensation: string;
  signature: string;
  date: string;
}

const createBusinessImpact = () => {
  const rawdata = localStorage.getItem('data') || '{}';
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data: Partial<BusinessImpactStatementProps> = JSON.parse(rawdata);
  const noPages = 6;

  return (
    <div>
      <div className="page">
        <div className="bis-body-div">
          <section className="bis-section">
            <h2 className="bis-section-title">IMPACT STATEMENT FOR BUSINESS</h2>
            <p className="section-subtitle">
              Criminal Procedure Rules, r 27.2; Criminal Justice Act 1967, s. 9;
              Magistrates; Courts Act 1980, s. 5B
            </p>
          </section>
          <section className="bis-section">
            <div>
              The Impact Statement for Business (ISB) gives you the opportunity
              to set out the impact that a crime has had on the business such as
              direct financial loss, and wider impacts, e.g. operational
              disruption or reputational damage. The court will take the
              statement into account when determining sentence.
              <br />
              <br />
              In this statement you should not provide an opinion or
              recommendation on the sentence or sanctions that the court should
              use. This is for the court to decide. You should limit the
              information you give in this statement to the impact this
              particular crime has had on the business, rather than providing
              information on how any previous criminal activity may have
              affected the business (unless, for example, this crime results
              from the repeat offending of the same offender). <br /> <br />
              The business should consider carefully who to nominate as the
              representative to make the statement on its behalf. Once you have
              completed this form, you should return it by email or by post to
              your police contact. A person making an ISB on behalf of a
              corporation (“the nominated representative”) must be authorised to
              do so on its behalf. The nominated representative must also be in
              a position to give evidence that is admissible in court about the
              impact of the crime on the business. The nominated representative
              may be required to answer questions on the ISB in court. <br />{' '}
              <br />
              You should be aware that if you choose not to make a statement at
              the outset of the proceedings, you may not have another
              opportunity to make one later on. This is because the case may be
              dealt with by the courts very quickly. <br /> <br />
              In more complex cases which may take longer to be dealt with by
              the courts, you may wish to take more time to collect relevant
              information, for example, accounts or other business documents.
              The police will be in touch to let you know the date of the first
              hearing date and at that stage, you will need to make or update
              your ISB through your nominated representative.
            </div>
          </section>
          <section className="bis-section">
            <div className="bis-fields">
              <div className="bis-field">
                <div
                  className="bis-field-label"
                  style={{ width: '40%', fontWeight: 'bold' }}
                >
                  Name of business affected:
                </div>
                <div className="bis-field-label" style={{ width: '60%' }}>
                  {data.businessName}
                </div>
              </div>
              <div className="bis-field">
                <div
                  className="bis-field-label"
                  style={{ width: '40%', fontWeight: 'bold' }}
                >
                  Business Address:
                </div>
                <div className="bis-field-label" style={{ width: '60%' }}>
                  {data.businessAddress}
                </div>
              </div>
              <div className="bis-field">
                <div
                  className="bis-field-label"
                  style={{ width: '40%', fontWeight: 'bold' }}
                >
                  Contact name:
                </div>
                <div className="bis-field-label" style={{ width: '60%' }}>
                  {data.contactName}
                </div>
              </div>
              <div className="bis-field">
                <div
                  className="bis-field-label"
                  style={{ width: '40%', fontWeight: 'bold' }}
                >
                  Telephone Number:
                </div>
                <div className="bis-field-label" style={{ width: '60%' }}>
                  {data.telephone}
                </div>
              </div>
              <div className="bis-field">
                <div
                  className="bis-field-label"
                  style={{ width: '40%', fontWeight: 'bold' }}
                >
                  Address:
                </div>
                <div className="bis-field-label" style={{ width: '60%' }}>
                  {data.contactAddress}
                </div>
              </div>
              <div className="bis-field">
                <div
                  className="bis-field-label"
                  style={{ width: '40%', fontWeight: 'bold' }}
                >
                  Crime Number:
                </div>
                <div className="bis-field-label" style={{ width: '60%' }}>
                  {data.crimeNumber}
                </div>
              </div>
              <div className="bis-field">
                <div
                  className="bis-field-label"
                  style={{ width: '40%', fontWeight: 'bold' }}
                >
                  Police Officer Attending:
                </div>
                <div className="bis-field-label" style={{ width: '60%' }}>
                  {data.policeOfficerAttending}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className="page">
        <div className="bis-body-div">
          <section className="bis-section">
            <h2 className="bis-section-header">1. Financial Impact</h2>

            <div
              className="bis-field-label"
              style={{ width: '100%', fontWeight: 'bold', marginTop: 20 }}
            >
              {data.financialImpact === 'true'
                ? 'The business has suffered a direct financial loss as a result of the crime.'
                : 'The business has not suffered a direct financial loss as a result of the crime.'}
            </div>
          </section>
          <section className="bis-section">
            <h2 className="bis-section-sub-header">
              1.1. Direct financial losses
            </h2>
            <div>
              These could include but are not limited to:
              <br />
              <ul>
                <li>Assets lost or stolen</li>
                <li>Damage to property or buildings</li>
              </ul>
              <br />
              <br />
              Please explain how your business has suffered a direct financial
              loss as a result of the crime.
            </div>
          </section>
          <section
            className="bis-section"
            style={{ outline: '#0e1b2c solid 2px', height: '80%', padding: 10 }}
          >
            <div>{data.directLossStatement}</div>
          </section>
        </div>
      </div>
      <div className="page">
        <div className="bis-body-div">
          <section className="bis-section">
            <h2 className="bis-section-sub-header">
              1.2 Other, indirect financial losses
            </h2>
            <div>
              These could include but are not limited to:
              <br />
              <ul>
                <li>Loss of customer</li>
                <li>Impact on consumer confidence</li>
                <li>Staff time</li>
                <li>
                  Expenditure on security measures (e.g. physical
                  infrastructure, IT)
                </li>
                <li>Medical expenses</li>
                <li>Costs of contractual staff</li>
              </ul>
              <br />
              <br />
              Please explain how your business has suffered an indirect
              financial loss as a result of the crime.
            </div>
          </section>
          <section
            className="bis-section"
            style={{ outline: '#0e1b2c solid 2px', height: '75%', padding: 10 }}
          >
            <div>{data.otherLossStatement}</div>
          </section>
        </div>
      </div>
      <div className="page">
        <div className="bis-body-div">
          <section className="bis-section">
            <h2 className="bis-section-sub-header">2. Non-Financial Impact</h2>
            <div>
              Please explain how the incident has had a non-financial impact on
              your business.
              <br />
              <br />
              This could include:
              <br />
              <ul>
                <li>Reputational damage </li>
                <li>Physical injuries sustained by staff or customers</li>
              </ul>
              <br />
              <br />
            </div>
          </section>
          <section
            className="bis-section"
            style={{ outline: '#0e1b2c solid 2px', height: '85%', padding: 10 }}
          >
            <div>{data.otherLossStatement}</div>
          </section>
        </div>
      </div>
      <div className="page">
        <div className="bis-body-div">
          <section className="bis-section">
            <h2 className="bis-section-sub-header">3. Other Comments</h2>
            <div>
              Please use this space to set out any further comments you wish to
              make about the impact of the crime on your business.
              <br />
            </div>
          </section>
          <section
            className="bis-section"
            style={{
              outline: '#0e1b2c solid 2px',
              height: '100%',
              padding: 10,
            }}
          >
            <div>{data.otherLossStatement}</div>
          </section>
        </div>
      </div>
      <div className="page">
        <div className="bis-body-div">
          <section className="bis-section">
            <h2
              className="bis-section-sub-header"
              style={{ textDecoration: 'none' }}
            >
              4. Do you intend to seek compensation as a result of the crime?{' '}
            </h2>
            <div>
              {data.compensation}

              <br />
            </div>
          </section>
          <section className="bis-section">
            <h2 className="bis-section-sub-header">Declaration </h2>
            <div>
              The statement (consisting of {noPages} page(s) signed by me) is
              true to the best of my knowledge and belief and I make it knowing
              that, if it is tendered in evidence, I shall be liable to
              prosecution if I have wilfully stated anything which I know to be
              false, or do not believe to be true.
            </div>
            <div className="bis-fields">
              <div
                className="bis-field"
                style={{ marginBottom: 0, height: 50, alignItems: 'flex-end' }}
              >
                <div className="bis-field-signature">
                  Signature:
                  <div
                    className="image-container"
                    dangerouslySetInnerHTML={{
                      __html: data.signature || '',
                    }}
                  />{' '}
                </div>
              </div>
              <div className="field">
                <div
                  className="bis-field-label"
                  style={{ width: '90%', marginTop: 15, fontSize: 20 }}
                >
                  Date: {data.date}
                </div>{' '}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default createBusinessImpact;
