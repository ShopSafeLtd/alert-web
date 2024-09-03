import type { ViewIncidentQuery } from '#/views/incidents/ViewIncident/__generated__/view-incident.generated';
import type { MutationUpdaterFn } from '@apollo/client';
import type { CreateDocumentMutation } from 'graphql/documents/mutations/__generated__/create-document.generated';
import type { DeleteDocumentMutation } from 'graphql/documents/mutations/__generated__/delete-document.generated';

import AddDocument from '#/components/form-components/documents/AddDocument';
import EvidenceTable from '#/components/tables/EvidenceTable';
import { ProfileUpdatedModel } from '#/types/enums/profile-update-type';
import { ViewIncidentDocument } from '#/views/incidents/ViewIncident/__generated__/view-incident.generated';
import { faPage, faPlus, faUpload } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Card,
  Col,
  Drawer,
  Dropdown,
  Empty,
  Menu,
  Row,
  Typography,
} from 'antd';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

interface Props {
  data: ViewIncidentQuery | undefined;
  deleteRights: boolean;
  editRights: boolean;
  incidentId: string;
  loading: boolean;
}

const Evidence = ({
  data,
  deleteRights,
  editRights,
  incidentId,
  loading,
}: Props) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const [addDocument, setAddDocument] = useState(false);

  const toggleAddDocument = () => {
    setAddDocument(() => !addDocument);
  };

  const updateDocumentList: MutationUpdaterFn<CreateDocumentMutation> = (
    store,
    { data: res }
  ) => {
    if (res?.createDocument === null || res?.createDocument === undefined)
      return;
    const existingData = store.readQuery<ViewIncidentQuery>({
      query: ViewIncidentDocument,
      variables: {
        where: {
          id: incidentId,
        },
      },
    });

    if (!existingData?.incident) return;
    store.writeQuery<ViewIncidentQuery>({
      data: {
        __typename: 'Query',
        incident: {
          ...existingData.incident,
          evidence: [...existingData.incident.evidence, res.createDocument],
        },
      },
      query: ViewIncidentDocument,
      variables: {
        where: {
          id: incidentId,
        },
      },
    });
  };
  const updateDeleteDocument: MutationUpdaterFn<DeleteDocumentMutation> = (
    store,
    { data: res }
  ) => {
    if (res?.deleteDocument === null || res?.deleteDocument === undefined)
      return;
    const existingData = store.readQuery<ViewIncidentQuery>({
      query: ViewIncidentDocument,
      variables: {
        where: {
          id: incidentId,
        },
      },
    });

    if (!existingData?.incident) return;
    store.writeQuery<ViewIncidentQuery>({
      data: {
        __typename: 'Query',
        incident: {
          ...existingData.incident,
          evidence: existingData.incident.evidence.filter(
            ({ id }) => id !== res.deleteDocument?.id
          ),
        },
      },
      query: ViewIncidentDocument,
      variables: {
        where: {
          id: incidentId,
        },
      },
    });
  };

  return (
    <>
      <Card loading={loading}>
        <Row align="middle" gutter={8} style={{ marginBottom: 10 }}>
          <Col flex={1}>
            <Title level={4}>
              {intl.formatMessage({
                defaultMessage: 'Evidence',
              })}
            </Title>
          </Col>
          {editRights && (
            <Col>
              {data?.incident?.scheme.mg11Available ? (
                <Dropdown
                  overlay={
                    <Menu
                      items={[
                        {
                          icon: (
                            <FontAwesomeIcon
                              icon={faPage}
                              size="1x"
                              style={{ marginRight: 8 }}
                            />
                          ),
                          key: '1',
                          label: intl.formatMessage({
                            defaultMessage: 'Create MG11',
                          }),
                          // disabled: !listVehiclesData?.listVehicles.total,
                          onClick: () =>
                            navigate(`/app/mg11/create/${incidentId}`),
                        },
                        {
                          icon: (
                            <FontAwesomeIcon
                              icon={faPage}
                              size="1x"
                              style={{ marginRight: 8 }}
                            />
                          ),
                          key: '2',
                          label: intl.formatMessage({
                            defaultMessage: 'Create Business Impact Statement',
                          }),
                          // disabled: !listVehiclesData?.listVehicles.total,
                          onClick: () =>
                            navigate(
                              `/app/mg11/create-bis/${incidentId || ''}`
                            ),
                        },
                        {
                          icon: (
                            <FontAwesomeIcon
                              icon={faUpload}
                              size="1x"
                              style={{ marginRight: 8 }}
                            />
                          ),
                          key: '3',
                          label: intl.formatMessage({
                            defaultMessage: 'Upload',
                          }),
                          // disabled: !listVehiclesData?.listVehicles.total,
                          onClick: () => toggleAddDocument(),
                        },
                      ]}
                    />
                  }
                >
                  <Button
                    // key="2"
                    icon={
                      <FontAwesomeIcon
                        icon={faPlus}
                        style={{ marginRight: 5 }}
                      />
                    }
                  >
                    {intl.formatMessage({
                      defaultMessage: 'Add Evidence',
                    })}
                  </Button>
                </Dropdown>
              ) : (
                <Button
                  icon={
                    <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />
                  }
                  onClick={toggleAddDocument}
                  size="small"
                >
                  {intl.formatMessage({
                    defaultMessage: 'Add Evidence',
                  })}
                </Button>
              )}
            </Col>
          )}
        </Row>

        {data?.incident?.evidence.length && !loading ? (
          <EvidenceTable
            deleteRights={deleteRights}
            evidence={data?.incident?.evidence}
            title={ProfileUpdatedModel.Incident}
            update={updateDeleteDocument}
          />
        ) : (
          <Empty
            description={intl.formatMessage({
              defaultMessage: 'No evidence for this incident',
            })}
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        )}
      </Card>
      <Drawer
        onClose={toggleAddDocument}
        open={addDocument}
        title={intl.formatMessage({
          defaultMessage: 'Add Evidence',
        })}
        width="600"
        zIndex={1001}
      >
        {addDocument ? (
          <AddDocument
            incidentId={data?.incident?.id || ''}
            onClose={toggleAddDocument}
            update={updateDocumentList}
          />
        ) : (
          <div />
        )}
      </Drawer>
    </>
  );
};

export default Evidence;
