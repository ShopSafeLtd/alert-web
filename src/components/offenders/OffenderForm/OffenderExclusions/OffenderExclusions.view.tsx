import type { Moment } from 'moment';
import type { BanData } from 'types/DataType';

import {
  faPenToSquare,
  faPlus,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Col, Drawer, Empty, Row, Table, Typography } from 'antd';
import AddExclusion from 'components/form-components/offender/exclusion/AddExclusion';
import EditExclusion from 'components/form-components/offender/exclusion/EditExclusion';
import React from 'react';
import { useIntl } from 'react-intl';

const { Paragraph, Text, Title } = Typography;

interface BanType extends BanData {
  deleted?: boolean;
  new?: boolean;
  updated?: boolean;
}

interface TableItem {
  description: null | string | undefined;
  duration?: null | number;
  endDate?: Date;
  fineValue?: null | number;
  item: BanType;
  key: string;
  months?: null | number;
  startDate?: Date;
}

interface Props {
  addExclusion: boolean;
  banData: BanType | null;
  bansData: BanType[];
  deleteConfirm: (value: string) => void;
  editExclusion: boolean;
  emptyDescription?: string;
  onAddExclusion: (value: BanData) => void;
  onUpdateExclusion: (value: BanData) => void;
  saving: boolean;
  setBanData: (value: BanType) => void;
  titleOrder: number;
  toggleAddExclusion: () => void;
  toggleEditExclusion: () => void;
}

const OffenderExclusions = ({
  addExclusion,
  banData,
  bansData,
  deleteConfirm,
  editExclusion,
  emptyDescription,
  onAddExclusion,
  onUpdateExclusion,
  saving,
  setBanData,
  titleOrder,
  toggleAddExclusion,
  toggleEditExclusion,
}: Props): JSX.Element => {
  const intl = useIntl();

  const expandedRowRender = (record: TableItem) => (
    <Text style={{ fontSize: 14, margin: 0, padding: 0 }}>
      {intl.formatMessage(
        { defaultMessage: 'Description: {description}' },
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
            <Title level={4} style={{ marginBottom: 0 }}>
              {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
              {`${titleOrder}.`}
            </Title>
          </Col>
          <Col>
            <Title level={4} style={{ marginBottom: 0, marginLeft: 5 }}>
              {intl.formatMessage({
                defaultMessage: 'Outcomes',
              })}
            </Title>
          </Col>
          <Col style={{ marginRight: 5 }}>
            <Paragraph
              italic
              style={{ marginBottom: 1, marginLeft: 5 }}
              type="secondary"
            >
              {intl.formatMessage({
                defaultMessage:
                  '- Create outcomes for this offender to exclude them from areas or premises.',
              })}
            </Paragraph>
          </Col>
          <Col>
            <Button
              disabled={saving}
              icon={
                <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />
              }
              onClick={toggleAddExclusion}
              style={{ color: 'red', marginLeft: 15, marginTop: -30 }}
            >
              {intl.formatMessage({
                defaultMessage: 'Add Outcome',
              })}
            </Button>
          </Col>
        </Row>

        {bansData && bansData.length > 0 ? (
          <Table
            columns={[
              {
                dataIndex: 'type',
                key: 'type',
                title: intl.formatMessage({
                  defaultMessage: 'Type',
                }),
              },
              {
                dataIndex: 'months',
                key: 'months',
                title: intl.formatMessage({
                  defaultMessage: 'Duration',
                }),
              },
              {
                dataIndex: 'startDate',
                key: 'startDate',
                // eslint-disable-next-line
                render: (value: Moment) =>
                  value ? value.format('DD/MM/YYYY') : undefined,
                title: intl.formatMessage({
                  defaultMessage: 'Start Date',
                }),
              },
              {
                dataIndex: 'endDate',
                key: 'endDate',
                // eslint-disable-next-line
                render: (value: Moment) =>
                  value ? value.format('DD/MM/YYYY') : undefined,
                title: intl.formatMessage({
                  defaultMessage: 'End Date',
                }),
              },
              {
                dataIndex: 'duration',
                key: 'duration',
                title: intl.formatMessage({
                  defaultMessage: 'Duration',
                }),
              },
              {
                dataIndex: 'fineValue',
                key: 'fineValue',
                title: intl.formatMessage({
                  defaultMessage: 'Fine Value',
                }),
              },
              {
                dataIndex: 'Edit',
                key: 'Edit',
                render: (_, record) => (
                  <Button
                    disabled={saving}
                    icon={<FontAwesomeIcon icon={faPenToSquare} />}
                    onClick={() => {
                      setBanData(record.item);
                      toggleEditExclusion();
                    }}
                  />
                ),
                title: intl.formatMessage({
                  defaultMessage: 'Edit',
                }),
                width: 50,
              },
              {
                dataIndex: 'Delete',
                key: 'Delete',
                render: (_, record) => (
                  <Button
                    disabled={saving}
                    icon={<FontAwesomeIcon icon={faTrash} />}
                    onClick={() => {
                      deleteConfirm(record.key || '');
                    }}
                  />
                ),
                title: intl.formatMessage({
                  defaultMessage: 'Delete',
                }),
                width: 60,
              },
            ]}
            dataSource={bansData.map((ban) => ({
              description: ban.description,
              duration: ban.duration,
              endDate: ban.endDate,
              fineValue: ban.fineValue,
              item: ban,
              key: ban.id,
              months: ban.months,
              startDate: ban.startDate,
              type: ban.type,
            }))}
            expandable={{
              expandedRowRender,
              rowExpandable: (record) => !!record.description,
            }}
            pagination={{
              defaultPageSize: 20,
              hideOnSinglePage: true,
              pageSize: 20,
            }}
            size="small"
          />
        ) : (
          <Row justify="center">
            <Empty
              description={
                emptyDescription ||
                intl.formatMessage({
                  defaultMessage: 'No exclusions added yet.',
                })
              }
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              // style={{ marginLeft: 50 }}
            />
          </Row>
        )}
      </Card>
      <Drawer
        onClose={toggleAddExclusion}
        open={addExclusion}
        title={intl.formatMessage({
          defaultMessage: 'Add Exclusion',
        })}
        width="400"
      >
        {addExclusion ? (
          <AddExclusion onClose={toggleAddExclusion} update={onAddExclusion} />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={toggleEditExclusion}
        open={editExclusion}
        title={intl.formatMessage({
          defaultMessage: 'Edit Exclusion',
        })}
        width="400"
      >
        {editExclusion ? (
          <EditExclusion
            banData={banData}
            onClose={toggleEditExclusion}
            update={onUpdateExclusion}
          />
        ) : (
          <div />
        )}
      </Drawer>
    </>
  );
};

export default OffenderExclusions;
