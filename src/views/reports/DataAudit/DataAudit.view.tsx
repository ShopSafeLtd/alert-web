import type { ListOffendersAllSchemesQuery } from 'graphql/offenders/queries/__generated__/list-offenders-all-schemes.generated';
import type { ImagePosition } from 'graphql/types';

import {
  faEye,
  faFilter,
  faPenToSquare,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Drawer, Input, Row, Table, Tooltip } from 'antd';
import AddJustification from 'components/form-components/offender/AddJustification';
import WatermarkImageView from 'components/images/WatermarkImage.view';
import OffenderFilter from 'components/offenders/OffenderFilter';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import useStyles from './DataAudit.styles';

interface Props {
  data:
    | Exclude<
        ListOffendersAllSchemesQuery['listOffendersAllSchemes'],
        null | undefined
      >
    | null
    | undefined;
  loading: boolean;
  offenderId: string;
  search: string;
  setOffenderId: (id: string) => void;
  setSearch: (value: string) => void;
  sortFilter: boolean;
  toggleSortFilter: () => void;
}

const DataAudit = ({
  data,
  loading,
  offenderId,
  search,
  setOffenderId,
  setSearch,
  sortFilter,
  toggleSortFilter,
}: Props) => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <div className={classes.page}>
      <Row className={classes.headerRow} gutter={16}>
        <Col flex={1}>
          <Input
            allowClear
            className={classes.searchInput}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={intl.formatMessage({
              defaultMessage: 'Search Offenders...',
            })}
            value={search}
          />
        </Col>
        <Col>
          <Button
            icon={
              <FontAwesomeIcon
                icon={faFilter}
                size="lg"
                style={{ marginRight: 5 }}
              />
            }
            onClick={toggleSortFilter}
          >
            {intl.formatMessage({
              defaultMessage: 'Sort & Filter',
            })}
          </Button>
        </Col>
        <Col>
          <Link to="/app/offenders/add">
            <Button type="primary">
              {intl.formatMessage({
                defaultMessage: 'Create Offender',
              })}
            </Button>
          </Link>
        </Col>
      </Row>
      <Table
        columns={[
          {
            dataIndex: 'images',
            key: 'images',
            render: (
              item: {
                optimised?: null | string | undefined;
                position: ImagePosition | undefined;
                rotation: number | undefined;
              }[]
            ) => (
              <div style={{ height: 100, width: 80 }}>
                <WatermarkImageView
                  position={item[0]?.position}
                  rotation={item[0]?.rotation}
                  url={item[0]?.optimised}
                />
              </div>
            ),
            title: '',
          },
          {
            dataIndex: 'reference',
            key: 'reference',
            render: (
              _,
              record: { key: string; reference: null | number | undefined }
            ) => (
              <Link to={`/app/offenders/view/${record.key}`}>
                {record.reference}
              </Link>
            ),
            title: intl.formatMessage({
              defaultMessage: 'Alert ID',
            }),
            width: 80,
          },

          {
            dataIndex: 'name',
            key: 'name',
            title: intl.formatMessage({ defaultMessage: 'Name' }),
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
            dataIndex: 'Options',
            key: 'Options',
            render: (_, record) => (
              <Row gutter={8}>
                <Col>
                  <Tooltip
                    title={intl.formatMessage({
                      defaultMessage: 'View Offender',
                    })}
                  >
                    <Link to={`/app/offenders/view/${record.key}`}>
                      <Button
                        // disabled={saving}
                        icon={<FontAwesomeIcon icon={faEye} />}
                        size="small"
                      />
                    </Link>
                  </Tooltip>
                </Col>

                <Col>
                  <Tooltip
                    title={intl.formatMessage({
                      defaultMessage: 'Add Justification',
                    })}
                  >
                    <Button
                      icon={<FontAwesomeIcon icon={faPenToSquare} />}
                      // disabled={saving}
                      onClick={() => {
                        if (record?.key) setOffenderId(record?.key);
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
        dataSource={
          data?.offenders?.map((offender) => ({
            //     : getOffenderBuild(offender.build),
            images: offender.images,
            key: offender.id,
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
            offender,
            reference: offender.reference,
          })) || []
        }
        loading={loading}
        pagination={{
          hideOnSinglePage: true,
          pageSize: 10,
        }}
        size="small"
      />
      <Drawer
        onClose={toggleSortFilter}
        open={sortFilter}
        title={intl.formatMessage({
          defaultMessage: 'Offender Filters',
        })}
        width={500}
      >
        <OffenderFilter />
      </Drawer>
      <Drawer
        onClose={() => setOffenderId('')}
        open={!!offenderId}
        title={intl.formatMessage({
          defaultMessage: 'Add Justification for Offender',
        })}
        width="400"
      >
        {offenderId ? (
          <AddJustification
            offenderId={offenderId}
            onClose={() => setOffenderId('')}
          />
        ) : (
          <div />
        )}
      </Drawer>
    </div>
  );
};

export default DataAudit;
