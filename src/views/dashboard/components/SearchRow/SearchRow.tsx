import PermissionCheckWrapper from '#/components/PermissionCheck/PermissionCheckWrapper';
import DateSelect from '#/components/reports/DateSelect/DateSelect.view';
import { useDashboardContext } from '#/views/dashboard/Dashboard.context';
import {
  faExclamationCircle,
  faNewspaper,
  faUsers,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Col, Row } from 'antd';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import React from 'react';
import { Link } from 'react-router-dom';

const SearchRow = () => {
  const { adminRights, intl, setCreatedAtFilter } = useDashboardContext();
  return (
    <Card bodyStyle={{ padding: 10 }}>
      <Row align="middle" gutter={12}>
        <Col flex={1}>
          <DateSelect
            defaultRange="last30Days"
            onChange={(value) => setCreatedAtFilter(value ?? undefined)}
          />
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
