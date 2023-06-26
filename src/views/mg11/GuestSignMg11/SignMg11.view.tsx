/* eslint-disable formatjs/no-literal-string-in-jsx */
import React from 'react';

import type { FormInstance } from 'antd';
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
import ReactDOMServer from 'react-dom/server';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload } from '@fortawesome/pro-light-svg-icons';
import useStyles from './SignMg11.styles';
import type { FormData } from './useSignMg11';
import SigSeal from '../../../components/onboarding/Onboarding/SchemeTerms/SigSeal';
import FONT_FAMILIES from '../../../components/onboarding/Onboarding/SchemeTerms/utils/Fonts';
import SignatureInput from '../../../components/SignBox';
import { Mg11Status } from '../../../graphql/generated';
import Loading from '../../../components/loading';

const { Title } = Typography;

interface Props {
  onSubmit: (value: FormData) => void;
  saving: boolean;
  form: FormInstance<FormData>;
  setSign: (value: string) => void;
  update: (value: string) => void;
  selectedFont: string;
  name: string;
  file: { file: string; name: string } | null;
  setTab: (value: string) => void;
  tab: string;
  setSelectedFont: (value: string) => void;
  setFile: (value: { file: string; name: string } | null) => void;
  data: FormData;
  status: Mg11Status;
  sign: string;
}

const CreateMg11 = ({
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
        <Space direction="vertical" style={{ fontSize: 12 }} size={1}>
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
                Witness Consent
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
                    wilfully stated in it anything which I know to be false or
                    do not believe to be true.
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
                </Card>
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
  );
};
export default CreateMg11;
