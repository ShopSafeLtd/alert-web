import { faTrash } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Card,
  Carousel,
  Col,
  Divider,
  Drawer,
  Popconfirm,
  Row,
  Typography,
} from 'antd';
import AddExisitingOffender from 'components/form-components/offender/AddExistingOffender';
import WatermarkImage from 'components/images/WatermarkImage.view';
import { Age, Build, Gender, Race } from 'graphql/types';
import moment from 'moment';
import React from 'react';
import { useIntl } from 'react-intl';
import { getAge, getBuild, getEthnicity, getSex } from 'utils'; // Import the useIntl hook
import type { OffenderSearchDetailsFragment } from '#/components/form-components/offender/AddExistingOffender/graphql/queries/__generated__/search-offender.generated';

import publicOffenderDob from '#/utils/public-offender-dob';

import useStyles from './CreateCrimeGroup.styles';

const { Text, Title } = Typography;

interface Props {
  addOffender: boolean;
  offendersData: OffenderSearchDetailsFragment[];
  onSubmit: () => void;
  removeOffender: (id: string) => void;
  selectOffender: (offender: OffenderSearchDetailsFragment) => void;
  submitting: boolean;
  toggleAddOffender: () => void;
}

const CreateCrimeGroup = ({
  addOffender,
  offendersData,
  onSubmit,
  removeOffender,
  selectOffender,
  submitting,
  toggleAddOffender,
}: Props) => {
  const classes = useStyles();
  const intl = useIntl(); // Initialize the useIntl hook
  const publicOffenderDOB = publicOffenderDob();
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
        <Row gutter={16}>
          {offendersData.map((offender) => (
            <Col key={offender.id}>
              <Card bodyStyle={{ padding: 0 }} className={classes.offenderCol}>
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
            offenderIds={offendersData?.map(({ id }) => id)}
            onClose={toggleAddOffender}
            update={(offender) => selectOffender(offender)}
          />
        ) : (
          <div />
        )}
      </Drawer>
    </div>
  );
};

export default CreateCrimeGroup;
