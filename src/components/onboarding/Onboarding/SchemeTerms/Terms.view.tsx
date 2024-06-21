import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
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
import { useIntl } from 'react-intl';
import SignatureInput from '../../../SignBox';
import FONT_FAMILIES from './utils/Fonts';
import SigSeal from './SigSeal';

import styled from 'styled-components';
import { useStoreState } from '#/state';

const { Text, Title } = Typography;

interface Props {
  onSubmit: () => void;
  update: (value: unknown) => void;
  saving: boolean;

  content: string;
  updateBox: () => void;
  name: string;
  onBack: () => void;
}

const DarkModeContent = styled.div`
  color: white !important;
  background-color: transparent !important;

  * {
    color: white !important;
    background-color: transparent !important;
  }
`;

const LightModeContent = styled.div`
  color: black !important;
  background-color: transparent !important;

  * {
    color: black !important;
    background-color: transparent !important;
  }
`;

export const CustomTermsView = ({
  terms,
  isPrinting = false,
}: {
  terms: string;
  isPrinting?: boolean;
}) => {
  const theme = useStoreState((state) => state.theme.currentTheme);
  const darkMode = theme === 'dark' && !isPrinting;
  return darkMode ? (
    <DarkModeContent
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: terms || '',
      }}
    />
  ) : (
    <LightModeContent
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: terms || '',
      }}
    />
  );
};

const SchemeTerms = ({
  onSubmit,
  update,
  saving,
  onBack,
  content,
  updateBox,
  name,
}: Props): JSX.Element => {
  const intl = useIntl();
  const [selectedFont, setSelectedFont] = useState(FONT_FAMILIES[0]);
  const [sign, setSign] = useState('');
  const [tab, setTab] = useState('generate');
  const [file, setFile] = useState<{
    file: string;
    name: string;
  } | null>(null);

  useEffect(() => {
    // /scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="list-view">
      <Row style={{ margin: 15 }}>
        <Col>
          <Title level={3}>
            {intl.formatMessage({
              defaultMessage: 'Terms of Use',
            })}
          </Title>

          <Text>
            {intl.formatMessage({
              defaultMessage:
                'Please read through the terms and conditions and accept them to continue.',
            })}
          </Text>
        </Col>
      </Row>
      <Card style={{ width: '98%' }}>
        <Space direction="vertical" style={{ fontSize: 12 }} size={1}>
          <CustomTermsView terms={content} />
        </Space>
      </Card>
      <Form onFinish={onSubmit}>
        <Row gutter={10} justify="end">
          <Col>
            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  // eslint-disable-next-line no-confusing-arrow
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error('Please agree to the terms and conditions!')
                        ),
                },
              ]}
            >
              <Checkbox onChange={updateBox}>
                <Title level={4}>
                  {intl.formatMessage({
                    defaultMessage:
                      'I confirm that I have read and agree to the above terms and conditions.',
                  })}
                </Title>
              </Checkbox>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={10} justify="end">
          <Col>
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
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
                              // eslint-disable-next-line formatjs/no-literal-string-in-jsx
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
                                        // eslint-disable-next-line formatjs/no-literal-string-in-jsx
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
                            {intl.formatMessage({
                              defaultMessage: 'Upload',
                            })}
                          </Button>
                        </Upload>
                        {file && (
                          <div style={{ paddingTop: 10, paddingLeft: 10 }}>
                            <img
                              src={`data:application/pdf;base64,${file.file}`}
                              // eslint-disable-next-line formatjs/no-literal-string-in-jsx
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
        <Form.Item>
          <Row style={{ marginTop: 30 }} gutter={10} justify="end">
            <Col>
              <Button
                disabled={saving}
                type="primary"
                onClick={() => {
                  // window.history.back();
                  onBack();
                }}
              >
                {intl.formatMessage({
                  defaultMessage: 'Back',
                })}
              </Button>
            </Col>

            <Col>
              <Button
                disabled={saving}
                loading={saving}
                type="primary"
                htmlType="submit"
              >
                {intl.formatMessage({
                  defaultMessage: 'Next',
                })}
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </div>
  );
};
export default SchemeTerms;
