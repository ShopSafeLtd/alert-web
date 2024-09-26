import type { WatermarkSlideType } from '#/components/images/WatermartkSlide.view';

import WatermarkImage from '#/components/images/WatermarkImage.view';
import WatermarkSlide from '#/components/images/WatermartkSlide.view';
import OffenderTile from '#/components/offenders/OffenderTile';
import OffenderTileSkeleton from '#/components/offenders/OffenderTileSkeleton';
import Loading from '#/components/shared-components/AntD/Loading';
import { useStoreState } from '#/state';
import DebouncedInput from '#/utils/debounced-input';
import {
  getOffenderAge,
  getOffenderBuild,
  getOffenderGender,
  getOffenderRace,
} from '#/utils/offender/get-offender-desc';
import {
  Button,
  Checkbox,
  Col,
  Descriptions,
  Divider,
  Empty,
  Input,
  Modal,
  Row,
  Select,
  Typography,
} from 'antd';
import { Age, Build, Gender, Race, Role } from 'graphql/types';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

import type {
  OffenderSearchDetailsFragment,
  SearchOffendersQuery,
} from './graphql/queries/__generated__/search-offender.generated';

import useStyles from './AddExistingOffender.styles';

const { Paragraph, Text } = Typography;

interface Props {
  addOverride?: string;
  age: Age[];
  build: Build[];
  clearFilters: () => void;
  currentId: string | undefined;
  data: SearchOffendersQuery | undefined;
  ethnicity: Race[];
  hair?: string;
  lightBoxOpen: {
    index: number;
    open: boolean;
  };
  loading: boolean;
  loadingMore: boolean;
  onPaginationChange: (page: number, pageSize: number) => void;
  onSubmit: (value: string | undefined) => void;
  openLightbox: (index: number) => void;
  pagination: { page: number; pageSize: number };
  peculiarities?: string;
  selectOffender: (id: string) => void;
  selectedLoading: boolean;
  selectedOffender: OffenderSearchDetailsFragment | null | undefined;
  selectedOffenders: OffenderSearchDetailsFragment[] | undefined;
  setAge: (value: Age[]) => void;
  setBuild: (value: Build[]) => void;
  setCurrentId: (value: string | undefined) => void;
  setEthnicity: (value: Race[]) => void;
  setHair: (value: string) => void;
  setPeculiarities: (value: string) => void;
  setSearch: (value: string) => void;
  setSex: (value: Gender[]) => void;
  sex: Gender[];
  type: 'multiple' | 'single';
}

