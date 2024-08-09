import type { Theme } from 'configs/ThemeConfig';
import type { SchemeGroupsQuery } from 'graphql/groups/queries/__generated__/scheme-groups.generated';

import { faTrash } from '@fortawesome/pro-light-svg-icons';
import { faImages } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
import { Age, Build, Gender, Height, Race } from 'graphql/types';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';

import type { NewOffender } from '../DiscImport.types';

const useStyles = createUseStyles((theme: Theme) => ({
  bottomRow: {
    borderBottom: `1px solid ${theme.borderColor}`,
    marginBottom: 10,
    paddingLeft: 7,
  },
  cell: {},
  headerRow: {
    borderTopLeftRadius: 10,
    marginLeft: '0px !important',
    marginRight: '0px !important',
  },
  row: {
    paddingLeft: 7,
  },
}));

interface NewOffenderRowProps {
  groupsData: SchemeGroupsQuery | undefined;
  offender: NewOffender;
  onDelete: (id: string) => void;
  onUpdateOffender: (data: NewOffender) => void;
}

const NewOffenderRow = React.memo(
  ({
    groupsData,
    offender,
    onDelete,
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
      <Form form={form} layout="vertical">
        <Row className={classes.row} gutter={8}>
          <Col className={classes.cell} style={{ marginTop: 10, width: 160 }}>
            {offender.images.length > 0 && (
              <div
                style={{
                  backgroundImage: `url(${offender.images[0]?.url})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  borderRadius: 5,
                  cursor: 'pointer',
                  height: 150,
                  position: 'relative',
                  width: 150,
                }}
              >
                {offender.images.length > 1 && (
                  <FontAwesomeIcon
                    color="#FFF"
                    icon={faImages}
                    size="lg"
                    style={{ bottom: 10, position: 'absolute', right: 10 }}
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
              <Col className={classes.cell} flex={1}>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Name',
                  })}
                  name="name"
                  rules={[
                    {
                      message: intl.formatMessage({
                        defaultMessage: 'Enter an name',
                      }),
                      required: true,
                    },
                  ]}
                >
                  <Input onBlur={onBlur} />
                </Form.Item>
              </Col>
              <Col className={classes.cell} span={6}>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Sex',
                  })}
                  name="gender"
                >
                  <Select
                    onBlur={onBlur}
                    options={[
                      {
                        label: intl.formatMessage({
                          defaultMessage: 'Female',
                        }),
                        value: Gender.Female,
                      },
                      {
                        label: intl.formatMessage({
                          defaultMessage: 'Male',
                        }),
                        value: Gender.Male,
                      },
                      {
                        label: intl.formatMessage({
                          defaultMessage: 'Unknown',
                        }),
                        value: Gender.Unknown,
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col className={classes.cell} span={6}>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Race',
                  })}
                  name="race"
                >
                  <Select
                    onBlur={onBlur}
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
                        }),
                        value: Race.Unknown,
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col className={classes.cell} span={6}>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Height',
                  })}
                  name="height"
                >
                  <Select
                    onBlur={onBlur}
                    options={[
                      {
                        label: intl.formatMessage({
                          defaultMessage: 'Short',
                        }),

                        value: Height.Short,
                      },
                      {
                        label: intl.formatMessage({
                          defaultMessage: 'Average',
                        }),
                        value: Height.Average,
                      },
                      {
                        label: intl.formatMessage({
                          defaultMessage: 'Tall',
                        }),
                        value: Height.Tall,
                      },
                      {
                        label: intl.formatMessage({
                          defaultMessage: 'Unknown',
                        }),
                        value: Height.Unknown,
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col className={classes.cell} span={6}>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Build',
                  })}
                  name="build"
                >
                  <Select
                    onBlur={onBlur}
                    options={[
                      {
                        label: intl.formatMessage({
                          defaultMessage: 'Small',
                        }),
                        value: Build.Small,
                      },
                      {
                        label: intl.formatMessage({
                          defaultMessage: 'Medium',
                        }),
                        value: Build.Medium,
                      },
                      {
                        label: intl.formatMessage({
                          defaultMessage: 'Large',
                        }),
                        value: Build.Large,
                      },
                      {
                        label: intl.formatMessage({
                          defaultMessage: 'Unknown',
                        }),
                        value: Build.Unknown,
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col className={classes.cell} span={6}>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Age',
                  })}
                  name="age"
                >
                  <Select
                    onBlur={onBlur}
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
                        }),
                        value: Age.Unknown,
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col className={classes.cell} span={6}>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Date of Birth',
                  })}
                  name="dateOfBirth"
                >
                  <DatePicker format="DD/MM/YYYY" onBlur={onBlur} />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col className={classes.cell} span={3} style={{ maxWidth: 250 }}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Groups',
              })}
              name="groups"
              rules={[{ message: 'Choose at least one group', required: true }]}
            >
              <Select
                mode="multiple"
                onBlur={onBlur}
                options={groupsData?.groups?.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
              />
            </Form.Item>
          </Col>
          <Col style={{ marginTop: 30 }}>
            <Popconfirm
              onConfirm={() => onDelete(offender.id)}
              overlayInnerStyle={{ padding: 10 }}
              title={intl.formatMessage({
                defaultMessage: 'Are you sure you want to remove this user?',
              })}
            >
              <Button size="small">
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </Popconfirm>
          </Col>
        </Row>
        <Row className={classes.bottomRow} gutter={8}>
          <Col className={classes.cell} span={6}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Characteristics',
              })}
              name="peculiarities"
            >
              <Input.TextArea onBlur={onBlur} rows={5} />
            </Form.Item>
          </Col>
          <Col className={classes.cell} span={6}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Comments',
              })}
              name="comments"
            >
              <Input.TextArea onBlur={onBlur} rows={5} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
);

interface Props {
  groupsData: SchemeGroupsQuery | undefined;
  newOffenders: NewOffender[];
  onAdd: () => void;
  onUpdateOffender: (data: NewOffender) => void;
}

const NewOffenderTable = ({
  groupsData,
  newOffenders,
  onAdd,
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
      extra={
        <Button onClick={onAdd} style={{ marginBottom: 16 }} type="primary">
          <FormattedMessage defaultMessage="Add Offender" />
        </Button>
      }
      title={intl.formatMessage(
        {
          defaultMessage: 'Offenders ({offenders})',
        },
        {
          offenders: newOffenders.length,
        }
      )}
    >
      {activeOffenders.map((offender) => (
        <NewOffenderRow
          groupsData={groupsData}
          key={offender.id}
          offender={offender}
          onDelete={() => {}}
          onUpdateOffender={onUpdateOffender}
        />
      ))}
      <Pagination
        current={currentPage}
        hideOnSinglePage
        onChange={setCurrentPage}
        pageSizeOptions={[10]}
        showTotal={(total) =>
          intl.formatMessage(
            {
              defaultMessage: 'Total Offenders: {total}',
            },
            {
              total,
            }
          )
        }
        total={newOffenders.length}
      />
    </Card>
  );
};

export default React.memo(NewOffenderTable);
