import React, { useEffect } from 'react';
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
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
import { Age, Build, Gender, Height, Race } from 'graphql/generated';
import type { SchemeGroupsQuery } from 'graphql/generated';
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
      form.validateFields();
    }, [offender]);

    const onBlur = () => {
      const values = form.getFieldsValue();
      onUpdateOffender({ ...offender, ...values });
    };

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
                  label="Name"
                  rules={[{ required: true, message: 'Enter an name' }]}
                >
                  <Input onBlur={onBlur} />
                </Form.Item>
              </Col>
              <Col span={6} className={classes.cell}>
                <Form.Item name="gender" label="Sex">
                  <Select
                    options={[
                      {
                        value: Gender.Female,
                        label: 'Female',
                      },
                      {
                        value: Gender.Male,
                        label: 'Male',
                      },
                      {
                        value: Gender.Unknown,
                        label: 'Unknown',
                      },
                    ]}
                    onBlur={onBlur}
                  />
                </Form.Item>
              </Col>
              <Col span={6} className={classes.cell}>
                <Form.Item name="race" label="Race">
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
                        label: 'Unknown',
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
                <Form.Item name="height" label="Height">
                  <Select
                    options={[
                      {
                        label: 'Short',
                        value: Height.Short,
                      },
                      {
                        label: 'Average',
                        value: Height.Average,
                      },
                      {
                        label: 'Tall',
                        value: Height.Tall,
                      },
                      {
                        label: 'Unknown',
                        value: Height.Unknown,
                      },
                    ]}
                    onBlur={onBlur}
                  />
                </Form.Item>
              </Col>
              <Col span={6} className={classes.cell}>
                <Form.Item name="build" label="Build">
                  <Select
                    options={[
                      {
                        label: 'Small',
                        value: Build.Small,
                      },
                      {
                        label: 'Medium',
                        value: Build.Medium,
                      },
                      {
                        label: 'Large',
                        value: Build.Large,
                      },
                      {
                        label: 'Unknown',
                        value: Build.Unknown,
                      },
                    ]}
                    onBlur={onBlur}
                  />
                </Form.Item>
              </Col>
              <Col span={6} className={classes.cell}>
                <Form.Item name="age" label="Age">
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
                        label: 'Unknown',
                        value: Age.Unknown,
                      },
                    ]}
                    onBlur={onBlur}
                  />
                </Form.Item>
              </Col>
              <Col span={6} className={classes.cell}>
                <Form.Item name="dateOfBirth" label="Date of Birth">
                  <DatePicker onBlur={onBlur} format="DD/MM/YYYY" />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={3} className={classes.cell} style={{ maxWidth: 250 }}>
            <Form.Item
              name="groups"
              label="Groups"
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
              title="Are you sure you want to remove this user?"
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
            <Form.Item name="peculiarities" label="Peculiarities">
              <Input.TextArea rows={5} onBlur={onBlur} />
            </Form.Item>
          </Col>
          <Col span={6} className={classes.cell}>
            <Form.Item name="comments" label="Comments">
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
}: Props) => (
  <Card
    title={`Offenders (${newOffenders.length})`}
    extra={
      <Button type="primary" style={{ marginBottom: 16 }} onClick={onAdd}>
        Add Offender
      </Button>
    }
  >
    {newOffenders.map((offender) => (
      <NewOffenderRow
        key={offender.id}
        offender={offender}
        onDelete={() => {}}
        groupsData={groupsData}
        onUpdateOffender={onUpdateOffender}
      />
    ))}
  </Card>
);

export default React.memo(NewOffenderTable);
