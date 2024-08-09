import type { WatermarkSlideType } from 'components/images/WatermartkSlide.view';
import type { ListOffendersAllSchemesQuery } from 'graphql/offenders/queries/__generated__/list-offenders-all-schemes.generated';

import {
  Button,
  Checkbox,
  Col,
  Descriptions,
  Input,
  Modal,
  Row,
  Select,
  Typography,
} from 'antd';
import WatermarkImage from 'components/images/WatermarkImage.view';
import WatermarkSlide from 'components/images/WatermartkSlide.view';
import OffenderTile from 'components/offenders/OffenderTile';
import OffenderTileSkeleton from 'components/offenders/OffenderTileSkeleton';
import { Age, Build, Gender, Race, Role } from 'graphql/types';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { useStoreState } from 'state';
import {
  getOffenderAge,
  getOffenderBuild,
  getOffenderGender,
  getOffenderRace,
} from 'utils/offender/get-offender-desc';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

import InfiniteSelectScrollList from '../select-list/InfiniteSelectList';
import useStyles from './SelectOffenders.styles';

const { Paragraph, Text } = Typography;

interface Props {
  addOverride?: string;
  age: Age[];
  build: Build[];
  clearFilters: () => void;
  data:
    | Exclude<
        ListOffendersAllSchemesQuery['listOffendersAllSchemes'],
        null | undefined
      >
    | null
    | undefined;
  ethnicity: Race[];
  fetchMoreScroll: () => void;
  hair: string;
  lightBoxOpen: {
    index: number;
    open: boolean;
  };
  loading: boolean;
  onClose: () => void;
  onSelect: (id: string) => void;
  onSubmit: () => void;
  openLightbox: (index: number) => void;
  peculiarities: string;
  saving: boolean;
  search: string;
  selected: string[];
  selectedOffender:
    | Exclude<
        ListOffendersAllSchemesQuery['listOffendersAllSchemes'],
        null | undefined
      >['offenders'][0]
    | null
    | undefined;
  setAge: (value: Age[]) => void;
  setBuild: (value: Build[]) => void;
  setCurrentId: (value: string | undefined) => void;
  setEthnicity: (value: Race[]) => void;
  setHair: (value: string) => void;
  setPeculiarities: (value: string) => void;
  setSearch: (value: string) => void;
  setSex: (value: Gender[]) => void;
  sex: Gender[];
}

