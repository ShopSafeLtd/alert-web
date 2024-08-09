/* eslint-disable formatjs/no-literal-string-in-jsx */
import type { FormInstance } from 'antd';
import type { ListStatementTemplatesQuery } from 'graphql/statementTemplates/queries/__generated__/list-templates.generated';

import { faFileUpload } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import type { FormData } from './useCreateMg11';

import SignatureInput from '../../../components/SignBox';
import SigSeal from '../../../components/onboarding/Onboarding/SchemeTerms/SigSeal';
import FONT_FAMILIES from '../../../components/onboarding/Onboarding/SchemeTerms/utils/Fonts';
import useStyles from './CreateMg11.styles';

const { Title } = Typography;
const { TextArea } = Input;

interface Props {
  file: { file: string; name: string } | null;
  form: FormInstance<FormData>;
  interviewerFile: { file: string; name: string } | null;
  interviewerName: string;
  interviewerSelectedFont: string;
  interviewerSetFile: (value: { file: string; name: string } | null) => void;
  interviewerSetSelectedFont: (value: string) => void;
  interviewerSetTab: (value: string) => void;
  interviewerSign: string;
  interviewerTab: string;
  name: string;
  onSubmit: (value: FormData) => void;
  saving: boolean;
  selectedFont: string;
  setFile: (value: { file: string; name: string } | null) => void;
  setInterviewerSign: (value: string) => void;
  setSelectedFont: (value: string) => void;
  setSign: (value: string) => void;
  setTab: (value: string) => void;
  sign: string;
  statementTemplates: ListStatementTemplatesQuery | undefined;
  tab: string;
  update: (value: string) => void;
  updateInterviewer: (value: string) => void;
}
// wait to check
const CreateMg11 = ({
  file,
  form,
  interviewerFile,
  interviewerName,
  interviewerSelectedFont,
  interviewerSetFile,
  interviewerSetSelectedFont,
  interviewerSetTab,
  interviewerSign,
  interviewerTab,
  name,
  onSubmit,
  saving,
  selectedFont,
  setFile,
  setInterviewerSign,
  setSelectedFont,
  setSign,
  setTab,
  sign,
  statementTemplates,
  tab,
  update,
  updateInterviewer,
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
          address: '',
          age: '',
          availability: '',
          businessStatement: '',

          careNeeds: '',

          careNeedsDetails: '',
          completeNow: '',
          dobPlace: '',
          email: '',
          ethnicity: '',
          formerName: '',
          gender: '',
          height: '',
          homeTel: '',
          likelyToAttend: '',
          likelyToAttendReason: '',
          mobileTel: '',
          name: '',
          occupation: '',
          postcode: '',
          prefContact: '',
          specialMeasures: '',
          statement: '',
          statementWhereWhen: '',
          station: '',
          urn: '',
          visualRecording: '',
          workTel: '',
        }}
        layout="vertical"
        onFinish={onSubmit}
      >
        <Card className={classes.card}>
          <Row align="bottom" style={{ marginBottom: 20 }}>
            <Col>
              <Title level={4} style={{ marginBottom: 0 }}>
                1.
              </Title>
            </Col>
            <Col>
              <Title level={4} style={{ marginBottom: 0, marginLeft: 5 }}>
                Basic Details
              </Title>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item label="Urn" name="urn">
                <Input disabled={saving} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Station" name="station">
                <Input disabled={saving} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="When and where was this statement made?"
            name="statementWhereWhen"
            style={{ width: '50%' }}
          >
            <Input disabled={saving} />
          </Form.Item>
          <Form.Item
            label="Was the witness evidence visually recorded?"
            name="visualRecording"
            rules={[
              {
                message: 'Please choose an option.',
                required: true,
              },
            ]}
          >
            <Radio.Group size="small">
              <Radio.Button value="true">Yes</Radio.Button>
              <Radio.Button value="false">No</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Would you like to also create a Business Impact Statement?"
            name="businessStatement"
            rules={[
              {
                message: 'Please choose an option.',
                required: true,
              },
            ]}
          >
            <Radio.Group size="small">
              <Radio.Button value="true">Yes</Radio.Button>
              <Radio.Button value="false">No</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Would you like to complete this statement now or send to the witness to be finalised later?"
            name="completeNow"
            rules={[
              {
                message: 'Please choose an option.',
                required: true,
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
              <Title level={4} style={{ marginBottom: 0 }}>
                2.
              </Title>
            </Col>
            <Col>
              <Title level={4} style={{ marginBottom: 0, marginLeft: 5 }}>
                Witness Details
              </Title>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    message: 'Please enter a name for the witness.',
                    required: true,
                  },
                ]}
              >
                <Input disabled={saving} />
              </Form.Item>
              <Form.Item label="Former Name (if applicable)" name="formerName">
                <Input disabled={saving} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    message: 'Please enter an email for the witness.',
                    required: true,
                  },
                ]}
              >
                <Input disabled={saving} />
              </Form.Item>
              <Form.Item label="Occupation" name="occupation">
                <Input disabled={saving} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={2}>
              {' '}
              <Form.Item label="Height" name="height">
                <Input disabled={saving} />
              </Form.Item>
            </Col>

            <Col span={4}>
              {' '}
              <Form.Item
                label="Gender"
                name="gender"
                rules={[
                  {
                    message: 'Please enter a gender.',
                    required: true,
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
                label="Is the witness over 18?"
                name="over18"
                rules={[
                  {
                    message: 'Please choose an option.',
                    required: true,
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
              <Form.Item label="Age" name="age">
                <Input disabled={saving || over18} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="Ethnicity Code"
                name="ethnicity"
                rules={[
                  {
                    message: 'Please enter or select an ethnicity code.',
                    required: true,
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
                label="Other"
                name="ethnicityOther"
                rules={[
                  {
                    message: 'Please enter or select an ethnicity code.',
                    required: otherEthnicity,
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
                label="Date and place of birth"
                name="dobPlace"
                rules={[
                  {
                    message: 'Please enter a DOB and place of birth.',
                    required: true,
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
                label="Home Address"
                name="address"
                rules={[
                  {
                    message: 'Please enter an address.',
                    required: true,
                  },
                ]}
              >
                <TextArea
                  autoComplete="off"
                  autoSize={{ maxRows: 6, minRows: 2 }}
                  placeholder="Home address"
                />
              </Form.Item>
            </Col>
            <Col span={2}>
              <Form.Item
                label="Postcode"
                name="postcode"
                rules={[
                  {
                    message: 'Please enter a postcode.',
                    required: true,
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
              <Form.Item label="Home Phone no." name="homeTel">
                <Input disabled={saving} />
              </Form.Item>
            </Col>
            <Col span={4}>
              {' '}
              <Form.Item label="Work Phone no." name="workTel">
                <Input disabled={saving} />
              </Form.Item>
            </Col>
            <Col span={4}>
              {' '}
              <Form.Item
                label="Mobile Phone no."
                name="mobileTel"
                rules={[
                  {
                    message: 'Please enter a mobile number.',
                    required: true,
                  },
                ]}
              >
                <Input disabled={saving} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Preferred means of contact" name="prefContact">
                <Input disabled={saving} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Availability details for the next 6 months"
                name="availability"
              >
                <TextArea
                  autoComplete="off"
                  autoSize={{ maxRows: 6, minRows: 2 }}
                  placeholder="Availabity"
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card className={classes.card}>
          <Row align="bottom" style={{ marginBottom: 20 }}>
            <Col>
              <Title level={4} style={{ marginBottom: 0 }}>
                3.
              </Title>
            </Col>
            <Col>
              <Title level={4} style={{ marginBottom: 0, marginLeft: 5 }}>
                Witness Care
              </Title>
            </Col>
          </Row>

          <Form.Item
            label="Is the witness willing to attend court?"
            name="likelyToAttend"
          >
            <Radio.Group size="small">
              <Radio.Button value="true">Yes</Radio.Button>
              <Radio.Button value="false">No</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Col span={12}>
            <Form.Item
              label="What can be done to ensure
              attendance?"
              name="likelyToAttendReason"
            >
              <TextArea
                autoComplete="off"
                autoSize={{ maxRows: 6, minRows: 2 }}
                disabled={likelyToAttend !== 'true'}
              />
            </Form.Item>
          </Col>
          <Form.Item
            label="Does the witness require a Special Measures Assessment?"
            name="specialMeasures"
          >
            <Radio.Group size="small">
              <Radio.Button value="true">Yes</Radio.Button>
              <Radio.Button value="false">No</Radio.Button>
            </Radio.Group>{' '}
          </Form.Item>

          <Form.Item
            label="Does the witness have any special needs?"
            name="careNeeds"
          >
            <Radio.Group size="small">
              <Radio.Button value="true">Yes</Radio.Button>
              <Radio.Button value="false">No</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Col span={12}>
            <Form.Item
              label="What are the special care needs?"
              name="careNeedsDetails"
            >
              <TextArea
                autoComplete="off"
                autoSize={{ maxRows: 6, minRows: 2 }}
                disabled={careNeeds !== 'true'}
              />
            </Form.Item>
          </Col>
        </Card>

        <Card className={classes.card}>
          <Row align="bottom" style={{ marginBottom: 20 }}>
            <Col>
              <Title level={4} style={{ marginBottom: 0 }}>
                4.
              </Title>
            </Col>
            <Col>
              <Title level={4} style={{ marginBottom: 0, marginLeft: 5 }}>
                Statement
              </Title>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Select
                notFoundContent={
                  <Empty description="No Statements saved yet" />
                }
                onChange={(value) => form.setFieldValue('statement', value)}
                placeholder="Select a statement template"
                style={{ marginBottom: 20, width: '100%' }}
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
                label="Statement"
                name="statement"
                rules={[
                  {
                    message: 'Please enter a statement.',
                    required: true,
                  },
                ]}
                tooltip="Please enter the statement for the incident."
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
                  <Title level={4} style={{ marginBottom: 0 }}>
                    5.
                  </Title>
                </Col>
                <Col>
                  <Title level={4} style={{ marginBottom: 0, marginLeft: 5 }}>
                    Witness Consent (To be completed by the witness)
                  </Title>
                </Col>
              </Row>

              <Form.Item
                label="The criminal justice process and Victim Personal Statement
                  scheme (victims only) has been explained to me"
                name="detailsExplained"
                rules={[
                  {
                    message: 'Please choose an option.',
                    required: true,
                  },
                ]}
              >
                <Radio.Group size="small">
                  <Radio.Button value="true">Yes</Radio.Button>
                  <Radio.Button value="false">No</Radio.Button>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                label="I have been given the leaflet &lsquo;Giving a witness
                  statement to police - what happens next?&lsquo;"
                name="leafletReceived"
                rules={[
                  {
                    message: 'Please choose an option.',
                    required: true,
                  },
                ]}
              >
                <Radio.Group size="small">
                  <Radio.Button value="true">Yes</Radio.Button>
                  <Radio.Button value="false">No</Radio.Button>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                label="I consent to the police having access to my medical records in
                  relation to this matter"
                name="medicalReleasedPolice"
                rules={[
                  {
                    message: 'Please choose an option.',
                    required: true,
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
                label="I consent to the defence having access to my medical records
                  in relation to this matter"
                name="medicalReleasedDefence"
                rules={[
                  {
                    message: 'Please choose an option.',
                    required: true,
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
                label="I consent to the statement being disclosed for the purposes of
                  civil proceedings (if applicable)"
                name="civilProceedingsRelease"
                rules={[
                  {
                    message: 'Please choose an option.',
                    required: true,
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
                label="The information recorded above will be disclosed to the
                  Witness Service so they can offer help and support, unless you
                  ask them not to. Tick this box to decline their services."
                name="witnessServiceDisclose"
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
                    <Card style={{ display: 'flex', width: '100%' }}>
                      <Space
                        direction="vertical"
                        size={1}
                        style={{ fontSize: 14, marginBottom: 15 }}
                      >
                        This statement is true to the best of my knowledge and
                        belief and I make it knowing that, if it is tendered in
                        evidence, I shall be liable to prosecution if I have
                        wilfully stated in it anything which I know to be false
                        or do not believe to be true.
                      </Space>
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
                                      const base64result =
                                        base64File.split(',')[1];

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
                    </Card>
                  </div>
                </Form.Item>
              </Col>
            </Row>
            <Card className={classes.card}>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    label="Interviewer Signature"
                    name="interviewerSignature"
                    rules={[
                      () => ({
                        validator() {
                          if (interviewerTab === 'generate') {
                            if (interviewerSelectedFont) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error('Please select a signature!')
                            );
                          }
                          if (interviewerTab === 'upload') {
                            if (interviewerFile) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error('Please upload a signature!')
                            );
                          }
                          if (interviewerTab === 'draw') {
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
                      <Card style={{ display: 'flex', width: '100%' }}>
                        <Tabs
                          activeKey={interviewerTab}
                          destroyInactiveTabPane
                          onChange={(tabKey) => {
                            interviewerSetTab(tabKey);
                            if (tabKey === 'upload' && file?.file) {
                              setInterviewerSign('');

                              updateInterviewer(
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
                              setInterviewerSign('');
                              updateInterviewer(
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
                              updateInterviewer('');
                            }
                          }}
                          style={{ height: 250, width: 500 }}
                          type="card"
                        >
                          <Tabs.TabPane key="generate" tab="Generate">
                            <Select
                              defaultValue={interviewerSelectedFont}
                              onChange={(value) => {
                                interviewerSetSelectedFont(value);
                                updateInterviewer(
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
                                fontFamily: interviewerSelectedFont,
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
                                  {interviewerName}
                                </Select.Option>
                              ))}
                            </Select>
                            <SigSeal
                              font={interviewerSelectedFont}
                              height={100}
                              key={interviewerSelectedFont}
                              name={interviewerName}
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
                                        const base64result =
                                          base64File.split(',')[1];

                                        // file mime type
                                        console.log(
                                          ReactDOMServer.renderToString(
                                            <img
                                              alt="file"
                                              height={100}
                                              src={base64File}
                                              width={300}
                                            />
                                          )
                                        );
                                        interviewerSetFile({
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
                                  style={{ paddingLeft: 10, paddingTop: 10 }}
                                >
                                  <img
                                    alt="file"
                                    height={100}
                                    src={`data:application/pdf;base64,${interviewerFile.file}`}
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
                {businessStatement
                  ? 'Create Mg11/Go to business impact statement'
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
