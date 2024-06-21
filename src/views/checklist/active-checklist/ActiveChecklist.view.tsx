/* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-argument,no-restricted-syntax */
import React from 'react';
import type { FormInstance } from 'antd';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  PageHeader,
  Radio,
  Row,
  Select,
  Space,
  Tabs,
  Upload,
} from 'antd';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router';
import { PlusOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload } from '@fortawesome/pro-light-svg-icons';
import ReactDOMServer from 'react-dom/server';
import FONT_FAMILIES from 'components/onboarding/Onboarding/SchemeTerms/utils/Fonts';
import {
  type ActiveChecklistSection,
  type FormData,
} from './useActiveChecklist';

import useStyles from './ActiveChecklist.styles';
import SignatureInput from '../../../components/SignBox';
import SigSeal from '../../../components/onboarding/Onboarding/SchemeTerms/SigSeal';
import CompletedChecklistView from '../completed-checklist/CompletedChecklist.view';
import { useStoreState } from '../../../state';
import FormattedMessageFixed from '#/components/util-components/FormattedMessageFixed';
import type { ActiveChecklistQuery } from '#/views/checklist/graphql/queries/view-active-checklist.generated';
import { ChecklistStatus } from 'graphql/types';

interface Props {
  id: string | undefined;
  loading: boolean;
  form: FormInstance<FormData>;
  onFinish: (data: FormData) => void;
  data: ActiveChecklistQuery | undefined;
  sections: ActiveChecklistSection[];
  saveDraft: () => void;
  name: string;
  setSign: (value: string) => void;
  update: (value: string) => void;
  selectedFont: string;
  file: { file: string; name: string } | null;
  setTab: (value: string) => void;
  tab: string;
  setSelectedFont: (value: string) => void;
  setFile: (value: { file: string; name: string } | null) => void;
  sign: string;
  submitting: boolean;
}

