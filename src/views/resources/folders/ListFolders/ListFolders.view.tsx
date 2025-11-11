import type { FileType } from '#/graphql/types';

import MediaViewer from '#/components/documents/MediaViewer/MediaViewer';
import OfficeViewer from '#/components/documents/OfficeViewer/OfficeViewer';
import AddFolder from '#/components/form-components/Folders/AddFolder';
import AddDocuments from '#/components/form-components/documents/AddDocuments';
import Loading from '#/components/shared-components/AntD/Loading';
import { getPreviewStrategy } from '#/utils/preview-document';
import { faPlus } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Drawer, Empty, Input, Row } from 'antd';
// import AddDocument from 'components/form-components/documents/AddDocument';
import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router';

import type { Props } from './types/folders';

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

const ListFolders = ({
  addDocument,
  addFolder,
  addRights,
  data,
  deleteRights,
  documentsData,
  fetchMoreDocScroll,
  fetchMoreScroll,
  loading,
  onDelete,
  onDeleteFolder,
  saving,
  search,
  setSearch,
  toggleAddDocument,
  toggleAddFolder,
  updateDocumentList,
  updateFolderList,
}: Props) => {
  const intl = useIntl();
  const navigate = useNavigate();
  console.log('deleteRights', deleteRights);

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
        <Col span={10}>
          <Input
            onChange={(e) => setSearch(e.target.value)}
            // style={{ width: 350 }}
            placeholder={intl.formatMessage({
              defaultMessage: 'Search...',
            })}
            size="small"
            value={search}
          />
        </Col>
        <Col flex={1} />
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
                onClick={() => navigate('/app/mg11/create/')}
                // type="primary"
              >
                {intl.formatMessage({
                  defaultMessage: 'Create MG11',
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
              docs: documentsData?.documentsNoFolder.totalCount || 0,
              folders: data?.folders.totalCount || 0,
              total:
                (data?.folders.totalCount || 0) +
                (documentsData?.documentsNoFolder.totalCount || 0),
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
          {(data?.folders.totalCount || 0) > 0 ||
          (documentsData?.documentsNoFolder.totalCount || 0) > 0 ? (
            <InfiniteScroll
              dataLength={
                (data?.folders.edges.length || 0) +
                (documentsData?.documentsNoFolder.edges.length || 0)
              }
              hasMore={
                !!(
                  data?.folders.pageInfo.hasNextPage ||
                  documentsData?.documentsNoFolder.pageInfo.hasNextPage
                )
              }
              loader={<Loading />}
              next={() => {
                if (data?.folders.pageInfo.hasNextPage) {
                  void fetchMoreScroll();
                }
                if (
                  documentsData?.documentsNoFolder.pageInfo.hasNextPage &&
                  !data?.folders.pageInfo.hasNextPage
                ) {
                  void fetchMoreDocScroll();
                }
              }}
              style={{ overflowX: 'hidden' }}
            >
              <Row
                align="stretch"
                gutter={[16, 16]}
                style={{
                  alignItems: 'stretch',
                  overflowX: 'hidden',
                  padding: 10,
                }}
              >
                {/* Render all folders first */}
                {data?.folders.edges.map(({ node }) => (
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

                {/* Then render all documents */}
                {documentsData?.documentsNoFolder.edges.map(({ node }) => (
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
            </InfiniteScroll>
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
          <AddFolder onClose={toggleAddFolder} update={updateFolderList} />
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

export default ListFolders;
