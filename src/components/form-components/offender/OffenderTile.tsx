import type { Age, Build, Gender, Race } from 'graphql/types';

import { Card, Tooltip, Typography } from 'antd';
import WatermarkImage from 'components/images/WatermarkImage.view';
import React from 'react';
import { useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';

const { Paragraph } = Typography;

const useStyles = createUseStyles({
  details: {
    overflow: 'hidden',
    padding: 10,
  },
  image: {
    height: 140,
    width: 140,
  },
  text: {
    marginBottom: '5px !important',
  },
});

interface Props {
  offender: {
    age?: Age | null;
    build?: Build | null;
    gender?: Gender | null;
    id: string;
    images: { optimised?: null | string | undefined }[];
    race?: Race | null;
    reference?: null | number | undefined;
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
        bodyStyle={{
          borderRadius: '0.625rem',
          // justifyContent: 'center',
          cursor: 'pointer',
          display: 'flex',
          height: 140,
          overflow: 'hidden',
          // alignItems: 'center',
          padding: 0,
          position: 'relative',
        }}
        onClick={onClick}
      >
        {offender.images.length > 0 && (
          <div className={classes.image}>
            <WatermarkImage url={offender.images[0]?.optimised} />
          </div>
        )}
        <div className={classes.details}>
          <Paragraph className={classes.text} ellipsis>
            {intl.formatMessage(
              { defaultMessage: 'Alert ID: {ref}' },
              { ref: offender.reference }
            )}
          </Paragraph>
          <Paragraph className={classes.text} ellipsis>
            {intl.formatMessage(
              { defaultMessage: 'Sex: {gender}' },
              {
                gender: offender.gender || unknown,
              }
            )}
          </Paragraph>
          <Paragraph className={classes.text} ellipsis>
            {intl.formatMessage(
              { defaultMessage: 'Age: {reg}' },
              {
                reg: offender.age || unknown,
              }
            )}
          </Paragraph>
          <Paragraph className={classes.text} ellipsis>
            {intl.formatMessage(
              { defaultMessage: 'Build: {build}' },
              {
                build: offender.build || unknown,
              }
            )}
          </Paragraph>
          <Paragraph className={classes.text} ellipsis>
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
