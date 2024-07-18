import CompactSkeletonCard from '#/components/offenders/OffenderCard/OffenderSkeletonCard.view';
import Loading from '#/components/shared-components/AntD/Loading';
import { faTrash } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Card,
  Carousel,
  Col,
  Divider,
  Drawer,
  Empty,
  Popconfirm,
  Row,
  Typography,
} from 'antd';
import AddExisitingOffender from 'components/form-components/offender/offender/AddExistingOffender';
import WatermarkImage from 'components/images/WatermarkImage.view';
import { Age, Build, Gender, Race, Role } from 'graphql/types';
import moment from 'moment';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useIntl } from 'react-intl';
import { useStoreState } from 'state';
import {
  getAge,
  getBuild,
  getEthnicity,
  getEthnicityShort,
  getSex,
} from 'utils';

import type { ListOffendersCardQuery } from './graphql/list-offender-card.generated';
import type { SearchOffendersRelayQuery } from './graphql/search-offenders-relay.generated';

import useStyles from './CreateCrimeGroup.styles';

const { Text, Title } = Typography;

interface Props {
  addOffender: boolean;
  fetchMoreScroll: () => void;
  loading: boolean;
  offendersData: ListOffendersCardQuery | undefined;
  offendersSelected: boolean;
  onSubmit: () => void;
  removeOffender: (id: string) => void;
  searchData: SearchOffendersRelayQuery | undefined;
  selectOffender: (id: string) => void;
  submitting: boolean;
  toggleAddOffender: () => void;
}

