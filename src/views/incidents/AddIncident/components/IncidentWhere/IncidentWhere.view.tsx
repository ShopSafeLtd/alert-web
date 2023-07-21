/* eslint-disable formatjs/no-literal-string-in-jsx */
import React from 'react';
import { Button, Card, Col, Form, Row, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/pro-light-svg-icons';
import DebounceSelect from 'components/form-components/DebounceSelect';
import { useIntl } from 'react-intl';
import type { LocationData } from 'types/DataType';
import useStyles from '../../AddIncident.styles';

const { Title, Paragraph, Text } = Typography;

interface Props {
  formStages: {
    crimeTypes: boolean;
    where: boolean;
    goods: boolean;
    profiles: boolean;
    images: boolean;
    police: boolean;
    details: boolean;
    groups: boolean;
  };
  saving: boolean;
  onSearchBusiness: (
    value: string
  ) => Promise<{ label: React.ReactNode; value: string }[]>;
  toggleAddNewAddress: () => void;
  newAddressData: LocationData | undefined;
  updateNewAddressData: (value: LocationData | undefined) => void;
}

const IncidentWhere = ({
  formStages,
  saving,
  toggleAddNewAddress,
  onSearchBusiness,
  newAddressData,
  updateNewAddressData,
}: Props) => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <Card
      className={classes.card}
      style={{ opacity: formStages.where ? 1 : 0.7 }}
    >
      {!formStages.where && <div className={classes.cardOverlay} />}
      <Row align="bottom" style={{ marginBottom: 20 }}>
        <Col>
          <Title style={{ marginBottom: 0, marginLeft: 5 }} level={4}>
            {intl.formatMessage(
              {
                defaultMessage: 'Where & When did this incident happen?',
                id: 'oY9x8s',
              },
              {}
            )}
          </Title>
        </Col>
        <Col>
          <Paragraph
            style={{ marginBottom: 1, marginLeft: 5 }}
            type="secondary"
            italic
          >
            {intl.formatMessage(
              {
                defaultMessage:
                  '- Select a the business that this incident relates to.',
                id: 'hCXJmL',
              },
              {}
            )}
          </Paragraph>
        </Col>
      </Row>
      <Row>
        <Col span={16}>
          <Row gutter={64} align="middle">
            <Col>
              <Row>
                <Col>
                  <Form.Item
                    name="business"
                    label={intl.formatMessage(
                      { defaultMessage: 'Business', id: 'w1Fanr' },
                      {}
                    )}
                  >
                    <DebounceSelect
                      showSearch
                      allowClear
                      disabled={saving}
                      placeholder={intl.formatMessage(
                        {
                          defaultMessage: 'Search for a business...',
                          id: 'qaJxSS',
                        },
                        {}
                      )}
                      fetchOptions={onSearchBusiness}
                      style={{ width: 300 }}
                    />
                  </Form.Item>
                </Col>
                <Col>
                  <Button
                    style={{ color: 'red', marginLeft: 5, marginTop: 30 }}
                    onClick={toggleAddNewAddress}
                    icon={
                      <FontAwesomeIcon
                        icon={faPlus}
                        style={{ marginRight: 5 }}
                      />
                    }
                  >
                    {intl.formatMessage(
                      { defaultMessage: 'Enter Address', id: 'kGBG2S' },
                      {}
                    )}
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>

      {newAddressData && (
        <>
          <Row gutter={8}>
            <Col>
              <Title level={4} style={{ fontSize: 15, marginTop: 5 }}>
                {intl.formatMessage(
                  { defaultMessage: 'Location:', id: 'A5vVzY' },
                  {}
                )}
              </Title>
            </Col>
          </Row>
          <Row align="middle" gutter={16}>
            <Col>
              <Text>
                {newAddressData?.building && `${newAddressData?.building}, `}
                {`${newAddressData?.street}, `}
                {`${newAddressData?.townCity}, `}
                {newAddressData?.county && `${newAddressData?.county}, `}
                {newAddressData?.postcode}
              </Text>
            </Col>
            <Col className={classes.clearButton}>
              <Button
                style={{ marginLeft: 5 }}
                onClick={() => updateNewAddressData(undefined)}
                icon={<FontAwesomeIcon icon={faTrash} />}
              />
            </Col>
          </Row>
        </>
      )}
    </Card>
  );
};

export default IncidentWhere;
