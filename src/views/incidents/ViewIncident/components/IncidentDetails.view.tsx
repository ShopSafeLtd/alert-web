import type { ViewIncidentQuery } from '#/views/incidents/ViewIncident/__generated__/view-incident.generated';

import IncidentPriorityTag from '#/components/incidents/IncidentPriority/IncidentPriorityTag.view';
import { currentSchemeAtom } from '#/providers/SchemeProvider/SchemeProvider';
import useStyles from '#/views/incidents/ViewIncident/ViewIncident.styles';
import {
  faBuilding,
  faClock,
  faExclamationCircle,
  faLanguage,
  faSirenOn,
  faTags,
  faUser,
  faUserTag,
  faUsers,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Col, Descriptions, Row, Tag, Tooltip, Typography } from 'antd';
import dayjs from 'dayjs';
import { IncidentPriority } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

const { Paragraph, Text, Title } = Typography;

interface Props {
  data: ViewIncidentQuery | undefined;
  editAddress: boolean;
  editRights: boolean;
  loading: boolean;
}

const IncidentDetails = ({ data, editRights, loading }: Props) => {
  const classes = useStyles();
  const intl = useIntl();

  const languageCount = useAtomValue(currentSchemeAtom)?.languageCount ?? 1;

  const [showOriginal, setShowOriginal] = useState(false);

  const toggleShowOriginalDescription = () => {
    setShowOriginal(!showOriginal);
  };

  return (
    <Card loading={loading}>
      <Title className={classes.headerTitle} level={4}>
        {data?.incident?.subject}
      </Title>
      <Text>
        {intl.formatMessage(
          {
            defaultMessage: 'Alert ID: {ref}',
          },
          {
            ref: data?.incident?.reference,
          }
        )}
      </Text>
      <Paragraph style={{ marginTop: 10 }} type="secondary">
        {showOriginal
          ? data?.incident.originalDescription
          : data?.incident?.description}
        {languageCount > 1 && (
          <Tooltip
            title={intl.formatMessage({
              defaultMessage: 'Translate',
            })}
          >
            <FontAwesomeIcon
              color="lightblue"
              icon={faLanguage}
              // eslint-disable-next-line no-void
              onClick={() => toggleShowOriginalDescription()}
              style={{
                cursor: 'pointer',
                marginLeft: '10px',
              }}
            />
          </Tooltip>
        )}
      </Paragraph>

      <Row gutter={32}>
        <Col span={12}>
          <Descriptions className={classes.desc} column={1}>
            {data?.incident.priority === IncidentPriority.Normal ? undefined : (
              <Descriptions.Item
                className={classes.detail}
                label={
                  <span>
                    <FontAwesomeIcon
                      className={classes.descIcon}
                      icon={faExclamationCircle}
                    />
                    {intl.formatMessage({
                      defaultMessage: 'Priority',
                    })}
                  </span>
                }
              >
                <IncidentPriorityTag
                  value={data?.incident?.priority || IncidentPriority.Normal}
                />
              </Descriptions.Item>
            )}

            <Descriptions.Item
              className={classes.detail}
              label={
                <span>
                  <FontAwesomeIcon
                    className={classes.descIcon}
                    icon={faBuilding}
                  />
                  {intl.formatMessage({
                    defaultMessage: 'Business',
                  })}
                </span>
              }
            >
              {editRights ? (
                <Link
                  to={`/app/businesses/view/${
                    data?.incident?.business?.id || ''
                  }`}
                >
                  {data?.incident?.business?.name}
                </Link>
              ) : (
                data?.incident?.business?.name
              )}
            </Descriptions.Item>
            <Descriptions.Item
              className={classes.detail}
              label={
                <span>
                  <FontAwesomeIcon className={classes.descIcon} icon={faUser} />
                  {intl.formatMessage({
                    defaultMessage: 'Created By',
                  })}
                </span>
              }
            >
              <FormattedMessage
                defaultMessage="{var1} ({var2})"
                values={{
                  var1: data?.incident?.createdBy.fullName,
                  var2: data?.incident
                    ? dayjs(data.incident.createdAt).format('DD/MM/YY HH:mm:ss')
                    : intl.formatMessage({ defaultMessage: 'Unknown' }),
                }}
              />
            </Descriptions.Item>
            <Descriptions.Item
              className={classes.detail}
              label={
                <span>
                  <FontAwesomeIcon
                    className={classes.descIcon}
                    icon={faClock}
                  />
                  {intl.formatMessage({
                    defaultMessage: 'Date & Time',
                  })}
                </span>
              }
            >
              {data?.incident?.dayTime}
            </Descriptions.Item>
          </Descriptions>
        </Col>
        <Col span={12}>
          <Descriptions className={classes.desc} column={1}>
            <Descriptions.Item
              className={classes.detailTag}
              label={
                <span className={classes.tagLabel}>
                  <FontAwesomeIcon
                    className={classes.descIcon}
                    icon={faUsers}
                  />
                  {intl.formatMessage({
                    defaultMessage: 'Groups',
                  })}
                </span>
              }
            >
              <Row>
                {data?.incident?.groups.map((group) => (
                  <Tag className={classes.tag} key={group.id}>
                    {group.name}
                  </Tag>
                ))}
              </Row>
            </Descriptions.Item>
            <Descriptions.Item
              className={classes.detailTag}
              label={
                <span className={classes.tagLabel}>
                  <FontAwesomeIcon
                    className={classes.descIcon}
                    icon={faSirenOn}
                  />
                  {intl.formatMessage({
                    defaultMessage: 'Incident Types',
                  })}
                </span>
              }
            >
              <Row>
                {data?.incident?.crimeTypes.map((tag) => (
                  <Tag className={classes.tag} color="red" key={tag.id}>
                    {tag.name}
                  </Tag>
                )) ||
                  intl.formatMessage({
                    defaultMessage: 'None',
                  })}
              </Row>
            </Descriptions.Item>
            {data?.incident && data.incident.involvedTags.length > 0 && (
              <Descriptions.Item
                className={classes.detailTag}
                label={
                  <span className={classes.tagLabel}>
                    <FontAwesomeIcon
                      className={classes.descIcon}
                      icon={faTags}
                    />
                    {intl.formatMessage({
                      defaultMessage: 'Involved Tags',
                    })}
                  </span>
                }
              >
                <Row>
                  {data?.incident?.involvedTags.map((tag) => (
                    <Tag className={classes.tag} color="red" key={tag.id}>
                      {tag.name}
                    </Tag>
                  )) ||
                    intl.formatMessage({
                      defaultMessage: 'None',
                    })}
                </Row>
              </Descriptions.Item>
            )}

            {data?.incident && data.incident.impactTags.length > 0 && (
              <Descriptions.Item
                className={classes.detailTag}
                label={
                  <span className={classes.tagLabel}>
                    <FontAwesomeIcon
                      className={classes.descIcon}
                      icon={faUserTag}
                    />
                    {intl.formatMessage({
                      defaultMessage: 'Impact Tags',
                    })}
                  </span>
                }
              >
                <Row align="middle" justify="start">
                  {data?.incident?.impactTags.map((tag) => (
                    <Tag className={classes.tag} color="red" key={tag.id}>
                      {tag.name}
                    </Tag>
                  )) ||
                    intl.formatMessage({
                      defaultMessage: 'None',
                    })}
                </Row>
              </Descriptions.Item>
            )}
          </Descriptions>
        </Col>
      </Row>
    </Card>
  );
};

export default IncidentDetails;
