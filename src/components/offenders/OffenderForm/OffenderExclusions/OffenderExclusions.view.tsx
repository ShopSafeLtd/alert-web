import React from 'react';
import {
  Button,
  Card,
  Col,
  Drawer,
  Empty,
  Row,
  Table,
  Tag,
  Typography,
} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPenToSquare,
  faPlus,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';

import { calcDuration } from 'utils';
import EditExclusion from 'components/form-components/offender/exclusion/EditExclusion';
import AddExclusion from 'components/form-components/offender/exclusion/AddExclusion';
import type { BanData } from 'types/DataType';
import calcExpired from 'utils/calc-expire';
import moment from 'moment';

const { Title, Paragraph, Text } = Typography;

interface BanType extends BanData {
  new?: boolean;
  updated?: boolean;
  deleted?: boolean;
}
interface Props {
  titleOrder: number;
  saving: boolean;
  bansData: BanType[];
  banData: BanType | null;
  setBanData: (value: BanType) => void;
  deleteConfirm: (value: string) => void;
  addExclusion: boolean;
  toggleAddExclusion: () => void;
  editExclusion: boolean;
  toggleEditExclusion: () => void;
  onUpdateExclusion: (value: BanData) => void;
  onAddExclusion: (value: BanData) => void;
  emptyDescription?: string;
}

const OffenderExclusions = ({
  toggleAddExclusion,
  bansData,
  banData,
  titleOrder,
  saving,
  setBanData,
  toggleEditExclusion,
  deleteConfirm,
  addExclusion,
  editExclusion,
  onUpdateExclusion,
  onAddExclusion,
  emptyDescription,
}: Props): JSX.Element => (
  <>
    <Card>
      <Row align="middle" style={{ marginBottom: 20 }}>
        <Col>
          <Title style={{ marginBottom: 0 }} level={4}>
            {`${titleOrder}.`}
          </Title>
        </Col>
        <Col>
          <Title style={{ marginBottom: 0, marginLeft: 5 }} level={4}>
            Exclusions
          </Title>
        </Col>
        <Col style={{ marginRight: 5 }}>
          <Paragraph
            style={{ marginBottom: 1, marginLeft: 5 }}
            type="secondary"
            italic
          >
            - Create exclusions for this offender to exclusion them from areas
            or premises.
          </Paragraph>
        </Col>
        <Col>
          <Button
            disabled={saving}
            onClick={toggleAddExclusion}
            style={{ marginTop: -30, marginLeft: 15, color: 'red' }}
            icon={<FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />}
          >
            Add Exclusion
          </Button>
        </Col>
      </Row>

      {bansData && bansData.length > 0 ? (
        <Row gutter={20}>
          <Col>
            <Table
              size="small"
              pagination={{
                hideOnSinglePage: true,
                defaultPageSize: 20,
                pageSize: 20,
              }}
              columns={[
                {
                  key: 'duration',
                  title: 'Duration',
                  dataIndex: 'duration',
                  width: 350,
                  render: (value, record) => (
                    <>
                      <Text>{value}</Text>
                      {calcExpired(new Date(record.endDate)) && (
                        <Tag
                          color="red"
                          style={{
                            marginLeft: 10,
                          }}
                        >
                          EXPIRED
                        </Tag>
                      )}
                    </>
                  ),
                },

                {
                  key: 'activeDay',
                  title: 'Active Days',
                  dataIndex: 'activeDay',
                  width: 150,
                },
                {
                  key: 'location',
                  title: 'Location',
                  dataIndex: 'location',
                  ellipsis: true,
                },
                {
                  key: 'description',
                  title: 'Description',
                  dataIndex: 'description',
                  ellipsis: true,
                },
                {
                  key: 'type',
                  title: 'Type',
                  dataIndex: 'type',
                },
                {
                  key: 'Edit',
                  title: 'Edit',
                  width: 50,
                  dataIndex: 'Edit',
                  render: (_, record) => (
                    <Button
                      disabled={saving}
                      onClick={() => {
                        setBanData(record.item);
                        toggleEditExclusion();
                      }}
                      icon={<FontAwesomeIcon icon={faPenToSquare} />}
                    />
                  ),
                },
                {
                  key: 'Delete',
                  title: 'Delete',
                  dataIndex: 'Delete',
                  width: 60,
                  render: (_, record) => (
                    <Button
                      disabled={saving}
                      onClick={() => {
                        deleteConfirm(record.key || '');
                      }}
                      icon={<FontAwesomeIcon icon={faTrash} />}
                    />
                  ),
                },
              ]}
              dataSource={bansData.map((ban) => ({
                endDate: ban.endDate,
                key: ban.id,
                item: ban,
                duration: `${moment(ban?.startDate).format(
                  'MM/DD/YYYY'
                )}  -->  ${moment(ban?.endDate).format('MM/DD/YYYY')}`,
                activeDay: calcDuration(
                  new Date(ban?.startDate),
                  new Date(ban?.endDate)
                ),
                location: ban.location,
                description: ban.description,
                type: ban.type,
              }))}
            />
          </Col>
        </Row>
      ) : (
        <Row justify="start">
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              emptyDescription || 'There are no exclusions for this offender.'
            }
            style={{ marginLeft: 50 }}
          />
        </Row>
      )}
    </Card>
    <Drawer
      title="Add Exclusion"
      visible={addExclusion}
      width="400"
      onClose={toggleAddExclusion}
    >
      {addExclusion ? (
        <AddExclusion update={onAddExclusion} onClose={toggleAddExclusion} />
      ) : (
        <div />
      )}
    </Drawer>
    <Drawer
      title="Edit Exclusion"
      visible={editExclusion}
      width="400"
      onClose={toggleEditExclusion}
    >
      {editExclusion ? (
        <EditExclusion
          update={onUpdateExclusion}
          onClose={toggleEditExclusion}
          banData={banData}
        />
      ) : (
        <div />
      )}
    </Drawer>
  </>
);
export default OffenderExclusions;
