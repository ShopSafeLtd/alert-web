import React from 'react';
import { Button, Col, Drawer, Input, Row, Table, Tooltip } from 'antd';
import type {
  ImagePosition,
  ListOffendersAllSchemesQuery,
} from 'graphql/generated';

import { useIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import WatermarkImageView from 'components/images/WatermarkImage.view';
import {
  faEye,
  faFilter,
  faPenToSquare,
} from '@fortawesome/pro-light-svg-icons';
import AddJustification from 'components/form-components/offender/AddJustification';
import OffenderFilter from 'components/offenders/OffenderFilter';
import useStyles from './DataAudit.styles';

interface Props {
  loading: boolean;
  data:
    | Exclude<
        ListOffendersAllSchemesQuery['listOffendersAllSchemes'],
        undefined | null
      >
    | null
    | undefined;
  offenderId: string;
  setOffenderId: (id: string) => void;
  search: string;
  setSearch: (value: string) => void;
  sortFilter: boolean;
  toggleSortFilter: () => void;
}

const DataAudit = ({
  data,
  loading,
  offenderId,
  setOffenderId,
  search,
  setSearch,
  toggleSortFilter,
  sortFilter,
}: Props) => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <div className={classes.page}>
      <Row gutter={16} className={classes.headerRow}>
        <Col flex={1}>
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            allowClear
            className={classes.searchInput}
            placeholder={intl.formatMessage({
              defaultMessage: 'Search Offenders...',
              id: 'mCDjFM',
            })}
          />
        </Col>
        <Col>
          <Button
            onClick={toggleSortFilter}
            icon={
              <FontAwesomeIcon
                icon={faFilter}
                size="lg"
                style={{ marginRight: 5 }}
              />
            }
          >
            {intl.formatMessage({
              defaultMessage: 'Sort & Filter',
              id: 'f2g3SM',
            })}
          </Button>
        </Col>
        <Col>
          <Link to="/app/offenders/add">
            <Button type="primary">
              {intl.formatMessage({
                defaultMessage: 'Create Offender',
                id: 'nkYLl6',
              })}
            </Button>
          </Link>
        </Col>
      </Row>
      <Table
        size="small"
        loading={loading}
        columns={[
          {
            key: 'images',
            dataIndex: 'images',
            title: '',
            render: (
              item: {
                position: ImagePosition | undefined;
                rotation: number | undefined;
                optimised?: string | null | undefined;
              }[]
            ) => (
              <div style={{ height: 100, width: 80 }}>
                <WatermarkImageView
                  url={item[0]?.optimised}
                  rotation={item[0]?.rotation}
                  position={item[0]?.position}
                />
              </div>
            ),
          },
          {
            key: 'reference',
            dataIndex: 'reference',
            title: intl.formatMessage({
              id: 'k8ZNgH',
              defaultMessage: 'Alert ID',
            }),
            width: 80,
            render: (
              _,
              record: { key: string; reference: number | null | undefined }
            ) => (
              <Link to={`/app/offenders/view/${record.key}`}>
                {record.reference}
              </Link>
            ),
          },

          {
            title: intl.formatMessage({ id: 'HAlOn1', defaultMessage: 'Name' }),
            dataIndex: 'name',
            key: 'name',
          },
          // {
          //   title: intl.formatMessage({
          //     id: 'm8/n8c',
          //     defaultMessage: 'Gender',
          //   }),
          //   dataIndex: 'gender',
          //   key: 'gender',
          // },
          // {
          //   title: intl.formatMessage({
          //     id: 'XtCAFo',
          //     defaultMessage: 'Ethnicity',
          //   }),
          //   dataIndex: 'ethnicity',
          //   key: 'ethnicity',
          // },
          // {
          //   title: intl.formatMessage({ id: '9oNQSC', defaultMessage: 'Age' }),
          //   dataIndex: 'age',
          //   key: 'age',
          // },
          // {
          //   title: intl.formatMessage({
          //     id: 'RSctv1',
          //     defaultMessage: 'Build',
          //   }),
          //   dataIndex: 'build',
          //   key: 'build',
          // },
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
                      defaultMessage: 'View Offender',
                      id: 'GszQTo',
                    })}
                  >
                    <Link to={`/app/offenders/view/${record.key}`}>
                      <Button
                        size="small"
                        // disabled={saving}
                        icon={<FontAwesomeIcon icon={faEye} />}
                      />
                    </Link>
                  </Tooltip>
                </Col>

                <Col>
                  <Tooltip
                    title={intl.formatMessage({
                      defaultMessage: 'Add Justification',
                      id: 'nf5k+D',
                    })}
                  >
                    <Button
                      size="small"
                      // disabled={saving}
                      onClick={() => {
                        if (record?.key) setOffenderId(record?.key);
                      }}
                      icon={<FontAwesomeIcon icon={faPenToSquare} />}
                    />
                  </Tooltip>
                </Col>
              </Row>
            ),
          },
        ]}
        dataSource={
          data?.offenders?.map((offender) => ({
            key: offender.id,
            reference: offender.reference,
            name: offender.name,
            // gender:
            //   getOffenderGender(offender.gender) === 'Unknown'
            //     ? ''
            //     : getOffenderGender(offender.gender),
            // ethnicity:
            //   getOffenderRace(offender.race, true) === 'Unknown'
            //     ? ''
            //     : getOffenderRace(offender.race, true),
            // age: getAgeValue(offender),
            // build:
            //   getOffenderBuild(offender.build) === 'Unknown'
            //     ? ''
            //     : getOffenderBuild(offender.build),
            images: offender.images,
            offender,
          })) || []
        }
        pagination={{
          hideOnSinglePage: true,
          pageSize: 10,
        }}
      />
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Offender Filters',
          id: 'gxEHRQ',
        })}
        open={sortFilter}
        onClose={toggleSortFilter}
        width={500}
      >
        <OffenderFilter />
      </Drawer>
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Add Justification for Offender',
          id: 'l+lhch',
        })}
        open={!!offenderId}
        width="400"
        onClose={() => setOffenderId('')}
      >
        {offenderId ? (
          <AddJustification
            onClose={() => setOffenderId('')}
            offenderId={offenderId}
          />
        ) : (
          <div />
        )}
      </Drawer>
    </div>
  );
};

export default DataAudit;
