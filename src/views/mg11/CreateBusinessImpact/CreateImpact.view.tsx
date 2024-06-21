/* eslint-disable formatjs/no-literal-string-in-jsx */
import React from 'react';
import './styles.css';
import type { FormInstance } from 'antd';
import {
  Button,
  Card,
  Collapse,
  Form,
  Tabs,
  Upload,
  Col,
  Descriptions,
  Input,
  PageHeader,
  Radio,
  Row,
  Select,
} from 'antd';
import ReactDOMServer from 'react-dom/server';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload } from '@fortawesome/pro-light-svg-icons';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import SigSeal from '../../../components/onboarding/Onboarding/SchemeTerms/SigSeal';
import FONT_FAMILIES from '../../../components/onboarding/Onboarding/SchemeTerms/utils/Fonts';
import SignatureInput from '../../../components/SignBox';

export interface BusinessImpactStatementProps {
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
const { TextArea } = Input;

export interface FormData {
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

export interface IncidentData {
  userName: string;
  userAddress: string;
  userContact: string;
  businessName: string;
  businessAddress: string;
  referenceNumber: string;
  incidentDate: string;
  incidentLoss: string;
  incidentRecovered: string;
  description: string;
  lostItems: string[];
}

interface Props {
  onSubmit: (value: FormData) => void;
  saving: boolean;
  form: FormInstance<FormData>;
  sign: string;
  setSign: (value: string) => void;
  update: (value: string) => void;
  selectedFont: string;
  name: string;
  file: { file: string; name: string } | null;
  setTab: (value: string) => void;
  tab: string;
  setSelectedFont: (value: string) => void;
  setFile: (value: { file: string; name: string } | null) => void;
  incidentData: IncidentData;
  data: FormData;
}

const createBusinessImpact = ({
  incidentData,
  form,
  setSign,
  sign,
  name,
  setFile,
  file,
  selectedFont,
  setSelectedFont,
  tab,
  setTab,
  update,
  saving,
  onSubmit,
  data,
}: Props) => {
  const noPages = 6;
  const navigate = useNavigate();
  const { id: incidentId } = useParams();

  return (
    <>
      <Row>
        <PageHeader
          onBack={() => navigate(`/app/incidents/view/${incidentId || ''}`)}
          title="Create Business Impact Statement"
        />
      </Row>
      <Row>
        <Col
          span={16}
          style={{
            padding: '0 20px',
          }}
        >
          <Card>
            <Form<FormData>
              form={form}
              initialValues={data}
              onFinish={onSubmit}
            >
              <div>
                <div>
                  <div>
                    <section className="bis-section">
                      <h2
                        style={{
                          fontSize: 20,
                          textAlign: 'center',
                          fontWeight: 600,
                          marginBottom: 0,
                        }}
                      >
                        IMPACT STATEMENT FOR BUSINESS
                      </h2>
                      <p>
                        Criminal Procedure Rules, r 27.2; Criminal Justice Act
                        1967, s. 9; Magistrates; Courts Act 1980, s. 5B
                      </p>
                    </section>
                    <section className="bis-section">
                      <div>
                        The Impact Statement for Business (ISB) gives you the
                        opportunity to set out the impact that a crime has had
                        on the business such as direct financial loss, and wider
                        impacts, e.g. operational disruption or reputational
                        damage. The court will take the statement into account
                        when determining sentence.
                        <br />
                        <br />
                        In this statement you should not provide an opinion or
                        recommendation on the sentence or sanctions that the
                        court should use. This is for the court to decide. You
                        should limit the information you give in this statement
                        to the impact this particular crime has had on the
                        business, rather than providing information on how any
                        previous criminal activity may have affected the
                        business (unless, for example, this crime results from
                        the repeat offending of the same offender). <br />{' '}
                        <br />
                        The business should consider carefully who to nominate
                        as the representative to make the statement on its
                        behalf. Once you have completed this form, you should
                        return it by email or by post to your police contact. A
                        person making an ISB on behalf of a corporation (“the
                        nominated representative”) must be authorised to do so
                        on its behalf. The nominated representative must also be
                        in a position to give evidence that is admissible in
                        court about the impact of the crime on the business. The
                        nominated representative may be required to answer
                        questions on the ISB in court. <br /> <br />
                        You should be aware that if you choose not to make a
                        statement at the outset of the proceedings, you may not
                        have another opportunity to make one later on. This is
                        because the case may be dealt with by the courts very
                        quickly. <br /> <br />
                        In more complex cases which may take longer to be dealt
                        with by the courts, you may wish to take more time to
                        collect relevant information, for example, accounts or
                        other business documents. The police will be in touch to
                        let you know the date of the first hearing date and at
                        that stage, you will need to make or update your ISB
                        through your nominated representative.
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
                          <div
                            className="bis-field-label"
                            style={{ width: '60%' }}
                          >
                            <Form.Item name="businessName">
                              <Input />
                            </Form.Item>
                          </div>
                        </div>
                        <div className="bis-field">
                          <div
                            className="bis-field-label"
                            style={{ width: '40%', fontWeight: 'bold' }}
                          >
                            Business Address:
                          </div>
                          <div
                            className="bis-field-label"
                            style={{ width: '60%' }}
                          >
                            <Form.Item name="businessAddress">
                              <Input />
                            </Form.Item>
                          </div>
                        </div>
                        <div className="bis-field">
                          <div
                            className="bis-field-label"
                            style={{ width: '40%', fontWeight: 'bold' }}
                          >
                            Contact name:
                          </div>
                          <div
                            className="bis-field-label"
                            style={{ width: '60%' }}
                          >
                            <Form.Item name="contactName">
                              <Input />
                            </Form.Item>{' '}
                          </div>
                        </div>
                        <div className="bis-field">
                          <div
                            className="bis-field-label"
                            style={{ width: '40%', fontWeight: 'bold' }}
                          >
                            Telephone Number:
                          </div>
                          <div
                            className="bis-field-label"
                            style={{ width: '60%' }}
                          >
                            <Form.Item name="telephone">
                              <Input />
                            </Form.Item>{' '}
                          </div>
                        </div>
                        <div className="bis-field">
                          <div
                            className="bis-field-label"
                            style={{ width: '40%', fontWeight: 'bold' }}
                          >
                            Address:
                          </div>
                          <div
                            className="bis-field-label"
                            style={{ width: '60%' }}
                          >
                            <Form.Item name="contactAddress">
                              <Input />
                            </Form.Item>{' '}
                          </div>
                        </div>
                        <div className="bis-field">
                          <div
                            className="bis-field-label"
                            style={{ width: '40%', fontWeight: 'bold' }}
                          >
                            Crime Number:
                          </div>
                          <div
                            className="bis-field-label"
                            style={{ width: '60%' }}
                          >
                            <Form.Item name="crimeNumber">
                              <Input />
                            </Form.Item>{' '}
                          </div>
                        </div>
                        <div className="bis-field">
                          <div
                            className="bis-field-label"
                            style={{ width: '40%', fontWeight: 'bold' }}
                          >
                            Police Officer Attending:
                          </div>
                          <div
                            className="bis-field-label"
                            style={{ width: '60%' }}
                          >
                            <Form.Item name="policeOfficerAttending">
                              <Input />
                            </Form.Item>{' '}
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
                <div>
                  <div>
                    <section className="bis-section">
                      <h2>1. Financial Impact</h2>

                      <div
                        className="bis-field-label"
                        style={{
                          width: '100%',
                          fontWeight: 'bold',
                          marginTop: 20,
                        }}
                      >
                        Did the business suffer a direct Financial Loss?
                      </div>
                      <Form.Item
                        name="financialImpact"
                        rules={[
                          {
                            required: true,
                            message: 'Please select an option',
                          },
                        ]}
                      >
                        <Radio.Group size="small">
                          <Radio.Button value="Yes">Yes</Radio.Button>
                          <Radio.Button value="No">No</Radio.Button>
                        </Radio.Group>
                      </Form.Item>
                    </section>
                    <section className="bis-section">
                      <h2>1.1. Direct financial losses</h2>
                      <div>
                        These could include but are not limited to:
                        <br />
                        <ul>
                          <li>Assets lost or stolen</li>
                          <li>Damage to property or buildings</li>
                        </ul>
                        <br />
                        <br />
                        Please explain how your business has suffered a direct
                        financial loss as a result of the crime.
                      </div>
                    </section>
                    <section
                      className="bis-section"
                      style={{
                        outline: '#0e1b2c solid 2px',
                        height: '80%',
                        padding: 10,
                        marginBottom: 20,
                      }}
                    >
                      <div>
                        <Form.Item name="directLossStatement">
                          <TextArea
                            autoComplete="off"
                            autoSize={{ minRows: 12 }}
                            bordered={false}
                          />
                        </Form.Item>
                      </div>
                    </section>
                  </div>
                </div>
                <div>
                  <div>
                    <section className="bis-section" style={{ marginTop: 20 }}>
                      <h2>1.2 Other, indirect financial losses</h2>
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
                        Please explain how your business has suffered an
                        indirect financial loss as a result of the crime.
                      </div>
                    </section>
                    <section
                      className="bis-section"
                      style={{
                        outline: '#0e1b2c solid 2px',
                        height: '75%',
                        padding: 10,
                        marginBottom: 20,
                      }}
                    >
                      <div>
                        <Form.Item name="otherLossStatement">
                          <TextArea
                            autoComplete="off"
                            autoSize={{ minRows: 12 }}
                            bordered={false}
                          />
                        </Form.Item>
                      </div>
                    </section>
                  </div>
                </div>
                <div>
                  <div>
                    <section className="bis-section">
                      <h2>2. Non-Financial Impact</h2>
                      <div>
                        Please explain how the incident has had a non-financial
                        impact on your business.
                        <br />
                        <br />
                        This could include:
                        <br />
                        <ul>
                          <li>Reputational damage </li>
                          <li>
                            Physical injuries sustained by staff or customers
                          </li>
                        </ul>
                        <br />
                        <br />
                      </div>
                    </section>
                    <section
                      className="bis-section"
                      style={{
                        outline: '#0e1b2c solid 2px',
                        height: '85%',
                        padding: 10,
                        marginBottom: 20,
                      }}
                    >
                      <div>
                        <Form.Item name="nonFinancialImpact">
                          <TextArea
                            autoComplete="off"
                            autoSize={{ minRows: 12 }}
                            bordered={false}
                          />
                        </Form.Item>
                      </div>
                    </section>
                  </div>
                </div>
                <div>
                  <div>
                    <section className="bis-section">
                      <h2>3. Other Comments</h2>
                      <div>
                        Please use this space to set out any further comments
                        you wish to make about the impact of the crime on your
                        business.
                        <br />
                      </div>
                    </section>
                    <section
                      className="bis-section"
                      style={{
                        outline: '#0e1b2c solid 2px',
                        height: '100%',
                        padding: 10,
                        marginBottom: 20,
                      }}
                    >
                      <div>
                        <Form.Item name="otherComments">
                          <TextArea
                            autoComplete="off"
                            autoSize={{ minRows: 12 }}
                            bordered={false}
                          />
                        </Form.Item>
                      </div>
                    </section>
                  </div>
                </div>
                <div>
                  <div>
                    <section className="bis-section">
                      <h2 style={{ textDecoration: 'none' }}>
                        4. Do you intend to seek compensation as a result of the
                        crime?{' '}
                      </h2>
                      <div>
                        <Form.Item
                          name="compensation"
                          rules={[
                            {
                              required: true,
                              message: 'Please select an option',
                            },
                          ]}
                        >
                          <Radio.Group size="small">
                            <Radio.Button value="Yes">Yes</Radio.Button>
                            <Radio.Button value="No">No</Radio.Button>
                          </Radio.Group>
                        </Form.Item>

                        <br />
                      </div>
                    </section>
                    <section className="bis-section">
                      <h2>Declaration </h2>
                      <div>
                        The statement (consisting of {noPages} page(s) signed by
                        me) is true to the best of my knowledge and belief and I
                        make it knowing that, if it is tendered in evidence, I
                        shall be liable to prosecution if I have wilfully stated
                        anything which I know to be false, or do not believe to
                        be true.
                      </div>
                      <Row gutter={10}>
                        <Col span={24}>
                          <Form.Item
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
                                    return Promise.reject(
                                      new Error('Please sign!')
                                    );
                                  }
                                  return Promise.reject(
                                    new Error(
                                      'Please select/enter a signature!'
                                    )
                                  );
                                },
                              }),
                            ]}
                          >
                            <div>
                              <Card style={{ width: '100%', display: 'flex' }}>
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
                                          reader.addEventListener(
                                            'load',
                                            (e) => {
                                              if (e.target) {
                                                const base64File =
                                                  e.target.result;
                                                if (
                                                  typeof base64File === 'string'
                                                ) {
                                                  const base64result =
                                                    base64File.split(',')[1];

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
                                            }
                                          );
                                          reader.readAsDataURL(f);
                                          // Prevent upload
                                          return false;
                                        }}
                                      >
                                        <Button
                                          key="uploadButton"
                                          type="primary"
                                        >
                                          <FontAwesomeIcon
                                            icon={faFileUpload}
                                            style={{
                                              fontSize: 16,
                                              marginRight: '10px',
                                            }}
                                          />
                                          Upload
                                        </Button>
                                      </Upload>
                                      {file && (
                                        <div
                                          style={{
                                            paddingTop: 10,
                                            paddingLeft: 10,
                                          }}
                                        >
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
                              </Card>
                            </div>
                          </Form.Item>
                        </Col>
                      </Row>
                    </section>
                  </div>
                </div>
                <Form.Item>
                  <Row style={{ marginTop: 10 }} gutter={10} justify="end">
                    <Col>
                      <Button
                        disabled={saving}
                        onClick={() =>
                          navigate(`/app/incidents/view/${incidentId || ''}`)
                        }
                      >
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
                        Create Impact Statement
                      </Button>
                    </Col>
                  </Row>
                </Form.Item>
              </div>
            </Form>
          </Card>
        </Col>
        <Col
          span={7}
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: 35,
          }}
        >
          <Card
            style={{
              position: 'sticky',
              top: 20,
              width: '100%',
              height: 'min-content',
            }}
          >
            <Collapse defaultActiveKey={['1']}>
              <Collapse.Panel key="1" header="User Details">
                <Descriptions column={1} size="small">
                  <Descriptions.Item label="Name">
                    {incidentData.userName}
                  </Descriptions.Item>
                  <Descriptions.Item label="Telephone">
                    {incidentData.userContact}
                  </Descriptions.Item>
                  <Descriptions.Item label="Address">
                    {incidentData.userAddress}
                  </Descriptions.Item>
                </Descriptions>
              </Collapse.Panel>
              <Collapse.Panel key="2" header="Business Details">
                <Descriptions column={1} size="small">
                  <Descriptions.Item label="Name">
                    {incidentData.businessName}
                  </Descriptions.Item>
                  <Descriptions.Item label="Address">
                    {incidentData.businessAddress}{' '}
                  </Descriptions.Item>
                </Descriptions>
              </Collapse.Panel>
              <Collapse.Panel key="3" header="Incident Details">
                <Descriptions column={1} size="small">
                  <Descriptions.Item label="Ref">
                    {incidentData.referenceNumber}
                  </Descriptions.Item>
                  <Descriptions.Item label="Date of incident">
                    {incidentData.incidentDate}
                  </Descriptions.Item>
                  <Descriptions.Item label="Lost">
                    {incidentData.incidentLoss}
                  </Descriptions.Item>
                  <Descriptions.Item label="Recovered">
                    {incidentData.incidentRecovered}
                  </Descriptions.Item>
                  <Descriptions.Item label="Description">
                    {incidentData.description}
                  </Descriptions.Item>
                  <Descriptions.Item label="Items lost">
                    {incidentData.lostItems}
                  </Descriptions.Item>
                </Descriptions>
              </Collapse.Panel>
            </Collapse>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default createBusinessImpact;
