import React from 'react';
import { Button, Card, Col, Drawer, Empty, Row, Table, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPenToSquare,
  faPlus,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import { useIntl } from 'react-intl';

import EditExclusion from 'components/form-components/offender/exclusion/EditExclusion';
import AddExclusion from 'components/form-components/offender/exclusion/AddExclusion';
import type { BanData } from 'types/DataType';
import type { Moment } from 'moment';

const { Title, Paragraph, Text } = Typography;

interface BanType extends BanData {
  new?: boolean;
  updated?: boolean;
  deleted?: boolean;
}

interface TableItem {
  key: string;
  description: string | null | undefined;
  item: BanType;
  months?: number | null;
  startDate?: Date;
  endDate?: Date;
  fineValue?: number | null;
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

  console.log(bansData);

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
                defaultMessage: 'Outcomes',
                id: 'h5J5Su',
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
                  '- Create outcomes for this offender to exclude them from areas or premises.',
                id: 'AIeJUP',
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
                defaultMessage: 'Add Outcome',
                id: 'HQnZ2l',
              })}
            </Button>
          </Col>
        </Row>

        {bansData && bansData.length > 0 ? (
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
                key: 'type',
                title: intl.formatMessage({
                  defaultMessage: 'Type',
                  id: '+U6ozc',
                }),
                dataIndex: 'type',
              },
              {
                key: 'months',
                title: intl.formatMessage({
                  defaultMessage: 'Months',
                  id: 'AxDOiG',
                }),
                dataIndex: 'months',
              },
              {
                key: 'startDate',
                title: intl.formatMessage({
                  defaultMessage: 'Start Date',
                  id: 'QirE3M',
                }),
                dataIndex: 'startDate',
                render: (value: Moment) =>
                  value ? value.format('DD/MM/YYYY') : undefined,
              },
              {
                key: 'endDate',
                title: intl.formatMessage({
                  defaultMessage: 'End Date',
                  id: 'T4GOiX',
                }),
                dataIndex: 'endDate',
                render: (value: Moment) =>
                  value ? value.format('DD/MM/YYYY') : undefined,
              },
              {
                key: 'fineValue',
                title: intl.formatMessage({
                  defaultMessage: 'Fine Value',
                  id: 'l2lAwm',
                }),
                dataIndex: 'fineValue',
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
              key: ban.id,
              item: ban,
              description: ban.description,
              type: ban.type,
              months: ban.months,
              endDate: ban.endDate,
              fineValue: ban.fineValue,
              startDate: ban.startDate,
            }))}
          />
        ) : (
          <Row justify="center">
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                emptyDescription ||
                intl.formatMessage({
                  defaultMessage: 'No exclusions added yet.',
                  id: '8SBPZ4',
                })
              }
              // style={{ marginLeft: 50 }}
            />
          </Row>
        )}
      </Card>
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Add Exclusion',
          id: 'QPeZMN',
        })}
        open={addExclusion}
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
        open={editExclusion}
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
