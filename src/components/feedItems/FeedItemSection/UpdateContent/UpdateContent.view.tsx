import type { UpdateType } from 'graphql/types';
import type {
  ArticleData,
  CrimeGroupData,
  IncidentCardData,
  VehicleData,
} from 'types/DataType';

import { faMessageDots } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from 'antd';
import ArticleCard from 'components/MessageInput/MessageCard/ArticleCard';
import CrimeGroupList from 'components/MessageInput/MessageCard/CrimeGroupList';
import IncidentCard from 'components/MessageInput/MessageCard/IncidentCard';
import OffenderCard from 'components/MessageInput/MessageCard/OffenderCard';
import VehicleCard from 'components/MessageInput/MessageCard/VehicleCard';
import React from 'react';
import { useIntl } from 'react-intl';

import useStyles from './UpdateContent.styles';

const { Paragraph, Text, Title } = Typography;

interface UpdateData {
  id: string;
  images?: {
    id: string;
    optimised?: null | string;
    url?: null | string;
  }[];
  linkedArticles: ArticleData[];
  linkedCrimeGroups: CrimeGroupData[];
  linkedIncidents: IncidentCardData[];
  linkedOffenders: {
    id: string;
    images?: { id: string; optimised?: null | string; url?: null | string }[];
    name?: null | string;
    updatedAt?: Date;
  }[];
  linkedVehicles: VehicleData[];
  text?: null | string | undefined;
  type: UpdateType;
}

interface Props {
  title: string;
  update: UpdateData | undefined;
}

const getContent = (content: string) =>
  content.split(/(@\[.*?]\(.*?\))/).map((item) => {
    if (item.includes('@[')) {
      return (
        <Text key={item} strong>
          {item.replace('@[', '').replace(/(]\(.*?\))/, '')}
        </Text>
      );
    }
    return <Text key={item}>{item}</Text>;
  });

const UpdateContent = ({ title, update }: Props): JSX.Element => {
  const intl = useIntl();
  const classes = useStyles();

  return update?.linkedIncidents.length ||
    update?.linkedOffenders.length ||
    update?.linkedCrimeGroups.length ||
    update?.linkedVehicles.length ||
    update?.linkedArticles.length ? (
    <div
      style={{
        overflow: 'hidden',
      }}
    >
      {update?.linkedIncidents[0] ? (
        <>
          <Title style={{ fontSize: 14, marginLeft: 5 }}>
            <FontAwesomeIcon
              className={classes.icon}
              icon={faMessageDots}
              size="sm"
            />
            {update?.text
              ? getContent(update?.text)
              : intl.formatMessage({
                  defaultMessage: 'Link an incident',
                })}
          </Title>
          <IncidentCard incident={update.linkedIncidents[0]} />
        </>
      ) : null}
      {update?.linkedOffenders[0] ? (
        <>
          <Title style={{ fontSize: 14, marginLeft: 5 }}>
            <FontAwesomeIcon
              className={classes.icon}
              icon={faMessageDots}
              size="sm"
            />
            {update?.text
              ? getContent(update?.text)
              : intl.formatMessage({
                  defaultMessage: 'Link an offender',
                })}
          </Title>
          <OffenderCard offender={update.linkedOffenders[0]} />
        </>
      ) : null}
      {update?.linkedVehicles[0] ? (
        <>
          <Title style={{ fontSize: 14, marginLeft: 5 }}>
            <FontAwesomeIcon
              className={classes.icon}
              icon={faMessageDots}
              size="sm"
            />
            {update?.text
              ? getContent(update?.text)
              : intl.formatMessage({
                  defaultMessage: 'Link a vehicle',
                })}
          </Title>
          <VehicleCard vehicle={update.linkedVehicles[0]} />
        </>
      ) : null}
      {update?.linkedCrimeGroups && update?.linkedCrimeGroups.length ? (
        <>
          <Title style={{ fontSize: 14, marginLeft: 5 }}>
            <FontAwesomeIcon
              className={classes.icon}
              icon={faMessageDots}
              size="sm"
            />
            {update?.text
              ? getContent(update?.text)
              : intl.formatMessage({
                  defaultMessage: 'Link crime groups',
                })}
          </Title>
          <CrimeGroupList crimeGroups={update.linkedCrimeGroups} isIntel />
        </>
      ) : null}
      {update?.linkedArticles[0] ? (
        <>
          <Title style={{ fontSize: 14, marginLeft: 5 }}>
            <FontAwesomeIcon
              className={classes.icon}
              icon={faMessageDots}
              size="sm"
            />
            {update?.text
              ? getContent(update?.text)
              : intl.formatMessage({
                  defaultMessage: 'Link an article',
                })}
          </Title>
          <ArticleCard article={update.linkedArticles[0]} />
        </>
      ) : null}
    </div>
  ) : (
    <div>
      <Title ellipsis level={4} style={{ marginBottom: 2 }}>
        {title}
      </Title>

      {update?.text ? (
        <Paragraph
          ellipsis={{ rows: 1 }}
          style={{ fontSize: 14 }}
          type="secondary"
        >
          <FontAwesomeIcon
            className={classes.icon}
            icon={faMessageDots}
            size="sm"
          />
          {getContent(update.text)}
        </Paragraph>
      ) : (
        <div style={{ height: 35 }} />
      )}
    </div>
  );
};

export default UpdateContent;
