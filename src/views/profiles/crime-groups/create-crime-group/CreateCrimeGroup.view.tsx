import React from 'react';
import {
  Button,
  Card,
  Carousel,
  Col,
  Divider,
  Drawer,
  Popconfirm,
  Row,
  Spin,
  Typography,
} from 'antd';

import AddExisitingOffender from 'components/form-components/offender/offender/AddExistingOffender';
import {
  getAge,
  getBuild,
  getEthnicity,
  getEthnicityShort,
  getSex,
} from 'utils';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/pro-light-svg-icons';
import WatermarkImage from 'components/images/WatermarkImage.view';
import { useIntl } from 'react-intl'; // Import the useIntl hook
import { useStoreState } from 'state';
import useStyles from './CreateCrimeGroup.styles';
import type { SearchOffendersQuery } from 'graphql/offenders/queries/search-offenders.generated';
import type { ListOffendersQuery } from 'graphql/offenders/queries/list-offenders.generated';
import { Age, Build, Gender, Race, Role } from 'graphql/types';

const { Title, Text } = Typography;

interface Props {
  searchData: SearchOffendersQuery | undefined;
  loading: boolean;
  selectOffender: (id: string) => void;
  offendersData: ListOffendersQuery | undefined;
  offendersSelected: boolean;
  addOffender: boolean;
  toggleAddOffender: () => void;
  onSubmit: () => void;
  submitting: boolean;
  removeOffender: (id: string) => void;
}

const CreateCrimeGroup = ({
  loading,
  offendersData,
  searchData,
  selectOffender,
  offendersSelected,
  addOffender,
  toggleAddOffender,
  onSubmit,
  removeOffender,
  submitting,
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
          <Title style={{ margin: 0 }} level={3}>
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
        <div>
          <Spin />
        </div>
      ) : (
        <div>
          {offendersSelected ? (
            <Row gutter={16}>
              {offendersData?.listOffenders?.offenders.map((offender) => (
                <Col key={offender.id}>
                  <Card
                    className={classes.offenderCol}
                    bodyStyle={{ padding: 0 }}
                  >
                    <Carousel>
                      {offender.images.map((image) => (
                        <div key={image.id} className={classes.imageContainer}>
                          <div className={classes.image}>
                            <WatermarkImage
                              url={image.optimised}
                              rotation={image.rotation}
                              position={image.position}
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
                            title={intl.formatMessage({
                              defaultMessage: 'Are you sure?',
                            })}
                            disabled={submitting}
                            overlayInnerStyle={{ padding: 10 }}
                            onConfirm={() => removeOffender(offender.id)}
                          >
                            <Button
                              className={classes.deleteButton}
                              size="small"
                              disabled={submitting}
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
              {searchData?.listOffenders?.offenders.map((offender) => (
                <Col>
                  <Card
                    onClick={() => selectOffender(offender.id)}
                    className={classes.offenderCard}
                    bodyStyle={{ padding: 0, display: 'flex' }}
                    key={offender.id}
                  >
                    <div className={classes.offenderImage}>
                      <WatermarkImage
                        url={offender.images[0]?.optimised}
                        position={offender.images[0]?.position}
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
                      {/* <Row gutter={8}>
                        <Col>
                          <Text className={classes.offenderDetail}>
                            {intl.formatMessage({
                              id: 'kS9obh',
                              defaultMessage: 'Last Active: ',
                            })}
                          </Text>
                          <Text
                            className={classes.offenderDetail}
                            type="secondary"
                          >
                            {offender.}
                          </Text>
                        </Col>
                      </Row> */}
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </div>
      )}

      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Add Offenders',
        })}
        open={addOffender}
        width="800"
        onClose={toggleAddOffender}
        zIndex={1001}
      >
        {addOffender ? (
          <AddExisitingOffender
            update={(offender) => selectOffender(offender.id)}
            offenderIds={offendersData?.listOffenders?.offenders.map(
              ({ id }) => id
            )}
            onClose={toggleAddOffender}
          />
        ) : (
          <div />
        )}
      </Drawer>
    </div>
  );
};

export default CreateCrimeGroup;
