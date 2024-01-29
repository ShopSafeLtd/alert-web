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
  saving: boolean;
  onSearchBusiness: (
    value: string
  ) => Promise<{ label: React.ReactNode; value: string }[]>;
  toggleAddNewAddress: () => void;
  newAddressData: LocationData | undefined;
  updateNewAddressData: (value: LocationData | undefined) => void;
  hideField: boolean;
  onSelectedBusiness: (value: string) => void;
  showSiteNumber: boolean;
}

const IncidentWhere = ({
  saving,
  toggleAddNewAddress,
  onSearchBusiness,
  newAddressData,
  updateNewAddressData,
  hideField,
  onSelectedBusiness,
  showSiteNumber,
}: Props) => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <Card
      className={classes.card}
      style={hideField ? { display: 'none' } : undefined}
    >
      <Row align="bottom" style={{ marginBottom: 20 }}>
        <Col>
          <Title style={{ marginBottom: 0, marginLeft: 5 }} level={4}>
            {intl.formatMessage(
              {
                defaultMessage: 'Where did this incident happen?',
                id: 'MUuc1b',
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
                  '- Select the business that this incident relates to.',
                id: '0Q4UI4',
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
                      onSelect={({ value }) => {
                        console.log(value);
                        onSelectedBusiness(value as string);
                      }}
                    />
                  </Form.Item>
                </Col>
                {!showSiteNumber && (
                  <Col>
                    <Button
                      style={{ marginLeft: 5, marginTop: 30 }}
                      onClick={toggleAddNewAddress}
                      icon={
                        <FontAwesomeIcon
                          icon={faPlus}
                          style={{ marginRight: 5 }}
                        />
                      }
                    >
                      {intl.formatMessage({
                        defaultMessage: 'Use An Address',
                        id: 'Fbk02A',
                      })}
                    </Button>
                    {/* <Dropdown
                    overlay={
                      <Menu
                        items={[
                          {
                            key: 0,
                            label: (
                              <FormattedMessage
                                id="BFQcBO"
                                defaultMessage="Pin on Map"
                              />
                            ),
                            onClick: () => togglePinNewAddress(),
                            icon: <FontAwesomeIcon icon={faLocationDot} />,
                          },
                          {
                            key: 1,
                            label: (
                              <FormattedMessage
                                id="HE6RQ/"
                                defaultMessage="Enter Manually"
                              />
                            ),
                            onClick: () => toggleAddNewAddress(),
                            icon: <FontAwesomeIcon icon={faLocationPen} />,
                          },
                        ]}
                      />
                    }
                    placement="bottomRight"
                    arrow={{ pointAtCenter: true }}
                  >
                    <Button
                      style={{ marginLeft: 5, marginTop: 30 }}
                      icon={
                        <FontAwesomeIcon
                          icon={faPlus}
                          style={{ marginRight: 5 }}
                        />
                      }
                    >
                      {intl.formatMessage({
                        defaultMessage: 'Use An Address',
                        id: 'Fbk02A',
                      })}
                    </Button>
                  </Dropdown> */}
                  </Col>
                )}
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
              {newAddressData?.postcode ? (
                <Text>
                  {newAddressData?.building && `${newAddressData?.building}, `}
                  {newAddressData?.street && `${newAddressData?.street}, `}
                  {newAddressData?.townCity && `${newAddressData?.townCity}, `}
                  {newAddressData?.county && `${newAddressData?.county}, `}
                  {newAddressData?.postcode}
                </Text>
              ) : (
                <Text>
                  {newAddressData?.geoLng &&
                    `Longitude: ${newAddressData?.geoLng}, `}
                  {newAddressData?.geoLat &&
                    `Latitude: ${newAddressData?.geoLat}`}
                </Text>
              )}
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
