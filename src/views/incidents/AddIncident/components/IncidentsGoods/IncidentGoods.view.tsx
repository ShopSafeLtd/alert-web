/* eslint-disable react/jsx-props-no-spreading */
import {
  Button,
  Card,
  Col,
  Form,
  InputNumber,
  Row,
  Select,
  Typography,
} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/pro-light-svg-icons';
import React from 'react';
import { useIntl } from 'react-intl';
import type { ListGoodsTypesQuery } from 'graphql/generated';
import useStyles from '../../AddIncident.styles';

const { Paragraph, Title } = Typography;

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
  goodsVisible: boolean;
  dontKnowGoods: () => void;
  knowGoods: () => void;
  goodsTypesData: ListGoodsTypesQuery | undefined;
}

const IncidentGoods = ({
  goodsVisible,
  formStages,
  knowGoods,
  dontKnowGoods,
  goodsTypesData,
}: Props) => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <Card
      className={classes.card}
      style={{ opacity: formStages.goods ? 1 : 0.7 }}
    >
      {!formStages.goods && <div className={classes.cardOverlay} />}
      <Row align="bottom" style={{ marginBottom: 20 }}>
        <Col>
          <Title style={{ marginBottom: 0, marginLeft: 5 }} level={4}>
            {goodsVisible
              ? intl.formatMessage({
                  defaultMessage: 'What goods were involved?',
                  id: '6L5/Qv',
                })
              : intl.formatMessage({
                  defaultMessage: 'Do you know what goods were involved?',
                  id: '+eY3nZ',
                })}
          </Title>
        </Col>
        <Col>
          <Paragraph
            style={{ marginBottom: 1, marginLeft: 5 }}
            type="secondary"
            italic
          >
            {intl.formatMessage({
              defaultMessage:
                '- Please provide information about the lost/recovered goods.',
              id: '3kptQz',
            })}
          </Paragraph>
        </Col>
      </Row>
      {goodsVisible ? (
        <Form.List
          name="goods"
          rules={[
            {
              validator: async (rule, value) => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                if (value && value.length === 0)
                  throw new Error(
                    intl.formatMessage({
                      defaultMessage: 'Something wrong!',
                      id: 'QL7Ixv',
                    })
                  );
              },
            },
          ]}
        >
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }, index) => (
                <Row key={key} gutter={8}>
                  <Col>
                    <Form.Item
                      {...restField}
                      label={
                        index
                          ? ''
                          : intl.formatMessage({
                              defaultMessage: 'Type of Goods',
                              id: 'awr2tc',
                            })
                      }
                      name={[name, 'goodsType']}
                      rules={[
                        {
                          required: index === 0,
                          message: intl.formatMessage({
                            defaultMessage: 'Please enter a type',
                            id: 'pd8FHc',
                          }),
                        },
                      ]}
                    >
                      <Select
                        placeholder={intl.formatMessage({
                          defaultMessage: 'Select goods...',
                          id: 'p4Hiyr',
                        })}
                        style={{ width: 300 }}
                        allowClear
                        options={
                          goodsTypesData?.listGoodsTypes.goodsTypes.map(
                            (goodsType) => ({
                              value: goodsType.id,
                              label: goodsType.name,
                            })
                          ) || []
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item
                      {...restField}
                      name={[name, 'value']}
                      label={
                        index
                          ? ''
                          : intl.formatMessage({
                              defaultMessage: 'Value',
                              id: 'GufXy5',
                            })
                      }
                      rules={[
                        {
                          required: index === 0,
                          message: intl.formatMessage({
                            defaultMessage: 'Please enter a value',
                            id: 'Umf5pG',
                          }),
                        },
                      ]}
                      tooltip={intl.formatMessage({
                        defaultMessage:
                          'The value of the goods involved in the incident, both lost and recovered.',
                        id: 'MPzA66',
                      })}
                    >
                      <InputNumber
                        style={{ width: 150 }}
                        prefix="£"
                        precision={2}
                        min={0}
                      />
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item
                      {...restField}
                      name={[name, 'recoveredValue']}
                      label={
                        index
                          ? ''
                          : intl.formatMessage({
                              defaultMessage: 'Value Recovered',
                              id: 'FqEGSY',
                            })
                      }
                      rules={[
                        {
                          required: index === 0,
                          message: intl.formatMessage({
                            defaultMessage: 'Please enter a value',
                            id: 'Umf5pG',
                          }),
                        },
                      ]}
                      tooltip={intl.formatMessage({
                        defaultMessage:
                          'The value of the goods that were recovered.',
                        id: 'JuhI7q',
                      })}
                    >
                      <InputNumber
                        style={{ width: 150 }}
                        prefix="£"
                        precision={2}
                        min={0}
                      />
                    </Form.Item>
                  </Col>
                  {fields.length > 1 && (
                    <Col>
                      <Button
                        style={{ marginTop: index === 0 ? 30 : 0 }}
                        size="small"
                        onClick={() => remove(name)}
                      >
                        <FontAwesomeIcon size="lg" icon={faTrash} />
                      </Button>
                    </Col>
                  )}
                </Row>
              ))}
              <Form.Item>
                <Row justify="center">
                  <Col>
                    <Button
                      onClick={() =>
                        add({
                          recoveredValue: 0,
                        })
                      }
                      block
                      icon={
                        <FontAwesomeIcon
                          style={{ marginRight: 8 }}
                          icon={faPlus}
                        />
                      }
                    >
                      {intl.formatMessage({
                        defaultMessage: 'Add Item',
                        id: 'kNLPWW',
                      })}
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
            </>
          )}
        </Form.List>
      ) : (
        <div style={{ paddingTop: 10, paddingBottom: 20 }}>
          <Row gutter={16}>
            <Col>
              <Button onClick={knowGoods} danger>
                {intl.formatMessage({
                  defaultMessage: 'I know the goods involved',
                  id: '5RSz8i',
                })}
              </Button>
            </Col>
            <Col>
              <Button onClick={dontKnowGoods}>
                {intl.formatMessage({
                  defaultMessage: "I don't know the goods involved",
                  id: 'Syf67T',
                })}
              </Button>
            </Col>
          </Row>
        </div>
      )}
    </Card>
  );
};

export default IncidentGoods;
