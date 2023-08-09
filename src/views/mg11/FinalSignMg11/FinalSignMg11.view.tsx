/* eslint-disable formatjs/no-literal-string-in-jsx */
import React from 'react';
import './styles.css';
import type { FormInstance } from 'antd';
import { Button, Col, Form, Row, Select, Tabs, Upload } from 'antd';
import ReactDOMServer from 'react-dom/server';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload } from '@fortawesome/pro-light-svg-icons';
import { useNavigate } from 'react-router';
import { Mg11Status } from 'graphql/generated';
import SigSeal from '../../../components/onboarding/Onboarding/SchemeTerms/SigSeal';
import FONT_FAMILIES from '../../../components/onboarding/Onboarding/SchemeTerms/utils/Fonts';
import SignatureInput from '../../../components/SignBox';
import processText from '../../../utils/generate-text';

interface Props {
  onSubmit: () => void;
  saving: boolean;
  form: FormInstance;
  setSign: (value: string) => void;
  update: (value: string) => void;
  selectedFont: string;
  name: string;
  file: { file: string; name: string } | null;
  setTab: (value: string) => void;
  tab: string;
  setSelectedFont: (value: string) => void;
  setFile: (value: { file: string; name: string } | null) => void;
  data: Mg11Data;
  status: Mg11Status;
  sign: string;
}

export interface Mg11Data {
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
  incidentId: string;
}
// wait to check
const generateMg11 = ({
  onSubmit,
  saving,
  form,
  setSign,
  update,
  selectedFont,
  name,
  file,
  setTab,
  tab,
  setSelectedFont,
  setFile,
  data,
  sign,
  status,
}: Props) => {
  const navigate = useNavigate();
  const { text1, text2, noPages } = processText(data.statement || '');

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
        <Form
          form={form}
          initialValues={{
            interviewerSignature: '',
          }}
          onFinish={onSubmit}
          layout="vertical"
        >
          <Row gutter={10}>
            <Col span={24}>
              <Form.Item
                name="termsSignature"
                label="Please Sign here"
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
                <div style={{ width: '100%', display: 'flex' }}>
                  <Tabs
                    activeKey={tab}
                    onChange={(tabKey) => {
                      setTab(tabKey);
                      if (tabKey === 'upload' && file?.file) {
                        setSign('');

                        update(
                          ReactDOMServer.renderToString(
                            <img
                              src={`data:application/pdf;base64,${file?.file}`}
                              alt="file"
                              height={100}
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
                              key={selectedFont}
                              name={name}
                              font={selectedFont}
                              height={100}
                              width={300}
                            />
                          )
                        );
                      }
                      if (tabKey === 'draw') {
                        update('');
                      }
                    }}
                    type="card"
                    style={{ height: 250, width: 500 }}
                    destroyInactiveTabPane
                  >
                    <Tabs.TabPane tab="Generate" key="generate">
                      <Select
                        style={{
                          fontFamily: selectedFont,
                          marginBottom: 20,
                        }}
                        defaultValue={selectedFont}
                        onChange={(value) => {
                          setSelectedFont(value);
                          update(
                            ReactDOMServer.renderToString(
                              <SigSeal
                                key={selectedFont}
                                name={name}
                                font={selectedFont}
                                height={100}
                                width={300}
                              />
                            )
                          );
                        }}
                      >
                        {FONT_FAMILIES.map((font) => (
                          <Select.Option
                            key={font}
                            value={font}
                            style={{
                              fontFamily: font,
                            }}
                          >
                            {name}
                          </Select.Option>
                        ))}
                      </Select>
                      <SigSeal
                        key={selectedFont}
                        name={name}
                        font={selectedFont}
                        height={100}
                        width={300}
                      />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Upload" key="upload">
                      <>
                        <Upload
                          showUploadList={false}
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
                                        src={`data:application/pdf;base64,${base64result}`}
                                        alt="file"
                                        height={100}
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
                          <div style={{ paddingTop: 10, paddingLeft: 10 }}>
                            <img
                              src={`data:application/pdf;base64,${file.file}`}
                              alt="file"
                              height={100}
                              width={300}
                            />
                          </div>
                        )}
                      </>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Draw" key="draw">
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
            <Row style={{ marginTop: 10 }} gutter={10} justify="end">
              <Col>
                <Button disabled={saving} onClick={() => window.history.back()}>
                  Cancel
                </Button>
              </Col>
              <Col>
                <Button
                  disabled={saving}
                  loading={saving}
                  type="primary"
                  htmlType="submit"
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
