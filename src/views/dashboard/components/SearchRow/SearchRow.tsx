import CheckTags from '#/components/form-components/check-tags/CheckTags.view';
import DebouncedInput from '#/utils/debounced-input';
import { useDashboardContext } from '#/views/dashboard/Dashboard.context';
import {
  faExclamationCircle,
  faFilter,
  faNewspaper,
  faUsers,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Col, Row, Tooltip } from 'antd';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import React from 'react';
import { Link } from 'react-router-dom';

const SearchRow = () => {
  const {
    adminRights,
    intl,
    setGallery,
    setSearch,
    toggleSortFilter,
    variables: { gallery },
  } = useDashboardContext();
  return (
    <Card bodyStyle={{ padding: 10 }} style={{ marginBottom: 10 }}>
      <Row align="middle" gutter={12}>
        <Col span={4} xxl={6}>
          <DebouncedInput
            allowClear
            // value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={intl.formatMessage({
              defaultMessage: 'Search for anything in alert...',
            })}
            size="small"
          />
        </Col>
        <Col flex={1}>
          <CheckTags
            mode="check"
            noGutter
            onChange={setGallery}
            options={[
              {
                label: intl.formatMessage({
                  defaultMessage: 'Not Approved',
                }),
                permissions: [
                  {
                    method: PermissionMethod.Approve,
                    model: PermissionModel.Incidents,
                  },
                  {
                    method: PermissionMethod.Approve,
                    model: PermissionModel.Offenders,
                  },
                ],
                value: 'NOT APPROVED',
              },
              {
                label: intl.formatMessage({
                  defaultMessage: 'Following',
                }),
                value: 'FOLLOWING',
              },
              {
                label: intl.formatMessage({
                  defaultMessage: 'My Data',
                }),
                value: 'MYDATA',
              },
            ]}
            value={gallery}
          />
        </Col>
        <Col>
          <Tooltip
            title={intl.formatMessage({
              defaultMessage: 'Sort & Filter',
            })}
          >
            <Button
              icon={<FontAwesomeIcon icon={faFilter} size="lg" />}
              onClick={toggleSortFilter}
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
