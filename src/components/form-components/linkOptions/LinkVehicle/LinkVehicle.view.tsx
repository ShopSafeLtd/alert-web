/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import type { ListVehiclesQuery } from 'graphql/generated';
import { Col, Descriptions, Empty, Input, Modal, Pagination, Row } from 'antd';

import Zoom from 'yet-another-react-lightbox/plugins/zoom';

import OffenderTileSkeleton from 'components/offenders/OffenderTileSkeleton';

import Lightbox from 'yet-another-react-lightbox';
import WatermarkImage from 'components/images/WatermarkImage.view';
import type { WatermarkSlideType } from 'components/images/WatermartkSlide.view';
import WatermarkSlide from 'components/images/WatermartkSlide.view';
import { useIntl } from 'react-intl';
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

  const intl = useIntl();
  const existingVehicles = (): JSX.Element => {
    if (!data?.listVehicles && loading)
      return (
        <Row wrap gutter={16}>
          {Array.from({ length: data?.listVehicles?.total || 24 })
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
          <Empty
            description={intl.formatMessage({
              defaultMessage: 'No matching vehicles found',
              id: 'b4xRGE',
            })}
          />
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
            placeholder={intl.formatMessage({
              defaultMessage: 'Search Vehicles...',
              id: 'LwoWFl',
            })}
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
        okText={intl.formatMessage({
          defaultMessage: 'Add Vehicle',
          id: '7vPZdr',
        })}
        onOk={() => onSubmit(selectedVehicle?.id)}
        onCancel={() => setCurrentId(undefined)}
        bodyStyle={{ padding: 0 }}
        title={intl.formatMessage(
          {
            defaultMessage: 'Add {make} to the chat?',
            id: 'FghSV+',
          },
          {
            make:
              selectedVehicle?.make ||
              intl.formatMessage({
                defaultMessage: 'this vehicle',
                id: 'pRx/92',
              }),
          }
        )}
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
                <WatermarkImage
                  url={selectedVehicle?.images[0]?.optimised}
                  position={selectedVehicle?.images[0]?.position}
                />
              </div>
            </Col>
          )}
          <Col style={{ padding: '10px 20px' }}>
            <Descriptions column={1} size="small">
              <Descriptions.Item
                label={intl.formatMessage({
                  defaultMessage: 'Registration',
                  id: 'qv7ied',
                })}
              >
                {selectedVehicle?.registration ||
                  intl.formatMessage({
                    defaultMessage: 'Unknown',
                    id: '5jeq8P',
                  })}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  defaultMessage: 'Make',
                  id: '6AAM0P',
                })}
              >
                {selectedVehicle?.make ||
                  intl.formatMessage({
                    defaultMessage: 'Unknown',
                    id: '5jeq8P',
                  })}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  defaultMessage: 'Colour',
                  id: '+e8vAT',
                })}
              >
                {selectedVehicle?.colour ||
                  intl.formatMessage({
                    defaultMessage: 'Unknown',
                    id: '5jeq8P',
                  })}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  defaultMessage: 'Model',
                  id: 'rhSI1/',
                })}
              >
                {selectedVehicle?.model ||
                  intl.formatMessage({
                    defaultMessage: 'Unknown',
                    id: '5jeq8P',
                  })}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  defaultMessage: 'Total Offenders',
                  id: 'Pyo0l3',
                })}
              >
                {selectedVehicle?.totalOffenders || 0}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  defaultMessage: 'Total Crime Groups',
                  id: 'PwRU00',
                })}
              >
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
