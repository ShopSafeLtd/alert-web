/* eslint-disable formatjs/no-literal-string-in-jsx */
import type { FormInstance } from 'antd';

import { faFileUpload } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Form, Row, Select, Tabs, Upload } from 'antd';
import { Mg11Status } from 'graphql/types';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { useNavigate } from 'react-router';

import SignatureInput from '../../../components/SignBox';
import SigSeal from '../../../components/onboarding/Onboarding/SchemeTerms/SigSeal';
import FONT_FAMILIES from '../../../components/onboarding/Onboarding/SchemeTerms/utils/Fonts';
import processText from '../../../utils/generate-text';
import './styles.css';

interface Props {
  data: Mg11Data;
  file: { file: string; name: string } | null;
  form: FormInstance;
  name: string;
  onSubmit: () => void;
  saving: boolean;
  selectedFont: string;
  setFile: (value: { file: string; name: string } | null) => void;
  setSelectedFont: (value: string) => void;
  setSign: (value: string) => void;
  setTab: (value: string) => void;
  sign: string;
  status: Mg11Status;
  tab: string;
  update: (value: string) => void;
}

export interface Mg11Data {
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
  incidentId: string;
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
// wait to check
const generateMg11 = ({
  data,
  file,
  form,
  name,
  onSubmit,
  saving,
  selectedFont,
  setFile,
  setSelectedFont,
  setSign,
  setTab,
  sign,
  status,
  tab,
  update,
}: Props) => {
  const navigate = useNavigate();
  const { noPages, text1, text2 } = processText(data.statement || '');

  if (status === Mg11Status.Completed) {
    navigate(`/incidents/view/${data.incidentId}`);
  }
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
                {/* wait to check */}
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
                style={{ alignItems: 'flex-end', height: 50, marginBottom: 0 }}
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
                    ? new Date(
                        new Date(data.witnessSignatureDate)
                      ).toLocaleDateString('en-GB')
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
          style={{ alignItems: 'flex-end', height: 50, marginBottom: 0 }}
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
            style={{ alignItems: 'flex-end', height: 50, marginBottom: 0 }}
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
                  style={{ marginRight: 10, width: '80%' }}
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
                  style={{ marginRight: 10, width: '80%' }}
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
                  style={{ marginRight: 10, width: '80%' }}
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
                  style={{ marginRight: 10, width: '80%' }}
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
                  style={{ marginRight: 10, width: '80%' }}
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
                  style={{ marginRight: 10, width: '80%' }}
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
                style={{ alignItems: 'flex-end', height: 50, marginBottom: 0 }}
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
                <div className="field-label" style={{ width: '90%' }}>
                  Statement taken by (print name):{'   '}{' '}
                  {data.statementTakerName}
                </div>
              </div>
              <div className="field">
                <div className="field-label" style={{ width: '90%' }}>
                  Station:{'   '} {data.station}
                </div>
              </div>
              <div className="field">
                <div className="field-label" style={{ width: '90%' }}>
                  Time and place statement taken:{'   '}{' '}
                  {data.statementWhereWhen}
                </div>{' '}
              </div>
              <div
                className="field"
                style={{ alignItems: 'flex-end', height: 50, marginBottom: 0 }}
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
        <Form
          form={form}
          initialValues={{
            interviewerSignature: '',
          }}
          layout="vertical"
          onFinish={onSubmit}
        >
          <Row gutter={10}>
            <Col span={24}>
              <Form.Item
                label="Please Sign here"
                name="termsSignature"
                rules={[
                  () => ({
                    validator() {
                      if (tab === 'generate') {
                        if (selectedFont) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error('Please select a signature!')
                        );
                      }
                      if (tab === 'upload') {
                        if (file) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error('Please upload a signature!')
                        );
                      }
                      if (tab === 'draw') {
                        if (sign) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('Please sign!'));
                      }
                      return Promise.reject(
                        new Error('Please select/enter a signature!')
                      );
                    },
                  }),
                ]}
              >
                <div style={{ display: 'flex', width: '100%' }}>
                  <Tabs
                    activeKey={tab}
                    destroyInactiveTabPane
                    onChange={(tabKey) => {
                      setTab(tabKey);
                      if (tabKey === 'upload' && file?.file) {
                        setSign('');

                        update(
                          ReactDOMServer.renderToString(
                            <img
                              alt="file"
                              height={100}
                              src={`data:application/pdf;base64,${file?.file}`}
                              width={300}
                            />
                          )
                        );
                      }
                      if (tabKey === 'generate') {
                        setSign('');
                        update(
                          ReactDOMServer.renderToString(
                            <SigSeal
                              font={selectedFont}
                              height={100}
                              key={selectedFont}
                              name={name}
                              width={300}
                            />
                          )
                        );
                      }
                      if (tabKey === 'draw') {
                        update('');
                      }
                    }}
                    style={{ height: 250, width: 500 }}
                    type="card"
                  >
                    <Tabs.TabPane key="generate" tab="Generate">
                      <Select
                        defaultValue={selectedFont}
                        onChange={(value) => {
                          setSelectedFont(value);
                          update(
                            ReactDOMServer.renderToString(
                              <SigSeal
                                font={selectedFont}
                                height={100}
                                key={selectedFont}
                                name={name}
                                width={300}
                              />
                            )
                          );
                        }}
                        style={{
                          fontFamily: selectedFont,
                          marginBottom: 20,
                        }}
                      >
                        {FONT_FAMILIES.map((font) => (
                          <Select.Option
                            key={font}
                            style={{
                              fontFamily: font,
                            }}
                            value={font}
                          >
                            {name}
                          </Select.Option>
                        ))}
                      </Select>
                      <SigSeal
                        font={selectedFont}
                        height={100}
                        key={selectedFont}
                        name={name}
                        width={300}
                      />
                    </Tabs.TabPane>
                    <Tabs.TabPane key="upload" tab="Upload">
                      <>
                        <Upload
                          beforeUpload={(f) => {
                            const reader = new FileReader();
                            reader.addEventListener('load', (e) => {
                              if (e.target) {
                                const base64File = e.target.result;
                                if (typeof base64File === 'string') {
                                  const base64result = base64File.split(',')[1];

                                  setFile({
                                    file: base64result,
                                    name: f.name,
                                  });
                                  update(
                                    ReactDOMServer.renderToString(
                                      <img
                                        alt="file"
                                        height={100}
                                        src={base64File}
                                        width={300}
                                      />
                                    )
                                  );
                                }
                              }
                            });
                            reader.readAsDataURL(f);
                            // Prevent upload
                            return false;
                          }}
                          showUploadList={false}
                        >
                          <Button key="uploadButton" type="primary">
                            <FontAwesomeIcon
                              icon={faFileUpload}
                              style={{ fontSize: 16, marginRight: '10px' }}
                            />
                            Upload
                          </Button>
                        </Upload>
                        {file && (
                          <div style={{ paddingLeft: 10, paddingTop: 10 }}>
                            <img
                              alt="file"
                              height={100}
                              src={`data:application/pdf;base64,${file.file}`}
                              width={300}
                            />
                          </div>
                        )}
                      </>
                    </Tabs.TabPane>
                    <Tabs.TabPane key="draw" tab="Draw">
                      <SignatureInput
                        hidden={false}
                        onChange={(val: string) => {
                          update(val);
                          setSign(val);
                        }}
                      />
                    </Tabs.TabPane>
                  </Tabs>
                </div>
              </Form.Item>
            </Col>
          </Row>

          {/* Buttons */}
          <Form.Item>
            <Row gutter={10} justify="end" style={{ marginTop: 10 }}>
              <Col>
                <Button disabled={saving} onClick={() => window.history.back()}>
                  Cancel
                </Button>
              </Col>
              <Col>
                <Button
                  disabled={saving}
                  htmlType="submit"
                  loading={saving}
                  type="primary"
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default generateMg11;
