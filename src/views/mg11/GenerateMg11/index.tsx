import React from 'react';
import './styles.css';
import processText from '../../../utils/generate-text';

interface Mg11Data {
  name: string;
  urn: string;
  age: string;
  witnessSignature: string;
  witnessSignatureDate: string;
  visualRecording: boolean;
  statement: string;
  address: string;
  postcode: string;
  homeTel: string;
  workTel: string;
  mobileTel: string;
  email: string;
  occupation: string;
  prefContact: string;
  gender: string;
  dobPlace: string;
  formerName: string;
  height: string;
  ethnicity: string;
  availability: string;
  likelyToAttend: boolean;
  likelyToAttendReason: string;
  specialMeasures: boolean;
  careNeeds: boolean;
  careNeedsDetails: string;
  station: string;
  statementWhereWhen: string;
  detailsExplained: boolean;
  leafletReceived: boolean;
  medicalReleasedPolice: string;
  medicalReleasedDefence: string;
  civilProceedingsRelease: string;
  witnessServiceDisclose: boolean;
  statementTakerName: string;
  interviewerSignature: string;
}

const generateMg11 = () => {
  const rawdata = localStorage.getItem('data') || '{}';
  const data: Partial<Mg11Data> = JSON.parse(rawdata);

  const { text1, text2, noPages } = processText(data.statement || '');
  return (
    <div>
      <div className="page">
        <div className="container">
          <div className="box">RESTRICTED (when completed)</div>
          <div className="text">MG 11(T)</div>
        </div>
        <div className="body-div">
          <section className="section">
            <h2 className="section-title">WITNESS STATEMENT</h2>
            <p className="section-subtitle">
              (CJ Act 1967, s.9; MC Act 1980, ss.5A(3)(a) and 5B; MC Rules 1981,
              r.70)
            </p>
            <div className="fields">
              <div className="field">
                <div
                  className="field-label"
                  style={{
                    fontWeight: 'bold',
                  }}
                >
                  Statement of {data.name}
                </div>
                <div className="field-label">URN: {data.urn}</div>
              </div>
              <div className="field">
                <div className="field-label">Age: {data.age}</div>
                <div className="field-label">Occupation: {data.occupation}</div>
              </div>
            </div>
          </section>
          <section className="section">
            <div className="fields">
              <div className="field">
                <div className="field-statement-consent">
                  This statement (consisting of {noPages} page(s) each signed by
                  me) is true to the best of my knowledge and belief and I make
                  it knowing that, if it is tendered in evidence, I shall be
                  liable to prosecution if I have wilfully stated in it anything
                  which I know to be false or do not believe to be true.
                </div>
              </div>
              <div
                className="field"
                style={{ marginBottom: 0, height: 50, alignItems: 'flex-end' }}
              >
                <div className="field-signature">
                  Signature:{' '}
                  <div
                    className="image-container"
                    dangerouslySetInnerHTML={{
                      __html: data.witnessSignature || '',
                    }}
                  />{' '}
                </div>
                <div className="field-date">
                  Date:{' '}
                  {data.witnessSignatureDate
                    ? new Date(data.witnessSignatureDate).toLocaleDateString(
                        'en-GB'
                      )
                    : new Date().toLocaleDateString('en-GB')}
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className="fields">
              <div className="field">
                <div className="field-label">
                  Was the witness evidence virtually recorded:{' '}
                  {data.visualRecording ? 'Yes' : 'No'}
                </div>
              </div>
              <div
                style={{
                  fontSize: 12,
                  hyphens: 'auto',
                }}
              >
                {text1}
              </div>
            </div>
          </section>
        </div>
        <div
          className="field-bottom"
          style={{ marginBottom: 0, height: 50, alignItems: 'flex-end' }}
        >
          <div className="field-signature-bottom">
            Signature:{' '}
            <div
              className="image-container"
              dangerouslySetInnerHTML={{
                __html: data.witnessSignature || '',
              }}
            />{' '}
          </div>
          <div className="field-signature-bottom">
            Signature witnessed by:{' '}
            <div
              className="image-container"
              dangerouslySetInnerHTML={{
                __html: data.interviewerSignature || '',
              }}
            />
          </div>
        </div>
      </div>

      {noPages === 3 && (
        <div className="page">
          <div className="container">
            <div className="box">RESTRICTED (when completed)</div>
            <div className="text">Page 2 of 3</div>
          </div>
          <div className="body-div">
            <section>
              <div className="fields">
                <div
                  style={{
                    fontSize: 12,
                    hyphens: 'auto',
                    marginTop: 15,
                  }}
                >
                  {text2}
                </div>
              </div>
            </section>
          </div>
          <div
            className="field-bottom"
            style={{ marginBottom: 0, height: 50, alignItems: 'flex-end' }}
          >
            <div className="field-signature-bottom">
              Signature:{' '}
              <div
                className="image-container"
                dangerouslySetInnerHTML={{
                  __html: data.witnessSignature || '',
                }}
              />{' '}
            </div>
            <div className="field-signature-bottom">
              Signature witnessed by:{' '}
              <div
                className="image-container"
                dangerouslySetInnerHTML={{
                  __html: data.interviewerSignature || '',
                }}
              />
            </div>
          </div>
        </div>
      )}
      <div className="page">
        <div className="container">
          <div className="box">
            RESTRICTED - FOR POLICE AND PROSECUTION ONLY <br />
            (when completed)
          </div>
          <div className="text-last">
            MG 11(T)
            <br /> Page {noPages} of {noPages}
          </div>
        </div>{' '}
        <div className="body-div" style={{ outline: 0 }}>
          <section className="section" style={{ borderBottom: 0 }}>
            <div className="fields">
              <div className="field">
                <div className="field-label" style={{ width: '80%' }}>
                  Home address: {data.address}
                </div>
                <div className="field-label" style={{ width: '20%' }}>
                  Postcode: {data.postcode}
                </div>
              </div>
              <div className="field">
                <div className="field-label">
                  Home telephone: {data.homeTel}
                </div>
                <div className="field-label">
                  Work telephone: {data.workTel}
                </div>
              </div>
              <div className="field">
                <div className="field-label">
                  Mobile telephone: {data.mobileTel}
                </div>
                <div className="field-label">Email: {data.email}</div>
              </div>
              <div className="field">
                <div className="field-label" style={{ width: '90%' }}>
                  Preferred means of contact: {data.prefContact}
                </div>
              </div>
              <div className="field">
                <div className="field-label" style={{ width: '40%' }}>
                  Gender: {data.gender}
                </div>
                <div className="field-label" style={{ width: '60%' }}>
                  Date and place of birth: {data.dobPlace}
                </div>
              </div>
              <div className="field">
                <div className="field-label" style={{ width: '40%' }}>
                  Former name: {data.formerName}
                </div>
                <div className="field-label" style={{ width: '30%' }}>
                  Height: {data.height}
                </div>
                <div className="field-label" style={{ width: '30%' }}>
                  Ethnicity: {data.ethnicity}
                </div>
              </div>
              <div className="field">
                <div className="field-label" style={{ width: '90%' }}>
                  Date of witness non-availability: {data.availability}
                </div>
              </div>
              <div className="field">
                <div
                  className="field-label"
                  style={{
                    fontWeight: 'bold',
                    // underlined
                    textDecoration: 'underline',
                  }}
                >
                  Witness Care{' '}
                </div>
              </div>
              <div className="field">
                <div className="field-label" style={{ width: '5%' }}>
                  a)
                </div>
                <div className="field-label" style={{ width: '90%' }}>
                  Is the witness willing and likely to attend court?{'  '}
                  {data.likelyToAttend ? 'Yes;' : 'No;'} What can be done to
                  ensure attendance? {data.likelyToAttendReason}
                </div>
              </div>
              <div className="field">
                <div className="field-label" style={{ width: '5%' }}>
                  b)
                </div>
                <div className="field-label" style={{ width: '90%' }}>
                  {'  '}Does the witness require &quot;special measures&quot; as
                  a vulnerable or intimidated witness?{'  '}
                  {data.specialMeasures ? 'Yes;' : 'No'}
                </div>
              </div>
              <div className="field">
                <div className="field-label" style={{ width: '5%' }}>
                  c)
                </div>
                <div className="field-label" style={{ width: '90%' }}>
                  Does the witness have any specific care need?{'  '}
                  {data.careNeeds ? 'Yes;' : 'No;'} If yes, please specify:
                  {'  '}
                  {data.careNeedsDetails}
                </div>
              </div>
            </div>
          </section>
          <section className="section-full">
            <div className="fields">
              <div className="field">
                <div
                  className="field-label"
                  style={{
                    fontWeight: 'bold',
                    textDecoration: 'underline',
                    width: '100%',
                  }}
                >
                  Witness Consent (to be completed by the witness)
                </div>
              </div>{' '}
              <div className="field">
                <div className="field-label" style={{ width: '5%' }}>
                  a)
                </div>
                <div
                  className="field-label"
                  style={{ width: '80%', marginRight: 10 }}
                >
                  The criminal justice process and Victim Personal Statement
                  scheme (victims only) has been explained to me
                </div>
                <div className="field-label" style={{ width: '10%' }}>
                  {data.detailsExplained ? 'Yes' : 'No'}
                </div>
              </div>
              <div className="field">
                <div className="field-label" style={{ width: '5%' }}>
                  b)
                </div>
                <div
                  className="field-label"
                  style={{ width: '80%', marginRight: 10 }}
                >
                  I have been given the leaflet &lsquo;Giving a witness
                  statement to police - what happens next?&lsquo;{' '}
                </div>
                <div className="field-label" style={{ width: '10%' }}>
                  {data.leafletReceived ? 'Yes' : 'No'}{' '}
                </div>
              </div>
              <div className="field">
                <div className="field-label" style={{ width: '5%' }}>
                  c)
                </div>
                <div
                  className="field-label"
                  style={{ width: '80%', marginRight: 10 }}
                >
                  I consent to the police having access to my medical records in
                  relation to this matter{' '}
                </div>
                <div className="field-label" style={{ width: '10%' }}>
                  {data.medicalReleasedPolice}
                </div>
              </div>
              <div className="field">
                <div className="field-label" style={{ width: '5%' }}>
                  d)
                </div>
                <div
                  className="field-label"
                  style={{ width: '80%', marginRight: 10 }}
                >
                  I consent to the defence having access to my medical records
                  in relation to this matter{' '}
                </div>

                <div className="field-label" style={{ width: '10%' }}>
                  {data.medicalReleasedDefence}
                </div>
              </div>
              <div className="field">
                <div className="field-label" style={{ width: '5%' }}>
                  e)
                </div>
                <div
                  className="field-label"
                  style={{ width: '80%', marginRight: 10 }}
                >
                  I consent to the statement being disclosed for the purposes of
                  civil proceedings (if applicable){' '}
                </div>
                <div className="field-label" style={{ width: '10%' }}>
                  {data.civilProceedingsRelease}
                </div>
              </div>
              <div className="field">
                <div className="field-label" style={{ width: '5%' }}>
                  f)
                </div>
                <div
                  className="field-label"
                  style={{ width: '80%', marginRight: 10 }}
                >
                  The information recorded above will be disclosed to the
                  Witness Service so they can offer help and support, unless you
                  ask them not to. Tick this box to decline their services{' '}
                </div>
                <div className="field-label" style={{ width: '10%' }}>
                  {data.witnessServiceDisclose ? 'Declined' : 'Accepted'}
                </div>
              </div>
              <div
                className="field"
                style={{ marginBottom: 0, height: 50, alignItems: 'flex-end' }}
              >
                <div className="field-signature">
                  Signature of witness:
                  <div
                    className="image-container"
                    dangerouslySetInnerHTML={{
                      __html: data.witnessSignature || '',
                    }}
                  />{' '}
                </div>
              </div>
            </div>
          </section>
          <section className="section" style={{ borderBottom: 0 }}>
            <div className="fields" style={{ marginLeft: 0, marginTop: 15 }}>
              <div className="field">
                <div className="field-label">
                  Statement taken by (print name):{'   '}{' '}
                  {data.statementTakerName}
                </div>
              </div>
              <div className="field">
                <div className="field-label">
                  Station:{'   '} {data.station}
                </div>
              </div>
              <div className="field">
                <div className="field-label">
                  Time and place statement taken:{'   '}{' '}
                  {data.statementWhereWhen}
                </div>{' '}
              </div>
              <div
                className="field"
                style={{ marginBottom: 0, height: 50, alignItems: 'flex-end' }}
              >
                <div className="field-signature">
                  Signature of witness:
                  <div
                    className="image-container"
                    dangerouslySetInnerHTML={{
                      __html: data.witnessSignature || '',
                    }}
                  />{' '}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default generateMg11;
