import React from 'react';
import {
  Button,
  Card,
  Col,
  Drawer,
  Input,
  Row,
  Table,
  Tooltip,
  Typography,
} from 'antd';
import type { CreateTagMutation, TagsQuery } from 'graphql/generated';
import { TagType } from 'graphql/generated';
import AddIncident from 'components/form-components/tags/crimeTypes/AddCrimeType';
import EditIncident from 'components/form-components/tags/crimeTypes/EditCrimeType';

import type { MutationUpdaterFn } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPenToSquare,
  faPlus,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import { FormattedMessage, useIntl } from 'react-intl';
import BuildTree from '../../../../utils/tags/tree-helper';

interface Props {
  data: TagsQuery | undefined;
  // loading: boolean;
  involvedData: TagsQuery | undefined;
  involvedLoading: boolean;
  impactData: TagsQuery | undefined;
  impactLoading: boolean;
  search: string;
  setSearch: (value: string) => void;
  addIncident: boolean;
  addInvolved: boolean;
  addImpact: boolean;
  toggleAddIncident: () => void;
  toggleAddInvolved: () => void;
  toggleAddImpact: () => void;
  updateCrimeTypeList: MutationUpdaterFn<CreateTagMutation>;
  updateInvolvedList: MutationUpdaterFn<CreateTagMutation>;
  updateImpactList: MutationUpdaterFn<CreateTagMutation>;
  incidentId: string;
  setIncidentId: (value: string) => void;
  editIncident: boolean;
  toggleEditIncident: () => void;
  saving: boolean;
  deleteConfirm: (value: string) => void;
  updateTagParent: (tagId: string, parentTagId: string | null) => void;
}

