import Logo from '#/components/layout-components/AntD/navigation/Logo';
import { useStoreState } from '#/state';
import { faFileUpload } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
import React, { useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { useIntl } from 'react-intl';
import styled from 'styled-components';

import SignatureInput from '../../../SignBox';
import SigSeal from './SigSeal';
import FONT_FAMILIES from './utils/Fonts';

const { Text, Title } = Typography;

interface Props {
  content: string;
  name: string;
  onSubmit: () => void;
  saving: boolean;
  update: (value: unknown) => void;
  updateBox: () => void;
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
  isPrinting = false,
  terms,
}: {
  isPrinting?: boolean;
  terms: string;
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
  content,
  name,
  onSubmit,
  saving,
  update,
  updateBox,
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
    window.scrollTo({ behavior: 'smooth', top: 0 });
  }, []);

  return (
    <Card
      style={{
        minHeight: '90vh',
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 30,
        width: '70vw',
      }}
    >
      <Row justify="center" style={{ marginBottom: 30 }}>
        <Col>
          <Logo logoType="default" width={250} />
        </Col>
      </Row>
      <Row style={{ margin: 15 }}>
        <Col>
          <Title level={3}>
            {intl.formatMessage({
              defaultMessage: 'Before You Continue',
            })}
          </Title>

          <Text>
            {intl.formatMessage({
              defaultMessage:
                'The organisation you are accessing requires you to read and accept their Terms and Conditions before using Alert. Please review the details below and confirm your acceptance to proceed.',
            })}
          </Text>
        </Col>
      </Row>
      <Card style={{ width: '98%' }}>
        <Space direction="vertical" size={1} style={{ fontSize: 12 }}>
          <CustomTermsView terms={content} />
        </Space>
      </Card>
      <Form onFinish={onSubmit}>
        <Row gutter={10} justify="end">
          <Col>
            <Form.Item
              name="agreement"
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
              valuePropName="checked"
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
                <Card style={{ display: 'flex', width: '100%' }}>
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
                              // eslint-disable-next-line formatjs/no-literal-string-in-jsx
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
                                        // eslint-disable-next-line formatjs/no-literal-string-in-jsx
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
                            {intl.formatMessage({
                              defaultMessage: 'Upload',
                            })}
                          </Button>
                        </Upload>
                        {file && (
                          <div style={{ paddingLeft: 10, paddingTop: 10 }}>
                            <img
                              // eslint-disable-next-line formatjs/no-literal-string-in-jsx
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
        <Form.Item>
          <Row gutter={10} justify="end" style={{ marginTop: 30 }}>
            <Col>
              <Button
                disabled={saving}
                htmlType="submit"
                loading={saving}
                type="primary"
              >
                {intl.formatMessage({
                  defaultMessage: 'Next',
                })}
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Card>
  );
};
export default SchemeTerms;
