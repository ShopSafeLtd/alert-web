/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import {
  Age,
  Build,
  Gender,
  ListOffendersQuery,
  Race,
} from 'graphql/generated';
import {
  Button,
  Col,
  Descriptions,
  Empty,
  Input,
  Modal,
  Pagination,
  Row,
  Select,
  Typography,
} from 'antd';
import {
  getOffenderAge,
  getOffenderBuild,
  getOffenderGender,
  getOffenderRace,
} from 'utils/offender/get-offender-desc';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

import OffenderTile from 'components/offenders/OffenderTile';
import OffenderTileSkeleton from 'components/offenders/OffenderTileSkeleton';
import Lightbox from 'yet-another-react-lightbox';
import WatermarkImage from 'components/images/WatermarkImage.view';
import WatermarkSlide, {
  WatermarkSlideType,
} from 'components/images/WatermartkSlide.view';
import useStyles from './AddExistingOffender.styles';

const { Paragraph, Text } = Typography;

interface Props {
  onSubmit: (value: string | undefined) => void;
  data: ListOffendersQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  pagination: { page: number; pageSize: number };
  onPaginationChange: (page: number, pageSize: number) => void;
  setCurrentId: (value: string | undefined) => void;
  selectedOffender:
    | Exclude<
        ListOffendersQuery['listOffenders'],
        undefined | null
      >['offenders'][0]
    | undefined
    | null;
  openLightbox: (index: number) => void;
  lightBoxOpen: {
    open: boolean;
    index: number;
  };
  ethnicity: Race[];
  setEthnicity: (value: Race[]) => void;
  age: Age[];
  setAge: (value: Age[]) => void;
  build: Build[];
  setBuild: (value: Build[]) => void;
  sex: Gender[];
  setSex: (value: Gender[]) => void;
  setHair: (value: string) => void;
  setPeculiarities: (value: string) => void;
  hair: string;
  peculiarities: string;
  clearFilters: () => void;
}

