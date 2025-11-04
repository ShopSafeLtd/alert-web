import type { QuestionGroupOnSchemeQuery } from '#/views/adminTodo/graphql/queries/__generated__/listTemplates.generated';
import type { FormInstance, UploadFile, UploadProps } from 'antd';
import type {
  ChecklistData,
  CrimeGroupData,
  CustomQuestion,
  IncidentCardData,
  InvestigationData,
  OffenderData,
  SelectOptions,
} from 'types/DataType';

import DatePicker from '#/components/util-components/DatePicker';
import { useGroupsContext } from '#/context/groups-context';
import {
  currentSchemeAtom,
  isAdminAtom,
} from '#/providers/SchemeProvider/SchemeProvider';
import { UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Tooltip,
  Typography,
  Upload,
} from 'antd';
import { useAtomValue } from 'jotai/index';
import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';

import type { FormData } from './useAddTodo';

import CustomQuestions from '../../../../views/incidents/AddIncident/components/IncidentCustom/CustomQuestion.view';
import BusinessesSelect from '../../BusinessesSelect/BusinessesSelect.view';
import CreateQuestionContainer from '../../createQuestion/CreateQuestion.container';
import LinkProfile from '../LinkProfile';
const { Title } = Typography;

interface Props {
  addQuestion: boolean;
  adminUsersData: SelectOptions[] | undefined;
  availableUsers: { id: string; name: string; timeTaken: number }[];
  businessId?: string;
  checklistsData: ChecklistData | undefined;
  crimeGroupsData: CrimeGroupData | undefined;
  documentList: UploadFile[];
  documentUploadProps?: UploadProps;
  // setSelectedQuestions: (value: { id: string; question: string }[]) => void;
  form: FormInstance<FormData>;
  incidentsData: IncidentCardData | undefined;
  investigationsData: InvestigationData | undefined;
  offendersData: OffenderData | undefined;
  onClose: () => void;
  onSubmit: (value: FormData) => void;
  // setSelectedIds: (value: string[]) => void;
  questions: CustomQuestion[];
  // selectedQuestions: { id: string; question: string }[];
  saving: boolean;
  selectedIds?: string[];
  setAddQuestion: (value: boolean) => void;
  setAvailableUsers: (
    users: { id: string; name: string; timeTaken: number }[]
  ) => void;
  setUsers: (users: { id: string; name: string; timeTaken: number }[]) => void;
  taskTimeTracking: boolean | undefined;
  templatesData: QuestionGroupOnSchemeQuery | undefined;
  templatesLoading: boolean;
  update: (id: string, question: string) => void;
  updateChecklistsList: (value: ChecklistData | undefined) => void;
  updateCrimeGroupsList: (value: CrimeGroupData | undefined) => void;
  updateIncidentList: (value: IncidentCardData | undefined) => void;
  updateInvestigationList: (value: InvestigationData | undefined) => void;
  updateOffendersList: (value: OffenderData | undefined) => void;
  users: { id: string; name: string; timeTaken: number }[];
  usersLoading: boolean;
}

