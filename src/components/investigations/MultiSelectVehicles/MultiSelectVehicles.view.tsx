import React, { useState } from 'react';
import { Button, Col, Row, Table } from 'antd';
import { FormattedMessage } from 'react-intl';
import type { VehicleData } from 'types/DataType';
import useStyles from './MultiSelectVehicles.style';

interface Props {
  vehicles: VehicleData[] | undefined;
  handleAddSuggestion: (id: string[]) => void;
  onClose: () => void;
}

const SuggestedVehicles = ({
  vehicles,
  handleAddSuggestion,
  onClose,
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
            key: 'reference',
            dataIndex: 'reference',
            title: <FormattedMessage id="k8ZNgH" defaultMessage="Alert ID" />,
          },
          {
            key: 'registration',
            dataIndex: 'registration',
            title: (
              <FormattedMessage id="qv7ied" defaultMessage="Registration" />
            ),
          },
          {
            key: 'make',
            dataIndex: 'make',
            title: <FormattedMessage id="6AAM0P" defaultMessage="Make" />,
          },
          {
            key: 'model',
            dataIndex: 'model',
            title: <FormattedMessage id="rhSI1/" defaultMessage="Model" />,
          },
          {
            key: 'colour',
            dataIndex: 'colour',
            title: <FormattedMessage id="+e8vAT" defaultMessage="Colour" />,
          },
        ]}
        dataSource={
          vehicles?.map((item) => ({
            reference: item.reference,
            registration: item.registration,
            make: item.make,
            model: item.model,
            colour: item.colour,
            images: item.images,
            key: item.id,
          })) || []
        }
        rowSelection={{
          type: 'checkbox',
          onSelect,
        }}
        pagination={{
          hideOnSinglePage: true,
          pageSize: 15,
        }}
      />
      <Row gutter={16} style={{ marginTop: 30 }} justify="end">
        <Col>
          <Button onClick={onClose} type="text">
            <FormattedMessage id="47FYwb" defaultMessage="Cancel" />
          </Button>
        </Col>
        <Col>
          <Button
            // loading={saving}
            disabled={selected.length === 0}
            onClick={() => handleAddSuggestion(selected)}
            type="primary"
          >
            <FormattedMessage id="pooPfm" defaultMessage="Add Vehilces" />
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default SuggestedVehicles;
