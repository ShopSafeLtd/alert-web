import type { ListVehiclesCardQuery } from '#/components/form-components/linkOptions/LinkVehicle/graphql/queries/__generated__/list-vehicles-card.generated';
import type { WatermarkSlideType } from 'components/images/WatermartkSlide.view';
import type { VehicleFilters } from 'state/data-model';
import type { DateType, VehicleData } from 'types/DataType';

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
import CardSkeleton from 'components/Skeleton/CardSkeleton.view';
import WatermarkImage from 'components/images/WatermarkImage.view';
import WatermarkSlide from 'components/images/WatermartkSlide.view';
import { SortOrder } from 'graphql/types';
import moment from 'moment';
import React from 'react';
import { useIntl } from 'react-intl';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

import InfiniteSelectScrollList from '../select-list/InfiniteSelectList';
import useStyles from './LinkVehicle.styles';
import VehicleTile from './VehicleTile';

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
  clearFilters: () => void;
  data:
    | Exclude<ListVehiclesCardQuery['listVehicles'], null | undefined>
    | null
    | undefined;
  fetchMoreScroll: () => void;
  filterVariables: VehicleFilters;
  groups: { label: string; value: string }[];
  groupsLoading: boolean;
  lightBoxOpen: {
    index: number;
    open: boolean;
  };
  loading: boolean;
  onSubmit: () => void;
  openLightbox: (index: number) => void;
  selectedVehicle: VehicleData | undefined;
  setCreatedAtFilter: (value: DateType | undefined) => void;
  setGroupsFilter: (value: string[]) => void;
  setOrder: (value: SortOrder) => void;
  setSearch: (value: string) => void;
  setSelectedVehicle: (value: VehicleData | undefined) => void;
}

const LinkVehicle = ({
  clearFilters,
  data,
  fetchMoreScroll,
  filterVariables,
  groups,
  groupsLoading,
  lightBoxOpen,
  loading,
  onSubmit,
  openLightbox,
  selectedVehicle,
  setCreatedAtFilter,
  setGroupsFilter,
  setOrder,
  setSearch,
  setSelectedVehicle,
}: Props): JSX.Element => {
  const classes = useStyles();
  const intl = useIntl();
  const {
    createdAt: createdAtFilter,
    groups: groupsFilter,
    order,
    search,
  } = filterVariables;
  const isLoading = loading && !data?.total;
  const vehicleItems = data?.vehicles?.map((vehicle) => (
    <Col
      key={vehicle.id}
      span={vehicle.images && vehicle.images.length > 0 ? 16 : 8}
    >
      <VehicleTile
        onClick={() => setSelectedVehicle(vehicle)}
        vehicle={vehicle}
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
        <Col className={classes.list} span={18}>
          <Input
            allowClear
            className={classes.searchBar}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={intl.formatMessage({
              defaultMessage: 'Search Vehicles...',
            })}
            value={search}
          />
          <InfiniteSelectScrollList
            dataLength={data?.vehicles?.length}
            hasMore={(data?.vehicles?.length || 0) < (data?.total || 0)}
            isLoading={isLoading}
            items={vehicleItems}
            // )}
            loadingItems={<CardSkeleton />}
            // ???
            // items={() => (
            //   <VehiclesItems
            //     data={data || []}
            //     setSelectedVehicle={setSelectedVehicle}
            //   />
            next={fetchMoreScroll}
          />
          {/* <div className="add-existing-offender-row">{existingVehicles()}</div> */}
        </Col>
        <Col className={classes.filters} span={6}>
          <Paragraph className={classes.filterTitle}>
            {intl.formatMessage({ defaultMessage: 'Filters' })}
          </Paragraph>
          <div className={classes.filter}>
            <Text>
              {intl.formatMessage({
                defaultMessage: 'Sort Order',
              })}
            </Text>
            <Select
              allowClear
              className={classes.filterSelect}
              onChange={setOrder}
              size="small"
              value={order}
            >
              <Select.Option value={SortOrder.Desc}>
                {intl.formatMessage({
                  defaultMessage: 'Newest First',
                })}
              </Select.Option>
              <Select.Option value={SortOrder.Asc}>
                {intl.formatMessage({
                  defaultMessage: 'Oldest First',
                })}
              </Select.Option>
            </Select>
          </div>
          <div className={classes.filter}>
            <Text>
              {intl.formatMessage({
                defaultMessage: 'Groups',
              })}
            </Text>
            <Select
              allowClear
              className={classes.filterSelect}
              loading={groupsLoading}
              maxTagCount={2}
              mode="multiple"
              onChange={setGroupsFilter}
              placeholder={intl.formatMessage({
                defaultMessage: 'Groups',
              })}
              size="small"
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
                    endDate: new Date(value[1].valueOf()),
                    startDate: new Date(value[0].valueOf()),
                  });
              }}
            />
          </div>

          <Row className={classes.clearRow} justify="end">
            <Col>
              <Button onClick={clearFilters}>
                {intl.formatMessage({
                  defaultMessage: 'Clear Filters',
                })}
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>

      <Modal
        bodyStyle={{ padding: 0 }}
        okText={intl.formatMessage({
          defaultMessage: 'Add Vehicle',
        })}
        onCancel={() => setSelectedVehicle(undefined)}
        onOk={onSubmit}
        open={!!selectedVehicle}
        title={intl.formatMessage({
          defaultMessage: 'Add this vehicle?',
        })}
        zIndex={1010}
      >
        <Row wrap={false}>
          {selectedVehicle?.images && selectedVehicle.images.length > 0 && (
            <Col>
              <div
                style={{
                  height: 250,
                  width: 250,
                }}
              >
                <WatermarkImage
                  position={selectedVehicle?.images[0]?.position}
                  rotation={selectedVehicle?.images[0]?.rotation}
                  url={selectedVehicle?.images[0]?.optimised}
                />
              </div>
            </Col>
          )}
          <Col style={{ padding: '10px 10px 15px' }}>
            <Descriptions column={1} size="small">
              <Descriptions.Item
                label={intl.formatMessage({
                  defaultMessage: 'Registration',
                })}
              >
                {selectedVehicle?.registration ||
                  intl.formatMessage({
                    defaultMessage: 'Unknown',
                  })}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  defaultMessage: 'Make',
                })}
              >
                {selectedVehicle?.make ||
                  intl.formatMessage({
                    defaultMessage: 'Unknown',
                  })}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  defaultMessage: 'Colour',
                })}
              >
                {selectedVehicle?.colour ||
                  intl.formatMessage({
                    defaultMessage: 'Unknown',
                  })}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  defaultMessage: 'Model',
                })}
              >
                {selectedVehicle?.model ||
                  intl.formatMessage({
                    defaultMessage: 'Unknown',
                  })}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </Modal>

      <Lightbox
        close={() => openLightbox(0)}
        controller={{
          closeOnBackdropClick: true,
        }}
        open={lightBoxOpen.open}
        plugins={[Zoom]}
        render={{
          slide: (slide: WatermarkSlideType) => (
            <WatermarkSlide slide={slide} />
          ),
        }}
        slides={
          selectedVehicle?.images?.map((image) => ({
            src: image.optimised || '',
          })) || []
        }
      />
    </div>
  );
};

export default LinkVehicle;