const AddExistingOffender = ({
  addOverride,
  age,
  build,
  clearFilters,
  currentId,
  data,
  ethnicity,
  hair,
  lightBoxOpen,
  loading,
  loadingMore,
  onPaginationChange,
  onSubmit,
  openLightbox,
  pagination,
  peculiarities,
  selectOffender,
  selectedLoading,
  selectedOffender,
  selectedOffenders,
  setAge,
  setBuild,
  setCurrentId,
  setEthnicity,
  setHair,
  setPeculiarities,
  setSearch,
  setSex,
  sex,
  type,
}: Props): JSX.Element => {
  const classes = useStyles();
  const intl = useIntl();
  const role = useStoreState((state) => state.user.role);
  const publicOffenderDOB =
    useStoreState((state) => state.scheme.defaultPublicOffenderDOB) ||
    role !== Role.User;

  const offenderNodes = data?.searchOffenders?.edges || [];
  const existingOffenders = (): JSX.Element => {
    if (!data?.searchOffenders && loading) {
      return (
        <Row gutter={16} wrap>
          {Array.from({ length: data?.searchOffenders?.totalCount || 24 })
            .fill(0)
            .map(() => (
              <Col className="offender-item" span={4}>
                <OffenderTileSkeleton />
              </Col>
            ))}
        </Row>
      );
    }

    if (offenderNodes && offenderNodes.length > 0) {
      return (
        <Row gutter={16} style={{ marginRight: 0 }} wrap>
          {offenderNodes
            .filter(
              ({ node: offender }) =>
                !selectedOffenders?.some(
                  (selected) => selected.id === offender.id
                )
            )
            .map(({ node: offender }) => (
              <Col className="offender-item" key={offender.id} span={4}>
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
      <Row align="middle" className="no-offenders" justify="center">
        <Col>
          <Empty
            description={intl.formatMessage({
              defaultMessage: 'No matching offenders found',
            })}
          />
        </Col>
      </Row>
    );
  };

  const selectedOffendersCards = () => {
    if (type === 'single' || !selectedOffenders) return null;
    return (
      <div className={classes.selectedOffendersContainer}>
        <Row className={classes.selectedOffenders} gutter={16}>
          {selectedOffenders.map((offender) => (
            <Col className="offender-item" key={offender.id} span={4}>
              <Checkbox
                checked
                className={classes.checkBox}
                value={offender.id}
                // style={{ bord }}
              />
              <OffenderTile
                offender={offender}
                onClick={() => setCurrentId(offender.id)}
              />
            </Col>
          ))}
        </Row>
        <Divider />
      </div>
    );
  };

  return (
    <div className="add-existing-offender">
      <Row wrap={false}>
        <Col className={classes.offenders} span={20}>
          <DebouncedInput
            allowClear
            className={classes.searchBar}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
            placeholder={intl.formatMessage({
              defaultMessage: 'Search Offenders...',
            })}
          />
          {selectedOffendersCards()}
          <div
            className={
              !selectedOffenders?.length || type === 'single'
                ? classes.offendersContainerSingle
                : classes.offendersContainerMultiple
            }
          >
            {existingOffenders()}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 20,
              }}
            >
              <Button
                hidden={!data?.searchOffenders?.pageInfo?.hasNextPage}
                loading={loadingMore}
                onClick={() =>
                  onPaginationChange(pagination.page + 1, pagination.pageSize)
                }
                type={'primary'}
              >
                {intl.formatMessage({ defaultMessage: 'Load More' })}
              </Button>
            </div>

            {/* <Pagination */}
            {/*   current={pagination.page} */}
            {/*   hideOnSinglePage */}
            {/*   onChange={onPaginationChange} */}
            {/*   pageSize={pagination.pageSize} */}
            {/*   showSizeChanger={false} */}
            {/*   size="small" */}
            {/*   style={{ */}
            {/*     display: 'flex', */}
            {/*     justifyContent: 'center', */}
            {/*     width: '100%', */}
            {/*   }} */}
            {/*   total={data?.searchOffenders?.totalCount} */}
            {/* /> */}
          </div>
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
          <Row
            gutter={16}
            hidden={type === 'single'}
            justify="end"
            style={{ marginTop: 10, paddingBottom: 30 }}
          >
            <Col>
              <Button onClick={() => onSubmit(undefined)} type="primary">
                {intl.formatMessage({
                  defaultMessage: 'Add Offenders',
                })}
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>

      <Modal
        bodyStyle={{ padding: 0 }}
        okButtonProps={{ disabled: !selectedOffender }}
        // eslint-disable-next-line formatjs/no-literal-string-in-jsx
        okText={`${
          addOverride ||
          (selectedOffenders &&
          selectedOffenders.some((selected) => selected.id === currentId)
            ? intl.formatMessage({ defaultMessage: 'Remove' })
            : intl.formatMessage({ defaultMessage: 'Add' }))
        } Offender`}
        onCancel={() => setCurrentId(undefined)}
        onOk={() => {
          if (type === 'multiple') {
            selectOffender(selectedOffender?.id || '');
          } else {
            onSubmit(selectedOffender?.id);
          }
        }}
        open={!!currentId}
        // eslint-disable-next-line formatjs/no-literal-string-in-jsx
        title={`${
          addOverride ||
          (selectedOffenders &&
          selectedOffenders.some((selected) => selected.id === currentId)
            ? intl.formatMessage({ defaultMessage: 'Remove' })
            : intl.formatMessage({ defaultMessage: 'Add' }))
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        } ${selectedOffender?.name}`}
        zIndex={1010}
      >
        <Row gutter={16} wrap={false}>
          {currentId && !selectedLoading ? (
            <>
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
                <Link
                  target={'_blank'}
                  to={`/app/offenders/view/${selectedOffender?.id || ''}`}
                >
                  <Button danger type="ghost">
                    {intl.formatMessage({
                      defaultMessage: 'View Offender',
                    })}
                  </Button>
                </Link>
              </Col>
            </>
          ) : (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 20,
              }}
            >
              <Col style={{ padding: '10px 20px' }}>
                <Loading />
              </Col>
            </div>
          )}
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

export default AddExistingOffender;