const AddTodo = ({
  addQuestion,
  adminUsersData,
  availableUsers,
  businessId,
  checklistsData,
  crimeGroupsData,
  documentList,
  documentUploadProps,
  // setSelectedQuestions,
  form,
  incidentsData,
  investigationsData,
  offendersData,
  onClose,
  onSubmit,
  // setSelectedIds,
  questions,
  // selectedQuestions,
  saving,
  selectedIds,
  setAddQuestion,
  setAvailableUsers,
  setUsers,
  taskTimeTracking,
  templatesData,
  templatesLoading,
  update,
  updateChecklistsList,
  updateCrimeGroupsList,
  updateIncidentList,
  updateInvestigationList,
  updateOffendersList,
  users,
  usersLoading,
}: Props): JSX.Element => {
  const intl = useIntl();
  const { groups, groupsLoading } = useGroupsContext();

  const allowOverride =
    useAtomValue(currentSchemeAtom)?.allowTodoTemplateOverride;
  const isAdmin = useAtomValue(isAdminAtom);
  const templateId = Form.useWatch('questionGroup', form);

  const forceTemplateSelection = useMemo(
    () => !allowOverride && !isAdmin && !templateId,
    [templateId, allowOverride]
  );
  const disableTemplateFields = useMemo(
    () => !allowOverride && Boolean(templateId),
    [templateId, allowOverride]
  );

  return (
    <>
      <Form
        form={form}
        initialValues={{
          assignedUsers: [],
          business: businessId,
          completed: false,
        }}
        layout="vertical"
        onFinish={onSubmit}
      >
        <Form.Item hidden name="completed">
          <input type="hidden" />
        </Form.Item>
        <Row justify="start">
          <Col span={10}>
            <Form.Item
              label={
                forceTemplateSelection
                  ? intl.formatMessage({
                      defaultMessage: 'Select an activity template',
                    })
                  : intl.formatMessage({
                      defaultMessage: 'Use an activity template',
                    })
              }
              name="questionGroup"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage: 'You must select an activity template',
                  }),
                  required: forceTemplateSelection,
                },
              ]}
            >
              <Select
                allowClear
                disabled={saving}
                loading={templatesLoading}
                options={templatesData?.scheme?.questionGroups.map(
                  (template) => ({
                    label: template.name,
                    value: template.id,
                  })
                )}
                placeholder={intl.formatMessage({
                  defaultMessage: 'No template selected',
                })}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col flex={1}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Name',
              })}
              name="name"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage: 'Please enter a name for the new to-do.',
                  }),
                  required: true,
                },
              ]}
            >
              <Input
                disabled={
                  saving || disableTemplateFields || forceTemplateSelection
                }
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Due Date',
              })}
              name="dueDate"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage:
                      'Please select a due date for the new to-do.',
                  }),
                  required: true,
                },
              ]}
            >
              <DatePicker
                disabled={
                  saving || disableTemplateFields || forceTemplateSelection
                }
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Assigned Users',
              })}
              name="assignedUsers"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage:
                      'Please selected at least one user for the activity.',
                  }),
                  required: true,
                },
              ]}
            >
              <Select
                disabled={saving || forceTemplateSelection}
                loading={usersLoading}
                maxTagCount={3}
                mode="multiple"
                optionFilterProp="label"
                optionLabelProp="label"
                options={adminUsersData}
              />
            </Form.Item>
          </Col>
          <Col span={12} />
          <Col span={12}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Groups',
              })}
              name="groups"
              // ？？？？
              // rules={[
              //   ({ getFieldValue }) => ({
              //     validator(_, value: string[]) {
              //       const businesses = getFieldValue('businesses') as string[];
              //       if (!value?.length && !businesses?.length) {
              //         return Promise.reject(
              //           new Error(
              //             intl.formatMessage({
              //               defaultMessage:
              //                 'Please select at least one group or business for the activity.',
              //             })
              //           )
              //         );
              //       }
              //       return Promise.resolve();
              //     },
              //   }),
              // ]}
            >
              <Select
                disabled={saving || forceTemplateSelection}
                loading={groupsLoading}
                maxTagCount={3}
                mode="multiple"
                optionFilterProp="label"
                optionLabelProp="label"
                options={groups}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Businesses',
              })}
              name="businesses"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage:
                      'Please selected at least one business for the activity.',
                  }),
                  required: true,
                },
              ]}
              // ？？？？
              // rules={[
              //   ({ getFieldValue }) => ({
              //     validator(_, value: string[]) {
              //       const groups = getFieldValue('groups') as string[];
              //       if (!value?.length && !groups?.length) {
              //         return Promise.reject(
              //           new Error(
              //             intl.formatMessage({
              //               defaultMessage:
              //                 'Please select at least one group or business for the activity.',
              //             })
              //           )
              //         );
              //       }
              //       return Promise.resolve();
              //     },
              //   }),
              // ]}
            >
              <BusinessesSelect
                allowClear
                disabled={saving || forceTemplateSelection || !!businessId}
                placeholder={intl.formatMessage({
                  defaultMessage: 'Search for a business...',
                })}
                showSearch
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={23}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Description',
              })}
              name="description"
            >
              <Input.TextArea
                disabled={
                  saving || disableTemplateFields || forceTemplateSelection
                }
              />
            </Form.Item>
          </Col>
        </Row>
        {questions && questions.length > 0 ? (
          <CustomQuestions
            disabled={saving || forceTemplateSelection}
            questions={questions}
          />
        ) : null}
        {/* <Row> */}
        {/*  <Col span={23}> */}
        {/*    <Form.Item */}
        {/*      name="questions" */}
        {/*      label={intl.formatMessage({ */}
        {/*        id: 'KV/9Hv', */}
        {/*        defaultMessage: 'Questions', */}
        {/*      })} */}
        {/*      style={{ marginBottom: 10 }} */}
        {/*    > */}
        {/*      {selectedQuestions.map((question) => ( */}
        {/*        <Row> */}
        {/*          <Col flex={1}> */}
        {/*            <p>{question.question}</p> */}
        {/*          </Col> */}
        {/*          <Col> */}
        {/*            <Button */}
        {/*              size="small" */}
        {/*              onClick={() => { */}
        {/*                setSelectedQuestions( */}
        {/*                  selectedQuestions.filter((q) => q.id !== question.id) */}
        {/*                ); */}
        {/*                setSelectedIds( */}
        {/*                  selectedIds?.filter((id) => id !== question.id) || [] */}
        {/*                ); */}
        {/*              }} */}
        {/*              icon={<FontAwesomeIcon icon={faTrash} />} */}
        {/*            /> */}
        {/*          </Col> */}
        {/*        </Row> */}
        {/*      ))} */}
        {/*    </Form.Item> */}
        {/*    <Row justify="end"> */}
        {/*      <Col> */}
        {/*        <Button size="small" onClick={() => setAddQuestion(true)}> */}
        {/*          {intl.formatMessage({ */}
        {/*            id: '7nSzTq', */}
        {/*            defaultMessage: 'Add Question', */}
        {/*          })} */}
        {/*        </Button> */}
        {/*      </Col> */}
        {/*    </Row> */}
        {/*  </Col> */}
        {/* </Row> */}

        {taskTimeTracking && (
          <Row>
            <Col span={24}>
              {users.length > 0 && (
                <Title level={4}>
                  {intl.formatMessage({
                    defaultMessage: 'Time Tracking',
                  })}
                </Title>
              )}
              <Row>
                <Col flex={1}>
                  {users.map((user) => (
                    <Form.Item
                      colon
                      key={user.id}
                      label={user.name}
                      name={user.id}
                      required={false}
                      rules={[
                        {
                          message: intl.formatMessage({
                            defaultMessage: 'Please add a time for this user.',
                          }),
                          required: true,
                        },
                      ]}
                    >
                      <InputNumber
                        addonAfter={intl.formatMessage({
                          defaultMessage: 'mins',
                        })}
                        disabled={saving || forceTemplateSelection}
                        min={0}
                      />
                    </Form.Item>
                  ))}
                </Col>
                {users.length > 0 && (
                  <Col>
                    <Typography.Paragraph
                      style={{ fontWeight: 600, marginBottom: 5 }}
                    >
                      {intl.formatMessage({
                        defaultMessage: 'Add Another User',
                      })}
                    </Typography.Paragraph>
                    <Select
                      disabled={saving}
                      onSelect={(value) => {
                        const user = availableUsers.find((u) => u.id === value);
                        if (user) {
                          setUsers([...users, user]);
                          setAvailableUsers(
                            availableUsers.filter((u) => u.id !== value)
                          );
                        }
                      }}
                      options={availableUsers.map((user) => ({
                        label: user.name,
                        value: user.id,
                      }))}
                      style={{ width: 200 }}
                      value={null}
                    />
                  </Col>
                )}
              </Row>
            </Col>
          </Row>
        )}
        <LinkProfile
          checklistsData={checklistsData}
          crimeGroupsData={crimeGroupsData}
          incidentsData={incidentsData}
          investigationsData={investigationsData}
          offendersData={offendersData}
          saving={saving}
          updateChecklistsList={updateChecklistsList}
          updateCrimeGroupsList={updateCrimeGroupsList}
          updateIncidentList={updateIncidentList}
          updateInvestigationList={updateInvestigationList}
          updateOffendersList={updateOffendersList}
        />

        <Form.Item
          label={intl.formatMessage({
            defaultMessage: 'Evidence',
          })}
          name="documents"
        >
          <Upload
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...documentUploadProps}
            fileList={documentList}
            listType="picture"
            style={{ display: 'flex' }}
          >
            <Button
              disabled={saving || forceTemplateSelection}
              icon={<UploadOutlined />}
            >
              {intl.formatMessage({
                defaultMessage: 'Upload Document',
              })}
            </Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Row gutter={16} justify="end" style={{ marginTop: 30 }}>
            <Col>
              <Button disabled={saving} onClick={onClose}>
                {intl.formatMessage({
                  defaultMessage: 'Cancel',
                })}
              </Button>
            </Col>
            <Col>
              <Tooltip
                title={intl.formatMessage({
                  defaultMessage: 'Create activity to be completed later.',
                })}
              >
                <Button
                  danger
                  disabled={saving}
                  loading={saving}
                  onClick={() => {
                    const data = form.getFieldsValue();

                    if (data.name === undefined) {
                      Modal.error({
                        content: intl.formatMessage({
                          defaultMessage:
                            'Enter a name for the activity before creating it.',
                        }),
                        title: intl.formatMessage({
                          defaultMessage: 'Missing Name',
                        }),
                        type: 'error',
                      });
                      return;
                    }

                    if (data.dueDate === undefined) {
                      Modal.error({
                        content: intl.formatMessage({
                          defaultMessage:
                            'Add a due date for the activity before creating it.',
                        }),
                        title: intl.formatMessage({
                          defaultMessage: 'Missing Due Date',
                        }),
                        type: 'error',
                      });
                      return;
                    }

                    if (
                      data.assignedUsers === undefined ||
                      data.assignedUsers.length === 0
                    ) {
                      Modal.error({
                        content: intl.formatMessage({
                          defaultMessage:
                            'Please assign this activity to at least one user.',
                        }),
                        title: intl.formatMessage({
                          defaultMessage: 'Missing Assigned Users',
                        }),
                        type: 'error',
                      });
                      return;
                    }

                    if (
                      data.groups === undefined &&
                      data.businesses === undefined
                    ) {
                      Modal.error({
                        content: intl.formatMessage({
                          defaultMessage:
                            'Select at least one group or a business for the activity before creating it.',
                        }),
                        title: intl.formatMessage({
                          defaultMessage: 'Missing Group or Business',
                        }),
                        type: 'error',
                      });
                      return;
                    }

                    form.setFieldValue('completed', false);
                    onSubmit(data);
                  }}
                >
                  {intl.formatMessage({
                    defaultMessage: 'Create Activity',
                  })}
                </Button>
              </Tooltip>
            </Col>
            <Col>
              <Button
                disabled={saving}
                loading={saving}
                onClick={() => {
                  form.setFieldValue('completed', true);
                  form.submit();
                }}
                type="primary"
              >
                {intl.formatMessage({
                  defaultMessage: 'Create & Complete',
                })}
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
      <Drawer
        onClose={() => setAddQuestion(false)}
        open={addQuestion}
        title={intl.formatMessage({
          defaultMessage: 'Add/Create Question',
        })}
        width="800"
      >
        {addQuestion ? (
          <CreateQuestionContainer
            ids={selectedIds}
            onClose={() => setAddQuestion(false)}
            update={update}
          />
        ) : (
          <div />
        )}
      </Drawer>
      {/* <Drawer
        onClose={toggleLinkIncident}
        open={linkIncident}
        title={intl.formatMessage({
          defaultMessage: 'Link Incidents',
        })}
        width="800"
      >
        {linkIncident ? (
          <LinkIncident
            incidentIds={incidentsData ? [incidentsData?.id] : []}
            onClose={toggleLinkIncident}
            update={updateIncidentList}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={toggleLinkOffender}
        open={linkOffender}
        title={intl.formatMessage({
          defaultMessage: 'Link Offenders',
        })}
        width="800"
      >
        {linkOffender ? (
          <LinkOffender
            offenderIds={offendersData ? [offendersData?.id] : []}
            onClose={toggleLinkOffender}
            update={updateOffendersList}
          />
        ) : (
          <div />
        )}
      </Drawer>

      <Drawer
        onClose={toggleLinkCrimeGroup}
        open={linkCrimeGroup}
        title={intl.formatMessage({
          defaultMessage: 'Add Crime Groups',
        })}
        width="800"
        zIndex={1001}
      >
        {linkCrimeGroup ? (
          <LinkCrimeGroup
            crimeGroupIds={crimeGroupsData ? [crimeGroupsData?.id] : []}
            onClose={toggleLinkCrimeGroup}
            update={updateCrimeGroupsList}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={toggleLinkChecklist}
        open={linkChecklist}
        title={intl.formatMessage({
          defaultMessage: 'Link Checklists',
        })}
        width="800"
      >
        {linkChecklist ? (
          <LinkChecklist
            checklistIds={checklistsData ? [checklistsData.id] : []}
            onClose={toggleLinkChecklist}
            update={updateChecklistsList}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={toggleLinkInvestigation}
        open={linkInvestigation}
        title={intl.formatMessage({
          defaultMessage: 'Link Investigation',
        })}
        width="800"
      >
        {linkInvestigation ? (
          <LinkInvestigation
            onClose={toggleLinkInvestigation}
            update={updateInvestigationList}
          />
        ) : (
          <div />
        )}
      </Drawer> */}
    </>
  );
};

export default AddTodo;
