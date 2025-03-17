import CheckTags from '#/components/form-components/check-tags/CheckTags.view';
import DebouncedInput from '#/utils/debounced-input';
import { faFilter } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Col, Row, Tooltip } from 'antd';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import React from 'react';
import { useIntl } from 'react-intl';

const SearchRow = () => {
  const intl = useIntl();
  return (
    <Card bodyStyle={{ padding: 10 }} style={{ marginBottom: 10 }}>
      <Row align="middle" gutter={12}>
        <Col span={4} xxl={6}>
          <DebouncedInput
            allowClear
            placeholder={intl.formatMessage({
              defaultMessage: 'Search for anything in alert...',
            })}
            size="small"
            // value={search}
          />
        </Col>
        <Col flex={1}>
          <CheckTags
            mode="check"
            noGutter
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
          />
        </Col>
        <Col>
          <Tooltip
            title={intl.formatMessage({
              defaultMessage: 'Sort & Filter',
            })}
          >
            <Button icon={<FontAwesomeIcon icon={faFilter} size="lg" />} />
          </Tooltip>
        </Col>
        <Col>
          <Button size="small" type="ghost">
            {intl.formatMessage({
              defaultMessage: 'Buttons',
            })}
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default SearchRow;
