import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import {
  Avatar,
  Button,
  Card,
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
import type { ViewProps } from './types/EditArticle';
import AddExistingOffender from '../../../components/form-components/offender/offender/AddExistingOffender/AddExistingOffender.container';
import LinkIncident from '../../../components/form-components/linkOptions/LinkIncident';
import type { FormData } from './hooks/useEditArticle';
import { useStoreState } from '../../../state';

const EditArticleView = ({
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
  groupsLoading,
  onGroupsChange,
  categories,
  categoriesLoading,
  categoriesChange,
  filePickerCallback,
  form,
  onSubmit,
  data,
  // loading,
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
  loading,
}: ViewProps) => {
  const forms = {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    null: <></>,
    addIncident: (
      <LinkIncident
        getIncident={insertIncident}
        incidentIds={
          incidents ? incidents.map((incident) => incident.incident.id) : []
        }
        onClose={drawer.close}
      />
    ),
    addOffender: (
      <AddExistingOffender
        update={insertOffender}
        offenderIds={offenders ? offenders.map((offender) => offender.id) : []}
        onClose={drawer.close}
      />
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
        <PageHeader title="Create Article" />
        <Card style={{ marginLeft: 20, marginRight: 20, minHeight: 600 }}>
          <Form<FormData>
            form={form}
            initialValues={
              data || {
                title: '',
                content: '',
                groups: [],
                categories: [],
                importance: 'Normal',
              }
            }
            onFinish={onSubmit}
          >
            <Row gutter={16} style={{ marginLeft: 10, marginRight: 10 }}>
              <Col span={8}>
                <Form.Item
                  name="title"
                  label="Title"
                  rules={[{ required: true, message: 'Please input title!' }]}
                >
                  <Input placeholder="Title" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16} style={{ marginLeft: 10, marginRight: 10 }}>
              <Col span={8}>
                <Form.Item
                  name="groups"
                  label="Groups"
                  rules={[{ required: true, message: 'Please select groups!' }]}
                >
                  <Select
                    placeholder="Groups"
                    mode="multiple"
                    size="small"
                    maxTagCount={2}
                    style={{ minWidth: 200 }}
                    loading={groupsLoading}
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
              <Col span={8}>
                <Form.Item
                  name="importance"
                  label="Importance"
                  rules={[
                    { required: true, message: 'Please select importance!' },
                  ]}
                >
                  <Select placeholder="Type" style={{ minWidth: 200 }}>
                    {Object.keys(ArticlePriority).map((priority) => (
                      <Select.Option value={priority}>{priority}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="category" label="Category">
                  <Select
                    // select mutliple, category, can create new
                    placeholder="Category"
                    mode="tags"
                    size="small"
                    maxTagCount={2}
                    style={{ minWidth: 200 }}
                    loading={categoriesLoading}
                    onChange={categoriesChange}
                    options={categories}
                    optionFilterProp="value"
                    labelInValue
                    value={selectedCategories}
                  />
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
                initialValue={
                  data?.content || '<p>Create a new document here...</p>'
                }
                init={{
                  skin: theme ? 'oxide-dark' : '',
                  content_css: theme ? 'dark' : '',
                  setup: (editor) => {
                    editor.ui.registry.addMenuButton('insertMenuButton', {
                      text: 'Insert',
                      fetch(callback) {
                        const items = [
                          {
                            type: 'menuitem',
                            text: 'Add Incident',
                            onAction() {
                              drawer.open({
                                defaultTitle: 'Add Incident',
                                id: 'addIncident',
                              });
                            },
                          },
                          {
                            type: 'menuitem',
                            text: 'Add Offender',
                            onAction() {
                              drawer.open({
                                defaultTitle: 'Add Offender',
                                id: 'addOffender',
                              });
                            },
                          },
                          {
                            type: 'menuitem',
                            text: 'Add Document link',
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
                  Incidents:
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
                            remove
                          </Button>,
                        ]}
                      >
                        <List.Item.Meta
                          title={`Incident: ${item.incident.reference}`}
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
                  Offenders:
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
                            remove
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
                <Button icon={<UploadOutlined />}>Upload Documents</Button>
              </Upload>
            </Row>
            <Form.Item>
              <Row style={{ marginTop: 30 }} gutter={10} justify="end">
                <Col>
                  <Button
                    loading={loading}
                    onClick={() => window.history.back()}
                  >
                    Cancel
                  </Button>
                </Col>
                <Col>
                  <Button
                    loading={loading}
                    disabled={loading}
                    type="primary"
                    htmlType="submit"
                  >
                    Save Bulletin
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
        visible={drawer.visible}
        onClose={drawer.close}
      >
        {forms[drawer.id]}
      </Drawer>
    </>
  );
};

export default EditArticleView;