const CrimeTypeList = ({
  data,
  // loading,
  search,
  setSearch,
  editIncident,
  toggleEditIncident,
  addIncident,
  toggleAddIncident,
  updateCrimeTypeList,
  incidentId,
  setIncidentId,
  saving,
  deleteConfirm,
  impactData,
  impactLoading,
  involvedData,
  involvedLoading,
  addImpact,
  addInvolved,
  toggleAddImpact,
  toggleAddInvolved,
  updateImpactList,
  updateInvolvedList,
  updateTagParent,
}: Props): JSX.Element => {
  const intl = useIntl();
  // const navigate = useNavigate();
  return (
    <div className="list-view">
      <Card>
        <Row align="middle" gutter={16} style={{ marginBottom: 10 }}>
          <Col>
            <Typography.Title style={{ margin: 0 }} level={4}>
              <FormattedMessage defaultMessage="Crime Types" id="Piba4q" />
            </Typography.Title>
          </Col>
          {/* <Col span={8}> */}
          {/*   <Input */}
          {/*     value={search} */}
          {/*     onChange={(event) => setSearch(event.target.value)} */}
          {/*     placeholder={intl.formatMessage({ */}
          {/*       defaultMessage: 'Search crime types...', */}
          {/*       id: 'nZ3lWy', */}
          {/*     })} */}
          {/*     allowClear */}
          {/*   /> */}
          {/* </Col> */}
          <Col flex={1} />
          <Col>
            <Button
              danger
              onClick={toggleAddIncident}
              icon={
                <FontAwesomeIcon
                  icon={faPlus}
                  size="lg"
                  style={{ marginRight: 5 }}
                />
              }
            >
              <FormattedMessage defaultMessage="Add Crime Type" id="OAVeBQ" />
            </Button>
          </Col>
        </Row>
        {/* <Table */}
        {/*   size="small" */}
        {/*   loading={loading} */}
        {/*   pagination={{ */}
        {/*     hideOnSinglePage: true, */}
        {/*     defaultPageSize: 20, */}
        {/*     pageSize: 20, */}
        {/*   }} */}
        {/*   columns={[ */}
        {/*     { */}
        {/*       key: 'name', */}
        {/*       title: intl.formatMessage({ */}
        {/*         defaultMessage: 'Name', */}
        {/*         id: 'HAlOn1', */}
        {/*       }), */}
        {/*       dataIndex: 'name', */}
        {/*       width: 250, */}
        {/*       render: (value, record) => ( */}
        {/*         <Typography.Link */}
        {/*           disabled={saving} */}
        {/*           onClick={() => { */}
        {/*             navigate( */}
        {/*               `/app/scheme-settings/crime-types/view/${record.key}` */}
        {/*             ); */}
        {/*           }} */}
        {/*         > */}
        {/*           {value} */}
        {/*         </Typography.Link> */}
        {/*       ), */}
        {/*     }, */}
        {/*     { */}
        {/*       key: 'description', */}
        {/*       title: intl.formatMessage({ */}
        {/*         defaultMessage: 'Description', */}
        {/*         id: 'Q8Qw5B', */}
        {/*       }), */}
        {/*       dataIndex: 'description', */}
        {/*       ellipsis: true, */}
        {/*     }, */}
        {/*     { */}
        {/*       key: 'Options', */}
        {/*       title: '', */}
        {/*       dataIndex: 'Options', */}
        {/*       width: 100, */}
        {/*       render: (_, record) => ( */}
        {/*         <Row gutter={8}> */}
        {/*           <Col> */}
        {/*             <Tooltip */}
        {/*               title={intl.formatMessage({ */}
        {/*                 defaultMessage: 'Edit Crime Type', */}
        {/*                 id: 'zwQmkF', */}
        {/*               })} */}
        {/*             > */}
        {/*               <Button */}
        {/*                 size="small" */}
        {/*                 disabled={saving} */}
        {/*                 onClick={() => { */}
        {/*                   setIncidentId(record.key); */}
        {/*                   toggleEditIncident(); */}
        {/*                 }} */}
        {/*                 icon={<FontAwesomeIcon icon={faPenToSquare} />} */}
        {/*               /> */}
        {/*             </Tooltip> */}
        {/*           </Col> */}
        {/*           <Col> */}
        {/*             <Tooltip */}
        {/*               title={intl.formatMessage({ */}
        {/*                 defaultMessage: 'Remove Crime Type', */}
        {/*                 id: 'qHTdPQ', */}
        {/*               })} */}
        {/*             > */}
        {/*               <Button */}
        {/*                 size="small" */}
        {/*                 disabled={saving} */}
        {/*                 onClick={() => { */}
        {/*                   deleteConfirm(record.key); */}
        {/*                 }} */}
        {/*                 icon={<FontAwesomeIcon icon={faTrash} />} */}
        {/*               /> */}
        {/*             </Tooltip> */}
        {/*           </Col> */}
        {/*         </Row> */}
        {/*       ), */}
        {/*     }, */}
        {/*   ]} */}
        {/*   dataSource={data?.tags.map((tag) => ({ */}
        {/*     key: tag.id, */}
        {/*     name: tag.name, */}
        {/*     description: tag.description, */}
        {/*   }))} */}
        {/* /> */}
        <BuildTree
          InitData={
            data?.tags.map((tag) => ({
              id: tag.id,
              name: tag.name,
              description: tag.description,
              parentId: tag.parentTag?.id || null,
            })) || []
          }
          updateTagParent={updateTagParent}
          draggable={false}
        />
      </Card>

      <Card>
        <Row gutter={16} align="middle" style={{ marginBottom: 10 }}>
          <Col>
            <Typography.Title style={{ margin: 0 }} level={4}>
              <FormattedMessage defaultMessage="Involved Tags" id="hqB+1X" />
            </Typography.Title>
          </Col>
          <Col span={8}>
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={intl.formatMessage({
                defaultMessage: 'Search involved tags...',
                id: '5Tbx28',
              })}
              allowClear
            />
          </Col>
          <Col flex={1} />
          <Col>
            <Button
              danger
              onClick={toggleAddInvolved}
              icon={
                <FontAwesomeIcon
                  icon={faPlus}
                  size="lg"
                  style={{ marginRight: 5 }}
                />
              }
            >
              <FormattedMessage defaultMessage="Add Involved Tag" id="Hnfici" />
            </Button>
          </Col>
        </Row>
        <Table
          size="small"
          loading={involvedLoading}
          pagination={{
            hideOnSinglePage: true,
            defaultPageSize: 20,
            pageSize: 20,
          }}
          columns={[
            {
              key: 'name',
              title: intl.formatMessage({
                defaultMessage: 'Name',
                id: 'HAlOn1',
              }),
              dataIndex: 'name',
              width: 250,
              render: (value, record) => (
                <Typography.Link
                  disabled={saving}
                  onClick={() => {
                    setIncidentId(record.key);
                    toggleEditIncident();
                  }}
                >
                  {value}
                </Typography.Link>
              ),
            },
            {
              key: 'description',
              title: intl.formatMessage({
                defaultMessage: 'Description',
                id: 'Q8Qw5B',
              }),
              dataIndex: 'description',
              ellipsis: true,
            },
            {
              key: 'Options',
              title: '',
              dataIndex: 'Options',
              width: 100,
              render: (_, record) => (
                <Row gutter={8}>
                  <Col>
                    <Tooltip
                      title={intl.formatMessage({
                        defaultMessage: 'Edit Crime Type',
                        id: 'zwQmkF',
                      })}
                    >
                      <Button
                        size="small"
                        disabled={saving}
                        onClick={() => {
                          setIncidentId(record.key);
                          toggleEditIncident();
                        }}
                        icon={<FontAwesomeIcon icon={faPenToSquare} />}
                      />
                    </Tooltip>
                  </Col>
                  <Col>
                    <Tooltip
                      title={intl.formatMessage({
                        defaultMessage: 'Remove Crime Type',
                        id: 'qHTdPQ',
                      })}
                    >
                      <Button
                        size="small"
                        disabled={saving}
                        onClick={() => {
                          deleteConfirm(record.key);
                        }}
                        icon={<FontAwesomeIcon icon={faTrash} />}
                      />
                    </Tooltip>
                  </Col>
                </Row>
              ),
            },
          ]}
          dataSource={involvedData?.tags.map((tag) => ({
            key: tag.id,
            name: tag.name,
            description: tag.description,
          }))}
        />
      </Card>

      <Card>
        <Row align="middle" gutter={16} style={{ marginBottom: 10 }}>
          <Col>
            <Typography.Title style={{ margin: 0 }} level={4}>
              <FormattedMessage defaultMessage="Impact Tags" id="JZVMXj" />
            </Typography.Title>
          </Col>
          <Col span={8}>
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={intl.formatMessage({
                defaultMessage: 'Search impact tags...',
                id: 'PYBHmx',
              })}
              allowClear
            />
          </Col>
          <Col flex={1} />
          <Col>
            <Button
              danger
              onClick={toggleAddImpact}
              icon={
                <FontAwesomeIcon
                  icon={faPlus}
                  size="lg"
                  style={{ marginRight: 5 }}
                />
              }
            >
              <FormattedMessage defaultMessage="Add Impact Type" id="bnHbBx" />
            </Button>
          </Col>
        </Row>
        <Table
          size="small"
          loading={impactLoading}
          pagination={{
            hideOnSinglePage: true,
            defaultPageSize: 20,
            pageSize: 20,
          }}
          columns={[
            {
              key: 'name',
              title: intl.formatMessage({
                defaultMessage: 'Name',
                id: 'HAlOn1',
              }),
              dataIndex: 'name',
              width: 250,
              render: (value, record) => (
                <Typography.Link
                  disabled={saving}
                  onClick={() => {
                    setIncidentId(record.key);
                    toggleEditIncident();
                  }}
                >
                  {value}
                </Typography.Link>
              ),
            },
            {
              key: 'description',
              title: intl.formatMessage({
                defaultMessage: 'Description',
                id: 'Q8Qw5B',
              }),

              dataIndex: 'description',
              ellipsis: true,
            },
            {
              key: 'Options',
              title: '',
              dataIndex: 'Options',
              width: 100,
              render: (_, record) => (
                <Row gutter={8}>
                  <Col>
                    <Tooltip
                      title={intl.formatMessage({
                        defaultMessage: 'Edit Crime Type',
                        id: 'zwQmkF',
                      })}
                    >
                      <Button
                        size="small"
                        disabled={saving}
                        onClick={() => {
                          setIncidentId(record.key);
                          toggleEditIncident();
                        }}
                        icon={<FontAwesomeIcon icon={faPenToSquare} />}
                      />
                    </Tooltip>
                  </Col>
                  <Col>
                    <Tooltip
                      title={intl.formatMessage({
                        defaultMessage: 'Remove Crime Type',
                        id: 'qHTdPQ',
                      })}
                    >
                      <Button
                        size="small"
                        disabled={saving}
                        onClick={() => {
                          deleteConfirm(record.key);
                        }}
                        icon={<FontAwesomeIcon icon={faTrash} />}
                      />
                    </Tooltip>
                  </Col>
                </Row>
              ),
            },
          ]}
          dataSource={impactData?.tags.map((tag) => ({
            key: tag.id,
            name: tag.name,
            description: tag.description,
          }))}
        />
      </Card>

      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Add Crime Types',
          id: 'hm9cEh',
        })}
        visible={addIncident}
        width="800"
        onClose={toggleAddIncident}
      >
        {addIncident ? (
          <AddIncident
            type={TagType.IncidentCrimeType}
            update={updateCrimeTypeList}
            onClose={toggleAddIncident}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Add Involved Tag',
          id: 'Hnfici',
        })}
        visible={addInvolved}
        width="400"
        onClose={toggleAddInvolved}
      >
        {addInvolved ? (
          <AddIncident
            type={TagType.IncidentInvolved}
            update={updateInvolvedList}
            onClose={toggleAddInvolved}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Add Impact Tag',
          id: 'sl+yfu',
        })}
        visible={addImpact}
        width="400"
        onClose={toggleAddImpact}
      >
        {addImpact ? (
          <AddIncident
            type={TagType.IncidentImpact}
            update={updateImpactList}
            onClose={toggleAddImpact}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Edit Tag',
          id: 'uJkv2X',
        })}
        visible={editIncident}
        width="400"
        onClose={toggleEditIncident}
      >
        {editIncident && (
          <EditIncident incidentId={incidentId} onClose={toggleEditIncident} />
        )}
      </Drawer>
    </div>
  );
};

export default CrimeTypeList;
