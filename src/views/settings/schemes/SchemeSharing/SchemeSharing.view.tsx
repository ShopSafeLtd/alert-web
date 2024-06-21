import React from 'react';
import { Col, Row, Typography, Card, Button, Drawer, Table } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/pro-light-svg-icons';
import ConnectScheme from '#/components/form-components/ConnectScheme/ConnectScheme';
import { createUseStyles } from 'react-jss';
import type { SchemeSharingQuery } from '#/views/settings/schemes/SchemeSharing/graphql/scheme-sharing.generated';

const { Title, Text } = Typography;
const useStyles = createUseStyles({
  schemes: {
    marginTop: 20,
  },
});

interface Props {
  data: SchemeSharingQuery | undefined;
  loading: boolean;
  connectOpen: boolean;
  toggleDrawerOpen: () => void;
  onUnlink: (id: string) => void;
}

const SchemeDetail = ({
  data,
  loading,
  toggleDrawerOpen,
  connectOpen,
  onUnlink,
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
        <Row style={{ marginBottom: 10 }} align="middle">
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
              size="small"
              columns={[
                {
                  dataIndex: 'name',
                  key: 'name',
                  title: 'Name',
                },
                {
                  dataIndex: 'actions',
                  key: 'actions',
                  title: '',
                  width: 150,
                  render: (_, item: { key: string }) => (
                    <Button onClick={() => onUnlink(item.key)}>
                      <FormattedMessage defaultMessage="Unlink" />
                    </Button>
                  ),
                },
              ]}
              dataSource={data?.scheme.connectedToSchemes.map((scheme) => ({
                key: scheme.id,
                name: scheme.name,
              }))}
            />
          </div>
        )}
      </Card>

      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Connect Scheme',
        })}
        visible={connectOpen}
        onClose={toggleDrawerOpen}
        width={500}
        bodyStyle={{ padding: 0 }}
      >
        <ConnectScheme
          onClose={toggleDrawerOpen}
          connectedScheme={
            data?.scheme.connectedToSchemes.map(({ id }) => id) || []
          }
        />
      </Drawer>
    </div>
  );
};
export default SchemeDetail;