const SelectedOffenders = ({
  addOverride,
  age,
  build,
  clearFilters,
  data,
  ethnicity,
  fetchMoreScroll,
  hair,
  lightBoxOpen,
  loading,
  onClose,
  onSelect,
  onSubmit,
  openLightbox,
  peculiarities,
  saving,
  search,
  selected,
  selectedOffender,
  setAge,
  setBuild,
  setCurrentId,
  setEthnicity,
  setHair,
  setPeculiarities,
  setSearch,
  setSex,
  sex,
}: Props): JSX.Element => {
  const classes = useStyles();
  const intl = useIntl();
  const role = useStoreState((state) => state.user.role);
  const publicOffenderDOB =
    useStoreState((state) => state.scheme.defaultPublicOffenderDOB) ||
    role !== Role.User;
  const isLoading = loading && !data?.total;
  const offenderItems = data?.offenders?.map((offender) => (
    <Col className={classes.card} key={offender.id} span={4}>
      {selected.includes(offender.id) && (
        <Checkbox
          checked
          className={classes.checkBox}
          onChange={() => onSelect(offender.id)}
          value={offender.id}
          // style={{ bord }}
        />
      )}
      <OffenderTile
        offender={offender}
        onClick={() => {
          setCurrentId(offender.id);
          // if (selected.includes(offender.id)) {
          //   onSelect(offender.id);
          // } else {
          //   setCurrentId(offender.id);
          // }
        }}
      />
    </Col>
  ));
  // const existingOffenders = (): JSX.Element => {
  //   if (!data && loading) {
  //     return (
  //       <Row wrap gutter={16}>
  //         {Array.from({ length: data?.total || 24 })
  //           .fill(0)
  //           .map(() => (
  //             <Col span={4} className="offender-item">
  //               <OffenderTileSkeleton />
  //             </Col>
  //           ))}
  //       </Row>
  //     );
  //   }

  //   if (data && data.total > 0) {
  //     return (
  //       <Row wrap gutter={16} style={{ marginRight: 0 }}>
  //         {data?.offenders.map((offender) => (
  //           <Col span={4} key={offender.id} className={classes.card}>
  //             {selected.includes(offender.id) && (
  //               <Checkbox
  //                 value={offender.id}
  //                 checked
  //                 onChange={() => onSelect(offender.id)}
  //                 className={classes.checkBox}
  //                 // style={{ bord }}
  //               />
  //             )}
  //             <OffenderTile
  //               offender={offender}
  //               onClick={() => {
  //                 setCurrentId(offender.id);
  //                 // if (selected.includes(offender.id)) {
  //                 //   onSelect(offender.id);
  //                 // } else {
  //                 //   setCurrentId(offender.id);
  //                 // }
  //               }}
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
  //             defaultMessage: 'No matching offenders found',
  //             id: 'ykYp5y',
  //           })}
  //         />
  //       </Col>
  //     </Row>
  //   );
  // };
  return (
    <div style={{ overflow: 'hidden' }}>
      <Row wrap={false}>
        <Col className={classes.offenders} span={20}>
          <Input
            allowClear
            className={classes.searchBar}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={intl.formatMessage({
              defaultMessage: 'Search Offenders...',
            })}
            value={search}
          />
          <InfiniteSelectScrollList
            dataLength={data?.offenders?.length}
            hasMore={(data?.offenders?.length || 0) < (data?.total || 0)}
            isLoading={isLoading}
            items={offenderItems}
            loadingItems={<OffenderTileSkeleton />}
            next={fetchMoreScroll}
          />
          {/* <div className="add-existing-offender-row">
          {existingOffenders()}
          <Pagination
              style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
              }}
              total={data?.total}
              size="small"
              showSizeChanger={false}
              onChange={onPaginationChange}
              pageSize={pagination.pageSize}
              hideOnSinglePage
              current={pagination.page}
            />
          </div> */}
        </Col>
        <Col className={classes.filters} span={4}>
          <Paragraph className={classes.filterTitle}>
            {intl.formatMessage({ defaultMessage: 'Filters' })}
          </Paragraph>
          <div className={classes.filter}>
            <Text>
              {intl.formatMessage({
                defaultMessage: 'Ethnicity',
              })}
            </Text>
            <Select
              allowClear
              className={classes.filterSelect}
              mode="multiple"
              onChange={setEthnicity}
              placeholder={intl.formatMessage({
                defaultMessage: 'Ethnicity',
              })}
              value={ethnicity}
            >
              <Select.Option value={Race.Ic1}>
                {intl.formatMessage({
                  defaultMessage: 'IC1 - North European',
                })}
              </Select.Option>
              <Select.Option value={Race.Ic2}>
                {intl.formatMessage({
                  defaultMessage: 'IC2 - South European',
                })}
              </Select.Option>
              <Select.Option value={Race.Ic3}>
                {intl.formatMessage({
                  defaultMessage: 'IC3 - Black',
                })}
              </Select.Option>
              <Select.Option value={Race.Ic4}>
                {intl.formatMessage({
                  defaultMessage: 'IC4 - South Asian',
                })}
              </Select.Option>
              <Select.Option value={Race.Ic5}>
                {intl.formatMessage({
                  defaultMessage: 'IC5 - Southeast Asian',
                })}
              </Select.Option>
              <Select.Option value={Race.Ic6}>
                {intl.formatMessage({
                  defaultMessage: 'IC6 - North African or Arab',
                })}
              </Select.Option>
              <Select.Option value={Race.Unknown}>
                {intl.formatMessage({
                  defaultMessage: 'Unknown',
                })}
              </Select.Option>
            </Select>
          </div>
          <div className={classes.filter}>
            <Text>{intl.formatMessage({ defaultMessage: 'Build' })}</Text>
            <Select
              allowClear
              className={classes.filterSelect}
              mode="multiple"
              onChange={setBuild}
              placeholder={intl.formatMessage({
                defaultMessage: 'Build',
              })}
              value={build}
            >
              <Select.Option value={Build.Small}>
                {intl.formatMessage({ defaultMessage: 'Small' })}
              </Select.Option>
              <Select.Option value={Build.Medium}>
                {intl.formatMessage({ defaultMessage: 'Medium' })}
              </Select.Option>
              <Select.Option value={Build.Large}>
                {intl.formatMessage({ defaultMessage: 'Large' })}
              </Select.Option>
              <Select.Option value={Build.Unknown}>
                {intl.formatMessage({
                  defaultMessage: 'Unknown',
                })}
              </Select.Option>
            </Select>
          </div>
          {publicOffenderDOB && (
            <div className={classes.filter}>
              <Text>{intl.formatMessage({ defaultMessage: 'Age' })}</Text>
              <Select
                allowClear
                className={classes.filterSelect}
                mode="multiple"
                onChange={setAge}
                placeholder={intl.formatMessage({
                  defaultMessage: 'Age',
                })}
                value={age}
              >
                <Select.Option value={Age.UnderEighteen}>
                  {intl.formatMessage({
                    defaultMessage: 'Under 18',
                  })}
                </Select.Option>
                <Select.Option value={Age.EighteenThirty}>
                  {intl.formatMessage({
                    defaultMessage: '18 - 30',
                  })}
                </Select.Option>
                <Select.Option value={Age.ThirtyForty}>
                  {intl.formatMessage({
                    defaultMessage: '30 - 40',
                  })}
                </Select.Option>
                <Select.Option value={Age.FortyFifty}>
                  {intl.formatMessage({
                    defaultMessage: '40 - 50',
                  })}
                </Select.Option>
                <Select.Option value={Age.FiftySixty}>
                  {intl.formatMessage({
                    defaultMessage: '50 - 60',
                  })}
                </Select.Option>
                <Select.Option value={Age.SixtySeventy}>
                  {intl.formatMessage({
                    defaultMessage: '60 - 70',
                  })}
                </Select.Option>
                <Select.Option value={Age.SeventyEighty}>
                  {intl.formatMessage({
                    defaultMessage: '70 - 80',
                  })}
                </Select.Option>
                <Select.Option value={Age.OverEighty}>
                  {intl.formatMessage({
                    defaultMessage: 'Over 80',
                  })}
                </Select.Option>
                <Select.Option value={Age.Unknown}>
                  {intl.formatMessage({
                    defaultMessage: 'Unknown',
                  })}
                </Select.Option>
              </Select>
            </div>
          )}
          <div className={classes.filter}>
            <Text>{intl.formatMessage({ defaultMessage: 'Sex' })}</Text>
            <Select
              allowClear
              className={classes.filterSelect}
              mode="multiple"
              onChange={setSex}
              placeholder={intl.formatMessage({
                defaultMessage: 'Sex',
              })}
              value={sex}
            >
              <Select.Option value={Gender.Female}>
                {intl.formatMessage({ defaultMessage: 'Female' })}
              </Select.Option>
              <Select.Option value={Gender.Male}>
                {intl.formatMessage({ defaultMessage: 'Male' })}
              </Select.Option>
              <Select.Option value={Gender.Unknown}>
                {intl.formatMessage({
                  defaultMessage: 'Unknown',
                })}
              </Select.Option>
            </Select>
          </div>
          <div className={classes.filter}>
            <Text>{intl.formatMessage({ defaultMessage: 'Hair' })}</Text>
            <Input.TextArea
              onChange={(e) => setHair(e.target.value)}
              value={hair}
            />
          </div>
          <div className={classes.filter}>
            <Text>
              {intl.formatMessage({
                defaultMessage: 'Characteristics',
              })}
            </Text>
            <Input.TextArea
              onChange={(e) => setPeculiarities(e.target.value)}
              value={peculiarities}
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
      <Row gutter={16} justify="end" style={{ paddingBottom: 30 }}>
        <Col>
          <Button disabled={saving} onClick={onClose} type="text">
            {intl.formatMessage({ defaultMessage: 'Cancel' })}
          </Button>
        </Col>
        <Col>
          <Button
            disabled={saving}
            loading={saving}
            onClick={onSubmit}
            type="primary"
          >
            {intl.formatMessage({
              defaultMessage: 'Add Offenders',
            })}
          </Button>
        </Col>
      </Row>
      <Modal
        bodyStyle={{ padding: 0 }}
        okText={intl.formatMessage(
          {
            defaultMessage: '{text} Offender',
          },
          {
            text:
              addOverride ||
              (selectedOffender?.id && selected.includes(selectedOffender?.id)
                ? intl.formatMessage({
                    defaultMessage: 'Unselect',
                  })
                : intl.formatMessage({
                    defaultMessage: 'Select',
                  })),
          }
        )}
        onCancel={() => setCurrentId(undefined)}
        onOk={() => onSelect(selectedOffender?.id || '')}
        open={!!selectedOffender}
        // eslint-disable-next-line formatjs/no-literal-string-in-jsx
        title={`${
          addOverride || intl.formatMessage({ defaultMessage: 'Add' })
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        } ${selectedOffender?.name}`}
        zIndex={1010}
      >
        <Row gutter={16} wrap={false}>
          {selectedOffender && selectedOffender.images.length > 0 && (
            <Col>
              <div
                style={{
                  height: 250,
                  width: 200,
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
                })}
              >
                {getOffenderAge(selectedOffender?.age)}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  defaultMessage: 'Build',
                })}
              >
                {getOffenderBuild(selectedOffender?.build) ||
                  intl.formatMessage({
                    defaultMessage: 'Unknown',
                  })}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  defaultMessage: 'Ethnicity',
                })}
              >
                {getOffenderRace(selectedOffender?.race)}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  defaultMessage: 'Sex',
                })}
              >
                {getOffenderGender(selectedOffender?.gender) ||
                  intl.formatMessage({
                    defaultMessage: 'Unknown',
                  })}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  defaultMessage: 'Hair',
                })}
              >
                {selectedOffender?.hair ||
                  intl.formatMessage({
                    defaultMessage: 'Unknown',
                  })}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  defaultMessage: 'Characteristics',
                })}
              >
                {selectedOffender?.peculiarities ||
                  intl.formatMessage({
                    defaultMessage: 'Unknown',
                  })}
              </Descriptions.Item>
            </Descriptions>
            <Link to={`/app/offenders/view/${selectedOffender?.id || ''}`}>
              <Button danger type="ghost">
                {intl.formatMessage({
                  defaultMessage: 'View Offender',
                })}
              </Button>
            </Link>
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
          selectedOffender?.images.map((image) => ({
            src: image.optimised || '',
          })) || []
        }
      />
    </div>
  );
};

export default SelectedOffenders;
