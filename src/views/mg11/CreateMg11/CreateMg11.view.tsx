/* eslint-disable formatjs/no-literal-string-in-jsx */
import React from 'react';

import type { FormInstance } from 'antd';
import {
  Button,
  Card,
  Checkbox,
  Col,
  Empty,
  Form,
  Input,
  PageHeader,
  Radio,
  Row,
  Select,
  Space,
  Tabs,
  Typography,
  Upload,
} from 'antd';
import ReactDOMServer from 'react-dom/server';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload } from '@fortawesome/pro-light-svg-icons';
import useStyles from './CreateMg11.styles';
import type { FormData } from './useCreateMg11';
import SigSeal from '../../../components/onboarding/Onboarding/SchemeTerms/SigSeal';
import FONT_FAMILIES from '../../../components/onboarding/Onboarding/SchemeTerms/utils/Fonts';
import SignatureInput from '../../../components/SignBox';
import type { ListStatementTemplatesQuery } from '../../../graphql/generated';

const { Title } = Typography;
const { TextArea } = Input;

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
  interviewerSign: string;
  setInterviewerSign: (value: string) => void;
  interviewerName: string;
  updateInterviewer: (value: string) => void;
  interviewerSelectedFont: string;
  interviewerFile: { file: string; name: string } | null;
  interviewerSetSelectedFont: (value: string) => void;
  interviewerSetFile: (value: { file: string; name: string } | null) => void;
  interviewerTab: string;
  interviewerSetTab: (value: string) => void;
  statementTemplates: ListStatementTemplatesQuery | undefined;
}
// wait to check
const CreateMg11 = ({
  onSubmit,
  saving,
  form,
  setSign,
  sign,
  setInterviewerSign,
  interviewerName,
  interviewerFile,
  interviewerSetFile,
  interviewerSetSelectedFont,
  interviewerSelectedFont,
  interviewerSign,
  file,
  selectedFont,
  name,
  setFile,
  setSelectedFont,
  updateInterviewer,
  update,
  tab,
  setTab,
  interviewerSetTab,
  interviewerTab,
  statementTemplates,
}: Props): JSX.Element => {
  const classes = useStyles();
  const likelyToAttend = Form.useWatch('likelyToAttend', form);
  const careNeeds = Form.useWatch('careNeeds', form);
  const over18 = Form.useWatch('over18', form) !== 'false';
  const otherEthnicity = Form.useWatch('ethnicity', form) === 'other';
  const businessStatement = Form.useWatch('businessStatement', form) === 'true';
  const completeNow = Form.useWatch('completeNow', form) === 'true';
  return (
    <div className="page-view">
      <PageHeader
        onBack={() => window.history.back()}
        title="Create Witness Statement (MG11)"
      />
      <Form<FormData>
        form={form}
        initialValues={{
          urn: '',
          station: '',
          statementWhereWhen: '',
          visualRecording: '',

          statement: '',

          address: '',
          postcode: '',
          homeTel: '',
          workTel: '',
          mobileTel: '',
          email: '',
          name: '',
          age: '',
          occupation: '',
          prefContact: '',
          gender: '',
          dobPlace: '',
          formerName: '',
          height: '',
          ethnicity: '',
          availability: '',
          likelyToAttend: '',
          likelyToAttendReason: '',
          specialMeasures: '',
          careNeeds: '',
          careNeedsDetails: '',
          businessStatement: '',
          completeNow: '',
        }}
        onFinish={onSubmit}
        layout="vertical"
      >
        <Card className={classes.card}>
          <Row align="bottom" style={{ marginBottom: 20 }}>
            <Col>
              <Title style={{ marginBottom: 0 }} level={4}>
                1.
              </Title>
            </Col>
            <Col>
              <Title style={{ marginBottom: 0, marginLeft: 5 }} level={4}>
                Basic Details
              </Title>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item name="urn" label="Urn">
                <Input disabled={saving} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="station" label="Station">
                <Input disabled={saving} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="statementWhereWhen"
            label="When and where was this statement made?"
            style={{ width: '50%' }}
          >
            <Input disabled={saving} />
          </Form.Item>
          <Form.Item
            name="visualRecording"
            label="Was the witness evidence visually recorded?"
            rules={[
              {
                required: true,
                message: 'Please choose an option.',
              },
            ]}
          >
            <Radio.Group size="small">
              <Radio.Button value="true">Yes</Radio.Button>
              <Radio.Button value="false">No</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="businessStatement"
            label="Would you like to also create a Business Impact Statement?"
            rules={[
              {
                required: true,
                message: 'Please choose an option.',
              },
            ]}
          >
            <Radio.Group size="small">
              <Radio.Button value="true">Yes</Radio.Button>
              <Radio.Button value="false">No</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="completeNow"
            label="Would you like to complete this statement now or send to the witness to be finalised later?"
            rules={[
              {
                required: true,
                message: 'Please choose an option.',
              },
            ]}
          >
            <Radio.Group size="small">
              <Radio.Button value="true">Now</Radio.Button>
              <Radio.Button value="false">Send to Witness</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Card>

        <Card className={classes.card}>
          <Row align="bottom" style={{ marginBottom: 20 }}>
            <Col>
              <Title style={{ marginBottom: 0 }} level={4}>
                2.
              </Title>
            </Col>
            <Col>
              <Title style={{ marginBottom: 0, marginLeft: 5 }} level={4}>
                Witness Details
              </Title>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Please enter a name for the witness.',
                  },
                ]}
                name="name"
                label="Name"
              >
                <Input disabled={saving} />
              </Form.Item>
              <Form.Item name="formerName" label="Former Name (if applicable)">
                <Input disabled={saving} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Please enter an email for the witness.',
                  },
                ]}
                name="email"
                label="Email"
              >
                <Input disabled={saving} />
              </Form.Item>
              <Form.Item name="occupation" label="Occupation">
                <Input disabled={saving} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={2}>
              {' '}
              <Form.Item name="height" label="Height">
                <Input disabled={saving} />
              </Form.Item>
            </Col>

            <Col span={4}>
              {' '}
              <Form.Item
                name="gender"
                label="Gender"
                rules={[
                  {
                    required: true,
                    message: 'Please enter a gender.',
                  },
                ]}
              >
                <Input disabled={saving} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={3}>
              <Form.Item
                name="over18"
                label="Is the witness over 18?"
                rules={[
                  {
                    required: true,
                    message: 'Please choose an option.',
                  },
                ]}
              >
                <Radio.Group size="small">
                  <Radio.Button value="true">Yes</Radio.Button>
                  <Radio.Button value="false">No</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="age" label="Age">
                <Input disabled={saving || over18} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="ethnicity"
                label="Ethnicity Code"
                rules={[
                  {
                    required: true,
                    message: 'Please enter or select an ethnicity code.',
                  },
                ]}
              >
                <Select
                  options={[
                    {
                      label: 'Asian or Asian British',
                      options: [
                        { label: 'Indian', value: 'A1' },
                        { label: 'Pakistani', value: 'A2' },
                        { label: 'Bangladeshi', value: 'A3' },
                        { label: 'Any other Asian background', value: 'A9' },
                      ],
                    },
                    {
                      label: 'Black or Black British',
                      options: [
                        { label: 'Caribbean', value: 'B1' },
                        { label: 'African', value: 'B2' },
                        { label: 'Any other Black background', value: 'B9' },
                      ],
                    },
                    {
                      label: 'Mixed',
                      options: [
                        { label: 'White and Black Caribbean', value: 'M1' },
                        { label: 'White and Black African', value: 'M2' },
                        { label: 'White and Asian', value: 'M3' },
                        { label: 'Any other mixed background', value: 'M9' },
                      ],
                    },
                    {
                      label: 'Chinese or any other ethnic group',
                      options: [
                        { label: 'Chinese', value: 'O1' },
                        { label: 'Any other ethnic group', value: 'O9' },
                      ],
                    },
                    {
                      label: 'White',
                      options: [
                        { label: 'British', value: 'W1' },
                        { label: 'Irish', value: 'W2' },
                        { label: 'Any other White background', value: 'W9' },
                      ],
                    },
                    {
                      label: '+1 Codes',
                      options: [
                        {
                          label:
                            "The officer's presence is urgently required elsewhere",
                          value: 'N1',
                        },
                        {
                          label: 'The situation involves public disorder',
                          value: 'N2',
                        },
                        {
                          label:
                            'The person did not understand what is required',
                          value: 'N3',
                        },
                        {
                          label:
                            'The person declined to define their ethnicity',
                          value: 'N4',
                        },
                      ],
                    },
                    {
                      label: 'Other',
                      options: [{ label: 'Other', value: 'other' }],
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item
                name="ethnicityOther"
                label="Other"
                rules={[
                  {
                    required: otherEthnicity,
                    message: 'Please enter or select an ethnicity code.',
                  },
                ]}
              >
                <Input disabled={saving || !otherEthnicity} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="dobPlace"
                label="Date and place of birth"
                rules={[
                  {
                    required: true,
                    message: 'Please enter a DOB and place of birth.',
                  },
                ]}
              >
                <Input disabled={saving} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="address"
                label="Home Address"
                rules={[
                  {
                    required: true,
                    message: 'Please enter an address.',
                  },
                ]}
              >
                <TextArea
                  autoComplete="off"
                  placeholder="Home address"
                  autoSize={{ minRows: 2, maxRows: 6 }}
                />
              </Form.Item>
            </Col>
            <Col span={2}>
              <Form.Item
                name="postcode"
                label="Postcode"
                rules={[
                  {
                    required: true,
                    message: 'Please enter a postcode.',
                  },
                ]}
              >
                <Input disabled={saving} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={4}>
              {' '}
              <Form.Item name="homeTel" label="Home Phone no.">
                <Input disabled={saving} />
              </Form.Item>
            </Col>
            <Col span={4}>
              {' '}
              <Form.Item name="workTel" label="Work Phone no.">
                <Input disabled={saving} />
              </Form.Item>
            </Col>
            <Col span={4}>
              {' '}
              <Form.Item
                name="mobileTel"
                label="Mobile Phone no."
                rules={[
                  {
                    required: true,
                    message: 'Please enter a mobile number.',
                  },
                ]}
              >
                <Input disabled={saving} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="prefContact" label="Preferred means of contact">
                <Input disabled={saving} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="availability"
                label="Availability details for the next 6 months"
              >
                <TextArea
                  autoComplete="off"
                  placeholder="Availabity"
                  autoSize={{ minRows: 2, maxRows: 6 }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card className={classes.card}>
          <Row align="bottom" style={{ marginBottom: 20 }}>
            <Col>
              <Title style={{ marginBottom: 0 }} level={4}>
                3.
              </Title>
            </Col>
            <Col>
              <Title style={{ marginBottom: 0, marginLeft: 5 }} level={4}>
                Witness Care
              </Title>
            </Col>
          </Row>

          <Form.Item
            name="likelyToAttend"
            label="Is the witness willing to attend court?"
          >
            <Radio.Group size="small">
              <Radio.Button value="true">Yes</Radio.Button>
              <Radio.Button value="false">No</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Col span={12}>
            <Form.Item
              name="likelyToAttendReason"
              label="What can be done to ensure
              attendance?"
            >
              <TextArea
                disabled={likelyToAttend !== 'true'}
                autoComplete="off"
                autoSize={{ minRows: 2, maxRows: 6 }}
              />
            </Form.Item>
          </Col>
          <Form.Item
            name="specialMeasures"
            label="Does the witness require a Special Measures Assessment?"
          >
            <Radio.Group size="small">
              <Radio.Button value="true">Yes</Radio.Button>
              <Radio.Button value="false">No</Radio.Button>
            </Radio.Group>{' '}
          </Form.Item>

          <Form.Item
            name="careNeeds"
            label="Does the witness have any special needs?"
          >
            <Radio.Group size="small">
              <Radio.Button value="true">Yes</Radio.Button>
              <Radio.Button value="false">No</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Col span={12}>
            <Form.Item
              name="careNeedsDetails"
              label="What are the special care needs?"
            >
              <TextArea
                disabled={careNeeds !== 'true'}
                autoComplete="off"
                autoSize={{ minRows: 2, maxRows: 6 }}
              />
            </Form.Item>
          </Col>
        </Card>

        <Card className={classes.card}>
          <Row align="bottom" style={{ marginBottom: 20 }}>
            <Col>
              <Title style={{ marginBottom: 0 }} level={4}>
                4.
              </Title>
            </Col>
            <Col>
              <Title style={{ marginBottom: 0, marginLeft: 5 }} level={4}>
                Statement
              </Title>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Select
                onChange={(value) => form.setFieldValue('statement', value)}
                placeholder="Select a statement template"
                style={{ width: '100%', marginBottom: 20 }}
                notFoundContent={
                  <Empty description="No Statements saved yet" />
                }
              >
                {statementTemplates?.statementTemplates?.map((template) => (
                  <Select.Option value={template.content}>
                    {template.name}
                  </Select.Option>
                ))}
              </Select>
            </Col>
            <Col span={24}>
              <Form.Item
                name="statement"
                label="Statement"
                tooltip="Please enter the statement for the incident."
                rules={[
                  {
                    required: true,
                    message: 'Please enter a statement.',
                  },
                ]}
              >
                <TextArea autoComplete="off" autoSize={{ minRows: 6 }} />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {completeNow && (
          <>
            <Card className={classes.card}>
              <Row align="bottom" style={{ marginBottom: 20 }}>
                <Col>
                  <Title style={{ marginBottom: 0 }} level={4}>
                    5.
                  </Title>
                </Col>
                <Col>
                  <Title style={{ marginBottom: 0, marginLeft: 5 }} level={4}>
                    Witness Consent (To be completed by the witness)
                  </Title>
                </Col>
              </Row>

              <Form.Item
                name="detailsExplained"
                label="The criminal justice process and Victim Personal Statement
                  scheme (victims only) has been explained to me"
                rules={[
                  {
                    required: true,
                    message: 'Please choose an option.',
                  },
                ]}
              >
                <Radio.Group size="small">
                  <Radio.Button value="true">Yes</Radio.Button>
                  <Radio.Button value="false">No</Radio.Button>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                name="leafletReceived"
                label="I have been given the leaflet &lsquo;Giving a witness
                  statement to police - what happens next?&lsquo;"
                rules={[
                  {
                    required: true,
                    message: 'Please choose an option.',
                  },
                ]}
              >
                <Radio.Group size="small">
                  <Radio.Button value="true">Yes</Radio.Button>
                  <Radio.Button value="false">No</Radio.Button>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                name="medicalReleasedPolice"
                label="I consent to the police having access to my medical records in
                  relation to this matter"
                rules={[
                  {
                    required: true,
                    message: 'Please choose an option.',
                  },
                ]}
              >
                <Radio.Group size="small">
                  <Radio.Button value="Yes">Yes</Radio.Button>
                  <Radio.Button value="No">No</Radio.Button>
                  <Radio.Button value="N/A">N/A</Radio.Button>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                name="medicalReleasedDefence"
                label="I consent to the defence having access to my medical records
                  in relation to this matter"
                rules={[
                  {
                    required: true,
                    message: 'Please choose an option.',
                  },
                ]}
              >
                <Radio.Group size="small">
                  <Radio.Button value="Yes">Yes</Radio.Button>
                  <Radio.Button value="No">No</Radio.Button>
                  <Radio.Button value="N/A">N/A</Radio.Button>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                name="civilProceedingsRelease"
                label="I consent to the statement being disclosed for the purposes of
                  civil proceedings (if applicable)"
                rules={[
                  {
                    required: true,
                    message: 'Please choose an option.',
                  },
                ]}
              >
                <Radio.Group size="small">
                  <Radio.Button value="Yes">Yes</Radio.Button>
                  <Radio.Button value="No">No</Radio.Button>
                  <Radio.Button value="N/A">N/A</Radio.Button>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                name="witnessServiceDisclose"
                label="The information recorded above will be disclosed to the
                  Witness Service so they can offer help and support, unless you
                  ask them not to. Tick this box to decline their services."
                valuePropName="checked"
              >
                <Checkbox />
              </Form.Item>
            </Card>
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
                          return Promise.reject(new Error('Please sign!'));
                        }
                        return Promise.reject(
                          new Error('Please select/enter a signature!')
                        );
                      },
                    }),
                  ]}
                >
                  <div>
                    <Card style={{ width: '100%', display: 'flex' }}>
                      <Space
                        direction="vertical"
                        style={{ fontSize: 14, marginBottom: 15 }}
                        size={1}
                      >
                        This statement is true to the best of my knowledge and
                        belief and I make it knowing that, if it is tendered in
                        evidence, I shall be liable to prosecution if I have
                        wilfully stated in it anything which I know to be false
                        or do not believe to be true.
                      </Space>
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
                    </Card>
                  </div>
                </Form.Item>
              </Col>
            </Row>
            <Card className={classes.card}>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="interviewerSignature"
                    label="Interviewer Signature"
                    rules={[
                      () => ({
                        validator() {
                          if (tab === 'generate') {
                            if (interviewerSelectedFont) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error('Please select a signature!')
                            );
                          }
                          if (tab === 'upload') {
                            if (interviewerFile) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error('Please upload a signature!')
                            );
                          }
                          if (tab === 'draw') {
                            if (interviewerSign) {
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
                    <div>
                      <Card style={{ width: '100%', display: 'flex' }}>
                        <Tabs
                          activeKey={interviewerTab}
                          onChange={(tabKey) => {
                            interviewerSetTab(tabKey);
                            if (tabKey === 'upload' && file?.file) {
                              setInterviewerSign('');

                              updateInterviewer(
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
                              setInterviewerSign('');
                              updateInterviewer(
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
                              updateInterviewer('');
                            }
                          }}
                          type="card"
                          style={{ height: 250, width: 500 }}
                          destroyInactiveTabPane
                        >
                          <Tabs.TabPane tab="Generate" key="generate">
                            <Select
                              style={{
                                fontFamily: interviewerSelectedFont,
                                marginBottom: 20,
                              }}
                              defaultValue={interviewerSelectedFont}
                              onChange={(value) => {
                                interviewerSetSelectedFont(value);
                                updateInterviewer(
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
                                  {interviewerName}
                                </Select.Option>
                              ))}
                            </Select>
                            <SigSeal
                              key={interviewerSelectedFont}
                              name={interviewerName}
                              font={interviewerSelectedFont}
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
                                        const base64result =
                                          base64File.split(',')[1];

                                        interviewerSetFile({
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
                                    style={{
                                      fontSize: 16,
                                      marginRight: '10px',
                                    }}
                                  />
                                  Upload
                                </Button>
                              </Upload>
                              {interviewerFile && (
                                <div
                                  style={{ paddingTop: 10, paddingLeft: 10 }}
                                >
                                  <img
                                    src={`data:application/pdf;base64,${interviewerFile.file}`}
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
                                updateInterviewer(val);
                                setInterviewerSign(val);
                              }}
                            />
                          </Tabs.TabPane>
                        </Tabs>
                      </Card>
                    </div>
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </>
        )}

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
                {businessStatement
                  ? `Create Mg11/Go to business impact statement`
                  : 'Create Mg11'}
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </div>
  );
};
export default CreateMg11;
