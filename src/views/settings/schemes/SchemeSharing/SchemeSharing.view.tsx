import type { SchemeSharingQuery } from '#/views/settings/schemes/SchemeSharing/graphql/__generated__/scheme-sharing.generated';

import ConnectScheme from '#/components/form-components/ConnectScheme/ConnectScheme';
import { faAdd } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Col, Drawer, Row, Table, Typography } from 'antd';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';

const { Text, Title } = Typography;
const useStyles = createUseStyles({
  schemes: {
    marginTop: 20,
  },
});

interface Props {
  connectOpen: boolean;
  data: SchemeSharingQuery | undefined;
  loading: boolean;
  onUnlink: (id: string) => void;
  toggleDrawerOpen: () => void;
}

const SchemeDetail = ({
  connectOpen,
  data,
  loading,
  onUnlink,
  toggleDrawerOpen,
}: Props): JSX.Element => {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <div className="list-view">
      <Row style={{ margin: 15 }}>
        <Col>
          <Title level={3}>
            <FormattedMessage defaultMessage="Scheme Sharing Settings" />
          </Title>
        </Col>
      </Row>
      <Card>
        <Row align="middle" style={{ marginBottom: 10 }}>
          <Col flex={1}>
            <Title level={4} style={{ marginBottom: 0 }}>
              <FormattedMessage defaultMessage="Connected Schemes" />
            </Title>
          </Col>
          <Col>
            <Button danger onClick={toggleDrawerOpen}>
              <Row gutter={8}>
                <Col>
                  <FontAwesomeIcon icon={faAdd} />
                </Col>
                <Col>
                  <FormattedMessage defaultMessage="Link Scheme" />
                </Col>
              </Row>
            </Button>
          </Col>
        </Row>
        <Text>
          <FormattedMessage defaultMessage="Conencted schemes allow for sharing of incidents, offenders, vehicles and crime groups where data is shared directly instead of duplicated. This allows you have central data that is avaliable across these connected schemes." />
        </Text>
        {loading ? undefined : (
          <div className={classes.schemes}>
            <Table
              columns={[
                {
                  dataIndex: 'name',
                  key: 'name',
                  title: 'Name',
                },
                {
                  dataIndex: 'actions',
                  key: 'actions',
                  render: (_, item: { key: string }) => (
                    <Button onClick={() => onUnlink(item.key)}>
                      <FormattedMessage defaultMessage="Unlink" />
                    </Button>
                  ),
                  title: '',
                  width: 150,
                },
              ]}
              dataSource={data?.scheme.connectedToSchemes.map((scheme) => ({
                key: scheme.id,
                name: scheme.name,
              }))}
              size="small"
            />
          </div>
        )}
      </Card>

      <Drawer
        bodyStyle={{ padding: 0 }}
        onClose={toggleDrawerOpen}
        title={intl.formatMessage({
          defaultMessage: 'Connect Scheme',
        })}
        visible={connectOpen}
        width={500}
      >
        <ConnectScheme
          connectedScheme={
            data?.scheme.connectedToSchemes.map(({ id }) => id) || []
          }
          onClose={toggleDrawerOpen}
        />
      </Drawer>
    </div>
  );
};
export default SchemeDetail;
