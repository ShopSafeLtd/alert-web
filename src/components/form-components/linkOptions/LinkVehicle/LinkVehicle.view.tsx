import React from 'react';
import type { ListVehiclesCardQuery } from 'graphql/generated';
import { SortOrder } from 'graphql/generated';
import {
  Button,
  Col,
  DatePicker,
  Descriptions,
  Input,
  Modal,
  Row,
  Select,
  Typography,
} from 'antd';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

import Lightbox from 'yet-another-react-lightbox';
import WatermarkImage from 'components/images/WatermarkImage.view';
import type { WatermarkSlideType } from 'components/images/WatermartkSlide.view';
import WatermarkSlide from 'components/images/WatermartkSlide.view';
import { useIntl } from 'react-intl';
import type { DateType, VehicleData } from 'types/DataType';
import type { VehicleFilters } from 'state/data-model';
import moment from 'moment';
import CardSkeleton from 'components/Skeleton/CardSkeleton.view';
import useStyles from './LinkVehicle.styles';
import VehicleTile from './VehicleTile';
import InfiniteSelectScrollList from '../select-list/InfiniteSelectList';

const { Paragraph, Text } = Typography;
// interface ItemProps {
//   data:
//     | Exclude<ListVehiclesCardQuery['listVehicles'], undefined | null>
//     | null
//     | undefined;
//   setSelectedVehicle: (value: VehicleData | undefined) => void;
// }
// const VehiclesItems = ({ data, setSelectedVehicle }: ItemProps) =>
//   data?.vehicles?.map((vehicle) => (
//     <Col
//       key={vehicle.id}
//       span={vehicle.images && vehicle.images.length > 0 ? 16 : 8}
//     >
//       <VehicleTile
//         vehicle={vehicle}
//         onClick={() => setSelectedVehicle(vehicle)}
//       />
//     </Col>
//   ));
interface Props {
  onSubmit: () => void;
  data:
    | Exclude<ListVehiclesCardQuery['listVehicles'], undefined | null>
    | null
    | undefined;
  loading: boolean;
  setSearch: (value: string) => void;
  selectedVehicle: VehicleData | undefined;
  setSelectedVehicle: (value: VehicleData | undefined) => void;
  openLightbox: (index: number) => void;
  lightBoxOpen: {
    open: boolean;
    index: number;
  };
  filterVariables: VehicleFilters;
  setOrder: (value: SortOrder) => void;
  setGroupsFilter: (value: string[]) => void;
  setCreatedAtFilter: (value: DateType | undefined) => void;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  clearFilters: () => void;
  fetchMoreScroll: () => void;
}

