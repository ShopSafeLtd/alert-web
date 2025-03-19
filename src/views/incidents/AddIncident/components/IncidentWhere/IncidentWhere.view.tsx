/* eslint-disable formatjs/no-literal-string-in-jsx */
import type { LocationData } from 'types/DataType';

import {
  currentSchemeBusinessesAtom,
  isAdminAtom,
} from '#/providers/SchemeProvider/SchemeProvider';
import { faPlus, faTrash } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Col, Form, Row, Typography } from 'antd';
import DebounceSelect from 'components/form-components/DebounceSelect';
import { useAtomValue } from 'jotai';
import React from 'react';
import { useIntl } from 'react-intl';

import useStyles from '../../AddIncident.styles';

const { Paragraph, Text, Title } = Typography;

interface Props {
  hideField: boolean;
  newAddressData: LocationData | undefined;
  onSearchBusiness: (
    value: string
  ) => Promise<{ label: React.ReactNode; value: string }[]>;
  onSelectedBusiness: (value: string) => void;
  saving: boolean;
  showSiteNumber: boolean;
  toggleAddNewAddress: () => void;
  updateNewAddressData: (value: LocationData | undefined) => void;
}

const IncidentWhere = ({
  hideField,
  newAddressData,
  onSearchBusiness,
  onSelectedBusiness,
  saving,
  showSiteNumber,
  toggleAddNewAddress,
  updateNewAddressData,
}: Props) => {
  const classes = useStyles();
  const isAdmin = useAtomValue(isAdminAtom);
  const multipleBusiness = useAtomValue(currentSchemeBusinessesAtom).length > 1;

  const intl = useIntl();

  const showBusinessSection = isAdmin || multipleBusiness;

  return showBusinessSection ? (
    <Card
      className={classes.card}
      style={hideField ? { display: 'none' } : undefined}
    >
      <Row align="bottom" style={{ marginBottom: 20 }}>
        <Col>
          <Title level={4} style={{ marginBottom: 0, marginLeft: 5 }}>
            {intl.formatMessage(
              {
                defaultMessage: 'Where did this incident happen?',
              },
              {}
            )}
          </Title>
        </Col>
        <Col>
          <Paragraph
            italic
            style={{ marginBottom: 1, marginLeft: 5 }}
            type="secondary"
          >
            {intl.formatMessage(
              {
                defaultMessage:
                  '- Select the business that this incident relates to.',
              },
              {}
            )}
          </Paragraph>
        </Col>
      </Row>
      <Row>
        <Col span={16}>
          <Row align="middle" gutter={64}>
            <Col>
              <Row>
                <Col>
                  <Form.Item
                    label={intl.formatMessage(
                      { defaultMessage: 'Business' },
                      {}
                    )}
                    name="business"
                  >
                    <DebounceSelect
                      allowClear
                      disabled={saving}
                      fetchOptions={onSearchBusiness}
                      onSelect={({ value }) => {
                        console.log(value);
                        onSelectedBusiness(value as string);
                      }}
                      placeholder={intl.formatMessage(
                        {
                          defaultMessage: 'Search for a business...',
                        },
                        {}
                      )}
                      showSearch
                      style={{ width: 300 }}
                    />
                  </Form.Item>
                </Col>
                {!showSiteNumber && (
                  <Col>
                    <Button
                      icon={
                        <FontAwesomeIcon
                          icon={faPlus}
                          style={{ marginRight: 5 }}
                        />
                      }
                      onClick={toggleAddNewAddress}
                      style={{ marginLeft: 5, marginTop: 30 }}
                    >
                      {intl.formatMessage({
                        defaultMessage: 'Use An Address',
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
                {intl.formatMessage({ defaultMessage: 'Location:' }, {})}
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
                icon={<FontAwesomeIcon icon={faTrash} />}
                onClick={() => updateNewAddressData(undefined)}
                style={{ marginLeft: 5 }}
              />
            </Col>
          </Row>
        </>
      )}
    </Card>
  ) : (
    <div />
  );
};

export default IncidentWhere;
