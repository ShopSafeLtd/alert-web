import AddFolder from '#/components/form-components/Folders/AddFolder';
import AddDocuments from '#/components/form-components/documents/AddDocuments';
import { faPen, faPlus } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Col,
  Collapse,
  Divider,
  Drawer,
  Empty,
  Input,
  PageHeader,
  Row,
} from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router';

import type { Props } from './types/ViewFolder';

import DocumentCard from '../DocumentCard';
import FolderCard from '../FolderCard';
import SkeletonCard from '../SkeletonCard';

const ViewFolder = ({
  addDocument,
  addFolder,
  addRights,
  data,
  deleteRights,
  editFolder,
  editRights,
  loading,
  onDelete,
  saving,
  search,
  setSearch,
  toggleAddDocument,
  toggleAddFolder,
  toggleEditFolder,
  updateDocumentList,
  updateFolderList,
}: Props) => {
  const intl = useIntl();
  const navigate = useNavigate();

  return (
    <div className="list-view">
      <Row align="middle" gutter={16} style={{ marginBottom: 20 }}>
        <Col>
          <PageHeader
            onBack={() => navigate('/app/resources/folders')}
            title={
              loading
                ? intl.formatMessage({
                    defaultMessage: 'Loading',
                  })
                : data?.folder.name
            }
          />
        </Col>
        <Col flex={1}>
          <Input
            onChange={(e) => setSearch(e.target.value)}
            placeholder={intl.formatMessage({
              defaultMessage: 'Search Document...',
            })}
            size="small"
            // style={{ width: 400 }}
            value={search}
          />
        </Col>
        <Col />
        {editRights && (
          <Col>
            <Button
              disabled={saving || loading}
              icon={
                <FontAwesomeIcon
                  icon={faPen}
                  size="lg"
                  style={{ marginRight: 5 }}
                />
              }
              onClick={toggleEditFolder}
              // type="primary"
            >
              {intl.formatMessage({
                defaultMessage: 'Edit Folder',
              })}
            </Button>
          </Col>
        )}
        {addRights && (
          <>
            <Col>
              <Button
                disabled={saving || loading}
                icon={
                  <FontAwesomeIcon
                    icon={faPlus}
                    size="lg"
                    style={{ marginRight: 5 }}
                  />
                }
                onClick={() => toggleAddFolder()}
                type="primary"
              >
                {intl.formatMessage({
                  defaultMessage: 'Add Folder',
                })}
              </Button>
            </Col>
            <Col>
              <Button
                disabled={saving || loading}
                icon={
                  <FontAwesomeIcon
                    icon={faPlus}
                    size="lg"
                    style={{ marginRight: 5 }}
                  />
                }
                onClick={() => toggleAddDocument()}
                type="primary"
              >
                {intl.formatMessage({
                  defaultMessage: 'Add Document',
                })}
              </Button>
            </Col>
          </>
        )}
      </Row>
      {loading ? (
        <Row
          align="stretch"
          gutter={[10, 10]}
          style={{ alignItems: 'stretch', padding: 10 }}
        >
          {Array.from({ length: 24 }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Col key={index} lg={8} md={12} sm={24} xl={8} xxl={6}>
              <SkeletonCard />
            </Col>
          ))}
        </Row>
      ) : (
        <>
          {/* <PageHeader
            onBack={() => navigate('/app/resources/folders')}
            style={{
              marginBottom: -30,
              marginLeft: 10,
            }}
            title={data?.folder.name}
          />
          <Divider /> */}

          <Collapse
            bordered={false}
            collapsible="header"
            defaultActiveKey={['1', '2']}
            style={{
              backgroundColor: 'transparent',
            }}
          >
            <Collapse.Panel
              header={intl.formatMessage(
                {
                  defaultMessage: 'Folders: {value}',
                },
                {
                  value: data?.folder.totalChildFolders || 0,
                }
              )}
              key="1"
              style={{
                backgroundColor: 'transparent',
              }}
            >
              {data?.folder.totalChildFolders ? (
                <Row
                  align="stretch"
                  gutter={[16, 16]}
                  style={{
                    alignItems: 'stretch',
                    overflowX: 'hidden',
                    padding: 10,
                  }}
                >
                  {data?.folder.childFolders.map((node) => (
                    <Col key={node?.id} lg={6} md={12} sm={24}>
                      <FolderCard data={node} />
                    </Col>
                  ))}
                </Row>
              ) : (
                <Row
                  align="stretch"
                  gutter={[16, 16]}
                  style={{ alignItems: 'stretch', padding: 10 }}
                >
                  <div
                    style={{
                      alignItems: 'center',
                      display: 'flex',
                      justifyContent: 'center',
                      width: '100%',
                    }}
                  >
                    <Empty
                      description={
                        search === ''
                          ? intl.formatMessage({
                              defaultMessage: 'No Folders',
                            })
                          : intl.formatMessage({
                              defaultMessage:
                                'No folders match your search criteria',
                            })
                      }
                    />
                  </div>
                </Row>
              )}
            </Collapse.Panel>

            <Divider />

            <Collapse.Panel
              header={intl.formatMessage(
                {
                  defaultMessage: 'Documents: {value}',
                },
                { value: data?.folder.totalDocuments || 0 }
              )}
              key="2"
              style={{
                backgroundColor: 'transparent',
              }}
            >
              {data?.folder.totalDocuments ? (
                <Row
                  align="stretch"
                  gutter={[8, 16]}
                  style={{
                    alignItems: 'stretch',
                    overflowX: 'hidden',
                    padding: 10,
                  }}
                >
                  {data?.folder.documents.map((node) => (
                    <Col key={node?.id} lg={6} md={12} sm={24}>
                      <DocumentCard
                        data={node}
                        onDelete={
                          deleteRights ? () => onDelete(node.id) : undefined
                        }
                      />
                    </Col>
                  ))}
                </Row>
              ) : (
                <Row
                  align="stretch"
                  gutter={[8, 8]}
                  style={{ alignItems: 'stretch', padding: 10 }}
                >
                  <div
                    style={{
                      alignItems: 'center',
                      display: 'flex',
                      justifyContent: 'center',
                      width: '100%',
                    }}
                  >
                    <Empty
                      description={
                        search === ''
                          ? intl.formatMessage({
                              defaultMessage: 'No Documents',
                            })
                          : intl.formatMessage({
                              defaultMessage:
                                'No documents match your search criteria',
                            })
                      }
                    />
                  </div>
                </Row>
              )}
            </Collapse.Panel>
          </Collapse>
        </>
      )}

      <Drawer
        onClose={toggleAddDocument}
        open={addDocument}
        title={intl.formatMessage({
          defaultMessage: 'Add Evidence',
        })}
        width="600"
        zIndex={1000}
      >
        {addDocument ? (
          <AddDocuments
            folderId={data?.folder.id}
            onClose={toggleAddDocument}
            update={updateDocumentList}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={toggleAddFolder}
        open={addFolder}
        title={intl.formatMessage({
          defaultMessage: 'Add Folder',
        })}
        width="600"
        zIndex={1000}
      >
        {addFolder ? (
          <AddFolder
            onClose={toggleAddFolder}
            parentFolderId={data?.folder.id}
            update={updateFolderList}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={toggleEditFolder}
        open={!!editFolder}
        title={intl.formatMessage({
          defaultMessage: 'Edit Folder Details',
        })}
        width="600"
        zIndex={1000}
      >
        {editFolder ? (
          <AddFolder
            // parentFolderId={data?.folder.id}
            folderId={data?.folder.id}
            onClose={toggleEditFolder}
          />
        ) : (
          <div />
        )}
      </Drawer>
    </div>
  );
};

export default ViewFolder;
