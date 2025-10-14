import type { VehicleData } from 'types/DataType';

import { Button, Col, Row, Table } from 'antd';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import useStyles from './MultiSelectVehicles.style';

interface Props {
  handleAddSuggestion: (id: string[]) => void;
  onClose: () => void;
  vehicles: VehicleData[] | undefined;
}

const SuggestedVehicles = ({
  handleAddSuggestion,
  onClose,
  vehicles,
}: Props) => {
  const classes = useStyles();
  const [selected, setSelected] = useState<string[]>([]);

  const onSelect = (item: { key: string }) => {
    if (item.key) {
      if (selected.includes(item.key)) {
        setSelected(selected.filter((index) => index !== item.key));
      } else {
        setSelected([...selected, item.key]);
      }
    }
  };
  return (
    <div className={classes.container}>
      <Table
        columns={[
          {
            dataIndex: 'reference',
            key: 'reference',
            title: <FormattedMessage defaultMessage="Alert ID" />,
          },
          {
            dataIndex: 'registration',
            key: 'registration',
            title: <FormattedMessage defaultMessage="Registration" />,
          },
          {
            dataIndex: 'make',
            key: 'make',
            title: <FormattedMessage defaultMessage="Make" />,
          },
          {
            dataIndex: 'model',
            key: 'model',
            title: <FormattedMessage defaultMessage="Model" />,
          },
          {
            dataIndex: 'colour',
            key: 'colour',
            title: <FormattedMessage defaultMessage="Colour" />,
          },
        ]}
        dataSource={
          vehicles?.map((item) => ({
            colour: item.colour,
            images: item.images,
            key: item.id,
            make: item.make,
            model: item.model,
            reference: item.reference,
            registration: item.registration,
          })) || []
        }
        pagination={{
          hideOnSinglePage: true,
          pageSize: 15,
        }}
        rowSelection={{
          onSelect,
          type: 'checkbox',
        }}
      />
      <Row gutter={16} justify="end" style={{ marginTop: 30 }}>
        <Col>
          <Button onClick={onClose} type="text">
            <FormattedMessage defaultMessage="Cancel" />
          </Button>
        </Col>
        <Col>
          <Button
            // loading={saving}
            disabled={selected.length === 0}
            onClick={() => handleAddSuggestion(selected)}
            type="primary"
          >
            <FormattedMessage defaultMessage="Add Vehilces" />
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default SuggestedVehicles;