// const indexToLetter = (num: number) => (num + 10).toString(36).toUpperCase();

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
const normFile = (e: { fileList: never | never[] }) => {
  if (Array.isArray(e)) {
    return e;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return e && e.fileList;
};

const ActiveChecklistView = ({
  id,
  loading,
  form,
  onFinish,
  data,
  sections,
  saveDraft,
  file,
  setFile,
  name: userName,
  setSign,
  update,
  sign,
  tab,
  setTab,
  selectedFont,
  setSelectedFont,
  submitting,
}: Props) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const classes = useStyles();
  const theme = useStoreState((state) => state.theme.currentTheme);

  const watching = Form.useWatch('sections', form);

  localStorage.setItem(
    'data',
    JSON.stringify({
      checklistSections: sections,
      title: data?.activeChecklist.name || '',
      additionalInfo: data?.activeChecklist.comments || '',
      signature: data?.activeChecklist.signature || '',
      completedByUser: data?.activeChecklist.completedBy?.origName || '',
      completedAt: data?.activeChecklist.completedAt
        ? new Date(data?.activeChecklist.completedAt).toLocaleDateString(
            'en-GB'
          )
        : '',
    })
  );
  if (data && data?.activeChecklist.status === ChecklistStatus.Completed) {
    return (
      <CompletedChecklistView
        checklistSections={sections}
        title={data?.activeChecklist.name || ''}
        additionalInfo={data?.activeChecklist.comments || ''}
        signature={data?.activeChecklist.signature || ''}
        completedByUser={data?.activeChecklist?.completedBy?.origName || ''}
        completedAt={
          data.activeChecklist?.completedAt
            ? new Date(
                data?.activeChecklist?.completedAt || ''
              ).toLocaleDateString('en-GB')
            : ''
        }
        theme={theme}
        onBack={() => navigate('/app/checklists')}
      />
    );
  }

  return (
    <div className="page-view">
      <PageHeader
        onBack={() => navigate('/app/checklists')}
        title={
          data?.activeChecklist.name ||
          intl.formatMessage({
            defaultMessage: 'Checklist',
          })
        }
      />
      <Form<FormData>
        name="checklist_form"
        onFinish={onFinish}
        autoComplete="off"
        layout="horizontal"
        form={form}
        className={classes.form}
        colon={false}
        preserve
      >
        <Card
          loading={loading}
          style={loading ? { height: '100vh' } : undefined}
        >
          <Form.List name="sections">
            {(fields) =>
              sections &&
              fields.map(({ name }, sectionIndex) => (
                <>
                  <h2>{sections[sectionIndex]?.titleLocaled || ''}</h2>
                  {/* Section Fields */}

                  <Form.List name={[name, 'subsections']}>
                    {(subsectionsFields) => (
                      <>
                        {subsectionsFields.map(
                          ({ name: subsectionName }, subsectionIndex) => (
                            <>
                              <h3>
                                {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                                {subsectionIndex + 1}.{' '}
                                {
                                  sections[sectionIndex]?.subsections[
                                    subsectionIndex
                                  ]?.titleLocaled
                                }
                              </h3>

                              {/* Subsection Fields */}

                              <Form.List name={[subsectionName, 'questions']}>
                                {(questionFields) => (
                                  <>
                                    {questionFields.map(
                                      (
                                        { name: questionName },
                                        questionIndex
                                      ) => {
                                        const depend =
                                          sections[sectionIndex]?.subsections[
                                            subsectionIndex
                                          ]?.questions[questionIndex]
                                            ?.dependent;
                                        if (depend) {
                                          let shouldShow = false;
                                          if (watching.length === 0)
                                            return null;
                                          for (const subFields of watching)
                                            for (const qFields of subFields.subsections)
                                              for (const ques of qFields.questions) {
                                                if (
                                                  ques.ogName &&
                                                  ques.ogName ===
                                                    depend.question &&
                                                  ques.answer === depend.answer
                                                ) {
                                                  shouldShow = true;
                                                }
                                              }

                                          if (!shouldShow) return null;
                                        }
                                        return (
                                          <>
                                            <h4 className={classes.sideMargin}>
                                              {/* /!* eslint-disable-next-line formatjs/no-literal-string-in-jsx *!/ */}
                                              {/* {indexToLetter(questionIndex)}){' '} */}
                                              {
                                                sections[sectionIndex]
                                                  ?.subsections[subsectionIndex]
                                                  ?.questions[questionIndex]
                                                  ?.question.en
                                              }
                                            </h4>
                                            {/* Question Fields */}
                                            <Col span={13}>
                                              <Form.Item
                                                shouldUpdate
                                                className={classes.sideMargin}
                                                name={[questionName, 'answer']}
                                              >
                                                {sections[sectionIndex]
                                                  ?.subsections[subsectionIndex]
                                                  ?.questions[questionIndex]
                                                  ?.type === 'TEXT' ? (
                                                  <Input.TextArea
                                                    placeholder={intl.formatMessage(
                                                      {
                                                        defaultMessage:
                                                          'Enter your answer here...',
                                                      }
                                                    )}
                                                    autoSize={{ minRows: 3 }}
                                                  />
                                                ) : (
                                                  <Radio.Group
                                                    options={sections[
                                                      sectionIndex
                                                    ]?.subsections[
                                                      subsectionIndex
                                                    ]?.questions[
                                                      questionIndex
                                                    ]?.availableAnswers.map(
                                                      (answer) => ({
                                                        label: (
                                                          <FormattedMessageFixed
                                                            id={answer.answer}
                                                            defaultMessage={
                                                              answer.answer
                                                            }
                                                          />
                                                        ),
                                                        value: answer.answer,
                                                      })
                                                    )}
                                                    optionType="button"
                                                    buttonStyle="solid"
                                                  />
                                                )}
                                              </Form.Item>
                                            </Col>
                                            <Form.Item
                                              shouldUpdate={(
                                                prevValues,
                                                curValues
                                              ) => {
                                                const {
                                                  answer: oldAnswer,
                                                  type: oldType,
                                                } =
                                                  prevValues.sections[
                                                    sectionIndex
                                                  ].subsections[subsectionIndex]
                                                    .questions[questionIndex];
                                                const { answer, type } =
                                                  curValues.sections[
                                                    sectionIndex
                                                  ].subsections[subsectionIndex]
                                                    .questions[questionIndex];

                                                if (
                                                  oldAnswer !== answer ||
                                                  oldType !== type
                                                ) {
                                                  return type !== 'TEXT';
                                                }
                                                return false;
                                              }}
                                            >
                                              {({ getFieldValue }) => {
                                                const type = getFieldValue([
                                                  'sections',
                                                  name,
                                                  'subsections',
                                                  subsectionName,
                                                  'questions',
                                                  questionName,
                                                  'type',
                                                ]);

                                                if (type === 'TEXT') {
                                                  return null;
                                                }

                                                return (
                                                  <Col span={12}>
                                                    <Form.Item
                                                      className={
                                                        classes.sideMargin
                                                      }
                                                      name={[
                                                        questionName,
                                                        'additionalComments',
                                                      ]}
                                                      label={intl.formatMessage(
                                                        {
                                                          defaultMessage:
                                                            'Additional Info',
                                                        }
                                                      )}
                                                    >
                                                      <Input.TextArea
                                                        placeholder={intl.formatMessage(
                                                          {
                                                            defaultMessage:
                                                              'Enter your comment here...',
                                                          }
                                                        )}
                                                      />
                                                    </Form.Item>
                                                  </Col>
                                                );
                                              }}
                                            </Form.Item>
                                            <Form.Item
                                              shouldUpdate={(
                                                prevValues,
                                                curValues
                                              ) => {
                                                const {
                                                  answer: oldAnswer,
                                                  type: oldType,
                                                } =
                                                  prevValues.sections[
                                                    sectionIndex
                                                  ].subsections[subsectionIndex]
                                                    .questions[questionIndex];
                                                const { answer, type } =
                                                  curValues.sections[
                                                    sectionIndex
                                                  ].subsections[subsectionIndex]
                                                    .questions[questionIndex];

                                                if (
                                                  oldAnswer !== answer ||
                                                  oldType !== type
                                                ) {
                                                  return type !== 'TEXT';
                                                }
                                                return false;
                                              }}
                                            >
                                              {({ getFieldValue }) => {
                                                const type = getFieldValue([
                                                  'sections',
                                                  name,
                                                  'subsections',
                                                  subsectionName,
                                                  'questions',
                                                  questionName,
                                                  'type',
                                                ]) as string;

                                                if (type === 'TEXT') {
                                                  return null;
                                                }
                                                return (
                                                  <Form.Item
                                                    name={[
                                                      questionName,
                                                      'images',
                                                    ]}
                                                    label={intl.formatMessage({
                                                      defaultMessage: 'Images',
                                                    })}
                                                    className={
                                                      classes.sideMargin
                                                    }
                                                    valuePropName="fileList"
                                                    getValueFromEvent={normFile}
                                                  >
                                                    <Upload
                                                      action={
                                                        import.meta.env
                                                          .VITE_APP_CHECKLIST_UPLOAD_ENDPOINT
                                                      }
                                                      listType="picture-card"
                                                    >
                                                      <Button type="ghost">
                                                        <PlusOutlined />
                                                        {intl.formatMessage({
                                                          defaultMessage:
                                                            'Upload',
                                                        })}
                                                      </Button>
                                                    </Upload>
                                                  </Form.Item>
                                                );
                                              }}
                                            </Form.Item>
                                          </>
                                        );
                                      }
                                    )}
                                  </>
                                )}
                              </Form.List>
                            </>
                          )
                        )}
                      </>
                    )}
                  </Form.List>
                </>
              ))
            }
          </Form.List>
        </Card>
        <Card loading={loading}>
          <Col span={24}>
            <Col span={13}>
              <Form.Item
                shouldUpdate
                name="additionalInfo"
                label={intl.formatMessage({
                  defaultMessage: 'Additional Comments:',
                })}
              >
                <Input.TextArea
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Enter your comment here...',
                  })}
                />
              </Form.Item>
            </Col>
          </Col>
          <Col span={24}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Sign here',
              })}
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
                            name={userName}
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
                              name={userName}
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
                          {userName}
                        </Select.Option>
                      ))}
                    </Select>
                    <SigSeal
                      key={selectedFont}
                      name={userName}
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
                                      src={base64File}
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
              </div>
            </Form.Item>
          </Col>
        </Card>

        <Row>
          <Col flex={1} />
          <Space>
            <Col>
              <Form.Item>
                <Button
                  loading={loading || submitting}
                  onClick={() => navigate('/app/checklists')}
                >
                  {id
                    ? intl.formatMessage({
                        defaultMessage: 'Cancel',
                      })
                    : intl.formatMessage({
                        defaultMessage: 'Back',
                      })}
                </Button>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item>
                <Button
                  loading={loading || submitting}
                  type="primary"
                  onClick={() => saveDraft()}
                >
                  {intl.formatMessage({
                    defaultMessage: 'Save Draft',
                  })}
                </Button>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item>
                <Button
                  loading={loading || submitting}
                  type="primary"
                  htmlType="submit"
                >
                  {intl.formatMessage({
                    defaultMessage: 'Submit',
                  })}
                </Button>
              </Form.Item>
            </Col>
          </Space>
        </Row>
      </Form>
    </div>
  );
};
export default ActiveChecklistView;