const CreateCrimeGroup = ({
  addOffender,
  fetchMoreScroll,
  loading,
  offendersData,
  offendersSelected,
  onSubmit,
  removeOffender,
  searchData,
  selectOffender,
  submitting,
  toggleAddOffender,
}: Props) => {
  const classes = useStyles();
  const intl = useIntl(); // Initialize the useIntl hook
  const role = useStoreState((state) => state.user.role);
  const publicOffenderDOB =
    useStoreState((state) => state.scheme.defaultPublicOffenderDOB) ||
    role !== Role.User;
  return (
    <div className={classes.page}>
      <Row align="middle" className={classes.headerRow}>
        <Col flex={1}>
          <Title level={3} style={{ margin: 0 }}>
            {intl.formatMessage({
              defaultMessage:
                'Select the offenders to be in the new crime group',
            })}
          </Title>
        </Col>
        <Col>
          <Button
            disabled={submitting}
            loading={submitting}
            onClick={onSubmit}
            type="primary"
          >
            {intl.formatMessage({
              defaultMessage: 'Create Crime Group',
            })}
          </Button>
        </Col>
      </Row>

      {loading ? (
        <Row
          align="stretch"
          gutter={24}
          style={{
            alignItems: 'stretch',
            overflowX: 'hidden',
            padding: 10,
          }}
        >
          {Array.from({ length: 18 }).map((_, index) => (
            <Col
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              span={8}
              style={{ marginBottom: 20 }}
              xxl={6}
            >
              <CompactSkeletonCard />
            </Col>
          ))}
        </Row>
      ) : (
        <div>
          {offendersSelected ? (
            <Row gutter={16}>
              {offendersData?.listOffendersRelay.edges.map((t) => (
                <Col key={t?.node?.id}>
                  <Card
                    bodyStyle={{ padding: 0 }}
                    className={classes.offenderCol}
                  >
                    <Carousel>
                      {t?.node?.images.map((image) => (
                        <div className={classes.imageContainer} key={image.id}>
                          <div className={classes.image}>
                            <WatermarkImage
                              position={image.position}
                              rotation={image.rotation}
                              url={image.optimised}
                            />
                          </div>
                        </div>
                      ))}
                    </Carousel>
                    <div>
                      <Row align="middle">
                        <Col flex={1}>
                          <Title className={classes.title} level={4}>
                            {t?.node?.name}
                          </Title>
                        </Col>
                        <Col>
                          <Popconfirm
                            disabled={submitting}
                            onConfirm={() => removeOffender(t?.node?.id)}
                            overlayInnerStyle={{ padding: 10 }}
                            title={intl.formatMessage({
                              defaultMessage: 'Are you sure?',
                            })}
                          >
                            <Button
                              className={classes.deleteButton}
                              disabled={submitting}
                              size="small"
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </Button>
                          </Popconfirm>
                        </Col>
                      </Row>
                      <Divider style={{ margin: 0 }} />
                      {publicOffenderDOB && (
                        <div className={classes.field}>
                          <Text>
                            {intl.formatMessage({
                              defaultMessage: 'Age:',
                            })}
                          </Text>
                          <Text type="secondary">
                            {getAge(t?.node?.age || Age.Unknown)}
                          </Text>
                        </div>
                      )}
                      <Divider style={{ margin: 0 }} />
                      <div className={classes.field}>
                        <Text>
                          {intl.formatMessage({
                            defaultMessage: 'Date Of Birth:',
                          })}
                        </Text>
                        <Text type="secondary">
                          {moment(t?.node?.dateOfBirth).format('DD/MM/YYYY') ||
                            intl.formatMessage({
                              defaultMessage: 'Unknown',
                            })}
                        </Text>
                      </div>
                      <Divider style={{ margin: 0 }} />
                      <div className={classes.field}>
                        <Text>
                          {intl.formatMessage({
                            defaultMessage: 'DoB Source:',
                          })}
                        </Text>
                        <Text type="secondary">
                          {t?.node?.dateSource ||
                            intl.formatMessage({
                              defaultMessage: 'None',
                            })}
                        </Text>
                      </div>
                      <Divider style={{ margin: 0 }} />
                      <div className={classes.field}>
                        <Text>
                          {intl.formatMessage({
                            defaultMessage: 'Build:',
                          })}
                        </Text>
                        <Text type="secondary">
                          {getBuild(t?.node?.build || Build.Unknown)}
                        </Text>
                      </div>
                      <Divider style={{ margin: 0 }} />
                      <div className={classes.field}>
                        <Text>
                          {intl.formatMessage({
                            defaultMessage: 'Ethnicity:',
                          })}
                        </Text>
                        <Text type="secondary">
                          {getEthnicity(t?.node?.race || Race.Unknown)}
                        </Text>
                      </div>
                      <Divider style={{ margin: 0 }} />
                      <div className={classes.field}>
                        <Text>
                          {intl.formatMessage({
                            defaultMessage: 'Sex:',
                          })}
                        </Text>
                        <Text type="secondary">
                          {getSex(t?.node?.gender || Gender.Unknown)}
                        </Text>
                      </div>
                      <Divider style={{ margin: 0 }} />
                      <div className={classes.field}>
                        <Text>
                          {intl.formatMessage({
                            defaultMessage: 'Last Active:',
                          })}
                        </Text>
                        <Text type="secondary">
                          {t?.node?.lastActive?.dayTime ||
                            intl.formatMessage({
                              defaultMessage: 'Never',
                            })}
                        </Text>
                      </div>
                      <Divider style={{ margin: 0 }} />
                    </div>
                  </Card>
                </Col>
              ))}
              <Col className={classes.addCol}>
                <Button
                  disabled={submitting}
                  onClick={toggleAddOffender}
                  type="primary"
                >
                  {intl.formatMessage({
                    defaultMessage: 'Add Offender',
                  })}
                </Button>
              </Col>
            </Row>
          ) : (
            <div>
              {searchData?.listOffendersRelay?.edges &&
              searchData?.listOffendersRelay?.edges.length > 0 ? (
                <InfiniteScroll
                  dataLength={searchData?.listOffendersRelay?.edges.length}
                  endMessage={
                    <p style={{ textAlign: 'center' }}>
                      {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                      <b>-----------</b>
                    </p>
                  }
                  hasMore={searchData?.listOffendersRelay.pageInfo.hasNextPage}
                  height="calc(100vh - 78px)"
                  loader={<Loading />}
                  next={() => fetchMoreScroll()}
                  style={{ overflowX: 'hidden' }}
                >
                  <Row
                    align="stretch"
                    gutter={[10, 10]}
                    style={{
                      alignItems: 'stretch',
                      overflowX: 'hidden',
                      padding: 10,
                    }}
                  >
                    {searchData.listOffendersRelay.edges.map((t) => (
                      <Col key={t?.node?.id}>
                        <Card
                          bodyStyle={{ display: 'flex', padding: 0 }}
                          className={classes.offenderCard}
                          onClick={() => selectOffender(t?.node?.id)}
                        >
                          <div className={classes.offenderImage}>
                            <WatermarkImage
                              position={t?.node?.images[0]?.position}
                              url={t?.node?.images[0]?.optimised}
                            />
                          </div>
                          <div className={classes.offenderContent}>
                            <Text className={classes.offenderName}>
                              {t?.node?.name}
                            </Text>
                            <Row gutter={8}>
                              <Col>
                                <Text className={classes.offenderDetail}>
                                  {intl.formatMessage({
                                    defaultMessage: 'Age: ',
                                  })}
                                </Text>
                                <Text
                                  className={classes.offenderDetail}
                                  type="secondary"
                                >
                                  {getAge(t?.node?.age || Age.Unknown)}
                                </Text>
                              </Col>
                              <Col>
                                <Text className={classes.offenderDetail}>
                                  {intl.formatMessage({
                                    defaultMessage: 'Build: ',
                                  })}
                                </Text>
                                <Text
                                  className={classes.offenderDetail}
                                  type="secondary"
                                >
                                  {getBuild(t?.node?.build || Build.Unknown)}
                                </Text>
                              </Col>
                            </Row>
                            <Row gutter={8}>
                              <Col>
                                <Text className={classes.offenderDetail}>
                                  {intl.formatMessage({
                                    defaultMessage: 'Sex: ',
                                  })}
                                </Text>
                                <Text
                                  className={classes.offenderDetail}
                                  type="secondary"
                                >
                                  {getSex(t?.node?.gender || Gender.Unknown)}
                                </Text>
                              </Col>
                              <Col>
                                <Text className={classes.offenderDetail}>
                                  {intl.formatMessage({
                                    defaultMessage: 'Ethnicity: ',
                                  })}
                                </Text>
                                <Text type="secondary">
                                  {getEthnicityShort(
                                    t?.node?.race || Race.Unknown
                                  )}
                                </Text>
                              </Col>
                            </Row>
                          </div>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </InfiniteScroll>
              ) : (
                <div
                  style={{
                    alignItems: 'center',
                    display: 'flex',
                    flex: 1,
                    height: 'calc(100vh - 100px)',
                    justifyContent: 'center',
                  }}
                >
                  <Empty
                    description={
                      intl.formatMessage({
                        defaultMessage: 'No Offenders',
                      })
                      // search === ''
                      //   ? intl.formatMessage({
                      //       defaultMessage: 'No Offenders',
                      //     })
                      //   : intl.formatMessage({
                      //       defaultMessage:
                      //         'No offenders match your search criteria',
                      //     })
                    }
                  />
                </div>
              )}
            </div>
          )}
        </div>
      )}
      <Drawer
        onClose={toggleAddOffender}
        open={addOffender}
        title={intl.formatMessage({
          defaultMessage: 'Add Offenders',
        })}
        width="800"
        zIndex={1001}
      >
        {addOffender ? (
          <AddExisitingOffender
            offenderIds={offendersData?.listOffendersRelay.edges?.map(
              (t) => t.node.id
            )}
            onClose={toggleAddOffender}
            update={(offender) => selectOffender(offender.id)}
          />
        ) : (
          <div />
        )}
      </Drawer>
    </div>
  );
};

export default CreateCrimeGroup;
