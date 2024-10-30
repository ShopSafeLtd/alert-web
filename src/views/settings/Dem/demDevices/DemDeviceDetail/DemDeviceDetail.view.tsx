import type { RecycleDemEvidenceMutation } from '#/components/tables/DemEvidenceTable/graphql/__generated__/recycle-dem-evidence.generated';
import type { MutationUpdaterFn } from '@apollo/client';

import AddDemDevice from '#/components/form-components/DemDevice/AddDemDevice';
import LinkBusiness from '#/components/form-components/businesses/LinkBusiness';
import DemEvidenceTable from '#/components/tables/DemEvidenceTable';
import {
  faPenToSquare,
  faShare,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Card,
  Col,
  Descriptions,
  Drawer,
  Modal,
  PageHeader,
  Row,
  Tag,
  Typography,
} from 'antd';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import type { DemDeviceQuery } from '../graphql/queries/__generated__/dem-device.generated';
import type { ListDemDeviceEvidenceQuery } from '../graphql/queries/__generated__/list-device-dem-evidence.generated';

const { confirm } = Modal;

interface Props {
  assignToBusiness: boolean;
  data: DemDeviceQuery | undefined;
  deleteConfirm: () => void;
  editDemDevice: boolean;
  evidenceData: ListDemDeviceEvidenceQuery | undefined;
  evidenceLoading: boolean;
  loading: boolean;
  onAssignedBusiness: (value: string) => void;
  saving: boolean;
  toggleAssignToBusiness: () => void;
  toggleEditDemDevice: () => void;
  updateDeleteEvidenceList: MutationUpdaterFn<RecycleDemEvidenceMutation>;
}

const DemDeviceDetail = ({
  assignToBusiness,
  data,
  deleteConfirm,
  editDemDevice,
  evidenceData,
  evidenceLoading,
  loading,
  onAssignedBusiness,
  saving,
  toggleAssignToBusiness,
  toggleEditDemDevice,
  updateDeleteEvidenceList,
}: Props): JSX.Element => {
  const intl = useIntl();
  return (
    <div className="list-view">
      <PageHeader
        extra={[
          <Button
            disabled={saving}
            icon={
              <FontAwesomeIcon
                icon={faPenToSquare}
                size="lg"
                style={{ marginRight: 5 }}
              />
            }
            key="0"
            onClick={toggleEditDemDevice}
          >
            <FormattedMessage defaultMessage="Edit Details" />
          </Button>,
          <Button
            icon={
              <FontAwesomeIcon
                icon={faShare}
                size="lg"
                style={{ marginRight: 5 }}
              />
            }
            key="1"
            // onClick={toggleAssignToBusiness}
          >
            <FormattedMessage defaultMessage="Link Business" />
          </Button>,
          <Button
            disabled={saving}
            icon={
              <FontAwesomeIcon
                icon={faTrash}
                size="lg"
                style={{ marginRight: 5 }}
              />
            }
            key="2"
            onClick={() => {
              confirm({
                content: intl.formatMessage({
                  defaultMessage: 'This action cannot be undone.',
                }),
                onOk() {
                  deleteConfirm();
                },

                title: intl.formatMessage({
                  defaultMessage: 'Do you want to delete the dem device?',
                }),
              });
            }}
            type="primary"
          >
            <FormattedMessage defaultMessage="Delete" />
          </Button>,
        ]}
        onBack={() => window.history.back()}
        // subTitle={data?.device?.description}
        title={data?.demDevice.name}
      />
      <Card loading={loading}>
        <Descriptions
          column={1}
          extra={
            <Button
              disabled={saving}
              icon={
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  size="lg"
                  style={{ marginRight: 5 }}
                />
              }
              key="0"
              onClick={toggleEditDemDevice}
            >
              <FormattedMessage defaultMessage="Edit Details" />
            </Button>
          }
          title={
            <Typography.Title level={4}>
              <FormattedMessage defaultMessage="Device Details" />
            </Typography.Title>
          }
        >
          <Descriptions.Item
            label={<FormattedMessage defaultMessage="Name" />}
            style={{ paddingBottom: 8 }}
          >
            {data?.demDevice.name}
          </Descriptions.Item>
          <Descriptions.Item
            label={<FormattedMessage defaultMessage="Serial Number" />}
            style={{ paddingBottom: 8 }}
          >
            {data?.demDevice.serialNumber}
          </Descriptions.Item>

          <Descriptions.Item
            label={<FormattedMessage defaultMessage="Business" />}
            style={{ paddingBottom: 8 }}
          >
            <Link
              to={`/app/scheme-settings/businesses/view/${data?.demDevice.business.id}`}
            >
              {data?.demDevice.business.name}
            </Link>
          </Descriptions.Item>

          <Descriptions.Item
            label={<FormattedMessage defaultMessage="Dem Groups" />}
          >
            <Row gutter={[0, 8]}>
              {data?.demDevice.demGroups &&
              data?.demDevice.demGroups.length > 0 ? (
                data?.demDevice.demGroups.map(({ id, name }) => (
                  <Col key={id}>
                    <Tag color="blue">{name}</Tag>
                  </Col>
                ))
              ) : (
                <FormattedMessage defaultMessage="No Dem Groups" />
              )}
            </Row>
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <Card loading={loading || evidenceLoading}>
        <Typography.Title level={4}>
          {intl.formatMessage({
            defaultMessage: 'Dem Evidence',
          })}
        </Typography.Title>
        <DemEvidenceTable
          demEvidence={evidenceData?.listDemDeviceEvidence}
          saving={loading || evidenceLoading}
          update={updateDeleteEvidenceList}
        />
      </Card>
      <Drawer
        onClose={toggleEditDemDevice}
        open={editDemDevice}
        title={intl.formatMessage({
          defaultMessage: 'Edit Dem Device Details',
        })}
        width="400"
      >
        {editDemDevice ? (
          <AddDemDevice
            editData={{
              ...data?.demDevice,
              business: data?.demDevice.business.id || '',
              demGroups: data?.demDevice.demGroups.map(({ id }) => id) || [],
              id: data?.demDevice.id || '',
              name: data?.demDevice.name || '',
            }}
            onClose={toggleEditDemDevice}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={toggleAssignToBusiness}
        open={assignToBusiness}
        title={intl.formatMessage({
          defaultMessage: 'Add New Business',
        })}
        width={600}
      >
        {assignToBusiness && (
          <LinkBusiness
            onClose={toggleAssignToBusiness}
            saving={saving}
            update={onAssignedBusiness}
          />
        )}
      </Drawer>
    </div>
  );
};
export default DemDeviceDetail;
