/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { ListVehiclesQuery } from 'graphql/generated';
import { Col, Descriptions, Empty, Input, Modal, Pagination, Row } from 'antd';

import Zoom from 'yet-another-react-lightbox/plugins/zoom';

import OffenderTileSkeleton from 'components/offenders/OffenderTileSkeleton';

import Lightbox from 'yet-another-react-lightbox';
import WatermarkImage from 'components/images/WatermarkImage.view';
import WatermarkSlide, {
  WatermarkSlideType,
} from 'components/images/WatermartkSlide.view';
import useStyles from './LinkVehicle.styles';
import VehicleTile from '../VehicleTile';

interface Props {
  onSubmit: (value: string | undefined) => void;
  data: ListVehiclesQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  pagination: { page: number; pageSize: number };
  onPaginationChange: (page: number, pageSize: number) => void;
  setCurrentId: (value: string | undefined) => void;
  selectedVehicle:
    | Exclude<
        ListVehiclesQuery['listVehicles'],
        undefined | null
      >['vehicles'][0]
    | undefined
    | null;
  openLightbox: (index: number) => void;
  lightBoxOpen: {
    open: boolean;
    index: number;
  };
}

const LinkVehicle = ({
  onSubmit,
  data,
  loading,
  search,
  setSearch,
  onPaginationChange,
  setCurrentId,
  openLightbox,
  selectedVehicle,
  lightBoxOpen,
  pagination,
}: Props): JSX.Element => {
  const classes = useStyles();

  const existingVehicles = (): JSX.Element => {
    if (!data?.listVehicles && loading)
      return (
        <Row wrap gutter={16}>
          {Array(data?.listVehicles?.total || 24)
            .fill(0)
            .map(() => (
              <Col span={6} className="offender-item">
                <OffenderTileSkeleton />
              </Col>
            ))}
        </Row>
      );
    if (data && data.listVehicles && data.listVehicles.vehicles.length > 0) {
      return (
        <Row wrap gutter={16} style={{ marginRight: 0 }}>
          {data?.listVehicles?.vehicles.map((vehicle) => (
            <Col span={6} key={vehicle.id} className="offender-item">
              <VehicleTile
                vehicle={vehicle}
                onClick={() => setCurrentId(vehicle.id)}
              />
            </Col>
          ))}
        </Row>
      );
    }
    return (
      <Row justify="center" align="middle" className="no-offenders">
        <Col>
          <Empty description="No matching vehicles found" />
        </Col>
      </Row>
    );
  };
  return (
    <div className="add-existing-offender">
      <Row wrap={false}>
        <Col span={24} className={classes.offenders}>
          <Input
            value={search}
            className={classes.searchBar}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search Vehicles..."
            allowClear
          />
          <div className="add-existing-offender-row">
            {existingVehicles()}
            <Pagination
              style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
              }}
              total={data?.listVehicles?.total}
              size="small"
              showSizeChanger={false}
              onChange={onPaginationChange}
              pageSize={pagination.pageSize}
              hideOnSinglePage
              current={pagination.page}
            />
          </div>
        </Col>
      </Row>

      <Modal
        visible={!!selectedVehicle}
        zIndex={1010}
        okText="Add Vehicle"
        onOk={() => onSubmit(selectedVehicle?.id)}
        onCancel={() => setCurrentId(undefined)}
        bodyStyle={{ padding: 0 }}
        title={`Add ${selectedVehicle?.make || 'this veheicle'} to the chat?`}
      >
        <Row gutter={16} wrap={false}>
          {selectedVehicle && selectedVehicle.images.length > 0 && (
            <Col>
              <div
                style={{
                  width: 200,
                  height: 250,
                }}
              >
                <WatermarkImage url={selectedVehicle?.images[0]?.optimised} />
              </div>
            </Col>
          )}
          <Col style={{ padding: '10px 20px' }}>
            <Descriptions column={1} size="small">
              <Descriptions.Item label="Registration">
                {selectedVehicle?.registration || 'Unknown'}
              </Descriptions.Item>
              <Descriptions.Item label="Make">
                {selectedVehicle?.make || 'Unknown'}
              </Descriptions.Item>
              <Descriptions.Item label="Colour">
                {selectedVehicle?.colour || 'Unknown'}
              </Descriptions.Item>
              <Descriptions.Item label="Model">
                {selectedVehicle?.model || 'Unknown'}
              </Descriptions.Item>
              <Descriptions.Item label="TotalOffenders">
                {selectedVehicle?.totalOffenders || 0}
              </Descriptions.Item>
              <Descriptions.Item label="TotalCrimeGroups">
                {selectedVehicle?.totalCrimeGroups || 0}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </Modal>

      <Lightbox
        open={lightBoxOpen.open}
        close={() => openLightbox(0)}
        plugins={[Zoom]}
        controller={{
          closeOnBackdropClick: true,
        }}
        slides={
          selectedVehicle?.images.map((image) => ({
            src: image.optimised || '',
          })) || []
        }
        render={{
          slide: (slide: WatermarkSlideType) => (
            <WatermarkSlide slide={slide} />
          ),
        }}
      />
    </div>
  );
};

export default LinkVehicle;
