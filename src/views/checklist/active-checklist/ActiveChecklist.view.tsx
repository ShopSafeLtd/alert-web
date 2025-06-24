/* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-argument,no-restricted-syntax */
import type { ActiveChecklistQuery } from '#/views/checklist/graphql/queries/__generated__/view-active-checklist.generated';
import type { FormInstance } from 'antd';

import FormattedMessageFixed from '#/components/util-components/FormattedMessageFixed';
import { getCustomUrls } from '#/providers/GetCustomUrls';
import MediaUrlUploader from '#/views/checklist/active-checklist/media-component';
import { PlusOutlined } from '@ant-design/icons';
import { faFileUpload } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
import FONT_FAMILIES from 'components/onboarding/Onboarding/SchemeTerms/utils/Fonts';
import { ChecklistStatus } from 'graphql/types';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router';

import SignatureInput from '../../../components/SignBox';
import SigSeal from '../../../components/onboarding/Onboarding/SchemeTerms/SigSeal';
import { useStoreState } from '../../../state';
import CompletedChecklistView from '../completed-checklist/CompletedChecklist.view';
import useStyles from './ActiveChecklist.styles';
import {
  type ActiveChecklistSection,
  type FormData,
} from './useActiveChecklist';

interface Props {
  data: ActiveChecklistQuery | undefined;
  file: { file: string; name: string } | null;
  form: FormInstance<FormData>;
  id: string | undefined;
  loading: boolean;
  name: string;
  onFinish: (data: FormData) => void;
  saveDraft: () => void;
  sections: ActiveChecklistSection[];
  selectedFont: string;
  setFile: (value: { file: string; name: string } | null) => void;
  setSelectedFont: (value: string) => void;
  setSign: (value: string) => void;
  setTab: (value: string) => void;
  sign: string;
  submitting: boolean;
  tab: string;
  update: (value: string) => void;
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
  data,
  file,
  form,
  id,
  loading,
  name: userName,
  onFinish,
  saveDraft,
  sections,
  selectedFont,
  setFile,
  setSelectedFont,
  setSign,
  setTab,
  sign,
  submitting,
  tab,
  update,
}: Props) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const classes = useStyles();
  const theme = useStoreState((state) => state.theme.currentTheme);

  const watching = Form.useWatch('sections', form);

  localStorage.setItem(
    'data',
    JSON.stringify({
      additionalInfo: data?.activeChecklist.comments || '',
      checklistSections: sections,
      completedAt: data?.activeChecklist.completedAt
        ? new Date(data?.activeChecklist.completedAt).toLocaleDateString(
            'en-GB'
          )
        : '',
      completedByUser: data?.activeChecklist.completedBy?.origName || '',
      signature: data?.activeChecklist.signature || '',
      title: data?.activeChecklist.name || '',
    })
  );
  if (data && data?.activeChecklist.status === ChecklistStatus.Completed) {
    return (
      <CompletedChecklistView
        additionalInfo={data?.activeChecklist.comments || ''}
        checklistSections={sections}
        completedAt={
          data.activeChecklist?.completedAt
            ? new Date(
                data?.activeChecklist?.completedAt || ''
              ).toLocaleDateString('en-GB')
            : ''
        }
        completedByUser={data?.activeChecklist?.completedBy?.origName || ''}
        onBack={() => navigate('/app/checklists')}
        signature={data?.activeChecklist.signature || ''}
        theme={theme}
        title={data?.activeChecklist.name || ''}
      />
    );
  }
  const { checklistUpload } = getCustomUrls();
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
        autoComplete="off"
        className={classes.form}
        colon={false}
        form={form}
        layout="horizontal"
        name="checklist_form"
        onFinish={onFinish}
        preserve
      >
        <Card
          loading={loading}
          style={loading ? { height: '100vh' } : undefined}
        >
          <Form.List name="sections">
            {(fields) =>
              sections &&
              fields.map(({ name }, sectionIndex) => {
                const section = sections[sectionIndex];
                const depends = section?.dependsOnWeight;

                // Check section dependency
                if (depends) {
                  const dependencyIndex = Number(depends.dependsOn) - 1;
                  const threshold = Number(depends.weight);
                  const dependSection = form.getFieldValue([
                    'sections',
                    dependencyIndex,
                  ]) as ActiveChecklistSection | undefined;

                  if (!dependSection) return null;

                  const totalWeight = dependSection.subsections
                    .flatMap((sub) =>
                      sub.questions.map((q) =>
                        q.answer === 'N/A'
                          ? 0
                          : q.weights.find((w) => w.answer === q.answer)
                              ?.weight || 0
                      )
                    )
                    .reduce((a, b) => a + b, 0);

                  if (totalWeight < threshold) return null;
                }

                return (
                  <div key={sectionIndex}>
                    <h2>{section?.titleLocaled || ''}</h2>

                    {/* Render Subsections */}
                    <Form.List name={[name, 'subsections']}>
                      {(subsectionsFields) => (
                        <>
                          {subsectionsFields.map(
                            ({ name: subsectionName }, subsectionIndex) => {
                              const subsection =
                                sections[sectionIndex]?.subsections[
                                  subsectionIndex
                                ];

                              return (
                                <div key={subsectionIndex}>
                                  <h3>
                                    {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                                    {subsectionIndex + 1}.{' '}
                                    {subsection?.titleLocaled}
                                  </h3>

                                  {/* Render Questions */}
                                  <Form.List
                                    name={[subsectionName, 'questions']}
                                  >
                                    {(questionFields) => (
                                      <>
                                        {questionFields.map(
                                          (
                                            { name: questionName },
                                            questionIndex
                                          ) => {
                                            const question =
                                              subsection?.questions[
                                                questionIndex
                                              ];
                                            const depend = question?.dependent;

                                            // Check question dependency
                                            if (depend) {
                                              let shouldShow = false;
                                              if (watching.length === 0)
                                                return null;

                                              for (const subFields of watching) {
                                                for (const qFields of subFields.subsections) {
                                                  for (const ques of qFields.questions) {
                                                    if (
                                                      ques.ogName ===
                                                        depend.question &&
                                                      ques.answer ===
                                                        depend.answer
                                                    ) {
                                                      shouldShow = true;
                                                    }
                                                  }
                                                }
                                              }

                                              if (!shouldShow) return null;
                                            }

                                            return (
                                              <div key={questionIndex}>
                                                <h4
                                                  className={classes.sideMargin}
                                                >
                                                  {question?.question.en}
                                                </h4>

                                                {/* Render Answer Field */}
                                                <Col span={13}>
                                                  <Form.Item
                                                    className={
                                                      classes.sideMargin
                                                    }
                                                    name={[
                                                      questionName,
                                                      'answer',
                                                    ]}
                                                  >
                                                    {question?.type ===
                                                    'TEXT' ? (
                                                      <Input.TextArea
                                                        autoSize={{
                                                          minRows: 3,
                                                        }}
                                                        placeholder={intl.formatMessage(
                                                          {
                                                            defaultMessage:
                                                              'Enter your answer here...',
                                                          }
                                                        )}
                                                      />
                                                    ) : question?.type ===
                                                      'MEDIA' ? (
                                                      <MediaUrlUploader />
                                                    ) : (
                                                      <Radio.Group
                                                        buttonStyle="solid"
                                                        optionType="button"
                                                        options={question?.availableAnswers.map(
                                                          (answer) => ({
                                                            label: (
                                                              <FormattedMessageFixed
                                                                defaultMessage={
                                                                  answer.answer
                                                                }
                                                                id={
                                                                  answer.answer
                                                                }
                                                              />
                                                            ),
                                                            value:
                                                              answer.answer,
                                                          })
                                                        )}
                                                      />
                                                    )}
                                                  </Form.Item>
                                                </Col>

                                                {/* Render Additional Info Field */}
                                                {question?.type !== 'TEXT' &&
                                                  question?.type !==
                                                    'MEDIA' && (
                                                    <Col span={12}>
                                                      <Form.Item
                                                        className={
                                                          classes.sideMargin
                                                        }
                                                        label={intl.formatMessage(
                                                          {
                                                            defaultMessage:
                                                              'Additional Info',
                                                          }
                                                        )}
                                                        name={[
                                                          questionName,
                                                          'additionalComments',
                                                        ]}
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
                                                  )}

                                                {/* Render Image Upload Field */}
                                                {question?.type !== 'TEXT' &&
                                                  question?.type !==
                                                    'MEDIA' && (
                                                    <Form.Item
                                                      className={
                                                        classes.sideMargin
                                                      }
                                                      getValueFromEvent={
                                                        normFile
                                                      }
                                                      label={intl.formatMessage(
                                                        {
                                                          defaultMessage:
                                                            'Images',
                                                        }
                                                      )}
                                                      name={[
                                                        questionName,
                                                        'images',
                                                      ]}
                                                      valuePropName="fileList"
                                                    >
                                                      <Upload
                                                        action={checklistUpload}
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
                                                  )}
                                              </div>
                                            );
                                          }
                                        )}
                                      </>
                                    )}
                                  </Form.List>
                                </div>
                              );
                            }
                          )}
                        </>
                      )}
                    </Form.List>
                  </div>
                );
              })
            }
          </Form.List>
        </Card>
        <Card loading={loading}>
          <Col span={24}>
            <Col span={13}>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Additional Comments:',
                })}
                name="additionalInfo"
                shouldUpdate
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
                            name={userName}
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
                              name={userName}
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
                          {userName}
                        </Select.Option>
                      ))}
                    </Select>
                    <SigSeal
                      font={selectedFont}
                      height={100}
                      key={selectedFont}
                      name={userName}
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
                  onClick={() => saveDraft()}
                  type="primary"
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
                  htmlType="submit"
                  loading={loading || submitting}
                  type="primary"
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
