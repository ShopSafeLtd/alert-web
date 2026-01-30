import BusinessesSelect from '#/components/form-components/BusinessesSelect/BusinessesSelect.view';
import GroupsSelect from '#/components/form-components/GroupsSelect/GroupsSelect.view';
import RoleSelect from '#/components/form-components/Roles/RoleSelect';
import AddExistingOffender from '#/components/form-components/offender/AddExistingOffender/AddExistingOffender.container';
import pdfFilePickerCallback from '#/views/article/CreateEditArticle/hooks/handlePdf';
import { UploadOutlined } from '@ant-design/icons';
import { Editor } from '@tinymce/tinymce-react';
import {
  Avatar,
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  List,
  PageHeader,
  Row,
  Select,
  Typography,
  Upload,
} from 'antd';
import {
  ArticlePriority,
  PermissionMethod,
  PermissionModel,
} from 'graphql/types';
import React from 'react';
import { useIntl } from 'react-intl';

import type { FormData } from './hooks/useCreateEditArticle';
import type { ViewProps } from './types/CreateArticle';

import LinkIncident from '../../../components/form-components/linkOptions/LinkIncident';
import Loading from '../../../components/shared-components/AntD/Loading';
import { useStoreState } from '../../../state';

const CreateEditArticleView = ({
  categories,
  categoriesChange,
  // preview,
  // previewText,
  // setPreviewImage,
  // setPreviewText,
  // previewImage,
  data,
  documentUploadProps,
  drawer,
  // log,
  editorRef,
  fileList,
  filePickerCallback,
  form,
  // imgSrcs,
  id,
  imagesUploadHandler,
  incidents,
  initData,
  insertIncident,
  insertOffender,
  loading,
  offenders,
  onGroupsChange,
  onSubmit,
  removeIncident,
  removeOffender,
  saveDraft,
  schemeId,
  selectedCategories,
  selectedSchemes,
}: ViewProps) => {
  const intl = useIntl();
  const noSchemes = selectedSchemes;

  const forms = {
    addIncident:
      !noSchemes || (noSchemes && noSchemes?.length <= 1) ? (
        <LinkIncident
          getIncident={insertIncident}
          incidentIds={
            incidents ? incidents.map((incident) => incident.incident.id) : []
          }
          onClose={() => drawer.close()}
        />
      ) : (
        <div>
          {intl.formatMessage({
            defaultMessage:
              'At the moment adding an incident to a multi-scheme article is not supported.',
          })}
        </div>
      ),
    addOffender:
      !noSchemes || (noSchemes && noSchemes?.length <= 1) ? (
        <AddExistingOffender
          offenderIds={
            offenders ? offenders.map((offender) => offender.id) : []
          }
          onClose={() => drawer.close()}
          update={insertOffender}
        />
      ) : (
        <div>
          {intl.formatMessage({
            defaultMessage:
              'At the moment adding an incident to a multi-scheme article is not supported.',
          })}
        </div>
      ),
    // eslint-disable-next-line react/jsx-no-useless-fragment
    null: <></>,
  };
  // const previewButtons = () => (
  //   <>
  //     {' '}
  //     <Button onClick={() => log()} style={{ marginTop: 20, marginRight: 10 }}>
  //       Generate preview text and images array
  //     </Button>
  //     <Button onClick={() => preview()} style={{ marginTop: 20 }}>
  //       Preview
  //     </Button>
  //   </>
  // );
  const theme = useStoreState((state) => state.theme).currentTheme === 'dark';
  return (
    <>
      <div className="page-view">
        <PageHeader
          title={
            id
              ? intl.formatMessage({
                  defaultMessage: 'Edit Bulletin',
                })
              : intl.formatMessage({
                  defaultMessage: 'Create Bulletin',
                })
          }
        />
        {loading && (
          <Card
            bodyStyle={{
              alignItems: 'center',
              display: 'flex',
              height: '100vh',
              justifyContent: 'center',
              margin: 0,
              padding: 0,
            }}
            style={{
              height: '100%',
              position: 'absolute',
              width: '98%',
              zIndex: 1000,
            }}
          >
            <Loading />
          </Card>
        )}
        <Card style={{ marginLeft: 20, marginRight: 20, minHeight: 600 }}>
          <Form<FormData>
            form={form}
            initialValues={
              data || {
                categories: [],
                content: '',
                groups: [],
                importance: 'Normal',
                schemes: [],
                title: '',
                watermarkImage: true,
              }
            }
            layout="vertical"
            onFinish={onSubmit}
          >
            <Row gutter={32} style={{ marginLeft: 10, marginRight: 10 }}>
              <Col span={12}>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Title',
                  })}
                  name="title"
                  rules={[
                    {
                      message: intl.formatMessage({
                        defaultMessage: 'Please input title!',
                      }),
                      required: true,
                    },
                  ]}
                >
                  <Input
                    placeholder={intl.formatMessage({
                      defaultMessage: 'Title',
                    })}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Content Groups',
                  })}
                  name="groups"
                  rules={[
                    {
                      message: intl.formatMessage({
                        defaultMessage: 'Please select groups!',
                      }),
                      required: true,
                    },
                  ]}
                >
                  <GroupsSelect
                    allowClear
                    allowSelectAll
                    allowTree
                    maxTagCount={2}
                    mode="multiple"
                    onChange={onGroupsChange}
                    optionFilterProp="label"
                    permissionsFilter={[
                      {
                        allowedMethods: [PermissionMethod.Read],
                        model: PermissionModel.Reports,
                      },
                    ]}
                    placeholder={intl.formatMessage({
                      defaultMessage: 'Content Groups',
                    })}
                    style={{ minWidth: 200 }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={32} style={{ marginLeft: 10, marginRight: 10 }}>
              <Col span={12}>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Business',
                  })}
                  name="business"
                >
                  <BusinessesSelect
                    allowClear
                    // disabled={saving || forceTemplateSelection || !!businessId}
                    placeholder={intl.formatMessage({
                      defaultMessage: 'Search for a business...',
                    })}
                    showSearch
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Roles',
                  })}
                  name="roles"
                >
                  <RoleSelect
                    multi
                    schemeId={schemeId}
                    // onChange={onRolesChange}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Category',
                  })}
                  name="category"
                >
                  <Select
                    labelInValue
                    loading={loading}
                    maxTagCount={2}
                    mode="tags"
                    onChange={categoriesChange}
                    optionFilterProp="value"
                    options={categories}
                    // select mutliple, category, can create new
                    placeholder={intl.formatMessage({
                      defaultMessage: 'Category',
                    })}
                    size="small"
                    style={{ minWidth: 200 }}
                    value={selectedCategories}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Importance',
                  })}
                  name="importance"
                  rules={[
                    {
                      message: intl.formatMessage({
                        defaultMessage: 'Please select importance!',
                      }),
                      required: true,
                    },
                  ]}
                >
                  <Select
                    loading={loading}
                    placeholder={intl.formatMessage({
                      defaultMessage: 'Type',
                    })}
                    style={{ minWidth: 200 }}
                  >
                    {Object.keys(ArticlePriority).map((priority) => (
                      <Select.Option value={priority}>{priority}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Watermark Preview',
                  })}
                  name="watermarkImage"
                  valuePropName="checked"
                >
                  <Checkbox />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              noStyle
              shouldUpdate={(prevValues: FormData, currentValues: FormData) =>
                prevValues.importance !== currentValues.importance
              }
            >
              {({ getFieldValue }) =>
                getFieldValue('importance') === ArticlePriority.Critical ? (
                  <Row gutter={16} style={{ marginTop: 16 }}>
                    <Col span={12}>
                      <Form.Item
                        label={intl.formatMessage({
                          defaultMessage: 'Critical Expiry Date',
                        })}
                        name="criticalExpiry"
                        rules={[
                          {
                            message: intl.formatMessage({
                              defaultMessage:
                                'Please select expiry date for critical bulletin!',
                            }),
                            required: true,
                          },
                        ]}
                      >
                        <DatePicker
                          format="YYYY-MM-DD HH:mm"
                          placeholder={intl.formatMessage({
                            defaultMessage: 'Select expiry date',
                          })}
                          showTime
                          style={{ width: '100%' }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                ) : null
              }
            </Form.Item>
            <div style={{ margin: 25 }}>
              {initData === undefined ? (
                <div
                  style={{
                    alignItems: 'center',
                    border: '1px solid #d9d9d9',
                    borderRadius: '2px',
                    display: 'flex',
                    justifyContent: 'center',
                    minHeight: 500,
                  }}
                >
                  <Loading />
                </div>
              ) : (
                <Editor
                  init={{
                    branding: false,
                    content_css: theme ? 'dark' : undefined,
                    content_style:
                      'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                    contextmenu: false,
                    default_link_target: '_blank',
                    elementpath: false,
                    file_picker_callback: filePickerCallback,
                    file_picker_types: 'file, image, media',
                    images_upload_handler: imagesUploadHandler,
                    // @ts-expect-error prop issue
                    license_key: 'gpl',
                    licenseKey: 'gpl',

                    menubar: 'file edit view insert format tools table',
                    min_height: 500,
                    plugins: [
                      'preview',
                      'importcss',
                      'searchreplace',
                      'save',
                      'directionality',
                      'visualblocks',
                      'visualchars',
                      'fullscreen',
                      'image',
                      'link',
                      'media',

                      'table',
                      'charmap',
                      'pagebreak',
                      'nonbreaking',
                      'anchor',
                      'insertdatetime',
                      'advlist',
                      'lists',
                      'wordcount',
                      'charmap',
                      'quickbars',
                      'emoticons',
                      'autoresize',
                    ],
                    promotion: false,
                    setup: (editor) => {
                      editor.ui.registry.addMenuButton('insertMenuButton', {
                        fetch(callback) {
                          const items = [
                            {
                              onAction() {
                                drawer.open({
                                  defaultTitle: intl.formatMessage({
                                    defaultMessage: 'Add Incident',
                                  }),
                                  id: 'addIncident',
                                });
                              },
                              text: intl.formatMessage({
                                defaultMessage: 'Add Incident',
                              }),
                              type: 'menuitem',
                            },
                            {
                              onAction() {
                                drawer.open({
                                  defaultTitle: intl.formatMessage({
                                    defaultMessage: 'Add Offender',
                                  }),
                                  id: 'addOffender',
                                });
                              },
                              text: intl.formatMessage({
                                defaultMessage: 'Add Offender',
                              }),
                              type: 'menuitem',
                            },
                            {
                              onAction() {
                                filePickerCallback(
                                  (file, { title }) => {
                                    editor.insertContent(
                                      `<a href="${file}" target="_blank" rel="noopener noreferrer">${title}</a>`
                                    );
                                  },
                                  'document',
                                  { filetype: 'file' }
                                );
                              },
                              text: intl.formatMessage({
                                defaultMessage: 'Add Document Link',
                              }),
                              type: 'menuitem',
                            },
                            //                           This works but won't on native
                            //                 {
                            //                   onAction() {
                            //                     filePickerCallback(
                            //                       (file, { title }) => {
                            //                         editor.insertContent(
                            //                           `
                            //   <iframe allowtransparency="true"
                            //           src="${file}#toolbar=0&navpanes=0&scrollbar=0&view=FitH"
                            //           style="background: transparent; border: none; display: block; width: 100%; height: 700px;"
                            //           loading="lazy"
                            //           onload="this.height=this.contentWindow.document.body.scrollHeight;"
                            //           title="${title}">
                            //   </iframe>
                            // `
                            //                         );
                            //                       },
                            //                       'document',
                            //                       { filetype: 'application/pdf' },
                            //                       true
                            //                     );
                            //                   },
                            //                   text: intl.formatMessage({
                            //                     defaultMessage: 'Add Document Link',
                            //                   }),
                            //                   type: 'menuitem',
                            //                 },

                            {
                              onAction() {
                                pdfFilePickerCallback((htmlContent) => {
                                  editor.insertContent(htmlContent);
                                });
                              },
                              text: 'Embed Pdf',
                              type: 'menuitem',
                            },
                          ];

                          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                          // @ts-ignore ts error from tinymce, nested menus !== string
                          callback(items);
                        },
                        text: 'Insert',
                      });
                    },
                    skin: theme ? 'oxide-dark' : undefined,
                    toolbar:
                      ' insertMenuButton | undo redo | bold italic underline strikethrough | fontfamily fontsize blocks forecolor removeformat | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist |  pagebreak | charmap emoticons | preview print | image media link | ltr rtl',
                    toolbar_sticky: false,
                    toolbar_sticky_offset: 28,
                  }}
                  initialValue={initData}
                  onInit={(evt, editor) => {
                    // eslint-disable-next-line no-param-reassign
                    editorRef.current = editor;
                  }}
                  tinymceScriptSrc="/tinymce/tinymce.min.js"
                />
              )}
            </div>

            {incidents && incidents.length > 0 && (
              <>
                <Typography.Title
                  level={4}
                  style={{ marginLeft: 20, marginTop: 20 }}
                >
                  {intl.formatMessage({
                    defaultMessage: 'Incidents:',
                  })}
                </Typography.Title>
                <Row>
                  <List
                    dataSource={incidents}
                    itemLayout="horizontal"
                    renderItem={(item) => (
                      <List.Item
                        actions={[
                          <Button
                            danger
                            onClick={() => removeIncident(item.incident.id)}
                            type="ghost"
                          >
                            {intl.formatMessage({
                              defaultMessage: 'remove',
                            })}
                          </Button>,
                        ]}
                      >
                        <List.Item.Meta
                          description={item.incident.description}
                          title={intl.formatMessage(
                            {
                              defaultMessage: 'Incident: {reference}',
                            },
                            {
                              reference: item.incident.reference,
                            }
                          )}
                        />
                      </List.Item>
                    )}
                    split
                    style={{ marginLeft: 20, width: '30%' }}
                  />
                </Row>
              </>
            )}
            {offenders && offenders.length > 0 && (
              <>
                <Typography.Title
                  level={4}
                  style={{ marginLeft: 20, marginTop: 20 }}
                >
                  {intl.formatMessage({
                    defaultMessage: 'Offenders:',
                  })}
                </Typography.Title>
                <Row>
                  <List
                    dataSource={offenders}
                    itemLayout="horizontal"
                    renderItem={(item) => (
                      <List.Item
                        actions={[
                          <Button
                            danger
                            onClick={() => removeOffender(item.id)}
                            type="ghost"
                          >
                            {intl.formatMessage({
                              defaultMessage: 'remove:',
                            })}
                          </Button>,
                        ]}
                      >
                        <List.Item.Meta
                          avatar={
                            <Avatar
                              src={
                                (item.images && item.images[0]?.optimised) || ''
                              }
                            />
                          }
                          title={item.name}
                        />
                      </List.Item>
                    )}
                    style={{ marginLeft: 20, width: '30%' }}
                  />
                </Row>
              </>
            )}
            <Row style={{ marginLeft: 20, marginTop: 20 }}>
              <Upload
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...documentUploadProps}
                fileList={fileList}
                listType="picture"
                style={{ display: 'flex' }}
              >
                <Button icon={<UploadOutlined />}>
                  {intl.formatMessage({
                    defaultMessage: 'Upload Document',
                  })}
                </Button>
              </Upload>
            </Row>
            <Form.Item>
              <Row gutter={10} justify="end" style={{ marginTop: 30 }}>
                <Col>
                  <Button onClick={() => window.history.back()}>
                    {intl.formatMessage({
                      defaultMessage: 'Cancel',
                    })}
                  </Button>
                </Col>
                <Col>
                  <Button
                    disabled={loading}
                    loading={loading}
                    onClick={() => saveDraft(true)}
                    type="primary"
                  >
                    {intl.formatMessage({
                      defaultMessage: 'Save Draft',
                    })}
                  </Button>
                </Col>
                <Col>
                  <Button
                    disabled={loading}
                    htmlType="submit"
                    loading={loading}
                    type="primary"
                  >
                    {id
                      ? intl.formatMessage({
                          defaultMessage: 'Publish',
                        })
                      : intl.formatMessage({
                          defaultMessage: 'Create Bulletin',
                        })}
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </Card>
      </div>
      <Drawer
        onClose={() => drawer.close()}
        open={drawer.visible}
        title={drawer.defaultTitle}
        width={1000}
      >
        {forms[drawer.id]}
      </Drawer>
    </>
  );
};

export default CreateEditArticleView;