const AddExistingOffender = ({
  onSubmit,
  data,
  loading,
  search,
  setSearch,
  onPaginationChange,
  setCurrentId,
  openLightbox,
  selectedOffender,
  lightBoxOpen,
  age,
  build,
  ethnicity,
  setAge,
  setBuild,
  setEthnicity,
  setSex,
  sex,
  pagination,
  hair,
  peculiarities,
  setHair,
  setPeculiarities,
  clearFilters,
}: Props): JSX.Element => {
  const classes = useStyles();

  const existingOffenders = (): JSX.Element => {
    if (!data?.listOffenders && loading)
      return (
        <Row wrap gutter={16}>
          {Array(data?.listOffenders?.total || 24)
            .fill(0)
            .map(() => (
              <Col span={6} className="offender-item">
                <OffenderTileSkeleton />
              </Col>
            ))}
        </Row>
      );
    if (data && data.listOffenders && data.listOffenders.offenders.length > 0) {
      return (
        <Row wrap gutter={16} style={{ marginRight: 0 }}>
          {data?.listOffenders?.offenders.map((offender) => (
            <Col span={6} key={offender.id} className="offender-item">
              <OffenderTile
                offender={offender}
                onClick={() => setCurrentId(offender.id)}
              />
            </Col>
          ))}
        </Row>
      );
    }
    return (
      <Row justify="center" align="middle" className="no-offenders">
        <Col>
          <Empty description="No matching offenders found" />
        </Col>
      </Row>
    );
  };
  return (
    <div className="add-existing-offender">
      <Row wrap={false}>
        <Col span={18} className={classes.offenders}>
          <Input
            value={search}
            className={classes.searchBar}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search Offenders..."
            allowClear
          />
          <div className="add-existing-offender-row">
            {existingOffenders()}
            <Pagination
              style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
              }}
              total={data?.listOffenders?.total}
              size="small"
              showSizeChanger={false}
              onChange={onPaginationChange}
              pageSize={pagination.pageSize}
              hideOnSinglePage
              current={pagination.page}
            />
          </div>
        </Col>
        <Col className={classes.filters} span={6}>
          <Paragraph className={classes.filterTitle}>Filters</Paragraph>
          <div className={classes.filter}>
            <Text>Ethnicity</Text>
            <Select
              value={ethnicity}
              onChange={setEthnicity}
              placeholder="Ethnicity"
              className={classes.filterSelect}
              mode="multiple"
              allowClear
            >
              <Select.Option value={Race.Ic1}>
                IC1 - North European
              </Select.Option>
              <Select.Option value={Race.Ic2}>
                IC2 - South European
              </Select.Option>
              <Select.Option value={Race.Ic3}>IC3 - Black</Select.Option>
              <Select.Option value={Race.Ic4}>IC - South Asian4</Select.Option>
              <Select.Option value={Race.Ic5}>
                IC5 - Southeast Asian
              </Select.Option>
              <Select.Option value={Race.Ic6}>
                IC6 - North African or Arab
              </Select.Option>
              <Select.Option value={Race.Unknown}>Unknown</Select.Option>
            </Select>
          </div>
          <div className={classes.filter}>
            <Text>Build</Text>
            <Select
              mode="multiple"
              allowClear
              value={build}
              onChange={setBuild}
              placeholder="Build"
              className={classes.filterSelect}
            >
              <Select.Option value={Build.Small}>Small</Select.Option>
              <Select.Option value={Build.Medium}>Medium</Select.Option>
              <Select.Option value={Build.Large}>Large</Select.Option>
              <Select.Option value={Build.Unknown}>Unknown</Select.Option>
            </Select>
          </div>
          <div className={classes.filter}>
            <Text>Age</Text>
            <Select
              mode="multiple"
              allowClear
              value={age}
              onChange={setAge}
              placeholder="Age"
              className={classes.filterSelect}
            >
              <Select.Option value={Age.UnderEighteen}>Under 18</Select.Option>
              <Select.Option value={Age.EighteenThirty}>18 - 30</Select.Option>
              <Select.Option value={Age.ThirtyForty}>30 - 40</Select.Option>
              <Select.Option value={Age.FortyFifty}>40 - 50</Select.Option>
              <Select.Option value={Age.FiftySixty}>50 - 60</Select.Option>
              <Select.Option value={Age.SixtySeventy}>60 - 70</Select.Option>
              <Select.Option value={Age.SeventyEighty}>70 - 80</Select.Option>
              <Select.Option value={Age.OverEighty}>Over 80</Select.Option>
              <Select.Option value={Age.Unknown}>Unknown</Select.Option>
            </Select>
          </div>
          <div className={classes.filter}>
            <Text>Sex</Text>
            <Select
              mode="multiple"
              allowClear
              value={sex}
              onChange={setSex}
              placeholder="Sex"
              className={classes.filterSelect}
            >
              <Select.Option value={Gender.Female}>Female</Select.Option>
              <Select.Option value={Gender.Male}>Male</Select.Option>
              <Select.Option value={Gender.Unknown}>Unknown</Select.Option>
            </Select>
          </div>
          <div className={classes.filter}>
            <Text>Hair</Text>
            <Input.TextArea
              value={hair}
              onChange={(e) => setHair(e.target.value)}
            />
          </div>
          <div className={classes.filter}>
            <Text>Peculiarities</Text>
            <Input.TextArea
              value={peculiarities}
              onChange={(e) => setPeculiarities(e.target.value)}
            />
          </div>
          <Row justify="end" className={classes.clearRow}>
            <Col>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </Col>
          </Row>
        </Col>
      </Row>

      <Modal
        visible={!!selectedOffender}
        zIndex={1010}
        okText="Add Offender"
        onOk={() => onSubmit(selectedOffender?.id)}
        onCancel={() => setCurrentId(undefined)}
        bodyStyle={{ padding: 0 }}
        title={`Add ${selectedOffender?.name} to incident?`}
      >
        <Row gutter={16} wrap={false}>
          {selectedOffender && selectedOffender.images.length > 0 && (
            <Col>
              <div
                style={{
                  width: 200,
                  height: 250,
                }}
              >
                <WatermarkImage url={selectedOffender?.images[0]?.optimised} />
              </div>
            </Col>
          )}
          <Col style={{ padding: '10px 20px' }}>
            <Descriptions column={1} size="small">
              <Descriptions.Item label="Age">
                {getOffenderAge(selectedOffender?.age)}
              </Descriptions.Item>
              <Descriptions.Item label="Build">
                {getOffenderBuild(selectedOffender?.build) || 'Unknown'}
              </Descriptions.Item>
              <Descriptions.Item label="Ethnicity">
                {getOffenderRace(selectedOffender?.race)}
              </Descriptions.Item>
              <Descriptions.Item label="Sex">
                {getOffenderGender(selectedOffender?.gender) || 'Unknown'}
              </Descriptions.Item>
              <Descriptions.Item label="Hair">
                {selectedOffender?.hair || 'Unknown'}
              </Descriptions.Item>
              <Descriptions.Item label="Peculiarities">
                {selectedOffender?.peculiarities || 'Unknown'}
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
          selectedOffender?.images.map((image) => ({
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

export default AddExistingOffender;
