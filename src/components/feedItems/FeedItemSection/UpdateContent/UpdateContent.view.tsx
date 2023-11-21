import React from 'react';
import { Typography } from 'antd';
import type { UpdateType } from 'graphql/generated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessageDots } from '@fortawesome/pro-light-svg-icons';
import type {
  CrimeGroupData,
  IncidentCardData,
  VehicleData,
} from 'types/DataType';
import IncidentCard from 'components/MessageInput/MessageCard/IncidentCard';
import VehicleCard from 'components/MessageInput/MessageCard/VehicleCard';
import OffenderCard from 'components/MessageInput/MessageCard/OffenderCard';
import CrimeGroupList from 'components/MessageInput/MessageCard/CrimeGroupList';
import { useIntl } from 'react-intl';
import useStyles from './UpdateContent.styles';

const { Title, Text, Paragraph } = Typography;

interface UpdateData {
  id: string;
  text?: string | null | undefined;
  type: UpdateType;
  images?: {
    id: string;
    optimised?: string | null;
    url?: string | null;
  }[];
  linkedIncidents: IncidentCardData[];
  linkedOffenders: {
    id: string;
    updatedAt?: Date;
    name?: string | null;
    images?: { id: string; optimised?: string | null; url?: string | null }[];
  }[];
  linkedVehicles: VehicleData[];
  linkedCrimeGroups: CrimeGroupData[];
}

interface Props {
  update: UpdateData | undefined;
  title: string;
}

const getContent = (content: string) =>
  content.split(/(@\[.*?]\(.*?\))/).map((item) => {
    if (item.includes('@[')) {
      return (
        <Text strong key={item}>
          {item.replace('@[', '').replace(/(]\(.*?\))/, '')}
        </Text>
      );
    }
    return <Text key={item}>{item}</Text>;
  });

const UpdateContent = ({ update, title }: Props): JSX.Element => {
  const intl = useIntl();
  const classes = useStyles();

  return update?.linkedIncidents.length ||
    update?.linkedOffenders.length ||
    update?.linkedCrimeGroups.length ||
    update?.linkedVehicles.length ? (
    <>
      {update?.linkedIncidents[0] ? (
        <>
          <Title style={{ fontSize: 14, marginLeft: 5 }}>
            <FontAwesomeIcon
              size="sm"
              className={classes.icon}
              icon={faMessageDots}
            />
            {update?.text
              ? getContent(update?.text)
              : intl.formatMessage({
                  defaultMessage: 'Link an incident',
                  id: 'SeBe5K',
                })}
          </Title>
          <IncidentCard incident={update.linkedIncidents[0]} />
        </>
      ) : null}
      {update?.linkedOffenders[0] ? (
        <>
          <Title style={{ fontSize: 14, marginLeft: 5 }}>
            <FontAwesomeIcon
              size="sm"
              className={classes.icon}
              icon={faMessageDots}
            />
            {update?.text
              ? getContent(update?.text)
              : intl.formatMessage({
                  defaultMessage: 'Link an offender',
                  id: 'BxIzUN',
                })}
          </Title>
          <OffenderCard offender={update.linkedOffenders[0]} />
        </>
      ) : null}
      {update?.linkedVehicles[0] ? (
        <>
          <Title style={{ fontSize: 14, marginLeft: 5 }}>
            <FontAwesomeIcon
              size="sm"
              className={classes.icon}
              icon={faMessageDots}
            />
            {update?.text
              ? getContent(update?.text)
              : intl.formatMessage({
                  defaultMessage: 'Link a vehicle',
                  id: '1lpfu7',
                })}
          </Title>
          <VehicleCard vehicle={update.linkedVehicles[0]} />
        </>
      ) : null}
      {update?.linkedCrimeGroups && update?.linkedCrimeGroups.length ? (
        <>
          <Title style={{ fontSize: 14, marginLeft: 5 }}>
            <FontAwesomeIcon
              size="sm"
              className={classes.icon}
              icon={faMessageDots}
            />
            {update?.text
              ? getContent(update?.text)
              : intl.formatMessage({
                  defaultMessage: 'Link crime groups',
                  id: 'j6a7pa',
                })}
          </Title>
          <CrimeGroupList crimeGroups={update.linkedCrimeGroups} isIntel />
        </>
      ) : null}
    </>
  ) : (
    <div>
      <Title level={4} style={{ marginBottom: 2 }} ellipsis>
        {title}
      </Title>

      {update?.text ? (
        <Paragraph
          style={{ fontSize: 14 }}
          type="secondary"
          ellipsis={{ rows: 1 }}
        >
          <FontAwesomeIcon
            size="sm"
            className={classes.icon}
            icon={faMessageDots}
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
