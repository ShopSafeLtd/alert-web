import React from 'react';
import DebouncedInput from '#/utils/debounced-input';
import CheckTags from '#/components/form-components/check-tags/CheckTags.view';
import { useDashboardContext } from '#/views/dashboard/Dashboard.context';
import { Button, Card, Col, Row, Tooltip } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExclamationCircle,
  faFilter,
  faNewspaper,
  faUsers,
} from '@fortawesome/pro-light-svg-icons';
import { Link } from 'react-router-dom';

const SearchRow = () => {
  const {
    intl,
    setGallery,
    variables: { gallery },
    setSearch,
    toggleSortFilter,
    adminRights,
  } = useDashboardContext();
  return (
    <Card bodyStyle={{ padding: 10 }} style={{ marginBottom: 10 }}>
      <Row align="middle" gutter={12}>
        <Col span={4} xxl={6}>
          <DebouncedInput
            size="small"
            placeholder={intl.formatMessage({
              defaultMessage: 'Search for anything in alert...',
              id: 'FZ9gwb',
            })}
            allowClear
            // value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col flex={1}>
          <CheckTags
            mode="check"
            noGutter
            value={gallery}
            onChange={setGallery}
            options={[
              {
                label: intl.formatMessage({
                  id: 'VwMCyX',
                  defaultMessage: 'Not Approved',
                }),
                value: 'NOT APPROVED',
                needAdminRight: true,
              },
              {
                label: intl.formatMessage({
                  id: 'cPIKU2',
                  defaultMessage: 'Following',
                }),
                value: 'FOLLOWING',
              },
              {
                label: intl.formatMessage({
                  id: 'dr0ueW',
                  defaultMessage: 'My Data',
                }),
                value: 'MYDATA',
              },
            ]}
          />
        </Col>
        <Col>
          <Tooltip
            title={intl.formatMessage({
              defaultMessage: 'Sort & Filter',
              id: 'f2g3SM',
            })}
          >
            <Button
              onClick={toggleSortFilter}
              icon={<FontAwesomeIcon icon={faFilter} size="lg" />}
            />
          </Tooltip>
        </Col>
        <Col>
          <Link to="/app/incidents/add">
            <Button size="small" type="primary">
              <FontAwesomeIcon
                icon={faExclamationCircle}
                style={{ marginRight: 10 }}
              />
              {intl.formatMessage({
                id: 'kG1p3q',
                defaultMessage: 'Add Incident',
              })}
            </Button>
          </Link>
        </Col>
        <Col>
          <Link to="/app/offenders/add">
            <Button size="small" type="primary">
              <FontAwesomeIcon icon={faUsers} style={{ marginRight: 10 }} />
              {intl.formatMessage({
                id: 'm3ChN4',
                defaultMessage: 'Add Offender',
              })}
            </Button>
          </Link>
        </Col>

        {adminRights && (
          <Col>
            <Link to="/app/article/add">
              <Button size="small" type="primary">
                <FontAwesomeIcon
                  icon={faNewspaper}
                  style={{ marginRight: 10 }}
                />
                {intl.formatMessage({
                  id: 'x52+I1',
                  defaultMessage: 'Add Bulletin',
                })}
              </Button>
            </Link>
          </Col>
        )}
      </Row>
    </Card>
  );
};

export default SearchRow;
