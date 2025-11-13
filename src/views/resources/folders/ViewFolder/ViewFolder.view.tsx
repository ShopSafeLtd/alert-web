import type { FileType } from '#/graphql/types';

import MediaViewer from '#/components/documents/MediaViewer/MediaViewer';
import OfficeViewer from '#/components/documents/OfficeViewer/OfficeViewer';
import AddFolder from '#/components/form-components/Folders/AddFolder';
import AddDocuments from '#/components/form-components/documents/AddDocuments';
import { getPreviewStrategy } from '#/utils/preview-document';
import { faPen, faPlus, faTrash } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Drawer, Empty, Input, PageHeader, Row } from 'antd';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router';

import type { Props } from './types/ViewFolder';

import DocumentCard from '../DocumentCard';
import FolderCard from '../FolderCard';
import SkeletonCard from '../SkeletonCard';

interface DocumentData {
  createdAt: Date;
  fileType?: FileType | null;
  id: string;
  name: string;
  tags: Array<{ id: string; name: string }>;
  url: string;
}

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
  onDeleteFolder,
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

  // Preview state
  const [previewDocument, setPreviewDocument] = useState<
    DocumentData | undefined
  >(undefined);
  const [showOfficeViewer, setShowOfficeViewer] = useState(false);
  const [showMediaViewer, setShowMediaViewer] = useState(false);

  const handlePreview = (doc: DocumentData) => {
    const strategy = getPreviewStrategy(doc.name, doc.url, doc.fileType);

    if (strategy.method === 'office') {
      setPreviewDocument(doc);
      setShowOfficeViewer(true);
    } else if (strategy.method === 'media') {
      setPreviewDocument(doc);
      setShowMediaViewer(true);
    }
    // lightbox and newTab are handled directly in DocumentCard
  };

  const closeOfficeViewer = () => {
    setShowOfficeViewer(false);
    setPreviewDocument(undefined);
  };

  const closeMediaViewer = () => {
    setShowMediaViewer(false);
    setPreviewDocument(undefined);
  };

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
              defaultMessage: 'Search...',
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
                // type="primary"
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
                // type="primary"
              >
                {intl.formatMessage({
                  defaultMessage: 'Add Document',
                })}
              </Button>
            </Col>
          </>
        )}
        {deleteRights && (
          <Col>
            <Button
              disabled={
                saving ||
                loading ||
                (data?.folder && data?.folder.totalChildFolders > 0) ||
                (data?.folder && data?.folder.totalDocuments > 0)
              }
              icon={
                <FontAwesomeIcon
                  icon={faTrash}
                  size="lg"
                  style={{ marginRight: 5 }}
                />
              }
              onClick={() => onDeleteFolder(data?.folder.id || '')}
              type="primary"
            >
              {intl.formatMessage({
                defaultMessage: 'Delete Folder',
              })}
            </Button>
          </Col>
        )}
      </Row>
      {/* Combined count header */}
      {!loading && (
        <div
          style={{
            fontSize: 16,
            fontWeight: 600,
            padding: '16px 10px',
          }}
        >
          {intl.formatMessage(
            {
              defaultMessage:
                'Items: {total} ({folders} folders, {docs} documents)',
            },
            {
              docs: data?.folder.totalDocuments || 0,
              folders: data?.folder.totalChildFolders || 0,
              total:
                (data?.folder.totalChildFolders || 0) +
                (data?.folder.totalDocuments || 0),
            }
          )}
        </div>
      )}

      {loading ? (
        <Row
          align="stretch"
          gutter={[16, 16]}
          style={{ alignItems: 'stretch', padding: 10 }}
        >
          {Array.from({ length: 24 }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Col key={index} lg={6} md={12} sm={24}>
              <SkeletonCard />
            </Col>
          ))}
        </Row>
      ) : (
        <>
          {(data?.folder.totalChildFolders || 0) > 0 ||
          (data?.folder.totalDocuments || 0) > 0 ? (
            <Row
              align="stretch"
              gutter={[16, 16]}
              style={{
                alignItems: 'stretch',
                overflowX: 'hidden',
                padding: 10,
              }}
            >
              {/* Render folders first */}
              {data?.folder.childFolders.map((node) => (
                <Col key={`folder-${node?.id}`} lg={6} md={12} sm={24}>
                  <FolderCard
                    data={node}
                    onDelete={onDeleteFolder}
                    showDeleteBtn={
                      deleteRights &&
                      node.totalChildFolders === 0 &&
                      node.totalDocuments === 0
                    }
                  />
                </Col>
              ))}

              {/* Then render documents */}
              {data?.folder.documents.map((node) => (
                <Col key={`doc-${node?.id}`} lg={6} md={12} sm={24}>
                  <DocumentCard
                    data={node}
                    onDelete={
                      deleteRights ? () => onDelete(node.id) : undefined
                    }
                    onPreview={handlePreview}
                  />
                </Col>
              ))}
            </Row>
          ) : (
            <div
              style={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
                padding: '60px 10px',
                width: '100%',
              }}
            >
              <Empty
                description={
                  search === ''
                    ? intl.formatMessage({
                        defaultMessage: 'No items',
                      })
                    : intl.formatMessage({
                        defaultMessage: 'No items match your search criteria',
                      })
                }
              />
            </div>
          )}
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

      {/* Preview Modals */}
      {previewDocument && showOfficeViewer && (
        <OfficeViewer
          data={previewDocument}
          onClose={closeOfficeViewer}
          visible={showOfficeViewer}
        />
      )}

      {previewDocument && showMediaViewer && (
        <MediaViewer
          data={previewDocument}
          onClose={closeMediaViewer}
          visible={showMediaViewer}
        />
      )}
    </div>
  );
};

export default ViewFolder;
