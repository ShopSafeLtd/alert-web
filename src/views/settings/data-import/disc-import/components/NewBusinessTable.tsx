import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Popconfirm,
  Row,
  Select,
  Tooltip,
  Typography,
} from 'antd';
import { createUseStyles } from 'react-jss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClose,
  faMagnifyingGlass,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import { useListBusinessesLocationsQuery } from 'graphql/generated';
import { useStoreState } from 'state';
import type { NewBusiness } from '../DiscImport.types';

const { Text } = Typography;

const useStyles = createUseStyles(() => ({
  cell: {},
  row: {
    paddingLeft: 7,
  },
  headerRow: {
    marginLeft: '0px !important',
    marginRight: '0px !important',
    borderTopLeftRadius: 10,
  },
  headerCell: {},
}));

interface NewBusinessRowProps {
  business: NewBusiness;
  onDelete: (id: string) => void;
}

const NewBusinessRow = React.memo(
  ({ business, onDelete }: NewBusinessRowProps) => {
    const [form] = Form.useForm<NewBusiness>();
    const [link, setLink] = useState(false);
    const currentSchemeId = useStoreState((state) => state.scheme.id);

    const classes = useStyles();

    const { data } = useListBusinessesLocationsQuery({
      variables: {
        where: {
          schemes: {
            some: {
              id: {
                equals: currentSchemeId,
              },
            },
          },
        },
      },
    });

    useEffect(() => {
      form.setFieldsValue({
        ...business,
      });
      form.validateFields();
    }, [business]);

    const onValuesChange = (changedValues: NewBusiness) => {
      if (changedValues.existing) {
        const existing = data?.listBusinesses.businesses.find(
          (item) => item.id === changedValues.existing
        );
        if (existing)
          form.setFieldsValue({
            building: existing.locations[0]?.building || '',
            county: existing.locations[0]?.county || '',
            name: existing.name || '',
            postcode: existing.locations[0]?.postcode || '',
            street: existing.locations[0]?.street || '',
            townCity: existing.locations[0]?.townCity || '',
          });
      }
    };

    const clearLink = () => {
      form.setFieldsValue({
        existing: undefined,
      });
      setLink(false);
    };

    return (
      <Form form={form} className={classes.row} onValuesChange={onValuesChange}>
        <Row gutter={8}>
          <Col span={4} className={classes.cell}>
            <Form.Item
              name="name"
              rules={[{ required: true, message: 'Enter a name' }]}
            >
              <Input readOnly={link} />
            </Form.Item>
          </Col>
          <Col span={3} className={classes.cell}>
            <Form.Item name="building">
              <Input readOnly={link} />
            </Form.Item>
          </Col>
          <Col span={3} className={classes.cell} style={{ maxWidth: 200 }}>
            <Form.Item
              name="street"
              rules={[{ required: true, message: 'Enter a street' }]}
            >
              <Input readOnly={link} />
            </Form.Item>
          </Col>
          <Col span={3} className={classes.cell} style={{ maxWidth: 250 }}>
            <Form.Item
              name="townCity"
              rules={[{ required: true, message: 'Enter a business' }]}
            >
              <Input readOnly={link} />
            </Form.Item>
          </Col>
          <Col span={3} className={classes.cell} style={{ maxWidth: 250 }}>
            <Form.Item name="county">
              <Input readOnly={link} />
            </Form.Item>
          </Col>
          <Col span={2} className={classes.cell} style={{ maxWidth: 250 }}>
            <Form.Item
              name="postcode"
              rules={[{ required: true, message: 'Enter a postcode' }]}
            >
              <Input readOnly={link} />
            </Form.Item>
          </Col>
          <Col>
            {!link && (
              <Tooltip title="Link to an existing business">
                <Button size="small" onClick={() => setLink(true)}>
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </Button>
              </Tooltip>
            )}
            {link && (
              <Row gutter={8}>
                <Col>
                  <Form.Item
                    name="existing"
                    rules={[{ required: true, message: 'Select a business' }]}
                  >
                    <Select
                      style={{ width: 160 }}
                      options={data?.listBusinesses.businesses.map((item) => ({
                        value: item.id,
                        label: item.name,
                      }))}
                    />
                  </Form.Item>
                </Col>
                <Col>
                  <Tooltip title="Clear Link">
                    <Button size="small" onClick={clearLink}>
                      <FontAwesomeIcon icon={faClose} />
                    </Button>
                  </Tooltip>
                </Col>
              </Row>
            )}
          </Col>
          <Col>
            <Popconfirm
              overlayInnerStyle={{ padding: 10 }}
              title="Are you sure you want to remove this business?"
              onConfirm={() => onDelete(business.id)}
            >
              <Button size="small">
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </Popconfirm>
          </Col>
        </Row>
      </Form>
    );
  }
);

interface Props {
  onAdd: () => void;
  onDelete: (id: string) => void;
  newBusinesses: NewBusiness[];
}

const NewBusinessTable = ({ onAdd, newBusinesses, onDelete }: Props) => {
  const classes = useStyles();

  return (
    <Card
      title="Businesses"
      extra={
        <Button type="primary" style={{ marginBottom: 16 }} onClick={onAdd}>
          Add Business
        </Button>
      }
    >
      <Row
        gutter={8}
        style={{ marginBottom: 10 }}
        className={classes.headerRow}
      >
        <Col
          span={4}
          className={classes.headerCell}
          style={{ borderTopLeftRadius: 10 }}
        >
          <Text style={{ paddingLeft: 5 }} strong>
            Name
          </Text>
        </Col>
        <Col span={3} className={classes.headerCell}>
          <Text style={{ paddingLeft: 5 }} strong>
            Building
          </Text>
        </Col>
        <Col span={3} className={classes.headerCell}>
          <Text style={{ paddingLeft: 5 }} strong>
            Street
          </Text>
        </Col>
        <Col span={3} className={classes.headerCell}>
          <Text style={{ paddingLeft: 5 }} strong>
            Town/City
          </Text>
        </Col>
        <Col span={3} className={classes.headerCell}>
          <Text style={{ paddingLeft: 5 }} strong>
            County
          </Text>
        </Col>
        <Col span={2} className={classes.headerCell}>
          <Text style={{ paddingLeft: 5 }} strong>
            Postcode
          </Text>
        </Col>
      </Row>

      {newBusinesses.map((business) => (
        <NewBusinessRow
          key={business.id}
          business={business}
          onDelete={onDelete}
        />
      ))}
    </Card>
  );
};

export default React.memo(NewBusinessTable);
