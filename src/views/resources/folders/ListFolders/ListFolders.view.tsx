import AddFolder from '#/components/form-components/Folders/AddFolder';
import AddDocuments from '#/components/form-components/documents/AddDocuments';
import Loading from '#/components/shared-components/AntD/Loading';
import { faPlus } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Col,
  Collapse,
  Divider,
  Drawer,
  Empty,
  Input,
  Row,
} from 'antd';
// import AddDocument from 'components/form-components/documents/AddDocument';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router';

import type { Props } from './types/folders';

import DocumentCard from '../DocumentCard';
import FolderCard from '../FolderCard';
import SkeletonCard from '../SkeletonCard';

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
              { value: data?.folders.totalCount }
            )}
            key="1"
            style={{
              backgroundColor: 'transparent',
            }}
          >
            {data?.folders.totalCount ? (
              <InfiniteScroll
                dataLength={data?.folders.edges.length}
                hasMore={data?.folders.pageInfo.hasNextPage}
                loader={<Loading />}
                next={() => fetchMoreScroll()}
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
                  {data?.folders.edges.map(({ node }) => (
                    <Col key={node?.id} lg={6} md={12} sm={24}>
                      <FolderCard data={node} />
                    </Col>
                  ))}
                </Row>
              </InfiniteScroll>
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
              { value: documentsData?.documentsNoFolder.totalCount }
            )}
            key="2"
            style={{
              backgroundColor: 'transparent',
            }}
          >
            {documentsData?.documentsNoFolder.totalCount ? (
              <InfiniteScroll
                dataLength={documentsData?.documentsNoFolder.edges.length}
                endMessage={
                  <p style={{ textAlign: 'center' }}>
                    {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                    <b>-----------</b>
                  </p>
                }
                hasMore={documentsData?.documentsNoFolder.pageInfo.hasNextPage}
                height="calc(50vh )"
                loader={<Loading />}
                next={() => fetchMoreDocScroll()}
                style={{ overflowX: 'hidden' }}
              >
                <Row
                  align="stretch"
                  gutter={[8, 16]}
                  style={{
                    alignItems: 'stretch',
                    overflowX: 'hidden',
                    padding: 10,
                  }}
                >
                  {documentsData?.documentsNoFolder.edges.map(({ node }) => (
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
              </InfiniteScroll>
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
    </div>
  );
};

export default ListFolders;
