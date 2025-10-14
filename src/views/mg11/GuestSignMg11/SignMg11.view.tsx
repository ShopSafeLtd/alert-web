/* eslint-disable formatjs/no-literal-string-in-jsx */
import type { FormInstance } from 'antd';

import { faFileUpload } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Radio,
  Row,
  Select,
  Space,
  Tabs,
  Typography,
  Upload,
} from 'antd';
import { Mg11Status } from 'graphql/types';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import type { FormData } from './useSignMg11';

import SignatureInput from '../../../components/SignBox';
import Loading from '../../../components/loading';
import SigSeal from '../../../components/onboarding/Onboarding/SchemeTerms/SigSeal';
import FONT_FAMILIES from '../../../components/onboarding/Onboarding/SchemeTerms/utils/Fonts';
import useStyles from './SignMg11.styles';

const { Title } = Typography;

interface Props {
  data: FormData;
  file: { file: string; name: string } | null;
  form: FormInstance<FormData>;
  name: string;
  onSubmit: (value: FormData) => void;
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

const CreateMg11 = ({
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
}: Props): JSX.Element => {
  const classes = useStyles();
  if (status === Mg11Status.Draft) {
    return <Loading />;
  }
  if (status !== Mg11Status.Sent) {
    return (
      <div>
        This statement either doesn&apos;t exist or has been completed. Please
        contact support for more
      </div>
    );
  }
  return (
    <div className="page-view">
      <Row style={{ margin: 15 }}>
        <Col>
          <Title level={3}>Witness Statement</Title>
        </Col>
      </Row>
      <Card style={{ width: '100%' }}>
        <Space direction="vertical" size={1} style={{ fontSize: 12 }}>
          <div // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: data.statement || '',
            }}
          />
        </Space>
      </Card>
      <Form<FormData>
        form={form}
        initialValues={data}
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
                Witness Consent
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
                    wilfully stated in it anything which I know to be false or
                    do not believe to be true.
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
                                        src={`data:application/pdf;base64,${base64result}`}
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
  );
};
export default CreateMg11;
