import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Pagination,
  Popconfirm,
  Row,
  Select,
  Skeleton,
} from 'antd';
import { createUseStyles } from 'react-jss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/pro-light-svg-icons';
import { faImages } from '@fortawesome/pro-solid-svg-icons';
import type { Theme } from 'configs/ThemeConfig';
import type { SchemeGroupsQuery } from 'graphql/generated';
import { Age, Build, Gender, Height, Race } from 'graphql/generated';
import { FormattedMessage, useIntl } from 'react-intl';
import type { NewOffender } from '../DiscImport.types';

const useStyles = createUseStyles((theme: Theme) => ({
  cell: {},
  row: {
    paddingLeft: 7,
  },
  bottomRow: {
    paddingLeft: 7,
    marginBottom: 10,
    borderBottom: `1px solid ${theme.borderColor}`,
  },
  headerRow: {
    marginLeft: '0px !important',
    marginRight: '0px !important',
    borderTopLeftRadius: 10,
  },
}));

interface NewOffenderRowProps {
  offender: NewOffender;
  groupsData: SchemeGroupsQuery | undefined;
  onDelete: (id: string) => void;
  onUpdateOffender: (data: NewOffender) => void;
}

const NewOffenderRow = React.memo(
  ({
    offender,
    onDelete,
    groupsData,
    onUpdateOffender,
  }: NewOffenderRowProps) => {
    const [form] = Form.useForm<NewOffender>();

    const classes = useStyles();

    useEffect(() => {
      form.setFieldsValue({
        ...offender,
      });
      void form.validateFields();
    }, [offender]);

    const onBlur = () => {
      const values = form.getFieldsValue();
      onUpdateOffender({ ...offender, ...values });
    };
    const intl = useIntl();
    return (
      <Form layout="vertical" form={form}>
        <Row gutter={8} className={classes.row}>
          <Col className={classes.cell} style={{ width: 160, marginTop: 10 }}>
            {offender.images.length > 0 && (
              <div
                style={{
                  height: 150,
                  width: 150,
                  backgroundImage: `url(${offender.images[0]?.url})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  borderRadius: 5,
                  position: 'relative',
                  cursor: 'pointer',
                }}
              >
                {offender.images.length > 1 && (
                  <FontAwesomeIcon
                    icon={faImages}
                    style={{ position: 'absolute', right: 10, bottom: 10 }}
                    color="#FFF"
                    size="lg"
                  />
                )}
              </div>
            )}
            {offender.images.length === 0 && (
              <Skeleton.Image style={{ height: 150, width: 150 }} />
            )}
          </Col>
          <Col span={12}>
            <Row gutter={8}>
              <Col flex={1} className={classes.cell}>
                <Form.Item
                  name="name"
                  label={intl.formatMessage({
                    defaultMessage: 'Name',
                    id: 'HAlOn1',
                  })}
                  rules={[
                    {
                      required: true,
                      message: intl.formatMessage({
                        defaultMessage: 'Enter an name',
                        id: 'Ju6S8/',
                      }),
                    },
                  ]}
                >
                  <Input onBlur={onBlur} />
                </Form.Item>
              </Col>
              <Col span={6} className={classes.cell}>
                <Form.Item
                  name="gender"
                  label={intl.formatMessage({
                    defaultMessage: 'Sex',
                    id: 'eWJHGp',
                  })}
                >
                  <Select
                    options={[
                      {
                        value: Gender.Female,
                        label: intl.formatMessage({
                          defaultMessage: 'Female',
                          id: '74BYXL',
                        }),
                      },
                      {
                        value: Gender.Male,
                        label: intl.formatMessage({
                          defaultMessage: 'Male',
                          id: 'jIbAky',
                        }),
                      },
                      {
                        value: Gender.Unknown,
                        label: intl.formatMessage({
                          defaultMessage: 'Unknown',
                          id: '5jeq8P',
                        }),
                      },
                    ]}
                    onBlur={onBlur}
                  />
                </Form.Item>
              </Col>
              <Col span={6} className={classes.cell}>
                <Form.Item
                  name="race"
                  label={intl.formatMessage({
                    defaultMessage: 'Race',
                    id: 'jOQGTB',
                  })}
                >
                  <Select
                    options={[
                      {
                        label: 'IC1',
                        value: Race.Ic1,
                      },
                      {
                        label: 'IC2',
                        value: Race.Ic2,
                      },
                      {
                        label: 'IC3',
                        value: Race.Ic3,
                      },
                      {
                        label: 'IC4',
                        value: Race.Ic4,
                      },
                      {
                        label: 'IC5',
                        value: Race.Ic5,
                      },
                      {
                        label: 'IC6',
                        value: Race.Ic6,
                      },
                      {
                        label: intl.formatMessage({
                          defaultMessage: 'Unknown',
                          id: '5jeq8P',
                        }),
                        value: Race.Unknown,
                      },
                    ]}
                    onBlur={onBlur}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={6} className={classes.cell}>
                <Form.Item
                  name="height"
                  label={intl.formatMessage({
                    defaultMessage: 'Height',
                    id: 'teLZyZ',
                  })}
                >
                  <Select
                    options={[
                      {
                        label: intl.formatMessage({
                          defaultMessage: 'Short',
                          id: 'juU558',
                        }),

                        value: Height.Short,
                      },
                      {
                        label: intl.formatMessage({
                          defaultMessage: 'Average',
                          id: 'FnRTEV',
                        }),
                        value: Height.Average,
                      },
                      {
                        label: intl.formatMessage({
                          defaultMessage: 'Tall',
                          id: 'hnj65D',
                        }),
                        value: Height.Tall,
                      },
                      {
                        label: intl.formatMessage({
                          defaultMessage: 'Unknown',
                          id: '5jeq8P',
                        }),
                        value: Height.Unknown,
                      },
                    ]}
                    onBlur={onBlur}
                  />
                </Form.Item>
              </Col>
              <Col span={6} className={classes.cell}>
                <Form.Item
                  name="build"
                  label={intl.formatMessage({
                    defaultMessage: 'Build',
                    id: 'RSctv1',
                  })}
                >
                  <Select
                    options={[
                      {
                        label: intl.formatMessage({
                          defaultMessage: 'Small',
                          id: 'BPnT3T',
                        }),
                        value: Build.Small,
                      },
                      {
                        label: intl.formatMessage({
                          defaultMessage: 'Medium',
                          id: 'ovJ26C',
                        }),
                        value: Build.Medium,
                      },
                      {
                        label: intl.formatMessage({
                          defaultMessage: 'Large',
                          id: '/06iwc',
                        }),
                        value: Build.Large,
                      },
                      {
                        label: intl.formatMessage({
                          defaultMessage: 'Unknown',
                          id: '5jeq8P',
                        }),
                        value: Build.Unknown,
                      },
                    ]}
                    onBlur={onBlur}
                  />
                </Form.Item>
              </Col>
              <Col span={6} className={classes.cell}>
                <Form.Item
                  name="age"
                  label={intl.formatMessage({
                    defaultMessage: 'Age',
                    id: '9oNQSC',
                  })}
                >
                  <Select
                    options={[
                      {
                        label: '< 18',
                        value: Age.UnderEighteen,
                      },
                      {
                        label: '18 - 30',
                        value: Age.EighteenThirty,
                      },
                      {
                        label: '30 - 40',
                        value: Age.ThirtyForty,
                      },
                      {
                        label: '40 - 50',
                        value: Age.FortyFifty,
                      },
                      {
                        label: '50 - 60',
                        value: Age.FiftySixty,
                      },
                      {
                        label: '60 - 70',
                        value: Age.SixtySeventy,
                      },
                      {
                        label: '70 - 80',
                        value: Age.SeventyEighty,
                      },
                      {
                        label: '80 >',
                        value: Age.OverEighty,
                      },
                      {
                        label: intl.formatMessage({
                          defaultMessage: 'Unknown',
                          id: '5jeq8P',
                        }),
                        value: Age.Unknown,
                      },
                    ]}
                    onBlur={onBlur}
                  />
                </Form.Item>
              </Col>
              <Col span={6} className={classes.cell}>
                <Form.Item
                  name="dateOfBirth"
                  label={intl.formatMessage({
                    defaultMessage: 'Date of Birth',
                    id: 'e9Z+tg',
                  })}
                >
                  <DatePicker onBlur={onBlur} format="DD/MM/YYYY" />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={3} className={classes.cell} style={{ maxWidth: 250 }}>
            <Form.Item
              name="groups"
              label={intl.formatMessage({
                defaultMessage: 'Groups',
                id: 'hzmswI',
              })}
              rules={[{ required: true, message: 'Choose at least one group' }]}
            >
              <Select
                options={groupsData?.groups?.map((item) => ({
                  value: item.id,
                  label: item.name,
                }))}
                mode="multiple"
                onBlur={onBlur}
              />
            </Form.Item>
          </Col>
          <Col style={{ marginTop: 30 }}>
            <Popconfirm
              overlayInnerStyle={{ padding: 10 }}
              title={intl.formatMessage({
                defaultMessage: 'Are you sure you want to remove this user?',
                id: '2b7AJD',
              })}
              onConfirm={() => onDelete(offender.id)}
            >
              <Button size="small">
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </Popconfirm>
          </Col>
        </Row>
        <Row gutter={8} className={classes.bottomRow}>
          <Col span={6} className={classes.cell}>
            <Form.Item
              name="peculiarities"
              label={intl.formatMessage({
                defaultMessage: 'Characteristics',
                id: 'xksukL',
              })}
            >
              <Input.TextArea rows={5} onBlur={onBlur} />
            </Form.Item>
          </Col>
          <Col span={6} className={classes.cell}>
            <Form.Item
              name="comments"
              label={intl.formatMessage({
                defaultMessage: 'Comments',
                id: 'wCgTu5',
              })}
            >
              <Input.TextArea rows={5} onBlur={onBlur} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
);

interface Props {
  onAdd: () => void;
  newOffenders: NewOffender[];
  groupsData: SchemeGroupsQuery | undefined;
  onUpdateOffender: (data: NewOffender) => void;
}

const NewOffenderTable = ({
  onAdd,
  newOffenders,
  groupsData,
  onUpdateOffender,
}: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeOffenders, setActiveOffenders] = useState<NewOffender[]>(
    newOffenders.slice(0, 10)
  );

  useEffect(() => {
    setActiveOffenders(
      newOffenders.slice((currentPage - 1) * 10, 10 * currentPage)
    );
  }, [currentPage]);

  const intl = useIntl();
  return (
    <Card
      title={intl.formatMessage(
        {
          defaultMessage: 'Offenders ({offenders})',
          id: 'lVaHn1',
        },
        {
          offenders: newOffenders.length,
        }
      )}
      extra={
        <Button type="primary" style={{ marginBottom: 16 }} onClick={onAdd}>
          <FormattedMessage id="m3ChN4" defaultMessage="Add Offender" />
        </Button>
      }
    >
      {activeOffenders.map((offender) => (
        <NewOffenderRow
          key={offender.id}
          offender={offender}
          onDelete={() => {}}
          groupsData={groupsData}
          onUpdateOffender={onUpdateOffender}
        />
      ))}
      <Pagination
        current={currentPage}
        onChange={setCurrentPage}
        total={newOffenders.length}
        showTotal={(total) =>
          intl.formatMessage(
            {
              defaultMessage: `Total Offenders: {total}`,
              id: '3JpVG2',
            },
            {
              total,
            }
          )
        }
        hideOnSinglePage
        pageSizeOptions={[10]}
      />
    </Card>
  );
};

export default React.memo(NewOffenderTable);
