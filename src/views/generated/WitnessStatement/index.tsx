/* eslint-disable formatjs/no-literal-string-in-jsx */
import React from 'react';

import './styles.css';

interface Mg11Data {
  address: string;
  age: string;
  availability: string;
  careNeeds: boolean;
  careNeedsDetails: string;
  civilProceedingsRelease: string;
  detailsExplained: boolean;
  dobPlace: string;
  email: string;
  ethnicity: string;
  formerName: string;
  gender: string;
  height: string;
  homeTel: string;
  interviewerSignature: string;
  leafletReceived: boolean;
  likelyToAttend: boolean;
  likelyToAttendReason: string;
  medicalReleasedDefence: string;
  medicalReleasedPolice: string;
  mobileTel: string;
  name: string;
  occupation: string;
  postcode: string;
  prefContact: string;
  specialMeasures: boolean;
  statement: string;
  statementTakerName: string;
  statementWhereWhen: string;
  station: string;
  urn: string;
  visualRecording: boolean;
  witnessServiceDisclose: boolean;
  witnessSignature: string;
  witnessSignatureDate: string;
  workTel: string;
}

function processText(text: string) {
  let breakpoint = 4644;

  const result = {
    noPages: 1,
    text1: '',
    text2: '',
    text3: '',
  };

  if (text.length <= breakpoint) {
    result.text1 = text;
    result.noPages = 1;
    return result;
  }

  let breakIndex1 = text.lastIndexOf(' ', breakpoint);
  if (breakIndex1 === -1) {
    breakIndex1 = breakpoint;
  }
  result.text1 = text.slice(0, breakIndex1).trimEnd();
  const remaining = text.slice(breakIndex1).trimStart();

  breakpoint = 6700;
  if (remaining.length <= breakpoint) {
    result.text2 = remaining;
    result.noPages = 2;
    return result;
  }

  let breakIndex2 = remaining.lastIndexOf(' ', breakpoint);
  if (breakIndex2 === -1) {
    breakIndex2 = breakpoint;
  }
  result.text2 = remaining.slice(0, breakIndex2).trimEnd();
  result.text3 = remaining.slice(breakIndex2).trimStart();
  result.noPages = 3;

  return result;
}

export const GenWitness = () => {
  const rawdata = localStorage.getItem('data') || '{}';

  const data = JSON.parse(rawdata) as Mg11Data;

  const { noPages, text1, text2 } = processText(data.statement || ``);
  return (
    <div>
      <div className="page-witness">
        <div className="container-witness">
          <div className="header-text-witness">
            <div>GSC Class:</div>
            <div>Reason:</div>
            <div>Handling Conditions:</div>
          </div>
          <div className="text-witness">MG 11(T)</div>
        </div>
        <div className="body-div-witness">
          <section className="section-witness">
            <h2 className="section-title-witness">WITNESS STATEMENT</h2>
            <p className="section-subtitle-witness">
              ( Criminal Procedure Rules, r. 16.2; Criminal Justice Act 1967, s.
              9 )
            </p>
            <div className="fields-witness">
              <div className="field-witness">
                <div
                  className="field-label-witness"
                  style={{
                    fontWeight: 'bold',
                  }}
                >
                  Statement of {data.name}
                </div>
                <div className="field-label-witness">URN: {data.urn}</div>
              </div>
              <div className="field-witness">
                <div className="field-label-witness">Age: {data.age}</div>
                <div className="field-label-witness">
                  Occupation: {data.occupation}
                </div>
              </div>
            </div>
          </section>
          <section className="section-witness">
            <div className="fields-witness">
              <div className="field-witness">
                <div className="field-statement-consent-witness">
                  This statement (consisting of {noPages} page(s) each signed by
                  me) is true to the best of my knowledge and belief and I make
                  it knowing that, if it is tendered in evidence, I shall be
                  liable to prosecution if I have wilfully stated in it anything
                  which I know to be false or do not believe to be true.
                </div>
              </div>
              <div
                className="field-witness"
                style={{ alignItems: 'flex-end', height: 50, marginBottom: 0 }}
              >
                <div className="field-signature-witness">
                  Signature:{' '}
                  <div
                    className="image-container-witness"
                    dangerouslySetInnerHTML={{
                      __html: data.witnessSignature || '',
                    }}
                  />{' '}
                </div>
                <div className="field-date-witness">
                  Date:{' '}
                  {data.witnessSignatureDate
                    ? new Date(
                        new Date(data.witnessSignatureDate)
                      ).toLocaleDateString('en-GB')
                    : new Date().toLocaleDateString('en-GB')}
                </div>
              </div>
            </div>
          </section>
          <section className="section-witness">
            <div className="fields-witness">
              <div className="field-witness">
                <div className="field-label-witness">
                  Was the witness evidence virtually recorded:{' '}
                  {data.visualRecording ? 'Yes' : 'No'}
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className="fields-witness">
              <div className="field-witness">
                <div
                  style={{
                    fontSize: 12,
                    hyphens: 'auto',
                  }}
                >
                  {text1}
                </div>
              </div>
            </div>
          </section>
        </div>
        <div
          className="field-bottom-witness"
          style={{ alignItems: 'flex-end', height: 50, marginBottom: 0 }}
        >
          <div className="field-signature-bottom-witness">
            Signature:{' '}
            <div
              className="image-container-witness"
              dangerouslySetInnerHTML={{
                __html: data.witnessSignature || '',
              }}
            />{' '}
          </div>
          <div className="field-signature-bottom-witness">
            Signature witnessed by:{' '}
            <div
              className="image-container-witness"
              dangerouslySetInnerHTML={{
                __html: data.interviewerSignature || '',
              }}
            />
          </div>
        </div>
      </div>

      {noPages > 1 &&
        Array.from({ length: noPages - 1 }, (_, idx) => {
          const pageNum = idx + 2; // Pages start at 2 for continuation pages
          return (
            <div className="page-witness" key={pageNum}>
              <div className="container-witness">
                <div className="header-text-witness">
                  <div>
                    Continuation of Statement of: <strong>{data.name}</strong>
                  </div>
                  <div className="text-witness">
                    Page {pageNum} of {noPages}
                  </div>
                </div>
                <div className="body-div-witness">
                  <section>
                    <div className="fields-witness">
                      <div className="field-witness">
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
                    </div>
                  </section>
                </div>
                <div
                  className="field-bottom-witness"
                  style={{
                    alignItems: 'flex-end',
                    height: 50,
                    marginBottom: 0,
                  }}
                >
                  <div className="field-signature-bottom-witness">
                    Signature:{' '}
                    <div
                      className="image-container-witness"
                      dangerouslySetInnerHTML={{
                        __html: data.witnessSignature || '',
                      }}
                    />
                  </div>
                  <div className="field-signature-bottom-witness">
                    Signature witnessed by:{' '}
                    <div
                      className="image-container-witness"
                      dangerouslySetInnerHTML={{
                        __html: data.interviewerSignature || '',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};
