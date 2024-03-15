import React from 'react';
import DebouncedInput from '#/utils/debounced-input';
import CheckTags from '#/components/form-components/check-tags/CheckTags.view';
import { Button, Card, Col, Row, Tooltip } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/pro-light-svg-icons';
import { useIntl } from 'react-intl';

const SearchRow = () => {
  const intl = useIntl();
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
          />
        </Col>
        <Col flex={1}>
          <CheckTags
            mode="check"
            noGutter
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
            <Button icon={<FontAwesomeIcon icon={faFilter} size="lg" />} />
          </Tooltip>
        </Col>
        <Col>
          <Button size="small" type="ghost">
            {intl.formatMessage({
              id: 'E2rh1p',
              defaultMessage: 'Buttons',
            })}
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default SearchRow;
