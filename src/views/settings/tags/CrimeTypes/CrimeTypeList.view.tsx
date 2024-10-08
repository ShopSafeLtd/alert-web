import type { MutationUpdaterFn } from '@apollo/client';
import type { CreateTagMutation } from 'graphql/tags/mutations/__generated__/create-tag.generated';
import type { TagsQuery } from 'graphql/tags/queries/__generated__/tags.generated';

import {
  faPenToSquare,
  faPlus,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
import AddIncident from 'components/form-components/tags/crimeTypes/AddCrimeType';
import EditIncident from 'components/form-components/tags/crimeTypes/EditCrimeType';
import { TagType } from 'graphql/types';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import BuildTree from '../../../../utils/tags/tree-helper';

interface Props {
  addImpact: boolean;
  addIncident: boolean;
  addInvolved: boolean;
  data: TagsQuery | undefined;
  deleteConfirm: (value: string) => void;
  editIncident: boolean;
  impactData: TagsQuery | undefined;
  impactLoading: boolean;
  incidentId: string;
  // loading: boolean;
  involvedData: TagsQuery | undefined;
  involvedLoading: boolean;
  saving: boolean;
  search: string;
  setIncidentId: (value: string) => void;
  setSearch: (value: string) => void;
  toggleAddImpact: () => void;
  toggleAddIncident: () => void;
  toggleAddInvolved: () => void;
  toggleEditIncident: () => void;
  updateCrimeTypeList: MutationUpdaterFn<CreateTagMutation>;
  updateImpactList: MutationUpdaterFn<CreateTagMutation>;
  updateInvolvedList: MutationUpdaterFn<CreateTagMutation>;
  updateTagParent: (tagId: string, parentTagId: null | string) => void;
}

const CrimeTypeList = ({
  addImpact,
  addIncident,
  addInvolved,
  data,
  deleteConfirm,
  editIncident,
  impactData,
  impactLoading,
  incidentId,
  involvedData,
  involvedLoading,
  saving,
  // loading,
  search,
  setIncidentId,
  setSearch,
  toggleAddImpact,
  toggleAddIncident,
  toggleAddInvolved,
  toggleEditIncident,
  updateCrimeTypeList,
  updateImpactList,
  updateInvolvedList,
  updateTagParent,
}: Props): JSX.Element => {
  const intl = useIntl();
  return (
    <div className="list-view">
      <Card>
        <Row align="middle" gutter={16} style={{ marginBottom: 10 }}>
          <Col>
            <Typography.Title level={4} style={{ margin: 0 }}>
              <FormattedMessage defaultMessage="Incident Types" />
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
              icon={
                <FontAwesomeIcon
                  icon={faPlus}
                  size="lg"
                  style={{ marginRight: 5 }}
                />
              }
              onClick={toggleAddIncident}
            >
              <FormattedMessage defaultMessage="Add Incident Type" />
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
              description: tag.description,
              id: tag.id,
              name: tag.name,
              parentId: tag.parentTag?.id || null,
            })) || []
          }
          draggable={false}
          updateTagParent={updateTagParent}
        />
      </Card>

      <Card>
        <Row align="middle" gutter={16} style={{ marginBottom: 10 }}>
          <Col>
            <Typography.Title level={4} style={{ margin: 0 }}>
              <FormattedMessage defaultMessage="Involved Tags" />
            </Typography.Title>
          </Col>
          <Col span={8}>
            <Input
              allowClear
              onChange={(event) => setSearch(event.target.value)}
              placeholder={intl.formatMessage({
                defaultMessage: 'Search involved tags...',
              })}
              value={search}
            />
          </Col>
          <Col flex={1} />
          <Col>
            <Button
              danger
              icon={
                <FontAwesomeIcon
                  icon={faPlus}
                  size="lg"
                  style={{ marginRight: 5 }}
                />
              }
              onClick={toggleAddInvolved}
            >
              <FormattedMessage defaultMessage="Add Involved Tag" />
            </Button>
          </Col>
        </Row>
        <Table
          columns={[
            {
              dataIndex: 'name',
              key: 'name',
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
              title: intl.formatMessage({
                defaultMessage: 'Name',
              }),
              width: 250,
            },
            {
              dataIndex: 'description',
              ellipsis: true,
              key: 'description',
              title: intl.formatMessage({
                defaultMessage: 'Description',
              }),
            },
            {
              dataIndex: 'Options',
              key: 'Options',
              render: (_, record) => (
                <Row gutter={8}>
                  <Col>
                    <Tooltip
                      title={intl.formatMessage({
                        defaultMessage: 'Edit Incident Type',
                      })}
                    >
                      <Button
                        disabled={saving}
                        icon={<FontAwesomeIcon icon={faPenToSquare} />}
                        onClick={() => {
                          setIncidentId(record.key);
                          toggleEditIncident();
                        }}
                        size="small"
                      />
                    </Tooltip>
                  </Col>
                  <Col>
                    <Tooltip
                      title={intl.formatMessage({
                        defaultMessage: 'Remove Incident Type',
                      })}
                    >
                      <Button
                        disabled={saving}
                        icon={<FontAwesomeIcon icon={faTrash} />}
                        onClick={() => {
                          deleteConfirm(record.key);
                        }}
                        size="small"
                      />
                    </Tooltip>
                  </Col>
                </Row>
              ),
              title: '',
              width: 100,
            },
          ]}
          dataSource={involvedData?.tags.map((tag) => ({
            description: tag.description,
            key: tag.id,
            name: tag.name,
          }))}
          loading={involvedLoading}
          pagination={{
            defaultPageSize: 20,
            hideOnSinglePage: true,
            pageSize: 20,
          }}
          size="small"
        />
      </Card>

      <Card>
        <Row align="middle" gutter={16} style={{ marginBottom: 10 }}>
          <Col>
            <Typography.Title level={4} style={{ margin: 0 }}>
              <FormattedMessage defaultMessage="Impact Tags" />
            </Typography.Title>
          </Col>
          <Col span={8}>
            <Input
              allowClear
              onChange={(event) => setSearch(event.target.value)}
              placeholder={intl.formatMessage({
                defaultMessage: 'Search impact tags...',
              })}
              value={search}
            />
          </Col>
          <Col flex={1} />
          <Col>
            <Button
              danger
              icon={
                <FontAwesomeIcon
                  icon={faPlus}
                  size="lg"
                  style={{ marginRight: 5 }}
                />
              }
              onClick={toggleAddImpact}
            >
              <FormattedMessage defaultMessage="Add Impact Type" />
            </Button>
          </Col>
        </Row>
        <Table
          columns={[
            {
              dataIndex: 'name',
              key: 'name',
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
              title: intl.formatMessage({
                defaultMessage: 'Name',
              }),
              width: 250,
            },
            {
              dataIndex: 'description',
              ellipsis: true,

              key: 'description',
              title: intl.formatMessage({
                defaultMessage: 'Description',
              }),
            },
            {
              dataIndex: 'Options',
              key: 'Options',
              render: (_, record) => (
                <Row gutter={8}>
                  <Col>
                    <Tooltip
                      title={intl.formatMessage({
                        defaultMessage: 'Edit Incident Type',
                      })}
                    >
                      <Button
                        disabled={saving}
                        icon={<FontAwesomeIcon icon={faPenToSquare} />}
                        onClick={() => {
                          setIncidentId(record.key);
                          toggleEditIncident();
                        }}
                        size="small"
                      />
                    </Tooltip>
                  </Col>
                  <Col>
                    <Tooltip
                      title={intl.formatMessage({
                        defaultMessage: 'Remove Incident Type',
                      })}
                    >
                      <Button
                        disabled={saving}
                        icon={<FontAwesomeIcon icon={faTrash} />}
                        onClick={() => {
                          deleteConfirm(record.key);
                        }}
                        size="small"
                      />
                    </Tooltip>
                  </Col>
                </Row>
              ),
              title: '',
              width: 100,
            },
          ]}
          dataSource={impactData?.tags.map((tag) => ({
            description: tag.description,
            key: tag.id,
            name: tag.name,
          }))}
          loading={impactLoading}
          pagination={{
            defaultPageSize: 20,
            hideOnSinglePage: true,
            pageSize: 20,
          }}
          size="small"
        />
      </Card>

      <Drawer
        onClose={toggleAddIncident}
        open={addIncident}
        title={intl.formatMessage({
          defaultMessage: 'Add Incident Types',
        })}
        width="800"
      >
        {addIncident ? (
          <AddIncident
            onClose={toggleAddIncident}
            type={TagType.IncidentCrimeType}
            update={updateCrimeTypeList}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={toggleAddInvolved}
        open={addInvolved}
        title={intl.formatMessage({
          defaultMessage: 'Add Involved Tag',
        })}
        width="400"
      >
        {addInvolved ? (
          <AddIncident
            onClose={toggleAddInvolved}
            type={TagType.IncidentInvolved}
            update={updateInvolvedList}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={toggleAddImpact}
        open={addImpact}
        title={intl.formatMessage({
          defaultMessage: 'Add Impact Tag',
        })}
        width="400"
      >
        {addImpact ? (
          <AddIncident
            onClose={toggleAddImpact}
            type={TagType.IncidentImpact}
            update={updateImpactList}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={toggleEditIncident}
        open={editIncident}
        title={intl.formatMessage({
          defaultMessage: 'Edit Tag',
        })}
        width="400"
      >
        {editIncident && (
          <EditIncident incidentId={incidentId} onClose={toggleEditIncident} />
        )}
      </Drawer>
    </div>
  );
};

export default CrimeTypeList;
