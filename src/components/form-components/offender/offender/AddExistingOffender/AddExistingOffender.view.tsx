/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import type { ListOffendersAllSchemesQuery } from 'graphql/generated';
import { Role, Age, Build, Gender, Race } from 'graphql/generated';
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
import type { WatermarkSlideType } from 'components/images/WatermartkSlide.view';
import WatermarkSlide from 'components/images/WatermartkSlide.view';
import { useIntl } from 'react-intl';
import { useStoreState } from 'state';
import { Link } from 'react-router-dom';
import useStyles from './AddExistingOffender.styles';

const { Paragraph, Text } = Typography;

interface Props {
  onSubmit: (value: string | undefined) => void;
  data: ListOffendersAllSchemesQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  pagination: { page: number; pageSize: number };
  onPaginationChange: (page: number, pageSize: number) => void;
  setCurrentId: (value: string | undefined) => void;
  selectedOffender:
    | Exclude<
        ListOffendersAllSchemesQuery['listOffendersAllSchemes'],
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
  addOverride?: string;
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
  addOverride,
}: Props): JSX.Element => {
  const classes = useStyles();
  const intl = useIntl();
  const role = useStoreState((state) => state.user.role);
  const publicOffenderDOB =
    useStoreState((state) => state.scheme.defaultPublicOffenderDOB) ||
    role !== Role.User;
  const existingOffenders = (): JSX.Element => {
    if (!data?.listOffendersAllSchemes && loading) {
      return (
        <Row wrap gutter={16}>
          {Array.from({ length: data?.listOffendersAllSchemes?.total || 24 })
            .fill(0)
            .map(() => (
              <Col span={4} className="offender-item">
                <OffenderTileSkeleton />
              </Col>
            ))}
        </Row>
      );
    }

    if (
      data &&
      data.listOffendersAllSchemes &&
      data.listOffendersAllSchemes.offenders.length > 0
    ) {
      return (
        <Row wrap gutter={16} style={{ marginRight: 0 }}>
          {data.listOffendersAllSchemes.offenders.map((offender) => (
            <Col span={4} key={offender.id} className="offender-item">
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
          <Empty
            description={intl.formatMessage({
              defaultMessage: 'No matching offenders found',
              id: 'ykYp5y',
            })}
          />
        </Col>
      </Row>
    );
  };
  return (
    <div className="add-existing-offender">
      <Row wrap={false}>
        <Col span={20} className={classes.offenders}>
          <Input
            value={search}
            className={classes.searchBar}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={intl.formatMessage({
              defaultMessage: 'Search Offenders...',
              id: 'mCDjFM',
            })}
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
              total={data?.listOffendersAllSchemes?.total}
              size="small"
              showSizeChanger={false}
              onChange={onPaginationChange}
              pageSize={pagination.pageSize}
              hideOnSinglePage
              current={pagination.page}
            />
          </div>
        </Col>
        <Col className={classes.filters} span={4}>
          <Paragraph className={classes.filterTitle}>
            {intl.formatMessage({ defaultMessage: 'Filters', id: 'zSOvI0' })}
          </Paragraph>
          <div className={classes.filter}>
            <Text>
              {intl.formatMessage({
                defaultMessage: 'Ethnicity',
                id: 'XtCAFo',
              })}
            </Text>
            <Select
              value={ethnicity}
              onChange={setEthnicity}
              placeholder={intl.formatMessage({
                defaultMessage: 'Ethnicity',
                id: 'XtCAFo',
              })}
              className={classes.filterSelect}
              mode="multiple"
              allowClear
            >
              <Select.Option value={Race.Ic1}>
                {intl.formatMessage({
                  defaultMessage: 'IC1 - North European',
                  id: 'ZbGHgq',
                })}
              </Select.Option>
              <Select.Option value={Race.Ic2}>
                {intl.formatMessage({
                  defaultMessage: 'IC2 - South European',
                  id: 'qDNJ3C',
                })}
              </Select.Option>
              <Select.Option value={Race.Ic3}>
                {intl.formatMessage({
                  defaultMessage: 'IC3 - Black',
                  id: 'k0NwMh',
                })}
              </Select.Option>
              <Select.Option value={Race.Ic4}>
                {intl.formatMessage({
                  defaultMessage: 'IC4 - South Asian',
                  id: 'nok2Wh',
                })}
              </Select.Option>
              <Select.Option value={Race.Ic5}>
                {intl.formatMessage({
                  defaultMessage: 'IC5 - Southeast Asian',
                  id: 'u7exuh',
                })}
              </Select.Option>
              <Select.Option value={Race.Ic6}>
                {intl.formatMessage({
                  defaultMessage: 'IC6 - North African or Arab',
                  id: 'V2hDQr',
                })}
              </Select.Option>
              <Select.Option value={Race.Unknown}>
                {intl.formatMessage({
                  defaultMessage: 'Unknown',
                  id: '5jeq8P',
                })}
              </Select.Option>
            </Select>
          </div>
          <div className={classes.filter}>
            <Text>
              {intl.formatMessage({ defaultMessage: 'Build', id: 'RSctv1' })}
            </Text>
            <Select
              mode="multiple"
              allowClear
              value={build}
              onChange={setBuild}
              placeholder={intl.formatMessage({
                defaultMessage: 'Build',
                id: 'RSctv1',
              })}
              className={classes.filterSelect}
            >
              <Select.Option value={Build.Small}>
                {intl.formatMessage({ defaultMessage: 'Small', id: 'BPnT3T' })}
              </Select.Option>
              <Select.Option value={Build.Medium}>
                {intl.formatMessage({ defaultMessage: 'Medium', id: 'ovJ26C' })}
              </Select.Option>
              <Select.Option value={Build.Large}>
                {intl.formatMessage({ defaultMessage: 'Large', id: '/06iwc' })}
              </Select.Option>
              <Select.Option value={Build.Unknown}>
                {intl.formatMessage({
                  defaultMessage: 'Unknown',
                  id: '5jeq8P',
                })}
              </Select.Option>
            </Select>
          </div>
          {publicOffenderDOB && (
            <div className={classes.filter}>
              <Text>
                {intl.formatMessage({ defaultMessage: 'Age', id: '9oNQSC' })}
              </Text>
              <Select
                mode="multiple"
                allowClear
                value={age}
                onChange={setAge}
                placeholder={intl.formatMessage({
                  defaultMessage: 'Age',
                  id: '9oNQSC',
                })}
                className={classes.filterSelect}
              >
                <Select.Option value={Age.UnderEighteen}>
                  {intl.formatMessage({
                    defaultMessage: 'Under 18',
                    id: 'Cwx1GS',
                  })}
                </Select.Option>
                <Select.Option value={Age.EighteenThirty}>
                  {intl.formatMessage({
                    defaultMessage: '18 - 30',
                    id: '088rlR',
                  })}
                </Select.Option>
                <Select.Option value={Age.ThirtyForty}>
                  {intl.formatMessage({
                    defaultMessage: '30 - 40',
                    id: 'cENhUd',
                  })}
                </Select.Option>
                <Select.Option value={Age.FortyFifty}>
                  {intl.formatMessage({
                    defaultMessage: '40 - 50',
                    id: 'FEg968',
                  })}
                </Select.Option>
                <Select.Option value={Age.FiftySixty}>
                  {intl.formatMessage({
                    defaultMessage: '50 - 60',
                    id: 'xuMURn',
                  })}
                </Select.Option>
                <Select.Option value={Age.SixtySeventy}>
                  {intl.formatMessage({
                    defaultMessage: '60 - 70',
                    id: 'W8pA9z',
                  })}
                </Select.Option>
                <Select.Option value={Age.SeventyEighty}>
                  {intl.formatMessage({
                    defaultMessage: '70 - 80',
                    id: 'yjJSPV',
                  })}
                </Select.Option>
                <Select.Option value={Age.OverEighty}>
                  {intl.formatMessage({
                    defaultMessage: 'Over 80',
                    id: 'oFu9sf',
                  })}
                </Select.Option>
                <Select.Option value={Age.Unknown}>
                  {intl.formatMessage({
                    defaultMessage: 'Unknown',
                    id: '5jeq8P',
                  })}
                </Select.Option>
              </Select>
            </div>
          )}
          <div className={classes.filter}>
            <Text>
              {intl.formatMessage({ defaultMessage: 'Sex', id: 'eWJHGp' })}
            </Text>
            <Select
              mode="multiple"
              allowClear
              value={sex}
              onChange={setSex}
              placeholder={intl.formatMessage({
                defaultMessage: 'Sex',
                id: 'eWJHGp',
              })}
              className={classes.filterSelect}
            >
              <Select.Option value={Gender.Female}>
                {intl.formatMessage({ defaultMessage: 'Female', id: '74BYXL' })}
              </Select.Option>
              <Select.Option value={Gender.Male}>
                {intl.formatMessage({ defaultMessage: 'Male', id: 'jIbAky' })}
              </Select.Option>
              <Select.Option value={Gender.Unknown}>
                {intl.formatMessage({
                  defaultMessage: 'Unknown',
                  id: '5jeq8P',
                })}
              </Select.Option>
            </Select>
          </div>
          <div className={classes.filter}>
            <Text>
              {intl.formatMessage({ defaultMessage: 'Hair', id: 'e4YBbX' })}
            </Text>
            <Input.TextArea
              value={hair}
              onChange={(e) => setHair(e.target.value)}
            />
          </div>
          <div className={classes.filter}>
            <Text>
              {intl.formatMessage({
                defaultMessage: 'Characteristics',
                id: 'xksukL',
              })}
            </Text>
            <Input.TextArea
              value={peculiarities}
              onChange={(e) => setPeculiarities(e.target.value)}
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
        open={!!selectedOffender}
        zIndex={1010}
        // eslint-disable-next-line formatjs/no-literal-string-in-jsx
        okText={`${
          addOverride ||
          intl.formatMessage({ defaultMessage: 'Add', id: '2/2yg+' })
        } Offender`}
        onOk={() => onSubmit(selectedOffender?.id)}
        onCancel={() => setCurrentId(undefined)}
        bodyStyle={{ padding: 0 }}
        // eslint-disable-next-line formatjs/no-literal-string-in-jsx
        title={`${
          addOverride ||
          intl.formatMessage({ defaultMessage: 'Add', id: '2/2yg+' })
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        } ${selectedOffender?.name}`}
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
                <WatermarkImage
                  position={selectedOffender?.images[0]?.position}
                  url={selectedOffender?.images[0]?.optimised}
                />
              </div>
            </Col>
          )}
          <Col style={{ padding: '10px 20px' }}>
            <Descriptions column={1} size="small">
              <Descriptions.Item
                label={intl.formatMessage({
                  defaultMessage: 'Age',
                  id: '9oNQSC',
                })}
              >
                {getOffenderAge(selectedOffender?.age)}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  defaultMessage: 'Build',
                  id: 'RSctv1',
                })}
              >
                {getOffenderBuild(selectedOffender?.build) ||
                  intl.formatMessage({
                    defaultMessage: 'Unknown',
                    id: '5jeq8P',
                  })}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  defaultMessage: 'Ethnicity',
                  id: 'XtCAFo',
                })}
              >
                {getOffenderRace(selectedOffender?.race)}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  defaultMessage: 'Sex',
                  id: 'eWJHGp',
                })}
              >
                {getOffenderGender(selectedOffender?.gender) ||
                  intl.formatMessage({
                    defaultMessage: 'Unknown',
                    id: '5jeq8P',
                  })}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  defaultMessage: 'Hair',
                  id: 'e4YBbX',
                })}
              >
                {selectedOffender?.hair ||
                  intl.formatMessage({
                    defaultMessage: 'Unknown',
                    id: '5jeq8P',
                  })}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  defaultMessage: 'Characteristics',
                  id: 'xksukL',
                })}
              >
                {selectedOffender?.peculiarities ||
                  intl.formatMessage({
                    defaultMessage: 'Unknown',
                    id: '5jeq8P',
                  })}
              </Descriptions.Item>
            </Descriptions>
            <Link to={`/app/offenders/view/${selectedOffender?.id || ''}`}>
              <Button type="ghost" danger>
                {intl.formatMessage({
                  defaultMessage: 'View Offender',
                  id: 'GszQTo',
                })}
              </Button>
            </Link>
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