const LinkVehicle = ({
  onSubmit,
  data,
  loading,
  setSearch,
  selectedVehicle,
  setSelectedVehicle,
  openLightbox,
  lightBoxOpen,
  filterVariables,
  setOrder,
  setGroupsFilter,
  setCreatedAtFilter,
  groups,
  groupsLoading,
  clearFilters,
  fetchMoreScroll,
}: Props): JSX.Element => {
  const classes = useStyles();
  const intl = useIntl();
  const {
    search,
    groups: groupsFilter,
    createdAt: createdAtFilter,
    order,
  } = filterVariables;
  const isLoading = loading && !data?.total;
  const vehicleItems = data?.vehicles?.map((vehicle) => (
    <Col
      key={vehicle.id}
      span={vehicle.images && vehicle.images.length > 0 ? 16 : 8}
    >
      <VehicleTile
        vehicle={vehicle}
        onClick={() => setSelectedVehicle(vehicle)}
      />
    </Col>
  ));
  // const existingVehicles = (): JSX.Element => {
  //   if (!data && loading)
  //     return (
  //       <Row wrap gutter={16}>
  //         {Array.from({ length: data?.total || 24 })
  //           .fill(0)
  //           .map(() => (
  //             <Col span={6} className="offender-item">
  //               <OffenderTileSkeleton />
  //             </Col>
  //           ))}
  //       </Row>
  //     );
  //   if (data?.vehicles && data.vehicles.length > 0) {
  //     return (
  //       <Row wrap gutter={16} style={{ marginRight: 0 }}>
  //         {data.vehicles.map((vehicle) => (
  //           <Col
  //             key={vehicle.id}
  //             span={vehicle.images && vehicle.images.length > 0 ? 12 : 6}
  //           >
  //             <VehicleTile
  //               vehicle={vehicle}
  //               onClick={() => setSelectedVehicle(vehicle)}
  //             />
  //           </Col>
  //         ))}
  //       </Row>
  //     );
  //   }
  //   return (
  //     <Row justify="center" align="middle" className="no-offenders">
  //       <Col>
  //         <Empty
  //           description={intl.formatMessage({
  //             defaultMessage: 'No matching vehicles found',
  //             id: 'b4xRGE',
  //           })}
  //         />
  //       </Col>
  //     </Row>
  //   );
  // };
  return (
    <div style={{ overflow: 'hidden' }}>
      <Row wrap={false}>
        <Col span={18} className={classes.list}>
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
          <InfiniteSelectScrollList
            dataLength={data?.vehicles?.length}
            next={fetchMoreScroll}
            hasMore={(data?.vehicles?.length || 0) < (data?.total || 0)}
            isLoading={isLoading}
            items={vehicleItems}
            // ???
            // items={() => (
            //   <VehiclesItems
            //     data={data || []}
            //     setSelectedVehicle={setSelectedVehicle}
            //   />
            // )}
            loadingItems={<CardSkeleton />}
          />
          {/* <div className="add-existing-offender-row">{existingVehicles()}</div> */}
        </Col>
        <Col className={classes.filters} span={6}>
          <Paragraph className={classes.filterTitle}>
            {intl.formatMessage({ defaultMessage: 'Filters', id: 'zSOvI0' })}
          </Paragraph>
          <div className={classes.filter}>
            <Text>
              {intl.formatMessage({
                defaultMessage: 'Sort Order',
                id: 'Hw6crD',
              })}
            </Text>
            <Select
              className={classes.filterSelect}
              size="small"
              allowClear
              value={order}
              onChange={setOrder}
            >
              <Select.Option value={SortOrder.Desc}>
                {intl.formatMessage({
                  defaultMessage: 'Newest First',
                  id: 'dZYazP',
                })}
              </Select.Option>
              <Select.Option value={SortOrder.Asc}>
                {intl.formatMessage({
                  defaultMessage: 'Oldest First',
                  id: 'FqI37D',
                })}
              </Select.Option>
            </Select>
          </div>
          <div className={classes.filter}>
            <Text>
              {intl.formatMessage({
                defaultMessage: 'Groups',
                id: 'hzmswI',
              })}
            </Text>
            <Select
              placeholder={intl.formatMessage({
                defaultMessage: 'Groups',
                id: 'hzmswI',
              })}
              mode="multiple"
              className={classes.filterSelect}
              size="small"
              maxTagCount={2}
              allowClear
              loading={groupsLoading}
              onChange={setGroupsFilter}
              value={groupsFilter}
            >
              {groups.map((group) => (
                <Select.Option value={group.value}>{group.label}</Select.Option>
              ))}
            </Select>
          </div>
          <div className={classes.filter}>
            <Text>
              {intl.formatMessage({
                defaultMessage: 'createdAt',
                id: 'F4RJ8y',
              })}
            </Text>
            <DatePicker.RangePicker
              className={classes.filterSelect}
              defaultValue={
                createdAtFilter
                  ? [
                      moment(createdAtFilter?.startDate),
                      moment(createdAtFilter?.endDate),
                    ]
                  : undefined
              }
              onChange={(value) => {
                if (value && value[0] && value[1])
                  setCreatedAtFilter({
                    startDate: new Date(value[0].valueOf()),
                    endDate: new Date(value[1].valueOf()),
                  });
              }}
            />
          </div>

          <Row justify="end" className={classes.clearRow}>
            <Col>
              <Button onClick={clearFilters}>
                {intl.formatMessage({
                  defaultMessage: 'Clear Filters',
                  id: 'MsGXc3',
                })}
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>

      <Modal
        open={!!selectedVehicle}
        zIndex={1010}
        okText={intl.formatMessage({
          defaultMessage: 'Add Vehicle',
          id: '7vPZdr',
        })}
        onOk={onSubmit}
        onCancel={() => setSelectedVehicle(undefined)}
        bodyStyle={{ padding: 0 }}
        title={intl.formatMessage({
          defaultMessage: 'Add this vehicle?',
          id: 'i1CjZG',
        })}
      >
        <Row wrap={false}>
          {selectedVehicle?.images && selectedVehicle.images.length > 0 && (
            <Col>
              <div
                style={{
                  width: 250,
                  height: 250,
                }}
              >
                <WatermarkImage
                  url={selectedVehicle?.images[0]?.optimised}
                  position={selectedVehicle?.images[0]?.position}
                  rotation={selectedVehicle?.images[0]?.rotation}
                />
              </div>
            </Col>
          )}
          <Col style={{ padding: '10px 10px 15px' }}>
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
          selectedVehicle?.images?.map((image) => ({
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
