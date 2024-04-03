import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import {
  Avatar,
  Button,
  Card,
  Checkbox,
  Col,
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
import { ArticlePriority } from 'graphql/generated';
import { UploadOutlined } from '@ant-design/icons';
import { useIntl } from 'react-intl';
import type { ViewProps } from './types/CreateArticle';
import AddExistingOffender from '../../../components/form-components/offender/offender/AddExistingOffender/AddExistingOffender.container';
import LinkIncident from '../../../components/form-components/linkOptions/LinkIncident';
import type { FormData } from './hooks/useCreateEditArticle';
import { useStoreState } from '../../../state';
import Loading from '../../../components/shared-components/AntD/Loading';

const CreateEditArticleView = ({
  // log,
  editorRef,
  exampleImageUploadHandler,
  // preview,
  // previewText,
  // setPreviewImage,
  // setPreviewText,
  // previewImage,
  // imgSrcs,
  groups,
  onGroupsChange,
  categories,
  categoriesChange,
  filePickerCallback,
  form,
  onSubmit,
  data,
  loading,
  selectedCategories,
  documentUploadProps,
  fileList,
  drawer,
  insertOffender,
  insertIncident,
  incidents,
  offenders,
  removeOffender,
  removeIncident,
  selectedSchemes,
  id,
  initData,
}: ViewProps) => {
  const intl = useIntl();
  const noSchemes = selectedSchemes;
  const forms = {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    null: <></>,
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
            id: '1rIGfA',
          })}
        </div>
      ),
    addOffender:
      !noSchemes || (noSchemes && noSchemes?.length <= 1) ? (
        <AddExistingOffender
          update={insertOffender}
          offenderIds={
            offenders ? offenders.map((offender) => offender.id) : []
          }
          onClose={() => drawer.close()}
        />
      ) : (
        <div>
          {intl.formatMessage({
            defaultMessage:
              'At the moment adding an incident to a multi-scheme article is not supported.',
            id: '1rIGfA',
          })}
        </div>
      ),
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
                  defaultMessage: 'Edit Article',
                  id: 'oZPIFV',
                })
              : intl.formatMessage({
                  defaultMessage: 'Create Article',
                  id: 'lpKDhF',
                })
          }
        />
        {loading && (
          <Card
            style={{
              height: '100%',
              width: '98%',
              position: 'absolute',
              zIndex: 1000,
            }}
            bodyStyle={{
              margin: 0,
              padding: 0,
              display: 'flex',
              justifyContent: 'center',
              height: '100vh',
              alignItems: 'center',
            }}
          >
            <Loading />
          </Card>
        )}
        <Card style={{ marginLeft: 20, marginRight: 20, minHeight: 600 }}>
          <Form<FormData>
            form={form}
            layout="vertical"
            initialValues={
              data || {
                title: '',
                content: '',
                groups: [],
                categories: [],
                importance: 'Normal',
                schemes: [],
                watermarkImage: true,
              }
            }
            onFinish={onSubmit}
          >
            <Row gutter={16} style={{ marginLeft: 10, marginRight: 10 }}>
              <Col span={8}>
                <Form.Item
                  name="title"
                  label={intl.formatMessage({
                    defaultMessage: 'Title',
                    id: '9a9+ww',
                  })}
                  rules={[
                    {
                      required: true,
                      message: intl.formatMessage({
                        defaultMessage: 'Please input title!',
                        id: 'ZU9Wjz',
                      }),
                    },
                  ]}
                >
                  <Input
                    placeholder={intl.formatMessage({
                      defaultMessage: 'Title',
                      id: '9a9+ww',
                    })}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16} style={{ marginLeft: 10, marginRight: 10 }}>
              <Col span={8}>
                <Form.Item
                  name="groups"
                  label={intl.formatMessage({
                    defaultMessage: 'Content Groups',
                    id: '3lRewT',
                  })}
                  rules={[
                    {
                      required: true,
                      message: intl.formatMessage({
                        defaultMessage: 'Please select groups!',
                        id: 'dPaSVi',
                      }),
                    },
                  ]}
                >
                  <Select
                    placeholder={intl.formatMessage({
                      defaultMessage: 'Content Groups',
                      id: '3lRewT',
                    })}
                    mode="multiple"
                    size="small"
                    maxTagCount={2}
                    style={{ minWidth: 200 }}
                    loading={loading}
                    onChange={onGroupsChange}
                    optionFilterProp="label"
                  >
                    {groups.map((group) => (
                      <Select.Option value={group.value} label={group.label}>
                        {group.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name="importance"
                  label={intl.formatMessage({
                    defaultMessage: 'Importance',
                    id: 'DBZGY7',
                  })}
                  rules={[
                    {
                      required: true,
                      message: intl.formatMessage({
                        defaultMessage: 'Please select importance!',
                        id: 'ZUR1Zs',
                      }),
                    },
                  ]}
                >
                  <Select
                    loading={loading}
                    placeholder={intl.formatMessage({
                      defaultMessage: 'Type',
                      id: '+U6ozc',
                    })}
                    style={{ minWidth: 200 }}
                  >
                    {Object.keys(ArticlePriority).map((priority) => (
                      <Select.Option value={priority}>{priority}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="category"
                  label={intl.formatMessage({
                    defaultMessage: 'Category',
                    id: 'ccXLVi',
                  })}
                >
                  <Select
                    // select mutliple, category, can create new
                    placeholder={intl.formatMessage({
                      defaultMessage: 'Category',
                      id: 'ccXLVi',
                    })}
                    mode="tags"
                    size="small"
                    maxTagCount={2}
                    style={{ minWidth: 200 }}
                    loading={loading}
                    onChange={categoriesChange}
                    options={categories}
                    optionFilterProp="value"
                    labelInValue
                    value={selectedCategories}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="watermarkImage"
                  valuePropName="checked"
                  label={intl.formatMessage({
                    defaultMessage: 'Watermark Preview',
                    id: 'DmBmJf',
                  })}
                >
                  <Checkbox />
                </Form.Item>
              </Col>
            </Row>
            <div style={{ margin: 25 }}>
              <Editor
                onInit={(evt, editor) => {
                  // eslint-disable-next-line no-param-reassign
                  editorRef.current = editor;
                }}
                tinymceScriptSrc="/tinymce/tinymce.min.js"
                initialValue={initData}
                init={{
                  skin: theme ? 'oxide-dark' : undefined,
                  content_css: theme ? 'dark' : undefined,
                  setup: (editor) => {
                    editor.ui.registry.addMenuButton('insertMenuButton', {
                      text: 'Insert',
                      fetch(callback) {
                        const items = [
                          {
                            type: 'menuitem',
                            text: intl.formatMessage({
                              defaultMessage: 'Add Incident',
                              id: 'kG1p3q',
                            }),
                            onAction() {
                              drawer.open({
                                defaultTitle: intl.formatMessage({
                                  defaultMessage: 'Add Incident',
                                  id: 'kG1p3q',
                                }),
                                id: 'addIncident',
                              });
                            },
                          },
                          {
                            type: 'menuitem',
                            text: intl.formatMessage({
                              defaultMessage: 'Add Offender',
                              id: 'm3ChN4',
                            }),
                            onAction() {
                              drawer.open({
                                defaultTitle: intl.formatMessage({
                                  defaultMessage: 'Add Offender',
                                  id: 'm3ChN4',
                                }),
                                id: 'addOffender',
                              });
                            },
                          },
                          {
                            type: 'menuitem',
                            text: intl.formatMessage({
                              defaultMessage: 'Add Document Link',
                              id: 'F8UHCF',
                            }),
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
                          },
                        ];

                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore ts error from tinymce, nested menus !== string
                        callback(items);
                      },
                    });
                  },
                  branding: false,
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
                    'template',
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
                  elementpath: false,
                  contextmenu: false,
                  menubar: 'file edit view insert format tools table',
                  toolbar:
                    ' insertMenuButton | undo redo | bold italic underline strikethrough | fontfamily fontsize blocks forecolor removeformat | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist |  pagebreak | charmap emoticons | preview print | image media link | ltr rtl',
                  toolbar_sticky: false,
                  toolbar_sticky_offset: 28,
                  images_upload_handler: exampleImageUploadHandler,
                  file_picker_types: 'file, image, media',
                  file_picker_callback: filePickerCallback,
                  promotion: false,
                  default_link_target: '_blank',
                  content_style:
                    'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                }}
              />
            </div>

            {incidents && incidents.length > 0 && (
              <>
                <Typography.Title
                  style={{ marginLeft: 20, marginTop: 20 }}
                  level={4}
                >
                  {intl.formatMessage({
                    defaultMessage: 'Incidents:',
                    id: '+nRUf9',
                  })}
                </Typography.Title>
                <Row>
                  <List
                    itemLayout="horizontal"
                    dataSource={incidents}
                    style={{ width: '30%', marginLeft: 20 }}
                    split
                    renderItem={(item) => (
                      <List.Item
                        actions={[
                          <Button
                            onClick={() => removeIncident(item.incident.id)}
                            type="ghost"
                            danger
                          >
                            {intl.formatMessage({
                              defaultMessage: 'remove',
                              id: '1LmW+v',
                            })}
                          </Button>,
                        ]}
                      >
                        <List.Item.Meta
                          title={intl.formatMessage(
                            {
                              defaultMessage: 'Incident: {reference}',
                              id: 'vNNXAE',
                            },
                            {
                              reference: item.incident.reference,
                            }
                          )}
                          description={item.incident.description}
                        />
                      </List.Item>
                    )}
                  />
                </Row>
              </>
            )}
            {offenders && offenders.length > 0 && (
              <>
                <Typography.Title
                  style={{ marginLeft: 20, marginTop: 20 }}
                  level={4}
                >
                  {intl.formatMessage({
                    defaultMessage: 'Offenders:',
                    id: 'HEnuMU',
                  })}
                </Typography.Title>
                <Row>
                  <List
                    itemLayout="horizontal"
                    dataSource={offenders}
                    style={{ width: '30%', marginLeft: 20 }}
                    renderItem={(item) => (
                      <List.Item
                        actions={[
                          <Button
                            type="ghost"
                            danger
                            onClick={() => removeOffender(item.id)}
                          >
                            {intl.formatMessage({
                              defaultMessage: 'remove:',
                              id: 'ppHb/S',
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
                  />
                </Row>
              </>
            )}
            <Row style={{ marginLeft: 20, marginTop: 20 }}>
              <Upload
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...documentUploadProps}
                listType="picture"
                style={{ display: 'flex' }}
                fileList={fileList}
              >
                <Button icon={<UploadOutlined />}>
                  {intl.formatMessage({
                    defaultMessage: 'Upload Document',
                    id: 'Kc9MAV',
                  })}
                </Button>
              </Upload>
            </Row>
            <Form.Item>
              <Row style={{ marginTop: 30 }} gutter={10} justify="end">
                <Col>
                  <Button onClick={() => window.history.back()}>
                    {intl.formatMessage({
                      defaultMessage: 'Cancel',
                      id: '47FYwb',
                    })}
                  </Button>
                </Col>
                <Col>
                  <Button
                    type="primary"
                    loading={loading}
                    disabled={loading}
                    htmlType="submit"
                  >
                    {id
                      ? intl.formatMessage({
                          defaultMessage: 'Save',
                          id: 'jvo0vs',
                        })
                      : intl.formatMessage({
                          defaultMessage: 'Create Article',
                          id: 'lpKDhF',
                        })}
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </Card>
      </div>
      <Drawer
        title={drawer.defaultTitle}
        width={1000}
        open={drawer.visible}
        onClose={() => drawer.close()}
      >
        {forms[drawer.id]}
      </Drawer>
    </>
  );
};

export default CreateEditArticleView;
