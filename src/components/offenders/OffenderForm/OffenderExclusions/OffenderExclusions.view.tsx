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
import { useIntl } from 'react-intl';

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

interface TableItem {
  key: string;
  description: string | null | undefined;
  endDate: Date;
  location?: string | undefined;
  activeDay?: string | undefined;
  item: BanType;
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
}: Props): JSX.Element => {
  const intl = useIntl();

  const expandedRowRender = (record: TableItem) => (
    <Text style={{ fontSize: 14, padding: 0, margin: 0 }}>
      {intl.formatMessage(
        { defaultMessage: 'Description: {description}', id: 'US7L2J' },
        {
          description: record.description,
        }
      )}
    </Text>
  );

  return (
    <>
      <Card>
        <Row align="middle" style={{ marginBottom: 20 }}>
          <Col>
            <Title style={{ marginBottom: 0 }} level={4}>
              {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
              {`${titleOrder}.`}
            </Title>
          </Col>
          <Col>
            <Title style={{ marginBottom: 0, marginLeft: 5 }} level={4}>
              {intl.formatMessage({
                defaultMessage: 'Exclusions',
                id: 'jjBvFh',
              })}
            </Title>
          </Col>
          <Col style={{ marginRight: 5 }}>
            <Paragraph
              style={{ marginBottom: 1, marginLeft: 5 }}
              type="secondary"
              italic
            >
              {intl.formatMessage({
                defaultMessage:
                  '- Create exclusions for this offender to exclude them from areas or premises.',
                id: 'lrbcIG',
              })}
            </Paragraph>
          </Col>
          <Col>
            <Button
              disabled={saving}
              onClick={toggleAddExclusion}
              style={{ marginTop: -30, marginLeft: 15, color: 'red' }}
              icon={
                <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />
              }
            >
              {intl.formatMessage({
                defaultMessage: 'Add Exclusion',
                id: 'QPeZMN',
              })}
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
                expandable={{
                  expandedRowRender,
                  rowExpandable: (record) => !!record.description,
                }}
                columns={[
                  {
                    key: 'duration',
                    title: intl.formatMessage({
                      defaultMessage: 'Duration',
                      id: 'IuFETn',
                    }),
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
                            {intl.formatMessage({
                              defaultMessage: 'EXPIRED',
                              id: 'GftNg3',
                            })}
                          </Tag>
                        )}
                      </>
                    ),
                  },
                  {
                    key: 'activeDay',
                    title: intl.formatMessage({
                      defaultMessage: 'Active Days',
                      id: 'YEneNi',
                    }),
                    dataIndex: 'activeDay',
                    width: 150,
                  },
                  {
                    key: 'location',
                    title: intl.formatMessage({
                      defaultMessage: 'Location',
                      id: 'rvirM2',
                    }),
                    dataIndex: 'location',
                    ellipsis: true,
                  },
                  {
                    key: 'type',
                    title: intl.formatMessage({
                      defaultMessage: 'Type',
                      id: '+U6ozc',
                    }),
                    dataIndex: 'type',
                  },
                  {
                    key: 'Edit',
                    title: intl.formatMessage({
                      defaultMessage: 'Edit',
                      id: 'wEQDC6',
                    }),
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
                    title: intl.formatMessage({
                      defaultMessage: 'Delete',
                      id: 'K3r6DQ',
                    }),
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
                    'DD/MM/YYYY'
                  )}  -->  ${moment(ban?.endDate).format('DD/MM/YYYY')}`,
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
                emptyDescription ||
                intl.formatMessage({
                  defaultMessage: 'There are no exclusions for this offender.',
                  id: '4J6DZ4',
                })
              }
              style={{ marginLeft: 50 }}
            />
          </Row>
        )}
      </Card>
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Add Exclusion',
          id: 'QPeZMN',
        })}
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
        title={intl.formatMessage({
          defaultMessage: 'Edit Exclusion',
          id: '22olP0',
        })}
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
};

export default OffenderExclusions;
