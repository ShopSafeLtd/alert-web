import { faTrash } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Card,
  Carousel,
  Col,
  Divider,
  Drawer,
  Input,
  Pagination,
  Popconfirm,
  Row,
  Spin,
  Typography,
} from 'antd';
import AddExisitingOffender from 'components/form-components/offender/offender/AddExistingOffender';
import WatermarkImage from 'components/images/WatermarkImage.view';
import { Age, Build, Gender, Race, Role } from 'graphql/generated';
import moment from 'moment';
import React from 'react';
import { useIntl } from 'react-intl';
import {
  getAge,
  getBuild,
  getEthnicity,
  getEthnicityShort,
  getSex,
} from 'utils'; // Import the useIntl hook
import type { ListOffendersQuery } from 'graphql/offenders/queries/__generated__/list-offenders.generated';
import type { SearchOffendersQuery } from 'graphql/offenders/queries/__generated__/search-offenders.generated';

import { useStoreState } from 'state';

import useStyles from './CreateCrimeGroup.styles';

const { Text, Title } = Typography;

interface Props {
  addOffender: boolean;
  loading: boolean;
  offendersData: ListOffendersQuery | undefined;
  offendersSelected: boolean;
  onPaginationChange: (page: number, size: number) => void;
  onSubmit: () => void;
  removeOffender: (id: string) => void;
  searchData: SearchOffendersQuery | undefined;
  selectOffender: (id: string) => void;
  setSearch: (value: string) => void;
  submitting: boolean;
  toggleAddOffender: () => void;
}

const CreateCrimeGroup = ({
  addOffender,
  loading,
  offendersData,
  offendersSelected,
  onPaginationChange,
  onSubmit,
  removeOffender,
  searchData,
  selectOffender,
  setSearch,
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
                'Select the offenders to add in to the new crime group.',
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
      <div>
        {offendersSelected ? (
          <Row gutter={16}>
            {offendersData?.listOffenders?.offenders.map((offender) => (
              <Col key={offender.id}>
                <Card
                  bodyStyle={{ padding: 0 }}
                  className={classes.offenderCol}
                >
                  <Carousel>
                    {offender.images.map((image) => (
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
                          {offender.name}
                        </Title>
                      </Col>
                      <Col>
                        <Popconfirm
                          disabled={submitting}
                          onConfirm={() => removeOffender(offender.id)}
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
                          {getAge(offender.age || Age.Unknown)}
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
                        {moment(offender.dateOfBirth).format('DD/MM/YYYY') ||
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
                        {offender.dateSource ||
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
                        {getBuild(offender.build || Build.Unknown)}
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
                        {getEthnicity(offender.race || Race.Unknown)}
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
                        {getSex(offender.gender || Gender.Unknown)}
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
                        {offender.lastActive?.dayTime ||
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
          <Row gutter={16}>
            <Col span={24}>
              <Row>
                <Col>
                  <Input
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={intl.formatMessage({
                      defaultMessage: 'Search for an offender',
                    })}
                    style={{ marginBottom: 15, width: 400 }}
                  />
                </Col>
              </Row>
            </Col>
            {searchData?.listOffenders?.offenders.map((offender) => (
              <Col key={offender.id} span={8}>
                <Card
                  bodyStyle={{ display: 'flex', padding: 0 }}
                  className={classes.offenderCard}
                  key={offender.id}
                  onClick={() => selectOffender(offender.id)}
                >
                  <div className={classes.offenderImage}>
                    <WatermarkImage
                      position={offender.images[0]?.position}
                      url={offender.images[0]?.optimised}
                    />
                  </div>
                  <div className={classes.offenderContent}>
                    <Text className={classes.offenderName}>
                      {offender.name}
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
                          {getAge(offender.age || Age.Unknown)}
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
                          {getBuild(offender.build || Build.Unknown)}
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
                          {getSex(offender.gender || Gender.Unknown)}
                        </Text>
                      </Col>
                      <Col>
                        <Text className={classes.offenderDetail}>
                          {intl.formatMessage({
                            defaultMessage: 'Ethnicity: ',
                          })}
                        </Text>
                        <Text type="secondary">
                          {getEthnicityShort(offender.race || Race.Unknown)}
                        </Text>
                      </Col>
                    </Row>
                  </div>
                </Card>
              </Col>
            ))}
            {loading && (
              <Col
                flex={1}
                style={{
                  alignItems: 'center',
                  display: 'flex',
                  height: '600px',
                  justifyContent: 'center',
                }}
              >
                <Spin />
              </Col>
            )}
            <Col span={24}>
              <Row justify="end">
                <Col>
                  <Pagination
                    onChange={onPaginationChange}
                    total={searchData?.listOffenders.total ?? 0}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        )}
      </div>

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
            offenderIds={offendersData?.listOffenders?.offenders.map(
              ({ id }) => id
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
