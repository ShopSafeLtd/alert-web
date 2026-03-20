import PermissionCheckWrapper from '#/components/PermissionCheck/PermissionCheckWrapper';
import CheckTags from '#/components/form-components/check-tags/CheckTags.view';
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
    toggleSortFilter,
    variables: { gallery },
  } = useDashboardContext();
  return (
    <Card bodyStyle={{ padding: 10 }}>
      <Row align="middle" gutter={12}>
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
        <PermissionCheckWrapper
          permission={{
            method: PermissionMethod.Write,
            model: PermissionModel.Incidents,
          }}
          unauthorizedElement={<div />}
        >
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
        </PermissionCheckWrapper>
        <PermissionCheckWrapper
          permission={{
            method: PermissionMethod.Write,
            model: PermissionModel.Offenders,
          }}
          unauthorizedElement={<div />}
        >
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
        </PermissionCheckWrapper>
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
