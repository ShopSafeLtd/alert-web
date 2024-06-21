import React from 'react';
import { Card, Tooltip, Typography } from 'antd';
import WatermarkImage from 'components/images/WatermarkImage.view';
import { useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';
import type { Age, Build, Gender, Race } from 'graphql/types';

const { Paragraph } = Typography;

const useStyles = createUseStyles({
  image: {
    height: 140,
    width: 140,
  },
  details: {
    padding: 10,
    overflow: 'hidden',
  },
  text: {
    marginBottom: '5px !important',
  },
});

interface Props {
  offender: {
    id: string;
    reference?: number | null | undefined;
    images: { optimised?: string | null | undefined }[];
    age?: Age | null;
    gender?: Gender | null;
    race?: Race | null;
    build?: Build | null;
  };
  onClick: () => void;
}

const OffenderTile = ({ offender, onClick }: Props): JSX.Element => {
  const intl = useIntl();
  const classes = useStyles();
  const unknown = intl.formatMessage({
    defaultMessage: 'Unknown',
  });

  return (
    <Tooltip
      placement="bottom"
      title={intl.formatMessage(
        {
          defaultMessage: 'Add Alert ID: {ref} to incident',
        },
        { ref: offender.reference }
      )}
    >
      <Card
        onClick={onClick}
        bodyStyle={{
          position: 'relative',
          padding: 0,
          borderRadius: '0.625rem',
          overflow: 'hidden',
          display: 'flex',
          // alignItems: 'center',
          // justifyContent: 'center',
          cursor: 'pointer',
          height: 140,
        }}
      >
        {offender.images.length > 0 && (
          <div className={classes.image}>
            <WatermarkImage url={offender.images[0]?.optimised} />
          </div>
        )}
        <div className={classes.details}>
          <Paragraph ellipsis className={classes.text}>
            {intl.formatMessage(
              { defaultMessage: 'Alert ID: {ref}' },
              { ref: offender.reference }
            )}
          </Paragraph>
          <Paragraph ellipsis className={classes.text}>
            {intl.formatMessage(
              { defaultMessage: 'Sex: {gender}' },
              {
                gender: offender.gender || unknown,
              }
            )}
          </Paragraph>
          <Paragraph ellipsis className={classes.text}>
            {intl.formatMessage(
              { defaultMessage: 'Age: {reg}' },
              {
                reg: offender.age || unknown,
              }
            )}
          </Paragraph>
          <Paragraph ellipsis className={classes.text}>
            {intl.formatMessage(
              { defaultMessage: 'Build: {build}' },
              {
                build: offender.build || unknown,
              }
            )}
          </Paragraph>
          <Paragraph ellipsis className={classes.text}>
            {intl.formatMessage(
              { defaultMessage: 'Race: {race}' },
              {
                race: offender.race || unknown,
              }
            )}
          </Paragraph>
        </div>
      </Card>
    </Tooltip>
  );
};

export default OffenderTile;
